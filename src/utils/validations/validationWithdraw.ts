import * as Yup from "yup";

export const validationWithdraw =  Yup.object({
    address: Yup.string().required()
});