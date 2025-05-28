<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateMedicoRequest extends FormRequest
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
          'name'=>'required|string|max:100',
          'especialidade'=>'required|string|max:50',
          'crm'=>'required|string|max:20',
          'telefone'=>'required|string|max:20',
          'email'=>'required|string|email|max:100|unique:users,email',
        ];
        
    }

    public function messages(){
        return [
            'name.required'=>'O nome do medico deve ser informado!',
            'especialidade.required'=>'A especialidade do medico deve ser informada!',
            'crm.required'=>'O crm do medico deve ser informado!',
            'telefone.required'=>'O telefone do medico deve ser informado!',
            'email.required'=>'O email do medico deve ser informado!',
        ];
    }
}
