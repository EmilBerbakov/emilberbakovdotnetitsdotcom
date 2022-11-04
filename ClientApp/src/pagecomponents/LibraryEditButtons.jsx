import React from "react";
import { Dropdown, DropdownButton, Button, Form } from "react-bootstrap";

//! DEPRECATED
function OwnershipDropDown(Book) {
  return (
    <td>
      <DropdownButton
        id={`${Book.EDITON_ID}-OwnershipDropDown`}
        variant="dark"
        menuVariant="dark"
        title="Ownership Status"
        size="sm"
      >
        <Dropdown.Item type="button" value="N/A">
          N/A
        </Dropdown.Item>
        <Dropdown.Item type="button" value="WANT">
          Want
        </Dropdown.Item>
        <Dropdown.Item type="button" value="OWN">
          Own
        </Dropdown.Item>
      </DropdownButton>
    </td>
  );
}
const handleEdit = async (e) => {
  e.preventDefault();
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const formData = new FormData(document.querySelector("form"));
  console.table(formData);
};

//! DEPERECATED
function ReadDropDown(Book) {
  return (
    <>
      <td>
        <DropdownButton
          id={`${Book.EDITON_ID}-ReadDropDown`}
          variant="dark"
          menuVariant="dark"
          title="Read Status"
          size="sm"
        >
          <Dropdown.Item type="button" value="N/A">
            N/A
          </Dropdown.Item>
          <Dropdown.Item type="button" value="READ">
            Read
          </Dropdown.Item>
          <Dropdown.Item type="button" value="READING">
            Reading
          </Dropdown.Item>
          <Dropdown.Item type="button" value="TBR">
            TBR
          </Dropdown.Item>
        </DropdownButton>
      </td>
    </>
  );
}

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

const handleSelect = () => {
  const submitButton = document.getElementById("submitButton");
  submitButton.style.display = "initial";
  submitButton.disabled = false;
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

export {
  OwnershipDropDown,
  ReadDropDown,
  ReadList,
  OwnershipList,
  SubmitButton,
  handleEdit,
};
