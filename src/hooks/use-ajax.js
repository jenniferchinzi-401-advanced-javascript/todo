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