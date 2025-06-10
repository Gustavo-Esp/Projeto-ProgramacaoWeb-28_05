<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProntuarioMedico extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'prontuariosMedico';

    protected $fillable = [
        'dataHora',
        'descricao',
        'prescricao',
        'pacienteID',
        'medicoID',
    ];

    protected $hidden = [
        'updated_at',
        'created_at',
        "deleted_at",
    ];

    public function paciente()
    {
        $this->belongsTo(Paciente::class);
    }

    public function medico()
    {
        $this->belongsTo(Medico::class);
    }
}
