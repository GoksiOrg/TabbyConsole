<?php

namespace App\Http\Controllers;

use App\Exceptions\ServerConnectionException;
use App\Models\Server;
use App\Repository\ControlRepository;
use Illuminate\Http\JsonResponse;

class ResourceController extends Controller
{
    public function __construct(private readonly ControlRepository $repository)
    {
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
