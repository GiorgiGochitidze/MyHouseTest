import { MdOutlineDoorFront, MdOutlineStairs } from "react-icons/md";
import { IoBedOutline } from "react-icons/io5";
import { GoScreenFull } from "react-icons/go";
import { useState, useRef, useEffect } from "react";

const HousesCard = ({
  imageURL,
  title,
  price,
  currency,
  floors,
  rooms,
  bedrooms,
  area,
  date,
  location,
  allImages,
}) => {
  const [showImageCard, setShowImageCard] = useState(false);
  const imageCardRef = useRef(null);

  // Function to handle clicks outside of the image card container
  const handleClickOutside = (event) => {
    if (imageCardRef.current && !imageCardRef.current.contains(event.target)) {
      setShowImageCard(false);
    }
  };

  // Set up event listener for clicks outside of the image card container
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div
        onClick={() => setShowImageCard(!showImageCard)}
        className="houses-card"
      >
        <img src={imageURL} alt="House" />

        <p style={{ marginTop: "20px", color: "black" }}>{title}</p>

        <p className="prices-container">
          <span style={{ color: "black" }}>
            {price} {currency}
          </span>
        </p>

        <div className="houseDetails-container">
          <div style={{display: 'flex', width: 'auto', justifyContent: 'center', alignItems: 'center'}}>
            <MdOutlineStairs title="Floors" size={20} />
            {floors}
          </div>
          <div style={{display: 'flex', width: 'auto', justifyContent: 'center', alignItems: 'center'}}>
            <MdOutlineDoorFront title="Rooms" size={20} />
            {rooms}
          </div>
          <div style={{display: 'flex', width: 'auto', justifyContent: 'center', alignItems: 'center'}}>
            <IoBedOutline size={20} title="Bedrooms" />
            {bedrooms}
          </div>
          <div style={{width: '100px'}}>
            <span
              style={{ display: "flex", alignItems: "center" }}
              title="Area in square meters"
            >
              <GoScreenFull size={20} />
              {area}{" "}
              <span style={{ position: "relative" }}>
                m<span style={{ position: "absolute", fontSize: 10 }}>2</span>
              </span>
            </span>
          </div>
        </div>
        <p className="street-address">{location}</p>

        <div className="location-time-container">
          <p>{location}</p>
          <p>{date}</p>
        </div>
      </div>
      {showImageCard && (
        <div className="image-show-container" ref={imageCardRef}>
          {allImages.map((image, index) => (
            <img key={index} src={image} alt={`House image ${index + 1}`} />
          ))}
        </div>
      )}
    </>
  );
};

export default HousesCard;
