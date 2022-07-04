import * as Yup from "yup";

export const validationWithdraw =  Yup.object({
    amount: Yup.number().required(),
    appId: Yup.number().required()
});