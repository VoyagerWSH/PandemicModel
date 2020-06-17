import React, {Component} from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label } from 'reactstrap';
import {NavLink} from 'react-router-dom';
import './headerStyle.css';

class Header extends Component{

    constructor(props){
        super(props);
        this.state = {
            isNavOpen: false,
            isModalOpen: false
        };
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleNav(){
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen,
        });
    }


    render(){

        const styleSheet = {
            color: "white"
        }
        return(
            <>
                <Navbar expand="md" className="color">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className="mr-auto" href="/">
                            <h2 style={styleSheet}> Delineio Modeling</h2>
                        </NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar className="ml-auto">
                                <NavItem>
                                    <NavLink className="nav-link" to="/home"style={styleSheet} ><span style={styleSheet} className="fa fa-home fa-lg"></span> Home</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to='/about' style={styleSheet}  ><span style={{color: "white"}} className="fa fa-info fa-lg"></span> About</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to='/team' style={styleSheet}><span style={{color: "white"}} className="fa fa-users fa-lg" ></span> Team</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link"  to='/developmentblog' style={styleSheet}><span style={{color: "white"}} className="fa fa-list fa-lg"></span> Development Blog</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to='/contactus'style={styleSheet} ><span style={{color: "white"}}  className="fa fa-address-card fa-lg"></span> Contact Us</NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>

            </>
        );
    }
}

export default Header;