<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Donativo extends Model
{
    use HasFactory;

    // Nombre de la tabla
    protected $table = 'donativos';

    // Campos permitidos para asignación masiva
    protected $fillable = [
        'id_japem',
        'nombre',
        'estatus',
        'rubro',
        'act_asistencial',
        'poblacion',
        'necesidad_pri',
        'necesidad_sec',
        'necesidad_com',
        'certificacion',
        'candidato',
        'donataria_aut',
        'padron_ben',
        'veces_don',
    ];
}
