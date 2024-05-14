"use client"
import Section from "@/components/Section";
import { LevelsDifficulty } from "@/components/admin/table";
import { ILevel } from "@/types";
import { Table, TableHeader, TableColumn, TableBody, TableCell, TableRow } from "@nextui-org/table";
import { useEffect, useState } from "react";
import { FetchLevels } from "../actions/Levels";
import { Spinner } from "@nextui-org/spinner";
import { useRouter } from "next/navigation";
export default function Page() {
  const [levels, setLevels] = useState<ILevel[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  function RenderList(item: ILevel) {
    return (
      <TableRow key={item._id} onClick={() => {
        router.push(`/level?id=${item._id}`)
      }}>
        <TableCell>{item.LevelPosition}</TableCell>
        <TableCell>{item.LevelName}</TableCell>
        <TableCell>{LevelsDifficulty.filter(lvl => item.LevelDifficulty == lvl.value)[0].element}</TableCell>
      </TableRow>
    )
  }
  useEffect(() => {
    setIsLoading(true);
    FetchLevels().then(({ data }: any) => {
      if (data) {
        setIsLoading(false);
        setLevels(data)
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
        <TableBody loadingContent={<Spinner />} isLoading={isLoading} emptyContent="No levels available" items={levels as any}>
          {levels ? RenderList : []}
        </TableBody>
      </Table>
    </Section >
  )
}
