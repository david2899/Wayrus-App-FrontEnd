import * as Yup from "yup";

export const registerValidation =  Yup.object({
    userName: Yup.string().required(),
    password: Yup.string().required(),
    confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
});
