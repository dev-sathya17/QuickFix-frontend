import { protectedInstance } from "./instance";

const categoryService = {
  getAllCategories: async () => {
    try {
      const response = await protectedInstance.get("/categories");
      return response.data;
    } catch (error) {
      console.log(error);
      return error.response.data.message;
    }
  },
  addCategory: async (data) => {
    try {
      const response = await protectedInstance.post("/categories", data);
      return { status: response.status, data: response.data };
    } catch (error) {
      console.log(error);
      return error.response.data.message;
    }
  },
  deleteCategory: async (id) => {
    try {
      const response = await protectedInstance.delete(`/categories/${id}`);
      return { status: response.status, data: response.data };
    } catch (error) {
      console.log(error);
      return error.response.data.message;
    }
  },
};

export default categoryService;
