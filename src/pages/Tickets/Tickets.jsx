import { useEffect, useState } from "react";
import "./Tickets.css";
import TicketCard from "../../components/TicketCard/TicketCard";
import TicketsModal from "../../components/TicketsModal/TicketsModal";
import { useSelector } from "react-redux";

const Tickets = ({
  ticketsData,
  handleEditTicket,
  handleAddTicket,
  showAddModal,
  setShowAddModal,
  handleDeleteTicket,
  employees,
}) => {
  const [tickets, setTickets] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const { role } = currentUser;

  useEffect(() => {
    setTickets(ticketsData);
  }, [ticketsData]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredTickets = ticketsData
    .filter((ticket) =>
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .map((ticket) => tickets.find((t) => t._id === ticket._id) || ticket);

  const appealClosed = (ticket) => {
    handleEditTicket(ticket._id, ticket.title, ticket.description, "closed");
  };

  return (
    <div className="tickets-page">
      <div className="tickets-header">
        <input
          type="text"
          placeholder="Search tickets..."
          value={searchTerm}
          onChange={handleSearch}
          className="tickets-search"
        />
        {role === "user" && (
          <button
            className="add-ticket-btn"
            onClick={() => setShowAddModal(true)}
          >
            Add Ticket
          </button>
        )}
      </div>

      <div className="tickets-list">
        {filteredTickets.map((ticket) => (
          <TicketCard
            key={ticket._id}
            ticket={ticket}
            onEdit={handleEditTicket}
            appealClosed={appealClosed}
            role={role}
            onDelete={handleDeleteTicket}
            employees={employees}
          />
        ))}
      </div>

      {showAddModal && (
        <TicketsModal
          onClose={() => setShowAddModal(false)}
          onAddTicket={handleAddTicket}
        />
      )}
    </div>
  );
};

export default Tickets;
