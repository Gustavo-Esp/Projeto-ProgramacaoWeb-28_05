<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class Medico extends Model
{
    use HasFactory, Notifiable, SoftDeletes;

    protected $fillable = [
        'nome',
        'especialidade',
        'crm',
        'telefone',
        'email',
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

    public function consultas()
    {
        return $this->hasMany(Consulta::class, 'consultaId');
    }

    public function prontuariosMedico()
    {
        return $this->hasMany(ProntuarioMedico::class, 'prontuarioMedicoId');
    }
}
