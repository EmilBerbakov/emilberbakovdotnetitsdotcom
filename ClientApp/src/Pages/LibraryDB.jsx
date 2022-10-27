import React,{useState} from 'react';
import { Button,Collapse,Table,Form,Dropdown,DropdownButton,Row,Col} from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import PageAnimation from './PageAnimation';
import { OwnershipDropDown,ReadDropDown } from '../pagecomponents/LibraryEditButtons';
const TITLE='Library Database';

class LibraryDB extends React.Component{
    constructor(props){
        super(props);
        this.state={resultArray:[],max:true};
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    handleSubmit = async (event) =>{
        this.setState({
            max:false
        })
        const searchtype=document.getElementById('searchform').getAttribute('name');
        const searchvalue=document.getElementById('searchform').value;
        event.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "searchtype": searchtype,
        "searchvalue": searchvalue
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };
    
        
    
        try{
        const res = await fetch("api/librarydb/results", requestOptions)
        let result;
        result = await res.text()
        this.setState({
            resultArray:JSON.parse(result)
        }
        )
    
        }
        catch(e){

            console.log(e);
            //This stuff below is if no stuff is found.  In final build, here is where we will call the function that HTTP GETs Open Library
            this.setState({
                resultArray:["No results found"]
            })
            
        }
    }
    render(){
        return(
        <>
        
        <Helmet>
        <title>{TITLE}</title>

        </Helmet>
        <PageAnimation>
        <Intro props={this.state}/>
        <Form id='librarydbsearchform' onSubmit={(event)=>this.handleSubmit(event)}>
        <Row>
                <Col sm='auto'> 
                <DropdownButton id='searchoptions' variant='dark' menuVariant='dark' title='Start Your Search' size='sm'>
                    <Dropdown.Header>ID Search</Dropdown.Header>
                    <Dropdown.Divider/>
                    <Dropdown.Item type='button' id='ISBN_10' onClick={()=>searchswitch('ISBN_10')}>ISBN-10</Dropdown.Item>
                    <Dropdown.Item type='button' id='ISBN_13' onClick={()=>searchswitch('ISBN_13')}>ISBN-13</Dropdown.Item>
                    <Dropdown.Item type='button' id='EDITION_ID' onClick={()=>searchswitch('EDITION_ID')}>Open Library ID</Dropdown.Item>
                    <Dropdown.Header> Name Search </Dropdown.Header>
                    <Dropdown.Divider/>
                    <Dropdown.Item type='button' id='TITLE' onClick={()=>searchswitch('TITLE')}>Title</Dropdown.Item>
                </DropdownButton>
                </Col>
                <Col>
                <Form.Control size='sm' type='text' id='searchform' style={{display:'none'}} onKeyUp={()=>visibilityswitch('searchform','submitbutton')}></Form.Control>
                </Col>
                <Col>
                <Button variant='dark' type='submit' size='sm' id='submitbutton' style={{display:'none'}} disabled >Search</Button>
                </Col>
        </Row>
        </Form>
        <br/>
        {this.state.resultArray.length>0 && <LibraryDBResults props={this.state}/>}
        </PageAnimation>
        </>
        )
    }
}



function searchswitch(searchoption){
    const ddbutton=document.getElementById('searchoptions');
    const ddbuttonoption=document.getElementById(searchoption);
    const searchbox=document.getElementById('searchform');
    searchbox.setAttribute('name',searchoption);
    searchbox.style.display='initial';
    ddbutton.innerText=ddbuttonoption.innerText;
}
function visibilityswitch(sourceid,idoption){
    var searchval=document.getElementById(sourceid).value??" ";
    var searchvalclean=searchval.trim();
    var submitbutton=document.getElementById(idoption);
    if ((searchvalclean=="")) {
        submitbutton.disabled=true;
        submitbutton.style.display='none';
    }
    else {
        submitbutton.disabled=false;
        submitbutton.style.display='initial';
    }

}
  
function Intro(props){
    //const eee = props.props.max;
    const introbuttontext={true:"Hide Intro",false:"Show Intro"};
    const [close,setOpen] = useState(true);
    return(
    <div id="introcard" className='col-sm-6'>
    <Button variant='dark' size='sm'  onClick={()=>{setOpen(!close)}} aria-controls="introtext" aria-expanded={close}>{introbuttontext[close]}</Button>
            <Row>
            <Collapse in={close}>
                <div id="introtext">
                I love to read.<br />
                I also love to buy books. Lots and lots of books. This has led to me forgetting what I already have when I am browsing the shelves of my favorite local bookstore. It was around the time I bought my third copy of The Silmarillion that I realized that my library is way too big to keep track of in my head. Now, I could write down all of my books in the notes app on my phone or use an online library, but then I wouldn't be able to flex my technical muscles to create this!<br/>
                Through this project, affectionately named "Encyclopedia Berb's Library Database" users can: <br/>
                <ol>
                    <li>Search the SQL database for books, using both Open Library and RESTful to find and compile information within the database</li>
                    <li>Create an account to add books to a personal library, categorized by ownership and reading status </li>
                    <li> Keep track of personal libraries and reading progress through the database </li>
                </ol>
                </div>
            </Collapse>
            </Row>
            <br/>
    </div>
    )
}

function LibraryDBResults(props){
const jwt=sessionStorage.getItem("JWT")
Intro(props);
//console.log(props.props.max)
if (props.props.resultArray.length>0 && props.props.resultArray[0]!=='No results found'){
    //use conditional rendering to add the user account buttons
    console.log(props.props.resultArray)
    let tb_data = props.props.resultArray.map((book)=>{
        return(
            <tr key={book.EDITION_ID}>
                <td>{book.INFO.TITLE}
                {book.INFO.SUBTITLE!==null && book.INFO.SUBTITLE!==undefined ? ": "+book.INFO.SUBTITLE: ""}
                </td>
                <td>{book.INFO.ISBN_13}</td>
                <td>{book.INFO.ISBN_10}</td>
                <td>{book.INFO.AUTHOR_NAMES}</td>
                {jwt!==null && typeof jwt!=="undefined" && <><OwnershipDropDown Book={book}/><ReadDropDown Book={book}/></>}
            </tr>
        )
    })
    return(
        <>
        <div className='table-responsive-sm'>
            <Table variant='dark'>
                <thead>
                <tr>
                    <th>Title</th>
                    <th>ISBN-13</th>
                    <th>ISBN-10</th>
                    <th>Authors&#40;s&#41;</th>
                    {jwt!==null && typeof jwt!=="undefined" &&<><th>Ownership Status</th><th>Read Status</th></>}
                    
                </tr>
                </thead>
                <tbody>
                    {tb_data}
                </tbody>
            </Table>
        </div>
        </>
    )
}
else{
    return(<h4>{props.props.resultArray[0]}</h4>)
}


}


export default LibraryDB;