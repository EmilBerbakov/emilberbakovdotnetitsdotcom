import React from "react";
import { Button, Container, Form, Table, Spinner } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import PageAnimation from "./PageAnimation";
import {
  ReadList,
  OwnershipList,
  SubmitButton,
  handleEdit,
} from "../pagecomponents/LibraryEditButtons";

export default function MyLibrary() {
  const jwt = sessionStorage.getItem("JWT");
  const fetchLibrary = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    if (jwt == null || jwt == undefined) {
      sessionStorage.clear();
      sessionStorage.setItem("Error", "You must log in to view your library.");
      window.location.replace("/home");
    }
    if (jwt == null || jwt == undefined) {
      window.location.replace("/home");
    }
    var raw = JSON.stringify({
      jwt: jwt,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    const res = await fetch("api/librarydb/mylibrary", requestOptions);
    return res.text();
  };

  const { data, status } = useQuery("myLibrary", fetchLibrary);

  if (status === "loading") {
    return (
      <PageAnimation>
        <div>
          <center>
            Loading... <Spinner animation="border" variant="light" />
          </center>
        </div>
      </PageAnimation>
    );
  } else if (status === "error") {
    sessionStorage.clear();
    sessionStorage.setItem(
      "Error",
      "There was an unforseen error.  Please try again."
    );
    window.location.replace("/home");
  } else if (status === "success") {
    switch (data) {
      case "2":
        return (
          <>
            <h4>You do not have a library yet. Click here to get started:</h4>
            <Button variant="dark" href="/librarydb">
              Library Database
            </Button>
          </>
        );
      case "3":
        sessionStorage.clear();
        sessionStorage.setItem(
          "Error",
          "There was an unforseen error.  Please try again."
        );
        window.location.replace("/home");
        break;
      case "4":
        sessionStorage.clear();
        sessionStorage.setItem(
          "Error",
          "Either you forged a JWT or something broke.  Bad news either way.  Try again."
        );
        window.location.replace("/home");
        break;
      default:
        let dataJSON = JSON.parse(data);
        let tb_data = dataJSON.map((book) => {
          return (
            <tr key={book.EDITION_ID}>
              <td>
                {book.INFO.TITLE}
                {book.INFO.SUBTITLE !== null && book.INFO.SUBTITLE !== undefined
                  ? ": " + book.INFO.SUBTITLE
                  : ""}
              </td>
              <td>{book.INFO.ISBN_13}</td>
              <td>{book.INFO.ISBN_10}</td>
              <td>{book.EDITION_ID}</td>
              <td>{book.INFO.AUTHOR_NAMES}</td>
              {jwt !== null && typeof jwt !== "undefined" && (
                <>
                  <ReadList Book={book} />
                  <OwnershipList Book={book} />
                  <td>
                    <Form.Control
                      type="number"
                      min="0"
                      defaultValue={book.INFO.BOOK_NUM}
                    />
                  </td>
                </>
              )}
            </tr>
          );
        });
        const payloadjson = JSON.parse(sessionStorage.getItem("Payload"));
        return (
          <>
            <Helmet>
              <title>My Library</title>
            </Helmet>
            <PageAnimation>
              <h4>
                <center>{payloadjson.firstname}'s Library</center>
              </h4>
              <Container>
                <Form id="EditLibrary" onSubmit={handleEdit(e, "EditLibrary")}>
                  <Table variant="dark" responsive>
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>ISBN-13</th>
                        <th>ISBN-10</th>
                        <th>Open Library ID</th>
                        <th>Authors&#40;s&#41;</th>

                        {jwt !== null && typeof jwt !== "undefined" && (
                          <>
                            <th>Read Status</th>
                            <th>Ownership Status</th>
                            <th>Number of Copies</th>
                          </>
                        )}
                      </tr>
                    </thead>
                    <tbody>{tb_data}</tbody>
                  </Table>
                  {/* TODO: hide the button until there is a click action in the buttons in tb_data.*/}
                  <SubmitButton />
                </Form>
              </Container>
            </PageAnimation>
          </>
        );
    }
  }
}
