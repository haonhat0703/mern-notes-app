import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
//{}
const EditNote = () => {
  const params = useParams()

  const [note, setNote] = useState({
    title: '',
    content: '',
    date: '',
    id: ''
  })
  const navigate = useNavigate()

  const onChangeInput = e => {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value })
  }

  useEffect(() => {
    const getNote = async () => {
      const { id } = params
      const token = localStorage.getItem('tokenStore')
      if (id) {
        const res = await axios.get(`/api/notes/${id}`, {
          headers: { Authorization: token }
        })
        setNote({
          title: res.data.title,
          content: res.data.content,
          date: new Date(res.data.date).toLocaleDateString(),
          id: res.data._id
        })
      }
    }
    getNote()
  }, [params])


  const editNote = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('tokenStore')
      if (token) {
        const { title, content, date, id } = note
        await axios.put(`/api/notes/${id}`, { title, content, date }, {
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
      <h2>Edit Note</h2>
      <form onSubmit={editNote} autoComplete="off">
        <div className="row">
          <label htmlFor="title">Title</label>
          <input type="text" value={note.title} id="title"
            name="title" required onChange={onChangeInput} />
        </div>

        <div className="row">
          <label htmlFor="content">Content</label>
          <textarea type="text" value={note.content} id="content"
            name="content" required rows="10" onChange={onChangeInput} />
        </div>

        <label htmlFor="date">Date: {note.date} </label>
        <div className="row">
          <input type="date" id="date"
            name="date" onChange={onChangeInput} />
        </div>

        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default EditNote