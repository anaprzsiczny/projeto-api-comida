import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { CategoryFood, Meals } from '../../types/types';

const Foods = () => {

  const [foodCategory, setFoodCategory] = useState<CategoryFood[]>([])

  const [foodCategoryClick, setFoodCategoryClick] = useState<String>("")

  const [foodCard, setFoodCard] = useState<Meals[]>([])

  const [search, setSearch] = useState<String>("")

  useEffect(() => {
    axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
      .then(resposta => setFoodCategory(resposta.data.categories))
  }, [])

  useEffect(() => {
    if(foodCategoryClick !== "") {
      axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${foodCategoryClick}`)
        .then(resposta => setFoodCard(resposta.data.meals))
    }
  }, [foodCategoryClick])

  useEffect(() => {
    axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
      .then(resposta => setFoodCard(resposta.data.meals))
  }, [search])

  return (
    <div className="food-beer-list food-shop">
      <h1>Tipos de pratos</h1>
      <p>
        Selecione uma categoria ou digite a comida (em inglês):
        <input type="text" placeholder="Digite a comida..." onChange={(event) => {
          setSearch(event.target.value)
          setFoodCategoryClick("")
        }} />
      </p>
      <ul>
      {
        foodCategory !== null &&
          foodCategory.map((item: CategoryFood) => (
            <li onClick={() => setFoodCategoryClick(item.strCategory)} key={item.idCategory}>{item.strCategory}</li>
          ))
      }
      </ul>
      <h2>Tipo selecionado: <strong>{foodCategoryClick}</strong></h2>
      
      <div className="food-container">
        {
          foodCard !== null &&
            foodCard.map((item: Meals) => (
              <div className="food-item" key={item.idMeal}>
                    <img src={item.strMealThumb} />
                    <p>{item.strMeal}</p>
              </div>    
            ))
        }
      </div>
    </div>
  );
}

export default Foods;