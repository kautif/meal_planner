import React from "react";
import Nav from "../Nav/Nav";
import { useSelector } from "react-redux";

export default function FoodList () {
    const foods = useSelector(state => state.planner.food);
    console.log("foods: ", foods);
    const meals = foods.map((item) => {
        return (
            <tr>
                <td>{item.desc}</td>
                <td>{item.brand}</td>
                <td>{item.servingSize}{item.servingSizeUnit}</td>
                <td>{item.energy}</td>
                <td>{item.quantity}</td>
            </tr>
        )
    })
    return (
        <div>
            <Nav />
            <h1>Food List</h1>
            <table className="ml-auto mr-auto mt-3">
                    <tr>
                        <th>Food</th>
                        <th>Brand</th>
                        <th>Serving Size</th>
                        <th>Calories</th>
                        <th>Quantity</th>
                        <th>Remove</th>
                    </tr>
                    {meals}
                </table>
        </div>
    )
}