import { NavDropdown,Form, Button, Dropdown, ToastContainer, Toast } from "react-bootstrap";
import React from "react";


class LoginForm extends React.Component{
handleLogin = async (event)=>{
    //login api post here; in this test example, it's running this as soon as we click on the login to expand
    event.preventDefault();
    const email=document.getElementById('emailentry').value;
    const password=document.getElementById('passwordentry').value;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "email": email,
    "password": password
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    

    try{
      const res= await fetch("api/login/login", requestOptions)
      let result=await res.text()
      if (result=="0"){
        sessionStorage.clear();
        sessionStorage.setItem("Error","There was an error logging in.  Please try again.");
      }
      else if (result=="2"){
        sessionStorage.clear();
        sessionStorage.setItem("Error","Incorrect Email / Password combination.");
      }
      else{
        sessionStorage.clear();
        sessionStorage.setItem("JWT",result);
      }
      window.location.reload();
      //console.log(result);
    }
    catch{
      sessionStorage.clear();
      sessionStorage.setItem("Error","There was an unforseen error.  Please try again.");
      window.location.reload();
    }
}

render(){
return(
<>
<NavDropdown title="Login" >
<Form className="p-2" onSubmit={(event)=>this.handleLogin(event)}>
			<div>
				<Form.Label htmlFor="emailentry">Email</Form.Label>
				<Form.Control type="email" id="emailentry" size="sm" placeholder="email@example.com" required name="emailentry" />
			</div>
			<div>
				<Form.Label htmlFor="passwordentry" className="mt-3">Password</Form.Label>
				<Form.Control type="password" size="sm" id="passwordentry" placeholder="Password" required name="passwordentry" />
			</div>
        <div>
		<Button type="submit" variant="dark" size="sm" className="mt-3">Sign in</Button>
        </div>
		<Dropdown.Divider className="mt-3"/>
		<NavDropdown.Item href="#">Create an account</NavDropdown.Item>
		</Form>
{/*
        {sessionStorage.getItem("userid")!==null & typeof sessionStorage.getItem("userid")!=="undefined" &&  <ToastContainer position='top-center'>
        <Toast>
        <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Bootstrap</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body>Welcome, {sessionStorage.getItem("firstname")}!</Toast.Body>
        </Toast>
    </ToastContainer>}
*/}
</NavDropdown>

</>
)
}
}




export default LoginForm;