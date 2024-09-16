import { useState } from "react";
import "./TicketCard.css";
import BACKEND_URL from "../../utils/config";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const TicketCard = ({ ticket, onEdit, appealClosed, role, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(ticket.title);
  const [editedDescription, setEditedDescription] = useState(
    ticket.description
  );
  const navigate = useNavigate();

  const handleSave = () => {
    onEdit(ticket._id, editedTitle, editedDescription, ticket.status);
    setIsEditing(false);
  };

  const handleViewTicket = (id) => {
    navigate(`/user/ticket/${id}`);
  };

  return (
    <div className="ticket-card">
      {isEditing ? (
        <div className="ticket-edit-form">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
          <div className="ticket-edit-form-actions">
            <button className="ticket-card-btn" onClick={handleSave}>
              Save
            </button>
            <button
              className="ticket-card-btn"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
            {role === "user" && (
              <FaTrash
                className="ticket-card-delete"
                onClick={() => onDelete(ticket._id)}
              />
            )}
          </div>
        </div>
      ) : (
        <div className="ticket-card-head">
          <div>
            <h3>{ticket.title}</h3>
            <p>{ticket.description}</p>
          </div>
          {role === "user" && (
            <FaTrash
              className="ticket-card-delete"
              onClick={() => onDelete(ticket._id)}
            />
          )}
        </div>
      )}
      <div className="ticket-details">
        <div className="ticket-assignedTo">
          {role === "user" ? (
            <>
              <p>
                Assigned To:{" "}
                {ticket.assignedTo ? (
                  <span className="assigned-value">
                    {ticket.assignedTo.name}
                  </span>
                ) : (
                  "Ticket is yet to be assigned"
                )}
              </p>
              {ticket.assignedTo && (
                <img
                  className="ticket-assignedTo-img"
                  src={`${BACKEND_URL}/${ticket.assignedTo.image}`}
                  alt=""
                />
              )}
            </>
          ) : (
            <>
              <p>
                Owner:{" "}
                {ticket.owner ? (
                  <span className="assigned-value">{ticket.owner.name}</span>
                ) : (
                  "Ticket is yet to be assigned"
                )}
              </p>
              {ticket.owner && (
                <img
                  className="ticket-assignedTo-img"
                  src={`${BACKEND_URL}/${ticket.owner.image}`}
                  alt=""
                />
              )}
            </>
          )}
        </div>

        {!isEditing && ticket.status !== "closed" && (
          <button
            className="ticket-card-btn edit-ticket-btn"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        )}
      </div>
      <div className="ticket-footer">
        <button
          className="ticket-card-btn"
          onClick={() => handleViewTicket(ticket._id)}
        >
          View Ticket
        </button>
        {role === "user" && (
          <button
            className="ticket-card-btn"
            onClick={() => appealClosed(ticket)}
          >
            Appeal Closed
          </button>
        )}
      </div>
    </div>
  );
};

export default TicketCard;
