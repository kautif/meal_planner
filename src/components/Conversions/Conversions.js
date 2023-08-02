import React from "react";
import BasicInfo from "../BasicInfo/BasicInfo";
import MetricCalc from "../MetricCalc/MetricCalc";
import Nav from "../Nav/Nav";
import "./Conversions.css";

export default function Conversions () {
    return (
        <div>
            <Nav />
            <div className="nutrition_calc">
                <BasicInfo />
                <MetricCalc />
            </div>
        </div>
    )
}