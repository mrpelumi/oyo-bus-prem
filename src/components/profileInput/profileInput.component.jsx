/* eslint-disable react/prop-types */
import './profileInput.styles.scss';
import { Fragment } from 'react';
import AuthInput from '../AuthInput/authInput.component';
import TextAreaInput from '../textAreaInput/textAreaInput.component';


function getDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${year}-0${month}-${date}`;
}

const ProfileInput = ({register, errors, readOnlyVal=false, readOnlyExtra=false}) => {
  const currentDate = getDate(); 

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
  },
  {
    name: "Nationality",
    optionInput: {...register("nationality", {
      maxLength:255
      }),
    },
    errorName: "nationality"
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
  },
  {
    name: "Business Launch Date in Ondo",
    busNameInput: {...register("busCommence", {
      required: "Select Business Commencement Date",
    }), max: currentDate, readOnly: readOnlyExtra},
    errorName: "busCommence",
    type:"date"
  }
]

  const homeAddInput = {...register("homeAdd", {
    required: "Enter home address",
    maxLength: 300
  }), minLength: 5, readOnly: readOnlyExtra}


  const busAddInput = {...register("busAdd", {
    required: "Enter business address",
    maxLength: 300
  }), minLength: 5, readOnly: readOnlyExtra}

  const busAddInput2 = {...register("busAdd2", {
    maxLength: 300
  }), minLength: 5, readOnly: readOnlyExtra}

  const busAddInput3 = {...register("busAdd3", {
    maxLength: 300
  }), minLength: 5, readOnly: readOnlyExtra}

  const busAddInput4 = {...register("busAdd4", {
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
          <div className='input-container'>
            <label htmlFor="">Home Address</label>
            <TextAreaInput options={homeAddInput} rows={3} />
          </div>
          <div className='error-container'>
            {errors.homeAdd && <div>
              {errors.homeAdd.message}  
            </div>}
          </div>
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
            <label htmlFor="">Principal Business Address</label>
            <TextAreaInput options={busAddInput} rows="3" />
          </div>
          <div className='error-container'>
            {errors.busAdd && <div>
              {errors.busAdd.message}  
            </div>}
          </div>
          <div className='input-container'>
            <label htmlFor="">Business Address 2</label>
            <TextAreaInput options={busAddInput2} rows={2}/>
          </div>
          <div className='error-container'>
            {errors.busAdd2 && <div>
              {errors.busAdd2.message}  
            </div>}
          </div>
          <div className='input-container'>
            <label htmlFor="">Business Address 3</label>
            <TextAreaInput options={busAddInput3} rows={2}/>
          </div>
          <div className='error-container'>
            {errors.busAdd3 && <div>
              {errors.busAdd3.message}  
            </div>}
          </div>
          <div className='input-container'>
            <label htmlFor="">Business Address 4</label>
            <TextAreaInput options={busAddInput4} rows={2}/>
          </div>
          <div className='error-container'>
            {errors.busAdd4 && <div>
              {errors.busAdd4.message}  
            </div>}
          </div>
        </div>
      </div>
  )
}

export default ProfileInput;