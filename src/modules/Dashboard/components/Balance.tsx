import React from 'react'


export const Balance = () => {

  const [wallet, setWallet] = React.useState<any>(false)

  return (
    <div className="br-none">
      <h4 className="title-wayrus">
        Algorand Wallet
      </h4>

      {
        wallet ?
          <div>
            <div className="d-flex justify-content-center mt-4 ">
              <div className="d-flex justify-content-around">
                <h5 style={{ marginRight: '10px' }}>
                  Algo:
                </h5>
                <h5>
                  14.200
                </h5>
              </div>
            </div>
            <div className="d-flex justify-content-between mt-4">
              <button onClick={() => setWallet(false)} className="btn btn-primary">Create Purse</button>
              <button onClick={() => setWallet(false)} className="btn btn-primary">Disconnect Wallet</button>
            </div>
          </div>
          :
          <div className="col d-flex justify-content-center mt-3">
            <button onClick={() => setWallet(true)} className="btn btn-primary">Connect Wallet</button>
          </div>
      }

      <div className='content-lineGraph'>
        <img src='https://strapengine.com/wp-content/uploads/2021/11/getting-started-with-web3js.jpg' alt='image' />
      </div>

    </div>
  )
}
