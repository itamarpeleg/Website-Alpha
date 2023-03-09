import React from 'react';

const Categories = ({articles, removeTag, setFocusInput, size, searchCategory, handleKeyDown, match, handleMatch}) => {
  return (
    <div className='tags-input-container'>
        {articles[articles.length - 1]?.categories?.map((tag, index) => 
            <div className='tag-item tag-gap' key={index}>
                <span className='text'>{tag}</span>
                <span onClick={() => {
                    removeTag(index);
                    setTimeout(() => setFocusInput(true), 300);
                }} className='close'>&times;</span>
            </div>)
        }

        <input size={size} onChange={e => searchCategory(e.target.value)} onKeyDown={handleKeyDown} type="text" placeholder='Enter category' className="tags-input" />
        {match?.title == null ? null : <span className='match' onClick={() => {handleMatch((match?.title)); setTimeout(() => setFocusInput(true), 300)}}>{match?.title}</span>}
    </div>
    )}

export default Categories;
