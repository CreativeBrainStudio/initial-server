<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     * initCaps
     * allCaps
     * 
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
        {
            $roles=Role::whereNull('deleted_at')
                        ->Where('name', '!=', 'dev')
                        ->where(function ($q) use ($request){
                                if($request->key){
                                    $q->Where('name', 'like', "%{$request->key}%");
                                }
                            })
                        ->orderBy('name')
                        ->get();
            return response()->json($roles);
        }

   public function list(Request $request)
        {
            $roles=Role::whereNull('deleted_at')->WhereNotIn('name', ['dev','superadmin'])->get();
            return response()->json($roles);  
        }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function save(Request $request)
    {        
            $role=Role::create ($request->all());
            return response()->json($role, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Role  $role
     * @return \Illuminate\Http\Response
     */
    public function show(Role $role)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Role  $role
     * @return \Illuminate\Http\Response
     */
    public function edit(Role $role)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Role  $role
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Role $role)
    {
            $role->update($request->all());
            return response()->json($role, 201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Role  $role
     * @return \Illuminate\Http\Response
     */
    public function destroy(Role $role)
    {
            $role->deleted_at =now();
            $role->update();
            return response()->json(array('success'=>true));
    }
}
