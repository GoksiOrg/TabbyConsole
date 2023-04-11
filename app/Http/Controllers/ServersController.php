<?php

namespace App\Http\Controllers;

use App\Models\Server;
use App\Rules\FqdnRule;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

class ServersController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $perPage = $request->query('per_page', 5);
        $user = $request->user();
        $servers = $user->availableServers()->paginate(min($perPage, 50));

        return response()->json($servers);
    }

    public function store(Request $request): JsonResponse
    {
        $user = $request->user();
        $data = $request->validate([
            'name' => 'required|min:3|max:32',
            'host' => ['required', new FqdnRule],
            'port' => 'required|integer|digits_between:1,5',
            'scheme' => 'required|in:http,https',
            'game_port' => 'integer|digits_between:1,5',
        ]);
        $secret = Str::random();
        $data['owner_id'] = $user->id;
        $data['secret'] = Crypt::encrypt($secret);
        $server = Server::create($data);

        return response()->json(['id' => $server->id, 'secret' => $secret], Response::HTTP_CREATED);
    }

    public function getOne(Server $server, Request $request): JsonResponse
    {
        $serverData = $server->toArray();
        $user = $request->user();
        if ($server->isOwner($user)) {
            $serverData['permissions'] = -1; // indicates that user is server owner and have all permissions
        } else {
            $serverData['permissions'] = $user->subservers
                ->where('server_id', '=', $server->id)
                ->first()->permission;
        }

        return response()->json($serverData);
    }

    public function delete(Server $server): Response
    {
        $user = request()->user();
        if ($user->admin || $server->isOwner($user)) {
            $server->delete();

            return response()->noContent();
        } else {
            abort(403, "You don't have permission to delete this server !");
        }
    }
}
