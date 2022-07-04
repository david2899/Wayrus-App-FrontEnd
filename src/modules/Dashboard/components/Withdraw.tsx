import React from 'react'

type Props = {
    setWithdraw: React.Dispatch<React.SetStateAction<boolean>>
  }
  
export const Withdraw = ({setWithdraw}: Props) => {

    return (
        <form className="form-horizontal">
            <div className="form-control mt-4">
                
                <div className="col d-flex align-items-baseline justify-content-center mb-2">
                    <button onClick={() => setWithdraw(true)}className="btn btn-primary mt-4">Withdraw</button>
                </div>
            </div>
        </form>
    )
}
