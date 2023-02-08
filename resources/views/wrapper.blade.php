<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="robots" content="noindex">
    {{--    todo: favicons--}}
    @section("user-info")
        @if(!is_null(Auth::user()))
            window.User = {!! json_encode(Auth::user()->toObject()) !!}
        @endif
    @show
    <title>Document</title>
</head>
<body>

</body>
</html>
