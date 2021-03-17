import React, {useState, useEffect} from 'react';

import Card from '../UI/Card';
import './Search.css';
import {request} from "../../api/request";

const Search = React.memo(({onFilteredIngredients}) => {
  const [searchValue, setSearch] = useState('')

  useEffect(() => {
    const query = searchValue.length === 0 ? '' : `?indexOn="title"&&orderBy="title"&&equalTo="${searchValue}"`
    request({path: `/ingredients.json${query}`})
      .then(ingredientsDB => {
        if(ingredientsDB && Object.keys(ingredientsDB).length) {
          const formatTheIngredients = ([id, {title, amount}]) => ({id, title, amount});
          onFilteredIngredients(Object.entries(ingredientsDB).map(formatTheIngredients));
        }
      })
      .catch(err => console.log(`Something went wrong, couldn't get the ingredients`, err))
  }, [searchValue, onFilteredIngredients])

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input type="text" onChange={(e) => setSearch(e.target.value)} value={searchValue} />
        </div>
      </Card>
    </section>
  );
});

export default Search;
