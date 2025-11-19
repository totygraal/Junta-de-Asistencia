import { FC } from "react";

interface Reminder {
  id: number;
  title: string;
  date: string;
  done?: boolean;
}

export const ReminderCard: FC<{ reminder: Reminder }> = ({ reminder }) => (
  <div className="p-3 rounded-lg shadow-md bg-yellow-100 text-yellow-900 transition hover:bg-yellow-200">
    <h4 className="font-medium text-yellow-900">{reminder.title}</h4>
    <span className="text-sm text-yellow-800">{reminder.date}</span>
  </div>
);
