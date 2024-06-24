import useHttp from '../hooks/useHttp';
import Error from './Error';
import MealItem from './MealItem';



// we create this obj outside of the component so that it will not be recreated everytime the component is rendered to avoind an infinite loop
//meaning, we are using the same obj in memory 
const requestConfig = {};

const Meals = () => {

  const {data: loadedMeals, isLoading, error } = useHttp('http://localhost:3000/meals', requestConfig, []);


  if (isLoading) {
    return <p className="center">Fetching meals...</p>;
  }


  if (error) {
    return <Error title="Failed to search meals" message={error} />;
  }
  

  return (
    <ul id='meals'>
      {loadedMeals.map((meal) => (
        <MealItem
            key={meal.id}
            meal={meal}
        />
      ))}
    </ul>
  )
}

export default Meals
















// import MealItem from './MealItem.jsx';
// import useHttp from '../hooks/useHttp.js';

// const requestConfig = {};

// export default function Meals() {
//   const {
//     data: loadedMeals,
//     isLoading,
//     error,
//   } = useHttp('http://localhost:3000/meals', requestConfig, []);

//   if (isLoading) {
//     return <p>Fetching meals...</p>;
//   }

//   // if (!data) {
//   //   return <p>No meals found.</p>
//   // }

//   return (
//     <ul id="meals">
//       {loadedMeals.map((meal) => (
//         <MealItem key={meal.id} meal={meal} />
//       ))}
//     </ul>
//   );
// }