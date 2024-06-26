import './App.scss';
import {Routes, Route} from 'react-router-dom';
import { useEffect } from 'react';

import { onAuthStateChangedListener } from './utils/firebase';

import AuthNavigation from './routes/AuthNavigation/authNavigation.component';
import Login from './routes/Login/login.component';
import Signup from './routes/signup/signup.component';
import Navigation from './routes/Navigation/navigation.component';
import Profile from './routes/profile/profile.component';
import TaxApp from './routes/taxApp/taxApp.component';
import TaxForm from './routes/taxForm/taxForm.component';
import SuccessPage from './routes/successPage/successPage.component';
import ForgotPassword from './routes/forgotPassword/forgotPassword.component';
import AccountPage  from './routes/accountPage/accountPage';
import PayUploadPage from './routes/payUpload/payUpload.component';
import ApprovalPage from './routes/approvalPage/approvalPage.component';
import ReceiptOriginal from './components/receiptOriginal/receiptOriginal.component';

function App() {

  useEffect(() => {
    const subscribe = onAuthStateChangedListener((user) => {
      if (user){
        const uid = user.uid;
        sessionStorage.setItem("userEmail", user.email);
      }
    })

    return subscribe;
  }, [])
  return (
    <Routes>
      <Route path='/'  element={<AuthNavigation />}>
        <Route index element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
      </Route>
      <Route path='/app' element={<Navigation />}>
        <Route index element={<Profile />} />
        <Route path='/app/admin/approval' element={<ApprovalPage />} />
        <Route path='/app/tax' element={<TaxApp />}>
          <Route index element={<TaxForm />} />
          <Route path='/app/tax/business' element={<TaxForm />} />
          <Route path='/app/tax/receipt' element={<TaxForm />} />
        </Route>
        <Route path='/app/accountPage' element={<AccountPage />} />
        <Route path='/app/payUploadPage' element={<PayUploadPage />} />
      </Route>
      <Route path='/app/success/:userEmail/:taxAppId' element={<SuccessPage />} />
      <Route path='/receipt' element={<ReceiptOriginal />} />
    </Routes>
  )
}

export default App
