import './accountPage.styles.scss';

import { useSelector } from 'react-redux';
import { selectReceipt } from '../../store/receipt/receipt.selector';
import AppButton from '../../components/AppButton/appButton.component';
import { useNavigate } from 'react-router-dom';


const AccountPage = () => {
  const navigate = useNavigate();

  const receiptObj = useSelector(selectReceipt);
  const {total} = receiptObj;


  const onSubmitHandler = () => {
    navigate('/app/payUploadPage');
  }

  return (
    <div className='account-main-container'>
      <div className='account-header'>
        <h3>Account Details</h3>
        <span>Kindly, make a bank transfer to the account below</span>
      </div>
      <div className='account-form'>
        <div className='account-item'>
          <span className='acc-title'>Account Name</span>
          <span>ODSG Revenue Transit Account</span>
        </div>
        <div className='account-item'>
          <span className='acc-title'>Account Number</span>
          <span>1000301458</span>
        </div>
        <div className='account-item'>
          <span className='acc-title'>Bank</span>
          <span>Globus Bank</span>
        </div>
        <div className='account-item bank-item'>
          <span className='acc-title'>Amount</span>
          <span>NGN {total}</span>
        </div>
      </div>
      <div>
      <AppButton onClick={onSubmitHandler} name={"Next"} cssname={"other"} />
      </div>
    </div>
  )
}

export default AccountPage;