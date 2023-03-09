import React, { useContext, useState } from 'react'
import AuthContext from '../context/AuthContext'
import { Arrow90degRight } from 'react-bootstrap-icons'
import {useNavigate} from 'react-router-dom'

const LoginPage = () => {
  let {loginUser} = useContext(AuthContext)
  let [close, setClose] = useState(false)
  let [userInput, setUserInput] = useState({username: '', password: ''})
  let [space, setSpace] = useState(false)
  let navigate = useNavigate()

  let onSend = () => {
    setClose(true)
    if (userInput.password !== "") {
      document.documentElement.style.setProperty('--flap-color', '#096800')
    } else {
      document.documentElement.style.setProperty('--flap-color', '#680005')
    }
    
    loginUser(userInput)
    setTimeout(() => {
      if (userInput.password !== "") {
      setSpace(true)
      }
      setClose(false)
      document.documentElement.style.setProperty('--flap-color', '#adb5bd')
    }, 1500);
    setTimeout(() => {
      if (userInput.password !== "") {
        navigate('/')
        }
      }, 3000)    
  }

  return (
    <div className="backgroundLogin">
      <div className='loginPosition'>
          <div className="windowSeat">
          <div className="window "><label class='flap down'></label></div>
            <div className={!space ? "window" : 'windowSpace backgroundGradient noiseWindow backgroundStarsWindow'}>
            {!space ? <div class="clouds"></div> : null }
                <label class='flap' style={close ? {transform: 'translateY(400px)'} : null}></label>
                {!space ? <>
                <div>
                  <div className='cloudSingle'/>
                    <p className="input-container ">
                      <input onChange={e => {setUserInput({...userInput, username: e.target.value})}} autocomplete="name" class="input-field" id="username" name="text" placeholder="Enter your name" type="text"/>
                      <label for="text" className="input-label">Name</label>
                    </p>
                  
                    <p class="input-container">
                      <input onChange={e => {setUserInput({...userInput, password: e.target.value})}} autocomplete="Password" class="input-field" id="password" name="text" placeholder="Enter your Password" type="password"/>
                      <label for="text" className="input-label">Password</label>
                    </p>
                  <div onClick={e => onSend(e)} type='submit' className="shadow__btn"><Arrow90degRight className='hoverButton center' size={30}/></div>
                </div> </> : <div className='Moon'/>}
            </div>
            <div class="window"><label class='flap down'></label></div>
          </div>
      </div>
    </div>
  )
}

export default LoginPage
