import React, { useContext, useEffect, useState } from 'react'

import LeftSide from './LeftSide'
import RightSide from './RightSide'
import { chatContext } from '../context/chatContex';

function MainContainer() {
  const { selectedUsers } = useContext(chatContext);
  const [showRightSide, setShowRightSide] = useState(true);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) { // Mobile view threshold
        setShowRightSide(!!selectedUsers);
      } else {
       setShowRightSide(true);
      }
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize); // Listen for resize events

    return () => {
      window.removeEventListener('resize', handleResize); // Cleanup listener
    };
  }, [selectedUsers]);
  return (
 <>
    <div className="container grid sm:grid-cols-12 gap-5 h-screen p-4">
      
    {showRightSide ? (
          <>
            <div className="sm:col-span-4 h-full hidden md:block"> {/* Hide LeftSide in mobile view */}
              <LeftSide />
            </div>
            <div className="sm:col-span-8 h-full">
              <RightSide />
            </div>
          </>
        ) : (
          <div className="sm:col-span-4 h-full">
            <LeftSide />
          </div>
        )}
        
     
      </div>


 </>
  )
}

export default MainContainer