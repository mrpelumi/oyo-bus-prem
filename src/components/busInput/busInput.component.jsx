/* eslint-disable react/prop-types */
import './busInput.styles.scss';
import { useRef, useState } from 'react';
import Select from 'react-select';
import { Controller } from 'react-hook-form';
import AuthInput from '../AuthInput/authInput.component';
import TextAreaInput from '../textAreaInput/textAreaInput.component';

import { useDispatch, useSelector } from 'react-redux';
import { selectBusSector } from '../../store/busSector/busSector.selector';
import { getDocBusinessType } from '../../utils/firebase';
import { setBusSectorName } from '../../store/busSectorSingle/busSectorSingle.reducer';


const customStyles = {
  control: (provided) => ({
    ...provided,
    background: 'transparent',
    display: 'flex',
    flexWrap: 'nowrap',
    height: '3rem',
    borderColor: '#4F2B1A',
    width: '100%',
    outline: 'none',
  }),
  menu: (provided) => ({
    ...provided,
    background: '#fff',
    width: '100%',
    color: '#79442B'
  }),
};

const BusInput = ({register, errors, control, readOnlyVal, readOnlyExtra, watch}) => {
  const watchArrears = watch("arrears", "no");
  const watchBusCommence = watch("busCommence", "2023-01-01");
  const watchBusType = watch("businessType", "");
  // main Business list
  const busSelector = useSelector(selectBusSector);
  const busSectorList = Object.values(busSelector);
  const busSectorObj = busSectorList.map(item => {return {label: item, value: item}})
  const [subName, setSubName] = useState([]);
  const dispatch = useDispatch();

  const SelectBusType = useRef(null);

  const busNameInput = {...register("busName", {
    required:"Name is required",
    maxLength:255
    }), minLength: 3, readOnly:readOnlyVal
  }

  const busBranchInput = {...register("busBranch", {
      required: "Enter Number of Business Branch",
    }), min: 1, readOnly: readOnlyExtra}

  const busOtherAmount = {...register("busOtherAmount", {
      required: watchBusType.value === "Custom Business" ? "Enter Custom Amount" : false,
    }), min: 1, errorname: "busOtherAmount"}

  const taxIdInput = {...register("taxId", {
    maxLength: 100
  }), minLength: 5, pattern: "[0-9]", placeholder: "Enter your TIN"}

  const busAddInput = {...register("busAdd", {
    required: "Address is required",
    maxLength: 300
  }), minLength: 5, readOnly: readOnlyExtra}

  const busCommenceInput = {...register("busCommence", {
      required: "Select Business Commencement Date",
    }), readOnly: readOnlyExtra,
    errorname: "busCommence",
  }

  const filePayInput = {...register("filePay", {
    required: watchArrears === "no" ? false : "File must be uploaded",
  }), accept: ".jpg, .jpeg, .svg, .png, .pdf, .doc, .docx"
  }


  // Change Select Options
  const SelectHandler = async (data) => {
    const currentBusSector = data.value;
    dispatch(setBusSectorName(currentBusSector));
    
    const subBusTypes = await getDocBusinessType(currentBusSector);
    const subNameList = Object.values(subBusTypes.subBusList);
    const subBusNameObj = subNameList.map((item) => {return {label:item.subBusType, value:item.subBusType}})
    setSubName(subBusNameObj)
    SelectBusType.current.focus();
  }
  return(
    <div className='input-section'>
      <div className='section-one'>
        <div className='input-container'>
          <label htmlFor="">Name of Business</label>
          <AuthInput options={busNameInput} type={"text"} />
        </div>
        <div className='error-container'>
            {errors.busName && <div>
              {errors.busName.message}  
            </div>}
        </div>

        <div className='input-container'>
          <label htmlFor="">Nature of Business</label>
          <Controller name='businessNature' control={control} render={({
            field: { value}
          }) => (
            <Select className='select-business' isSearchable={true} styles={customStyles} onChange={SelectHandler} value={value} options={busSectorObj} />
          )} /> 
        </div>
        <div className='error-container'>
            {errors.businessNature&& <div>
              {errors.businessNature.message}  
            </div>}
        </div>
        {/* Conditional based on business */}
        <div className='input-container'>
          <label htmlFor="">Type of Business</label>
          <Controller name='businessType' control={control} render={({
            field: {onChange, onBlur, value}
          }) => (
            <Select className='select-business' isSearchable={false} styles={customStyles} onChange={onChange} onBlur={onBlur} value={value} options={subName} ref={SelectBusType} required={"Select an option"} />
          )} rules={{ required: 'Select an option '}} />
        </div>
        <div className='error-container'>
            {errors.businessType&& <div>
              {errors.businessType.message}  
            </div>}
        </div>
        
        {watchBusType.value === "Custom Business" && 
          <div className='input-container'>
            <label htmlFor="">Enter Custom Amount</label>
            <AuthInput options={busOtherAmount} type={"number"} />
          </div>
        }
        <div className='error-container'>
          {errors.busOtherAmount && <div>
            {errors.busOtherAmount.message}  
          </div>}
        </div>

        <div className='input-container'>
          <label htmlFor="">Business Launch Date in Ondo</label>
          <AuthInput options={busCommenceInput} type={"date"} />
        </div>
        <div className='error-container'>
            {errors.busCommence && <div>
              {errors.busCommence.message}  
            </div>}
        </div>

        { watchBusCommence && <div className='input-container'>
          <label htmlFor="">Have you made payment this year?</label>
          <select className='arrears-select' {...register("arrears")}>
            <option value="no">NO</option>
            <option value="yes">YES</option>
          </select>
        </div>}
        <div className='error-container'>
            {errors.arrears && <div>
              {errors.arrears.message}  
            </div>}
        </div>
        {watchArrears==="yes" && <div className='input-container'>
          <label htmlFor="">Upload Evidence of Payment</label>
          <AuthInput options={filePayInput} type={"file"}/>
        </div>}
        <div className='error-container'>
            {errors.filePay && <div>
              {errors.filePay.message}  
            </div>}
        </div>
      </div>
      <div className='section-two'>
      <div className='input-container'>
        <label htmlFor="">Name of Branches in Ondo</label>
        <AuthInput options={busBranchInput} type={"number"} />
      </div>
      <div className='error-container'>
          {errors.busBranchInput && <div>
            {errors.busBranchInput.message}  
          </div>}
      </div>
      <div className='input-container'>
          <label htmlFor="">Tax Identification Number</label>
          <AuthInput options={taxIdInput} type={"text"} />
        </div>
        <div className='error-container'>
            {errors.taxId&& <div>
              {errors.taxId.message}  
            </div>}
        </div>
        <div className='input-container'>
          <label htmlFor="">Principal Business Address</label>
          <TextAreaInput options={busAddInput} />
        </div>
        <div className='error-container'>
            {errors.busAdd && <div>
              {errors.busAdd.message}  
            </div>}
          </div>
      </div>
    </div>
  )
}

export default BusInput;