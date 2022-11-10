import React from "react";
import { Dropdown, DropdownButton, Button, Form } from "react-bootstrap";


//var submitData=new Map();
const handleEdit = async (e) => {
  e.preventDefault();
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
};

const handleSelect = () => {
  const submitButton = document.getElementById("submitButton");
  submitButton.style.display = "initial";
  submitButton.disabled = false; 
  //submitData.set(Book.Book.EDITION_ID,"test");
  //console.log(Book)
  //console.table(submitData); 
};

//! instead of trying to be tricky, I can instead initialize the map by setting it up with the default values, then editing the data using this function
//! The user will only be able to send the data if they trigger the handleSelect option.
//! I don't like this because each book would write to the database.
//* It looks like we're going to have to handle all of this in a unique way.
//* I can't have parts of a form within a table that's nested in a form.
//* Maybe, we make a function in here that makes a form all in one.  Then, we FormData.append as an onChange
/*
const handleData=(Book,formStuff)=>{
  if (submitData.has(Book.Book.EDITION_ID)){
    submitData.get(Book.Book.EDITION_ID).push(formStuff.value)
    console.table(submitData);
  }
  else{
    submitData.set(Book.Book.EDITION_ID,[formStuff.value])
  }
}
*/
function SubmitButton() {
  return (
    <Button
      type="submit"
      variant="dark"
      disabled
      style={{ display: "none" }}
      id="submitButton"
    >
      Save Changes
    </Button>
  );
}
//!DEPRECATED
/**
 * Option List of all Reading Options possible for a book.
 * @param {Object} Book Line of return value from api/librarydb/mylibrary
 * @returns Option List for the Book in the user's library.  Default value for the Option List is whatever the user previously recorded
 */
function ReadList(Book) {
  return (
    <td>
      <select
        id={`${Book.Book.EDITION_ID}-ReadList`}
        defaultValue={Book.Book.INFO.READ_STATUS ?? "N/A"}
        className="form-control"
        onChange={handleSelect}
      >
        <option value="N/A" disabled>
          N/A
        </option>
        <option value="1">Read</option>
        <option value="2">Reading</option>
        <option value="3">TBR</option>
        <option value="4">DNF</option>
      </select>
    </td>
  );
}
//!DEPRECATED
/**
 * Option List of all Ownership Options possible for a book.
 * @param {Object} Book Line of return value from api/librarydb/mylibrary
 * @returns Option List of Ownership values for the Book in the user's library.  Default value for the Option List is whatever the user previously recorded
 */

function OwnershipList(Book) {
  return (
    <td>
      <select
        id={`${Book.Book.EDITION_ID}-OwnershipList`}
        defaultValue={Book.Book.INFO.OWNERSHIP_STATUS ?? "N/A"}
        className="form-control"
        onChange={handleSelect}
      >
        <option value="N/A" disabled>
          N/A
        </option>
        <option value="1">Want</option>
        <option value="2">Own</option>
      </select>
    </td>
  );
}



//!DEPRECATED
function BookCount(Book) {
  return (
    <td>
      <Form.Control
        type="number"
        min="0"
        defaultValue={Book.Book.INFO.BOOK_NUM ?? "0"}
        onChange={handleSelect}
      />
    </td>
  );
}
/**
 * 
 * @param {Object} Book Line of return value from api/librarydb/mylibrary that represents a unique book in the user's library
 * @returns 
 */

function BookForm(Book){
  return (
    <>
    <td>
      <select
        id={`${Book.Book.EDITION_ID}-ReadList`}
        name={`${Book.Book.EDITION_ID}-ReadList`}
        defaultValue={Book.Book.INFO.READ_STATUS ?? "N/A"}
        className="form-control"
        onChange={handleSelect}
        //onClick={()=> handleData(Book,this)}
        form="EditLibrary"
      >
        <option value="N/A" disabled>
          N/A
        </option>
        <option value="1">Read</option>
        <option value="2">Reading</option>
        <option value="3">TBR</option>
        <option value="4">DNF</option>
      </select>
    </td>

    <td>
      <select
        id={`${Book.Book.EDITION_ID}-OwnershipList`}
        name={`${Book.Book.EDITION_ID}-OwnershipList`}
        defaultValue={Book.Book.INFO.OWNERSHIP_STATUS ?? "N/A"}
        className="form-control"
        onChange={handleSelect}
        form="EditLibrary"
      >
        <option value="N/A" disabled>
          N/A
        </option>
        <option value="1">Want</option>
        <option value="2">Own</option>
      </select>
    </td>

    <td>
      <Form.Control
        type="number"
        id={`${Book.Book.EDITION_ID}-BookCount`}
        name={`${Book.Book.EDITION_ID}-BookCount`}
        min="0"
        defaultValue={Book.Book.INFO.BOOK_NUM ?? "0"}
        onChange={handleSelect}
        form="EditLibrary"
      />
    </td>
</>

  )
}


export {
  SubmitButton,
  handleEdit,
  BookForm
};
