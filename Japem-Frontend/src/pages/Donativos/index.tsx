import { useState } from "react";
import { DonantesTable } from "./DonantesTable";
import { DonativosTable } from "./DonativosTable";

export const Donativos = () => {
  const [activeTab, setActiveTab] = useState<"donantes" | "donativos">("donantes");

  return (
    <div className="min-h-screen bg-gray-50 p-5">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-semibold text-gray-900 mb-5 tracking-tight">
          Gestión de Donativos
        </h1>

        <div className="flex space-x-8 border-b border-gray-300 mb-8">
          <button
            onClick={() => setActiveTab("donantes")}
            className={`pb-3 text-lg font-medium transition-all duration-300 ${
              activeTab === "donantes"
                ? "border-b-2 border-black text-black"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            Donantes
          </button>
          <button
            onClick={() => setActiveTab("donativos")}
            className={`pb-3 text-lg font-medium transition-all duration-300 ${
              activeTab === "donativos"
                ? "border-b-2 border-black text-black"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            Donativos
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-8 transition-all duration-500">
          {activeTab === "donantes" ? <DonantesTable /> : <DonativosTable />}
        </div>
      </div>
    </div>
  );
};
