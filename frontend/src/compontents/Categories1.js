import { WithContext as ReactTags } from 'react-tag-input';
import React, {useState} from 'react';

const Categories1 = (suggest, articles, onDelete, onAddition) => {

  let [tags, setTags] = useState([])
  let [suggestions, setSuggestions] = useState([])

  let delimiters = [188, 13]

  let onDeleteFunc = (index) => {
    onDelete(index)
  }

  const handleDelete = i => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = tag => {
    setTags([...tags, tag]); 
  };

  let onAdditionFunc = (newCategory) => {
    onAddition(newCategory)
  }

  return (
    <ReactTags autocomplete allowDragDrop={false} suggestions={suggestions} delimiters={delimiters} tags={tags} handleDelete={handleDelete} handleAddition={handleAddition}/>
  );
}

export default Categories1;
