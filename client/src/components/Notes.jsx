import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import CreateNote from './notes/CreateNote'
import EditNote from './notes/EditNote'
import Home from './notes/Home'
import NavBar from './notes/NavBar'

const Notes = ({ setIsLogin }) => {
  return (
    <Router>
      <div className="notes-page">
        <NavBar setIsLogin={setIsLogin} />
        <section>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/create' element={<CreateNote />} />
            <Route path='/edit/:id' element={<EditNote />} />
          </Routes>
        </section>
      </div>
    </Router>
  )
}

export default Notes