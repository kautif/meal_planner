import react from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./BasicInfo.css";
import { useSelector, useDispatch} from "react-redux";
import { setSex, setAge, setHeight, setWeight, setActivity, calcIntake } from "../../redux/plannerSlice";

export default function BasicInfo () {
    const dispatch = useDispatch();
    const dailyIntake = useSelector((state) => state.planner.dailyIntake);
    return (
        <div className="basicInfo-container">
        <Form>
            <Container className="basicInfo__form">
                <Row xs={1} className="mt-3">
                    <p><strong>Calculate Daily Caloric Intake</strong></p>
                    <Form.Group controlId="sex">
                        <Form.Check
                            required 
                            inline
                            label="Male"
                            value="Male"
                            type="radio"
                            id="radio1"
                            name="sexRadio"
                            checked={true}
                            onChange={(e) => dispatch(setSex(e.target.value))}
                            />
                            <Form.Check
                            required
                            inline 
                            label="Female"
                            value="Female"
                            type="radio"
                            id="radio2"
                            name="sexRadio"
                            onChange={(e) => dispatch(setSex(e.target.value))}
                            />
                    </Form.Group>
                </Row>
                <Row className="mt-3">
                    <Form.Group>
                        <Form.Label>Age: </Form.Label>
                        <Form.Control 
                            type="number"
                            placeholder="How many years old are you?"
                            required={true}
                            onChange={(e) => dispatch(setAge(e.target.value))}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Weight: </Form.Label>
                        <Form.Control 
                            type="number" 
                            placeholder="Enter your weight in Kilograms"
                            maxLength={3}
                            required={true}
                            onChange={(e) => dispatch(setWeight(e.target.value))} 
                            />
                    </Form.Group>
                </Row>
                <Row  className="mt-3">
                    <Form.Group>
                        <Form.Label>Height: </Form.Label>
                        <Form.Control 
                            type="number" 
                            placeholder="Enter your weight in centimeters"
                            maxLength={3}
                            onChange={(e) => dispatch(setHeight(e.target.value))} />
                    </Form.Group>
                </Row>
                <Row className="mt-3 mb-3">
                    <Form.Group>
                        <Form.Select
                            className="basicInfo__form__select"
                            defaultValue="Physical Activity Level"
                            onChange={(e) => dispatch(setActivity(e.target.value))}
                        >
                            <option default disabled value="Physical Activity Level">Physical Activity level</option>
                            <option value="low">Low</option>
                            <option value="moderate">Moderate</option>
                            <option value="heavy">Heavy</option>
                        </Form.Select>
                    </Form.Group>
                </Row>
                <Row xs={1}>
                    <Form.Group>
                        <Button variant="primary" onClick={() => dispatch(calcIntake())}>Submit</Button>
                    </Form.Group>
                </Row>
                <Row className="mt-3">
                    <p>Daily Caloric Intake</p>
                    <p>{dailyIntake}</p>
                </Row>
            </Container>
        </Form>
        </div>
    )
}