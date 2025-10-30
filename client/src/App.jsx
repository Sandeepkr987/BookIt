import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
//pages
import Details from './pages/Details';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import Results from './pages/Results';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/experience/:id' element={<Details/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
        <Route path='/results' element={<Results/>}/>
      </Routes>
    </div>
  )
}

export default App