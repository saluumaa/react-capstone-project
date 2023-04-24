import { RiSettings2Fill } from 'react-icons/ri';
import {
  FaMicrophone,
  FaSearch,
  FaChevronLeft,
  FaVirus,
  FaSkull,
  FaHeartbeat,
  FaHeadSideCough,
  FaPeopleArrows,
  FaThermometerThreeQuarters,
} from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const Input = () => {
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState(null);
  const [showSearchResult, setShowSearchResult] = useState(false);
  const { data } = useSelector((state) => state.covid);
  const navigate = useNavigate();

  const searchCountry = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const icon = {
    fontSize: '1.8rem',
    color: 'red',
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
      alert('Country not found');
      setSearch('');
    }
  };

  const handleArrowLeftClick = () => {
    setShowSearchResult(false);
  };

  return (
    <>
      <p className="logo">
        {' '}
        <span><FaVirus /></span>
        {' '}
        Covid-19 Tracker
      </p>
      <div className="navbar">
        <section>
          <Link to="/" className="left-arrow">
            <FaChevronLeft onClick={handleArrowLeftClick} />
          </Link>
        </section>
        <form className="search-holder" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="search country"
            className="search-item"
            value={search}
            onChange={searchCountry}
          />
          <button type="submit" className="submit-search">
            <FaSearch />
          </button>
        </form>
        <div>
          <FaMicrophone className="microphone" />
          <RiSettings2Fill />
        </div>
      </div>
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
                Population :
                {' '}
                {filteredData.population}
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
            <div className="detail-holder">
              <span className="icon" style={icon}>
                <FaThermometerThreeQuarters />
              </span>
              <p>
                Tests:
                {' '}
                {filteredData.tests}
              </p>
            </div>
          </div>
        </section>
        )}

    </>
  );
};

export default Input;
