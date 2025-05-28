<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Paciente>
 */
class ProntuarioMedicoFactory extends Factory
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
            'descricao'=>fake()->descricao(),
            'prescricao'=>fake()->prescricao(),
            'pacienteID'=>fake()->numberBetween(1, 100),
            'medicoID'=>fake()->numberBetween(1, 50),
        ];
    }
}
