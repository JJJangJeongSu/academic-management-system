import React from 'react';
import { TimeSlot } from '../data/mockData';

interface WeeklyTimetableProps {
  timetable: TimeSlot[];
}

const WeeklyTimetable: React.FC<WeeklyTimetableProps> = ({ timetable }) => {
  // Get unique days and times
  const days = Array.from(new Set(timetable.map(slot => slot.day)));
  const times = Array.from(new Set(timetable.map(slot => slot.time)));

  // Generate timetable cells
  const getCell = (day: string, time: string) => {
    const slot = timetable.find(s => s.day === day && s.time === time);
    
    if (!slot?.course) {
      return <td className="border border-gray-200 p-2 text-center text-sm text-gray-400">-</td>;
    }
    
    return (
      <td className="border border-gray-200 p-2">
        <div className="bg-primary-50 p-2 rounded-md">
          <div className="font-medium text-sm text-primary-700">{slot.course.title}</div>
          <div className="text-xs text-primary-600 mt-1">Room {slot.course.room}</div>
        </div>
      </td>
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
              Time
            </th>
            {days.map(day => (
              <th 
                key={day}
                className="p-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider"
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {times.map(time => (
            <tr key={time}>
              <th className="p-3 text-left text-xs font-medium text-secondary-500 bg-gray-50">
                {time}
              </th>
              {days.map(day => (
                <React.Fragment key={`${day}-${time}`}>
                  {getCell(day, time)}
                </React.Fragment>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WeeklyTimetable;