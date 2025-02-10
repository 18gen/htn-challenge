import React from "react";
import EventList from "../components/EventList";
import "@/styles/globals.css";

const HomePage = () => {
  return (
    <div className="container mt-4">
      <EventList />
    </div>
  );
};

export default HomePage;
