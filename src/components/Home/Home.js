import React from "react";
import Nav from "../Nav/Nav";
import { Link } from "react-router-dom";

export default function Home () {
    return (
        <div>
            <Nav />
            <h1>Meal Planner</h1>
            <p className="w-50 ml-auto mr-auto">I'm calling this application a meal planner, but there are some clarifications I need to make. I am not a nutritionist and as such, this application will not tell you how healthy or unhealthy your meals are. It's more so just to give you a rough calculation of what your expected daily intake is. Basically, if your total caloric intake per day based off the foods you've added is greater than your expected daily caloric intake, assume that you would be overeating. </p>

            <h2>Determine Your Expected Daily Intake</h2>
            <p className="w-50 ml-auto mr-auto">Because each entry of food you add will probably increase your total caloric intake, you will want to go <Link to="/calculations">here</Link> and calculate what your <Link to="/calculations">expected daily intake</Link> is first. </p>

            <h2>Start Adding Food</h2>
            <p className="w-50 ml-auto mr-auto">After you determine what your expected daily caloric intake is, go to the "Add Food" page and start adding food. Keep in mind to keep the value of the current daily intake below the value of the expected daily intake</p>

            <h2>Review Your List of Foods</h2>
            <p>If you want to change something with your list of food, you can can remove items from your list</p>

            <h2>DON'T REFRESH</h2>
            <p className="w-50 ml-auto mr-auto">If you reload the browser at any point in this application, it will forget everything that you entered. It doesn't have a backend. If you added food to a list or calculated your expected daily intake, it will forget all of that. This is just to warn you.</p>
        </div>
    )
}