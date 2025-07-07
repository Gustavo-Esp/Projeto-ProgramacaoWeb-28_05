<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Exceptions\HttpRespondeException;
use App\Models\User;

class UsuarioController extends Controller
{
    public function index(Request $request){ 

        $page = $request->get('page',1);
        $pageSize = $request->get('pageSize',20); 
        $dir = $request->get('dir','asc');
        $props = $request->get('props','id');
        $search = $request->get('search','');


        $query = User::select('id','name','email')
                ->whereNull('deleted_at')
                ->orderBy($props, $dir);

        $total = $query->count(); 

        $data = $query->offset(($page - 1) * $pageSize) 
                      ->limit($pageSize)
                      ->get();


        $totalPages = ceil($total / $pageSize);



        return response()->json([
            'message'=>'Relatório de usuários',
            'status'=>200,
            'page'=>$page,
            'pageSize'=>$pageSize,
            'dir'=>$dir,
            'props'=>$props,
            'search'=>$search,
            'total'=>$total,
            'totalPages'=>$totalPages,
            'data'=>$data,
        ],200);
    }

    public function store(Request $request){ 
        
        $validator = Validator::make($request->all(),[
            'name'=>'required|string|max:255', 
            'email'=>'required|string|email|max:255|unique:users,email',
            'password'=>'required|string|min:6', 
        ]);

        if($validator->fails()){
            return response()->json([
                'message'=>'Erro nas informações do usuário',
                'data'=>$validator->errors(),
                'status'=>404,

            ],404);
        }


        $data = User::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'password'=>Hash::make($request->password),
        ]);

        return response()->json([
            'message'=>'Usuário cadastrado com sucesso',
            'data'=>$data,
            'status'=>201,
        ],201);
    }

    public function show(Request $request, string $id){

        
        try{

            $data = User::findOrFail($id);

            if(!$data){
                throw new HttpResponseException(
                    response()->json('Usuário não localizado'),
                    404,
                );
            }
        } catch(HttpResponseException $e){
            response()->json($e->getMessage());
         }
        
        return response()->json([
            'message'=>'Usuário localizado com sucesso',
            'data'=>$data,
            'status'=>200,
        ],200);
    }

    public function update(Request $request, string $id){ 


        $validator = Validator::make($request->all(),[ 
            'name'=>'required|string|max:255', 
            'email'=>'required|string|email|max:255|unique:users,email,'.$id,
        ]);

        if($validator->fails()){
            return response()->json([
                'message'=>'Erro nas informações do usuário',
                'data'=>$validator->errors(),
                'status'=>404,

            ],404);
        }

        $data = User::find($id); 

        if(!$data){
            return response()->json([
                'message'=>'Usuário não localizado',
                'data'=>$id,
                'status'=>404,
            ], 404);
        }

        $data->name = $request->name ?? $data->name;
        $data->email = $request->email ?? $data->email;

        if($request->has('password')){ 
            $data->password = Hash::make($request->password);
        }
        
        $data->save();

        return response()->json([
            'message'=>'Usuário alterado com sucesso',
            'data'=>$data,
            'status'=>200,
        ],200);
    }

    public function destroy(Request $request, string $id){ 

        $data = User::find($id);

        if(!$data){
            return response()->json([
                'message'=>'Usuário localizado com sucesso',
                'data'=>$id,
                'status'=>404,
            ],404);
        }

        $data->delete();

        return response()->json([
            'message'=>'Usuário excluído com sucesso',
            'data'=>$data,
            'status'=>200,
        ],200);

    }
}