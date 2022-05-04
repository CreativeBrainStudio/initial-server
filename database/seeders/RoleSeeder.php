<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      DB::table('roles')->insert([
        [
          'id'   => 1, 
          'name'   => 'dev',
          'display_name'  => 'Developer',
        ],  
        [
          'id'   => 2,
          'name'   => 'admin',
          'display_name'  => 'Administrator',
        ], 
        [
          'id'   => 3,
          'name'   => 'author',
          'display_name'  => 'Author',
        ], 
        [
          'id'   => 4,
          'name'   => 'employee',
          'display_name' => 'Employee',
        ],        
      ]);
    }
}
