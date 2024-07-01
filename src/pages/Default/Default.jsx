import React, { useState, useEffect } from "react";

const Default = () => {
  const [events, setEvents] = useState([]);

  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3Rlc3RhcGkuc2lyZWthbXBvbGtlc3lvZ3lhLmNvbS9hcGkvYXV0aC9yZWdpc3RlciIsImlhdCI6MTcxOTczNTMyOCwibmJmIjoxNzE5NzM1MzI4LCJqdGkiOiJCZGNwdGl5YVVUclo5OENlIiwic3ViIjoiMyIsInBydiI6ImY2NGQ0OGE2Y2VjN2JkZmE3ZmJmODk5NDU0YjQ4OGIzZTQ2MjUyMGEifQ.HI8AKaipzVvOW6FSaeY_AHtQ1LQDZuLcQHK0JqUx-4Y";

  useEffect(() => {
    fetch("https://testapi.sirekampolkesyogya.com/api/event", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "success") {
          setEvents(data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, [token]);

  // https://testapi.sirekampolkesyogya.com/storage/event_pictures/$%7Bevent.event_picture%7D

  const CardItem = ({ events }) => {
    return events.map((event, i) => (
      <div className="card" key={i}>
        <a href={`/event/event_detail/${event.event_id}`} className="card-link">
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
        </a>
        <a href={`/event/event_detail/pesan/${event.event_id}`} className="btn btn-blue">
          <p>pesandulu</p>
        </a>
      </div>
    ));
  };

  return (
    <div className="flex justify-center flex-col gap-3">
      <a href="/login" className="bg-white">
        <button type="submit" className="text-black">
          LOGIN
        </button>
      </a>
      <a href="/register" className="bg-white">
        <button type="submit" className="text-black">
          DAFTAR
        </button>
      </a>
      <a href="/history" className="bg-white">
        <button type="submit" className="text-black">
          HISTORY
        </button>
      </a>
      <div className="events">
        <CardItem events={events} />
      </div>
    </div>
  );
};

export default Default;
