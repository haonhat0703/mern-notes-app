import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CreateNote = () => {

  const [note, setNote] = useState({
    title: '',
    content: '',
    date: ''
  })

  const navigate = useNavigate()

  const onChangeInput = e => {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value })
  }

  const createNote = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('tokenStore')
      if (token) {
        const { title, content, date } = note
        await axios.post('/api/notes', { title, content, date }, {
          headers: { Authorization: token }
        })

        return navigate('/')
      }
    } catch (error) {
      window.location.href = '/'
    }
  }

  return (
    <div className="create-note">
      <h2>Create Note</h2>
      <form autoComplete='off' onSubmit={createNote}>
        <div className="row">
          <label htmlFor="title">Title</label>
          <input type="text" id='title' name='title' required
            value={note.title} onChange={onChangeInput}
          />
        </div>

        <div className="row">
          <label htmlFor="content">Content</label>
          <textarea type="text" id='content' name='content' required
            rows="10" value={note.content} onChange={onChangeInput}
          />
        </div>

        <label htmlFor="date">Date: {note.date}</label>
        <div className="row">
          <input type="date" id='date' name='date' required
            value={note.date} onChange={onChangeInput}
          />
        </div>

        <button type='submit'>Save</button>
      </form>
    </div>
  )
}

export default CreateNote