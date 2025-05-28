<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProntuarioMedicoRequest extends FormRequest
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

    public function messages(){
        return [
            'dataHora.required'=>'A data do prontuário médico deve ser informada!',
            'descricao.required'=>'A descrição do prontuário medico deve ser informada!',
            'prescricao.required'=>'A prescrição do prontuário medico deve ser informada!',
            'pacienteID.required'=>'O ID do paciente deve ser informado!',
            'medicoID.required'=>'O ID do medico deve ser informado!',
        ];
    }
}
