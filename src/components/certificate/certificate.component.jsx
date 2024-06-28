/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import './certificate.styles.scss';
import { forwardRef } from 'react';

const Certificate = forwardRef((props, ref) => {
  const certObj = props.certValues;
  const businessName = certObj.busName;
  return (
    <div className='certificate-container' ref={ref}>
      <div className='certificate-header'>
        <span></span>
      </div>
      <div className='certificate-busname'>
        <span>{businessName ? businessName.substr(0,20):null}</span>
      </div>
      <div className='certificate-number'>
        <span>{certObj.certificateNo}</span>
      </div>
    </div>
  )
}
)

export default Certificate;