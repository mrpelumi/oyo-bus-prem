/* eslint-disable react/display-name */
import './receipt.styles.scss';
import { useSelector } from 'react-redux';
import {selectReceipt} from '../../store/receipt/receipt.selector';
import ondoLogo from '../../assets/ondo-logo.png';
import { forwardRef } from 'react';

const Receipt = forwardRef((props, ref) => {
  const receiptObj = useSelector(selectReceipt);
  const {arrears, busName, busBranch, date, fees, total, transactionId, certificateFee, busAdd} = receiptObj;

  return (
    <>
    <div className='receipt-container' ref={ref}>
      <div className='invoice-logo-container'>
        <span><img src={ondoLogo} alt="invoice-logo" /></span>
      </div>
      <div className='invoice-header'>
        <span>E-Revenue Receipt</span>
      </div>
      <div className='invoice-subheader'>
        <span>Ondo Business Premises</span>
        
      </div>
      <div className='invoice-date'>
        <span>Printed Date: {date}</span>
      </div>
      <div className='invoice-payment-header'>
        <span className='payment-header'>Payment Details</span>
        <div className='payment-user-detail'>
            <span>Received From: {busName}</span>
            <span>Transaction ID: {transactionId ? transactionId.substr(0, 10) : null}</span>
            <span>Address: {busAdd}</span>
          </div>
        <div className='payment-container'>
          <div className='payment-fees'>
            {arrears === "no" && <><div className='tax-item'>
              <span>{"Annual Fee"}</span>
              <span>NGN {fees}</span>
          </div>
          <hr /></>}
          {arrears === "no" && <><div className='tax-item'>
            <span>{"Number of Branches"}</span>
            <span>{busBranch}</span>
          </div>
          <hr /></>}
            
          <div className='tax-item'>
            <span>{"Certificate Fee"}</span>
            <span>NGN {certificateFee}</span>
          </div>
          <hr />
            
          <div className='tax-item'>
            <span>Total</span>
            <span>NGN {total}</span>
          </div>
          </div>
        </div>
      </div>
      <div className='hr-note-container'>
        <hr className='hr-note' />
      </div>
      <div className='receipt-query'>
        <span>For any queries or complaints, kindly contact us on: +2348055200079 or buvencommunicationsltd@gmail.com </span>
      </div>
      <div className='receipt-note'>
        <span>Thanks for using the platform</span>
      </div>
    </div>
    <div className='invoice-extra'>
        <span>Kindly, pay using the platform</span>
      </div>
    </>
  )
}
)
export default Receipt;