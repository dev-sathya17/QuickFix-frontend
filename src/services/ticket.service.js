import { protectedInstance } from "./instance";

const ticketService = {
  getAllTickets: async () => {
    try {
      const response = await protectedInstance.get("/tickets");
      return response.data;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  },
  getTicket: async (id) => {
    try {
      const response = await protectedInstance.get(`/tickets/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  },
  addTicket: async (data) => {
    try {
      const response = await protectedInstance.post("/tickets", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return { status: response.status, data: response.data };
    } catch (error) {
      console.log(error);
      return error.message;
    }
  },
  updateTicket: async (id, data) => {
    try {
      const response = await protectedInstance.put(`/tickets/${id}`, data);
      return { status: response.status, data: response.data };
    } catch (error) {
      console.log(error);
      return error.message;
    }
  },
  deleteTicket: async (id) => {
    try {
      const response = await protectedInstance.delete(`/tickets/${id}`);
      return { status: response.status, data: response.data };
    } catch (error) {
      console.log(error);
      return error.message;
    }
  },
  getAllUserTickets: async () => {
    try {
      const response = await protectedInstance.get("/tickets/user");
      return response.data;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  },
  getAllEmployeeTickets: async () => {
    try {
      const response = await protectedInstance.get("/tickets/employee");
      return response.data;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  },
  downloadAttachment: async (file) => {
    try {
      const response = await protectedInstance.get(
        `/tickets/download/${file}`,
        {
          responseType: "blob",
        }
      );
      const url = URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "attachment.pdf");
      document.body.appendChild(link);
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
    }
  },
};

export default ticketService;
