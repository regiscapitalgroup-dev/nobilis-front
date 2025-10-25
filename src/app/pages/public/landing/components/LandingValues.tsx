import React from 'react';
import { KTSVG } from '../../../../../_metronic/helpers';
import { Link } from 'react-router-dom';

const LandingValues = () => {
  return (
    <div className="values-section">
      <div className="values-title">Values. What Really Matters</div>
      
      <div className="values-grid">
        <div className="value-card">
          <KTSVG path='/media/svg/nobilis/person01.svg' className='svg-icon-3x' />
          <div className="content-wrapper">
            <div className="value-title">Individual </div>
            <div className="value-description">Respect for every unique path.</div>
          </div>
        </div>

        <div className="value-card">
          <KTSVG path='/media/svg/nobilis/person02.svg' className='svg-icon-3x' />
          <div className="content-wrapper">
            <div className="value-title">Family</div>
            <div className="value-description">Caring for one another and sharing the best we have.</div>
          </div>
        </div>

        <div className="value-card">
          <KTSVG path='/media/svg/nobilis/person03.svg' className='svg-icon-3x' />
          <div className="content-wrapper">
            <div className="value-title">Integrity</div>
            <div className="value-description">Acting with honesty, discretion, and transparency in all we do.</div>
          </div>
        </div>

        <div className="value-card">
          <KTSVG path='/media/svg/nobilis/glob.svg' className='svg-icon-3x' />
          <div className="content-wrapper">
            <div className="value-title">Impact</div>
            <div className="value-description">Shaping a better world through collective strength and purpose.</div>
          </div>
        </div>
      </div>
      
      <div className="read-more-button">
       {/*  <div className="button-text">Read more</div> */}
        <Link to='/values' className='button-text'>Read more</Link>
      </div>
    </div>
  );
};

export default LandingValues;