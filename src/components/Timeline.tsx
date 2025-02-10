import React from "react";
import EventCard from "./EventCard";
import {
  format,
  differenceInMinutes,
  startOfHour,
  addHours,
  subHours,
} from "date-fns";
import { Event } from "@/interfaces/event";
import "@/styles/globals.css";

interface TimelineProps {
  events: Event[];
  onEventClick: (event: Event) => void; // Add this prop
}

const hourHeight = 64; // Height per hour in pixels

const Timeline = ({ events, onEventClick }: TimelineProps) => {
  if (events.length === 0) return <div>No events scheduled.</div>;

  // Find the earliest start time and latest end time
  const earliestStart = new Date(
    Math.min(...events.map((event) => event.start_time)),
  );
  const latestEnd = new Date(
    Math.max(...events.map((event) => event.end_time)),
  );

  // Adjust the timeline to start at the beginning of the hour and end at the next full hour
  const timelineStart = subHours(startOfHour(earliestStart), 1); // Start 1 hour before the earliest full hour
  const timelineEnd = addHours(startOfHour(latestEnd), 1); // End 1 hour after the latest full hour

  // Calculate the number of hours in the adjusted timeline
  const totalHours = differenceInMinutes(timelineEnd, timelineStart) / 60;
  const hoursArray = Array.from({ length: totalHours }, (_, i) =>
    addHours(timelineStart, i),
  );

  // Function to group overlapping events
  const groupOverlappingEvents = (events: Event[]) => {
    const groupedEvents: Event[][] = [];
    let currentGroup: Event[] = [];

    events.sort((a, b) => a.start_time - b.start_time);

    events.forEach((event) => {
      if (currentGroup.length === 0) {
        currentGroup.push(event);
      } else {
        const lastEventInGroup = currentGroup[currentGroup.length - 1];
        if (event.start_time < lastEventInGroup.end_time) {
          currentGroup.push(event);
        } else {
          groupedEvents.push([...currentGroup]);
          currentGroup = [event];
        }
      }
    });

    if (currentGroup.length > 0) {
      groupedEvents.push([...currentGroup]);
    }

    return groupedEvents;
  };

  const groupedEvents = groupOverlappingEvents(events);

  return (
    <div className="flex">
      {/* Time Column */}
      <div className="w-14">
        {hoursArray.map((hour, index) => (
          <div
            key={index}
            className="h-16 border-b border-gray-200 text-right text-sm pt-2 pr-2.5"
          >
            {format(hour, "h a")}
          </div>
        ))}
      </div>

      {/* Events Column */}
      <div className="flex-1 relative">
        {/* Horizontal lines for each hour */}
        {hoursArray.map((hour, index) => (
          <div
            key={index}
            className="absolute w-full border-b h-16 border-gray-200"
            style={{ top: `${index * hourHeight}px` }}
          />
        ))}

        {/* Render grouped events */}
        {groupedEvents.map((group, groupIndex) => (
          <div key={groupIndex} className="absolute w-full">
            {group.map((event, eventIndex) => {
              const start = new Date(event.start_time);
              const end = new Date(event.end_time);

              // Position events relative to timelineStart
              const top =
                differenceInMinutes(start, timelineStart) * (hourHeight / 60);
              const height =
                differenceInMinutes(end, start) * (hourHeight / 60);
              const left = (eventIndex / group.length) * 100;

              return (
                <div
                  key={event.id}
                  className="absolute"
                  style={{
                    top: `${top}px`,
                    height: `${height}px`,
                    left: `${left}%`,
                    width: `${100 / group.length}%`,
                  }}
                >
                  <EventCard
                    event={event}
                    isList={false}
                    onClick={() => onEventClick(event)} // Pass the onClick handler
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
