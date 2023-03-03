<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\Console\Command\Command as CommandAlias;
use Validator;

class RegisterUserCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'teddy:register';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Registers user on remote console';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $user = new User();
        $user->username = $this->ask('Please type your username');
        $password = $this->secret('Please enter your password');
        $validator = Validator::make([
            'password' => $password,
        ], ['password' => 'required|min:7|regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/']);
        if ($validator->fails()) {
            foreach ($validator->errors()->all() as $error) {
                $this->error($error);
            }

            return CommandAlias::FAILURE;
        }
        $user->password = Hash::make($password);
        $user->admin = $this->confirm('Should this user be administrator ?');
        $user->save();

        return CommandAlias::SUCCESS;
    }
}
