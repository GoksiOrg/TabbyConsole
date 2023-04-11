<?php

namespace App\Enums;

enum Permission: int
{
    case WEBSOCKET_CONNECT = 1 << 0;
    case WEBSOCKET_SEND_COMMAND = 1 << 1;
    case VIEW_FILES = 1 << 2;
    case EDIT_FILES = 1 << 3;
}
