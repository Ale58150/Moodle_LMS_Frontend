<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cursos', function (Blueprint $table) {
            $table->id("id_curso");
            $table->string('nombre');
            $table->string('slugUQ')->unique();
            $table->string('descripcion_corta')->nullable();
            $table->string('descripcion_completa')->nullable();
            $table->string('modalidad_base')->nullable();
            $table->string('duracion_horas')->nullable();
            $table->string('duracion_meses')->nullable();
            $table->string("ruta_portada");
            $table->boolean("otorga_certificado")->nullable();
            $table->string("estado")->default("activo");
            $table->unsignedBigInteger("id_usuario_creador");
            $table->foreign('id_usuario_creador')
                ->references('id_usuario')
                ->on('usuarios')
                ->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cursos');
    }
};
