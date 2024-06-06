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
import {useFlutterwave, closePaymentModal} from 'flutterwave-react-v3';

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


const getDate = () => {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${date}/${month}/${year}`
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

  const [currentDate, setCurrentDate] = useState(getDate());
  const [uuidVal, setUuidVal] = useState(null);

  const {register, setError, formState: {errors}, setValue, handleSubmit,control} = useForm();

  const config = {
    public_key: 'FLWPUBK_TEST-06fc1afee151daf57c2ef5fb420841a2-X',
    tx_ref: receiptObj.transactionId,
    amount: receiptObj.total,
    currency: 'NGN',
    payment_options: 'card',
    customer: {},
    customizations: {
      title: 'Tax Payment',
      description: 'Payment of Tax for Ondo State',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  }

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
      })
    } 
    getDate();
    taxProfile(currentUser);
    busDocHandler();
    readOnlyExtra.current = true;
    readonlyVal.current = true;
  }, [])


  const onNextHandler =  async (data) => {
    if (location.pathname === '/app/tax' || location.pathname === '/app/tax/') {
      return navigate('/app/tax/business')
    } else if(location.pathname === '/app/tax/business' || location.pathname === '/app/tax/business/'){
      const {busAdd, busName, businessType, email, firstName, lastName,taxId} = data;
      const qTaxAppEmpty = await getDocTaxAppEmpty(email);
      const taxuserProfile = {firstName, lastName, email};
      const taxBusiness = {busName, busAdd, businessType:businessType.value, taxId};
      const qTaxApp = await getDocTaxApp(email);
      
      const subBusTypes = await getDocBusinessType(sectorName);
      const subNameObj = Object.values(subBusTypes.subBusList);
      const subNameList = subNameObj.map(item => {return item.subBusType});
      const busTypeObj = subNameObj.filter(item => item.subBusType === businessType.value);

      try {
        // Handles first time payment
        if (qTaxAppEmpty){
          // Update Payment status upfront
          // Check if business type match
          if (!subNameList.includes(businessType.value)){
           setError("businessType", {type: 'Mismatch of Business Types', message: "Mismatch of Business Types"}) 
           return
          } 
          const newPayee = newCustomer.current;
          const resultUuid =  uuidv4();
          
          // fees for receipt
          taxFee.current = busTypeObj.map(item => item.newRegFee);
          const total = taxFee.current;
          const currentPaymentStatus = paymentStatus.current;
          const taxUuid = uuidv4();
          await docTaxApp({profile: taxuserProfile, business: taxBusiness, newPayee, paymentStatus:currentPaymentStatus, date:currentDate, appId: taxUuid});

          const receiptObj = {busName, email, date:currentDate, fees:taxFee.current, transactionId:resultUuid, total, paymentStatus:currentPaymentStatus};
          const updatedStatus = "processing";
          console.log("faraway");
          dispatch(setNewReceipt(receiptObj));
          dispatch(setAppStatus(updatedStatus))
          
        } else {
          if (!subNameList.includes(businessType.value)){
            setError("businessType", {type: 'Mismatch of Business Types', message: "Mismatch of Business Types"}) 
            return
           }
          qTaxApp.docs.forEach(async (item) => {
            const qTaxData = item.data();
            taxAppDocId.current = item.id;
            if ((qTaxData.paymentStatus === true )&& (qTaxData.business.businessType === businessType.value) ) {
              if (taxAppStatus === "processing"){
                await updateTaxApp(taxAppDocId.current,{
                  business: taxBusiness,
                })
              } else if (taxAppStatus === ""){
                const taxUuid = uuidv4();
                await docTaxApp({profile: taxuserProfile, business: taxBusiness, newPayee:newCustomer.current, paymentStatus:paymentStatus.current, date:currentDate, appId: taxUuid});
              } 
              newCustomer.current = false;
              const newPayee = newCustomer.current;
              const resultUuid =  uuidv4();
              
              taxFee.current = busTypeObj.map(item => item.annualFee);
              const total = taxFee.current;
              const currentPaymentStatus = paymentStatus.current;
              const receiptObj = {busName, email, date:currentDate, fees:taxFee.current,total,  transactionId:resultUuid, paymentStatus:currentPaymentStatus};
              dispatch(setNewReceipt(receiptObj));
              const updatedStatus = "processing";
              dispatch(setAppStatus(updatedStatus));
              return;
            }
          })

          if (taxAppStatus === "processing"){
            taxFee.current = busTypeObj.map(item => item.newRegFee); 
            await updateTaxApp(taxAppDocId.current,{
              business: taxBusiness,
            })
          } else if (taxAppStatus === ""){
            const taxUuid = uuidv4();
            taxFee.current = busTypeObj.map(item => item.newRegFee);
            await docTaxApp({profile: taxuserProfile, business: taxBusiness, newPayee:newCustomer.current, paymentStatus:paymentStatus.current, date:currentDate, appId: taxUuid});
          } 
          
          const resultUuid =  uuidv4();
          const total = taxFee.current;
          
          const currentPaymentStatus = paymentStatus.current;
          const receiptObj = {busName, email, date:currentDate, fees:taxFee.current,total,  transactionId:resultUuid, paymentStatus:currentPaymentStatus};
          dispatch(setNewReceipt(receiptObj));
          const updatedStatus = "processing";
          dispatch(setAppStatus(updatedStatus));
        }
          
      } catch(e) {
        console.log(e);
      }
      return navigate('/app/tax/receipt')
    }
  }

  const onCheckoutHandler = async (data) => {
    const {email, phoneNo, firstName, lastName} = data;
    const fullName = firstName + " " + lastName;
    config.customer = {email, phone_number:phoneNo, name:fullName};
    const qUserTaxApp = await getDocTaxApp(email);
    qUserTaxApp.docs.forEach(item => {
      taxAppDocId.current = item.id;
    })
    
    const handleFlutterPayment = useFlutterwave(config);

    try{
      handleFlutterPayment({
        callback: (response) => {  
          if (response.status === "successful"){
            console.log("worked")
            dispatch(setNewReceipt({paymentStatus:true}))
            dispatch(setAppStatus("completed"))
            docTaxReceipt({...receiptObj, paymentStatus:true});
            updateTaxApp(taxAppDocId.current, {paymentStatus:true, newPayee:false});
            return navigate('/app/success')
          }
          closePaymentModal();
        }, 
        onClose: () => {
        } 
      })
    
    } catch(e) {
      console.log(e);
    }
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
      return navigate('/app/tax')
    } else if(location.pathname === '/app/tax/receipt' || location.pathname === '/app/tax/receipt/'){
      return navigate('/app/tax/business')
  }
  }

  return (
    <form className='taxapp-form'>
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
        ((location.pathname === '/app/tax/business' || location.pathname == '/app/tax/business/') ? <BusInput register={register} errors={errors} control={control} readOnlyVal={readonlyVal} readOnlyExtra={readOnlyExtra} /> : ((location.pathname === '/app/tax/receipt' || location.pathname === '/app/tax/receipt/') ? <Receipt /> : <></>))}
      </div>
      <div className='button-section'>
        <AppButton onClick={handleSubmit(onCancelHandler)} name={"Cancel"} cssname={"other"} />
        {(location.pathname === '/app/tax/receipt' || location.pathname === '/app/tax/receipt/') ? (
          <>
            <AppButton onClick={handleSubmit(onCheckoutHandler)} name={"Checkout"} cssname={"save"} />
          </>
        ): <>
          <AppButton onClick={handleSubmit(onNextHandler)}  name={"Next"} cssname={"save"} />
        </>}
        
      </div>
    </form>
  )
}
// 

export default TaxForm;