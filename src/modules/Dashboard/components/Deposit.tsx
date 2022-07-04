import React from 'react';
import { useFormik } from "formik";
import { validationWithdraw } from '../../../utils/validations/validationWithdraw';
import { initialValueWithdraw } from '../../../utils/values/initialValueWithdraw';

type Props = {
  makeDeposit: (appId: number, amount: number) => Promise<any>
}
export default function Deposit({ makeDeposit }: Props) {

  const formik = useFormik({
    initialValues: initialValueWithdraw,
    validationSchema: validationWithdraw,
    onSubmit: async ({ appId, amount }) => {
      makeDeposit(appId, amount)
    }
  });


  return (
    <form className="form-horizontal" onSubmit={formik.handleSubmit}>
      <div className="row mt-4">

        <div className="col-6">
          <label className="control-label mt-4 mb-2" htmlFor="amount">Amount</label>
          <input
            required
            type='number'
            className="form-control"
            onChange={formik.handleChange}
            id="amount"
            name="amount"
            placeholder="Please insert Amount.." />
        </div>
        <div className="col-6">
          <label className="control-label mt-4 mb-2" htmlFor="purse_Id">purse Id</label>
          <input
            required
            type='number'
            className="form-control"
            onChange={formik.handleChange}
            id="appId"
            name="appId"
            placeholder="Please insert purse Id.." />
        </div>
        <div className="col d-flex align-items-baseline justify-content-end mb-2">
          <button type="submit" className="btn btn-primary mt-4">Submit</button>
        </div>
      </div>
    </form>
  )
}