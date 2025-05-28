<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use App\Models\Paciente;
use App\Http\Request\StorePacienteRequest;

class PacienteController extends Controller
{
    public function index(Request $request)
    {

        $page = $request->get('page',1);
        $pageSize = $request->get('pageSize',5);
        $dir = $request->get('dir','asc');
        $props = $request->get('props','id');
        $search = $request->get('search','');

        $query = Paciente::select('id', 'name', 'dataNascimento', 'endereco', 'telefone', 'email', 'created_at', 'updated_at')
            ->whereNull('deleted_at')
            ->orderBy($props, $dir);

        $total = $query->count();

        $data = $query->offset(($page - 1) * $pageSize)
            ->limit($pageSize)
            ->get();

        $totalPages = ceil($total / $pageSize);
       
        return response()->json([
            'message'=>'Relatório de pacientes',
            'status'=>200,
            'page' =>$page,
            'pageSize' =>$pageSize,
            'dir' =>$dir,
            'props' =>$props,
            'search' =>$search,
            'total' =>$total,
            'totalPages' =>$totalPages,
            'data' =>$data,
            
        ],200);
    }

    public function create()
    {
        
    }

    public function store(StorePacienteRequest $request)
    {
        $validator = Validator::make($request->all(),[
            'nome'=>'required|string|max:100',
            'dataNascimento'=>'required|string|max:6',
            'endereco'=>'required|string|max:200',
            'telefone'=>'required|string|max:20',
            'email'=>'required|string|email|max:100|unique:users,email'
        ]);

        if ($validator->fails()){
            return response()->json([
                'message'=>'Erro nas informações do paciente',
                'data'=>$validator->errors(),
                'status'=>404,
            ],404);
        }

        $data = Paciente::create([
            'nome'=>$request->name,
            'dataNascimento'=>$request->dataNascimento,
            'endereco'=>$request->endereco,
            'telefone'=>$request->telefone,
            'email'=>$request->email,
        ]);

        return response()->json([
            'message'=>'Paciente cadastrado com sucesso',
            'data'=>$data,
            'status'=>201,
        ],201);
    }

    public function show(Request $request, string $id)
    {
        $data = Paciente::findOrFail($id);

        if(!$data){
            throw new HttpResponseException(
                response()->json('Paciente não localizado'),
                404,
            );
        }

        return response()->json([
            'message'=>'Paciente localizado com sucesso',
            'data'=>$data,
            'status'=>200,
        ],200);
    }

    public function edit(string $id)
    {
       
    }

    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(),[
            'nome'=>'required|string|max:100',
            'dataNascimento'=>'required|string|max:6',
            'endereco'=>'required|string|max:200',
            'telefone'=>'required|string|max:20',
            'email'=>'required|string|email|max:100|unique:users,email',
        ]);

        if ($validator->fails()){
            return response()->json([
                'message'=>'Erro nas informações do paciente',
                'data'=>$validator->errors(),
                'status'=>404,
            ],404);
        }

        $data = Paciente::find($id);

        if(!$data){
            return response()->json([
                'message'=>'Paciente não localizado',
                'data'=>$data,
                'status'=>404,
            ],404);
        }

        $data->nome = $request->nome ?? $data->nome;
        $data->dataNascimento = $request->dataNascimento ?? $data->dataNascimento;
        $data->endereco = $request->endereco ?? $data->endereco;
        $data->telefone = $request->telefone ?? $data->telefone;
        $data->email = $request->email ?? $data->email;

        /*if ($request->has('password')){
            $data->password = Hash::make($request->password);
        }*/

        $data->save();

        return response()->json([
            'message'=>'Paciente alterado com sucesso',
            'data'=>$data,
            'status'=>200,
        ],200);

    }

    public function destroy(Request $request, string $id)
    {
        
        $data = Paciente::findOrFail($id);

        if(!$data){
            return response()->json([
                'message'=>'Paciente não localizado',
                'data'=>$data,
                'status'=>404,
            ],404);
        }

        $data->delete();

        return response()->json([
            'message'=>'Paciente excluído com sucesso',
            'data'=>$data,
            'status'=>200,
        ],200);
    }
}
