<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UsuarioController;
use App\Http\Controllers\Api\LoginController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/login', [LoginController::class, 'login']);

Route::prefix('/user')->group(function(){
    Route::get('/index', [UsuarioController::class, 'index']);
    Route::post('/store', [UsuarioController::class, 'store']);
    Route::get('/show/{id}', [UsuarioController::class, 'show']);
    Route::delete('/destroy/{id}', [UsuarioController::class, 'destroy']);
    Route::put('/update/{id}', [UsuarioController::class, 'update']);
});


