import axios from "axios";
import "./CSS/home.css";
import HousesList from "./HousesList";
import SearchBar from "./SearchBar";
import { useEffect, useState, useRef } from "react";
import Fuse from "fuse.js";

const Home = () => {
  const [housesList, setHousesList] = useState([]);
  const [filteredHousesList, setFilteredHousesList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [techWorkState, setTechWorkState] = useState(false);
  const techWorksRef = useRef(null); // Create a ref for the techworks-container

  useEffect(() => {
    axios
      .post("http://localhost:5000/loadPosts")
      .then((response) => {
        console.log(response.data.message);
        setHousesList(response.data.loadCards);
        setFilteredHousesList(response.data.loadCards); // Display all houses initially
      })
      .catch((err) => {
        console.log("Error while getting house cards data", err);
      });
  }, []);

  useEffect(() => {
    if (searchQuery === "") {
      setFilteredHousesList(housesList); // Show all houses if search query is empty
      setNoResults(false);
    } else if (searchActive) {
      const fuse = new Fuse(housesList, {
        keys: ["title"],
        threshold: 0.3, // Adjust this value for fuzziness
      });

      const results = fuse.search(searchQuery);
      if (results.length > 0) {
        setFilteredHousesList(results.map((result) => result.item));
        setNoResults(false);
      } else {
        setFilteredHousesList([]);
        setNoResults(true);
      }
    }
  }, [searchQuery, housesList, searchActive]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSearchActive(true);
  };

  // Handle clicks outside of the techworks-container
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (techWorksRef.current && !techWorksRef.current.contains(event.target)) {
        setTechWorkState(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <main>
      <SearchBar onSearch={handleSearch} setTechWorkState={setTechWorkState} techWorkState={techWorkState} searchQuery={searchQuery} />
      {noResults && <p>Cards not found</p>}
      <HousesList housesList={filteredHousesList} />

      {techWorkState && (
        <div className="techworks-container" ref={techWorksRef}>
          <h1>Technical Works are in progress</h1>
        </div>
      )}
    </main>
  );
};

export default Home;
