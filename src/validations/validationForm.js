import * as Yup from "yup";
const validationSchema=Yup.object({
    firstName:Yup.string()
        .min(3,"firstName charecters is not less than 3")
        .max(27,"firstName charecters is not greater than 27")
        .required("First Name is Required"),
    lastName:Yup.string()
        .min(3,"lastName charecters is not less than 3")
        .max(30,"lastName charecters is not greater than 27")
        .required("Last Name is Required"),
    email:Yup.string().required("Email is Required")
        .email("Invalid email format"),
    phone:Yup.string()
        .matches(/^\d{11}$/,"Phone Number must be 11 digits")
        .required("Phone number is Required"),
        
});
const validationFormValue=async (contactData)=>{
    try{
        await validationSchema.validate(contactData,{abortEarly:false});
        // console.log("Form Submited");
        return "Validated";
    }
     catch(error){
        const newError={};
        error.inner.forEach((err)=>{
            newError[err.path]=err.message;
        });
        return newError;
     }
}

export{validationSchema,validationFormValue}