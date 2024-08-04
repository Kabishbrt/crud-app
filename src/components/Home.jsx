import React from "react";
import { Form } from "./Form";
import { Table } from "./Table";

export const Home = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <Form />
        <Table />
      </div>
    </>
  );
};
