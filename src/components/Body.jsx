import React from "react";
import { useQuery, useQueryClient } from "react-query";

import CircularProgress from "@mui/material/CircularProgress";

import { getTodos } from "../api/todosApi";

import RenderList from "./RenderList";

function Body() {
  const queryClinet = useQueryClient();
  const {
    isLoading,
    isError,
    error,
    isSuccess,
    data: todos,
  } = useQuery("todos", getTodos);

  if (isLoading)
    return (
      <div className="loading">
        <CircularProgress />
      </div>
    );
  if (isError) return <div>{error.message}</div>;
  if (isSuccess)
    return (
      <div className="Container">
        <RenderList data={todos} status={"Todo"} />
        <RenderList data={todos} status={"Doing"} />
        <RenderList data={todos} status={"Done"} />
      </div>
    );
}

export default Body;
