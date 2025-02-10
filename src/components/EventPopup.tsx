import React from "react";
import { formatDate, formatTime, getEventColor } from "@/utils/eventUtils";
import { Event } from "@/interfaces/event";
import "@/styles/globals.css";

interface EventPopupProps {
  event: Event;
  onClose: () => void;
}

const EventPopup = ({ event, onClose }: EventPopupProps) => {
  const { tag, background } = getEventColor(event.event_type);
  return (
    <div className="z-50 fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="max-h-[calc(100%-1rem)] rounded-3xl bg-[#fbf6ea] p-6 max-w-2xl w-full">
        <button onClick={onClose}>
          <img
          src="/close.svg"
          alt="close popup"
          className="w-4 h-4 right-3"
        />
        </button>
        <h2 className="text-lg md:text-2xl font-bold mb-1 align-middle">
          <span className={`inline-block w-4 h-4 rounded-sm mr-2 ${tag}`}/>
          {event.name}
        </h2>
        <p className="text-xs md:text-sm truncate">
          {formatDate(event.start_time)}・{formatTime(event.start_time)} -{" "}
          {formatTime(event.end_time)}
        </p>
        <p className="truncate mt-1">
              {event.speakers.map((speaker, index) => (
                <span key={index} className="badge bg-dark text-light">
                  🎙️ {speaker.name}
                </span>
              ))}
            </p>
        <p className="text-xs md:text-sm text-gray-700 py-2">{event.description}</p>
        
      </div>
    </div>
  );
};

export default EventPopup;
