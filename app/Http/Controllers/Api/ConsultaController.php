<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use App\Models\Consulta;

class ConsultaController extends Controller
{
    public function index(Request $request)
    {

        $page = $request->get('page',1);
        $pageSize = $request->get('pageSize',10);
        $dir = $request->get('dir','asc');
        $props = $request->get('props','id');
        $search = $request->get('search','');

        $query = Consulta::select('id', 'dataHora', 'status', 'motivo', 'pacienteID', 'medicoID', 'created_at', 'updated_at')
            ->whereNull('deleted_at')
            ->orderBy($props, $dir);

        $total = $query->count();

        $data = $query->offset(($page - 1) * $pageSize)
            ->limit($pageSize)
            ->get();

        $totalPages = ceil($total / $pageSize);
       
        return response()->json([
            'message'=>'Relatório de consultas',
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
            'status'=>'required|string|max:20',
            'motivo'=>'required|string|max:200',
            'pacienteID'=>'required|integer|exists:pacientes,id',
            'medicoID'=>'required|integer|exists:medicos,id',
        ]);

        if ($validator->fails()){
            return response()->json([
                'message'=>'Erro nas informações da consulta',
                'data'=>$validator->errors(),
                'status'=>404,
            ],404);
        }

        $data = Paciente::create([
            'dataHora'=>$request->dataHora,
            'status'=>$request->status,
            'motivo'=>$request->motivo,
            'pacienteID'=>$request->pacienteID,
            'medicoID'=>$request->medicoID,
        ]);

        return response()->json([
            'message'=>'Consulta cadastrada com sucesso',
            'data'=>$data,
            'status'=>201,
        ],201);
    }

    public function show(Request $request, string $id)
    {
        $data = Consulta::findOrFail($id);

        if(!$data){
            throw new HttpResponseException(
                response()->json('Consulta não localizada'),
                404,
            );
        }

        return response()->json([
            'message'=>'Consulta localizada com sucesso',
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
            'status'=>'required|string|max:20',
            'motivo'=>'required|string|max:200',
            'pacienteID'=>'required|int',
            'medicoID'=>'required|int'
        ]);

        if ($validator->fails()){
            return response()->json([
                'message'=>'Erro nas informações da consulta',
                'data'=>$validator->errors(),
                'status'=>404,
            ],404);
        }

        $data = Consulta::find($id);

        if(!$data){
            return response()->json([
                'message'=>'Consulta não localizada',
                'data'=>$data,
                'status'=>404,
            ],404);
        }

        $data->dataHora = $request->dataHora ?? $data->dataHora;
        $data->status = $request->status ?? $data->status;
        $data->motivo = $request->motivo ?? $data->motivo;
        $data->pacienteID = $request->pacienteID ?? $data->pacienteID;
        $data->medicoID = $request->medicoID ?? $data->medicoID;

        /*if ($request->has('password')){
            $data->password = Hash::make($request->password);
        }*/

        $data->save();

        return response()->json([
            'message'=>'Consulta alterada com sucesso',
            'data'=>$data,
            'status'=>200,
        ],200);

    }

    public function destroy(Request $request, string $id)
    {
        
        $data = Consulta::findOrFail($id);

        if(!$data){
            return response()->json([
                'message'=>'Consulta não localizada',
                'data'=>$data,
                'status'=>404,
            ],404);
        }

        $data->delete();

        return response()->json([
            'message'=>'Consulta excluída com sucesso',
            'data'=>$data,
            'status'=>200,
        ],200);
    }
}
