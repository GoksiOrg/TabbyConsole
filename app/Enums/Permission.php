<?php

namespace App\Enums;

enum Permission: int
{
    case ADMINISTRATOR = 1 << 0;
    case WEBSOCKET_CONNECT = 1 << 1;
    case WEBSOCKET_SEND_COMMAND = 1 << 2;
    case VIEW_FILES = 1 << 3;
    case EDIT_FILES = 1 << 4;
}
