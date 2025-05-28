<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreConsultaRequest extends FormRequest
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
            'status'=>'required|string|max:20',
            'motivo'=>'required|string|max:200',
            'pacienteID'=>'required|integer|exists:pacientes,id',
            'medicoID'=>'required|integer|exists:medicos,id',
        ];
    }
}
