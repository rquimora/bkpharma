<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/customers', [\App\Http\Controllers\Api\CustomerController::class, 'list']);
Route::get('/products', [\App\Http\Controllers\Api\ProductController::class, 'list']);
Route::get('/orders', [\App\Http\Controllers\Api\OrderController::class, 'listOrders']);
Route::get('/edit/{order}', [\App\Http\Controllers\Api\OrderController::class, 'editOrder']);
Route::post('/submit-order', [\App\Http\Controllers\Api\OrderController::class, 'postOrders']);
Route::post('/cancel/{order}', [\App\Http\Controllers\Api\OrderController::class, 'postCancel']);
