import React from 'react'

type Props = {
  connect: () => Promise<any>,
  balance?: number,
  accountAddress?: string,
  accountCurrent?: any 
}

export const Balance = ({ connect, balance, accountAddress, accountCurrent }: Props) => {

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
                <h5 style={{ marginRight: '10px' }}>
                  Algo:
                </h5>
                <h5>
                  {balance ? balance : 0}
                </h5>
              </div>
            </div>
            <div className="d-block text-center mt-2">
                <h6 className='text-primary'>867967</h6>
              </div>
            <div className="d-flex justify-content-between mt-4">
              <button onClick={() => console.log(false)} className="btn btn-primary">Create Purse</button>
            </div>
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
