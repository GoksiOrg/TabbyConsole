<?php

namespace App\Repository;

use App\Exceptions\ServerConnectionException;
use App\Models\Server;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;

class ControlRepository
{
    private Server $server;

    public function setServer(Server $server): self
    {
        $this->server = $server;

        return $this;
    }

    /**
     * @throws ServerConnectionException
     */
    public function getResources(): array
    {
        try {
            $response = $this->getGuzzle()->get('/api/resources');
        } catch (GuzzleException $e) {
            error_log($e->getMessage());
            throw new ServerConnectionException();
        }

        return json_decode($response->getBody()->__toString(), true);
    }

    private function getGuzzle(): Client
    {
        return new Client([
            'base_uri' => $this->server->getConnectionUrl(),
            'timeout' => 5,
            'connect_timeout' => 3,
            'headers' => [
                'Authorization' => 'Bearer '.$this->server->getDecryptedSecret(),
                'Accept' => 'application/json',
                'Content-Type' => 'application/json',
            ],
        ]);
    }
}
