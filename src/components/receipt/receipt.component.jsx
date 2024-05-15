import './receipt.styles.scss';

const receipt_json = {
  businessName: 'Hartway',
  transactionId: "0043",
  taxList: [
    {
      name: "Tax 001",
      taxValue: 60000
    },
    {
      name: "Tax 002",
      taxValue: 400000
    },
    {
      name:"Tax 003",
      taxValue: 43200000
    },
    {
      name: "VAT",
      taxValue: 342000},
  ],
  totalValue: 40000000
}

const Receipt = () => {
  const transId = receipt_json.transactionId;
  const busName = receipt_json.businessName;
  const taxList = receipt_json.taxList;
  const totalValue = receipt_json.totalValue;
  return (
    <div className='receipt-container'>
      <div className='invoice-header'>
        <span>Tax Invoice</span>
      </div>
      <div className='invoice-date'>
        <span>Date: 04/04/2024</span>
      </div>
      <div className='comp-transid'>
        <span>Company: {busName}</span>
        <span>Transaction ID: {transId}</span>
      </div>
      <hr />
      <div className='tax-list'>
        {taxList.map((taxItem, id) => {
          return (
            <div className='tax-item' key={id}>
              <span>{taxItem.name}</span>
              <span>&#8358;{taxItem.taxValue}</span>
            </div>
          )
        }) }
        <hr />
        <div className='tax-total'>
          <span>{totalValue}</span>
        </div>
      </div>
      <hr />
      <div className='receipt-note'>
        <span>Kindly, pay using the platform</span>
      </div>
    </div>
  )
}

export default Receipt;