<?php

namespace App\Http\Controllers;

use App\Models\Donante;
use Illuminate\Http\Request;

class DonanteController extends Controller
{
    /**
     * Mostrar todos los donantes.
     */
    public function index()
    {
        return response()->json(Donante::all());
    }

    /**
     * Mostrar un donante por ID.
     */
    public function show($id)
    {
        $donante = Donante::find($id);

        if (!$donante) {
            return response()->json(['message' => 'Donante no encontrado'], 404);
        }

        return response()->json($donante);
    }

    /**
     * Crear un nuevo donante.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'fecha' => 'required|date',
            'no_oficio' => 'required|string|max:22',
            'donante' => 'required|string|max:255',
            'municipio' => 'required|string|max:100',
            'descripcion' => 'required|string|max:500',
            'costo_total' => 'required|numeric|min:0',
            'nota' => 'nullable|string|max:255',
        ]);

        $donante = Donante::create($validatedData);

        return response()->json([
            'message' => 'Donante creado correctamente',
            'data' => $donante
        ], 201);
    }

    /**
 * Actualizar un donante existente.
 */
        public function update(Request $request, $id)
    {
        $donante = Donante::find($id);

        if (!$donante) {
            return response()->json(['message' => 'Donante no encontrado'], 404);
        }

    $validatedData = $request->validate([
        'fecha' => 'required|date',
        'no_oficio' => 'required|string|max:22',
        'donante' => 'required|string|max:255',
        'municipio' => 'required|string|max:100',
        'descripcion' => 'required|string|max:500',
        'costo_total' => 'required|numeric|min:0',
        'nota' => 'nullable|string|max:255',
    ]);

    $donante->update($validatedData);

    return response()->json([
        'message' => 'Donante actualizado correctamente',
        'data' => $donante
    ]);
}

}
