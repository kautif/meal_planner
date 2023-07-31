import React, { useState } from "react";
import { Form, Control, Button } from "react-bootstrap";
import axios from "axios";
import { addFood } from "../../redux/plannerSlice";
import { useSelector, useDispatch } from "react-redux";
import Nav from "../Nav/Nav";

function Nutrition () {
    const [search, setSearch] = useState("");
    let [food, setFood] = useState([]);
    let foodResults;

    const dispatch = useDispatch();
    const foodArr = useSelector(state => state.planner.food);

    // const url = `https://api.api-ninjas.com/v1/nutrition?query=${search}`;
    const url = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${search}&api_key=nx5ZbSvl7zCCZg6XJtn4sjVtwv5HABjQ8aBSBVdu`
    function getNutrition() {
        const options = {
            method: "GET",
            contentType: "application/json"
        }
        axios(url, options)
            .then(response => {
                console.log(response.data.foods);
                setFood(prevFood => {
                    return response.data.foods;
                })
            }).catch(err => {
                console.error("nutrition error: ", err);
            })
    }

    let retrievedFood = food.map((foodItem, i) => {
        if (i < 10) {
            let nutrientValue = "";
            return  <tr>
                        <td>{foodItem.description}</td>
                        <td>{foodItem.brandOwner}</td>
                        <td>{foodItem.servingSize}{foodItem.servingSizeUnit}</td>
                        <td>{
                            foodItem.foodNutrients.map(nutrient => {
                                if (nutrient.nutrientName === "Energy") {
                                    nutrientValue = nutrient.value;
                                    console.log("nutrientValue: ", nutrientValue);
                                    return nutrientValue;
                                }
                            })
                        }</td>
                        <td><input className={`food-quantity-${i}`} type="number" /></td>
                        <td><button
                                onClick={() => {
                                    dispatch(addFood({
                                        desc: foodItem.description, 
                                        brand: foodItem.brandOwner,
                                        servingSize: foodItem.servingSize,
                                        servingSizeUnit: foodItem.servingSizeUnit,
                                        energy: nutrientValue,
                                        quantity: parseInt(document.getElementsByClassName(`food-quantity-${i}`)[0].value)
                                    }))
                                }}

                        >Add Food</button></td>
                    </tr>
        } else {
            return;
        }
    })

    return (
        <div>
            <Nav />
            <Form onSubmit={(e) => {
                    e.preventDefault();
                    getNutrition();
                }}>
                <Form.Control
                    type="text"
                    placeholder="Enter search terms"
                    onChange={(e) => {
                        e.preventDefault();
                        setSearch(e.target.value);
                    }}
                    >
                </Form.Control>
                <Button 
                    className="mt-3"
                    onClick={(e) => {
                        e.preventDefault();
                        getNutrition();
                }}>Search</Button>
            </Form>
            <div>
                <table className="ml-auto mr-auto mt-3">
                    <tr>
                        <th>Food</th>
                        <th>Brand</th>
                        <th>Serving Size</th>
                        <th>Calories</th>
                        <th>Quantity</th>
                        <th>Add</th>
                    </tr>
                    {retrievedFood}
                </table>
            </div>
        </div>
    )
}

export default Nutrition;