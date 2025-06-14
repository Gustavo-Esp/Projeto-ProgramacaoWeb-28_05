<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class Consulta extends Model
{
    use HasFactory, Notifiable, SoftDeletes;

    protected $fillable = [
        'dataHora',
        'status',
        'motivo',
        'pacienteId',
        'medicoId',
    ];

    protected $hidden = [
        'remember_token',
        'updated_at',
        'created_at',
        'deleted_at',
    ];

     protected function casts(): array
    {
        return [
            //'email_verified_at' => 'datetime',
            //'senha' => 'hashed',
        ];
    }

    public function pagamentos()
    {
        return $this->hasMany(Pagamento::class, 'pagamentoId');
    }

    public function paciente()
    {
        return $this->belongsTo(Paciente::class, 'pacienteId');
    }

    public function medico()
    {
        return $this->belongsTo(Medico::class, 'medicoId');
    }
}
