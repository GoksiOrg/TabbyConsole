<?php

namespace App\Http\Controllers;

use App\Models\Server;
use Illuminate\Http\JsonResponse;

class WebsocketController extends Controller
{
    public function token(Server $server): JsonResponse {
        return new JsonResponse([
           'url' => $server->getWebsocketUrl()
        ]);
    }
}
