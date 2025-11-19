import { Header } from "../components/layout/Header";
import { Slider } from "../components/ui/Slider";
import { AgreementCard } from "../components/ui/AgreementCard";
import { ReminderCard } from "../components/ui/ReminderCard";
import { Calendar } from "../components/ui/Calendar";

export default function Home() {
  const acuerdos = [
    {
      id: 1,
      title: "Reunión semanal",
      description: "Discutir avances del proyecto",
      date: "30 Oct 2025",
    },
    {
      id: 2,
      title: "Entrega de reportes",
      description: "Enviar informe mensual",
      date: "02 Nov 2025",
    },
  ];

  const reminders = [
    { id: 1, title: "Actualizar tablero", date: "31 Oct 2025" },
    { id: 2, title: "Enviar feedback", date: "1 Nov 2025" },
  ];

  return (
    <>
      <Header />

      <div className="w-full overflow-x-hidden bg-gray-50 text-gray-900">
        {/* Slider de ancho completo */}
        <div className="w-full overflow-hidden">
          <Slider />
        </div>

        {/* Contenedor principal tipo dashboard ocupando todo el ancho */}
        <div className="w-full px-4 md:px-6 lg:px-10 py-10">
          <div className="flex flex-wrap gap-6 items-stretch w-full">
            
            {/* Recuadro 1: Acuerdos */}
            <div className="flex-1 min-w-[350px] bg-white rounded-2xl shadow-md p-6 border border-gray-200 flex flex-col">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Acuerdos</h2>
              <div className="space-y-4 flex-1">
                {acuerdos.map((a) => (
                  <AgreementCard key={a.id} agreement={a} />
                ))}
              </div>
            </div>

            {/* Recuadro 2: Recordatorios & Calendario */}
            <div className="flex-1 min-w-[350px] bg-white rounded-2xl shadow-md p-6 border border-gray-200 flex flex-col">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Recordatorios & Calendario
              </h2>
              <div className="grid md:grid-cols-2 gap-4 flex-1">
                <div className="space-y-4">
                  {reminders.map((r) => (
                    <ReminderCard key={r.id} reminder={r} />
                  ))}
                </div>
                <Calendar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

