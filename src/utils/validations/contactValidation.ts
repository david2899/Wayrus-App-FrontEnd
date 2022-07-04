import * as Yup from "yup";

export const contactValidation =  Yup.object({
    name: Yup.string().required('name is required to know the name of the person we are going to refer to'),
    email: Yup.string().email().required('Email is required to contact you'),
    message: Yup.string().required('message cannot be empty')
});
