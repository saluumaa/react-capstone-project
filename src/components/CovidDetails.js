import React, { useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  FaSkull,
  FaHeartbeat,
  FaArrowCircleRight,
  FaHeadSideCough,
  FaGlobe,
  FaPeopleArrows,
  FaThermometerThreeQuarters,
} from 'react-icons/fa';
import { fetchData } from '../redux/covid/covidSlice';
import './CovidDetails.css';

const CovidDetails = () => {
  const { id } = useParams();
  const { data } = useSelector((state) => state.covid);
  const dispatch = useDispatch();

  const country = data.find((country) => country.countryInfo.iso2 === id);
  const icon = {
    fontSize: '1.8rem',
    color: 'red',
  };
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <div>
      {country && (
      <>
        <h2 className="title">
          {' '}
          It locates in the continent of :
          <span className="icon">
            <FaGlobe />
          </span>
          {country.continent}
          {' '}
          and it is data is as follows:
        </h2>
        <div className="details-container">
          <section className="detail-holder">
            <div className="flex">
              <span className="icon" style={icon}>
                <FaSkull />
              </span>
              <p>
                Death(s):
              </p>
            </div>
            <div className="flex">
              <p>
                {country.deaths}
                {' '}
                people
              </p>
              <span><FaArrowCircleRight /></span>
            </div>
          </section>
          <section className="detail-holder">
            <div className="flex">
              <span className="icon" style={icon}>
                <FaHeartbeat />
              </span>
              <p>
                Recovered:
              </p>
            </div>
            <div className="flex">
              <p>
                {country.recovered}
                {' '}
                cases
              </p>
              <span><FaArrowCircleRight /></span>
            </div>
          </section>
          <section className="detail-holder">
            <div className="flex">
              <span className="icon" style={icon}>
                <FaPeopleArrows />
              </span>
              <p>
                Population#:
              </p>
            </div>
            <div className="flex">
              <p>
                {country.population}
                {' '}
                people
              </p>
              <span><FaArrowCircleRight /></span>
            </div>
          </section>

          <section className="detail-holder">
            <div className="flex">
              <span className="icon" style={icon}>
                <FaHeadSideCough />
              </span>
              <p>
                Infected:
              </p>
            </div>
            <div className="flex">
              <p>
                {country.active}
                {' '}
                people
              </p>
              <span><FaArrowCircleRight /></span>
            </div>
          </section>
          <section className="detail-holder">
            <div className="flex">

              <span className="icon" style={icon}>
                <FaThermometerThreeQuarters />
              </span>
              <p>
                Test(s):
              </p>
            </div>
            <div className="flex">
              <p>
                {country.tests}
                {' '}
                Taken
              </p>
              <span><FaArrowCircleRight /></span>
            </div>
          </section>
        </div>
      </>
      )}
    </div>
  );
};

export default CovidDetails;
