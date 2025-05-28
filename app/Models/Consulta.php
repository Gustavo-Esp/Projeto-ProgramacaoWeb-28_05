<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Consulta extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'consultas';

    protected $fillable = [
        'dataHora',
        'status',
        'motivo',
        'pacienteID',
        'medicoID',
    ];

    protected $hidden = [
        'updated_at',
        'created_at',
    ];

    public function pagamentos()
    {
        $this->hasMany(Pagamento::class);
    }

    public function paciente()
    {
        $this->belongsTo(Paciente::class);
    }

    public function medico()
    {
        $this->belongsTo(Medico::class);
    }
}
