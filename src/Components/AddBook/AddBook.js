import React from 'react'
import './AddBook.css'
import { useFormik } from 'formik'
import {db} from '../../firebase'
import { useAuth } from '../../contexts/AuthContext';
import { useHistory } from "react-router-dom";

function AddBook() {
    function uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0, v = c === 'x' ? r : ((r & 0x3) | 0x8);
          return v.toString(16);
        });
      }
    
    const {currentUser} = useAuth()
      const history = useHistory()
      if(currentUser && !currentUser.isActive){
        alert("Please first complete your profile")
        history.push('/user')
    }
    const categories = [{key:"Thriller", value:"Thriller"}, {key:"Westerns", value:"Westerns"}, {key:"Sci-Fi", value:"Sci-Fi"}]
    const formik = useFormik({  
        initialValues:{
            name:'',
            author:'',
            category:"",
            description:"",
            price:"",
            userId:"",
            url:"",
        },

        onSubmit:async values => {
            
            const uuid = uuidv4()
            db.collection("Books").doc(uuid).set({
                id:uuid,
                name:values.name,
                author:values.author,
                category:values.category,
                description:values.description,
                price:values.price,
                userId:currentUser.uid,
                url:values.url, 
                userName:currentUser.firstName
             }, { merge: true })
             .then(() => {
                alert("Book successfully stored!");
                formik.resetForm()
            })
            .catch((error) => {
                alert("Failed to store");
                console.error("Error writing document: ", error);
            });
        },

        validate: values => {
            let errors = {}
            if(!values.name){
                errors.name = "Required"
            }
            if(!values.author){
                errors.author = "Required"
            }

            if(!values.category){
                errors.category = "Required"
            }
            if(!values.description){
                errors.description = "Required"
            }
            if(!values.price){
                errors.price = "Required"
            }
            if(!values.url){
                errors.url = "Required"
            }
            return errors
        }

    })
    return (
        <div className="container addbook">
            <h1>Add New Book</h1>
            <form className="book-form" onSubmit={formik.handleSubmit}>
                <div className="row">
                    <div className="col-lg-6 col-sm-10 inputBox">
                        <span>Categeory</span>
                        <select name="category" onChange={formik.handleChange} value={formik.values.category} onBlur={formik.handleBlur}>
                        {
                            categories.map((category) => {
                                return <option value={category.value} key={category.value}>{category.key}</option>
                            })
                        }
                        </select>
                        {formik.touched.category  && formik.errors.category ? <div className="errors">{formik.errors.category}</div> : null}
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-6 col-sm-10 inputBox">
                        <span>Book Title</span>
                        <input type="text"  name="name" onChange={formik.handleChange} value={formik.values.name} onBlur={formik.handleBlur}/>
                        {formik.touched.name  && formik.errors.name ? <div className="errors">{formik.errors.name}</div> : null}
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-6 col-sm-10 inputBox">
                        <span>Book Author</span>
                        <input type="text"  name="author" onChange={formik.handleChange} value={formik.values.author} onBlur={formik.handleBlur}/>
                        {formik.touched.author  && formik.errors.author ? <div className="errors">{formik.errors.author}</div> : null}
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-6 col-sm-10 inputBox">
                        <span>Book Price</span>
                        <input type="text"  name="price"  onChange={formik.handleChange} value={formik.values.price} onBlur={formik.handleBlur} />
                        {formik.touched.price  && formik.errors.price ? <div className="errors">{formik.errors.price}</div> : null}

                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-6 col-sm-10 inputBox">
                        <span>Book Description</span>
                        <textarea type="textarea" name="description" onChange={formik.handleChange} value={formik.values.description} onBlur={formik.handleBlur} />
                        {formik.touched.description  && formik.errors.description ? <div className="errors">{formik.errors.description}</div> : null}
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-6 col-sm-10 inputBox">
                        <span>Book Image url</span>
                        <input type="text" name="url" onChange={formik.handleChange} value={formik.values.url} onBlur={formik.handleBlur} />
                        {formik.touched.url  && formik.errors.url ? <div className="errors">{formik.errors.url}</div> : null}
                    </div>
                </div>


                {/* <div className="snbtn">
                    
                    <input type="btn" className="btn btn-outline-secondary"  value="reset"/>
                </div> */}
                <input type="submit" className="btn btn-outline-secondary" />
                
            </form>
        </div>
    )
}

export default AddBook
