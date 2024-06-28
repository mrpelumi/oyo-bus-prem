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

import { docCertificate, docTaxReceipt, getDocCertificate, updateTaxApp } from '../../utils/firebase';
import { Alert } from 'react-st-modal';
import { Buffer } from 'buffer';
// Date time for firestore
import { serverTimestamp } from 'firebase/firestore';

const PayUploadPage = () => {
  const {register, handleSubmit, formState: {errors}} = useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const receiptObj = useSelector(selectReceipt);
  const {busName, email} = receiptObj;
  const arrearsObjUrl = useRef();
  const certificateNum = useRef();

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
    // const currentTimeStamp = new getServerTimeStamp();
    const currentPath = location.pathname;
     // Upload file to s3 bucket on aws
     const {fileReceipt} = data;
     const fileObj = fileReceipt[0];

     const fileObjName = fileObj.name.replaceAll(" ", "+")

     const objectName = `${busName}/${fileObjName}`
     await handleS3Upload(objectName, fileObj, currentPath);

    const paymentObjUrl = `${base_url}/businessreceipt.cloud/${urlBusName}/${fileObjName}`
    
    const responseCert = await getDocCertificate();
    responseCert.docs.forEach(item => {
      const {certificateNo} = item.data();
      const onlyCertNoStr = certificateNo.match(/(\d+)/);
      const onlyCertNo = Number(onlyCertNoStr[0]) + 1;
      certificateNum.current = `BP${onlyCertNo}`;
    })

    // bypass for admin
    if (email === "buvencommunicationsltd@gmail.com"){
      // Create buffer object, specifying utf8 as encoding
      const emailEncode = Buffer.from(email, "utf8");
      const taxAppIdEncode = Buffer.from(currentTaxId, "utf-8");

      // Encode the Buffer as a base64 string
      const base64Email = emailEncode.toString("base64");
      const base64TaxApp = taxAppIdEncode.toString("base64");

      docTaxReceipt({...receiptObj, paymentStatus: true, taxAppId: currentTaxId});
      
      // Document Certificate
      docCertificate(certificateNum.current,{email, taxAppId:currentTaxId, busName, createdAt:serverTimestamp(), certificateNo: certificateNum.current});
      
      await updateTaxApp(currentTaxId, {paymentStatus: true});
      dispatch(setAppStatus("completed"));
      navigate(`/app/success/${base64Email}/${base64TaxApp}`);
    } else{
      // send an email with file links
      const templateParams = {
        from_name: "Business Premises Db",
        bus_name: busName,
        to_name: "Admin",
        to_email: "buvencommunicationsltd@gmail.com",
        message: `Kindly, verify the payment of ${busName}.
                  The email of the Client is ${email}. The tax appID is ${currentTaxId}
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