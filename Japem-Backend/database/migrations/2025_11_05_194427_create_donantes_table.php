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
        Schema::create('donantes', function (Blueprint $table) {
            $table->id('id_donantes');
            $table->date('fecha');
            $table->string('no_oficio', 22);
            $table->string('donante', 255);
            $table->string('municipio', 100);
            $table->string('descripcion', 500);
            $table->decimal('costo_total', 10, 2)->default(0.00);
            $table->string('nota', 255)->nullable();
            $table->timestamps(); // created_at y updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('donantes');
    }
};

