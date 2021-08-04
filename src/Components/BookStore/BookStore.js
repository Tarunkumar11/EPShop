import React, {useState, useEffect, createRef} from 'react'
import './BookStore.css'
import Book from '../Book/Book'
import { useFormik } from 'formik'
import {db} from '../../firebase'

function BookStore() {
    const [bookstore, setBookStore] = useState(null)
    const [filteedBook, setFilteedBook] = useState(null)
    // const newfilter = createRef()
    const formik   = useFormik({
        initialValues: {
            category:""
        }
    }) 
    const categories = [{key:"Thriller", value:"Thriller"}, {key:"Westerns", value:"Westerns"}, {key:"Sci-Fi", value:"Sci-Fi"}]
    useEffect(() => {
        db.collection('Books').get().then(querySnapshot => {
        const documents = querySnapshot.docs.map(doc => doc.data())
            setBookStore(documents)
            setFilteedBook(documents)
        })
    }, [])

    function handlefilter () {
        let newfilteedBook = []
        
        if(bookstore){
            bookstore.forEach(book => {
                if(!formik.values.category){
                    newfilteedBook.push(book)
                }
                else if(book.category === formik.values.category){
                    newfilteedBook.push(book)
                }
            });
            setFilteedBook(newfilteedBook)
        }

    
    }

    return (
        filteedBook && <div className='feedback-section'>
            <div className="movie-type">   
                <h2>Epam BookStore</h2>
            </div>

            <div className="filter">
                <h2>Choose Categeory</h2>
                <select name="category" onClick = {handlefilter} onChange={formik.handleChange} value={formik.values.category} onBlur={formik.handleBlur}>
                    {
                        categories.map((category) => {
                            return <option value={category.value} key={category.value}>{category.key}</option>
                        })
                    }
                </select>
            </div>

            <div className="feedback-content" >
                <div className="feedback">
                    {
                        filteedBook.map((book) => {
                            console.log(book)
                            return  <Book key={book.id} data={book} />
                        })    
                    }
                </div>
            </div>
        </div>
    )
}

export default BookStore
