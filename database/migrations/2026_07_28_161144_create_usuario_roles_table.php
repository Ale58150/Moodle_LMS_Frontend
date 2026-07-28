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
        Schema::create('usuario_roles', function (Blueprint $table) {
            $table->unsignedBigInteger('id_usuario');
            $table->unsignedBigInteger('id_rol');
            $table->unsignedBigInteger('asignado_por');
            $table->timestamp('asignado_en')
                ->useCurrent();
            $table->primary([
                'id_usuario',
                'id_rol'
            ]);
            $table->foreign('id_usuario')
                ->references('id_usuario')
                ->on('usuarios')
                ->cascadeOnDelete();
            $table->foreign('id_rol')
                ->references('id_rol')
                ->on('rols')
                ->cascadeOnDelete();
            $table->foreign('asignado_por')
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
        Schema::dropIfExists('usuario_roles');
    }
};
