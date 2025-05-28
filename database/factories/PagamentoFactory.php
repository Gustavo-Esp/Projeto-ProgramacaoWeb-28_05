<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Paciente>
 */
class PagamentoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'dataHora' => fake()->dateTime()->format('Y-m-d H:i:s'),
            'valor'=>fake()->randomFloat(2, 50, 500), 
            'metodoPagamento'=>fake()->metodoPagamento(),
            'pacienteID'=>fake()->numberBetween(1, 100),
            'consultaID'=>fake()->numberBetween(1, 50),
        ];
    }
}
