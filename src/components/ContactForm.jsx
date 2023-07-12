import React from 'react';
import Contact from "../api/contact.js";
import {toast} from "react-toastify";
import {useForm,Controller} from "react-hook-form";
import Lang from "../utils/lang.js";
import 'react-toastify/dist/ReactToastify.css';

const ContactForm = () => {
    const {control,handleSubmit,reset,formState:{errors}} = useForm()

    const text = Lang.getCurrentText()

    const submit = async (data) => {
        try{
            const res = await Contact.sendMessage(data)
            reset()
            toast.success(text.form_message , {position:"bottom-right"})
            document.getElementById("customerFullName").value = "";
            document.getElementById("phone").value = "";
            document.getElementById("mail").value = "";
            document.getElementById("description").value = "";
        }catch (e){
            console.log("error")
        }
    }

    return (
        <div className="form-container">
            <form className="contact-form" onSubmit={handleSubmit(submit)}>
                <h2>{text.online_consultation}</h2>
                <div>
                    <Controller rules={{
                        required:{
                            value:true,
                            message:text.form_name_validation
                        },
                    }} control={control} render={({field:{value,onChange}}) => (
                        <input placeholder={text.name}  type="text" id="customerFullName" name="customerFullName" value={value} onChange={onChange}/>
                    )} name="customerFullName"/>
                    {errors?.customerFullName && <span className="validation">{errors?.customerFullName?.message}</span>}
                </div>
                <div>
                    <Controller rules={{
                        required:{
                            value:true,
                            message:text.form_phone_validation
                        },
                    }}  control={control} render={({field:{value,onChange}}) => (
                        <input placeholder={text.phone} type="tel" id="phone" name="phone" value={value} onChange={onChange}/>
                    )} name="phone"/>
                    {errors?.phone && <span className="validation">{errors?.phone?.message}</span>}
                </div>
                <div>
                    <Controller rules={{
                        required:{
                            value:true,
                            message:text.form_email_validation
                        },
                    }}  control={control} render={({field:{value,onChange}}) => (
                    <input placeholder="E-mail" type="email" id="mail" name="mail" value={value} onChange={onChange}/>
                    )} name="mail"/>
                    {errors?.mail && <span className="validation">{errors?.mail?.message}</span>}
                </div>
                <div>
                    <Controller rules={{
                        required:{
                            value:true,
                            message:text.form_desc_validation
                        },
                    }} control={control} render={({field:{value,onChange}}) => (
                    <textarea placeholder={text.describe} id="description" name="description" value={value}
                              onChange={onChange}/>
                    )} name="description"/>
                    {errors?.description && <span className="validation">{errors?.description?.message}</span>}
                </div>
                <button className="send-button" type="submit">{text.make_an_appointment}</button>
            </form>
        </div>
    );
};

export default ContactForm;
