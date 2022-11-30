import { Button, Container, Form, FormLabel } from "react-bootstrap";
import PageAnimation from "./PageAnimation";
import { Helmet } from "react-helmet"; 

export default function RegisterForm(){
    return(
        <>
        <Helmet>
            <title>Register</title>
        </Helmet>
        <PageAnimation>
            <h4><center>Create an Account</center></h4>
            <Container>
                <Form id="register" onSubmit={handleSubmit}>
                    <FormLabel for="firstname">First Name</FormLabel>
                    <Form.Control type="text" id="firstname" required />
                    <FormLabel for="lastname">Last Name</FormLabel>
                    <Form.Control type="text" id="lastname" required />
                    <FormLabel for="email">Email</FormLabel>
                    <Form.Control type="email" id="email" required />
                    <FormLabel for="password">Password</FormLabel>
                    <Form.Control type="password" id="password" required />
                    <Button type="submit" variant="dark">Register</Button>
                </Form>
            </Container>
        </PageAnimation>
        </>
    )
}

const handleSubmit = async(e)=>{
    e.preventDefault();
    const firstname=document.getElementById("firstname").value;
    const lastname=document.getElementById("lastname").value;
    const email=document.getElementById("email").value;
    const password=document.getElementById("password").value;    
    var myHeaders = new Headers();
    myHeaders.append("Content-Type","application/json")

    var raw=JSON.stringify({
        email: email,
        firstName: firstname,
        lastName: lastname,
        password: password,
    });

    var requestOptions ={
        method: "POST",
        headers: myHeaders,
        body:raw,
        redirect:"follow",
    };

    const res = await fetch("api/login/register",requestOptions);
    if (res.ok){
        // if 1, account was created successfully
        // if 2, account was already created
        //if 0, something went wrong
    }

}