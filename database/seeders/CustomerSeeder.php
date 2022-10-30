<?php

namespace Database\Seeders;

use App\Models\Customer;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;

class CustomerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach (range(1, 5) as $z) {
            Customer::create([
                'cust_code' => 'C' . Str::padLeft($z, 5, '0'),
                'cust_name' => 'Customer ' . $z,
            ]);
        }
    }
}
