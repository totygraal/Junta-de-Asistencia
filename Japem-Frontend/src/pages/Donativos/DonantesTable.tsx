import { useEffect, useState } from "react";
import { Table } from "../../components/ui/Table";
import { getDonantes, createDonante } from "./services/donativosService";

export const DonantesTable = () => {
  const [donantes, setDonantes] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);

  const [donanteForm, setDonanteForm] = useState({
    fecha: "",
    no_oficio: "",
    donante: "",
    municipio: "",
    descripcion: "",
    costo_total: "",
    nota: "",
  });

  // Cargar donantes al iniciar
  useEffect(() => {
    fetchDonantes();
  }, []);

  const fetchDonantes = async () => {
    const data = await getDonantes();
    setDonantes(data);
  };

  // Enviar formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // ✅ Convertir todos los campos string a mayúsculas
      const uppercaseForm = Object.keys(donanteForm).reduce((acc: any, key) => {
        const value = (donanteForm as any)[key];
        acc[key] = typeof value === "string" ? value.toUpperCase() : value;
        return acc;
      }, {});

      // ✅ Convertimos costo_total a número si tiene valor
      await createDonante({
        ...uppercaseForm,
        costo_total: uppercaseForm.costo_total
          ? Number(uppercaseForm.costo_total)
          : undefined,
      });

      await fetchDonantes();
      setShowModal(false);

      // Reiniciar formulario
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

  const columns = [
    { key: "id_donantes", label: "ID" },
    { key: "fecha", label: "Fecha" },
    { key: "no_oficio", label: "No. Oficio" },
    { key: "donante", label: "Donante" },
    { key: "municipio", label: "Municipio" },
    { key: "descripcion", label: "Descripción" },
    { key: "costo_total", label: "Costo Total" },
    { key: "nota", label: "Nota" },
  ];

  return (
    <div className="relative uppercase">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6 uppercase">
        Lista de Donantes
      </h2>

      <Table data={donantes} columns={columns} rowsPerPage={5} />

      {/* Botón flotante */}
      <button
        className="fixed bottom-8 right-8 bg-blue-600 text-black rounded-full w-16 h-16 text-3xl shadow-lg hover:bg-blue-700 transition"
        onClick={() => setShowModal(true)}
      >
        +
      </button>

      {/* Modal */}
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
                            : e.target.value.toUpperCase(), // ✅ convierte mientras se escribe
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
    </div>
  );
};
