import React, {useState} from 'react'
import '../UpdatePassword/UpdatePasswrd.css'
import { useFormik } from 'formik'
import { useAuth } from '../../contexts/AuthContext';

function ForgotPassword() {

    const {resetPassword} = useAuth()
    const [message , setMessage] = useState(null)    
    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }  
    const formik = useFormik({
        initialValues: {
            password:'',
            confirmPassword:'',
        },  
        
        onSubmit:values => { 
            resetPassword(values.email).then(() =>{setMessage("Please check your email successfully");formik.resetForm();} ).catch((error) => {setMessage(error.message);})
            },
        
        validate: values => {
                let errors = {}
                if(!values.email){
                    errors.email = "Required"
                }
                else if(!validateEmail(values.email)) {
                    errors.email = "Invalid email!"
                }
                return errors
            }
        })


    return (
        <div className="update-password">
            <div className="dropdown-menu">
                <div className="heading">
                <h3>Forgot Password</h3>
                {
                    message ? <div className="errors">{message}</div>:null
                }
                </div>
                <form className="px-4 py-3"  onSubmit={formik.handleSubmit}>    
                    <div className="form-group">
                        <span>email</span>
                        <input type="email" className="form-control" id="exampleDropdownFormPassword1" placeholder="email" name="email" onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} />
                        {formik.touched.email && formik.errors.email ? <div className="errors">{formik.errors.email}</div>  : null}
                    </div>
                    <button type="submit" className="btn btn-primary">Reset Password</button>
                </form>
                <div className="dropdown-divider"></div>
            </div>
        </div>
    )
}

export default ForgotPassword
