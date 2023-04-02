<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('daily_challenge', function (Blueprint $table) {
            $table->id('ID');
            $table->date('Day')->unique();
            $table->integer('AppId');
            $table->integer('PlayerCount');
            $table->integer('Guessed');
            $table->timestamps();

            $table->foreign('AppId')->references('AppId')->on('games');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('daily_challenge');
    }
};
