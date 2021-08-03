import React from "react";
import Navbarheading from './Navbarheading'
import NavbarList from './NavbarList'
import './Navbarcss.css'


function Navbar() {
   return (
    <nav className="navbar-bar">
        <div className="border-rd">
            <Navbarheading />
        </div>
        <div className="Navbar-items">
            <NavbarList items={[{btn:'Home', link:''}, 
                                {btn:'Signin',link: 'login'},
                                {btn:'SignUp',link:"signup"}, 
                                {btn:'Logout',link: ''},
                                {btn:'BecomeAdmin',link: ''},
                                {btn:'profile',link: 'user'},
                                {btn:'add Book',link: 'addbook'},
                                {btn:'Admin',link: 'admin'},
                                ]} />
        </div>        
    </nav>
   )
}

export default Navbar;
