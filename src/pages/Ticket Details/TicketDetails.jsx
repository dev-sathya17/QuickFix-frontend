import { useLoaderData, useNavigate } from "react-router-dom";
import "./TicketDetails.css";
import BACKEND_URL from "../../utils/config";
import { AiOutlinePaperClip } from "react-icons/ai";
import { IoSend } from "react-icons/io5";
import { IoIosArrowBack, IoMdCheckmark } from "react-icons/io";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useSocket } from "../../contexts/SocketContext.jsx";
import commentService from "../../services/comment.service.js";
import ticketService from "../../services/ticket.service.js";
import { FaPen, FaTrash } from "react-icons/fa";

const TicketDetails = () => {
  const { ticket } = useLoaderData();
  const { currentUser } = useSelector((state) => state.user);
  const [message, setMessage] = useState("");
  const [comments, setComments] = useState(ticket.comments);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const socket = useSocket();
  const endOfMessagesRef = useRef(null);

  const handleDownload = (attachment) => {
    ticketService.downloadAttachment(attachment.split("\\")[1]);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (socket) {
      socket.on("commented", (message) => {
        if (message.ticket === ticket._id) {
          setComments((prevComments) => [...prevComments, message]);
        }
      });
      socket.on("updated comment", (message) => {
        const updatedCommentIndex = comments.findIndex(
          (comment) => comment._id === message._id
        );
        if (updatedCommentIndex !== -1) {
          const updatedComments = [...comments];
          updatedComments[updatedCommentIndex] = message;
          setComments(updatedComments);
        }
      });
      socket.on("deleted comment", (id) => {
        const updatedComments = comments.filter(
          (comment) => comment._id !== id
        );
        setComments(updatedComments);
      });
    }

    return () => {
      socket.off("commented");
      socket.off("updated comment");
      socket.off("deleted comment");
    };
  }, [socket, ticket._id, comments]);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [comments]);

  const handleSendMessage = () => {
    if (message.trim() === "") {
      alert("Please enter a message");
      return;
    }
    let recepient;
    if (currentUser.role === "employee") {
      recepient = ticket.owner._id;
    } else if (currentUser.role === "user") {
      recepient = ticket.assignedTo._id;
    }
    setLoading(true);
    commentService
      .addComment(
        {
          text: message,
          recepient,
        },
        ticket._id
      )
      .then((response) => {
        setLoading(false);
        if (response.status === 201) {
          console.log("Message sent successfully");
          setMessage("");
        } else {
          console.error("Failed to send message:", response);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("Failed to send message:", error);
        alert(error.message);
      });
  };

  const handleEditTicket = (id) => {
    setLoading(true);
    ticketService
      .updateTicket(id, {
        status: "closed",
      })
      .then((response) => {
        setLoading(false);
        if (response.status === 200) {
          alert(response.data.message);
          ticket.status = "closed";
        } else {
          alert(response);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
        alert("Failed to update ticket");
      });
  };

  const handleEditMessage = (commentId, text) => {
    setEditingCommentId(commentId);
    setEditedText(text);
  };

  const saveEditedMessage = (commentId) => {
    setLoading(true);

    console.log(commentId);
    commentService
      .updateComment(commentId, { text: editedText })
      .then((response) => {
        setLoading(false);
        if (response.status === 200) {
          const updatedComments = comments.map((comment) =>
            comment._id === commentId
              ? { ...comment, text: editedText }
              : comment
          );
          setComments(updatedComments);
          setEditingCommentId(null);
          setEditedText("");
        } else {
          console.error("Failed to edit comment:", response);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("Failed to edit comment:", error);
      });
  };

  const handleDeleteMessage = (commentId) => {
    setLoading(true);
    commentService
      .deleteComment(commentId)
      .then((response) => {
        setLoading(false);
        if (response.status === 200) {
          const updatedComments = comments.filter(
            (comment) => comment._id !== commentId
          );
          setComments(updatedComments);
        } else {
          console.error("Failed to delete comment:", response);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("Failed to delete comment:", error);
      });
  };

  return (
    <>
      <button className="go-back-btn" onClick={handleGoBack}>
        {" "}
        <IoIosArrowBack />
        GO BACK
      </button>
      <div className="ticket-chat-container">
        <div className="ticket-container">
          <div className="ticket-info-header">
            <p className="ticket-id-title">
              TICKET ID: <span className="ticket-id">{ticket._id}</span>
            </p>
            {currentUser.role === "user" || currentUser.role === "admin" ? (
              <p className={`ticket-status ${ticket.status}`}>
                {ticket.status}
              </p>
            ) : currentUser.role === "employee" &&
              ticket.status !== "closed" ? (
              <button
                className="ticket-card-btn"
                onClick={() => handleEditTicket(ticket._id)}
              >
                Close Ticket
              </button>
            ) : (
              <></>
            )}
          </div>
          <div>
            <p>
              <strong>Title:</strong>{" "}
              <span className="ticket-title">{ticket.title}</span>
            </p>
            <p>
              <strong>Description:</strong>{" "}
              <span className="ticket-title">{ticket.description}</span>
            </p>
          </div>
          <div className="ticket-info">
            <div className="ticket-info-details">
              <p>
                <strong>Category:</strong>{" "}
                <span className="ticket-title">{ticket.category.name}</span>
              </p>
            </div>
          </div>

          <div className="attachments">
            <h5>
              <AiOutlinePaperClip /> Attachments:
            </h5>
            <ul>
              {ticket.attachments.map((attachment, index) => (
                <li key={index}>
                  <a onClick={() => handleDownload(attachment)}>
                    {attachment.split("\\").pop()}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="createdAt">
            <p>
              <strong>Created At:</strong>{" "}
              <span className="ticket-title">
                {new Date(ticket.createdAt).toLocaleString()}
              </span>
            </p>
          </div>
        </div>
        {ticket.assignedTo ? (
          <div className="ticket-chat">
            <div className="chat-header">
              <h4>
                {currentUser.role === "user" ? "Assigned To:" : "Ticket Owner:"}
              </h4>
              <div className="assigned-person">
                <p className="chat-with">
                  {currentUser.role === "user"
                    ? ticket.assignedTo.name
                    : ticket.owner.name}
                </p>
                <img
                  src={`${BACKEND_URL}/${
                    currentUser.role === "user"
                      ? ticket.assignedTo.image
                      : ticket.owner.image
                  }`}
                  alt={
                    currentUser.role === "user"
                      ? ticket.assignedTo.name
                      : ticket.owner.name
                  }
                  className="assigned-avatar"
                />
              </div>
            </div>
            <div className="chat-body">
              {comments.map((comment) => {
                const isAdmin = currentUser.role === "admin";
                const isOwner = comment.sender === ticket.owner._id;
                const isSenderCurrentUser = comment.sender === currentUser._id;

                return (
                  <div
                    key={comment._id}
                    className={`chat-message ${loading ? "loading" : ""}`}
                  >
                    <div
                      className={`chat-message-user ${
                        isSenderCurrentUser || (isAdmin && isOwner)
                          ? "send"
                          : ""
                      }`}
                    >
                      <img
                        src={`${BACKEND_URL}/${
                          isOwner ? ticket.owner.image : ticket.assignedTo.image
                        }`}
                        className="chat-message-avatar"
                      />
                      <div
                        className={`chat-message-content ${
                          isSenderCurrentUser || (isAdmin && isOwner)
                            ? "send"
                            : "receive"
                        }`}
                      >
                        {editingCommentId === comment._id ? (
                          <input
                            type="text"
                            value={editedText}
                            onChange={(e) => setEditedText(e.target.value)}
                            className="edit-comment-input"
                          />
                        ) : (
                          <p>{comment.text}</p>
                        )}
                        <div
                          className={`chat-message-user ${
                            isSenderCurrentUser || (isAdmin && isOwner)
                              ? "send"
                              : ""
                          }`}
                        >
                          <p className="chat-msg-timestamp">
                            {new Date(comment.sentAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      {isSenderCurrentUser && (
                        <>
                          {editingCommentId === comment._id ? (
                            <IoMdCheckmark
                              className="edit-comment comment-action"
                              onClick={() => saveEditedMessage(comment._id)}
                            />
                          ) : (
                            <FaPen
                              className="edit-comment comment-action"
                              onClick={() =>
                                handleEditMessage(comment._id, comment.text)
                              }
                            />
                          )}
                          <FaTrash
                            className="delete-comment comment-action"
                            onClick={() => handleDeleteMessage(comment._id)}
                          />
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
              <div ref={endOfMessagesRef} />
            </div>

            {currentUser.role !== "admin" && (
              <div className="chat-footer">
                <input
                  type="text"
                  placeholder="Type your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button onClick={handleSendMessage} disabled={loading}>
                  {loading ? (
                    "Sending..."
                  ) : (
                    <IoSend className="chat-send-icon" />
                  )}
                </button>
              </div>
            )}
          </div>
        ) : (
          <h1 className="waiting-message">Ticket is yet to be assigned...</h1>
        )}
      </div>
    </>
  );
};

export default TicketDetails;
