import React, { useState } from 'react';
import {Resizable} from 'react-resizable'
import { X } from 'react-bootstrap-icons';
import { motion, AnimatePresence } from 'framer-motion'


const Modal = ({modalState, funcToggle, article, articles, setArticleFunc1}) => {
  let [width, setWidth] = useState(500)
  let [height, setHeight] = useState(300)
  let [focusInput, setFocusInput] = useState(false)

  let buttonHandler = () => {
      funcToggle()
  }

  if(article.toggle) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  let changeTitle = (e) => {
    articles[article.modalIndex].title = e.target.value
    setArticleFunc1(articles, article)
  }

  let changeContent = (e) => {
    articles[article.modalIndex].content = e.target.value
    setArticleFunc1(articles, article)
  }



  return (
    <>
    {modalState.toggle &&
      <div className="modal">
        <div onClick={buttonHandler} className="overlay"></div>
            <Resizable style={{ width: width, height: height }} className='modal-content' width={width} height={height}
              onResize={(e, data) => {setHeight(data.size.height); setWidth(data.size.width)}}>
                  <motion.div transition={{duration: 0.2}} className='flexModal' layout={true} layoutId={articles[article.modalIndex].uniqueId}>
                    {!focusInput ? <motion.input className='modal-input' onChange={e => changeTitle(e)} defaultValue={articles[article.modalIndex].title}/> : null}
                    <motion.textarea onBlur={() => {setFocusInput(false)}} onFocus={() => { setFocusInput(true) }} className='modal-input-content' onChange={e => changeContent(e)} defaultValue={articles[article.modalIndex].content}/>
                    {!focusInput ? <X className='close-modal' size={50} onClick={buttonHandler}/> : null}
                  </motion.div>
            </Resizable>
      </div>
    }
    </>
  );
}

export default Modal;
