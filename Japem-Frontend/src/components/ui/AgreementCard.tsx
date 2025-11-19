import { FC } from "react";

interface Agreement {
  id: number;
  title: string;
  description: string;
  date: string;
}

export const AgreementCard: FC<{ agreement: Agreement }> = ({ agreement }) => (
  <div className="bg-pink-100 text-pink-900 shadow-md rounded-xl p-4 transition hover:bg-pink-200">
    <h4 className="font-semibold text-gray-800">{agreement.title}</h4>
    <p className="text-gray-600 text-sm mb-2">{agreement.description}</p>
    <span className="text-xs text-gray-400">{agreement.date}</span>
  </div>
);
