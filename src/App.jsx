import './App.css'
import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [news, setNews] = useState({
    search: '',
    from: '',
    to: '',
    language: '',
    sortBy: '',
  })

  const [newsList, setNewsList] = useState([])

  const handleChange = (e) => {
    setNews({
      ...news,
      [e.target.name]: e.target.value
    })
    console.log(news)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      console.log(news)
      const respuesta = await axios.get(`https://newsapi.org/v2/everything?q=${news.search}&from=${news.from}&to=${news.to}&language=${news.language}&sortBy=${news.sortBy}&apiKey=${import.meta.env.VITE_APP_API_KEY}`)
      console.log(respuesta)
      setNewsList(respuesta.data.articles)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='container'>
      <h1>NEWS</h1>
      <form onSubmit={handleSubmit}>
        <div className="input">
          <label>Search</label>
          <input type="text" name="search" onChange={handleChange} />
        </div>
        <div className="input">
          <label>From:</label>
          <input type="date" name="from" onChange={handleChange} />
        </div>
        <div className="input">
          <label>To:</label>
          <input type="date" name="to" onChange={handleChange} />
        </div>
        <div className="input">
          <label>Language: </label>
          <select name="language" onChange={handleChange}>
            <option value="en">Select</option>
            <option value="es">Spanish</option>
            <option value="en">English</option>
          </select>
        </div>
        <div className="input">
          <label>Order to:</label>
          <select name="sortBy" onChange={handleChange}>
            <option value="relevancy">Select</option>
            <option value="relevancy">Relevancy</option>
            <option value="popularity">Popularity</option>
            <option value="publishedAt">Published at</option>
          </select>
        </div>
        <button type='submit'>Search</button>
      </form>
      {newsList.length > 0 && newsList.map((item, index) => (
        <div key={index} className="news">
          <div className="image">
            <img src={item.urlToImage} alt={item.title} />
          </div>
          <div className="title">
            <h2>{item.title}</h2>
          </div>
          <div className="description">
            <p>{item.description}</p>
          </div>
          <div className="author">
            <p>Author: {item.author}</p>
            <span>{item.publishedAt}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App