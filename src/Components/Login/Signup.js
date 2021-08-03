import React, {useState} from 'react'
import './Login.css'
import { useFormik } from 'formik'
import {Link} from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext';
import {db} from '../../firebase'

function Signup() {

    const [autherror, setError] = useState(null)
    const {signup} = useAuth()
    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    } 
    let errors = {}
    const formik = useFormik({
        initialValues: {
            email:'',
            password:'',
            confirmPassword:'',
            question:'',
            answer:''

        },  
        
        onSubmit:values => {
            
                signup(values.email, values.password).then((user) => {
                        
                        db.collection("users").doc(user.user.uid).set({
                           answer:values.answer,
                           question:values.question,
                           isAdmin:false,
                           isDelete:false,
                           isActive:false,
                           uid:user.user.uid
                        })
                        .then(() => {
                            console.log("Document successfully written!");
                        })
                        .catch((error) => {
                            console.error("Error writing document: ", error);
                        });
                        console.log("user is signup")})
                .catch((error) => {setError(error.code);console.log(error)})
            },
        validate: values => {
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

            if(!values.confirmPassword){
                errors.confirmPassword = "Required"
            }
            else if(values.password.length < 8){
                errors.confirmPassword = "Minimum 8 character"
            }

            if(values.password !== values.confirmPassword){
                errors.confirmPassword = "Password does not match"
            }
            
            if(!values.question){
                errors.question = "Required"
            }

            if(!values.answer){
                errors.answer = "Required"
            }
            return errors
        }

    })

    const option = [{'key':"What is your pet name",'value':"1"},
                    {'key':"What is your first school name",'value':"2"}
                    ]

    

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
                            Signup
                        </h2>
                        <form onSubmit={formik.handleSubmit}>
                                <div className="inputBox">
                                    <input type="email" placeholder="Email Id" name="email" onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur}/>
                                    {formik.touched.email  && formik.errors.email ? <div className="errors">{formik.errors.email}</div> : null}
                                </div>
                            <div className="inputBox">
                                <input type="password" placeholder="Paasword" name="password" onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur} />
                                {formik.touched.password && formik.errors.password ? <div className="errors">{formik.errors.password}</div>  : null}
                            </div>
                            <div className="inputBox">
                                <input type="password" placeholder="Confirm Paasword" name="confirmPassword" onChange={formik.handleChange} value={formik.values.confirmPassword} onBlur={formik.handleBlur} />
                                {formik.touched.confirmPassword && formik.errors.confirmPassword ? <div className="errors">{formik.errors.confirmPassword}</div>  : null}
                            </div>
                            <div className="col-lg-6 col-sm-12 inputBox">
                                <span>Hint Question</span>
                                <select name="question" value={formik.values.question} onChange={formik.handleChange} >
                                    <option value={option[0].value}>{option[0].key}</option>
                                    <option value={option[1].value} >{option[1].key}</option>
                                </select>
                                {formik.touched.question  && formik.errors.question ? <div className="errors">{formik.errors.question}</div> : null}
                            </div>

                            <div className="inputBox">
                                    <input type="text" placeholder="Answer" name="answer" onChange={formik.handleChange} value={formik.values.answer} onBlur={formik.handleBlur}/>
                                    {formik.touched.answer  && formik.errors.answer ? <div className="errors">{formik.errors.answer}</div> : null}
                                    {autherror ?<div className="errors">{autherror}</div>:null}
                            </div>

                            <div className="inputBox">
                                <input type="submit" placeholder="Signup" />
                            </div>

                            <Link to={{ pathname: "/login"}}><p className="sign-up">Already have an account? {" "} Click here</p></Link>
                                
                        </form>
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default Signup
