import React, { useState } from "react";
import "./CSS/uploadcard.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UploadCard = () => {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("₾");
  const [floors, setFloors] = useState("");
  const [rooms, setRooms] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [area, setArea] = useState("");
  const [street, setStreet] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState(false);
  const navigate = useNavigate();

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !images ||
      !title ||
      !price ||
      !currency ||
      !floors ||
      !rooms ||
      !bedrooms ||
      !area ||
      !street ||
      !location
    ) {
      setMessage("Please Fill all fields");
      setTimeout(() => {
        setMessage(false);
      }, 1500);
      return;
    }

    setMessage(
      "Uploaded Card Successfully. Please Wait Until Reload. Don't Leave Page."
    );

    // Get current date and time
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(
      now.getMonth() + 1
    ).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(
      now.getHours()
    ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(
      now.getSeconds()
    ).padStart(2, "0")}`;
    setDate(formattedDate);

    const formData = new FormData();
    images.forEach((image) => {
      formData.append(`images`, image.file); // Append the actual file object
    });

    formData.append("title", title);
    formData.append("price", price);
    formData.append("currency", currency);
    formData.append("floors", floors);
    formData.append("rooms", rooms);
    formData.append("bedrooms", bedrooms);
    formData.append("area", area);
    formData.append("street", street);
    formData.append("location", location);
    formData.append("date", formattedDate); // Add date to formData

    axios
      .post("http://localhost:5000/uploadHouse", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 1500);
      })
      .catch((err) => {
        console.log("Error while sending upload house data", err);
      });
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const previewImages = selectedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prevImages) => [
      ...prevImages.slice(0, 10 - previewImages.length),
      ...previewImages.slice(0, 10 - prevImages.length),
    ]);
  };

  return (
    <div className="uploadcard-container">
      <div className="upload-card">
        <h1 style={{ fontFamily: "Georgian, sans-serif" }}>Upload Image</h1>
        <div className="image-upload-container">
          {images.length === 0 && (
            <label className="upload-button">
              Upload Images
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />
            </label>
          )}
          {images.length > 0 && (
            <div className="image-previews">
              {images.map((image, index) => (
                <div key={index} className="image-preview-wrapper">
                  <img
                    src={image.preview}
                    alt={`Preview ${index + 1}`}
                    className="image-preview"
                  />
                  <button
                    type="button"
                    className="remove-image-button"
                    onClick={() => handleRemoveImage(index)}
                  >
                    <span style={{ marginLeft: "-1px", marginBottom: "-1px" }}>
                      X
                    </span>
                  </button>
                </div>
              ))}
              {images.length < 10 && (
                <label className="upload-more-button">
                  + Add More Images
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                  />
                </label>
              )}
            </div>
          )}
        </div>
        <div className="upload-section">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min="0"
          />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="₾">₾</option>
            <option value="$">$</option>
          </select>
          <input
            type="number"
            placeholder="Floors"
            value={floors}
            onChange={(e) => setFloors(e.target.value)}
            max={100}
            min={0}
          />
        </div>
        <div className="upload-section">
          <input
            type="number"
            placeholder="Rooms"
            value={rooms}
            onChange={(e) => setRooms(e.target.value)}
            max={100}
            min={0}
          />
          <input
            type="number"
            placeholder="Bedrooms"
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            max={100}
            min={0}
          />
          <input
            type="number"
            placeholder="Area (m²)"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            min={0}
          />
          <input
            type="text"
            placeholder="Street Address"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
        </div>
        <div className="upload-section centered-item">
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        {message && <p>{message}</p>}
        <button className="upload-btn" onClick={handleSubmit}>
          Upload
        </button>
      </div>
    </div>
  );
};

export default UploadCard;
