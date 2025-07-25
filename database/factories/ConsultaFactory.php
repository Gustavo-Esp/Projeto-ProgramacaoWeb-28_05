<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Paciente>
 */
class ConsultaFactory extends Factory
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
            'status'=>fake()->status(),
            'motivo'=>fake()->motivo(),
            'pacienteId'=>fake()->numberBetween(1, 100),
            'medicoId'=>fake()->numberBetween(1, 50),
        ];
    }
}
