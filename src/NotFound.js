///// 16
//// Next go App.js

import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className='page-not-found'>
        <h1>404 not found the page</h1>
        <h2><Link to="/portal/course">Back to HomePage</Link></h2>
        <img src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"/>
    </div>
  )
}
