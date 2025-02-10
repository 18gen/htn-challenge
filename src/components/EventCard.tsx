import React, { useRef, useEffect, useState } from "react";
import { formatDate, formatTime, getEventColor } from "@/utils/eventUtils";
import { Event } from "@/interfaces/event";
import "@/styles/globals.css";

interface EventCardProps {
  event: Event;
  isList: boolean;
  onClick: () => void;
}

const EventCard = ({ event, isList, onClick }: EventCardProps) => {
  const { tag, background } = getEventColor(event.event_type);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isShort, setIsShort] = useState(false);

  useEffect(() => {
    if (cardRef.current) {
      setIsShort(cardRef.current.clientHeight < 64);
    }
  }, []);

  return (
    <div ref={cardRef} className="h-full" onClick={onClick}>
      <div className="flex h-full">
        <div className={`${tag} rounded-l-md w-2 md:w-1.5 min-w-[4px]`} />
        <div
          className={`${background} p-1.5 w-full rounded-r-md flex flex-col justify-between overflow-hidden`}
        >
          <div
            className={`flex ${isList ? "flex-col" : isShort ? "flex-row items-center gap-2" : "flex-col"} gap-1`}
          >
            <h6 className="card-title fw-bold truncate flex items-center gap-1 max-w-full">
              {event.permission === "private" && (
                <img
                  src="/lock.svg"
                  alt="Private Event"
                  className="w-4 h-4 inline"
                />
              )}
              <span className="truncate" title={event.name}>
                {event.name}
              </span>
            </h6>
            <p className="text-sm truncate">
              {isList && <span>{formatDate(event.start_time)}・</span>}
              {formatTime(event.start_time)} - {formatTime(event.end_time)}
            </p>
          </div>
          {isList && (
            <div className="truncate mt-1">
              {event.speakers.map((speaker, index) => (
                <span key={index} className="badge bg-light text-dark">
                  🎤 {speaker.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
