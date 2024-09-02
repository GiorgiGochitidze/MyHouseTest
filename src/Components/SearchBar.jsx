import { IoIosSearch } from "react-icons/io";
import "./CSS/searchbar.css";
import { LuSettings2 } from "react-icons/lu";
import { useState } from "react";

const SearchBar = ({ onSearch, searchQuery, techWorkState, setTechWorkState }) => {
    const [query, setQuery] = useState(searchQuery);

    const handleSearch = () => {
        onSearch(query);
    };

    const handleInputChange = (e) => {
        setQuery(e.target.value);
        // Trigger search if input is empty to show all cards
        if (e.target.value === "") {
            onSearch(""); // Trigger search with an empty query to show all cards
        }
    };

    return (
        <div className="searchbar-container">
            <label>
                იპოვეთ თქვენი ახალი ბინა მარტივად:
                <input
                    style={{ margin: '0 auto' }}
                    placeholder="მოძებნეთ ბინა დასახელების მიხედვით"
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                />
            </label>
            <div className="filters-container">
                <div onClick={() => setTechWorkState(!techWorkState)} className="categories-btn">
                    <LuSettings2 size={30} />
                </div>
                <div className="search-btn" onClick={handleSearch}>
                    <IoIosSearch size={20} /> ძებნა
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
