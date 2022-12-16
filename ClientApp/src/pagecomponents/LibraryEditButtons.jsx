import React from "react";
import { Button, Form } from "react-bootstrap";
const payloadjson=JSON.parse(sessionStorage.getItem("Payload"));
var submitData = new Map();

const HandleEdit = async (e) => {
  e.preventDefault();
  submitData.forEach(function (currentValue, currentIndex) {
    let READLIST = document.getElementById(`${currentIndex}-ReadList`).value;
    let OWNLIST = document.getElementById(
      `${currentIndex}-OwnershipList`
    ).value;
    let BOOKNUM = document.getElementById(`${currentIndex}-BookCount`).value;
    let DELETE = document.getElementById(`${currentIndex}-Delete`);
    if(DELETE!==null){
    console.log(DELETE.value);
    if(DELETE.checked){
      //console.log("This is checked for deletion");
      submitData.set(currentIndex,{
      EDITION_ID: currentIndex,
      OWNERSHIP_STATUS: OWNLIST,
      READ_STATUS: READLIST,
      BOOK_NUM: BOOKNUM,
      DELETE: "Yes"
      })
    }  
    else{
      submitData.set(currentIndex, {
      EDITION_ID: currentIndex,
      OWNERSHIP_STATUS: OWNLIST,
      READ_STATUS: READLIST,
      BOOK_NUM: BOOKNUM,
      DELETE: "No",
    })
  }
  }
  else{
    submitData.set(currentIndex, {
      EDITION_ID: currentIndex,
      OWNERSHIP_STATUS: OWNLIST,
      READ_STATUS: READLIST,
      BOOK_NUM: BOOKNUM,
      DELETE: "No",
    })
  }
  });

  let submitDataArray = [...submitData.values()];
  let submitDataJSON = JSON.stringify(submitDataArray);
  console.log(submitDataJSON);
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({"LIBRARY":payloadjson.library,"EDITLIBRARY":submitDataArray}),
    redirect: "follow",
  };
  const res = await fetch("api/librarydb/editlibrary", requestOptions);
  if (res.ok){
    //window.location.reload();
  }
  //TODO - check res.code.  If res.ok, return res.text(); this will be the number of affected rows.
  //TODO - after, reload the page, and have a Toast indicating how many books were edited.
};
/**
 *
 * @param {Object} Book Represents the book that is being edited
 * @param {Object} val This can either be a string or int.  It represents the value that you're changing for the book to be in your library
 * @param {String} statType This represents the specific attribute you are editing, such as if you have read the book
 */
const handleSelect = (Book) => {
  const submitButton = document.getElementById("submitButton");
  submitButton.style.display = "initial";
  submitButton.disabled = false;
  submitData.set(Book, []);
};



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

/**
 * Why are we building this like this?
 * Forms pieces cannot be piecemeal put into table components.
 * HOWEVER, we can get around this by taking advantage of the form attribute of form elements.
 * By defining the form we are using these form inputs for, we can actually put the input components outside of the form component and spread throughout the table like we want
 * @param {Object} Book Line of return value from api/librarydb/mylibrary that represents a unique book in the user's library
 * @returns Two Select Options that represent the user's read and ownership status and one number input represent the number of copies the user owns / wants
 */

function BookForm(Book) {
  return (
    <>
      <td>
        <select
          id={`${Book.Book.EDITION_ID}-ReadList`}
          name="READ_STATUS"
          defaultValue={Book.Book.INFO.READ_STATUS ?? "N/A"}
          className="form-control"
          onChange={(e) =>
            handleSelect(Book.Book.EDITION_ID)
          }
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
          name="OWNERSHIP_STATUS"
          defaultValue={Book.Book.INFO.OWNERSHIP_STATUS ?? "N/A"}
          className="form-control"
          onChange={(e) =>
            handleSelect(Book.Book.EDITION_ID)
          }
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
          name="BOOK_NUM"
          min="0"
          defaultValue={Book.Book.INFO.BOOK_NUM ?? "0"}
          onChange={(e) =>
          handleSelect(Book.Book.EDITION_ID)
          }
          form="EditLibrary"
        />
      </td>
    </>
  );
        }
  function RemoveBook(Book){
    //here we will have a checkbox that looks like an x
    //When it is selected, it will queue up for the book to be deleted from the user's library
    //when unselected, it will remove itself from the data queue
    return(
    <td>
      <Form.Check
        //on click, we will check if selected.  If yes, add a piece of info to the json that will tell us to remove the book from the user's library
        //TODO - adjust EditLibraryModel to account for a "REMOVE" option.
        //TODO - in LibraryDBController, if "REMOVE" is present, run a stored procedure that deletes the book from the library
          form="EditLibrary"
          id={`${Book.Book.EDITION_ID}-Delete`}
        />
    </td>
    )
}
  


export { SubmitButton, BookForm, HandleEdit, RemoveBook};
