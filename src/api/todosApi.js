import axios from "axios";

const todosApi = axios.create({
  baseURL: "https://rocky-cove-85788.herokuapp.com",
});

export const getTodos = async () => {
  const respone = await todosApi.get("/todos");
  return respone.data;
};

export const addTodo = async (todo) => {
  return await todosApi.post("/todos", todo);
};

export const updateTodo = async (todo) => {
  return await todosApi.patch(`/todos/${todo.id}`, todo);
};

export const deleteTodo = async ({ id }) => {
  return await todosApi.delete(`/todos/${id}`, id);
};

export default todosApi;
