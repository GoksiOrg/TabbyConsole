<?php

namespace App\Models;

use App\Enums\Permission;
use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Authenticatable as AuthContract;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Laravel\Sanctum\HasApiTokens;

/**
 * App\Models\User
 *
 * @property bool $admin
 * @property string $username
 * @property string $password
 * @property int $id
 * @property string|null $remember_token
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Server> $servers
 * @property-read int|null $servers_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \Laravel\Sanctum\PersonalAccessToken> $tokens
 * @property-read int|null $tokens_count
 *
 * @method static \Database\Factories\UserFactory factory($count = null, $state = [])
 * @method static Builder|User newModelQuery()
 * @method static Builder|User newQuery()
 * @method static Builder|User query()
 * @method static Builder|User whereAdmin($value)
 * @method static Builder|User whereCreatedAt($value)
 * @method static Builder|User whereId($value)
 * @method static Builder|User wherePassword($value)
 * @method static Builder|User whereRememberToken($value)
 * @method static Builder|User whereUpdatedAt($value)
 * @method static Builder|User whereUsername($value)
 *
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Subuser> $subservers
 * @property-read int|null $subservers_count
 *
 * @mixin \Eloquent
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
        'password',
    ];

    protected $table = 'users';

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'admin' => 'boolean',
    ];

    public function isAdmin(): bool
    {
        return $this->admin;
    }

    public function servers(): HasMany
    {
        return $this->hasMany(Server::class, 'owner_id');
    }

    public function subservers(): HasMany
    {
        return $this->hasMany(Subuser::class, 'user_id', 'id');
    }

    public function availableServers(): Builder
    {
        if($this->admin) return Server::all()->toQuery();
        return Server::query()
            ->select('servers.*')
            ->leftJoin('subusers', 'subusers.server_id', '=', 'servers.id')
            ->where(function (Builder $builder) {
                $builder->where('servers.owner_id', $this->id)->orWhere('subusers.user_id', $this->id);
            });
    }

    public function hasPermission(Server $server, Permission $permission): bool
    {
        if($this->admin) return true;
        if ($this->servers->contains($server->id)) return true;
        $subuser = $this->subservers->where('server_id', $server->id)->first();
        if(($subuser->permission & $permission->value) == 1) return true;
        else return false;
    }
}
