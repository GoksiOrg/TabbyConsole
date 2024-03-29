<?php

use App\Http\Controllers\ResourceController;
use App\Http\Controllers\ServersController;
use App\Http\Controllers\WebsocketController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('servers')->group(function () {
    Route::get('/', [ServersController::class, 'index']);
    Route::post('/', [ServersController::class, 'store']);
    Route::prefix('{server}')->middleware('ensure.server.access')->group(function () {
        Route::get('/', [ServersController::class, 'getOne']);
        Route::delete('/', [ServersController::class, 'delete']);
        Route::get('resources', [ResourceController::class, 'index']);
        Route::get('websocket', [WebsocketController::class, 'token']);
    });
});
