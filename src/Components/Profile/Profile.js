import React, {useState, useEffect} from 'react'
import './Profile.css';
import { useFormik } from 'formik'
import { useAuth } from '../../contexts/AuthContext';
import {db} from '../../firebase'


function Profile() {
    const {currentUser} = useAuth()
    const cities = [{key:"Gujrat", value:"Gujrat"}, {key:"hyderabad", value:"hyderabad"}, {key:"Delhi", value:"Delhi"}]
    const states = [{key: "Uttar Pradesh", value: "Uttar Pradesh"}, {key:"telangana", value:"telangana"}]
    const countries = [{key:"india", value:"india"}, {key:"Norway", value:"Norway"}]
    const [loading ,setLoading] =  useState(true)
    const formik = useFormik({  
        initialValues:{
            firstName:'',
            lastName:'',
            addressOne:"",
            addressTwo:"",
            city:"",
            state:"",
            country:"",
            postalCode:"",
            mobileNo:"",
            homePhone:"",
            officeNo:""
        },
        onSubmit:async values => {
            
            db.collection("users").doc(currentUser.uid).set({
                firstName:values.firstName,
                lastName:values.lastName,
                addressOne:values.addressOne,
                addressTwo:values.addressTwo,
                city:values.city,
                state:values.state,
                country:values.state,
                postalCode:values.postalCode,
                mobileNo:values.mobileNo,
                homePhone:values.homePhone,
                officeNo:values.officeNo,
                isActive:true
             }, { merge: true })
             .then(() => {
                alert("Data successfully stored!");

            })
            .catch((error) => {
                alert("Failed to save");
                console.error("Error writing document: ", error);
            });
        },

        validate: values => {
            let errors = {}
            if(!values.firstName){
                errors.email = "Required"
            }
            if(!values.lastName){
                errors.lastName = "Required"
            }

            if(!values.addressOne){
                errors.addressOne = "Required"
            }
            if(!values.city){
                errors.city = "Required"
            }
            if(!values.state){
                errors.state = "Required"
            }
            if(!values.country){
                errors.country = "Required"
            }
            if(!values.postalCode){
                errors.postalCode = "Required"
            }
            if(!values.homePhone){
                errors.homePhone = "Required"
            }            
            return errors
        }

    })

    useEffect(() => {
            db.collection('users').doc(currentUser.uid).get().then(querySnapshot => {
            const preInfo = querySnapshot.data()
            formik.values.firstName = preInfo.firstName
            formik.touched.firstName = true
            formik.values.lastName = preInfo.lastName
            formik.touched.lastName  = true
            formik.values.addressOne = preInfo.addressOne
            formik.touched.addressOne  = true
            formik.values.addressTwo = preInfo.addressTwo
            formik.touched.addressTwo  = true
            formik.values.city = preInfo.city
            formik.touched.city  = true
            formik.values.state = preInfo.state
            formik.touched.state  = true
            formik.values.country = preInfo.country
            formik.touched.country  = true
            formik.values.postalCode = preInfo.postalCode
            formik.touched.postalCode  = true
            formik.values.mobileNo = preInfo.mobileNo
            formik.touched.homePhone  = true
            formik.values.officeNo = preInfo.officeNo
            formik.touched.officeNo  = true
            setLoading(false)
            })

        }, [])



//     useEffect(() => {

//         db.collection('users').doc(user.uid).get().then(querySnapshot => {
//             const newUser = {...querySnapshot.data(), email:user.email}
//             setCurrentUser(newUser)
//             setLoading(false)


//         const firestore = db.collection("users").doc(currentUser.uid)
//         async function f1() {
//             let snapshot =  await firestore.get();
//             let data = {...snapshot.data()}
//             return data
//         }
//         f1().then((data) =>{setInitialValues(data); formik.values = data})
        
        
// }, [])


    console.log(formik.values)
    
  return ( !loading &&
    <div className="user-profile">
      <div className="form">
        <h2>Personal details</h2>
        <form className="container user-input"  onSubmit={formik.handleSubmit}>
            <div className="row">
                <div className="col-lg-6 col-sm-12 inputBox">
                    <span>Frist Name</span>
                    <input type="text"  name="firstName" onChange={formik.handleChange} value={formik.values.firstName} onBlur={formik.handleBlur}/>
                    {formik.touched.firstName  && formik.errors.firstName ? <div className="errors">{formik.errors.firstName}</div> : null}
                </div>
                
                <div className="col-lg-6 col-sm-12 inputBox">
                    <span>Last Name</span>
                    <input type="text"  name="lastName" onChange={formik.handleChange} value={formik.values.lastName} onBlur={formik.handleBlur} />
                    {formik.touched.lastName  && formik.errors.lastName ? <div className="errors">{formik.errors.lastName}</div> : null}
                </div>
            </div>

            <div className="row">
                <div className="col-lg-6 col-sm-12 inputBox">
                    <span>Address One</span>
                    <textarea type="textarea" name="addressOne" onChange={formik.handleChange} value={formik.values.addressOne} onBlur={formik.handleBlur} />
                    {formik.touched.addressOne  && formik.errors.addressOne ? <div className="errors">{formik.errors.addressOne}</div> : null}
                </div>

                <div className="col-lg-6 col-sm-12  inputBox">
                    <span>Address Two</span>
                    <textarea type="textarea" name="addressTwo" onChange={formik.handleChange} value={formik.values.addressTwo} onBlur={formik.handleBlur} />
                    
                </div>
            </div>
            
            <div className="row">
                <div className="col-lg-6 col-sm-12 inputBox">
                    <span>City</span>
                    <select name='city' onChange={formik.handleChange} value={formik.values.city} onBlur={formik.handleBlur} >
                    {
                        cities.map((city) => {
                            return <option value={city.value} key={city.value}>{city.key}</option>
                        })
                    }
                    </select>
                    {formik.touched.city  && formik.errors.city ? <div className="errors">{formik.errors.city}</div> : null}
                </div>

                <div className="col-lg-6 col-sm-12 inputBox">
                    <span>If other city</span>
                    <input type="text" placeholder="city" name='city' onChange={formik.handleChange} value={formik.values.city} onBlur={formik.handleBlur} />
                    {formik.touched.city  && formik.errors.city ? <div className="errors">{formik.errors.city}</div> : null}
                </div>

            </div>

            <div className="row">
                <div className="col-lg-6 col-sm-12 inputBox">
                    <span>State</span>
                    <select name='state' onChange={formik.handleChange} value={formik.values.state} onBlur={formik.handleBlur}>
                    {
                        states.map((state) => {
                            return <option value={state.value} key={state.value}>{state.key}</option>
                        })
                    }
                        
                    </select>
                    {formik.touched.state  && formik.errors.state ? <div className="errors">{formik.errors.state}</div> : null}
                </div>
                <div className="col-lg-6 col-sm-12 inputBox" >
                    <span>If ohter State</span>
                    <input type="text" placeholder="city" name='state' onChange={formik.handleChange} value={formik.values.state} onBlur={formik.handleBlur}/>
                    {formik.touched.state  && formik.errors.state ? <div className="errors">{formik.errors.state}</div> : null}
                </div>
            </div>
            

            
            <div className="row">
                <div className="col-lg-6 col-sm-12 inputBox">
                <span>Country</span>
                
                <select name='country' onChange={formik.handleChange} value={formik.values.country} onBlur={formik.handleBlur}> 
                    {
                        countries.map((country) => {
                                return <option value={country.value} key={country.value}>{country.key}</option>
                            })
                    }
                </select>
                {formik.touched.country  && formik.errors.country ? <div className="errors">{formik.errors.country}</div> : null}
                </div>
                <div className="col-lg-6 col-sm-12 inputBox">
                    <span>If other Countery</span>
                    <input type="text" placeholder="city" name='country' onChange={formik.handleChange} value={formik.values.country} onBlur={formik.handleBlur} />
                    {formik.touched.country  && formik.errors.country ? <div className="errors">{formik.errors.country}</div> : null}
                </div>
            </div>


            <div className="row">
                <div className="col-lg-6 col-sm-12 inputBox">
                        <span>Postal Code</span>
                        <input type="text"  name="postalCode" onChange={formik.handleChange} value={formik.values.postalCode} onBlur={formik.handleBlur} />
                        {formik.touched.postalCode  && formik.errors.postalCode ? <div className="errors">{formik.errors.postalCode}</div> : null}
                </div>
                <div className="col-lg-6 col-sm-12 inputBox">
                        <span>Mobile no</span>
                        <input type="text"  name="mobileNo" onChange={formik.handleChange} value={formik.values.mobileNo} onBlur={formik.handleBlur} />
                        
                </div>
            </div>
            

            <div className="row">
                <div className="col-lg-6 col-sm-12  inputBox">
                    <span>Office No</span>
                    <input type="text"  name="officeNo" onChange={formik.handleChange} value={formik.values.officeNo} onBlur={formik.handleBlur}  />
                    {formik.touched.officeNo  && formik.errors.officeNo ? <div className="errors">{formik.errors.officeNo}</div> : null}
                </div>
                <div className="col-lg-6 col-sm-12 inputBox">
                        <span>Home Phone</span>
                        <input type="text"  name="homePhone" onChange={formik.handleChange} value={formik.values.homePhone} onBlur={formik.handleBlur} />
                        {formik.touched.homePhone  && formik.errors.homePhone ? <div className="errors">{formik.errors.homePhone}</div> : null}
                        
                </div>
            </div>
            
            <input type="submit" className="btn btn-outline-secondary" />
        </form>
      </div>
    </div>
  );
}

export default Profile
