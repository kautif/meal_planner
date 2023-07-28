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
    }
}

export const plannerSlice = createSlice({
    name: "planner",
    initialState,
    reducers: {
        setSex: (state, action) => {
            state.sex = action.payload;
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
                    state.intake = (66.47 + (13.75 * state.weight) + (5.003 * state.height) - (6.755 * state.age)) * activityLevel;
                    state.intake = state.intake.toFixed();
                } else {
                    state.intake = (655.1 + (9.563 * state.weight) + (1.850 * state.height) - (4.676 * state.age)) * activityLevel;
                    state.intake = state.intake.toFixed();
                }
            } else {
                alert(`sex: ${state.sex}, weight: ${state.weight}, height: ${state.height}, activity: ${state.activity}`);
            }

            //    For women, BMR = 655.1 + (9.563 x weight in kg) + (1.850 x height in cm) - (4.676 x age in years)
            //    For men, BMR = 66.47 + (13.75 x weight in kg) + (5.003 x height in cm) - (6.755 x age in years)
        },
        setLbs: (state, action) => {
            state.convert.lbs = action.payload;
            console.log("lbs: ", state.convert.lbs);
        },
        convertLbsToKg: (state) => {
            const lbsToKg = state.convert.lbs / 2.205;
            state.convert.kg = lbsToKg.toFixed(2);
        },
        setFeet: (state, action) => {
            state.convert.feet = action.payload
            console.log("setFeet: ", state.convert.feet);
        },
        setInches: (state, action) => {
            state.convert.inches = action.payload;
            console.log("setInches: ", state.convert.inches);
        },
        convertFeetAndInchesToCm: (state, action) => {
            const feetToCm = state.convert.feet * 30.48;
            const inchesToCm = state.convert.inches * 2.54;
            const cmConversion = feetToCm + inchesToCm;
            state.convert.cm = cmConversion.toFixed(2);
            console.log("cm conversion: ", state.convert.cm);
        }
    }
})


export const { setSex, 
                setHeight, 
                setWeight, 
                setActivity, 
                calcIntake,
                setLbs,
                convertLbsToKg, 
                setFeet, 
                setInches, 
                convertFeetAndInchesToCm } = plannerSlice.actions;
export default plannerSlice.reducer;