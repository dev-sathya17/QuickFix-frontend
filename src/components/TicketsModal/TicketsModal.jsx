import { useEffect, useState } from "react";
import "./TicketsModal.css";
import categoryService from "../../services/category.service";
import { IoCloudUploadSharp } from "react-icons/io5";

const TicketsModal = ({ onClose, onAddTicket }) => {
  const [category, setCategory] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    attachments: [],
  });

  useEffect(() => {
    categoryService
      .getAllCategories()
      .then((response) => {
        setCategory(response);
        setFormData({ ...formData, category: response[0]._id });
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
      });
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleFileUpload = (e) => {
    setAttachments([...attachments, ...e.target.files]);
  };

  const handleAddTicket = () => {
    const ticketData = new FormData();
    ticketData.append("title", formData.title);
    ticketData.append("description", formData.description);
    ticketData.append("category", formData.category);
    attachments.forEach((file) => {
      ticketData.append("attachments", file);
    });

    onAddTicket(ticketData);
    onClose();
  };

  return (
    <div className="categories-modal-overlay">
      <div className="categories-modal">
        <h3>Add Ticket</h3>
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          id="title"
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          id="description"
        />
        <select id="category" onChange={handleChange}>
          {category.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
        <label className="file-upload-label">
          <input
            type="file"
            multiple
            onChange={handleFileUpload}
            className="file-input"
          />
          <span>
            <IoCloudUploadSharp className="file-upload-modal-icon" />
          </span>
          <span className="file-upload-button">
            {attachments.length === 0 ? "Choose Files" : "Choose More Files.."}
          </span>
        </label>
        <div className="ticket-files">
          {attachments &&
            attachments.map((file) => {
              return (
                <div key={file.name} className="modal-attachment-item">
                  {file.name}
                </div>
              );
            })}
        </div>
        <div className="modal-buttons">
          <button onClick={handleAddTicket}>Add Ticket</button>
          <button className="close-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketsModal;
