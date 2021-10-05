import React, { useState, useEffect } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

function Books() {
  // Setting our component's initial state
  // two states, one is called books and the other is called formObject
  const [books, setBooks] = useState([])
  const [formObject, setFormObject] = useState({})

  // Load all books and store them with setBooks
  // when page loads, call loadBooks
  useEffect(() => {
    loadBooks()
  }, [])

  // Loads all books and sets them to books
  // api comes from util/API.js
  function loadBooks() {
    // getBooks returns a get request from /api/books - This route is defined in routes/api/books.js - it finds all the books
    // api/books 
    API.getBooks()
      .then(res => 
        // sets the state to data from the response
        setBooks(res.data)
      )
      .catch(err => console.log(err));
  };



  // Deletes a book from the database with a given id, then reloads books from the db
  function deleteBook(id) {
    // deleteBook maks a delete request to api/books/:id, this route is defined in routes/api/books.js
    // it takes matches the id to a book in the db and removes it
    API.deleteBook(id)
    // reloads all of the books and updates the state
      .then(res => loadBooks())
      .catch(err => console.log(err));
  }


  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    // grabs the name and the value from the event
    // example - name will be title, author or synopsis - name is already assigned for each input
    // the value is what the user is typing 
    const { name, value } = event.target;
    // sets the state for the form object by taking whatever name comes from the target and sets it to the value that's typed into the input field
    setFormObject({...formObject, [name]: value})
  };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  function handleFormSubmit(event) {
    event.preventDefault();
    // if the formObject has a title and an author..
    if (formObject.title && formObject.author) {
      // call this method which does a post request to api/books
      // save book takes the book data passed in below
      // and posts it to that route
      API.saveBook({
        title: formObject.title,
        author: formObject.author,
        synopsis: formObject.synopsis
      })
        .then(res => loadBooks())
        .catch(err => console.log(err));
    }
  };

    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>What Books Should I Read?</h1>
            </Jumbotron>
            <form>
              <Input
              // passing in this info as props to the Input component. All it does is adds this information into the input element
              // when there's a change to this input field, call handleInputChange, which grabs the name and the value. Here, the name will be "title" when they type in this input field. 
                onChange={handleInputChange}
                // this will get changed to whatever the user is typing in 
                name="title"
                placeholder="Title (required)"
              />
              <Input
                onChange={handleInputChange}
                name="author"
                placeholder="Author (required)"
              />
              <TextArea
              // same as input
                onChange={handleInputChange}
                name="synopsis"
                placeholder="Synopsis (Optional)"
              />
              <FormBtn
              // same as input 
                disabled={!(formObject.author && formObject.title)}
                onClick={handleFormSubmit}
              >
                Submit Book
              </FormBtn>
            </form>
          </Col>


          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Books On My List</h1>
            </Jumbotron>
            {/* if there is a books.length then render the List component, else render the <h3> No results to Display</h3> element */}
            {books.length ? (
              <List>
                {/* map through the books state */}
                {books.map(book => (
                  // give the li element a unique key
                  // how mongo returns their id
                  <ListItem key={book._id}>
                    {/* give it a Link to /books/ + book._id */}
                    {/* when they click on that link, it takes user to api/books/book._id
                    Is this just a get request?*/}
                    <Link to={"/books/" + book._id}>
                      <strong>
                        {book.title} by {book.author}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => deleteBook(book._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }


export default Books;


// liftOff with Launchcode - use a different stack than what we learned
// connected with mercy with launchcode - connecting iwth companies in st louis
// learn typescript