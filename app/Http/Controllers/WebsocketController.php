<?php

namespace App\Http\Controllers;

use App\Enums\Permission;
use App\Facades\JWTService;
use App\Models\Server;
use Illuminate\Http\JsonResponse;

class WebsocketController extends Controller
{
    public function token(Server $server): JsonResponse
    {
        $user = request()->user();
        if (! $user->hasPermission($server, Permission::WEBSOCKET_CONNECT)) {
            abort(403, "You can't connect to this server websocket");
        }
        $token = JWTService::make($server, $user);

        return new JsonResponse([
            'url' => $server->getWebsocketUrl(),
            'token' => $token,
        ]);
    }
}
