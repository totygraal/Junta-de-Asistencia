import React, { useEffect, useState } from "react";
import { Table } from "../../components/ui/Table";
import {
  getDonantes,
  createDonante,
  getDonanteById,
  updateDonante,
} from "./services/donativosService";

export const DonantesTable: React.FC = () => {
  const [donantes, setDonantes] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);

  // ESTADOS PARA EDICIÓN
  const [showEditModal, setShowEditModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const [donanteForm, setDonanteForm] = useState({
    fecha: "",
    no_oficio: "",
    donante: "",
    municipio: "",
    descripcion: "",
    costo_total: "",
    nota: "",
  });

  useEffect(() => {
    fetchDonantes();
  }, []);

  const fetchDonantes = async () => {
    try {
      const data = await getDonantes();
      setDonantes(data);
    } catch (err) {
      console.error("Error cargando donantes:", err);
      alert("Error al cargar donantes");
    }
  };

  // CREAR DONANTE (igual que tenías)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const uppercaseForm = Object.keys(donanteForm).reduce((acc: any, key) => {
        const value = (donanteForm as any)[key];
        acc[key] = typeof value === "string" ? value.toUpperCase() : value;
        return acc;
      }, {});

      await createDonante({
        ...uppercaseForm,
        costo_total: uppercaseForm.costo_total
          ? Number(uppercaseForm.costo_total)
          : undefined,
      });

      await fetchDonantes();
      setShowModal(false);

      setDonanteForm({
        fecha: "",
        no_oficio: "",
        donante: "",
        municipio: "",
        descripcion: "",
        costo_total: "",
        nota: "",
      });

      alert("✅ Donante creado correctamente");
    } catch (error: any) {
      alert(error.response?.data?.message || "❌ Error al crear donante");
    }
  };

  // -------------------------
  // EDICIÓN
  // -------------------------

  // Abre modal de edición y precarga el formulario desde la API
  const openEditModal = async (id: number) => {
    try {
      const data = await getDonanteById(String(id)); // tu API devuelve por id
      // Aseguramos formato de los campos que manejas en el formulario
      setDonanteForm({
        fecha: data.fecha ?? "",
        no_oficio: data.no_oficio ?? "",
        donante: data.donante ?? "",
        municipio: data.municipio ?? "",
        descripcion: data.descripcion ?? "",
        costo_total: data.costo_total != null ? String(data.costo_total) : "",
        nota: data.nota ?? "",
      });

      setEditId(id);
      setShowEditModal(true);
    } catch (err) {
      console.error("Error al traer donante:", err);
      alert("No se pudo cargar el donante para editar");
    }
  };

  // Enviar actualización
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editId) return alert("ID de edición no definido");

    try {
      // Conversión y mayúsculas (manteniendo tu lógica)
      const uppercaseForm = Object.keys(donanteForm).reduce((acc: any, key) => {
        const value = (donanteForm as any)[key];
        acc[key] = typeof value === "string" ? value.toUpperCase() : value;
        return acc;
      }, {});

      const payload = {
        ...uppercaseForm,
        costo_total: uppercaseForm.costo_total
          ? Number(uppercaseForm.costo_total)
          : undefined,
      };

      await updateDonante(String(editId), payload);

      await fetchDonantes();
      setShowEditModal(false);
      setEditId(null);

      alert("✅ Donante actualizado correctamente");
    } catch (error: any) {
      console.error("Error actualizando donante:", error);
      alert(error.response?.data?.message || "❌ Error al actualizar donante");
    }
  };

  // Columnas (any[] para evitar problemas de typing por 'acciones')
  const columns: any[] = [
    { key: "id_donantes", label: "ID" },
    { key: "fecha", label: "Fecha" },
    { key: "no_oficio", label: "No. Oficio" },
    { key: "donante", label: "Donante" },
    { key: "municipio", label: "Municipio" },
    { key: "descripcion", label: "Descripción" },
    { key: "costo_total", label: "Costo Total" },
    { key: "nota", label: "Nota" },
    { key: "acciones", label: "Acciones" }, // columna virtual para botones
  ];

  return (
    <div className="relative uppercase">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6 uppercase">
        Lista de Donantes
      </h2>

      <Table
        data={donantes}
        columns={columns}
        rowsPerPage={5}
        renderCell={(key, value, row) => {
          if (key === "acciones") {
            return (
              <div className="flex gap-2">
                <button
                  className="px-3 py-1 bg-yellow-400 text-black rounded"
                  onClick={() => openEditModal(row.id_donantes)}
                >
                  Editar
                </button>
                {/* Puedes agregar botón eliminar aquí */}
              </div>
            );
          }

          // Mostrar valor normal (para números y nulls controlamos)
          return value ?? "";
        }}
      />

      {/* Botón flotante para crear */}
      <button
        className="fixed bottom-8 right-8 bg-blue-600 text-black rounded-full w-16 h-16 text-3xl shadow-lg hover:bg-blue-700 transition"
        onClick={() => setShowModal(true)}
      >
        +
      </button>

      {/* MODAL CREAR */}
      {showModal && (
        <div
          className="fixed inset-0 flex justify-center items-center z-50"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(2px)",
          }}
        >
          <div className="bg-white text-black p-6 rounded-lg w-full max-w-lg relative max-h-[80vh] overflow-y-auto shadow-2xl uppercase">
            <button
              className="absolute top-2 right-2 text-gray-700 text-xl hover:text-black"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-4 text-center uppercase">
              Agregar Donante
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              {Object.keys(donanteForm).map((key) => (
                <div key={key}>
                  <input
                    type={key === "costo_total" ? "number" : "text"}
                    placeholder={key.replace(/_/g, " ").toUpperCase()}
                    value={(donanteForm as any)[key]}
                    onChange={(e) =>
                      setDonanteForm({
                        ...donanteForm,
                        [key]:
                          key === "costo_total"
                            ? e.target.value
                            : e.target.value.toUpperCase(),
                      })
                    }
                    className="border border-gray-300 p-2 w-full rounded text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 uppercase"
                    required={key === "donante" || key === "no_oficio"}
                  />
                </div>
              ))}

              <button
                type="submit"
                className="bg-blue-600 text-black px-4 py-2 rounded w-full hover:bg-blue-700 transition uppercase"
              >
                Guardar
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL EDITAR */}
      {showEditModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/40 backdrop-blur-sm z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-700 text-xl"
              onClick={() => {
                setShowEditModal(false);
                setEditId(null);
              }}
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-4 text-center">Editar Donante</h2>

            <form onSubmit={handleUpdate} className="space-y-3">
              {Object.keys(donanteForm).map((key) => (
                <div key={key}>
                  <input
                    type={key === "costo_total" ? "number" : "text"}
                    placeholder={key.replace(/_/g, " ").toUpperCase()}
                    value={(donanteForm as any)[key]}
                    onChange={(e) =>
                      setDonanteForm({
                        ...donanteForm,
                        [key]:
                          key === "costo_total"
                            ? e.target.value
                            : e.target.value.toUpperCase(),
                      })
                    }
                    className="border border-gray-300 p-2 w-full rounded text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 uppercase"
                    required={key === "donante" || key === "no_oficio"}
                  />
                </div>
              ))}

              <button
                type="submit"
                className="bg-yellow-600 text-black px-4 py-2 rounded w-full"
              >
                Guardar Cambios
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
