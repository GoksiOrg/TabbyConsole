<?php

namespace App\Exceptions;

use Exception;

class ServerConnectionException extends Exception
{
    protected $message = 'Failed to contact requested server !';
}
