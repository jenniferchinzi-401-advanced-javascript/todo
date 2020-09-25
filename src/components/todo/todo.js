import React, { useEffect, useState } from 'react';
import TodoForm from './form.js';
import TodoList from './list.js';
import Auth from '../auth/auth.js';
import Login from '../auth/login.js';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

import './todo.scss';
import useAjax from '../../hooks/use-ajax.js';

function ToDo() {

  const [list, setList] = useState([]);
  const [item, setItem] = useState({});
  const [id, setID] = useState();

  const addItem = (item) => {
    item._id = Math.random();
    item.complete = false;
    setList([...list, item]);
    setItem(item);
    addNewTask(item);
  };

  const toggleComplete = id => {

    let item = list.filter(i => i._id === id)[0] || {};
    console.log('Item Here:', item);

    if (item._id) {
      item.complete = !item.complete;
      setItem(item);
      dbToggleStatus(item);
      let updatedList = list.map(listItem => listItem._id === item._id ? item : listItem);
      setList(updatedList);
    }

  };

  const removeTask = id => {
    let reducedList = list.filter(i => i._id !== id) || {};
    console.log('ID?', id);
    setList(reducedList);
    setID(id);
    deleteTask(id);
  };

  useEffect(() => {
    getStoredTasks();
  }, []);

// Ajax Hook Calls================================================
  const{ getStoredTasks } = useAjax(setList, `${process.env.REACT_APP_API}/api/v1/todo`, 'get');

  const { addNewTask } = useAjax(item, `${process.env.REACT_APP_API}/api/v1/todo`,'post');

  // TODO: Why does put work but patch does not, even though it seems more appropriate for this case? Also, it never takes on the first try, but does work every time after...
  const { dbToggleStatus } = useAjax(item, `${process.env.REACT_APP_API}/api/v1/todo/`, 'put');

  const { deleteTask } = useAjax(id, `${process.env.REACT_APP_API}/api/v1/todo/`, 'delete');

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
                  {console.log('List Here', list)}
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
