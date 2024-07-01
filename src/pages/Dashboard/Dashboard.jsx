import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = ({ onLogout }) => {
  const [events, setEvents] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("https://testapi.sirekampolkesyogya.com/api/event", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.message === "success") {
          setEvents(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [token]);

  const CardItem = ({ events }) => {
    return events.map((event, i) => (
      <div className="card" key={i}>
        {event.event_picture && <img src={`https://testapi.sirekampolkesyogya.com/storage/event_pictures/${event.event_picture}`} alt={event.event_name} />}
        <div className="card-body">
          <div className="card-title">{event.event_name}</div>
          <div className="card-location">{event.event_location}</div>
        </div>
        <div className="card-footer">
          <div className="date">
            <span className="day">{new Date(event.event_date).getDate()}</span>
            <span className="month">
              {new Date(event.event_date).toLocaleString("default", {
                month: "short",
              })}
            </span>
          </div>
          <div className="price">Rp {parseFloat(event.price).toLocaleString()}</div>
        </div>
      </div>
    ));
  };

  return (
    <div>
      <h1>Dashboard User</h1>
      <p className="mt-4">{token ? "Ada token" : "Tidak ada token"}</p>
      <button onClick={onLogout}>Logout</button>
      <div className="events">
        <CardItem events={events} />
      </div>
    </div>
  );
};

export default Dashboard;
