/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import './certificate.styles.scss';
import { forwardRef } from 'react';

const Certificate = forwardRef((props, ref) => {
  const certObj = props.certValues;
  const businessName = certObj.busName;
  const timestampNo = certObj.createdAt;
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  const certTime = timestampNo ? timestampNo.toDate().toLocaleDateString("en-US", options) : null;
  
  return (
    <div className='certificate-container' ref={ref}>
      <div className='certificate-header'>
        <span></span>
      </div>
      <div className='certificate-busname'>
        {businessName && businessName.length < 21 ? <span className='cert-short'>{businessName ? businessName.substring(0,21):null}</span> : (businessName && businessName.length < 35 ? <span className='cert-long'>{businessName ? businessName.substring(0,36):null}</span>: <span className='cert-extra-long'>{businessName ? businessName.substring(0,51):null}</span>)}
      </div>
      <div className='certificate-date'>
        <span>Dated this: {certTime}</span>
      </div>
      <div className='certificate-number'>
        <span>{certObj.certificateNo}</span>
      </div>
    </div>
  )
}
)

export default Certificate;