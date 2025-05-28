<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Pagamento extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'pagamentos';

    protected $fillable = [
        'dataHora',
        'valor',
        'metodoPagamento',
        'pacienteID',
        'consultaID',
    ];

    protected $hidden = [
        'updated_at',
        'created_at',
    ];

    public function paciente()
    {
        $this->belongsTo(Paciente::class);
    }

    public function consulta()
    {
        $this->belongsTo(Consulta::class);
    }
}
