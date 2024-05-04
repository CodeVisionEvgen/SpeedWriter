"use client"
import Section from "@/components/Section";
import { LevelsDifficulty } from "@/components/admin/table";
import { ILevel } from "@/types";
import { Table, TableHeader, TableColumn, TableBody, TableCell, TableRow } from "@nextui-org/table";
import { useEffect, useState } from "react";
import { FetchLevels } from "../actions/Levels";
function RenderList(item: ILevel) {
  return (
    <TableRow key={Math.random()}>
      <TableCell>{item.LevelPosition}</TableCell>
      <TableCell>{item.LevelName}</TableCell>
      <TableCell>{LevelsDifficulty.filter(lvl => item.LevelDifficulty == lvl.value)[0].element}</TableCell>
    </TableRow>
  )
}
export default function Page() {
  const [levels, setLevels] = useState<ILevel[]>();
  useEffect(() => {
    FetchLevels().then((lvls) => {
      if (lvls) {
        setLevels(lvls)
      }
    });
  }, [])
  return (
    <Section>
      <Table aria-label="collection table" selectionMode="single">
        <TableHeader>
          <TableColumn>Level Position</TableColumn>
          <TableColumn>Level Name</TableColumn>
          <TableColumn>Level Difficulty</TableColumn>
        </TableHeader>
        <TableBody emptyContent="No levels available" items={levels as any}>
          {levels ? RenderList : []}
        </TableBody>
      </Table>
    </Section >
  )
}
