<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class ProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $productsData = [
            ['id' => 1, 'name' => 'Coca-Cola', 'price' => 20, 'stock' => 10, 'image' => '/images/coke.jpg'],
            ['id' => 2, 'name' => 'Sprite', 'price' => 18,  'stock' => 5, 'image' => '/images/sprite.jpg'],
            ['id' => 3, 'name' => 'Water', 'price' => 10, 'stock' => 1, 'image' => '/images/water.jpg'],
        ];

        DB::table('products')->insert($productsData);
    }
}
