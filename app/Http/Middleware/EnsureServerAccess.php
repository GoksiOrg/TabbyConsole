<?php

namespace App\Http\Middleware;

use App\Models\Server;
use Closure;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class EnsureServerAccess
{
    /**
     * Handle an incoming request.
     *
     * @param Request $request
     * @param Closure(Request): (Response|RedirectResponse) $next
     * @return JsonResponse
     */
    public function handle(Request $request, Closure $next): JsonResponse
    {
        $user = $request->user();
        $server = $request->route()->parameter('server');
        if (!($server instanceof Server))
            abort(404, 'Requested server is not found !');
        if (!$user->isAdmin() && !$server->users()->get()->contains($user->id))
            abort(403, "You don't have permission to operate with this server !");
        return $next($request);
    }
}
