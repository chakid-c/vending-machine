<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $table = 'products';

    //fillable
    protected $fillable = ['name', 'price', 'stock', 'image'];
}
