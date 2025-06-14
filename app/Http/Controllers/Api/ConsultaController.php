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

        $query = Consulta::with('paciente', 'medico')
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

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'dataHora'=>'required|date',
            'status'=>'required|string|max:20',
            'motivo'=>'required|string|max:200',
            'pacienteId'=>'required|string|max:200',
            'medicoId'=>'required|string|max:200',
        ]);

        if ($validator->fails()){
            return response()->json([
                'message'=>'Erro nas informações da consulta',
                'data'=>$validator->errors(),
                'status'=>404,
            ],404);
        }

        $data = Consulta::create([
            'dataHora'=>$request->dataHora,
            'status'=>$request->status,
            'motivo'=>$request->motivo,
            'pacienteId'=>$request->pacienteId,
            'medicoId'=>$request->medicoId,
        ]);

        return response()->json([
            'message'=>'Consulta cadastrada com sucesso',
            'data'=>$data,
            'status'=>201,
        ],201);
    }

    public function show(Request $request, string $id){

        
        try{ //o try catch é um tratamento de exceções (erros)

            $data = Consulta::with('paciente','medico')->findOrFail($id);

            if(!$data){
                throw new HttpResponseException(
                    response()->json('Consulta não localizada'),
                    404,
                );
            }
        } catch(HttpResponseException $e){
            response()->json($e->getMessage());
         }
        
        return response()->json([
            'message'=>'Consulta localizada com sucesso',
            'data'=>$data,
            'status'=>200,
        ],200);

    }

    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(),[
            'dataHora'=>'required|date',
            'status'=>'required|string|max:20',
            'motivo'=>'required|string|max:200',
            'pacienteId'=>'required|string|max:200',
            'medicoId'=>'required|string|max:200',
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
                'data'=>$id,
                'status'=>404,
            ],404);
        }

        $data->dataHora = $request->dataHora ?? $data->dataHora;
        $data->status = $request->status ?? $data->status;
        $data->motivo = $request->motivo ?? $data->motivo;
        $data->pacienteId = $request->pacienteId ?? $data->pacienteId;
        $data->medicoId = $request->medicoId ?? $data->medicoId;

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
