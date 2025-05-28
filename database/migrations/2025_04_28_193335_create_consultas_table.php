<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('consultas', function (Blueprint $table) {
            $table->increments('id')->usigned();
            $table->datetime('dataHora');
            $table->string('status', 20);
            $table->string('motivo', 200);
             $table->foreignId('pacienteID')
                ->constrained('Paciente') // on(nome da tabela de origem)
                ->onDelete('cascade'); 
            $table->foreignId('medicoID')
                ->constrained('Medico') // on(nome da tabela de origem)
                ->onDelete('cascade'); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('consultas');
    }
};
