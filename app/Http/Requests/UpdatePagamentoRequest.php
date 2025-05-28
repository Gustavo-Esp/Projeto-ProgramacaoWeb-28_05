<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePagamentoRequest extends FormRequest
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

    public function messages(){
        return [
            'dataHora.required'=>'A data do pagamento deve ser informado!',
            'valor.required'=>'O valor do pagamento deve ser informada!',
            'metodoPagamento.required'=>'O método de pagamento deve ser informado!',
            'paicienteID.required'=>'O ID do paciente deve ser informado!',
            'consultaID.required'=>'O ID da consulta deve ser informado!',
        ];
    }
}
