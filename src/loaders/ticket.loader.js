import ticketService from "../services/ticket.service";

const ticketLoader = {
  fetchTicket: async ({ params }) => {
    try {
      const id = params.id;
      const response = await ticketService.getTicket(id);
      return { ticket: response };
    } catch (error) {
      throw new Error("Failed to fetch ticket");
    }
  },
};

export default ticketLoader;
