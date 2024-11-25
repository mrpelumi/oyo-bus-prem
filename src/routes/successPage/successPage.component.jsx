import './successPage.styles.scss';
import {Link, useParams} from 'react-router-dom';

import { useEffect, useRef, useState } from 'react';
import {useReactToPrint} from "react-to-print";
import { Buffer } from 'buffer';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { faCertificate } from '@fortawesome/free-solid-svg-icons';
import ReceiptOriginal from '../../components/receiptOriginal/receiptOriginal.component';
import { getDocReceipt, getDocSingleCertificate } from '../../utils/firebase';
import Certificate from '../../components/certificate/certificate.component';

import { Alert } from 'react-st-modal';


const SuccessPage = () => {
  const componentRef = useRef();
  const certComponentRef = useRef();
  const {userEmail, taxAppId} = useParams();
  const [receiptValues, setReceiptValues] = useState({});
  const [certValues, setCertValues] = useState({});

  // Create a buffer from the string
  useEffect(() => {
    const userEmailObj = Buffer.from(userEmail, "base64");
    const taxAppIdObj = Buffer.from(taxAppId, "base64");


    // Encode the Buffer as a utf8 string
    const decodedUserEmail = userEmailObj.toString("utf8");
    const decodedTaxAppId = taxAppIdObj.toString("utf8");

    // get docs value
    const getDocReceiptHandler = async() => {
      const response =  await getDocReceipt(decodedUserEmail, decodedTaxAppId);
      response.docs.forEach(item => {
        setReceiptValues(item.data())
    });
    }

    // get certificate value
    const getDocCertificateHandler = async () => {
      const certResponse = await getDocSingleCertificate(decodedUserEmail, decodedTaxAppId);
      certResponse.docs.forEach(item => {
        setCertValues(item.data())
      })
    }

    getDocReceiptHandler();
    getDocCertificateHandler();
  }, [])
  

  // const onPrintHandler = useReactToPrint({
  //   content: () => componentRef.current
  // })

  // const onCertificateHandler = useReactToPrint({
  //   content: () => certComponentRef.current
  // })

  const onPrintHandler = async () => {
    await Alert("Receipt Feature coming soon", "Print Receipt")
  }

  const onCertificateHandler = async ()=> {
    await Alert("Certificate Feature coming soon", "Print Certificate")
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
        <ReceiptOriginal ref={componentRef} receiptValues={receiptValues} />
      </div>
      <div className='receipt-component'>
        <Certificate ref={certComponentRef} certValues={certValues} />
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
        <Link to={'/'} className={'home-link-txt'}>Go to Login</Link>
      </div>
    </div>
  )
}

export default SuccessPage;