import React, { useState } from 'react';
import WeeklyTimetable from '../components/WeeklyTimetable';
import { generateTimetable } from '../data/mockData';

type ViewMode = 'week' | 'list';

const Timetable: React.FC = () => {
  const timetableData = generateTimetable();
  const [viewMode, setViewMode] = useState<ViewMode>('week');
  
  // Get unique courses from timetable
  const getUniqueCourses = () => {
    const coursesMap = new Map();
    
    timetableData.forEach(slot => {
      if (slot.course) {
        coursesMap.set(slot.course.title, {
          title: slot.course.title,
          room: slot.course.room,
        });
      }
    });
    
    return Array.from(coursesMap.values());
  };
  
  const uniqueCourses = getUniqueCourses();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Timetable</h1>
        
        <div className="flex space-x-2">
          <button 
            onClick={() => setViewMode('week')}
            className={`btn btn-sm ${
              viewMode === 'week' ? 'btn-primary' : 'btn-secondary'
            }`}
          >
            Week View
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={`btn btn-sm ${
              viewMode === 'list' ? 'btn-primary' : 'btn-secondary'
            }`}
          >
            List View
          </button>
        </div>
      </div>
      
      {/* Week View */}
      {viewMode === 'week' && (
        <div className="card overflow-hidden">
          <WeeklyTimetable timetable={timetableData} />
        </div>
      )}
      
      {/* List View */}
      {viewMode === 'list' && (
        <div className="space-y-4">
          {uniqueCourses.map((course, index) => (
            <div key={index} className="card p-4">
              <h3 className="font-semibold text-secondary-800">{course.title}</h3>
              <div className="mt-2 space-y-1 text-sm text-secondary-600">
                {timetableData
                  .filter(slot => slot.course?.title === course.title)
                  .map((slot, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span>{slot.day}, {slot.time}</span>
                      <span>Room {slot.course?.room}</span>
                    </div>
                  ))
                }
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Export options */}
      <div className="flex justify-end">
        <button className="btn btn-secondary btn-sm">
          Export to Calendar
        </button>
      </div>
    </div>
  );
};

export default Timetable;