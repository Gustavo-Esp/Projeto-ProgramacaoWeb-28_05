<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class Pagamento extends Model
{
    use HasFactory, Notifiable, SoftDeletes;

    protected $fillable = [
        'dataHora',
        'valor',
        'metodoPagamento',
        'pacienteId',
        'consultaId',
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

    public function paciente()
    {
        return $this->belongsTo(Paciente::class, 'pacienteId');
    }

    public function consulta()
    {
        return $this->belongsTo(Consulta::class, 'consultaId');
    }
}
