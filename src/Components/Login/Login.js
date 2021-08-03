import React, { useState } from 'react'
import './Login.css'
import { useFormik } from 'formik'
import {Link, useHistory } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext';

function Login() {

    const [autherror, setError] = useState(null)
    const {login} = useAuth()
    const history = useHistory()
    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }    
    const lofd = ""
    
    const formik = useFormik({
        initialValues: {
            email:'',
            password:''
        },  
        onSubmit:async values => {
            
            await login(values.email, values.password).then(() => {history.push('/')}).catch((error) => { setError(error.code) })
            console.log(this.errors)
            
            
        },

        validate: values => {
            let errors = {}
            if(!values.email){
                errors.email = "Required"
            }
            else if(!validateEmail(values.email)) {
                errors.email = "Invalid email!"
            }
            if(!values.password){
                errors.password = "Required"
            }
            else if(values.password.length < 8){
                errors.password = "Minimum 8 character"
            }
            return errors
        }

    })
    return (
        <div className='login-container'>
            <div className="box">
                <div className="square-ver" style={{'--i': 0 }} ></div>
                <div className="square-ver" style={{'--i': 1 }} ></div>
                <div className="square-ver" style={{'--i': 2 }} ></div>
                <div className="square-ver" style={{'--i': 3 }} ></div>
                <div className="square" style={{'--i': 0 }} ></div>
                <div className="square" style={{'--i': 1 }} ></div>
                <div className="square" style={{'--i': 2 }} ></div>
                <div className="square" style={{'--i': 3 }} ></div>
                <div className='container'>
                    <div className="form">
                        <h2>
                            Login
                        </h2>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="inputBox">
                                <input type="email" placeholder="Email Id" name="email" onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur}/>
                                {formik.touched.email  && formik.errors.email ? <div className="errors">{formik.errors.email}</div> : null}
                            </div>
                            <div className="inputBox">
                                <input type="password" placeholder="Paasword" name="password" onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur} />
                                {formik.touched.password && formik.errors.password ? <div className="errors">{formik.errors.password}</div>  : null}
                                {autherror ?<div className="errors">{autherror}</div>:null}
                            </div>

                            <div className="inputBox">
                                <input type="submit" placeholder="Login"/>
                            </div>
                                <p className="forgot">forgot password ?<a href={lofd}>Click here</a></p>
                                <Link to={{ pathname: "/signup/"}}><p className="sign-up">Don't have an account? {" "} Click here</p></Link>
                                
                        </form>
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default Login
