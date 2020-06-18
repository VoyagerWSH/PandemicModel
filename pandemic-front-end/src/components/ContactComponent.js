import React, {Component} from 'react';
import {Button, Label, Col, Row} from 'reactstrap';
import {Link} from 'react-router-dom';
import dotImage from './dots.PNG'
import {Control, LocalForm, Errors} from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class Contact extends Component {

    constructor(props){
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values){
        console.log("Current State is: "+JSON.stringify(values));
        alert("Current State is: "+JSON.stringify(values));
    }

    render() {
        return(
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h3 style={{marginTop:'1%'}}>Contact Us</h3>
                        <img src={dotImage} class = "DoteImage" ></img>
                    </div>
                </div>

                <div className="row row-content" style={{border: '1px solid #ffffff', width:'70%', padding:'15px', marginBottom:'5%', marginTop:'2%',boxShadow: '5px 10px 20px grey'  }}>
                    
                    <div className="col-12" >
                        <h3>Send us Your Feedback</h3>
                    </div>
                    <div className="col-12 col-md-9" style={{marginLeft:'auto', marginRight:'auto'}}>
                        <LocalForm onSubmit={(values)=>this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Control.text model=".firstname" id="firstname" name="firstname"
                                        placeholder="First Name"
                                        className="form-control"
                                        validators={{
                                            required,minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors className="text-danger" model=".firstname" show="touched" 
                                            messages={{
                                                required: 'Required',
                                                minLength: 'Must be greater than 2 characters',
                                                maxLength: 'Must be 15 charcters or less'
                                            }}
                                    />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Col md={12}>
                                    <Control.text model=".lastname" id="lastname" name="lastname"
                                        placeholder="Last Name"
                                        className="form-control"
                                        validators={{
                                            required,minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors className="text-danger" model=".lastname" show="touched" 
                                            messages={{
                                                required: 'Required',
                                                minLength: 'Must be greater than 2 characters',
                                                maxLength: 'Must be 15 charcters or less'
                                            }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Control.text model=".telnum" id="telnum" name="telnum"
                                        placeholder="Tel. Number"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15), isNumber
                                        }}
                                    />
                                    <Errors className="text-danger" model=".telnum" show="touched" 
                                            messages={{
                                                required: 'Required',
                                                minLength: 'Must be greater than 2 numbers',
                                                maxLength: 'Must be 15 numbers or less',
                                                isNumber: 'Must be a number'
                                            }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Control.text model=".email" id="email" name="email"
                                        placeholder="Email"
                                        className="form-control" 
                                        validators={{
                                            required, validEmail
                                        }}
                                />
                                <Errors className="text-danger" model="." show="touched" 
                                        messages={{
                                            required: 'Required',
                                            validEmail: 'Invalid Email Address'
                                        }}
                                />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size: 6, offset: 0}}>
                                    <div className="form-check">
                                        <Label check>
                                            <Control.checkbox model=".agree" name="agree"
                                                className="form-check-input"
                                                 /> {' '}
                                                <strong>May we contact you?</strong>
                                        </Label>
                                    </div>
                                </Col>
                                <Col md={{size: 4, offset: 2}}>
                                    <Control.select model=".contactType" name="contactType"
                                        className="form-control">
                                        <option>Tel.</option>
                                        <option>Email</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Control.textarea model=".message" id="message" name="message"
                                        placeholder="Your Feedback"
                                        rows="12"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10, offset: 1}}>
                                    <Button type="submit" color="primary">
                                    Send Feedback
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </div>
                </div>
            </div>
        );
    }
}

export default Contact;