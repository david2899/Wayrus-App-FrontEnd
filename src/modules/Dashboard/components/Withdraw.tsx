import React from 'react';
import { useFormik } from "formik";
import { validationWithdraw } from '../../../utils/validations/validationWithdraw';
import { initialValueWithdraw } from '../../../utils/values/initialValueWithdraw';

export default function Withdraw ()  {

  const formik = useFormik({
      initialValues: initialValueWithdraw,
      validationSchema: validationWithdraw,
      onSubmit: async (formData) => {
          console.log(formData)
      }
  });

  
  return (
    <form className="form-horizontal" onSubmit={formik.handleSubmit}>
      <div className="form-group mt-4">
        <label className="col control-label mt-4 mb-2" htmlFor="message">insert destination address</label>
        <div className="col">
          <input
            required
            type='text'
            className="form-control"
            onChange={formik.handleChange}
            id="address"
            name="address"
            placeholder="Please insert destination address.." />
          <div className="col d-flex align-items-baseline justify-content-end mb-2">
            <button type="submit" className="btn btn-primary mt-4">Submit</button>
          </div>
        </div>
      </div>
    </form>
  )
}