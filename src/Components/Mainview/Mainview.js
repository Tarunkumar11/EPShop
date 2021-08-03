import React from 'react'
import './Mainview.css'
import AnimatedBg from "react-animated-bg";
import background3 from '../../Images/background3.webp'
import background4 from '../../Images/background4.webp'
import background5 from '../../Images/background5.webp'
import background6 from '../../Images/background6.webp'
import { useAuth } from '../../contexts/AuthContext';
import { useHistory } from "react-router-dom";

function Mainview() {
    const imagesList = [
        `url(${background3})`,
        `url(${background4})`,
        `url(${background5})`,
        `url(${background6})`,
      ]
      const {currentUser} = useAuth()
      const history = useHistory()
      if(currentUser && !currentUser.isActive){
        alert("Please first complete your profile")
        history.push('/user')
      }
    return (
        <AnimatedBg id = "sdfsd" className = "search-bar-section" colors={imagesList} duration={2} delay={1} timingFunction="ease-out">
            <div className="center-view">
                {/* <div className="center-text" >
                    <h2>
                        Classic′ – a book which people praise and don’t read.
                        <span>-Mark Twain</span>
                    </h2>
                </div>     */}
            </div>
        </AnimatedBg>
    )
}

export default Mainview

