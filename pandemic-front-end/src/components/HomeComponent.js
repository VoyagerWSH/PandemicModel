import React, { Component } from 'react';
import { Media } from 'reactstrap';

class Home extends Component{

    constructor(props) {
        super(props);

        this.state = {
            links: [
                {
                    id: 0,
                    name:'About',
                    image: 'assets/images/about.jpg',
                    description:'Overview of our Covid-19 Modeling project'                        },
                {
                    id: 1,
                    name:'Team',
                    image: 'assets/images/team.jpg',
                    description:'Our team composition and leadership'                        },
                {
                    id: 2,
                    name:'Simulator',
                    image: 'assets/images/simulator.jpg',
                    description:'Use this page to run the simulator we create for Covid-19 Modeling'                        },
                {
                    id: 3,
                    name:'Development Blog',
                    image: 'assets/images/development blog.jpg',
                    description:'The page displaying our process of simulator development and expectation on future update'                        },
                {
                    id: 4,
                    name:'Contact Us',
                    image: 'assets/images/contact us.jpg',
                    description:'Use this page to leave your experience with our Covid-19 modeling simulator'                        }
            ],
        };
    }

    render() {

        const menu = this.state.links.map((link) => {
            let imagStyle = {maxHeight: 128,
                maxWidth: 128};
            return (
                <div key={link.id} className="col-12 mt-5">
                    <Media tag="li">
                        <Media left middle>
                            <Media object src={link.image} style={imagStyle} alt={link.name} />
                        </Media>
                        <Media body className="ml-5">
                            <Media heading>{link.name}</Media>
                            <p>{link.description}</p>
                        </Media>
                    </Media>
                </div>
            );
        });

        return (
            <div className="container">
                <div className="row">
                    <Media list>
                        {menu}
                    </Media>
                </div>
            </div>
        );
    }
}

export default Home;