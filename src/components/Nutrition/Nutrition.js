import React, { useState } from "react";
import { Form, Control, Button } from "react-bootstrap";
import axios from "axios";

function Nutrition () {
    const [search, setSearch] = useState("")
    let [food, setFood] = useState([]);
    let foodResults;
    const url = `https://api.api-ninjas.com/v1/nutrition?query=${search}`;

    function getNutrition() {
        const options = {
            method: "GET",
            headers: {
                "X-Api-Key": "ARGN7e35GdiPH5+whyvEdA==8txiKsgsvD8Mfz4m"
            },
            contentType: "application/json"
        }
        axios(url, options)
            .then(response => {
                console.log(response.data);
                setFood(prevFood => {
                    return response.data;
                })
            }).catch(err => {
                console.error("nutrition error: ", err);
            })
    }

    let retrievedFood = food.map((foodItem, i) => {
        return  <tr>
                    <td>{foodItem.name}</td>
                    <td>{foodItem.serving_size_g.toFixed()}g</td>
                    <td>{foodItem.calories}</td>
                    <td><button>Add Food</button></td>
                </tr>
    })

    return (
        <div>
            <Form>
                <Form.Control
                    type="text"
                    placeholder="Enter search terms"
                    onChange={(e) => {
                        e.preventDefault();
                        setSearch(e.target.value);
                    }}
                    >
                </Form.Control>
                <Button onClick={(e) => {
                    e.preventDefault();
                    getNutrition();
                }}>Search</Button>
            </Form>
            <div>
                <table>
                    <tr>
                        <th>Food</th>
                        <th>Serving Size</th>
                        <th>Calories</th>
                        <th>Add</th>
                    </tr>
                    {retrievedFood}
                </table>
            </div>
        </div>
    )
}

export default Nutrition;