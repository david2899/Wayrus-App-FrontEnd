import React from 'react'

export const Withdraw = () => {

    return (
        <form className="form-horizontal">
            <div className="form-control mt-4">
                <div className="col">
                    <label className="control-label mt-4 mb-2" htmlFor="amount">Insert Amount</label>
                    <input
                        required
                        type='number'
                        className="form-control"
                        id="amount"
                        name="amount"
                        placeholder="Please insert Amount.." />
                </div>
                <div className="col d-flex align-items-baseline justify-content-end mb-2">
                    <button type="submit" className="btn btn-primary mt-4">Submit</button>
                </div>
            </div>
        </form>
    )
}
