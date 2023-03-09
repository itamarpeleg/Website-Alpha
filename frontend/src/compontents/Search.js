import { motion } from 'framer-motion';
import React from 'react';
import Categories from './Categories';

const Search = ({setFunc, articles, removeTag, setFocusInput, size, searchCategory, handleKeyDown, match, handleMatch}) => {

  let Change = (e) => {
    setFunc(e.target.value)
  }
  return (
    <motion.div
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    exit={{ scale: 0 }} 
    transition={{duration: 0.1}}
    className='box'
    >
        <h1>Search</h1>

        <input id='title' onChange={(e) => {Change(e)}} placeholder={'Title'} className='searchInput' type="text" />
        <input id='year' onChange={() => {Change()}} placeholder={'Year'} className='searchInput' type="text" />
        <Categories removeTag={removeTag} setFocusInput={setFocusInput} size={size} searchCategory={searchCategory} handleKeyDown={handleKeyDown} match={match} handleMatch={handleMatch} articles={articles}/>
    </motion.div>
  );
}

export default Search;
