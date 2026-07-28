<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    protected $table = "Usuarios";
    protected $primary_key = "id_usuario";

    protected $fillable = [
        'nombre',
        'apellido_paterno',
        'apellido_materno',
        'correo',
        'contraseña_hash',
        'telefono',
        'tipo_documento_identidad',
        'numero_documento',
        'fecha_nacimiento',
        'genero',
        'ciudad',
        'pais',
        'ocupacion',
        'contacto_emergencia_nombre',
        'contacto_emergencia_telefono',
        'fotografia_ruta',
        'estado'
    ];
}
