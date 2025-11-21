<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DonativoController;
use App\Http\Controllers\DonanteController;

// O manualmente:
Route::get('/donativos', [DonativoController::class, 'index']); //  <-- Nueva ruta GET
Route::post('/donativos', [DonativoController::class, 'store']); // <-- Nueva ruta POST
Route::get('/donativos/{id}', [DonativoController::class, 'show']); //  <-- Nueva ruta GET
Route::put('/donativos/{id}', [DonativoController::class, 'update']); // <-- Nueva ruta PUT


Route::get('/donantes', [DonanteController::class, 'index']);// <-- Nueva ruta GET
Route::get('/donantes/{id}', [DonanteController::class, 'show']); //  <-- Nueva ruta GET
Route::post('/donantes', [DonanteController::class, 'store']); // <-- Nueva ruta POST
Route::put('/donantes/{id}', [DonanteController::class, 'update']); // <-- Nueva ruta PUT