import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getTodos } from "./../../api/todosApi";

function TodoList() {
  const queryClinet = useQueryClient();
  const {
    isLoading,
    isError,
    error,
    data: todos,
  } = useQuery("todos", getTodos);

  console.log("todos", todos);

  return <div>TodoList</div>;
}

export default TodoList;
