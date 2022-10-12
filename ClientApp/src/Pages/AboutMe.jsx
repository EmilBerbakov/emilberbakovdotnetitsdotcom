import React from 'react';
import { Helmet } from 'react-helmet';
import portrait from '../imgs/MyPortrait.jpg';
import PageAnimation from './PageAnimation';
const TITLE='About Me';

class AboutMe extends React.Component {
    constructor(props){
        super(props);
        this.state={abimage: new Image().src=portrait}
    }
    render(){
        return(
            <>
            <PageAnimation>
            <Helmet>
                <title>{TITLE}</title>
            </Helmet>
    <div className="card border-0 mb-3 mt-3 col-sm-8">
        <div className="row g-0">
            <div className="col-sm-2">
                <img src={this.state.abimage} className="img-fluid rounded" alt="My handsome mug."/>
            </div>
            <div className="col-sm-10">
                <div className="card-body">
                    <p className="card-text">
                    Hello and welcome to my page! My name is Emil, (pronounced "AY-mull"). I also respond to "Eh-mull", "EE-mull", "Eh-meal", and anything in-between.<br/>
                    Over the past five years, I have held positions in the fields of engineering and information technology. I have a passion for the integration of creativity and functionality: creating things that work well and look better.<br/>
                    I was born and raised in Philadelphia, Pennsylvania. I currently live in Madison, Wisconsin with my wife, Maria, and our two cats, Buzz and Woody. I enjoy drinking coffee, going on long drives, playing video games, making music, and, of course, reading a good book.
                    </p>
                </div>    
            </div>
        </div>
    </div>
    </PageAnimation>
    </>
        )
        }  
        
}


export default AboutMe;