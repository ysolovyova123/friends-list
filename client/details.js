import React from 'react';
import ReactDOM from 'react-dom';


const Details = (props) => {
  const {name, ranking, id, deleteUser, updateRanking} = props
  //const {id, rating, name, destroy, updateRating} = props
  return (
      <div>
          <li>{name}</li>
          <li>ranking: {ranking}</li>
          <button onClick={() => updateRanking(id, ranking+1)}>+</button>
          <button onClick={() => updateRanking(id, ranking-1)}>-</button>
          <button onClick={() => deleteUser(id)}>x</button>
      </div>
  )
}

export default Details
