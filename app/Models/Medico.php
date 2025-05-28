<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Medico extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'medicos';

    protected $fillable = [
        'nome',
        'especialidade',
        'crm',
        'telefone',
        'email',
    ];

    protected $hidden = [
        'updated_at',
        'created_at',
    ];

    public function consultas()
    {
        $this->hasMany(Consulta::class);
    }

    public function prontuariosMedico()
    {
        $this->hasMany(ProntuarioMedico::class);
    }
}
