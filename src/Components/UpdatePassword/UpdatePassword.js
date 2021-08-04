import React, {useState} from 'react'
import './UpdatePasswrd.css'
import { useFormik } from 'formik'
import { useAuth } from '../../contexts/AuthContext';

function UpdatePassword() {

    
    const {updatePassword} = useAuth()
    const [message , setMessage] = useState(null)
    let errors= {}
    const formik = useFormik({
        initialValues: {
            password:'',
            confirmPassword:'',
        },  
        
        onSubmit:values => {
                    
            updatePassword(values.password).then(() =>{setMessage("Updated successfully");formik.resetForm();} ).catch((error) => {setMessage(error.message);})
            },
        validate: values => {
           
            if(!values.password){
                errors.password = "Required"
            }
            else if(values.password.length < 8){
                errors.password = "Minimum 8 character"
            }

            if(!values.confirmPassword){
                errors.confirmPassword = "Required"
            }
            else if(values.password.length < 8){
                errors.confirmPassword = "Minimum 8 character"
            }

            if(values.password !== values.confirmPassword){
                errors.confirmPassword = "Password does not match"
            }
            
            // if(!values.question){
            //     errors.question = "Required"
            // }

            // if(!values.answer){
            //     errors.answer = "Required"
            // }
            return errors
        }

    })

    console.log(formik.values)

    return (
        <div className="update-password">
            <div className="dropdown-menu">
                <div className="heading">
                <h3>Update Password</h3>
                {
                    message ? <div className="errors">{message}</div>:null
                }
                </div>
                
               
                <form className="px-4 py-3"  onSubmit={formik.handleSubmit}>    
                    <div className="form-group">
                        <span>Password</span>
                        <input type="password" className="form-control" id="exampleDropdownFormPassword1" placeholder="Password" name="password" onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur} />
                        {formik.touched.password && formik.errors.password ? <div className="errors">{formik.errors.password}</div>  : null}
                    </div>

                    <div className="form-group">
                        <span>Confirm Password</span>
                        <input type="password" className="form-control" id="exampleDropdownFormPassword1" placeholder="Password"  name="confirmPassword" onChange={formik.handleChange} value={formik.values.confirmPassword} onBlur={formik.handleBlur}  />
                        {formik.touched.confirmPassword && formik.errors.confirmPassword ? <div className="errors">{formik.errors.confirmPassword}</div>  : null}
                    </div>
                    <button type="submit" className="btn btn-primary">Reset Password</button>
                </form>
                <div className="dropdown-divider"></div>
            </div>
        </div>
    )
}

export default UpdatePassword
