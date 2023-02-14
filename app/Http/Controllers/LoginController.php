<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\URL;
use Illuminate\View\View;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    use AuthenticatesUsers;

    public function index(): RedirectResponse|View
    {
        if (Auth::check()) {
            $previous = URL::previousPath();
            return redirect($previous == "/login" ? "/" : $previous); /*TODO: check da li je ovo dobro*/
        }
        return view('main.base');
    }

    public function login(Request $request): JsonResponse
    {
        if ($this->hasTooManyLoginAttempts($request)) return new JsonResponse([
            'success' => false,
            'redirect' => "",
            'error' => "too_many_attempts"
        ]);
        $credentials = $request->validate([
            'username' => "required|min:4",
            'password' => "required|min:7|regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/"
        ]);
        $success = false;
        if (Auth::attempt($credentials, $request->input('remember_me') ?? false)) {
            $request->session()->regenerate();
            $success = true;
            $this->clearLoginAttempts($request);
        } else $this->incrementLoginAttempts($request);
        return new JsonResponse([
            'success' => $success,
            'redirect' => Redirect::intended()->getTargetUrl()
        ]);
    }

    public function logout(Request $request): RedirectResponse
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('login');
    }
}
