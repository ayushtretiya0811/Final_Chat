import React from 'react'

import LeftSide from './LeftSide'
import RightSide from './RightSide'

function MainContainer() {
  return (
 <>
<div className="container grid sm:grid-cols-12 gap-5  h-screen  p-4 ">
<div className="sm:col-span-4  h-full  ">

<LeftSide/>
</div>
<div className="sm:col-span-8  h-full    ">

<RightSide/>
</div> 
</div>


 </>
  )
}

export default MainContainer