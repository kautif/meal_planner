import React, { useState } from "react";
import { Form, Control, Button } from "react-bootstrap";
import axios from "axios";
import env from "react-dotenv";

import { addFood, updateFoodQuantity, updateDailyIntake } from "../../redux/plannerSlice";
import { useSelector, useDispatch } from "react-redux";
import Nav from "../Nav/Nav";
import { Link } from "react-router-dom";
import { current } from "@reduxjs/toolkit";

function Nutrition () {
    const dailyIntake = useSelector(state => state.planner.dailyIntake);
    const currentIntake = useSelector(state => state.planner.currentIntake);
    const currentFoods = useSelector(state => state.planner.food);

    const [search, setSearch] = useState("");
    let [food, setFood] = useState([]);
    let foodResults;
    let foodQuantity = 0;

    const dispatch = useDispatch();
    const foodArr = useSelector(state => state.planner.food);
    const url = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${search}&api_key=${process.env.REACT_APP_API_KEY}`
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
                        <td><input className={`w-50 food-quantity-${i}`} type="number" /></td>
                        <td><button
                                onClick={() => {
                                    if (currentFoods.length < 1) {
                                        dispatch(addFood({
                                            desc: foodItem.description, 
                                            brand: foodItem.brandOwner,
                                            servingSize: foodItem.servingSize,
                                            servingSizeUnit: foodItem.servingSizeUnit,
                                            energy: nutrientValue,
                                            quantity: document.getElementsByClassName(`food-quantity-${i}`)[0].value <= parseInt("1") ? 
                                            document.getElementsByClassName(`food-quantity-${i}`)[0].value = 1 : 
                                            parseInt(document.getElementsByClassName(`food-quantity-${i}`)[0].value)
                                        }))
                                    } else {
                                        currentFoods.map((currentFood, index) => {
                                            if (currentFood.desc === foodItem.description && currentFood.brand === foodItem.brandOwner) {
                                                document.getElementsByClassName(`food-quantity-${i}`)[0].value <= parseInt("1") ? 
                                            foodQuantity = 1 + currentFood.quantity : 
                                            foodQuantity = currentFood.quantity + parseInt(document.getElementsByClassName(`food-quantity-${i}`)[0].value)
                                                // Con't 7/31/23: make updateDailyIntake reducer. 
                                                    // Take the quantity from the input when adding the food, multiply that by the energy and add that amount on top of the current value of the daily intake
                                                dispatch(updateDailyIntake(currentFood.energy * (parseInt(document.getElementsByClassName(`food-quantity-${i}`)[0].value) || 1)));
                                                dispatch(updateFoodQuantity({
                                                    index: index,
                                                    quantity: foodQuantity
                                                }))
                                            }
                                        })
                                    }
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
            <div className="d-flex">
            <div>
                <p>Expected Daily Intake: {dailyIntake === 0 ? <span>Go here to calculate your daily intake: <Link to="/calculations">Calculations</Link></span> : dailyIntake}</p>
                <p>Current Daily Intake: <span className={currentIntake <= dailyIntake ? "text-success" : "text-danger"}>{currentIntake}</span></p>
            </div>
                <table className="ml-auto mt-3">
                    <tr>
                        <th>Food</th>
                        <th>Brand</th>
                        <th>Serving Size</th>
                        <th>Calories</th>
                        <th>Quantity</th>
                        <th>Add</th>
                    </tr>
                    <tbody>
                        {retrievedFood}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Nutrition;