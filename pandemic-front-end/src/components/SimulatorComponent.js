import React from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, Media } from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderLeader({leader}){
    return(

        <div key={leader.id} className="col-12 mt-5">
            <Media tag="li">
                <Media left middle>
                    <Media object src={leader.image} alt={leader.name} />
                </Media>
                <Media body className="ml-5">
                    <Media heading>{leader.name}</Media>
                    <p>{leader.designation}</p>
                    <p>{leader.description}</p>
                </Media>
            </Media>
        </div>
    );
}

function Simulator(props) {

    const leaders = props.leaders.map((leader) => {
        return (
            <div key={leader.id} className="col-12 m-1">
                <RenderLeader leader={leader} />
            </div>
        );
    });

    return(
        <div className="container">
        </div>
    );
}

export default Simulator;