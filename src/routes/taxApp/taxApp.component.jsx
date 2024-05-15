import './taxApp.styles.scss';
import { Outlet } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faReceipt } from '@fortawesome/free-solid-svg-icons';

const TaxApp = () => {

  return (
    <div className='app-main-container'>
      <div className='app-header-container'>
        <FontAwesomeIcon icon={faReceipt} className='header-icon'/>
        <span>Tax Application</span>
      </div>
      <Outlet />
      </div>
  )
}

export default TaxApp;