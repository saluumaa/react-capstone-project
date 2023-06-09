import {
  FaMicrophone,
  FaChevronLeft,
  FaSkull,
  FaHeartbeat,
  FaHeadSideCough,
  FaPeopleArrows,
  FaRegSun,
  FaSearch,
} from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const Input = () => {
  const { data } = useSelector((state) => state.covid);
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState(null);
  const [error, setError] = useState('');
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);

  function handleSearchClick() {
    setSearchVisible(true);
  }

  function handleSearchBlur() {
    setSearchVisible(false);
  }
  const searchCountry = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const icon = {
    fontSize: '1.8rem',
    color: 'var(--dark-blue)',
    fontWeight: 'bold',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filtered = data.find(
      (country) => country.country.toLowerCase() === search.trim().toLowerCase(),
    );
    if (filtered) {
      setFilteredData(filtered);
      setShowSearchResult(true);
      navigate(`/covid/${filtered.country}`);
      setSearch('');
    } else {
      setError('Country not found');
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  };

  const handleArrowLeftClick = () => {
    setShowSearchResult(false);
  };

  return (
    <div>
      <div className="navbar">
        <Link to="/" className="left-arrow">
          <FaChevronLeft onClick={handleArrowLeftClick} />
        </Link>
        <p className="logo">
          Covid-19 Tracker
        </p>
        <div className="settings">
          {searchVisible ? (
            <form className="search-holder" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="search country"
                className="search-item"
                value={search}
                onChange={searchCountry}
                onBlur={handleSearchBlur}
              />
            </form>
          ) : (
            <button type="submit" className="search-button" onClick={handleSearchClick}>
              <FaSearch />
            </button>
          )}
          <div>
            <FaMicrophone className="microphone" />
            <FaRegSun />
          </div>
        </div>
      </div>
      {error && <p className="error">{error}</p>}
      {showSearchResult && filteredData
        && (
        <section>
          <h2 className="Info title">
            {' '}
            It locates in the
            {filteredData.continent}
            {' '}
            continent, here is the data:
          </h2>
          <div className="details-container">
            <div className="detail-holder">
              <span className="icon" style={icon}>
                <FaSkull />
              </span>
              <p>
                Death(s) :
                {' '}
                {filteredData.deaths}
              </p>
            </div>
            <div className="detail-holder">
              <span className="icon" style={icon}>
                <FaHeartbeat />
              </span>
              <p>
                Recovered :
                {' '}
                {filteredData.recovered}
              </p>
            </div>
            <div className="detail-holder">
              <span className="icon" style={icon}>
                <FaPeopleArrows />
              </span>
              <p>
                Cases :
                {' '}
                {filteredData.cases}
              </p>
            </div>
            <div className="detail-holder">
              <span className="icon" style={icon}>
                <FaHeadSideCough />
              </span>
              <p>
                Infected :
                {' '}
                {filteredData.active}
              </p>
            </div>
          </div>
        </section>
        )}
    </div>
  );
};

export default Input;
