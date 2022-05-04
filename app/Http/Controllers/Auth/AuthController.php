<?php

namespace App\Http\Controllers\Auth;

use App\Models\Configuration\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Auth, File;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
   public function login(Request $request)
        {     
            try{
                if(Auth::attempt(['email' => $request->email, 'password' =>$request->password ])){
                    // /** @var User $user */
                    $user = Auth::user();
                    $token = $user->createToken('my-app-token')->plainTextToken;

                    return response([
                        'message' => 'success',
                        'token' => $token,
                        'user' => $user
                    ], 200);
                }
            }catch(\Exception $exception){
                return response([                    
                    'message' => $exception->getMessage()
                ], 400);
            }

            return response([
                'message' => 'Invalid Email/Password'
            ], 401);
        }
        public function csrf(Request $request)
        {
            $user = User::where('email', $request->email)->first();
                if ($user) {
                    return response([
                        'message' => 'success',
                        'token' => $token,
                        'user' => $user
                    ], 200);
                }
        }
         public function register(Request $request)
        {
            $user = User::create([
                // 'attachments' => $request->attachments,
                'role_id' => 7,
                // 'address' => $request->address,
                'fname'   => $request->fname,
                'mname' => $request->mname,
                'lname' => $request->lname,
                'phone'   => $request->phone,
                'suffix'  => $request->suffix,
                'is_male' => $request->is_male ? true:false,
                'dob'     => $request->dob,
                'lrn'       => $request->lrn,
                'email'   => $request->email,
                'password' => Hash::make($request->password)
            ]);
            return response()->json(['status' => 'success', 'user' => $user],  200);
        }
        public function exist(Request $request)
        {
            if($request->email){
                $user = User::where('email', $request->email)->first();
                if ($user) {
                    return response([
                        'message' => 'E-mail address is already taken!'
                    ], 401);
                }
            }else if ($request->phone) {
                $user = User::where('phone', $request->phone)->first();
                if ($user) {
                    return response([
                        'message' => 'This mobile number is already used.'
                    ], 401);
                }
            }else if($request->lrn){
                $user = User::where('lrn', $request->lrn)->first();
                if ($user) {
                    return response([
                        'message' => 'Oops, this code has already been registered.'
                    ], 401);
                }
            }else if($request->ern){
                $user = User::where('ern', $request->ern)->first();
                if ($user) {
                    return response([
                        'message' => 'Oops, this code has already been registered.'
                    ], 401);
                }
            }
            
        }
        
    public function upload(Request $request)
        {            
            $path=public_path("/storage/{$request->src}");
            if(!File::isDirectory($path)){ File::makeDirectory($path, 0777, true, true); }         
            $encoded_file=$request->file_base64;
            $pieces = explode(",", $encoded_file);
            $file = str_replace(' ', '+', $pieces[1]);
            $decode_file   = base64_decode($file);
            file_put_contents("{$path}/{$request->name}", $decode_file);
            return $request->name;
        }
}
