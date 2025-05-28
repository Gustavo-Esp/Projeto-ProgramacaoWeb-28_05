<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePacienteRequest extends FormRequest
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
            'nome'=>'required|string|max:100',
            'dataNascimento'=>'required|string|max:6',
            'endereco'=>'required|string|max:200',
            'telefone'=>'required|string|max:20',
            'email'=>'required|string|email|max:100|unique:users,email',
        ];
    }
}
