<?php

namespace App\Enums;

enum Permission: int
{
    case ADMINISTRATOR = 1 << 0;
    case CONSOLE = 1 << 1;
    case VIEW_FILES = 1 << 2;
    case EDIT_FILES = 1 << 3;

}
