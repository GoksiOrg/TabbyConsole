<?php

namespace App\Http\Controllers;

use App\Exceptions\ServerConnectionException;
use App\Models\Server;
use App\Repository\ControlRepository;
use Carbon\Carbon;
use Illuminate\Cache\Repository;
use Illuminate\Http\JsonResponse;

class ResourceController extends Controller
{
    public function __construct(private readonly ControlRepository $repository, private readonly Repository $cache)
    {
    }

    /**
     * @throws ServerConnectionException
     */
    public function index(Server $server): JsonResponse
    {
        $cacheKey = "resourceCache:$server->id";
        $resources = $this->cache->remember($cacheKey, Carbon::now()->addSeconds(20), function () use ($server) {
            return $this->repository->setServer($server)->getResources();
        });

        return response()->json($resources);
    }
}
