import './receipt.styles.scss';
import { useSelector } from 'react-redux';
import {selectReceipt} from '../../store/receipt/receipt.selector';


const Receipt = () => {
  const receiptObj = useSelector(selectReceipt);
  const {busName, date, fees, total, transactionId} = receiptObj;


  return (
    <div className='receipt-container'>
      <div className='invoice-header'>
        <span>Tax Invoice</span>
      </div>
      <div className='invoice-date'>
        <span>Date: {date}</span>
      </div>
      <div className='comp-transid'>
        <span>Company: {busName}</span>
        <span>Transaction ID: {transactionId.substr(0, 8)}</span>
      </div>
      <hr />
      <div className='tax-list'>
        <div className='tax-item'>
          <span>{"Tax Fee"}</span>
          <span>&#8358; {fees}</span>
        </div>
        <hr />
        <div className='tax-total'>
          <span>Total</span>
          <span>&#8358; {total}</span>
        </div>
      </div>
      <hr />
      <div className='receipt-note'>
        <span>Kindly, pay using the platform</span>
      </div>
    </div>
  )
}

export default Receipt;