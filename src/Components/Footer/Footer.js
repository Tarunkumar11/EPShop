import React from 'react'
import './Footer.css'

const linkedin = "";
const twitter = ""
const instagram = ""
const github = ""
function Footer() {
    return (
        <div className="footer">
            <ul>
                <h1>EPShop</h1>
                <p>If you don’t like to read, you haven’t found the right book.</p>
                <div className="icons">
                    <a href={twitter}><i className="fab fa-twitter"></i></a>
                    <a href={github}><i className="fab fa-github"></i></a>
                    <a href={instagram}><i className="fab fa-instagram"></i></a>
                    <a href={linkedin}><i className="fab fa-linkedin-in"></i></a>
                </div>
                <p>© developed by Tarun Saini</p>
            </ul>
        </div>
    )
}

export default Footer