import React, {useState, useEffect, useRef} from 'react';

import Card from '../UI/Card';
import './Search.css';
import {request} from "../../api/request";

const Search = React.memo(({onFilteredIngredients}) => {
  const [searchValue, setSearch] = useState('');
  const inputRef = useRef()

  useEffect(() => {
    const query = searchValue.length === 0 ? '' : `?indexOn="title"&&orderBy="title"&&equalTo="${searchValue}"`
    const timer = setTimeout(() => {
      if(inputRef.current.value === searchValue)
      request({path: `/ingredients.json${query}`})
        .then(ingredientsDB => {
          if(ingredientsDB && Object.keys(ingredientsDB).length) {
            const formatTheIngredients = ([id, {title, amount}]) => ({id, title, amount});
            onFilteredIngredients(Object.entries(ingredientsDB).map(formatTheIngredients));
          }
        })
        .catch(err => console.log(`Something went wrong, couldn't get the ingredients`, err))
    }, 500);
    return () => clearTimeout(timer);
  }, [searchValue, onFilteredIngredients])

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input ref={inputRef} type="text" onChange={(e) => setSearch(e.target.value)} value={searchValue} />
        </div>
      </Card>
    </section>
  );
});

export default Search;
