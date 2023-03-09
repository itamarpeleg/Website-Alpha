import '../App.css';
import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import { v4 as uuid } from 'uuid';

const FirstPage = (change) => {
    let navigate = useNavigate()
    let {authTokens} = useContext(AuthContext)
    let [newArticle, setNewArticle] = useState({title: "", year: "", content: "add some content here", categories: [], uniqueId: uuid()})
    let [inputState, setInputState] = useState("Title")
    let [animate, setAnimate] = useState(false)
    let [InputError, setInputError] = useState(false)
    let [up, setup] = useState(false)
    let [size, setSize] = useState(12)
    let [step, setStep] = useState(0)

    let next = () => {
        if (newArticle.title.length >= 3 && step === 0) {
            setAnimate(true)
            setInputState("Year")
            setTimeout(() => {
                document.getElementById('firstInput').value = ""
                let dynamicWidth = 4 + 4 * 0.5
                document.documentElement.style.setProperty('--length-text', dynamicWidth + 'ch') 
            }, 300);            
            setTimeout(setAnimate, 400, false)
            setup(true)
            setStep(1)

        } else if (newArticle.year.length >= 4 && step === 1) {
            setAnimate(true)
            setTimeout(() => {
                document.getElementById('firstInput').value = ""
                let dynamicWidth = 8 + 8 * 0.5
                document.documentElement.style.setProperty('--length-text', dynamicWidth + 'ch') 
            }, 300);
            setup(true)
            setTimeout(() => {
                setStep(2)
            }, 400);
            setInputState("Category")
        } else if (step === 2) {
            createArticle()
            navigate('app')
        }
        else {
            setup(false)
            setInputError(true)
            setTimeout(() => {
                setInputError(false)
            }, 400);
        }
    }

    let createArticle = async () => {
        fetch(`/api/articles/create/`,{
          method: "POST",
          'headers': {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + String(authTokens.access),
          },
          body:JSON.stringify(newArticle),
    })}

    let changeLength = (e) => {
            let inputTextLength = e.target.value.length === 0 ? inputState.length : e.target.value.length;
            let dynamicWidth = inputTextLength + inputTextLength * 0.5;
            document.documentElement.style.setProperty('--length-text', dynamicWidth + 'ch');
        if (inputState === "Title") {
            setNewArticle({...newArticle, title:e.target.value})
        } else if (inputState === "Year") {
            setNewArticle({...newArticle, year:e.target.value})
        } else {

        }
    }
    
    let styleFirstInput = () => {
        if (InputError) {
            return {
                'accsent-color': 'red !important',
                color: 'red',
                '::placeholder' : 'red',
                animation: 'shake 0.5s',
                'animation-iteration-count': 'infinite',
                '--color-error': 'rgb(153, 26, 26)',
                '--color-under': 'rgb(153, 26, 26)',
            }
        } else if(animate) {
            return{
                color:  "var(--bright-green)",
                transition: "all .3s ease",
                "--color-under": "var(--bright-green)",
                animation: 'fadeOut .3s',
                opacity: '0'
            }
        } else {
            return {
            color: "var(--color-default)",
            transition: null,
            "--color-under": 'dimgrey',
            animation: up ? 'fadeIn .3s' : null,
            opacity:'1',
            }
    }}
    
    let removeTag = (index) => {
        setNewArticle({...newArticle, 'categories':[newArticle.categories.filter((el, i) => i !== index)]})
        let dynamicWidth = inputState.length + inputState.length * 0.5;
        document.documentElement.style.setProperty('--length-text', dynamicWidth + 'ch');
    }
        
    let handleKeyDown = (e) => {
        if (e.key !== 'Enter' && e.key !== 'Tab') return
        let value = e.target.value
        if (!value.trim()) return
        setNewArticle({...newArticle, categories:[...newArticle.categories, value]})
        e.target.value = ''
        let dynamicWidth = inputState.length + inputState.length * 0.5;
        document.documentElement.style.setProperty('--length-text', dynamicWidth + 'ch');
        setSize(14)
    }
    
    return (
      <div className="noise backgroundStars one backgroundGradient">
            <div onClick={next} className='Earth' alt="" ></div>

        <div className='Moon'/>
        <div className='center'>

            {step === 2 ? 
            <div style={{animation: 'fadeIn .3s'}}>
            <div className='tags-input-container'>
                { newArticle.categories?.map((tag, index) => (
                <div className='tag-item' key={index}>
                <span className='text'>{tag}</span>
                <span onClick={() => removeTag(index)} className='close'>&times;</span>
                </div>))}
            </div>
            <div className='middle' style={{transform: newArticle.categories.length === 0 ? "translate(-50%, -50%)" : "translate(-50%, -10%)"}}>
            <input size={size} maxLength={30} onChange={e => changeLength(e)} onKeyDown={handleKeyDown} type="text" placeholder='Category' className="inputFirst" />
            </div>
            </div>
             : 
            
            <input 
            id='firstInput'
            type="text" 
            className='inputFirst'
            maxLength={30} onChange={e => changeLength(e)} 
            placeholder={inputState}
            style={styleFirstInput()}/> 
            }

        </div>
      </div>
    );
}

export default FirstPage
