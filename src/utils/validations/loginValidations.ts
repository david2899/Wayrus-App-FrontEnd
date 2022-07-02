import * as Yup from "yup";

export const loginValidation =  Yup.object({
    password: Yup.string().required()
});
