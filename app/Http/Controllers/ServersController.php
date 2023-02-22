<?php

namespace App\Http\Controllers;

use App\Models\Server;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;


class ServersController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $perPage = $request->query('per_page', 10);
        /**@var User $user */
        $user = $request->user();
        $servers = $user->availableServers()->paginate(min($perPage, 50));
        return response()->json($servers);
    }

    public function store(Request $request): JsonResponse
    {
        $user = $request->user();
        $data = $request->validate([
            'name' => 'required|min:3|max:32',
            'host' => ['required', 'ip|regex:/^(?!:\/\/)(?=.{1,255}$)((.{1,63}\.){1,127}(?![0-9]*$)[a-z0-9-]+\.?)$/i'],
            'port' => 'required|integer|digits_between:1,5'
        ]);
        $secret = Str::random();
        $data['owner_id'] = $user->id;
        $data['secret'] = Crypt::encrypt($secret);
        Server::create($data);
        return response()->json(['secret' => $secret], Response::HTTP_CREATED);
    }
}
