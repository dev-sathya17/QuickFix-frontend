import { useLoaderData } from "react-router-dom";
import "./Categories.css";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import categoryService from "../../services/category.service";

const Categories = () => {
  const { data } = useLoaderData();
  const [categories, setCategories] = useState(data);
  const [searchTerm, setSearchTerm] = useState("");
  const [newCategory, setNewCategory] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteCategory = (id) => {
    categoryService
      .deleteCategory(id)
      .then((response) => {
        if (response.status === 200) {
          alert(response.data.message);
          const updatedCategories = categories.filter(
            (category) => category._id !== id
          );
          setCategories(updatedCategories);
        } else {
          alert(response);
        }
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
      });
  };

  const addCategory = () => {
    if (newCategory.trim() === "") return;
    const newCategoryObj = {
      name: newCategory,
    };
    categoryService
      .addCategory(newCategoryObj)
      .then((response) => {
        if (response.status === 201) {
          alert(response.data.message);
          setCategories([...categories, response.data.newCategory]);
          setNewCategory("");
        } else {
          alert(response);
        }
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
      });
  };

  return (
    <>
      <Navbar role={"admin"} active={"categories"} />
      <div className="categories-container">
        <h1 className="categories-h1">Categories</h1>
        <div className="categories-search-add-container">
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={handleSearch}
            className="categories-search-input"
          />
          <div className="categories-add-category">
            <input
              type="text"
              placeholder="Add a new category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="categories-add-input"
            />
            <button className="categories-add-button" onClick={addCategory}>
              Add
            </button>
          </div>
        </div>

        <div className="categories-list">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <div className="categories-item" key={category._id}>
                <span>{category.name}</span>
                <FaTrash
                  className="categories-delete-icon"
                  onClick={() => deleteCategory(category._id)}
                />
              </div>
            ))
          ) : (
            <p>No categories found</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Categories;
