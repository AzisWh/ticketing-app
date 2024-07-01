import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const DetailEvent = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  // const token = localStorage.getItem("token");
  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3Rlc3RhcGkuc2lyZWthbXBvbGtlc3lvZ3lhLmNvbS9hcGkvYXV0aC9yZWdpc3RlciIsImlhdCI6MTcxOTczNTMyOCwibmJmIjoxNzE5NzM1MzI4LCJqdGkiOiJCZGNwdGl5YVVUclo5OENlIiwic3ViIjoiMyIsInBydiI6ImY2NGQ0OGE2Y2VjN2JkZmE3ZmJmODk5NDU0YjQ4OGIzZTQ2MjUyMGEifQ.HI8AKaipzVvOW6FSaeY_AHtQ1LQDZuLcQHK0JqUx-4Y";
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://testapi.sirekampolkesyogya.com/api/event/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "success") {
          setEvent(data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching event details:", error);
      });
  }, [id, token]);

  if (!event) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Detail Event</h1>
      <div className="Event-wrapper">
        <div className="Event-title">Nama Acara: {event.event_name}</div>
        {event.event_picture && <img src={`https://testapi.sirekampolkesyogya.com/storage/event_pictures/${event.event_picture}`} className="Event-img" alt={event.event_name} />}
        <div className="Event-description">Deskripsi: {event.event_description}</div>
        <div className="Event-date">Tanggal: {event.event_date}</div>
        <div className="Event-location">Lokasi: {event.event_location}</div>
        <div className="Event-price">Harga: {event.price}</div>
        <button onClick={() => navigate(-1)}>Back</button>
      </div>
    </div>
  );
};

export default DetailEvent;
