import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../Components/Sidebar";
import Header from "../../Components/Header";
import Swal from "sweetalert2"; // For SweetAlert popup preview

const AdminNotifications = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null); // For image preview
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState("");
  const [titleError, setTitleError] = useState(""); // Title error state
  const [messageError, setMessageError] = useState(""); // Message error state
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const token = localStorage.getItem("token");

  // Fetch Notifications
  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`${BASE_URL}admin/getNotifications`, {
        headers: {
          "x-access-token": `${token}`,
          version: "1.0.0",
        },
      });
      setNotifications(response.data);

      // If notification exists, prefill data
      if (response.data.length > 0) {
        const existingNotification = response.data[0];
        setTitle(existingNotification.title);
        setMessage(existingNotification.message);
        setPreviewUrl(`${BASE_URL}${existingNotification.imageUrl}`); // Use API path for image preview
      }
    } catch (error) {
      console.error("Error fetching notifications", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Handle image preview for newly uploaded images
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result); // Convert the image to base64 string for preview
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null); // Clear preview if no file is selected
    }
  };

  // Validate input fields and update state accordingly
  const validateFields = () => {
    let isValid = true;

    // Title validation
    if (title.length > 30) {
      setTitleError("Title cannot exceed 30 characters.");
      isValid = false;
    } else {
      setTitleError("");
    }

    // Message validation
    if (message.length > 150) {
      setMessageError("Message cannot exceed 150 characters.");
      isValid = false;
    } else {
      setMessageError("");
    }

    return isValid;
  };

  // Handle title change with validation
  const handleTitleChange = (e) => {
    const value = e.target.value;

    if (value.length <= 30) {
      setTitle(value);
      setTitleError("");
    } else {
      setTitleError("Title cannot exceed 30 characters.");
    }
  };

  // Handle message change with validation
  const handleMessageChange = (e) => {
    const value = e.target.value;

    if (value.length <= 150) {
      setMessage(value);
      setMessageError("");
    } else {
      setMessageError("Message cannot exceed 150 characters.");
    }
  };

  // Handle form submission (Save Notification)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      setError("Image is required!");
      return;
    }

    if (!validateFields()) {
      return; // If validation fails, do not proceed
    }

    setError("");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("message", message);
    formData.append("image", image);

    try {
      await axios.post(`${BASE_URL}admin/addNotification`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-access-token": `${token}`,
          version: "1.0.0",
        },
      });
      fetchNotifications();
      setTitle("");
      setMessage("");
      setImage(null);
    } catch (error) {
      console.error("Error uploading notification", error);
    }
  };

  // Handle notification delete
  const handleDelete = async () => {
    try {
      await axios.delete(
        `${BASE_URL}admin/deleteNotification/${notifications[0]._id}`,
        {
          headers: {
            "x-access-token": `${token}`,
            version: "1.0.0",
          },
        }
      );
      fetchNotifications();
      setTitle("");
      setMessage("");
      setPreviewUrl(null);
    } catch (error) {
      console.error("Error deleting notification", error);
    }
  };

  const handlePreview = () => {
    Swal.fire({
      title: title || "Notification",
      text: message || "",
      imageUrl: previewUrl,
      imageAlt: "Notification Image",
      width: "auto",
      customClass: {
        popup: "custom-swal-popup", // Apply a class to the popup for additional styling
      },
      imageWidth: "100%", // Make the image responsive to available space
      imageHeight: "auto", // Let the image height adjust automatically
      padding: "2em", // Add padding around the modal
      confirmButtonText: "Okay",
      didOpen: () => {
        const swalPopup = Swal.getPopup();
        swalPopup.style.minWidth = "400px"; // Minimum width
        swalPopup.style.maxWidth = "800px"; // Maximum width
        swalPopup.style.minHeight = "200px"; // Minimum height
        swalPopup.style.maxHeight = "1000px"; // Maximum height
      },
    }).then(() => {
      // Set isNotified to true in localStorage after the popup is closed
      localStorage.setItem("isNotified", "true");
    });
  };

  return (
    <div id="main-wrapper">
      <Header />
      <Sidebar />
      <div className="content-body" style={{ height: "100vh" }}>
        <div className="page-titles">
          <ol className="breadcrumb">
            <li>
              <h5 className="bc-title">Notifications</h5>
            </li>
            <li className="breadcrumb-item">
              <a href="javascript:void(0)">Home</a>
            </li>
            <li className="breadcrumb-item active">
              <a href="javascript:void(0)">Notifications</a>
            </li>
          </ol>
        </div>

        <div className="container mt-3 mb-3">
          <div className="card">
            <div className="card-header">Notification</div>
            <div className="card-body">
              {notifications.length > 0 ? (
                <>
                  {/* Display existing notification in a card view */}
                  <div className="mt-4">
                    <div className="card">
                      <div className="card-header">Existing Notification</div>
                      <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{message}</p>
                        {previewUrl && (
                          <img
                            src={previewUrl}
                            alt="Notification"
                            className="notification-image"
                          />
                        )}
                        <div className="d-flex justify-content-end mt-3">
                          <button
                            className="btn btn-danger"
                            onClick={handleDelete}
                          >
                            Delete Notification
                          </button>
                          <button
                            className="btn btn-info ml-2" // Add margin left for gap
                            onClick={handlePreview}
                            style={{ marginLeft: "5px" }} // 5px gap between buttons
                          >
                            Preview Notification Popup
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {error && <div className="alert alert-danger">{error}</div>}
                  <form onSubmit={handleSubmit} className="form">
                    <div className="row m-3">
                      <label className="col-md-2 m-2">Title:</label>
                      <div className="col">
                        <input
                          type="text"
                          value={title}
                          onChange={handleTitleChange} // Use the new title handler
                          className="form-control"
                          placeholder="Enter Title"
                          maxLength="30" // Maximum character limit for title
                          required
                        />
                        {titleError && (
                          <small className="text-danger">{titleError}</small>
                        )}
                      </div>
                    </div>
                    <div className="row m-3">
                      <label className="col-md-2 m-2">Message:</label>
                      <div className="col">
                        <textarea
                          value={message}
                          onChange={handleMessageChange} // Use the new message handler
                          className="form-control"
                          placeholder="Enter Message"
                          rows={4}
                          maxLength="150" // Maximum character limit for message
                          required
                        ></textarea>
                        {messageError && (
                          <small className="text-danger">{messageError}</small>
                        )}
                      </div>
                    </div>
                    <div className="row m-3">
                      <label className="col-md-2 m-2">Image:</label>
                      <div className="col">
                        <input
                          type="file"
                          onChange={handleImageChange}
                          className="form-control"
                          accept="image/*"
                        />
                      </div>
                    </div>

                    {/* Save Button */}
                    <div className="d-flex justify-content-start m-5">
                      <button type="submit" className="btn btn-primary">
                        Save Notification
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNotifications;
