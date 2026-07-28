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
        Schema::create('usuarios', function (Blueprint $table) {
            $table->id("id_usuario");

            $table->string('nombre');
            $table->string('apellido_paterno');
            $table->string('apellido_materno');
            $table->string('correo')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('contraseña_hash');
            $table->string('telefono')->nullable();

            $table->string('tipo_documento_identidad')->nullable();
            $table->string('numero_documento')->nullable();

            $table->date('fecha_nacimiento')->nullable();

            $table->string('genero')->nullable();

            $table->string('ciudad')->nullable();
            $table->string('pais')->nullable();

            $table->string('ocupacion')->nullable();

            $table->string('contacto_emergencia_nombre')->nullable();
            $table->string('contacto_emergencia_telefono')->nullable();

            $table->string('fotografia_ruta')->nullable();

            $table->boolean('estado')->default(true);

            $table->timestamp('correo_verificado_en')->nullable();
            $table->timestamp('ultimo_acceso_en')->nullable();
            $table->timestamps();
        });
    }
};
