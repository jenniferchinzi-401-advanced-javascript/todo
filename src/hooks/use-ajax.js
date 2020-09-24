// TODO:
// Create a new custom hook called useAjax() to abstract the API calls
  // Using this hook in your component should make the calls to the server
  // This hook should:
    // Accept the URL to the API server, the REST method, and (when relevant) the BODY (JSON) of the request
    // Handle CORS Settings, Content-Type, Headers and possibly authentication
    // You should use axios to perform the actual AJAX calls

import axios from 'axios';

const useAjax = (body, url, method) => {

  async function getStoredTasks(){
    const response = await axios[method](url); 
    body(response.data);
  }

  async function addNewTask(body){
    await axios[method](url, {
      text: body.text,
      assignee: body.assignee,
      complete: body.complete,
      difficulty: body.difficulty,
    });
  }

  async function dbToggleStatus(body){
    await axios[method](`${url}${body._id}`, {complete: body.complete});
  }

  async function deleteTask(body){
    await axios[method](`${url}${body}`);
  }

  return {
    getStoredTasks,
    addNewTask,
    dbToggleStatus,
    deleteTask
  }

}

export default useAjax;