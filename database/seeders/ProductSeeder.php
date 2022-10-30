<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach(range(1,10) as $z)
        {
            Product::create([
                'prod_code' => 'P' . Str::padLeft($z,'5','0'),
                'prod_name' => 'Product ' . $z,
                'price' => $z * 5,
            ]);
        }
    }
}
