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
        Schema::create('prontuariosMedicos', function (Blueprint $table) {
            $table->increments('id')->usigned();
            $table->datetime('dataHora');
            $table->string('descricao', 500);
            $table->string('prescricao', 500);
             $table->foreignId('pacienteID')
                ->constrained('pacientes') // on(nome da tabela de origem)
                ->onDelete('cascade'); 
            $table->foreignId('medicoID')
                ->constrained('medicos') // on(nome da tabela de origem)
                ->onDelete('cascade'); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prontuariosMedicos');
    }
};
