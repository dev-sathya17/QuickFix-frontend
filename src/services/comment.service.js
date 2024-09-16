import { protectedInstance } from "../services/instance";

const commentService = {
  addComment: async (data, id) => {
    try {
      const response = await protectedInstance.post(
        `/comments/ticket/${id}`,
        data
      );
      return { status: response.status, data: response.data };
    } catch (error) {
      console.log(error);
      return error.response.data.message;
    }
  },
  updateComment: async (id, data) => {
    try {
      const response = await protectedInstance.put(`/comments/${id}`, data);
      return { status: response.status, data: response.data };
    } catch (error) {
      console.log(error);
      return error.response.data.message;
    }
  },
  deleteComment: async (id) => {
    try {
      const response = await protectedInstance.delete(`/comments/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return error.response.data.message;
    }
  },
};

export default commentService;
