<?php

namespace App\Facades;

use Illuminate\Support\Facades\Facade;

/**@see \App\Services\JWTService*/
class JWTService extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return 'jwt_service';
    }
}
