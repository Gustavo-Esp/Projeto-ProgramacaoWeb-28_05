<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EditoraLivroAutor extends Model
{
    public function editora(){
        $this->belongsTo(Editora:class);
    }

    public function paciente(){
        $this->belongsTo(Paciente:class);
    }
}
