<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    public function login(Request $request){
        $email = $request->email;
        $password = $request->password;

        $user = User::where('email', $request->email)->first();

        if (!user){
            return response()->json([
                'message'=>'Email não encontrado',
            ]);
        }

        if (!Hash::check($password, $user->password)){
            return response()->json([
                'message'=>'Senha do usuario invalida!',
            ]);
        }

        $token = $user->createToken($user->name)->plainTextToken();

        return response()->json([
            'email'=>$email,
            'token'=>$token,
        ]);
    }
}
