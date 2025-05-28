<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateConsultaRequest extends FormRequest
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

    public function messages(){
        return [
            'dataHora.required'=>'A data da consulta deve ser informada!',
            'status.required'=>'O status da consulta deve ser informado!',
            'motivo.required'=>'O motivo da consulta deve ser informado!',
            'pacienteID.required'=>'O ID do paciente deve ser informado!',
            'medicoID.required'=>'O ID do medico deve ser informado!',
        ];
    }
}
