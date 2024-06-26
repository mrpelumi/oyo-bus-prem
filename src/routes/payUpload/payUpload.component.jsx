/* eslint-disable no-unused-vars */
import './payload.styles.scss';
import { useForm } from 'react-hook-form';
import { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import AuthInput from '../../components/AuthInput/authInput.component';
import AppButton from '../../components/AppButton/appButton.component';
import { handleS3Upload } from '../../utils/awsS3';
import emailjs from "@emailjs/browser";

import { selectReceipt } from '../../store/receipt/receipt.selector';
import { setAppStatus } from '../../store/appStatus/appStatus.reducer';

import { docTaxReceipt } from '../../utils/firebase';
import { Alert } from 'react-st-modal';

const PayUploadPage = () => {
  const {register, handleSubmit, formState: {errors}} = useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const receiptObj = useSelector(selectReceipt);
  const {busName, email} = receiptObj;
  const arrearsObjUrl = useRef();

  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // email address to be changed
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_VERIFY;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const currentTaxId = sessionStorage.getItem("taxAppId");

  const urlBusName = busName.replaceAll(" ", "+");
  const arrearsFileName = sessionStorage.getItem("ArrearsFile");
  const base_url = "https://s3.eu-west-2.amazonaws.com"; 

  if (arrearsFileName !== null) {
    arrearsObjUrl.current = `${base_url}/businesspremises.cloud/${urlBusName}/${arrearsFileName}`
  } else{
    arrearsObjUrl.current = "not provided"
  }

  const filePayInput = {...register("fileReceipt", {
    required: "File must be uploaded",
  }), accept: ".jpg, .jpeg, .png, .pdf"
  }

  const ReceiptSubmitHandler = async (data) => {
    setIsSubmitting(true);
    const currentPath = location.pathname;
     // Upload file to s3 bucket on aws
     const {fileReceipt} = data;
     const fileObj = fileReceipt[0];

     const objectName = `${busName}/${fileObj.name}`
     await handleS3Upload(objectName, fileObj, currentPath);

    const paymentObjUrl = `${base_url}/businessreceipt.cloud/${urlBusName}/${fileObj.name}`

    // send an email with file links
    const templateParams = {
      from_name: "Business Premises Db",
      bus_name: busName,
      to_name: "Admin",
      to_email: "buvencommunicationsltd@gmail.com",
      message: `Kindly, verify the payment of ${busName}.
                The email of the Client is ${email}. The tax appID is ${currentTaxId}.
                The business name of the client is ${busName}.
                The previous annual payment proof is ${arrearsObjUrl.current}.
                The current payment proof is ${paymentObjUrl}`
    }

    await emailjs.send(serviceId, templateId, templateParams, publicKey);
    docTaxReceipt({...receiptObj, paymentStatus: false, taxAppId: currentTaxId});

    setTimeout(() => {
      setIsSubmitting(false);
    }, 1000);
    dispatch(setAppStatus("completed"));
    Alert("Kindly, await the approval for your payments.", "Await Approval")
    .then(response => navigate('/app'));
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
        <AppButton cssname={"save"}  name={"Submit"} isSubmitting={isSubmitting} />
      </form>
    </div>
  )
}

export default PayUploadPage;