/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import './receiptOriginal.styles.scss';
import { forwardRef } from 'react';

const ReceiptOriginal = forwardRef((props, ref) => {
  const receiptObj = props.receiptValues;
  return(
    <div className='original-main-container' ref={ref}>
      <div className='original-header-container'>
        <span></span>
      </div>
      <div className='original-date-container'>
        <span>Date: </span>
        <span>{receiptObj.date}</span>
      </div>
      <div className='original-transaction-container'>
        <div className='transaction-item'>
          <span>Received From:</span>
          <span>{receiptObj.busName}</span>
        </div>
        <div className='transaction-item'>
          <span>Transaction ID: </span>
          <span>{receiptObj.transactionId}</span>
        </div>
      </div>
      <div className='original-list-container'>
        {receiptObj.arrears === "no" && <hr />}
        {receiptObj.arrears === "no" && <div className='original-item-container'>
          <span>Annual Fee</span>
          <span>NGN {receiptObj.fees[0]}</span>
        </div>}
        {receiptObj.arrears === "no" && <hr />}
        {receiptObj.arrears === "no" && <div className='original-item-container'>
          <span>Number of Branches</span>
          <span>{receiptObj.busBranch}</span>
        </div>}
        <hr />
        <div className='original-item-container'>
          <span>Certificate Fee</span>
          <span>NGN {receiptObj.certificateFee}</span>
        </div>
        <hr />
        <div className='original-item-container'>
          <span>Mode of Payment</span>
          <span>Bank Transfer</span>
        </div>
        <hr />
        <div className='original-item-container'>
          <span>Total</span>
          <span>NGN {receiptObj.total}</span>
        </div>
        <hr />
      </div>
    </div>
  )
}
)

export default ReceiptOriginal;