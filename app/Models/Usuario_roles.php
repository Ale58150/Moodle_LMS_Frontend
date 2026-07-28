<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Usuario_roles extends Model
{
    protected $table = "usuario_roles";
    protected $primary_key = "id_usuario_rol";

    protected $fillable = [
        'id_usuario',
        'id_rol'
    ];
}
