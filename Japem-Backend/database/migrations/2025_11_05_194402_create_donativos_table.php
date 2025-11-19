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
        Schema::create('donativos', function (Blueprint $table) {
            $table->id(); // ID autoincremental
            $table->string('id_japem')->unique();
            $table->string('nombre');
            $table->string('estatus')->nullable();
            $table->string('rubro')->nullable();
            $table->string('act_asistencial')->nullable();
            $table->string('poblacion')->nullable();
            $table->string('necesidad_pri')->nullable();
            $table->string('necesidad_sec')->nullable();
            $table->string('necesidad_com')->nullable();
            
            // Campos booleanos (SI/NO)
            $table->boolean('certificacion')->default(false);
            $table->boolean('candidato')->default(false);
            $table->boolean('donataria_aut')->default(false);
            $table->boolean('padron_ben')->default(false);

            $table->integer('veces_don')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('donativos');
    }
};
