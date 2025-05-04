<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});


// Basics Project -1

use App\Http\Controllers\BasicController;
Route::get('basic/list', [BasicController::class, 'index'])->name('index');
Route::get('basic/create', [BasicController::class, 'create'])->name('create');
Route::post('basic/store', [BasicController::class,'store'])->name('basic.store');
Route::get('basic/show', [BasicController::class, 'show'])->name('basic.show');
Route::get('basics/edit/{id}', [BasicController::class, 'edit'])->name('basic.edit');