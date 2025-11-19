<?php

namespace App\Http\Controllers;

use App\Models\Donativo;
use Illuminate\Http\Request;

class DonativoController extends Controller // <-- Añadido el controlador
{
    public function index()     // Listar todos los donativos
    {
        return Donativo::orderBy('id', 'asc')->get();
    }

public function show($id)
{
    $donativo = Donativo::find($id);

    if (!$donativo) {
        return response()->json(['error' => 'Donativo no encontrado'], 404);
    }

    return response()->json($donativo);
}

    public function store(Request $request) // <-- Nuevo método store
    {
        $request->validate([
            'id_japem' => 'required|string|max:255|unique:donativos,id_japem',
            'nombre' => 'required|string|max:255',
            'estatus' => 'nullable|string|max:100',
            'rubro' => 'nullable|string|max:255',
            'act_asistencial' => 'nullable|string|max:255',
            'poblacion' => 'nullable|string|max:255',
            'necesidad_pri' => 'nullable|string',
            'necesidad_sec' => 'nullable|string',
            'necesidad_com' => 'nullable|string',
            'certificacion' => 'nullable|boolean',
            'candidato' => 'nullable|boolean',
            'donataria_aut' => 'nullable|boolean',
            'padron_ben' => 'nullable|boolean',
            'veces_don' => 'nullable|integer',
        ]);

        $data = $request->all();

        // Convertir "SI"/"NO" a boolean
        $data['certificacion'] = in_array(strtolower($request->certificacion), ['si', 'true', '1']);
        $data['candidato'] = in_array(strtolower($request->candidato), ['si', 'true', '1']);
        $data['donataria_aut'] = in_array(strtolower($request->donataria_aut), ['si', 'true', '1']);
        $data['padron_ben'] = in_array(strtolower($request->padron_ben), ['si', 'true', '1']);

        $donativo = Donativo::create($data);

        return response()->json([
            'message' => 'Donativo creado correctamente',
            'data' => $donativo
        ], 201);
    }
    public function update(Request $request, $id)
{
     $donativo = Donativo::find($id);

    if (!$donativo) {
        return response()->json(['message' => 'Donativo no encontrado'], 404);
    }

    $request->validate([
        'nombre' => 'required|string|max:255',
        'estatus' => 'nullable|string|max:100',
        'rubro' => 'nullable|string|max:255',
        'act_asistencial' => 'nullable|string|max:255',
        'poblacion' => 'nullable|string|max:255',
        'necesidad_pri' => 'nullable|string',
        'necesidad_sec' => 'nullable|string',
        'necesidad_com' => 'nullable|string',
        'certificacion' => 'nullable|boolean',
        'candidato' => 'nullable|boolean',
        'donataria_aut' => 'nullable|boolean',
        'padron_ben' => 'nullable|boolean',
        'veces_don' => 'nullable|integer',
    ]);

    $data = $request->all();

    // Convertir SI/NO a boolean
    $data['certificacion'] = in_array(strtolower($request->certificacion), ['si', 'true', '1']);
    $data['candidato'] = in_array(strtolower($request->candidato), ['si', 'true', '1']);
    $data['donataria_aut'] = in_array(strtolower($request->donataria_aut), ['si', 'true', '1']);
    $data['padron_ben'] = in_array(strtolower($request->padron_ben), ['si', 'true', '1']);

    $donativo->update($data);

    return response()->json([
        'message' => 'Donativo actualizado correctamente',
        'data' => $donativo
    ]);
}

}
