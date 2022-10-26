import React, { Component } from 'react'
import { Table } from 'react-bootstrap';





 //Todo: figure this whole thing out
 async function validate(jwt) {
    try{
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "jwt":  jwt
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
          };
        const res =  await fetch("api/librarydb/mylibrary",requestOptions)
        let status=res.status;
        if (status==200){
        let result;
        result= await res.text()

        if (result=="2"){
            sessionStorage.clear();
            sessionStorage.setItem("Error","There was an error with your credentials.  Please try again.");
            window.location.replace("/home");
        }
        
        if (result=="3"){
            sessionStorage.clear();
            sessionStorage.setItem("Error","Credentials Expired.  Please log in again.");
            window.location.replace("/home");
        }
        //return result;
        else{
            //props.resultArray=JSON.parse(result);
            //return props;
            sessionStorage.setItem("Library",JSON.parse(result));
        }     
    }
    else{
        console.log(status)
        sessionStorage.clear();
        sessionStorage.setItem("Error","There was an issue with the login process.  Please try again.")
        window.location.replace("/home")
    }

        
    }
    catch{
        sessionStorage.clear();
        sessionStorage.setItem("Error","There was an unforseen error.  Please try again.");
        window.location.replace("/home")
    }

 }


export class Profile extends Component {
    constructor(props){
        super(props);
        this.state={resultArray:[]};
        this.componentDidUpdate=this.componentDidUpdate.bind(this);
        
    }
    componentDidMount() {
         var jwt=sessionStorage.getItem("JWT");
         if (jwt==null||jwt==undefined){
            window.location.replace("/home")
         };
         var result=validate(jwt);
         if (result!==sessionStorage.getItem("Library")){
             sessionStorage.setItem("Library",result)
             window.location.reload();
     }
     }

     componentDidUpdate(){
        var jwt=sessionStorage.getItem("JWT");
        if (jwt==null||jwt==undefined){
            window.location.replace("/home")
         };
        var result=validate(jwt);
        if (result!==sessionStorage.getItem("Library")){
            sessionStorage.setItem("Library",result)
            window.location.reload();
    }
     }
  
  render() {
    var jwt=sessionStorage.getItem("JWT");
    var claims=sessionStorage.getItem("Payload");
    var library=sessionStorage.getItem("Library");
    console.log(claims)
    if (jwt!==null && jwt!==undefined){
    return (
       <>
      <div>Welcome back!</div>
      {library!==null && typeof library!==undefined && <MyLibrary props={library}/>}
      </>
    )
    }
  }
}



function MyLibrary(){
    var library=sessionStorage.getItem("Library");
    //console.log(library)

    let tb_data=library.map((book)=>{
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

