import { PencilIcon } from '@heroicons/react/solid';
import React, { useState } from 'react'
import Content from './Content';

const Onboarding = () => {
    
    const [showContent, setShowContent] = useState(false);

    const keyPress = (e) => {
        if (e.keyCode === 13) {
            localStorage.setItem('user', e.target.value)
            setShowContent(true);
        }
    }

    

  return (
    <div>
            {showContent ? <Content /> : 
            <>
            <h2 className="text-white text-2xl text-center ">What is your Name?</h2>
            <input onKeyDown={keyPress}  type="text" className="w-1/3 h-20 border-b-2 bg-transparent outline-none text-5xl text-center text-white"/>
            </>
            }          
    </div>
  )
}

export default Onboarding