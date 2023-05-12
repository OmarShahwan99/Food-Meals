import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import classes from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';
import ReactDOM from 'react-dom';
import { Backdrop } from '../UI/Modal';
import Loading from '../UI/Loading';

const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchMeals = () => {
        setIsLoading(true);
        fetch('https://meals-project-e557d-default-rtdb.firebaseio.com/meals.json')
            .then(res => {
                console.log(res);
                if (!res.ok) {
                    throw new Error('Some thing went wrong!');
                }
                return res.json()
            })
            .then(data => {
                const loadedMeals = [];
                for (const mealKey in data) {
                    loadedMeals.push({
                        id: mealKey,
                        ...data[mealKey]
                    })
                }
                setIsLoading(false);
                setMeals(loadedMeals);
            })
            .catch(error => {
                setIsLoading(false);
                setError(error.message);
            })
        };
    
    useEffect(() => {
        fetchMeals();
    }, []);

    let content = <p>Found no meals</p>;

    if (isLoading) {
        content =
            <>
                {ReactDOM.createPortal(<Backdrop />, document.getElementById('overlays'))}
                {ReactDOM.createPortal(<Loading />, document.getElementById('overlays'))}
            </>
    }

    if (meals.length > 0 && !isLoading) {
        content =
            <Card className={classes['meals-list']}>
                <ul>{meals.map(meal =>
                <MealItem
                    key={meal.id}
                    id={meal.id}
                    name={meal.name}
                    description={meal.description}
                    price={meal.price}
                />)}</ul>
            </Card>
    }

    if (error) {
        content =
            <Card className={classes['meals-list']}>
                <p style={{ textAlign: 'center' }}>{error}</p>
            </Card>
    }

    return content;
}

export default AvailableMeals;