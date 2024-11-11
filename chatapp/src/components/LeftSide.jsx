
import React from 'react'
import LeftTop from './parts/LeftTop'

import LeftBottom from './parts/LeftBottom'

function LeftSide() {
  return (
   <>
 
<div className=" leftmain flex flex-col h-full   gap-5" >
<div className="left-top ">

    <LeftTop/>
</div>
<div className="left-bot flex-grow rounded-2xl  bg-slate-300 ">

  
     <LeftBottom/>
</div>

  
</div>
   

    
 
   
   </>
  )
}

export default LeftSide