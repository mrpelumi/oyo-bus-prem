import './successPage.styles.scss';
import {Link} from 'react-router-dom';
import { Alert } from 'react-st-modal';
import { useRef } from 'react';
import {useReactToPrint} from "react-to-print";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { faCertificate } from '@fortawesome/free-solid-svg-icons';
import Receipt from '../../components/receipt/receipt.component';


const SuccessPage = () => {
  const componentRef = useRef();
  const onPrintHandler = useReactToPrint({
    content: () => componentRef.current
  })
  const onCertificateHandler = () => {
    try{
      Alert("Kindly, visit our center for certificate", "Certificate")
    } catch (e) {
      console.log(e)
    }
    
  }
  return (
    <div className='success-main-container'>
      <div className='success-header'>
        <h1>Payment Successful</h1>
      </div>
      <div className='success-text'>
        <span><FontAwesomeIcon icon={faSquareCheck} /></span>
        <span>The payment has been successful and completed</span>
      </div>
      <div className='receipt-component'>
        <Receipt ref={componentRef} />
      </div>
      
      <div className='certificate-text'>
        <span><FontAwesomeIcon icon={faCertificate} /></span>
        <span>Certificate ready</span>
      </div>
      <div className='certificate-btn'>
        <button onClick={onPrintHandler}>Print Receipt</button>
      </div>
      <div className='certificate-btn'>
        <button onClick={onCertificateHandler}>Certificate</button>
      </div>
      <div className='home-link-container'>
        <Link to={'/app/tax'} className={'home-link-txt'}>Go to Home</Link>
      </div>
    </div>
  )
}

export default SuccessPage;