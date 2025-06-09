"use client"
import React, { useState, useEffect, useCallback } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import localeData from 'dayjs/plugin/localeData';
import 'dayjs/locale/es';

// Configurar dayjs
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localeData);
dayjs.locale('es');

interface StoreHour {
  day: string;
  open: string | null;
  close: string | null;
  dayIndex: number;
}

interface DayInfo {
  dayIndex: number;
  currentHour: string;
  dayName: string;
  fullDate: string;
  time: string;
  now: dayjs.Dayjs;
}

// Horarios del museo con índices correctos
const storeHours: StoreHour[] = [
  { day: 'lunes', open: null, close: null, dayIndex: 1 },
  { day: 'martes', open: null, close: null, dayIndex: 2 },
  { day: 'miércoles', open: '09:00', close: '17:00', dayIndex: 3 },
  { day: 'jueves', open: '09:00', close: '17:00', dayIndex: 4 },
  { day: 'viernes', open: '09:00', close: '17:00', dayIndex: 5 },
  { day: 'sábado', open: '09:00', close: '17:00', dayIndex: 6 },
  { day: 'domingo', open: '09:00', close: '15:00', dayIndex: 0 }
];

const MuseoSchedule: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<DayInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getCurrentDayInfo = useCallback((): DayInfo | null => {
    try {
      const now = dayjs();
      const dayIndex = now.day(); // 0 = Sunday, 1 = Monday, etc.
      const currentHour = now.format('HH:mm');
      
      return {
        dayIndex,
        currentHour,
        dayName: now.format('dddd'),
        fullDate: now.format('DD [de] MMMM [de] YYYY'),
        time: now.format('HH:mm'),
        now
      };
    } catch (error) {
      console.error('Error getting current day info:', error);
      return null;
    }
  }, []);

  const isMuseumOpen = useCallback((dayInfo: DayInfo): boolean => {
    if (!dayInfo) return false;
    
    const todaySchedule = storeHours.find(schedule => schedule.dayIndex === dayInfo.dayIndex);
    
    if (!todaySchedule || !todaySchedule.open || !todaySchedule.close) {
      return false;
    }

    const currentMinutes = dayInfo.now.hour() * 60 + dayInfo.now.minute();
    const openMinutes = parseInt(todaySchedule.open.split(':')[0]) * 60 + parseInt(todaySchedule.open.split(':')[1]);
    const closeMinutes = parseInt(todaySchedule.close.split(':')[0]) * 60 + parseInt(todaySchedule.close.split(':')[1]);

    return currentMinutes >= openMinutes && currentMinutes < closeMinutes;
  }, []);

  const getNextOpening = useCallback((dayInfo: DayInfo): string => {
    if (!dayInfo) return 'No disponible';
    
    let checkDay = dayInfo.dayIndex;
    
    for (let i = 0; i < 7; i++) {
      const schedule = storeHours.find(s => s.dayIndex === checkDay);
      
      if (schedule && schedule.open) {
        if (i === 0) {
          // Hoy - verificar si aún hay tiempo para abrir
          const currentMinutes = dayInfo.now.hour() * 60 + dayInfo.now.minute();
          const openMinutes = parseInt(schedule.open.split(':')[0]) * 60 + parseInt(schedule.open.split(':')[1]);
          
          if (currentMinutes < openMinutes) {
            return `Hoy a las ${schedule.open}`;
          }
        } else {
          return `${schedule.day} a las ${schedule.open}`;
        }
      }
      
      checkDay = (checkDay + 1) % 7;
    }
    
    return 'No disponible';
  }, []);

  const updateCurrentTime = useCallback(() => {
    try {
      const dayInfo = getCurrentDayInfo();
      if (dayInfo) {
        setCurrentTime(dayInfo);
      }
    } catch (err) {
      console.error('Error updating time:', err);
    }
  }, [getCurrentDayInfo]);

  useEffect(() => {
    setIsLoading(true);
    updateCurrentTime();
    setIsLoading(false);
    
    // Actualizar cada minuto
    const updateInterval = setInterval(() => {
      updateCurrentTime();
    }, 60000);

    // Actualizar cuando la pestaña se vuelve activa
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        updateCurrentTime();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(updateInterval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [updateCurrentTime]);

  // Calcular estado actual
  const todaySchedule = currentTime ? storeHours.find(schedule => schedule.dayIndex === currentTime.dayIndex) : null;
  const isOpen = currentTime ? isMuseumOpen(currentTime) : false;
  const nextOpening = currentTime ? getNextOpening(currentTime) : 'Calculando...';

  if (isLoading) {
    return (
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando horarios...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">


      {/* Información de estado actual */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          {/* Hora actual */}
          <div className="space-y-2">
            <div className="text-sm text-gray-500">Hora actual</div>
            <div className="font-semibold text-lg">
              {currentTime ? currentTime.time : '--:--'}
            </div>
            <div className="text-xs text-gray-400">
              {currentTime ? currentTime.fullDate : '-- de ---- de ----'}
            </div>
          </div>

          {/* Estado actual */}
          <div className={`space-y-2 rounded-lg p-4 ${
            todaySchedule && todaySchedule.open 
              ? (isOpen ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200')
              : 'bg-red-50 border border-red-200'
          }`}>
            <div className="text-sm text-gray-500">Estado actual</div>
            <div className="font-semibold">
              {todaySchedule && todaySchedule.open ? (
                isOpen ? (
                  <span className="text-green-600">🟢 Abierto ahora</span>
                ) : (
                  <span className="text-yellow-600">🟡 Cerrado temporalmente</span>
                )
              ) : (
                <span className="text-red-600">🔴 Cerrado hoy</span>
              )}
            </div>
          </div>

          {/* Próxima apertura */}
          <div className="space-y-2">
            <div className="text-sm text-gray-500">Próxima apertura</div>
            <div className="font-semibold text-sm">
              {nextOpening}
            </div>
          </div>
        </div>
      </div>

      {/* Lista de horarios */}
      <div className="grid grid-cols-1 gap-4">
        {storeHours.map((schedule) => {
          const isToday = currentTime ? schedule.dayIndex === currentTime.dayIndex : false;
          const isClosed = !schedule.open;
          const isTodayOpen = isToday && isOpen;

          return (
            <div
              key={schedule.day}
              className={`flex justify-between items-center px-4 sm:px-6 py-4 rounded-xl border transition-all duration-300 ${
                isToday
                  ? 'bg-rose-50 border-rose-500 shadow-md scale-[1.02] ring-2 ring-rose-200'
                  : 'bg-gray-50 border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg">
                  {isToday ? '📍' : '📅'}
                </span>
                <div>
                  <span className="capitalize text-base sm:text-lg font-semibold text-gray-800">
                    {schedule.day}
                    {isToday && <span className="text-sm text-rose-600 ml-2">(Hoy)</span>}
                  </span>
                  {isTodayOpen && (
                    <div className="text-xs text-green-600 font-medium">Abierto ahora</div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center">
                {isClosed ? (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-50 text-red-600 border border-red-200">
                    <span className="mr-1">🚫</span>
                    Cerrado
                  </span>
                ) : (
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${
                    isTodayOpen 
                      ? 'bg-green-50 text-green-600 border-green-200'
                      : 'bg-gray-50 text-gray-600 border-gray-200'
                  }`}>
                    <span className="mr-1">{isTodayOpen ? '🟢' : '🕒'}</span>
                    {schedule.open} - {schedule.close}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Información adicional */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center">
          <span className="mr-2">ℹ️</span>
          Información importante
        </h3>
        <div className="space-y-2 text-sm text-blue-800">
          <p>• La última entrada es 30 minutos antes del cierre</p>
          <p>• Entrada gratuita los domingos por la mañana</p>
          <p>• Reservas recomendadas para grupos de más de 10 personas</p>
        </div>
      </div>
    </div>
  );
};

export default MuseoSchedule;