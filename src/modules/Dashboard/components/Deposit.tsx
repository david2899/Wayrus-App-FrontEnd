import React from 'react';
import { useFormik } from "formik";
import { validationWithdraw } from '../../../utils/validations/validationWithdraw';
import { initialValueWithdraw } from '../../../utils/values/initialValueWithdraw';

type Props = {
  makeDeposit: (amount: number) => Promise<any>
}
export default function Deposit({ makeDeposit }: Props) {

  const formik = useFormik({
    initialValues: initialValueWithdraw,
    validationSchema: validationWithdraw,
    onSubmit: async ({amount}) => {
      makeDeposit(amount)
    }
  });


  return (
    <form className="form-horizontal" onSubmit={formik.handleSubmit}>
      <div className="form-group mt-4">
        <label className="col control-label mt-4 mb-2" htmlFor="message">Amount</label>
        <div className="col">
          <input
            required
            type='number'
            className="form-control"
            onChange={formik.handleChange}
            id="amount"
            name="amount"
            placeholder="Please insert Amount.." />
          <div className="col d-flex align-items-baseline justify-content-end mb-2">
            <button type="submit" className="btn btn-primary mt-4">Submit</button>
          </div>
        </div>
      </div>
    </form>
  )
}