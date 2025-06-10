<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Paciente extends Model
{
    use HasFactory;

    protected $table='pacientes';

    protected $fillable = [
        'nome', 
        'dataNascimento',
        'endereco',
        'telefone',
        'email'
    ];

    protected $hidden = [
        "updated_at",
        "created_at",
        "deleted_at",
    ];

    public function pagamentos(){
        $this->hasMany(Pagamento::class);
    }

    public function consultas(){
        $this->hasMany(Consulta::class);
    }

    public function prontuariosMedico(){
        $this->hasMany(prontuarioMedico::class);
    }
}
