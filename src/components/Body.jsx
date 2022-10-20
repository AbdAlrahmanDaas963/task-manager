import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";

import Skeleton from "@mui/material/Skeleton";

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
      <div className="Container">
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
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
