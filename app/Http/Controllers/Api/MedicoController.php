<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use App\Models\User;

class MedicoController extends Controller
{
    public function index(Request $request)
    {

        $page = $request->get('page',1);
        $pageSize = $request->get('pageSize',10);
        $dir = $request->get('dir','asc');
        $props = $request->get('props','id');
        $search = $request->get('search','');

        $query = Medico::select('id', 'nome', 'especialidade', 'crm', 'telefone', 'email', 'created_at', 'updated_at')
            ->whereNull('deleted_at')
            ->orderBy($props, $dir);

        $total = $query->count();

        $data = $query->offset(($page - 1) * $pageSize)
            ->limit($pageSize)
            ->get();

        $totalPages = ceil($total / $pageSize);
       
        return response()->json([
            'message'=>'Relatório de médicos',
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

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'nome'=>'required|string|max:100',
            'especialidade'=>'required|string|max:50',
            'crm'=>'required|string|max:20',
            'telefone'=>'required|string|max:20',
            'email'=>'required|string|email|max:100|unique:users,email',
        ]);

        if ($validator->fails()){
            return response()->json([
                'message'=>'Erro nas informações do médico',
                'data'=>$validator->errors(),
                'status'=>404,
            ],404);
        }

        $data = Medico::create([
            'nome'=>$request->nome,
            'especialidade'=>$request->especialidade,
            'crm'=>$request->crm,
            'telefone'=>$request->telefone,
            'email'=>$request->email,
        ]);

        return response()->json([
            'message'=>'Médico cadastrado com sucesso',
            'data'=>$data,
            'status'=>201,
        ],201);
    }

    public function show(Request $request, string $id)
    {
        $data = Medico::findOrFail($id);

        if(!$data){
            throw new HttpResponseException(
                response()->json('Médico não localizado'),
                404,
            );
        }

        return response()->json([
            'message'=>'Médico localizado com sucesso',
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
            'especialidade'=>'required|string|max:50',
            'crm'=>'required|string|max:20',
            'telefone'=>'required|string|max:20',
            'email'=>'required|string|email|max:100|unique:users,email',
        ]);

        if ($validator->fails()){
            return response()->json([
                'message'=>'Erro nas informações do médico',
                'data'=>$validator->errors(),
                'status'=>404,
            ],404);
        }

        $data = Medico::find($id);

        if(!$data){
            return response()->json([
                'message'=>'Médico não localizado',
                'data'=>$data,
                'status'=>404,
            ],404);
        }

        $data->nome = $request->nome ?? $data->nome;
        $data->especialidade = $request->especialidade ?? $data->especialidade;
        $data->crm = $request->crm ?? $data->crm;
        $data->telefone = $request->telefone ?? $data->telefone;
        $data->email = $request->email ?? $data->email;

        /*if ($request->has('password')){
            $data->password = Hash::make($request->password);
        }*/

        $data->save();

        return response()->json([
            'message'=>'Médico alterado com sucesso',
            'data'=>$data,
            'status'=>200,
        ],200);

    }

    public function destroy(Request $request, string $id)
    {
        
        $data = Medico::findOrFail($id);

        if(!$data){
            return response()->json([
                'message'=>'Médico não localizado',
                'data'=>$data,
                'status'=>404,
            ],404);
        }

        $data->delete();

        return response()->json([
            'message'=>'Médico excluído com sucesso',
            'data'=>$data,
            'status'=>200,
        ],200);
    }
}
