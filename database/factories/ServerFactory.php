<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Server>
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
        error_log($string);
        return [
            'name' => 'RealTest',
            'host' => '192.168.1.8',
            'port' => 8080,
            'owner_id' => 2,
            'secret' => Crypt::encrypt($string)
        ];
    }
}
