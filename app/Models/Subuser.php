<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\Subuser
 *
 * @property int $id
 * @property int $server_id
 * @property int $user_id
 * @property int $permission
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Server $server
 * @property-read \App\Models\User $user
 *
 * @method static \Illuminate\Database\Eloquent\Builder|Subuser newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Subuser newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Subuser query()
 * @method static \Illuminate\Database\Eloquent\Builder|Subuser whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Subuser whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Subuser wherePermission($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Subuser whereServerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Subuser whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Subuser whereUserId($value)
 *
 * @mixin \Eloquent
 */
class Subuser extends Model
{
    protected $table = 'subusers';

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function server(): BelongsTo
    {
        return $this->belongsTo(Server::class);
    }
}
