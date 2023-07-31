import React from "react";
import Nav from "../Nav/Nav";
import { useSelector, useDispatch } from "react-redux";
import { removeFood } from "../../redux/plannerSlice";
import { Button } from "react-bootstrap";

export default function FoodList () {
    const foods = useSelector(state => state.planner.food);
    const dailyIntake = useSelector(state => state.planner.dailyIntake);
    const currentIntake = useSelector(state => state.planner.currentIntake);
    const dispatch = useDispatch();
    console.log("foods: ", foods);
    const meals = foods.map((item, i) => {
        return (
            <tr key={i}>
                <td>{item.desc}</td>
                <td>{item.brand}</td>
                <td>{item.servingSize}{item.servingSizeUnit}</td>
                <td>{item.energy}</td>
                <td>{item.quantity}</td>
                <td><Button
                    onClick={() => {
                        dispatch(removeFood(i));
                    }}
                >Remove</Button></td>
            </tr>
        )
    })
    return (
        <div>
            <Nav />
            <h1>Food List</h1>
            <div className="d-flex">
                <div>
                    <p>Expected Daily Intake: {dailyIntake}</p>
                    <p>Current Daily Intake: <span className={currentIntake <= dailyIntake ? "text-success" : "text-danger"}>{currentIntake}</span></p>
                </div>
                <table className="ml-auto mt-3">
                        <tr>
                            <th>Food</th>
                            <th>Brand</th>
                            <th>Serving Size</th>
                            <th>Calories</th>
                            <th>Quantity</th>
                            <th>Remove</th>
                        </tr>
                        <tbody>
                            {meals}
                        </tbody>
                    </table>
            </div>
        </div>
    )
}