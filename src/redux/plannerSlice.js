import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sex: "male",
    age: 0,
    height: 0,
    weight: 0,
    activity: "",
    intake: 0,
    convert: {
        feet: 0,
        inches: 0,
        lbs: 0,
        cm: 0,
        kg: 0
    },
    food: [],
    currentIntake: 0,
    dailyIntake: 0
}

export const plannerSlice = createSlice({
    name: "planner",
    initialState,
    reducers: {
        setSex: (state, action) => {
            state.sex = action.payload;
        },
        setAge: (state, action) => {
            state.age = action.payload;
        },
        setHeight: (state, action) => {
            state.height = action.payload;
        },
        setWeight: (state, action) => {
            state.weight = action.payload;
        },
        setActivity: (state, action) => {
            state.activity = action.payload;
        },
        calcIntake: (state, action) => {
            let activityLevel = 0;
            let valuesFilled = false;

            if (state.sex === "" || 
                (state.height === 0 || state.height === "")  || 
                (state.weight === 0 || state.weight === "") ||
                (state.activity === "")) {
                valuesFilled = false;
            } else {
                valuesFilled = true;
            }

            if (valuesFilled === true) {
                if (state.activity.toLowerCase() === "low") {
                    activityLevel = 1.2;
                } else if (state.activity.toLowerCase() === "moderate") {
                    activityLevel = 1.3;
                } else if (state.activity.toLowerCase() === "heavy"){
                    activityLevel = 1.4;
                }
    
    
                if (state.sex.toLowerCase() === "male") {
                    state.dailyIntake = (66.47 + (13.75 * state.weight) + (5.003 * state.height) - (6.755 * state.age)) * activityLevel;
                    state.dailyIntake = state.dailyIntake.toFixed();
                } else {
                    state.dailyIntake = (655.1 + (9.563 * state.weight) + (1.850 * state.height) - (4.676 * state.age)) * activityLevel;
                    state.dailyIntake = state.dailyIntake.toFixed();
                }
            } else {
                alert(`sex: ${state.sex}, weight: ${state.weight}, height: ${state.height}, activity: ${state.activity}`);
            }

            //    For women, BMR = 655.1 + (9.563 x weight in kg) + (1.850 x height in cm) - (4.676 x age in years)
            //    For men, BMR = 66.47 + (13.75 x weight in kg) + (5.003 x height in cm) - (6.755 x age in years)
        },
        setLbs: (state, action) => {
            state.convert.lbs = action.payload;
        },
        convertLbsToKg: (state) => {
            const lbsToKg = state.convert.lbs / 2.205;
            state.convert.kg = lbsToKg.toFixed(2);
        },
        setFeet: (state, action) => {
            state.convert.feet = action.payload
        },
        setInches: (state, action) => {
            state.convert.inches = action.payload;
        },
        convertFeetAndInchesToCm: (state, action) => {
            const feetToCm = state.convert.feet * 30.48;
            const inchesToCm = state.convert.inches * 2.54;
            const cmConversion = feetToCm + inchesToCm;
            state.convert.cm = cmConversion.toFixed(2);
        },
        addFood: (state, action) => {
            state.food = [...state.food, action.payload];
            state.currentIntake += action.payload.energy * action.payload.quantity;
        },
        updateFoodQuantity: (state, action) => {
            state.food[action.payload.index].quantity = action.payload.quantity;
        },
        updateDailyIntake: (state, action) => {
            state.currentIntake += action.payload;
        },
        removeFood: (state, action) => {
            state.currentIntake -= state.food[action.payload].energy * state.food[action.payload].quantity;
            state.food.splice(action.payload, 1);
        }
    }
})


export const { setSex,
                setAge, 
                setHeight, 
                setWeight, 
                setActivity, 
                calcIntake,
                setLbs,
                convertLbsToKg, 
                setFeet, 
                setInches, 
                convertFeetAndInchesToCm,
                addFood,
                updateFoodQuantity,
                updateDailyIntake,
                removeFood
            } = plannerSlice.actions;
export default plannerSlice.reducer;