/* eslint-disable no-unused-vars */
import AppButton from '../../components/AppButton/appButton.component';
import './approvalPage.styles.scss';

import { useForm } from 'react-hook-form';
import { Alert } from 'react-st-modal';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { Buffer } from 'buffer';

import { updateTaxApp, getDocReceipt, updateReceipt } from '../../utils/firebase';
import { useRef, useState } from 'react';

const ApprovalPage = () => {
  const {register, handleSubmit, formState: {errors}} = useForm();
  const navigate = useNavigate();
  const receiptDocId = useRef("");
  const [isSubmittingYes, setIsSubmittingYes] = useState(false);
  const [isSubmittingNo, setIsSubmittingNo] = useState(false);

  // email address to be changed
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_CLIENTMSG;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const onYesHandler = async (data) => {
    // Create buffer object, specifying utf8 as encoding
    setIsSubmittingYes(true);
    const approvalEmailObj = Buffer.from(data.approvalEmail, "utf8");
    const taxAppIdObj = Buffer.from(data.taxAppId, "utf-8");

    // Encode the Buffer as a base64 string
    const base64Email = approvalEmailObj.toString("base64");
    const base64TaxApp = taxAppIdObj.toString("base64");

    const message = `Payment is Approved for ${data.approvalEmail}`;
    const templateParams = {
      status:"Approved",
      from_name: "Business Premises",
      bus_name: data.businessName,
      to_name: `${data.businessName}`,
      to_email: `${data.approvalEmail}`,
      message: `Your payment has been Approved by Buven Communications Ltd.
                Your tax app ID is ${data.taxAppId}. 
                Kindly, click on the link http://www.ondobusinesspremises.com/app/success/${base64Email}/${base64TaxApp}
                To print your receipt and certificate.`
    }

    await emailjs.send(serviceId, templateId, templateParams, publicKey);
    await updateTaxApp(data.taxAppId, {paymentStatus:true});
    const response =  await getDocReceipt(data.approvalEmail, data.taxAppId);
    response.docs.forEach(item => {
      receiptDocId.current = item.id;
    });

    await updateReceipt(receiptDocId.current, {paymentStatus: true});
    setTimeout(() => {
      setIsSubmittingYes(false);
    }, 1000)
    Alert(message, "Payment Alert")
    .then((response) => navigate('/app'))
  }

  const onNoHandler = async (data) => {
    setIsSubmittingNo(true);
    const message = `Payment is Denied for ${data.approvalEmail}`;
    const templateParams = {
      status:"Denied",
      from_name: "Business Premises",
      bus_name: data.businessName,
      to_name: `${data.businessName}`,
      to_email: `${data.approvalEmail}`,
      message: `Your payment has been Denied by Buven Communications Ltd.
                Your tax app ID is ${data.taxAppId}. 
                Kindly, contact our office for more information or complaints.`
    }

    await emailjs.send(serviceId, templateId, templateParams, publicKey);
    await updateTaxApp(data.taxAppId, {paymentStatus:false});
    const response =  await getDocReceipt(data.approvalEmail, data.taxAppId);
    response.docs.forEach(item => {
      receiptDocId.current = item.id;
    });

    await updateReceipt(receiptDocId.current, {paymentStatus: false});
    setTimeout(() => {
      setIsSubmittingNo(false);
    }, 1000)
    Alert(message, "Payment Alert")
    .then((response => navigate("/app")))
  }
  return (
    <div className='main-approval-container'>
       <div className='approval-header'>
          <h3>Approval Page</h3>
          <span>Kindly fill in the client details</span>
        </div>
      <form className='main-approval-form'>
        <div className='input-container approval-input'>
          <label htmlFor="">Email Address</label>
          <input {...register("approvalEmail", {required: "Email is required"})} type="text" />
        </div>
        <div className='error-container'>
            {errors.approvalEmail && <div>
              {errors.approvalEmail.message}  
            </div>}
          </div>
        <div className='input-container approval-input'>
          <label htmlFor="">Business Name</label>
          <input {...register("businessName", {required: "Business Name is required"})} type="text" />
        </div>
        <div className='error-container'>
            {errors.businessName && <div>
              {errors.businessName.message}  
            </div>}
          </div>
        <div className='input-container approval-input'>
          <label htmlFor="">Tax App ID</label>
          <input {...register("taxAppId", {required: "Tax App Id is required"})} type="text" />
        </div>
        <div className='error-container'>
            {errors.taxAppId && <div>
              {errors.taxAppId.message}  
            </div>}
          </div>
        <div className='payment-label'>
          <label htmlFor="">Do you approve the payment?</label>
        </div>
        <div className='approval-button-section'>
          <AppButton cssname={"save"} name={"Yes"} type='submit' onClick={handleSubmit(onYesHandler)} isSubmitting={isSubmittingYes} />
          <AppButton type='submit' cssname={"other"} name={"No"} onClick={handleSubmit(onNoHandler)} isSubmitting={isSubmittingNo} />
        </div>
      </form>
    </div>
  )
}

export default ApprovalPage;