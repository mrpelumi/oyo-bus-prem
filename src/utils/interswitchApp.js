
export const paymentParameters = () => {
  const data = {
  merchantCode: 'MX26070',
  payItemID: 'Default_Payable_MX26070',
  customerEmail: 'johndoe@gmail.com',
  redirectURL: 'https://www.google.com',
  text: 'Pay Now',
  mode: 'TEST',
  transactionReference: Date.now().toString(),
  amount: '10000',
  style: {
      width: '200px',
      height: '40px',
      border: 'none',
      color: '#fff',
      backgroundColor: '#ff0000'
  },
  callback: (response) => {
    console.log('response: ', response)
  }
}
  return data;
}