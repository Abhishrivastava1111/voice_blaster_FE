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
  const [isFormDisabled, setIsFormDisabled] = useState(false); // Form control
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

      // If notification exists, disable form and prefill data
      if (response.data.length > 0) {
        setIsFormDisabled(true);
        const existingNotification = response.data[0];
        setTitle(existingNotification.title);
        setMessage(existingNotification.message);
        setPreviewUrl(`${BASE_URL}/${existingNotification.imageUrl}`); // Use API path for image preview
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

  // Handle form submission (Save Notification)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !message || !image) {
      setError("All fields are required!");
      return;
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
      setPreviewUrl(null);
      setError("")
    } catch (error) {
      console.error("Error uploading notification", error);
    }
  };

  // Handle notification delete
  const handleDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}admin/deleteNotification/${notifications[0]._id}`, {
        headers: {
          "x-access-token": `${token}`,
          version: "1.0.0",
        },
      });
      setIsFormDisabled(false); // Re-enable form after deletion
      setTitle("");
      setMessage("");
      setPreviewUrl(null);
      setImage(null)
      fetchNotifications();
    } catch (error) {
      console.error("Error deleting notification", error);
    }
  };

  // Preview popup (SweetAlert)
  const handlePreview = () => {
    Swal.fire({
      title: title || "Not Added",
      text: message || "",
      imageUrl: previewUrl,
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Notification Image",
      confirmButtonText: "Okay",
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
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit} className="form">
                <div className="row m-3">
                  <label className="col-md-2 m-2">Title:</label>
                  <div className="col">
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="form-control"
                      placeholder="Enter Title"
                      required
                      disabled={isFormDisabled}
                    />
                  </div>
                </div>
                <div className="row m-3">
                  <label className="col-md-2 m-2">Message:</label>
                  <div className="col">
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="form-control"
                      placeholder="Enter Message"
                      rows={4}
                      required
                      disabled={isFormDisabled}
                    ></textarea>
                  </div>
                </div>
                <div className="row m-3">
                  <label className="col-md-2 m-2">Image:</label>
                  <div className="col">
                    <input
                      type="file"
                      onChange={handleImageChange}
                      className="form-control"
                      required={!notifications.length}
                      accept="image/*"
                      disabled={isFormDisabled}
                    />
                  </div>
                </div>

                {/* Save/Delete Buttons */}
                <div className="d-flex justify-content-between align-items-center m-5">
                  {!notifications.length ? (
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isFormDisabled}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="btn btn-danger"
                      onClick={handleDelete}
                    >
                      Remove
                    </button>
                  )}
                </div>
              </form>

              {/* Preview Button - Visible only if notification exists or form is filled */}
              {(previewUrl || notifications.length > 0) && (
                <div className="mt-4 d-flex justify-content-start">
                  <button className="btn btn-info" onClick={handlePreview}>
                    Preview Notification Popup
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNotifications;
