import React from "react";
import { formatDate, formatTime } from "@/utils/eventUtils";
import { Event } from "@/interfaces/event";
import "@/styles/globals.css";

interface EventPopupProps {
  event: Event;
  onClose: () => void;
}

const EventPopup = ({ event, onClose }: EventPopupProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
        <h2 className="text-2xl font-bold mb-4">{event.name}</h2>
        <p className="text-sm truncate">
          {formatDate(event.start_time)}・{formatTime(event.start_time)} -{" "}
          {formatTime(event.end_time)}
        </p>
        <p className="text-gray-700 mb-4">{event.description}</p>
        <p className="text-gray-600 mb-2">
          <strong>Type:</strong> {event.event_type}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Speakers:</strong>{" "}
          {event.speakers.map((speaker) => speaker.name).join(", ")}
        </p>
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default EventPopup;
