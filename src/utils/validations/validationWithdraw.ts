import * as Yup from "yup";

export const validationWithdraw =  Yup.object({
    amount: Yup.number().required(),
    purse_Id: Yup.number().required()
});