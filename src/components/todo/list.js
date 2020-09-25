import React, { useContext, useState } from 'react';
// import ListGroup from 'react-bootstrap/ListGroup'
import Badge from 'react-bootstrap/Badge'
import Toast from 'react-bootstrap/Toast'
import Pagination from 'react-bootstrap/Pagination'
import Auth from '../auth/auth'
import { Switch, Case } from 'react-if'

import {SettingsContext} from '../../context/settings';
import {LoginContext} from '../auth/context';

import './todo.scss';


  function TodoList(props) {

    const settings = useContext(SettingsContext);
    const loginStatus = useContext(LoginContext);

    const [page, setPage] = useState(0);

    // Pagination=============================================
    const list = props.list.filter(item => settings.showCompleted ? true : !item.complete);
    const start = settings.maxVisible * page || 0;
    const end = start + settings.maxVisible || list.length;
    const pages = new Array(Math.ceil(list.length / settings.maxVisible)).fill('');

    const displayList = list ? list.slice(start, end) : [];

    const styles = {

      pill:{
        marginRight: '1rem',
        cursor: 'pointer',
      },

      difficulty:{
        display: 'block',
        textAlight: 'right',
      },

      toast:{
        maxWidth: '100%',
        width: '100%',
      },

    };

    return (
      <>
      <Switch>
        <Case condition={ loginStatus.can('delete') }>
        {displayList.map(item => (
          <Toast 
          key={item._id} 
          style={styles.toast} 
          onClose={() => props.handleDelete(item._id)}>
            <Toast.Header closeButton>
              <Badge pill
              style={styles.pill}
              variant={item.complete ? 'danger' : 'success'}
              onClick={() => props.handleComplete(item._id)}>
                {item.complete ? 'Complete' : 'Pending'}
              </Badge>
              <strong className="mr-auto">{item.assignee}</strong>
            </Toast.Header>
            <Toast.Body>
              {item.text}
              <small style={styles.difficulty}>Difficulty: {item.difficulty}</small>
            </Toast.Body>
          </Toast>
        ))}
        </Case>
        <Case condition={ loginStatus.can('update') }>
        {displayList.map(item => (
          <Toast 
          key={item._id} 
          style={styles.toast}>
            <Toast.Header>
              <Badge pill
              style={styles.pill}
              variant={item.complete ? 'danger' : 'success'}
              onClick={() => props.handleComplete(item._id)}>
                {item.complete ? 'Complete' : 'Pending'}
              </Badge>
              <strong className="mr-auto">{item.assignee}</strong>
            </Toast.Header>
            <Toast.Body>
              {item.text}
              <small style={styles.difficulty}>Difficulty: {item.difficulty}</small>
            </Toast.Body>
          </Toast>
        ))}
        </Case>
        </Switch>

        <Pagination>
          {
            //TODO: What is 'n' in this function?  From sample code
            pages.map( (n,i) => 
              <Pagination.Item key={i+1} onClick={() => setPage(i)}>
                {i+1}
              </Pagination.Item>,
              )
          }
        </Pagination>
      </>
    );
  }


export default TodoList;


// Old version of return:
      // <ListGroup>
      //   {props.list.map(item => (
      //     <ListGroup.Item
      //       action variant={item.complete === false ? "success" : "danger"}
      //       className={`complete-${item.complete.toString()}`}
      //       key={item._id}
      //     >
      //       <span onClick={() => props.handleComplete(item._id)}>
      //         {item.text}
      //         <br></br>
      //         {item.assignee}
      //       </span>
      //       {/* Error: <button> cannot appear as a descendant of <button> */}
      //       <button onClick={() => {props.handleDelete(item._id)}}>Delete</button>
      //     </ListGroup.Item>
      //   ))}
      // </ListGroup>
