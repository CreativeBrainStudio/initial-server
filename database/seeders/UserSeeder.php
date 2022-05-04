<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
        [
          'role_id' => 1,
          'alias'   => 'Bene',
          'fname'  => 'Benedict',
          'mname' =>'Romero',  
          'lname'  => 'Pajarillaga',
          'email'    => 'dev@gmail.com',
          'password' => Hash::make('password'),           
        ],
        [
          'role_id'   => 2,
          'alias'     => 'Earle',
          'fname'    => 'Earle',
          'mname'    => 'Romero',  
          'lname'    => 'Pajarillaga',
          'email'    => 'admin@gmail.com',
          'password' => Hash::make('password'),
        ],
        [
          'role_id'   => 3,
          'alias'     => 'Bene',
          'fname'    => 'Beg',
          'mname'    => 'Romero',  
          'lname'    => 'Pajarillaga',
          'email'    => 'author@gmail.com',
          'password' => Hash::make('password'),
        ],
        [
          'role_id'   => 4,
          'alias'     => 'Gab',
          'fname'    => 'Gabriel',
          'mname' =>'Romero',  
          'lname'    => 'Pajarillaga',
          'email'    => 'employee@gmail.com',
          'password' => Hash::make('password'),
        ]
      ]);
    }
}
