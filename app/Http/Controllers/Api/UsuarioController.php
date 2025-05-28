<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\HttpRequestException;
use App\Models\User;

class UsuarioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Configurações da Paginação
        $page = $request->get('page', '1'); // Página Inicial
        $pageSize = $request->get('pageSize', '10'); // Tamanho de Página (Quantos registros numa página)
        $dir = $request->get('dir', 'asc'); // Direção (Crescente ou Decrecente)
        $props = $request->get('props', 'id'); // Propriedades
        $search = $request->get('search', ''); // Pesquisa

        // Seleciona os dados do usuário
        $query = User::select('id', 'name', 'email', 'created_at', 'updated_at')
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
            'message' => 'Registro de Usuários',
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
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => 'sometimes|required|string|min:6'
        ]);

        if ($validator->fails()){
            return response()->json([
                'message' => 'Erro nas informações do usuário',
                'errors' => $validator->errors(),
                'status' => 404,
            ], 404);
        }

        $data = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),

        ]);

        return response()->json([
            'message' => 'Usuário cadastrado com sucesso',
            'data' => $data,
            'status' => 201,
        ],201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $id)
    {
        try{
            $data = User::findOrFail($id);
        }
        catch(HttpResponseException $e){
            response()->json([
                'message'=>$e->getMessage(),
                'status'=>404
            ],404);
        }

        return response()->json([
            'message'=>"Usuário encontrado com sucesso",
            'status'=>200,
            'data'=>$data
        ],200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Id seria a chave primária do usuário, por exemplo
        
        // Validações 
        $validator = Validator::make($request->all(),[
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,'.$id,
            // Para efeito didático, tiraremos a validação do password
            //'password' => 'sometimes|required|string|min:6'
        ]);

        if ($validator->fails()){
            return response()->json([
                'message' => 'Erro nas informações do usuário',
                'errors' => $validator->errors(),
                'status' => 404,
            ], 404);
        }

        // Busca o Id do Usuário
        $data = User::find($id);

        // Caso não encontre
        if (!$data){
            return response()->json([
                'message' => 'Usuário não localizado',
                'data'=>$id,
                'status' => 404,
            ], 404);
        }

        // Atualização do dados do Usuário
        $data->name = $request->name ?? $data->name; // Se houve atualização, atualiza, caso contrário, mantém o mesmo valor
        $data->email = $request->email ?? $data->email;
        
        // Atualização do Password
        if ($request->has('password'))
        {
            $data->password = Hash::make($request->password);
        }

        // Salva o Usuário
        $data->save();

        return response()->json([
            'message => "Usuário alterado com sucesso',
            'data' => $data,
            'status' => 200,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $data = User::find($id);

        if (!$data){
            return response()->json([
                'message' => 'Usuário não encontrado',
                'status' => 404,
            ], 404);
        }

        $data->delete();
        
        return response()->json([
            'message => "Usuário encontrado com sucesso',
            'status' => 200,
        ], 200);
    }
}
