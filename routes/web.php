<?php

use App\Http\Controllers\LoginController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::controller(LoginController::class)->group(function () {
    Route::get('login', 'index')->name('login');
    Route::post('login', 'login');
    Route::get('logout', 'logout');
});

Route::middleware(['auth', 'ensure.admin'])->group(function () {
    Route::prefix('admin')->group(function () {
        Route::get('/', function () {
            return view('main.base');
        })->fallback();
        Route::get('/{frontend}', function () {
            return view('main.base');
        })->where('frontend', '.+');
    });
});

Route::middleware('auth')->group(function () {
    Route::get('/', function () {
        return view('main.base');
    })->fallback();
    Route::get('/{frontend}', function () {
        return view('main.base');
    })->where('frontend', '^(?!(\/)?(api|login|admin)).+');
});
