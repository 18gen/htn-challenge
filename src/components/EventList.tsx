"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import Timeline from "./Timeline";
import EventCard from "./EventCard";
import EventPopup from "./EventPopup";
import { Event } from "@/interfaces/event";
import { getEventColor } from "@/utils/eventUtils";
import "@/styles/globals.css";

const EventList = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [viewType, setViewType] = useState<"list" | "calendar">("list");
  const [filterDate, setFilterDate] = useState<string>("all");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([
    "workshop",
    "tech_talk",
    "activity",
  ]);
  const [orderBy, setOrderBy] = useState<"name" | "time">("time");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetch("https://api.hackthenorth.com/v3/events")
      .then((response) => response.json())
      .then((data) => {
        const filteredEvents = data.filter(
          (event: Event) => isAuthenticated || event.permission === "public",
        );
        setEvents(
          filteredEvents.sort(
            (a: Event, b: Event) => a.start_time - b.start_time,
          ),
        );
      })
      .catch((error) => console.error("Error fetching events:", error));
  }, [isAuthenticated]);

  const uniqueDates = useMemo(() => {
    return Array.from(
      new Set(events.map((event) => new Date(event.start_time).toDateString())),
    );
  }, [events]);

  const filteredEvents = useMemo(() => {
    let filtered = events;

    if (filterDate !== "all") {
      filtered = filtered.filter(
        (event) => new Date(event.start_time).toDateString() === filterDate,
      );
    }

    if (selectedTypes.length > 0)
      filtered = filtered.filter((event) =>
        selectedTypes.includes(event.event_type),
      );
    else filtered = [];

    if (searchQuery) {
      filtered = filtered.filter((event) =>
        event.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    if (orderBy === "name") {
      filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (orderBy === "time") {
      filtered = filtered.sort((a, b) => a.start_time - b.start_time);
    }

    return filtered;
  }, [events, filterDate, selectedTypes, orderBy, searchQuery]);

  const handleTypeChange = (eventType: string) => {
    setSelectedTypes((prev) =>
      prev.includes(eventType)
        ? prev.filter((type) => type !== eventType)
        : [...prev, eventType],
    );
  };

  const handleRelatedEventClick = (eventId: number) => {
    const relatedEvent = events.find((event) => event.id === eventId);
    if (relatedEvent) {
      setSelectedEvent(relatedEvent);
    }
  };

  const eventTypeOptions = [
    { label: "Workshop", value: "workshop" },
    { label: "Tech Talk", value: "tech_talk" },
    { label: "Activity", value: "activity" },
  ];

  return (
    <div className="mb-8">
      <div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {/* Date Filter */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <select
              className="bg-transparent focus:outline-none"
              onChange={(e) => setFilterDate(e.target.value)}
              value={filterDate}
            >
              {viewType === "list" && <option value="all">All Dates</option>}
              {uniqueDates.map((date, index) => (
                <option key={index} value={date}>
                  {date}
                </option>
              ))}
            </select>
          </div>

          {/* Search Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search
            </label>
            <input
              type="text"
              className="focus:outline-none bg-transparent"
              placeholder="Search events here..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Order By (only in list view) */}
          {viewType === "list" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Order By
              </label>
              <select
                className="bg-transparent focus:outline-none"
                onChange={(e) => setOrderBy(e.target.value as "name" | "time")}
                value={orderBy}
              >
                <option value="time">⏰ Time</option>
                <option value="name">📛 Name</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* View Toggle Buttons */}
      <div className="flex border-b border-gray-200 mt-1">
        <button
          className={`px-4 py-2 -mb-px text-sm font-medium border-b-2 transition-colors duration-300 ${
            viewType === "list"
              ? "border-blue-500 text-blue-500"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setViewType("list")}
        >
          List View
        </button>
        <button
          className={`px-4 py-2 -mb-px text-sm font-medium border-b-2 transition-colors duration-300 ${
            viewType === "calendar"
              ? "border-blue-500 text-blue-500"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => {
            setViewType("calendar");
            setFilterDate(uniqueDates[0]);
          }}
        >
          Calendar View
        </button>
      </div>

      {/* Event Type List Buttons */}
      <div className="my-3 flex space-x-4">
        {eventTypeOptions.map((option) => {
          const isSelected = selectedTypes.includes(option.value);
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => handleTypeChange(option.value)}
              className={`flex items-center space-x-2 px-2.5 py-1 rounded border transition-colors duration-200 ${
                isSelected
                  ? "bg-white text-black border-gray-300"
                  : "bg-gray-200 text-gray-500 border-gray-200 line-through"
              }`}
            >
              <span
                className={`inline-block w-3 h-3 rounded-full ${
                  isSelected ? getEventColor(option.value).tag : "bg-gray-400"
                }`}
              />
              <span className="text-sm"> {option.label}</span>
            </button>
          );
        })}
      </div>

      {/* Event List or Timeline */}
      <div className="overflow-y-auto max-h-[640px]">
        {viewType === "list" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                isList={true}
                onClick={() => setSelectedEvent(event)}
              />
            ))}
          </div>
        ) : (
          <Timeline
            events={filteredEvents}
            onEventClick={(event) => setSelectedEvent(event)}
          />
        )}
      </div>

      {/* Event Popup */}
      {selectedEvent && (
        <EventPopup
          event={selectedEvent}
          events={events} // Pass the events array
          onClose={() => setSelectedEvent(null)}
          onRelatedEventClick={handleRelatedEventClick}
        />
      )}
    </div>
  );
};

export default EventList;
