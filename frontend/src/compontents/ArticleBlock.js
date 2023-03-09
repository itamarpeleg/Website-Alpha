import React, {useState} from 'react'
import {motion, AnimatePresence} from 'framer-motion'

const ArticleBlock = ({modalState, article, functionDelete, index, funcToggle}) => {
  let [hover, setHover] = useState(false)

  let buttonHandler = (e) => {
    e.stopPropagation();
    functionDelete(article.uniqueId)
  }

  let toggleHandler = () => {
    funcToggle(article.title)
  }

  let contentAlign = () => {
  if (article.content.length >= 62) {
    return article.content.slice(0, 60) + "..."
  } else {
    return article.content
  }}

  let titleAlign = () => {
    if (article.title.length >= 16) {
      return article.title.slice(0, 15) + "..."
    } else {
      return article.title
    }}

  return (
  <motion.div
  whileTap={{ scale: 0.98 }}
  layout={true}
  layoutId={article.uniqueId}
  transition={{duration: .2}}
  onClick={toggleHandler}
  className='box sizeup'
  onMouseOver={() => setHover(true)} 
  onMouseLeave={() => setHover(false)}
  >
          <div className='addDelete'>
            <h2>{titleAlign()}</h2>
            <h2 style={{opacity: hover ? '1' : '0'}} onClick={(e) => buttonHandler(e)} className='deleteButton'>✖</h2>
          </div>
    <motion.div>
      <motion.p>{article?.year_created}</motion.p>
      <motion.p>{article?.categories.map((category, index1) => ((category.title == null ? category : category.title) + " "))}</motion.p>
      <motion.p className='contentWrap'>{contentAlign()}</motion.p>
    </motion.div>
  </motion.div>
  )
}

export default ArticleBlock
