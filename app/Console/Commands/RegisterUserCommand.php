<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\Console\Command\Command as CommandAlias;

class RegisterUserCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'user:register {--username=} {--password=} {--admin=}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Registers user on remote console';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle(): int
    {

        $user = new User();
        $user->username = $this->option('username');
        $user->password = Hash::make($this->option('password'));
        $user->admin = $this->option('admin');
        $user->save();


        return CommandAlias::SUCCESS;
    }
}
