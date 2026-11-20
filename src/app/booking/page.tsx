"use client";

import { useActionState, useState } from "react";
import {
  bookAppointmentAction,
  type ActionState,
} from "../Actions/bookingAction";
import { Dropdown, type Item } from "../../components/dropdown";

export default function BookingPage() {
  const [state, formAction, isPending] = useActionState<
    ActionState | null,
    FormData
  >(bookAppointmentAction, null);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  return (
    <div
      style={{ maxWidth: 400, margin: "2rem auto", fontFamily: "sans-serif" }}
    >
      <h2>Book Appointment</h2>

      {state?.success && (
        <>
          <p style={{ color: "green", fontWeight: "bold" }}>
            Booking confirmed!
          </p>

          <p>Booking ID: {state.data.id}</p>
          <p>Client: {state.data.clientName}</p>
          <p>Service: {state.data.service}</p>
          <p>Date: {state.data.date}</p>
        </>
      )}

      <form action={formAction}>
        {/* Client Name */}
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block" }}>Client Name:</label>
          <input
            name="clientName"
            type="text"
            style={{ width: "100%", padding: "0.5rem" }}
          />
          {state?.errors?.clientName?.[0] && (
            <p style={{ color: "red", margin: "4px 0 0", fontSize: "0.85rem" }}>
              {state.errors.clientName[0]}
            </p>
          )}
        </div>

        {/* Service Dropdown */}
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block" }}>Service:</label>
          <select name="service" style={{ width: "100%", padding: "0.5rem" }}>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          {state?.errors?.service?.[0] && (
            <p style={{ color: "red", margin: "4px 0 0", fontSize: "0.85rem" }}>
              {state.errors.service[0]}
            </p>
          )}
        </div>

        {/* Date */}
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block" }}>Date:</label>
          <input
            name="date"
            type="date"
            style={{ width: "100%", padding: "0.5rem" }}
          />
          {state?.errors?.date?.[0] && (
            <p style={{ color: "red", margin: "4px 0 0", fontSize: "0.85rem" }}>
              {state.errors.date[0]}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          style={{
            width: "100%",
            padding: "0.6rem",
            backgroundColor: isPending ? "#ccc" : "#0070f3",
            color: "white",
            border: "none",
            cursor: isPending ? "not-allowed" : "pointer",
          }}
        >
          {isPending ? "Submitting..." : "Book Appointment"}
        </button>
        <div className="container-dropdown">
          <Dropdown
            category="electronics"
            variant="dropdown-modern"
            onSelect={(item) => setSelectedItem(item)}
          ></Dropdown>
          {selectedItem ? (
            <div
              style={{
                marginTop: "16px",
                padding: "12px",
                border: "1px solid #ccc",
              }}
              className="cardDark"
            >
              <h3>Item Details</h3>
              <p>
                <strong>ID:</strong> {selectedItem.id}
              </p>
              <p>
                <strong>Name:</strong> {selectedItem.name}
              </p>
              <p>
                <strong>Category:</strong> {selectedItem.category}
              </p>
              <p>
                <strong>Price:</strong> ${selectedItem.price.toFixed(2)}
              </p>
            </div>
          ) : (
            <p style={{ color: "#666" }}>No item selected.</p>
          )}
        </div>
      </form>
    </div>
  );
}
