<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\View\View;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function index(): View
    {
        return view('main.base');
    }

    public function login(Request $request): JsonResponse
    {
        $credentials = $request->validate([
            'username' => "required|min:4",
            'password' => "required|min:7|regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/"
        ]);
        $success = false;
        if (Auth::attempt($credentials, $request->input('remember_me') ?? false)) {
            $request->session()->regenerate();
            $success = true;
        }
        return new JsonResponse([
            'success' => $success,
            'redirect' => Redirect::intended()->getTargetUrl()
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return new JsonResponse([
            'success' => true
        ]);
    }
}
