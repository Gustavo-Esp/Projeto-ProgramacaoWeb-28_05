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
        Schema::create('pagamentos', function (Blueprint $table) {
            $table->increments('id');
            $table->date('dataHora');
            $table->decimal('valor');
            $table->string('metodoPagamento');
            $table->foreignId('pacienteId')
                ->constrained('pacientes')
                ->onDelete('cascade');
            $table->foreignId('consultaId')
                ->constrained('consultas')
                ->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pagamentos');
    }
};
