<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

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
    ];



    public function paciente(){
        $this->belongsTo(User::class);
    }

    public function consultas(){
        $this->hasMany(EditoraLivroAutor::class);
    }
}
