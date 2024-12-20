import './accountPage.styles.scss';

import { useSelector } from 'react-redux';
import { selectReceipt } from '../../store/receipt/receipt.selector';
import AppButton from '../../components/AppButton/appButton.component';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


const AccountPage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const receiptObj = useSelector(selectReceipt);
  const {total} = receiptObj;


  const onSubmitHandler = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
    }, 1000)
    navigate('/app/payUploadPage');
  }

  return (
    <div className='account-main-container'>
      <div className='account-header'>
        <h3>Account Details</h3>
        <span>Kindly, make a bank transfer to the account below</span>
      </div>
      {/* <div className='account-form'>
        <div>
          <span className='account-form-header'>ACCOUNT 1</span>
        </div>
        <div className='account-item'>
          <span className='acc-title'>Account Name</span>
          <span>BUVEN COMMUNICATIONS NIG. ONDO BUSINESS PREMISES REG. FEE</span>
        </div>
        <div className='account-item'>
          <span className='acc-title'>Account Number</span>
          <span>4780045168</span>
        </div>
        <div className='account-item'>
          <span className='acc-title'>Bank</span>
          <span>ECOBANK</span>
        </div>
        <div className='account-item bank-item'>
          <span className='acc-title'>Amount</span>
          <span>NGN {total}</span>
        </div>
      </div> */}
      <div className='account-form'>
        <div>
          <span className='account-form-header'>ACCOUNT 1</span>
        </div>
        <div className='account-item'>
          <span className='acc-title'>Account Name</span>
          <span>ONDO STATE INTERNAL REVENUE SERVICE SPECIAL IGR</span>
        </div>
        <div className='account-item'>
          <span className='acc-title'>Account Number</span>
          <span>0122778661</span>
        </div>
        <div className='account-item'>
          <span className='acc-title'>Bank</span>
          <span>WEMA BANK</span>
        </div>
        <div className='account-item bank-item'>
          <span className='acc-title'>Amount</span>
          <span>NGN {total}</span>
        </div>
      </div>
      <div>
      <AppButton onClick={onSubmitHandler} name={"Next"} cssname={"other"} isSubmitting={isSubmitting} />
      </div>
    </div>
  )
}

export default AccountPage;