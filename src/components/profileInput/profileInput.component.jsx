/* eslint-disable react/prop-types */
import './profileInput.styles.scss';
import { Fragment } from 'react';
import AuthInput from '../AuthInput/authInput.component';
import TextAreaInput from '../textAreaInput/textAreaInput.component';


const ProfileInput = ({register, errors, readOnlyVal=false, readOnlyExtra=false}) => {

 const ProfileInputList = [
  {
    name: "First Name",
    optionInput: {...register("firstName", {
      required:"First Name is required",
      maxLength:255
      }), minLength: 1, readOnly:readOnlyExtra
    },
    errorName: "firstName" 
  },
  {
    name: "Last Name",
    optionInput: {...register("lastName", {
      required:"Last Name is required",
      maxLength:255
      }), minLength: 1, readOnly:readOnlyExtra
    },
    errorName: "lastName" 
  },
  {
    name: "Email",
    optionInput: {...register("email", {
      required:"Email is required",
      maxLength:255
      }), readOnly:true
    },
    errorName: "email"
  },
  {
    name: "Phone No",
    optionInput: {...register("phoneNo", {
      required: "Phone Number is required",
      maxLength: 30,
    }),minLength: 11, pattern: "[0-9]{11}", placeholder:"Enter your 11 nigeria digits", readOnly:true
  },
    errorName: "phoneNo"
  }
 ] 

 const ProfileBusInputList = [
  {
    name: "Name of Business",
    busNameInput: {...register("busName", {
      required: "Enter business name",
      maxLength: 255
    }), minLength: 3, readOnly: readOnlyVal},
    errorName: "busName",
    type:"text"
  },
  {
    name: "Number of Branches in Ondo",
    busNameInput: {...register("busBranch", {
      required: "Enter Number of Business Branch",
    }), min: 1, readOnly: readOnlyExtra},
    errorName: "busName",
    type:"number"
  }
]

  const busAddInput = {...register("busAdd", {
    required: "Enter business address",
    maxLength: 300
  }), minLength: 5, readOnly: readOnlyExtra}

  return (
    <div className='input-section'>
        <div className='section-one'>
          {ProfileInputList.map((item, idx) => {
            return (
              <Fragment key={idx}>
                <div className='input-container'>
                  <label htmlFor="">{item.name}</label>
                  <AuthInput options={item.optionInput} type={"text"} />
                </div>
                <div className='error-container'>
                  {errors[item.errorName] && <div>
                    {errors[item.errorName].message}  
                  </div>}
                </div>
              </Fragment>
            )
          })}
        </div>
        <div className='section-two'>
          {ProfileBusInputList.map((item, idx) => {
            return (
              <Fragment key={idx}>
                <div className='input-container'>
                  <label htmlFor="">{item.name}</label>
                  <AuthInput options={item.busNameInput} type={item.type}/>
                </div>
                <div className='error-container'>
                  {errors[item.errorName] && <div>
                    {errors[item.errorName].message}  
                  </div>}
                </div>
              </Fragment>
            )
          })}
          
          
          <div className='input-container'>
            <label htmlFor="">Business Address</label>
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

export default ProfileInput;