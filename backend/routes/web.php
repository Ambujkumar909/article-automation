<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;

Route::get('/', function () {
    return view('welcome');
});

// 🔍 RAW DB CONNECTION TEST
Route::get('/raw-db-test', function () {
    $start = microtime(true);
    DB::connection()->getPdo();
    return round(microtime(true) - $start, 2);
});
