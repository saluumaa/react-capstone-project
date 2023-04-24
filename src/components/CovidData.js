import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { FaArrowCircleRight } from 'react-icons/fa';
import { fetchData, getAllData } from '../redux/covid/covidSlice';
import './CovidData.css';

const CovidData = () => {
  const dispatch = useDispatch();
  const {
    data, allData, loading, error,
  } = useSelector((state) => state.covid);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllData());
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main className="main">
      <section className="All-data">
        <h1>Covid 19 reports from 2020 to now</h1>
        <div className="confirmed">
          <p>
            Cases:
            {allData.cases}
          </p>
          <p>
            Deaths:
            {allData.deaths}
          </p>
        </div>
      </section>
      <section className="data-container">
        {data.map((country) => (
          <div key={country.country} className="covid-data">
            <Link className="covid-data" to={`/covid/${country.countryInfo.iso2}`}>
              <div className="data-wrapper">
                <FaArrowCircleRight className="abs right-arrow" />
                <img src={country.countryInfo.flag} alt={country.country} />
                <p className="data name">
                  {country.country}
                </p>
                <p className="data population">
                  cases: (
                  {' '}
                  {country.cases}
                  {' '}
                  )
                </p>
              </div>
            </Link>
          </div>
        ))}
      </section>
    </main>
  );
};

export default CovidData;
