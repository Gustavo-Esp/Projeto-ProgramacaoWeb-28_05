<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use App\Models\Pagamento;

class PagamentoController extends Controller
{
    public function index(Request $request)
    {

        $page = $request->get('page',1);
        $pageSize = $request->get('pageSize',10);
        $dir = $request->get('dir','asc');
        $props = $request->get('props','id');
        $search = $request->get('search','');

        $query = Pagamento::with('paciente', 'consulta')
            ->whereNull('deleted_at')
            ->orderBy($props, $dir);

        $total = $query->count();

        $data = $query->offset(($page - 1) * $pageSize)
            ->limit($pageSize)
            ->get();

        $totalPages = ceil($total / $pageSize);
       
        return response()->json([
            'message'=>'Relatório de pagamentos',
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
            'valor'=>'required|string|max:20',
            'metodoPagamento'=>'required|string|max:200',
            'pacienteId'=>'required|string|max:200',
            'consultaId'=>'required|string|max:200',
        ]);

        if ($validator->fails()){
            return response()->json([
                'message'=>'Erro nas informações do pagamento',
                'data'=>$validator->errors(),
                'status'=>404,
            ],404);
        }

        $data = Pagamento::create([
            'dataHora'=>$request->dataHora,
            'valor'=>$request->valor,
            'metodoPagamento'=>$request->metodoPagamento,
            'pacienteId'=>$request->pacienteId,
            'consultaId'=>$request->consultaId,
        ]);

        return response()->json([
            'message'=>'Pagamento cadastrado com sucesso',
            'data'=>$data,
            'status'=>201,
        ],201);
    }

    public function show(Request $request, string $id){

        
        try{ //o try catch é um tratamento de exceções (erros)

            $data = Pagamento::with('paciente','consulta')->findOrFail($id);

            if(!$data){
                throw new HttpResponseException(
                    response()->json('Pagamento não localizado'),
                    404,
                );
            }
        } catch(HttpResponseException $e){
            response()->json($e->getMessage());
         }
        
        return response()->json([
            'message'=>'Pagamento localizado com sucesso',
            'data'=>$data,
            'status'=>200,
        ],200);

    }

    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(),[
            'dataHora'=>'required|date',
            'valor'=>'required|string|max:20',
            'metodoPagamento'=>'required|string|max:200',
            'pacienteId'=>'required|string|max:200',
            'consultaId'=>'required|string|max:200',
        ]);

        if ($validator->fails()){
            return response()->json([
                'message'=>'Erro nas informações do pagamento',
                'data'=>$validator->errors(),
                'status'=>404,
            ],404);
        }

        $data = Pagamento::find($id);

        if(!$data){
            return response()->json([
                'message'=>'Pagamento não localizado',
                'data'=>$id,
                'status'=>404,
            ],404);
        }

        $data->dataHora = $request->dataHora ?? $data->dataHora;
        $data->valor = $request->valor ?? $data->valor;
        $data->metodoPagamento = $request->metodoPagamento ?? $data->metodoPagamento;
        $data->pacienteId = $request->pacienteId ?? $data->pacienteId;
        $data->consultaId = $request->consultaId ?? $data->consultaId;

        $data->save();

        return response()->json([
            'message'=>'Pagamento alterado com sucesso',
            'data'=>$data,
            'status'=>200,
        ],200);

    }

    public function destroy(Request $request, string $id)
    {
        
        $data = Pagamento::findOrFail($id);

        if(!$data){
            return response()->json([
                'message'=>'Pagamento não localizado',
                'data'=>$data,
                'status'=>404,
            ],404);
        }

        $data->delete();

        return response()->json([
            'message'=>'Pagamento excluído com sucesso',
            'data'=>$data,
            'status'=>200,
        ],200);
    }
}
