import React from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import "./MetricCalc.css";
import { setFeet, setInches, convertFeetAndInchesToCm, setLbs, convertLbsToKg } from "../../redux/plannerSlice";
import { useDispatch, useSelector} from "react-redux";

export default function MetricCalc () {
    const dispatch = useDispatch();
    const cm = useSelector((state) => state.planner.convert.cm);
    const lbs = useSelector((state) => state.planner.convert.lbs);
    const kg = useSelector((state) => state.planner.convert.kg);
    return (
        <div className="metricCalc__form-container">
            <Container className="metricCalc__form">
                <Row className="mt-3">
                    <Form onSubmit={(e) => e.preventDefault()}>
                        <Form.Group>
                            <Form.Label>Convert Lbs to Kg</Form.Label>
                            <Form.Control
                            type="number"
                            placeholder="Enter weight"
                            onChange={(e) => dispatch(setLbs(e.target.value))}
                            >
                            </Form.Control>
                            <Button className="mt-2" onClick={() => dispatch(convertLbsToKg())}>Calculate</Button>
                        </Form.Group>
                        <p>Weight in Kilograms: {kg}</p>
                    </Form>
                </Row>

                <Row className="mt-3">
                    <Form onSubmit={(e) => e.preventDefault()}>
                        <Form.Group>
                            <Form.Label>Convert Feet and Inches to Centimeters</Form.Label>
                            <Form.Control
                            className="mt-2"
                            type="number"
                            placeholder="Enter Feet"
                            onChange={(e) => dispatch(setFeet(e.target.value))}>
                            </Form.Control>
                            <Form.Control
                            className="mt-2"
                            type="number"
                            placeholder="Enter Inches"
                            onChange={(e) => dispatch(setInches(e.target.value))}>
                            </Form.Control>
                            <Button 
                                className="mt-2"
                                onClick={(e) => dispatch(convertFeetAndInchesToCm())}
                                    >Calculate</Button>
                            <p>Height in centimeters: {cm}</p>
                        </Form.Group>
                    </Form>
                </Row>
            </Container>
        </div>
    )
}