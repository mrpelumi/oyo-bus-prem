/* eslint-disable no-unused-vars */
import './taxForm.styles.scss';
import ProfileInput from "../../components/profileInput/profileInput.component";
import { useEffect, useRef, useState } from 'react';
import { useLocation,Link, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { getDocProfile, docTaxApp, getDocTaxAppEmpty, getDocTaxApp, docTaxReceipt, updateTaxApp, getDocBusinessType } from '../../utils/firebase';
import {Confirm} from 'react-st-modal';
import {v4 as uuidv4} from 'uuid';
import { useDispatch } from 'react-redux';

import { handleS3Upload } from '../../utils/awsS3';

import { setNewReceipt } from '../../store/receipt/receipt.reducer';

import AppButton from "../../components/AppButton/appButton.component";
import BusInput from '../../components/busInput/busInput.component';
import Receipt from '../../components/receipt/receipt.component';

import { selectCurrentUser } from '../../store/user/user.selector';
import { selectReceipt } from '../../store/receipt/receipt.selector';
import { selectAppStatus } from '../../store/appStatus/appStatus.selector';
import { setAppStatus } from '../../store/appStatus/appStatus.reducer';
import { getDocBusinessSector } from '../../utils/firebase';
import { setBusSector } from '../../store/busSector/busSector.reducer';
import { selectBusSectorName } from '../../store/busSectorSingle/busSectorSingle.selector';


const getYear = () => {
  const today = new Date();
  const year = today.getFullYear();
  return `${year}-01-01`
}

const getToday = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate()
  return `${year}-${month}-${day}`
}

const TaxForm = () => {
  const readOnlyExtra = useRef(false);
  const readonlyVal = useRef(false);
  const currentUser = useSelector(selectCurrentUser);
  const receiptObj = useSelector(selectReceipt);
  const taxAppStatus = useSelector(selectAppStatus);
  const sectorName = useSelector(selectBusSectorName);

  const location = useLocation();
  const navigate = useNavigate();
  const newCustomer = useRef(true);
  const paymentStatus = useRef(false);
  const dispatch = useDispatch();
  const taxAppDocId = useRef("");
  const taxFee = useRef();
  const formData = new FormData();

  const [currentYear, setCurrentYear] = useState(getYear());
  const [currentDate, setCurrentDate] = useState(getToday());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uuidVal, setUuidVal] = useState(null);

  const {register, watch, setError, formState: {errors}, setValue, handleSubmit,control} = useForm();

  useEffect(() => {
    // Fill Tax Profile form
    const busDocHandler = async () => {
      const busSectorPromise = await getDocBusinessSector();
      dispatch(setBusSector(busSectorPromise.mainBusType));
    }

    // Check if tax profile database is empty
    const taxProfile = async (currentUser) => {
      const qTaxProfile = await getDocProfile(currentUser);
      qTaxProfile.docs.forEach(item => {
        const qTaxProfileData = item.data();
        setValue("firstName", qTaxProfileData.firstName);
        setValue("lastName", qTaxProfileData.lastName);
        setValue("email", qTaxProfileData.email);
        setValue("phoneNo", qTaxProfileData.phoneNo);
        setValue("busName",qTaxProfileData.busName);
        setValue("busAdd", qTaxProfileData.busAdd);
        setValue("busBranch", qTaxProfileData.busBranch);
        setValue("nationality", qTaxProfileData.nationality);
        setValue("busCommence", qTaxProfileData.busCommence);
        setValue("homeAdd", qTaxProfileData.homeAdd);
        setValue("busAdd2", qTaxProfileData.busAdd2);
        setValue("busAdd3", qTaxProfileData.busAdd3);
        setValue("busAdd4", qTaxProfileData.busAdd4);
      })
    } 
    getYear();
    taxProfile(currentUser);
    busDocHandler();
    readOnlyExtra.current = true;
    readonlyVal.current = true;
  }, [])


  const onNextHandler =  async (data) => {
    if (location.pathname === '/app/tax' || location.pathname === '/app/tax/') {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
      }, 1000)
      return navigate('/app/tax/business')
    } else if(location.pathname === '/app/tax/business' || location.pathname === '/app/tax/business/'){
      setIsSubmitting(true);
      const {busAdd, busName, busBranch, businessType, email, firstName, lastName,taxId, filePay, arrears, busCommence, busOtherAmount} = data;
      
      const taxuserProfile = {firstName, lastName, email};
      const taxBusiness = {busName, busBranch, busCommence, arrears, busAdd, businessType:businessType.value, taxId};
      
      const subBusTypes = await getDocBusinessType(sectorName);
      const subNameObj = Object.values(subBusTypes.subBusList);
      const subNameList = subNameObj.map(item => {return item.subBusType});
      const busTypeObj = subNameObj.filter(item => item.subBusType === businessType.value);


      try {
        // Handles first time payment
        if (arrears === "no"){
          // Check if business type match
          if (!subNameList.includes(businessType.value)){
            setIsSubmitting(false);
           setError("businessType", {type: 'Mismatch of Business Types', message: "Mismatch of Business Types"});
           return
          } 
          
          if (businessType.value === "Custom Business"){
            taxFee.current = busOtherAmount;
          } else{
            taxFee.current = busTypeObj.map(item => item.annualFee);
          }

          const receiptUuid =  uuidv4().substring(0,10);
          sessionStorage.setItem("receiptId", receiptUuid)
          const currentPaymentStatus = paymentStatus.current;
          
          
          const certificateFee = taxFee.current * 0.2;
          const branchTotal = taxFee.current * Number(busBranch);

          const total = branchTotal + certificateFee;
          
          if (taxAppStatus === ""){
            const taxUuid = uuidv4().substring(0,10);
            sessionStorage.setItem("taxAppId", taxUuid);
            taxAppDocId.current = taxUuid;
            await docTaxApp(taxUuid, {taxAppId: taxUuid,profile: taxuserProfile, business: taxBusiness, date:currentDate, paymentStatus:currentPaymentStatus, certificateFee, total, renewalFee:taxFee.current });
            const updatedStatus = "processing";
            dispatch(setAppStatus(updatedStatus))
          } else if( taxAppStatus === "processing"){
            await updateTaxApp(taxAppDocId.current,{
              business: taxBusiness, renewalFee:taxFee.current, certificateFee, total
            })
          }
          const receiptObj = {arrears, busAdd, busName, busBranch, email, date:currentDate, fees:taxFee.current, transactionId:receiptUuid, certificateFee, total, paymentStatus:currentPaymentStatus};
          dispatch(setNewReceipt(receiptObj));
          
        } else if (arrears === "yes"){
          if (!subNameList.includes(businessType.value)){
            setIsSubmitting(false);
            setError("businessType", {type: 'Mismatch of Business Types', message: "Mismatch of Business Types"}) 
            return
           } 

           if (businessType.value === "Custom Business"){
            taxFee.current = busOtherAmount;
          } else{
            taxFee.current = busTypeObj.map(item => item.annualFee);
          }
 
           const receiptUuid =  uuidv4().substring(0,10);
           sessionStorage.setItem("receiptId", receiptUuid)
           const currentPaymentStatus = paymentStatus.current;
           
           const certificateFee = taxFee.current * 0.2;
 
           const total = certificateFee;
           if (taxAppStatus === ""){
             const taxUuid = uuidv4().substring(0,10);
             sessionStorage.setItem("taxAppId", taxUuid);
             taxAppDocId.current = taxUuid;
             await docTaxApp(taxUuid, {taxAppId: taxUuid,profile: taxuserProfile, business: taxBusiness, date:currentDate, paymentStatus:currentPaymentStatus, renewalFee: taxFee.current, certificateFee, total });
             const updatedStatus = "processing";
             dispatch(setAppStatus(updatedStatus))
           } else if( taxAppStatus === "processing"){
             await updateTaxApp(taxAppDocId.current,{
               business: taxBusiness, renewalFee: taxFee.current, certificateFee, total
             })
           }
           const receiptObj = {arrears, busAdd, busName, busBranch, email, date:currentDate, fees:taxFee.current, transactionId:receiptUuid, certificateFee, total, paymentStatus:currentPaymentStatus};
           dispatch(setNewReceipt(receiptObj));
          
           const currentPath = location.pathname;
           // Upload file to s3 bucket on aws
            const fileProp = filePay[0];
            const objectName = `${busName}/${fileProp.name}`
            sessionStorage.setItem("ArrearsFile", fileProp.name);
            await handleS3Upload(objectName, fileProp, currentPath);
        }
          
      } catch(e) {
        console.log(e);
      }
      setTimeout(() => {
        setIsSubmitting(false);
      }, 1000)
      return navigate('/app/tax/receipt')
    }
  }

  const onCheckoutHandler = async (data) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
    }, 1000)
    return navigate('/app/accountPage')
  }

  // Deletes tax document ID
  const onCancelHandler = async (data) => {
    if (location.pathname === '/app/tax' || location.pathname === '/app/tax/') {
      // Delete Tax App on platform
      const result = await Confirm("Are you sure you want to cancel", "Cancel Tax Application");
      if (result) {
        navigate('/app');
      } else{
        return;
      }
    } else if(location.pathname === '/app/tax/business' || location.pathname === '/app/tax/business/'){
      setIsSubmitting(false);
      return navigate('/app/tax')
    } else if(location.pathname === '/app/tax/receipt' || location.pathname === '/app/tax/receipt/'){
      setIsSubmitting(false);
      return navigate('/app/tax/business')
  }
  }

  return (
    <form className='taxapp-form' encType="multipart/form-data">
      <div className='taxapp-main-area'>
        <div className='taxapp-headers'>
          {(location.pathname === '/app/tax' || location.pathname === '/app/tax/') ? 
            <span><Link className={'taxapp-item current'}>Personal Details</Link></span> : 
            <span><Link className={'taxapp-item'}>Personal Details</Link></span> 
          }
          {(location.pathname === '/app/tax/business' || location.pathname === '/app/tax/business/') ? 
            <span><Link className={'taxapp-item current'}>Business Details</Link></span> : 
            <span><Link className={'taxapp-item'}>Business Details</Link></span> 
          }
          {(location.pathname === '/app/tax/receipt' || location.pathname === '/app/tax/receipt/') ? 
            <span><Link className={'taxapp-item current'}>Receipt</Link></span> : 
            <span><Link className={'taxapp-item'}>Receipt</Link></span> 
          }
            
        </div>
        <hr />
        {(location.pathname === '/app/tax' || location.pathname === '/app/tax/') ? <ProfileInput register={register} errors={errors} readOnlyExtra={readOnlyExtra} readOnlyVal={readonlyVal} /> : 
        ((location.pathname === '/app/tax/business' || location.pathname == '/app/tax/business/') ? <BusInput register={register} errors={errors} control={control} readOnlyVal={readonlyVal} readOnlyExtra={readOnlyExtra} watch={watch} /> : ((location.pathname === '/app/tax/receipt' || location.pathname === '/app/tax/receipt/') ? <Receipt /> : <></>))}
      </div>
      <div className='button-section'>
        <AppButton onClick={handleSubmit(onCancelHandler)} name={"Cancel"} cssname={"other"} />
        {(location.pathname === '/app/tax/receipt' || location.pathname === '/app/tax/receipt/') ? (
          <>
            <AppButton onClick={handleSubmit(onCheckoutHandler)} name={"Checkout"} cssname={"save"} />
          </>
        ): <>
          <AppButton onClick={handleSubmit(onNextHandler)}  name={"Next"} cssname={"save"} isSubmitting={isSubmitting} />
        </>}
        
      </div>
    </form>
  )
}
// 

export default TaxForm;