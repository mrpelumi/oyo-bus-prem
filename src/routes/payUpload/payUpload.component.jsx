import './payload.styles.scss';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import AuthInput from '../../components/AuthInput/authInput.component';
import AppButton from '../../components/AppButton/appButton.component';
import { handleS3Upload } from '../../utils/awsS3';

import { selectReceipt } from '../../store/receipt/receipt.selector';
import { setAppStatus } from '../../store/appStatus/appStatus.reducer';
import { setNewReceipt } from '../../store/receipt/receipt.reducer';

import { docTaxReceipt } from '../../utils/firebase';
import { updateTaxApp } from '../../utils/firebase';

const PayUploadPage = () => {
  const {register, handleSubmit, formState: {errors}} = useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const receiptObj = useSelector(selectReceipt);
  const {busName} = receiptObj;

  const filePayInput = {...register("fileReceipt", {
    required: "File must be uploaded",
  }), accept: ".jpg, .jpeg, .png, .pdf"
  }
  const currentTaxId = sessionStorage.getItem("taxAppId");
  const ReceiptSubmitHandler = async (data) => {
    const currentPath = location.pathname;
     // Upload file to s3 bucket on aws
     const {fileReceipt} = data;
     const fileObj = fileReceipt[0];

     const objectName = `${busName}/${fileObj.name}`
     await handleS3Upload(objectName, fileObj, currentPath);
     dispatch(setNewReceipt({paymentStatus:true}));
     dispatch(setAppStatus("completed"));
     docTaxReceipt({...receiptObj, paymentStatus: true, taxAppId: currentTaxId});
     updateTaxApp(currentTaxId, {paymentStatus:true});
     navigate('/app/success');
  }

  return (
    <div className='payUpload-main-container'>
      <div className='payUpload-header'>
        <h3>Upload Receipt</h3>
        <span>Kindly upload your receipt</span>
      </div>
      <form onSubmit={handleSubmit(ReceiptSubmitHandler)} action="" encType='multipart/form-data' className='payUpload-form'>
        <div>
          <label htmlFor="">Receipt File</label>
          <AuthInput options={filePayInput} type={"file"} />
        </div>
        <div className='error-container'>
            {errors.fileReceipt && <div>
              {errors.fileReceipt.message}  
            </div>}
        </div>
        <AppButton cssname={"save"}  name={"Submit"}/>
      </form>
    </div>
  )
}

export default PayUploadPage;