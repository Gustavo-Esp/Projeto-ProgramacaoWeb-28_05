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

    Route::prefix('/paciente')->group(function (){
    Route::get('/index', [PacienteController::class, 'index']);
    Route::get('/show/{id}', [PacienteController::class, 'show']);
    Route::delete('/destroy/{id}', [PacienteController::class, 'destroy']);
    Route::post('/store', [PacienteController::class, 'store']);
    Route::put('/update/{id}', [PacienteController::class, 'update']);
});

    Route::prefix('/medico')->group(function (){
    Route::get('/index', [MedicoController::class, 'index']);
    Route::get('/show/{id}', [MedicoController::class, 'show']);
    Route::delete('/destroy/{id}', [MedicoController::class, 'destroy']);
    Route::post('/store', [MedicoController::class, 'store']);
    Route::put('/update/{id}', [MedicoController::class, 'update']);
});

    Route::prefix('/consulta')->group(function (){
    Route::get('/index', [ConsultaController::class, 'index']);
    Route::get('/show/{id}', [ConsultaController::class, 'show']);
    Route::delete('/destroy/{id}', [ConsultaController::class, 'destroy']);
    Route::post('/store', [ConsultaController::class, 'store']);
    Route::put('/update/{id}', [ConsultaController::class, 'update']);
});

    Route::prefix('/prontuarioMedico')->group(function (){
    Route::get('/index', [ProntuarioMedicoController::class, 'index']);
    Route::get('/show/{id}', [ProntuarioMedicoController::class, 'show']);
    Route::delete('/destroy/{id}', [ProntuarioMedicoController::class, 'destroy']);
    Route::post('/store', [ProntuarioMedicoController::class, 'store']);
    Route::put('/update/{id}', [ProntuarioMedicoController::class, 'update']);
});

    Route::prefix('/pagamento')->group(function (){
    Route::get('/index', [PagamentoController::class, 'index']);
    Route::get('/show/{id}', [PagamentoController::class, 'show']);
    Route::delete('/destroy/{id}', [PagamentoController::class, 'destroy']);
    Route::post('/store', [PagamentoController::class, 'store']);
    Route::put('/update/{id}', [PagamentoController::class, 'update']);
});
