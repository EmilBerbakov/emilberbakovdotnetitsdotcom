import React from 'react';
import { Helmet } from 'react-helmet';
import PageAnimation from './PageAnimation';
export const header="Home Base";
const TITLE='Home';
 
function home(){

        return(
            <>
            <Helmet>
                <title>{TITLE}</title>
            </Helmet>
            <PageAnimation>
                <span>Hello, and welcome to my newly revamped web page! <br/>
                What do I mean by revamped?  Well, I decided that I wanted my website to be more "professional" or something, so I'm implementing some full stack principles by using a framework.<br/>
                And what framework am I using?  Well, for those of you that want the actual technical stuff &#40;and even those of you that don't so that you can understand the <i><b>absoultely worth-it</b></i> pun I'm about to make&#41;:
                <ul>
                    <li>Frontend - React.js</li>
                    <li>Backend - C#</li>
                    <li>Framework, in total - ASP.NET CORE</li>
                </ul>
                Got that? Well I hope so, because otherwise this punchline really isn't going to land:
                <br/><br/>
                <h4>Welcome to EmilBerbakov.NET, it's .com!</h4>
                </span>
                </PageAnimation>
            </>
        )
            
        
    }

export default home