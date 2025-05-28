<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProntuarioMedicoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'dataHora'=>'required|string|max:6',
            'descricao'=>'required|string|max:500',
            'prescricao'=>'required|string|max:500',
            'pacienteID'=>'required|integer|exists:pacientes,id',
            'medicoID'=>'required|integer|exists:medicos,id',
        ];
    }
}
