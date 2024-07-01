import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Pesan = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [price, setPrice] = useState("");
  const [paymentUrl, setPaymentUrl] = useState("");
  const [response, setResponse] = useState(null);

  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3Rlc3RhcGkuc2lyZWthbXBvbGtlc3lvZ3lhLmNvbS9hcGkvYXV0aC9yZWdpc3RlciIsImlhdCI6MTcxOTczNTMyOCwibmJmIjoxNzE5NzM1MzI4LCJqdGkiOiJCZGNwdGl5YVVUclo5OENlIiwic3ViIjoiMyIsInBydiI6ImY2NGQ0OGE2Y2VjN2JkZmE3ZmJmODk5NDU0YjQ4OGIzZTQ2MjUyMGEifQ.HI8AKaipzVvOW6FSaeY_AHtQ1LQDZuLcQHK0JqUx-4Y";

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
          setName(data.data.name_user);
          setBirthDate(data.data.birth_date_user);
          setEmail(data.data.email_user);
          setGender(data.data.gender_user);
          setPrice(data.data.price);
        }
      })
      .catch((error) => {
        console.error("Error fetching event details:", error);
      });
  }, [id, token]);

  const apiUrl = "https://testapi.sirekampolkesyogya.com/api/tickets";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const inputData = {
      events_id: id, // Ensure this is a number
      name_user: name.trim(), // Remove any extra whitespace
      birth_date_user: birthDate,
      email_user: email.trim(),
      gender_user: gender,
      price: parseFloat(price), // Ensure this is a number
      payment_status: "0",
    };

    try {
      const response = await axios.post(apiUrl, inputData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setResponse(response.data);
      console.log("API Response:", response.data);
      if (response.data.message === "success") {
        setPaymentUrl(response.data.data.payment_url);
      } else {
        console.error("Error in response data:", response.data);
      }
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error("API Error:", error.response.data);
      } else if (error.request) {
        // Request was made but no response received
        console.error("No response received:", error.request);
      } else {
        // Other errors
        console.error("Error:", error.message);
      }
    }
  };

  if (!event) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Event Detail</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Birth Date:</label>
          <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Gender:</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)} required>
            <option value="#">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Non-Binary">Non-Binary</option>
            <option value="Plastik Indomart">Plastik Indomart</option>
          </select>
        </div>
        <div>
          <label>Price:</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <button type="submit">Pesan Sekarang</button>
      </form>
      {paymentUrl && (
        <div>
          <h3>Pembayaran</h3>
          <a href={paymentUrl} target="_blank" rel="noopener noreferrer">
            Bayar Sekarang
          </a>
        </div>
      )}
    </div>
  );
};

export default Pesan;
