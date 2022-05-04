<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;

use App\Http\Controllers\RoleController; 

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::prefix('/auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/save', [AuthController::class, 'register']);
    Route::post('/forgot', [ForgotController::class, 'forgot']);
    Route::post('/reset', [ForgotController::class, 'reset']);
    Route::get('/look', [AuthController::class, 'exist']);
    Route::post('/upload', [AuthController::class, 'upload']);
});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('/roles')->group(function () {
    Route::get('/', [RoleController::class, 'index']);
    Route::get('/list', [RoleController::class, 'list']);
    Route::post('/save', [RoleController::class, 'save']);
    Route::put('/{role}/update', [RoleController::class, 'update']);
    Route::delete('/{role}/destroy', [RoleController::class, 'destroy']);
});
