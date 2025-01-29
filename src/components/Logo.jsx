import React from 'react'
import bloggingImage from '../assets/blogging.png'

function Logo({width = '100%', className = ''}) {
  return (
    <div>
      <img src={bloggingImage} alt="logo" width={width} className={className} />
    </div>
  )
}

export default Logo