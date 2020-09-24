import React from 'react';
import Card from 'react-bootstrap/Card'

import useForm from '../../hooks/use-form.js'

function TodoForm(props) {

  const [handleSubmit, handleInputChange] = useForm(submitForm);

  function submitForm(task){
    console.log('task:', task);
    props.handleSubmit(task);
  }

    return (
      <Card>
        <Card.Body>
          <h3>Add Item</h3>
          <form onSubmit={handleSubmit}>
            <label>
              <span>To Do Item</span>
              <input
                name="text"
                placeholder="Add To Do List Item"
                onChange={handleInputChange}
                />
            </label>
            <label>
              <span>Difficulty Rating</span>
              <input defaultValue="1" type="range" min="1" max="5" name="difficulty" onChange={handleInputChange} />
            </label>
            <label>
              <span>Assigned To</span>
              <input type="text" name="assignee" placeholder="Assigned To" onChange={handleInputChange} />
            </label>
            <button>Add Item</button>
          </form>
        </Card.Body>
      </Card>
    );
  }


export default TodoForm;
