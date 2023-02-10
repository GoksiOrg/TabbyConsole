<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="robots" content="noindex">
    <link rel="icon" type="image/png" href={{url("/img/favicon-32x32.png")}} sizes="32x32">
    <link rel="icon" type="image/png" href={{url("/img/favicon-16x16.png")}} sizes="16x16">
    {{--    todo: favicons--}}
    @section("user-info")
        @if(\Illuminate\Support\Facades\Auth::check())
            <script>
                window.User = {!! json_encode(Auth::user()->toObject()) !!};
            </script>
        @endif
    @show
    @vite(['resources/sass/app.scss', 'resources/js/index.tsx'])
    {{--    GlobalStylesheet--}}
    <style>
        body {
            background-color: #1a202c;
            color: white;
        }
    </style>
    <title>{{ config('app.name', 'RemoteConsole') }}</title>
</head>
<body>
<noscript>You need JavaScript to run this app !</noscript>
@section('content')
    @yield('above-container')
    @yield('container')
    @yield('below-container')
@show
</body>
</html>
