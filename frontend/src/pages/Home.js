import React, { useContext, useState, useEffect } from 'react'
import ArticleBlock from '../compontents/ArticleBlock'
import Grid from 'dynamic-react-grid'
import AuthContext from '../context/AuthContext'
import Modal from '../compontents/Modal'
import { v4 as uuid } from 'uuid';
import Search from '../compontents/Search'
import Categories from '../compontents/Categories'
import { motion } from 'framer-motion'
import Categories1 from '../compontents/Categories1'

const Home = () => {
  let [articles, setArticles] = useState([])
  let [focusInput, setFocusInput] = useState(false)
  let [match, setMatch] = useState()
  let [categories, setCategories] = useState([])
  let [size, setSize] = useState(12)
  let [search, setSearch] = useState(false)
  let {logoutUser, authTokens} = useContext(AuthContext)
  let [modal, setModal] = useState({toggle: false, modalIndex: null})
  

  useEffect(() => {
    let getArticles = async () => {
      let response = await fetch('/api/articles/', {
        method:'GET',
        headers: {
          'Content-Type':'application/json',
          'Authorization': 'Bearer ' + String(authTokens.access),
        }
      })
      let data = await response.json()
      if (response.status === 200) {
        let dataState = (data)
        dataState = [...dataState, {title: "", year_created: null, content: "Default content", categories: [], uniqueId: uuid()}]
        setArticles(dataState)
        setCategories(data[0].all_categories)
      } else if (response.statusText === 'Unauthorized') {
        logoutUser()
      }
    }
  getArticles()}, [])
  
  let handleKeyDown = async (e) => {
    if (e.key !== 'Enter' && e.key !== 'Tab') return
    if (articles[articles.length-1].categories.length < 6) {
    let value = e.target.value
    if (!value.trim()) return
    
    let newState = [...articles]
    newState[articles.length-1].categories = [...articles[articles.length-1].categories, value]
    setArticles(newState)


    e.target.value = ''
    setMatch("")
    setSize(14)
    }
  }

  let updateArticle = async () => {
    fetch(`/api/articles/updateArticles/`,{
    method: "PUT",
    'headers': {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + String(authTokens.access),
    },
    body:JSON.stringify(articles),
  })}

  let articleToStart = (article) => {
    let tempArticles = [...articles]
    tempArticles.unshift(articles[article])
    tempArticles.pop()
    return tempArticles
  }

  let removeArticle = async (uniqueId) => {
    fetch(`/api/articles/${uniqueId}/delete/`, {
      method: "DELETE",
      'headers': {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authTokens.access),
      }
    })
  }

  let deleteArticle = (uniqueId) => {
    removeArticle(uniqueId)
    let tempArticles = [...articles]
    let newlist = tempArticles.filter((i) => i.uniqueId !== uniqueId)
    setArticles(newlist)
  }

  let createArticle = () => {
    if (articles[articles.length - 1].title !== "") {
    updateArticle()
    setArticles([...articleToStart(articles.length - 1), {title: "", content: "Default content", year_created: "", categories: [], uniqueId: uuid()}])
    document.getElementById('inputTitle').value = ""
    }
  }

  let removeTag = async (index) => {
    let newState = [...articles]
    newState[articles.length-1].categories = [...articles[articles.length-1].categories.filter((el, i) => i !== index)]
    setArticles(newState)
  }

  let handleMatch = async (title) => {
    let newState = [...articles]
    newState[articles.length-1].categories = [...articles[articles.length-1].categories, match?.title]
    setArticles(newState)
    setMatch("")
  }

  let searchCategory = (text) => {
    setSize(text.length)
    if (text !== "" && text !== " " && text !== null) {
      let matches = categories.filter((category) => {
        let regex = new RegExp(`${text}`, "gi")
        return category.title.match(regex)
      })
    setMatch(matches[0])
    } else {
      setMatch("")
      setSize(14)
    }
  }

  let changeYear = (e) => {
    let newState = [...articles]
    newState[articles.length-1].year_created = e.target.value
    setArticles(newState)
  }

  let changeTitle = (e) => {
    let newState = [...articles]
    newState[articles.length-1].title = e.target.value
    setArticles(newState)
  }

  let toggleModal = (title) => {
    if (title === undefined) {
    setModal({...modal, toggle: !modal.toggle})
    updateArticle()

    let t = [...articles]
    t[0].edited = false
    setArticles(t)
    } else {
      let t = [...articles]
      let index = t.map(function(e) { return e.title }).indexOf(title)
      t.unshift(t[index])
      t.splice(index + 1, 1)
      t[0] = {...t[0], edited: true}
      setArticles(t)
      setModal({toggle: !modal.toggle, modalIndex: 0})
    }
  }

  let setArticlesFunc = (TempArticles, index) => {
    let t = [...TempArticles]
    setArticles(t)
  }

  let setSearchArticlesFunc = (prop) => {
    let filtered = [...articles].filter((i) => (String(i.title)).includes(String(prop)))
    setArticles(filtered)
  }

    // Tags 
    let addCategory = (category) => {
      let newState = [...articles]
      newState[articles.length-1].categories = [...articles[articles.length-1].categories, category]
      setArticles(newState)
    }
  
    let deleteCategory = (category) => {
      let newState = [...articles]
      newState[articles.length-1].categories = [...articles[articles.length-1].categories.filter((el, i) => el !== category)]
      setArticles(newState)
    }

    // * Tags  

  return (
    <div className="noise backgroundStars one backgroundGradient">

    <Modal modalState={modal} setArticleFunc1={setArticlesFunc} articles={articles} article={modal} funcToggle={toggleModal}/>
    <motion.div className='centerGrid' style={modal.toggle ? {opacity: '0.1'} : null}>
      <Grid layout row={true} justify={'flex-start'} className='gap-grid'>
        <div className='div_input'>

        <div style={focusInput ? {'width': '350px'} : null} className='inputBox' onFocusCapture={(e) => {setTimeout(() => setFocusInput(true), 300)}} onBlur={(e) => {setTimeout(() => setFocusInput(false), 300)}}>
          <h1 className=''>New</h1>
          <input autoComplete='off' id="inputTitle" onChange={e => changeTitle(e)} type="text" placeholder={"Title:"}/>
          {focusInput ? 
          <div>
          <input onChange={(e) => (changeYear(e))} defaultValue={articles[articles.length-1].year_created} type="text" placeholder={"Year:"}/>
          <Categories categories={categories} removeTag={removeTag} setFocusInput={setFocusInput} size={size} searchCategory={searchCategory} handleKeyDown={handleKeyDown} match={match} handleMatch={handleMatch} articles={articles}/>
          <Categories1 onDelete={deleteCategory} articles={articles} suggest={categories} onAddition={addCategory} />
        </div> : <div onClick={(e) => {createArticle(e); setTimeout(() => setFocusInput(false), 300)}} className='middle-send-button'><button className='sendButton'><svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3 14a1 1 0 0 1 1-1h12a3 3 0 0 0 3-3V6a1 1 0 1 1 2 0v4a5 5 0 0 1-5 5H4a1 1 0 0 1-1-1z" fill="#0D0D0D"/><path fill-rule="evenodd" clip-rule="evenodd" d="M3.293 14.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 1.414L5.414 14l3.293 3.293a1 1 0 1 1-1.414 1.414l-4-4z" fill="#0D0D0D"/></svg></button></div>}
        </div>

        <div className='buttons'>
          <button onClick={e => (logoutUser())} className='Singlebutton'><svg width="24" height="24" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />  <path d="M7 12h14l-3 -3m0 6l3 -3" /></svg></button>
          <button onClick={() => (setSearch(!search))} className='Singlebutton'><svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" fill="currentColor" className="bi bi-search" viewBox="0 0 17 17"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/></svg></button>
          <button className='Singlebutton'><svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" x="0" y="0" version="1.1" viewBox="0 0 29 29"><path d="M4 10.5h21a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2v-12a2 2 0 012-2zM7 2.5h15a1 1 0 010 2H7a1 1 0 010-2zM5 6.5h19a1 1 0 010 2H5a1 1 0 010-2z"/></svg></button>
          <button className='Singlebutton'><svg width="24" height="24" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="12" cy="7" r="4" />  <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg></button>
        </div>

        </div>

        {search===true ?
        <Search setFunc={setSearchArticlesFunc} articles={articles} categories={categories} removeTag={removeTag} setFocusInput={setFocusInput} size={size} searchCategory={searchCategory} handleKeyDown={handleKeyDown} match={match} handleMatch={handleMatch}/>
         : null}

        {articles.map((article, index) => (
        ( index < (articles.length - 1) ? 
        (<ArticleBlock modalState={modal} funcToggle={toggleModal} functionDelete={deleteArticle} key={index} article={article}/>) : null)
        ))}
        
        
      </Grid>
    </motion.div>
  </div>
  )
}

export default Home

  