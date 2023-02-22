<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Crypt;


/**
 * App\Models\Server
 *
 * @property Collection $users
 * @property int $id
 * @property string $name
 * @property string $host
 * @property int $port
 * @property string $secret
 * @property int $owner_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read int|null $users_count
 * @method static Builder|Server newModelQuery()
 * @method static Builder|Server newQuery()
 * @method static Builder|Server query()
 * @method static Builder|Server whereCreatedAt($value)
 * @method static Builder|Server whereHost($value)
 * @method static Builder|Server whereId($value)
 * @method static Builder|Server whereName($value)
 * @method static Builder|Server whereOwnerId($value)
 * @method static Builder|Server wherePort($value)
 * @method static Builder|Server whereSecret($value)
 * @method static Builder|Server whereUpdatedAt($value)
 * @property-read \App\Models\User $owner
 * @property-read Collection<int, \App\Models\Subuser> $subusers
 * @property-read int|null $subusers_count
 * @mixin \Eloquent
 */
class Server extends Model
{
    use HasFactory;

    protected $table = 'servers';

    protected $fillable = [
        'name',
        'host',
        'port',
        'secret'
    ];

    protected $hidden = ['secret'];

    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function subusers(): HasMany
    {
        return $this->hasMany(Subuser::class, 'server_id', 'id');
    }

    public function getDecryptedSecret(): string
    {
        return Crypt::decrypt($this->secret);
    }

}
