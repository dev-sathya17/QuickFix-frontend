import { protectedInstance } from "./instance";

const adminService = {
  getAllUsers: async () => {
    try {
      const response = await protectedInstance.get("/admin/users");
      return response.data;
    } catch (error) {
      console.log(error);
      return error.response.data.message;
    }
  },
  // getTodosByStatus: async () => {
  //   try {
  //     const response = await protectedInstance.get("/admin/count/status");
  //     return response.data;
  //   } catch (error) {
  //     console.log(error);
  //     return error.response.data.message;
  //   }
  // },
  // getTodosByPriority: async () => {
  //   try {
  //     const response = await protectedInstance.get("/admin/count/priority");
  //     return response.data;
  //   } catch (error) {
  //     console.log(error);
  //     return error.response.data.message;
  //   }
  // },
  // getTodosCompletion: async () => {
  //   try {
  //     const response = await protectedInstance.get("/admin/count/completion");
  //     return response.data;
  //   } catch (error) {
  //     console.log(error);
  //     return error.response.data.message;
  //   }
  // },
  // getTodosForToday: async () => {
  //   try {
  //     const response = await protectedInstance.get("/admin/count/today");
  //     return response.data;
  //   } catch (error) {
  //     console.log(error);
  //     return error.response.data.message;
  //   }
  // },
  // getTotalCompletionPercentage: async () => {
  //   try {
  //     const response = await protectedInstance.get(
  //       "/admin/count/completion/percentage"
  //     );
  //     return response.data;
  //   } catch (error) {
  //     console.log(error);
  //     return error.response.data.message;
  //   }
  // },
  getUsersCount: async () => {
    try {
      const response = await protectedInstance.get("/admin/count/users");
      return response.data;
    } catch (error) {
      console.log(error);
      return error.response.data.message;
    }
  },
  // getAllTodos: async () => {
  //   try {
  //     const response = await protectedInstance.get("/admin/todos");
  //     return response.data;
  //   } catch (error) {
  //     console.log(error);
  //     return error.response.data.message;
  //   }
  // },
};

export default adminService;
