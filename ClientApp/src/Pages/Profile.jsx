import React, { Component } from 'react'
import { Table } from 'react-bootstrap';

var myHeaders=new Headers();
myHeaders.append("Content-Type","application/json");

var raw=JSON.stringify({
    "jwt":sessionStorage.getItem("JWT")
});

var requestOptions = {
    method:"POST",
    header:myHeaders,
    body:raw,
    redirect:"follow"
};


 //Todo: figure this whole thing out
 async function validate(requestOptions,props) {
    try{
        const res =  await fetch("api/librarydb/mylibrary",requestOptions)
        let result= await res.text()

        if (result=="2"){
            sessionStorage.clear();
            sessionStorage.setItem("Error","There was an error with your credentials.  Please try again.");
            
        }
        //this is where I'm hitting.  Look into this tomorrow.
        else if (result="3"){
            sessionStorage.clear();
            sessionStorage.setItem("Error","Credentials Expired.  Please log in again.");
        }
        //return result;
        switch(result){
            case "2":
            case "3":
            case "0":
                window.location.replace("/home");
                break;
            default:
                //console.log("eee");
                result=res.text();
                props.setItem({resultArray:JSON.parse(result)});
                myLibrary(props);
                //here we will point to the table constructor function
                break;
        };
        
    }
    catch{
        sessionStorage.clear();
        sessionStorage.setItem("Error","There was an unforseen error.  Please try again.");
        window.location.replace("/home")
        //return result;
    }

 }


export class Profile extends Component {
    constructor(props){
        super(props);
        this.state={resultArray:[]};
        this.componentDidMount=this.componentDidMount.bind(this);
        this.componentDidUpdate=this.componentDidUpdate.bind(this);
    }
    componentDidMount() {
         var result=validate(requestOptions,this.state);
     }

     componentDidUpdate(){
        var result=validate(requestOptions,this.state);
     }

  render() {
    return (
      <div>Profile</div>
    )
  }
}

function myLibrary(props){
    let tb_data=props.props.resultArray.map((book)=>{
        return(
            <tr key={book.EDITION_ID}>
                <td>{book.INFO.TITLE}
                    {book.INFO.SUBTITLE!==null && book.INFO.SUBTITLE!==undefined?": "+book.INFO.SUBTITLE: ""}</td>
                <td>{book.INFO.ISBN_13}</td>
                <td>{book.INFO.ISBN_13}</td>
                <td>{book.INFO.ISBN_10}</td>
                <td>{book.INFO.AUTHOR_NAMES}</td>
                <td>{book.INFO.INFO.READ_STATUS}</td>
                <td>{book.INFO.INFO.BOOK_NUM}</td>
            </tr>
        )
    })
    return(
        <div>
            <Table variant='dark' responsive>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>ISBN-13</th>
                        <th>ISBN-10</th>
                        <th>Authors&#40;s&#41;</th>
                        <th>Read Status</th>
                        <th>Number of Copies</th>
                    </tr>
                </thead>
                <tbody>
                    {tb_data}
                </tbody>
            </Table>
        </div>
    )
}

export default Profile

