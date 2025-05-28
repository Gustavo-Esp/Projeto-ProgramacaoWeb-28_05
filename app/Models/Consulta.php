<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Consulta extends Model
{
    

    public function pacientes(){
        $this->hasMany(EditoraLivroAutor::class);
    }
}
