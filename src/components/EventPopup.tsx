import React from "react";
import { formatDate, formatTime, getEventColor } from "@/utils/eventUtils";
import { TEvent } from "@/interfaces/event";
import EventCard from "./EventCard"; // Import the SmallEventCard
import "@/styles/globals.css";

interface EventPopupProps {
  event: TEvent;
  events: TEvent[];
  onClose: () => void;
  onRelatedEventClick: (eventId: number) => void;
}

const EventPopup = ({ event, events, onClose, onRelatedEventClick }: EventPopupProps) => {
  const { tag, background } = getEventColor(event.event_type);

  return (
    <div className="z-50 fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="max-h-[calc(100%-1rem)] rounded-3xl bg-[#fbf6ea] max-w-2xl w-full overflow-y-auto">
        <div className="flex flex-row-reverse pr-4 pt-3">
          <button
            onClick={onClose}
            className="relative p-2 rounded-full hover:bg-[#d6d2c8] transition-colors duration-200"
          >
            <img src="/close.svg" alt="close popup" className="w-4 h-4" />
          </button>
        </div>
        <div className="px-6 pb-6">
          <h2 className="text-lg md:text-2xl font-bold mb-1 align-middle">
            <span className={`inline-block w-4 h-4 rounded-sm mr-2 ${tag}`} />
            {event.name}
          </h2>
          <p className="text-sm">
            <span className="pr-2">
              {formatDate(event.start_time)}・{formatTime(event.start_time)} -{" "}
              {formatTime(event.end_time)}
            </span>
            {event.speakers.map((speaker, index) => (
              <span key={index} className="mr-1 badge bg-dark text-light">
                🎙️ {speaker.name}
              </span>
            ))}
          </p>
          {/* Public and Private URLs */}
          <div className="mt-2 flex text-xs gap-2">
            {event.public_url && (
              <a
                href={event.public_url}
                target="_blank"
                className="px-2.5 py-1 border-1 border-gray-600 rounded-full hover:bg-[#e0dcd1] transition-colors duration-300 flex items-center gap-1"
              >
                <img src="/link.svg" alt="public url" className="w-4 h-4" />
                Public URL
              </a>
            )}
            {event.private_url && (
              <a
                href={event.private_url}
                target="_blank"
                className="px-2.5 py-1 border-1 border-gray-600 rounded-full hover:bg-[#e0dcd1] transition-colors duration-300 flex items-center gap-1"
              >
                <img src="/link.svg" alt="private url" className="w-4 h-4" />
                Private URL
              </a>
            )}
          </div>
          <p className="text-xs md:text-sm text-gray-700 py-2">
            {event.description}
          </p>

          {/* Related Events */}
          {event.related_events.length > 0 && (
            <div className="mt-2">
              <h3 className="text-md font-semibold mb-2">Related Events</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {event.related_events.map((relatedEventId) => {
                  const relatedEvent = events.find((e) => e.id === relatedEventId);
                  return relatedEvent ? (
                    <EventCard
                      event={relatedEvent}
                      isList={true}
                      key={relatedEvent.id}
                      onClick={() => onRelatedEventClick(relatedEventId)}
                    />
                  ) : null;
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventPopup;