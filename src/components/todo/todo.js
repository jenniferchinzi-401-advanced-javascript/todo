import React, { useEffect, useState } from 'react';
import TodoForm from './form.js';
import TodoList from './list.js';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

import axios from 'axios';


import './todo.scss';

function ToDo() {

  const [list, setList] = useState([])

  const addItem = (item) => {
    item._id = Math.random();
    item.complete = false;
    console.log('New Item: ', item);
    setList([...list, item]);
    addNewTask(item);
  };

  const toggleComplete = id => {

    let item = list.filter(i => i._id === id)[0] || {};

    if (item._id) {
      item.complete = !item.complete;
      let stringyNewStatus = item.complete.toString();
      dbToggleStatus(item._id, stringyNewStatus);
      let updatedList = list.map(listItem => listItem._id === item._id ? item : listItem);
      setList(updatedList);
    }

  };

// TODO: Why is this automatically running???
// TODO: Add Axios tie-in function to also update DB
  function removeTask (id) {
    let reducedList = list.filter(i => i._id !== id) || {};
    console.log('ID?', id);
    console.log('List Shape:', list);
    console.log('List After Delete:', reducedList);
    // setList(reducedList);
  }

  useEffect(() => {
    getStoredTasks();
  }, []);

// Axios Functions=================================================

  async function getStoredTasks(){
    const response = await axios.get('http://localhost:3001/api/v1/todos'); 
    setList(response.data);
  }

  async function addNewTask(item){
    await axios.post('http://localhost:3001/api/v1/todos', {
      text: item.text,
      assignee: item.assignee,
      complete: item.complete,
      difficulty: item.difficulty,
    });
  }

  async function dbToggleStatus(id, status){
    console.log('Im Here!  and the status is:', status);
    await axios.put(`http://localhost:3001/api/v1/todos/${id}`, {complete: status});
  }

  // Class Version
  // async componentDidMount(){
  //   const response = await axios.get('http://localhost:3000/api/v1/todos');
  //   this.setState({list: response.data.results});
  // };

  // useEffect(() => {
  //   let updatedList = [
  //     { _id: 1, complete: false, text: 'Clean the Kitchen', difficulty: 3, assignee: 'Person A' },
  //     { _id: 2, complete: false, text: 'Do the Laundry', difficulty: 2, assignee: 'Person A' },
  //     { _id: 3, complete: false, text: 'Walk the Dog', difficulty: 4, assignee: 'Person B' },
  //     { _id: 4, complete: true, text: 'Do Homework', difficulty: 3, assignee: 'Person C' },
  //     { _id: 5, complete: false, text: 'Take a Nap', difficulty: 1, assignee: 'Person B' },
  //   ];

  //   setList(updatedList);
  // }, []);

  useEffect(() => {
    document.title = `To Do List: ${list.filter(item => !item.complete).length}`
  }, [list]);

  return (
    <Container>
      <Row>
          <Col>
            <header>
              <Navbar bg="dark" variant="dark">
                <Nav>
                  <Navbar.Brand>
                  ToDo List Manager ({list.filter(item => !item.complete).length})
                  </Navbar.Brand>
                </Nav>
              </Navbar>
            </header>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <section className="todo">
              <div>
                <TodoForm handleSubmit={addItem} />
              </div>
            </section>
          </Col>
          <Col md={8}>
          <section className="todo">
              <div>
                <TodoList
                  list={list}
                  handleComplete={toggleComplete}
                  handleDelete={removeTask}
                  />
              </div>
            </section>
          </Col>
        </Row>
    </Container>
  );
}


export default ToDo;
