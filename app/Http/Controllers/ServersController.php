<?php

namespace App\Http\Controllers;

use App\Models\Server;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;


class ServersController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $servers = $user->servers;
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
