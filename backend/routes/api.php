<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ArticleController;

// Route to get all articles (for React) and save new ones (for Scraper)
Route::get('/articles', [ArticleController::class, 'index']);
Route::post('/articles', [ArticleController::class, 'store']);

// Route to update an article with LLM content (for Phase 2)
Route::put('/articles/{id}', [ArticleController::class, 'update']);
