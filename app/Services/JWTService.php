<?php

namespace App\Services;

use App\Enums\Permission;
use App\Models\Server;
use App\Models\User;
use Carbon\CarbonImmutable;
use Illuminate\Support\Str;
use Lcobucci\JWT\Configuration;
use Lcobucci\JWT\Signer\Hmac\Sha256;
use Lcobucci\JWT\Signer\Key\InMemory;
use Lcobucci\JWT\Token\Plain;

class JWTService
{
    public function make(Server $server, User $user): Plain
    {
        $config = Configuration::forSymmetricSigner(new Sha256(), InMemory::plainText($server->getDecryptedSecret()));
        $currentTime = CarbonImmutable::now();
        $builder = $config->builder()
            ->issuedBy(config('app.url'))
            ->issuedAt($currentTime)
            ->expiresAt($currentTime->addMinutes(35))
            ->identifiedBy(Str::random())
            ->relatedTo($user->username)
            ->withClaim('server_id', $server->id)
            ->withClaim('send_commands', $user->hasPermission($server, Permission::WEBSOCKET_SEND_COMMAND));

        return $builder->getToken($config->signer(), $config->signingKey());
    }
}
