<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UsuarioController;
use App\Http\Controllers\Api\LoginController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/login', [LoginController::class, 'login']);
Route::post('/logout', [LoginController::class, 'logout']);

# get(endereço digitado, método a ser usado)
Route::prefix('/user')->group(function (){
    Route::get('/index', [UsuarioController::class, 'index']);
    Route::get('/show/{id}', [UsuarioController::class, 'show']);
    Route::delete('/destroy/{id}', [UsuarioController::class, 'destroy']);
    Route::post('/store', [UsuarioController::class, 'store']);
    Route::put('/update/{id}', [UsuarioController::class, 'update']);
});

/*
    Route::get('/user/index', [UsuarioController::class, 'index']);
    Route::get('/user/show/{id}', [UsuarioController::class, 'show']);
    Route::delete('/user/destroy/{id}', [UsuarioController::class, 'destroy']);
    Route::post('/user/store', [UsuarioController::class, 'store']);
    Route::put('/user/update/{id}', [UsuarioController::class, 'update']);
*/
