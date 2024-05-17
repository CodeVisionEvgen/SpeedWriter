"use client"
import Section from "@/components/Section";
import { LevelsDifficulty } from "@/components/admin/table";
import { GetLevelsByPageType, ILevel, RequestArgsType } from "@/types";
import { Table, TableHeader, TableColumn, TableBody, TableCell, TableRow } from "@nextui-org/table";
import { useEffect, useState } from "react";
import { FetchLevels, GetLevelByPage } from "../actions/Levels";
import { Spinner } from "@nextui-org/spinner";
import { useRouter } from "next/navigation";
import { Pagination } from "@nextui-org/pagination";
import page from "../page";
import SearchInput from "@/components/search";
export default function Page() {
  const [levels, setLevels] = useState<ILevel[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [reload, setReload] = useState<number>(0)
  const [maxPages, setMaxPages] = useState<number>(1);
  const [requestArgs, setRequestArgs] = useState<RequestArgsType>({
    diff: "every",
    query: "",
  })
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
    GetLevelByPage(page, requestArgs.diff, requestArgs.query).then(({ data }: any) => {
      let lvl = data as GetLevelsByPageType;
      if (lvl) {
        setLevels(lvl.docs);
        setMaxPages(lvl.maxPages);
        setIsLoading(false);
      }
    })
  }, [page, reload])
  return (
    <Section>
      <span className="p-2 flex justify-between">
        <h2 className=" text-[20px] text-default-500 tracking-wider">All levels</h2>
        <SearchInput setReload={setReload} requestArgs={requestArgs} setRequestArgs={setRequestArgs} />
      </span>
      <Table bottomContent={
        levels && levels.length > 0 ? (
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="default"
              page={page}
              total={maxPages}
              onChange={(page) => setPage(page)}
            />
          </div>
        ) : null} aria-label="collection table" selectionMode="single">
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
