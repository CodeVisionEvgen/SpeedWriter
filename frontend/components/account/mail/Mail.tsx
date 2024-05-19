import React, { useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/table";
import { Avatar } from "@nextui-org/avatar";
import { Chip } from "@nextui-org/chip";
import { UserNotify, UserType } from "@/types";
import { GetUser } from "@/app/actions/User";
// @ts-expect-error
import dateFormat from "date-format";

function renderRow(data: UserNotify) {
  return (
    <TableRow key={data.createdAt}>
      <TableCell><div className="flex gap-5"><Avatar size="sm" radius="sm" src={"/favicon.ico"} /><Chip radius="sm" variant="flat" color="secondary">SpeedWriter</Chip></div></TableCell>
      <TableCell>{data.message}</TableCell>
      <TableCell>{dateFormat.asString("dd-MM-yy", new Date(data.createdAt))}</TableCell>
    </TableRow>
  )
}

export default function App() {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    GetUser().then((data) => {
      setUser(data);
    })
  }, [])
  return (
    <>
      {user &&
        <Table isCompact removeWrapper aria-label="Mail" >
          <TableHeader>
            <TableColumn className=" bg-default-50" key="From">From</TableColumn>
            <TableColumn className=" bg-default-50" key="Message">Message</TableColumn>
            <TableColumn className=" bg-default-50" key="Date">Date</TableColumn>
          </TableHeader>
          <TableBody items={user?.notifies}>
            {renderRow}
          </TableBody>
        </Table >
      }
    </>
  );
}
