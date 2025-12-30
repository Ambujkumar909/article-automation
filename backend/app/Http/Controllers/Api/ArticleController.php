<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{

    public function index()
    {
        return response()->json(Article::orderBy('created_at', 'desc')->get());
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'url' => 'required|url|unique:articles,url',
            'original_content' => 'required|string',
        ]);

        $article = Article::create($validated);

        return response()->json([
            'message' => 'Article saved successfully',
            'data' => $article
        ], 201);
    }


    public function show(string $id)
    {
        return Article::findOrFail($id);
    }

    /**
     * Update the resource (Used by Node script in Phase 2 for LLM content).
     */
    public function update(Request $request, string $id)
    {
        $article = Article::findOrFail($id);

        $article->update($request->only([
            'summary',
            'updated_content',
            'references'
        ]));

        return response()->json([
            'message' => 'Article updated with LLM content',
            'data' => $article
        ]);
    }


    public function destroy(string $id)
    {
        Article::findOrFail($id)->delete();
        return response()->json(['message' => 'Article deleted']);
    }
}
