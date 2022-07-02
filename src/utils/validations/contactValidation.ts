import * as Yup from "yup";

export const contactValidation =  Yup.object({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    message: Yup.string().required()
});
