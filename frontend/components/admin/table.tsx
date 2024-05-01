"use client"
import { LevelDifficultyEmuns, LevelHeadersType } from '@/types';
import { Chip } from '@nextui-org/chip';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table'
import React, { useState } from 'react'

export const LevelsDifficulty = [
  { key: 1, value: "easy", element: <Chip color='success' variant="dot" key={Math.random()}>Easy</Chip> },
  { key: 2, value: "medium", element: <Chip color='warning' variant="dot" key={Math.random()}>Medium</Chip> },
  { key: 3, value: "hard", element: <Chip color='danger' variant="dot" key={Math.random()}>Hard</Chip> }
]

const LevelsHeaders: LevelHeadersType[] = [
  {
    LevelPosition: 1,
    LevelName: "Shekspir - Sonet 30",
    LevelDifficulty: LevelDifficultyEmuns.Easy
  },
  {
    LevelPosition: 2,
    LevelName: "Bach - Toccata and Fugue in D minor",
    LevelDifficulty: LevelDifficultyEmuns.Medium
  },
  {
    LevelPosition: 3,
    LevelName: "Beethoven - Symphony 5",
    LevelDifficulty: LevelDifficultyEmuns.Hard
  }
]

function RenderList(item: LevelHeadersType) {
  return (
    <TableRow key={item.LevelPosition}>
      <TableCell>{item.LevelPosition}</TableCell>
      <TableCell>{item.LevelName}</TableCell>
      <TableCell>{LevelsDifficulty.filter(lvl => item.LevelDifficulty == lvl.value)[0].element}</TableCell>
    </TableRow>
  )
}

export default function AdminTableLevels({ switchSelect }: any) {
  return (
    <Table aria-label="Example static collection table" selectionMode={switchSelect}>
      <TableHeader>
        <TableColumn>Level Position</TableColumn>
        <TableColumn>Level Name</TableColumn>
        <TableColumn>Level Difficulty</TableColumn>
      </TableHeader>
      <TableBody items={LevelsHeaders}>
        {RenderList}
      </TableBody>
    </Table>
  )
}
