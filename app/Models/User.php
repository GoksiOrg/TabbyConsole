<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Contracts\Auth\Authenticatable as AuthContract;


/**
 * @property bool $admin
 * @property string $username
 * @property string $password
 */
class User extends Model implements AuthContract
{
    use HasApiTokens, HasFactory;
    use Authenticatable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'password',
        'admin',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password'
    ];


    protected $table = 'users';

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'admin' => 'boolean'
    ];


    public function toObject(): array {
        return Collection::make($this)->toArray();
    }

    public function isAdmin(): bool {
        return $this->admin;
    }

    public static function whereUsername(string $username): User {
        return User::query()->where('username', $username)->firstOr(null);
    }
}
