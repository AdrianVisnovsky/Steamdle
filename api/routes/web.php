<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SteamdleController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

//Route::middleware(['throttle:ip_address'])->group(function () {
Route::get('/getDailyChallengeGame', [SteamdleController::class, 'getDailyChallengeGame']);
Route::get('/getServerDate', [SteamdleController::class, 'getServerDate']);
Route::get('/getServerDateTime', [SteamdleController::class, 'getServerDateTime']);
Route::put('/addSuccessfulGuess/{day}', [SteamdleController::class, 'addSuccessfulGuess']);
//});
