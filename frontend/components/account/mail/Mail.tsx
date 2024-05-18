import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/table";

const rows = [
  {
    key: "1",
    from: "Tony Reichert",
    message: "Hello"
  },
  {
    key: "2",
    from: "Tony Reichert",
    message: "Hello"
  },
  {
    key: "3",
    from: "Tony Reichert",
    message: "Hello HelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHello..."
  },
];

const columns = [
  {
    key: "from",
    label: "FROM",
  },
  {
    key: "message",
    label: "Message",
  },
];

export default function App() {
  return (
    <Table aria-label="Example table with dynamic content">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={rows}>
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
