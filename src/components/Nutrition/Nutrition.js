import React, { useState } from "react";
import { Form, Control, Button } from "react-bootstrap";
import axios from "axios";
import env from "react-dotenv";

import { addFood, updateFoodQuantity, updateDailyIntake } from "../../redux/plannerSlice";
import { useSelector, useDispatch } from "react-redux";
import Nav from "../Nav/Nav";
import { Link } from "react-router-dom";
import { current } from "@reduxjs/toolkit";
import "./Nutrition.css"

function Nutrition () {
    const dailyIntake = useSelector(state => state.planner.dailyIntake);
    const currentIntake = useSelector(state => state.planner.currentIntake);
    const currentFoods = useSelector(state => state.planner.food);

    const [search, setSearch] = useState("");
    let [food, setFood] = useState([]);
    let foodResults;

    let foodQuantity = 0;
    let executed = false;
    let descArr = [];
    let brandArr = [];
    let currentFoodIndex = 0;

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
                                    return nutrientValue;
                                }
                            })
                        }</td>
                        <td><input className={`w-50 food-quantity-${i}`} type="number" /></td>
                        <td><button
                                onClick={() => {
                                    executed = false;
                                    console.log("currentFoods onclick: ", currentFoods);
                                    descArr = [];
                                    brandArr = [];
                                    currentFoods.map((currentFood, index) => {
                                        descArr.push(currentFood.desc);
                                        brandArr.push(currentFood.brand);
                                        console.log(descArr);
                                    })

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
                                        executed = true;
                                    } else {
                                        if (descArr.includes(foodItem.description) &&
                                            brandArr.includes(foodItem.brandOwner) &&
                                            executed === false) {
                                                currentFoodIndex = descArr.indexOf(foodItem.description);
                                                document.getElementsByClassName(`food-quantity-${i}`)[0].value <= parseInt("1") ? 
                                                foodQuantity = 1 + currentFoods[currentFoodIndex].quantity : 
                                                foodQuantity = currentFoods[currentFoodIndex].quantity + parseInt(document.getElementsByClassName(`food-quantity-${i}`)[0].value)
                                                dispatch(updateDailyIntake(currentFoods[currentFoodIndex].energy * (parseInt(document.getElementsByClassName(`food-quantity-${i}`)[0].value) || 1)));
                                                dispatch(updateFoodQuantity({
                                                    index: currentFoodIndex,
                                                    quantity: foodQuantity
                                                }))
                                                executed = true;
                                        } else {
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
                                            executed = true;
                                        }

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
                    className="mt-3"
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
            <div className="meal-planner__addfood__table">
            <div>
                <p>Expected Daily Intake: {dailyIntake === 0 ? <span>Go here to calculate your daily intake: <Link to="/calculations">Calculations</Link></span> : dailyIntake}</p>
                <p>Current Daily Intake: <span className={currentIntake <= dailyIntake ? "text-success" : "text-danger"}>{currentIntake}</span></p>
            </div>
                <table className="ml-auto mr-auto mt-3">
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