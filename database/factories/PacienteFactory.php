<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Paciente>
 */
class PacienteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nome'=>fake()->name(),
            'dataNascimento'=>fake()->date('Y-m-d'),
            'endereco'=>fake()->address(),
            'telefone'=>fake()->tollFreePhoneNumber(),
            'email'=>fake()->safeEmail(),
        ];
    }
}
