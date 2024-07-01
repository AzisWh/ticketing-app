import React, { useEffect, useState } from "react";
import axios from "axios";

const History = () => {
  const apiUrl = "https://testapi.sirekampolkesyogya.com/api/tickets";
  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3Rlc3RhcGkuc2lyZWthbXBvbGtlc3lvZ3lhLmNvbS9hcGkvYXV0aC9yZWdpc3RlciIsImlhdCI6MTcxOTczNTMyOCwibmJmIjoxNzE5NzM1MzI4LCJqdGkiOiJCZGNwdGl5YVVUclo5OENlIiwic3ViIjoiMyIsInBydiI6ImY2NGQ0OGE2Y2VjN2JkZmE3ZmJmODk5NDU0YjQ4OGIzZTQ2MjUyMGEifQ.HI8AKaipzVvOW6FSaeY_AHtQ1LQDZuLcQHK0JqUx-4Y";

  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        setTickets(response.data.tickets);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>List of Tickets:</h2>
      <ul>
        {tickets.map((ticket) => (
          <li key={ticket.ticket_id}>
            <p>Name: {ticket.name_user}</p>
            <p>Email: {ticket.email_user}</p>
            <p>Order ID: {ticket.order_id}</p>
            {ticket.payment_status === "2" && <img src={`https://testapi.sirekampolkesyogya.com/storage/${ticket.qr_code_ticket}`} alt="QR Code" />}
            {ticket.payment_status !== "2" && <p>Payment pending</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;
