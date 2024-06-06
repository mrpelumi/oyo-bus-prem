import './successPage.styles.scss';
import {Link} from 'react-router-dom';
import { Alert } from 'react-st-modal';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { faCertificate } from '@fortawesome/free-solid-svg-icons';


const SuccessPage = () => {
  const onPrintHandler = async () => {
    await Alert("Print Feature coming soon", "Print Feature")
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
      <div className='certificate-text'>
        <span><FontAwesomeIcon icon={faCertificate} /></span>
        <span>Certificate ready</span>
      </div>
      <div className='certificate-btn'>
        <button onClick={onPrintHandler}>Print Certificate</button>
      </div>
      <div className='home-link-container'>
        <Link to={'/app/tax'} className={'home-link-txt'}>Go to Home</Link>
      </div>
    </div>
  )
}

export default SuccessPage;