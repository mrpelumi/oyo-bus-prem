import './taxForm.styles.scss';
import ProfileInput from "../../components/profileInput/profileInput.component";
import { useLocation,Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AppButton from "../../components/AppButton/appButton.component";
import BusInput from '../../components/busInput/busInput.component';
import Receipt from '../../components/receipt/receipt.component';

const TaxForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {register, formState: {errors}, handleSubmit,control, reset} = useForm();

  const onSaveHandler = (data) => {
    console.log(data);
  }

  const onNextHandler = (data) => {
    console.log(data);
    if (location.pathname === '/app/tax' || location.pathname === '/app/tax/') {
      return navigate('/app/tax/business')
    } else if(location.pathname === '/app/tax/business' || location.pathname === '/app/tax/business/'){
      return navigate('/app/tax/receipt')
    }
  }

  const onCheckoutHandler = (data) => {
    console.log(data);
    navigate('/app/success')
  }

  const onCancelHandler = (data) => {
    console.log(data)
    if (location.pathname === '/app/tax' || location.pathname === '/app/tax/') {
      reset({
        firstName:"",
        lastName:"",
        email:"",
        phoneNo:"",
        busName:"",
        busAdd:""
      });
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
        {(location.pathname === '/app/tax' || location.pathname === '/app/tax/') ? <ProfileInput register={register} errors={errors} /> : 
        ((location.pathname === '/app/tax/business' || location.pathname == '/app/tax/business/') ? <BusInput register={register} errors={errors} control={control} /> : ((location.pathname === '/app/tax/receipt' || location.pathname === '/app/tax/receipt/') ? <Receipt /> : <></>))}
      </div>
      <div className='button-section'>
        <AppButton onClick={handleSubmit(onCancelHandler)} name={"Cancel"} cssname={"other"} />
        {(location.pathname === '/app/tax/receipt' || location.pathname === '/app/tax/receipt/') ? (
          <>
            <AppButton onClick={handleSubmit(onCheckoutHandler)} name={"Checkout"} cssname={"save"} />
          </>
        ): <>
          <AppButton onClick={handleSubmit(onSaveHandler)} name={"Save"} cssname={"other"} />
          <AppButton onClick={handleSubmit(onNextHandler)} name={"Next"} cssname={"save"} />
        </>}
        
      </div>
    </form>
  )
}

export default TaxForm;