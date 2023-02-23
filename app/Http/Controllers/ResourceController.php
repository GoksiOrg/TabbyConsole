<?php

namespace App\Http\Controllers;

use App\Exceptions\ServerConnectionException;
use App\Models\Server;
use App\Repository\ControlRepository;
use Illuminate\Http\JsonResponse;

class ResourceController extends Controller
{
    private ControlRepository $repository;

    public function __construct(ControlRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * @throws ServerConnectionException
     */
    public function index(Server $server): JsonResponse
    {
        $resources = $this->repository->setServer($server)->getResources();
        return response()->json($resources);
    }
}
