import "./CSS/houseslist.css";
import HousesCard from "./HousesCard";

const HousesList = ({housesList}) => {


  return (
    <div className="houseslist-container">
      {housesList.map((house) => (
        <HousesCard
          imageURL={house.images[0]}
          key={house._id}
          title={house.title}
          price={house.price}
          currency={house.currency}
          floors={house.floors}
          rooms={house.rooms}
          bedrooms={house.bedrooms}
          area={house.area}
          date={house.date}
          location={house.location}
          allImages={house.images}
        />
      ))}
    </div>
  );
};

export default HousesList;
