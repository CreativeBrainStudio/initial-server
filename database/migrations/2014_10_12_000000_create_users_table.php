<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
           $table->unsignedBigInteger('role_id')->nullable();
            $table->string('alias')->comment('nickname')->nullable();
            $table->string('fname');
            $table->string('mname')->nullable();
            $table->string('lname');
            $table->boolean('is_male')->default(true);
            $table->string('phone')->nullable();
            $table->date('dob')->nullable()->comment('date of birth');
            $table->string('address')->nullable();
            $table->string('image')->nullable();            
            $table->string('email')->unique()->nullable();
            $table->string('password')->nullable();
            $table->string('session_id')->nullable();
            $table->string('sessionArray')->nullable();    
            $table->rememberToken();
            $table->softDeletes();
            $table->timestamps();
            // index
            $table->foreign('role_id')->references('id')->on('roles')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
