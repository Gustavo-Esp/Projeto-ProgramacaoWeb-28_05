<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use App\Models\User;

class ProntuarioMedicoController extends Controller
{
    public function index(Request $request)
    {

        $page = $request->get('page',1);
        $pageSize = $request->get('pageSize',5);
        $dir = $request->get('dir','asc');
        $props = $request->get('props','id');
        $search = $request->get('search','');

        $query = ProntuarioMedico::select('id', 'dataHora', 'descricao', 'prescricao')
            ->whereNull('deleted_at')
            ->orderBy($props, $dir);

        $total = $query->count();

        $data = $query->offset(($page - 1) * $pageSize)
            ->limit($pageSize)
            ->get();

        $totalPages = ceil($total / $pageSize);
       
        return response()->json([
            'message'=>'Relatório de prontuários médicos',
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
            'dataHora'=>'required|string|max:6',
            'descricao'=>'required|string|max:500',
            'prescricao'=>'required|string|max:500',
        ]);

        if ($validator->fails()){
            return response()->json([
                'message'=>'Erro nas informações do prontuário médico',
                'data'=>$validator->errors(),
                'status'=>404,
            ],404);
        }

        $data = Medico::create([
            'dataHora'=>$request->dataHora,
            'descricao'=>$request->descricao,
            'prescricao'=>$request->prescricao,
        ]);

        return response()->json([
            'message'=>'Prontuário Médico cadastrado com sucesso',
            'data'=>$data,
            'status'=>201,
        ],201);
    }

    public function show(Request $request, string $id)
    {
        $data = ProntuarioMedico::findOrFail($id);

        if(!$data){
            throw new HttpResponseException(
                response()->json('Prontuário Médico não localizado'),
                404,
            );
        }

        return response()->json([
            'message'=>'Prontuário Médico localizado com sucesso',
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
            'dataHora'=>'required|string|max:6',
            'descricao'=>'required|string|max:500',
            'prescricao'=>'required|string|max:500',
        ]);

        if ($validator->fails()){
            return response()->json([
                'message'=>'Erro nas informações do prontuário médico',
                'data'=>$validator->errors(),
                'status'=>404,
            ],404);
        }

        $data = ProntuarioMedico::find($id);

        if(!$data){
            return response()->json([
                'message'=>'Prontuário Médico não localizado',
                'data'=>$data,
                'status'=>404,
            ],404);
        }

        $data->dataHora = $request->dataHora ?? $data->dataHora;
        $data->descricao = $request->descricao ?? $data->descricao;
        $data->prescricao = $request->prescricao ?? $data->prescricao;

        /*if ($request->has('password')){
            $data->password = Hash::make($request->password);
        }*/

        $data->save();

        return response()->json([
            'message'=>'Prontuário Médico alterado com sucesso',
            'data'=>$data,
            'status'=>200,
        ],200);

    }

    public function destroy(Request $request, string $id)
    {
        
        $data = ProntuarioMedico::findOrFail($id);

        if(!$data){
            return response()->json([
                'message'=>'Prontuario Médico não localizado',
                'data'=>$data,
                'status'=>404,
            ],404);
        }

        $data->delete();

        return response()->json([
            'message'=>'Prontuario Médico excluído com sucesso',
            'data'=>$data,
            'status'=>200,
        ],200);
    }
}
