<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePagamentoRequest extends FormRequest
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
            'valor'=>'required|numeric|max:50',
            'metodoPagamento'=>'required|string|max:20',
            'pacienteID'=>'required|integer|exists:pacientes,id',
            'consultaID'=>'required|integer|exists:consultas,id',
        ];
    }
}
