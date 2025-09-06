import React from "react";
import { useParams } from "react-router-dom";

const IndUser = () => {
  const { id } = useParams();
  return <div>IndUser : {id}</div>;
};

export default IndUser;
