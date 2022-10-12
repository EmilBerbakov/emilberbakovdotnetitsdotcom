import React from 'react';
import { Helmet } from 'react-helmet';
export const header="Home Base";
const TITLE='Error';

function error(){
        return(
            <>
            <Helmet>
                <title>{TITLE}</title>
            </Helmet>
                <h1>The page you were attempting to navigate to does not exist.</h1>

            </>
        )
            
        
    }

export default error