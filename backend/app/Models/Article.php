<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    // This allows the Controller to save data to these columns
    protected $fillable = [
        'title',
        'url',
        'summary',
        'original_content',
        'updated_content',
        'references'
    ];
}
