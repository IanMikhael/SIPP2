<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GadaiEmasController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');




Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/dashboard', [DashboardController::class,'index'])->name('dashboard');
    Route::get('/gadai-emas', [GadaiEmasController::class, 'index'])->name('gadai-emas.index');
    Route::get('/gadai-emas/create', [GadaiEmasController::class, 'create'])->name('gadai-emas.create');
    Route::post('/gadai-emas/store', [GadaiEmasController::class, 'store'])->name('gadai-emas.store');
    Route::get('/gadai-emas/{gadaiEmas}', [GadaiEmasController::class, 'show'])->name('gadai-emas.show');
    Route::get('/gadai-emas/{gadaiEmas}/edit', [GadaiEmasController::class, 'edit'])->name('gadai-emas.edit');
    Route::put('/gadai-emas/{gadaiEmas}', [GadaiEmasController::class, 'update'])->name('gadai-emas.update');
    Route::delete('/gadai-emas/{gadaiEmas}', [GadaiEmasController::class, 'destroy'])
    ->name('gadai-emas.destroy');
});

require __DIR__.'/auth.php';
