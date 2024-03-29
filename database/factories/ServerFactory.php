<?php

namespace Database\Factories;

use App\Models\Server;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Str;

/**
 * @extends Factory<Server>
 */
class ServerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $string = Str::random();

        return [
            'name' => $this->faker->domainName,
            'host' => $this->faker->ipv4,
            'port' => $this->faker->numberBetween(8080, 25565),
            'owner_id' => 1,
            'secret' => Crypt::encrypt($string),
        ];
    }
}
