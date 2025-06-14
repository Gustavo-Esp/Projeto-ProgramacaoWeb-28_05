<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\HttpRequestException;
use App\Models\Medico;

class MedicoController extends Controller
{
    public function index(Request $request)
    {
        // Configurações da Paginação
        $page = $request->get('page', '1'); // Página Inicial
        $pageSize = $request->get('pageSize', '10'); // Tamanho de Página (Quantos registros numa página)
        $dir = $request->get('dir', 'asc'); // Direção (Crescente ou Decrecente)
        $props = $request->get('props', 'id'); // Propriedades
        $search = $request->get('search', ''); // Pesquisa

        // Seleciona os dados do usuário
        $query = Medico::select('id', 'nome', 'especialidade', 'crm', 'telefone', 'email')
            ->whereNull('deleted_at')
            ->orderBy($props, $dir);
        
        // Quantidade de Registros
        $total = $query->count();

        // O número de registros na página
        $data = $query->offset(($page-1) * $pageSize)
            ->limit($pageSize)
            ->get();

        // Quantidade de Páginas
        $totalPages = ceil($total / $pageSize);

        return response()->json([
            'message' => 'Registro de Medicos',
            'status' => 200,
            'page' => $page,
            'pageSize' => $pageSize,
            'dir' => $dir,
            'props' => $props,
            'search' => $search,
            'total' => $total,
            'totalPages' => $totalPages,
            'data' => $data,
         ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'nome' => 'required|string|max:255',
            'especialidade' => 'required|string|max:255',
            'crm' => 'required|string|max:255',
            'telefone' => 'required|string|max:15',
            'email' => 'required|string|email|max:255|unique:medicos,email',
        ]);

        if ($validator->fails()){
            return response()->json([
                'message' => 'Erro nas informações do medico',
                'errors' => $validator->errors(),
                'status' => 404,
            ], 404);
        }

        $data = Medico::create([
            'nome' => $request->nome,
            'especialidade' => $request->especialidade,
            'crm' => $request->crm,
            'telefone' => $request->telefone,
            'email' => $request->email,

        ]);

        return response()->json([
            'message' => 'Medico cadastrado com sucesso',
            'data' => $data,
            'status' => 201,
        ],201);
    }

    /**
     * Display the specified resource.
     */

    public function show(Request $request, string $id){
        try{ 
            $data = Medico::findOrFail($id);
            if(!$data){
                throw new HttpResponseException(
                    response()->json('Medico não localizado'),
                    404,
                );
            }
        } catch(HttpResponseException $e){
            response()->json($e->getMessage());
         }
        return response()->json([
            'message'=>'Medico localizado com sucesso',
            'data'=>$data,
            'status'=>200,
        ],200);
    }


    public function update(Request $request, string $id)
    {
        // Id seria a chave primária do usuário, por exemplo
        
        // Validações 
        $validator = Validator::make($request->all(),[
            'nome' => 'required|string|max:255',
            'especialidade' => 'required|string|max:255',
            'crm' => 'required|string|max:255',
            'telefone' => 'required|string|max:15',
            'email' => 'required|string|email|max:255|unique:medicos,email,'.$id,
        ]);

        if ($validator->fails()){
            return response()->json([
                'message' => 'Erro nas informações do Medico',
                'errors' => $validator->errors(),
                'status' => 404,
            ], 404);
        }

        // Busca o Id do Usuário
        $data = Medico::find($id);

        // Caso não encontre
        if (!$data){
            return response()->json([
                'message' => 'Medico não localizado',
                'data'=>$id,
                'status' => 404,
            ], 404);
        }

        // Atualização do dados do Usuário
        $data->nome = $request->nome ?? $data->nome; 
        $data->especialidade = $request->especialidade ?? $data->especialidade;
        $data->crm = $request->crm ?? $data->crm;
        $data->telefone = $request->telefone ?? $data->telefone;
        // Se houve atualização, atualiza, caso contrário, mantém o mesmo valor
        $data->email = $request->email ?? $data->email;

        // Salva o Usuário
        $data->save();

        return response()->json([
            'message' => 'Medico alterado com sucesso',
            'data' => $data,
            'status' => 200,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
        public function destroy(Request $request, string $id){
        $data = Medico::find($id);
        if(!$data){
            return response()->json([
                'message'=>'Medico localizado com sucesso',
                'data'=>$id,
                'status'=>404,
            ],404);
        }
        $data->delete();
        return response()->json([
            'message'=>'Medico excluído com sucesso',
            'data'=>$data,
            'status'=>200,
        ],200);
    }
}

