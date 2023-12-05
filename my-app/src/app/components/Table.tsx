"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  RadioGroup,
  Radio,
} from "@nextui-org/react";

const colors = [
  "default",
  "primary",
  "secondary",
  "success",
  "warning",
  "danger",
];

export default function CustomTable() {
  //   const [selectedColor, setSelectedColor] = React.useState("default");

  function handleClick() {
    const table = document.getElementById("thesis-table");
    const table_body = document.getElementById("thesis-table-body");
    var htmlStr = (
      <TableRow key="1">
        <TableCell>Tony Reichert</TableCell>
        <TableCell>CEO</TableCell>
        <TableCell>Active</TableCell>
      </TableRow>
    );
    table_body!.innerHTML += htmlStr;
    // table!.innerHTML = `<p>Hello</p>`
  }
  return (
    <div className="flex flex-col gap-3 w-4/5 m-auto pt-8">
      <Table
        color={"primary"}
        disallowEmptySelection
        selectionMode="single"
        // defaultSelectedKeys={["2", "3"]}
        aria-label="Example static collection table"
        id="thesis-table"
      >
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>ROLE</TableColumn>
          <TableColumn>STATUS</TableColumn>
        </TableHeader>
        <TableBody id="thesis-table-body">
          <TableRow key="1">
            <TableCell>Tony Reichert</TableCell>
            <TableCell>CEO</TableCell>
            <TableCell>Active</TableCell>
          </TableRow>
          <TableRow key="2">
            <TableCell>Zoey Lang</TableCell>
            <TableCell>Technical Lead</TableCell>
            <TableCell>Paused</TableCell>
          </TableRow>
          <TableRow key="3">
            <TableCell>Jane Fisher</TableCell>
            <TableCell>Senior Developer</TableCell>
            <TableCell>Active</TableCell>
          </TableRow>
          <TableRow key="4">
            <TableCell>William Howard</TableCell>
            <TableCell>Community Manager</TableCell>
            <TableCell>Vacation</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <button className="bg-slate-500" onClick={handleClick}>
        add cell
      </button>
      <div>
        <p id="test">Hello</p>
      </div>
    </div>
  );
}
