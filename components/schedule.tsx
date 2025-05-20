import React from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/es';

dayjs.locale('es');

const storeHours = [
  { day: 'lunes', open: null, close: null },
  { day: 'martes', open: null, close: null },
  { day: 'miércoles', open: '09:00 AM', close: '05:00 PM' },
  { day: 'jueves', open: '09:00 AM', close: '05:00 PM' },
  { day: 'viernes', open: '09:00 AM', close: '05:00 PM' },
  { day: 'sábado', open: '09:00 AM', close: '05:00 PM' },
  { day: 'domingo', open: '09:00 AM', close: '05:00 PM' },
];

const MuseoSchedule = () => {
  const currentDay = dayjs().format('dddd').toLowerCase();

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-rose-600 mb-8"> 
      </h2>

      <div className="grid grid-cols-1 gap-4">
        {storeHours.map(({ day, open, close }) => {
          const isToday = day === currentDay;
          const isClosed = !open;

          return (
            <div
              key={day}
              className={`flex justify-between items-center px-4 sm:px-6 py-4 rounded-xl border transition-all duration-300 ${
                isToday
                  ? 'bg-rose-50 border-rose-500 shadow-md scale-[1.02]'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <span className="capitalize text-base sm:text-lg font-semibold text-gray-800">
                {isToday ? '📍 ' : ''}{day}
              </span>
              <span className={`text-sm sm:text-base font-medium ${isClosed ? 'text-gray-400' : 'text-gray-700'}`}>
                {isClosed ? '🚫 Cerrado' : `✅ ${open} - ${close}`}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MuseoSchedule;
