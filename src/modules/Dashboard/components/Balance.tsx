import React from 'react'

type Props = {
  connect: () => Promise<any>,
  createPurse: () => Promise<any>,
  contractAppId?: number,
  contractBalance?: number,
  contractAddress: string
  balance?: number,
  accountAddress?: string,
  accountCurrent?: any
}

export const Balance = ({ connect, balance, accountAddress, accountCurrent, createPurse, contractAppId, contractBalance, contractAddress }: Props) => {
  return (
    <div className="br-none">
      <h4 className="title-wayrus">
        Algorand Wallet
      </h4>

      {
        accountCurrent ?
          <div>
            <div className="d-block text-center mt-2">
              <h6 className=''>Address: {accountAddress ? accountAddress.slice(-30) : ''}</h6>
            </div>
            <div className="d-flex justify-content-center mt-4 ">
              <div className="d-flex justify-content-around">
                <h6 style={{ marginRight: '10px' }}>
                  Algo Balance:
                </h6>
                <h6>
                  {balance ? balance : 0}
                </h6>
              </div>
            </div>
            <div className="d-flex justify-content-between mt-2">
              <h6 className='text-primary'>Contract ID: {contractAppId ? contractAppId : null}</h6>
              <h6 className='text-primary'>Contract Balance: {contractBalance ? contractBalance : 0}</h6>
              <h6 className='text-primary'>Contract Address: {contractAddress.length > 0 ? contractAddress : 0}</h6>
            </div>
            {
              contractAppId ?
                null : <div className="d-flex justify-content-center mt-4">
                <button onClick={() => createPurse()} className="btn btn-primary">Create Purse</button>
              </div>
            }

          </div>
          :
          <div className="col d-flex justify-content-center mt-3">
            <button onClick={() => connect()} className="btn btn-primary">Connect Wallet</button>
          </div>
      }

      <div className='content-lineGraph'>
        <img src='https://strapengine.com/wp-content/uploads/2021/11/getting-started-with-web3js.jpg' alt='image' />
      </div>

    </div>
  )
}
