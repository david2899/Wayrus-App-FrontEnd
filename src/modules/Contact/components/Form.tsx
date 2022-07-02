import React from 'react'
import { useFormik } from "formik";
import { contactValidation } from '../../../utils/validations/contactValidation';
import { initialValueContact } from '../../../utils/values/initialValueContact';

const Form = () => {

    const formik = useFormik({
        initialValues: initialValueContact,
        validationSchema: contactValidation,
        onSubmit: async (formData) => {
            console.log(formData)
        },
    });

    return (
        <div className="well well-sm">
            <form className="form-horizontal" onSubmit={formik.handleSubmit} >
                <fieldset>
                    <legend className="text-center text-primary">Contact us</legend>
                    {/* Name input*/}
                    <div className="form-group mb-3">
                        <label className="col-md-3 control-label" htmlFor="name">Name</label>
                        <div className="col">
                            <input
                                id="name"
                                name="name"
                                onChange={formik.handleChange}
                                type="text"
                                placeholder="Your name"
                                className="form-control" />
                            <span className='text-danger'>{formik.errors.name}</span>
                        </div>
                    </div>
                    {/* Email input*/}
                    <div className="form-group mb-3">
                        <label className="col-md-3 control-label" htmlFor="email">Your E-mail</label>
                        <div className="col">
                            <input
                                id="email"
                                name="email"
                                onChange={formik.handleChange}
                                type="email"
                                placeholder="Your email"
                                className="form-control" />
                            <span className='text-danger'>{formik.errors.email}</span>
                        </div>
                    </div>
                    {/* Message body */}
                    <div className="form-group mb-3">
                        <label className="col-md-3 control-label" htmlFor="message">Your message</label>
                        <div className="col">
                            <textarea
                                className="form-control"
                                id="message"
                                name="message"
                                onChange={formik.handleChange}
                                placeholder="Please enter your message here..." rows={5} defaultValue={""} />
                            <span className='text-danger'>{formik.errors.message}</span>
                        </div>
                    </div>
                    {/* Form actions */}
                    <div className="form-group mb-3">
                        <div className="col d-flex justify-content-between mt-3">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </fieldset>
            </form>
        </div>
    )
}

export default Form