"use client"
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import { Button, ButtonGroup } from '@nextui-org/button';
import { useRouter } from 'next/navigation';
import { GetLevelById } from '../actions/Levels';
import { ILevel } from '@/types';
// @ts-expect-error;
import convertTime from "convert-seconds";


export default function Page() {
  const [level, setLevel] = useState<ILevel | null>(null)
  const [gameText, setGameText] = useState<string>("  ");
  const { onOpen, isOpen, onClose } = useDisclosure();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [hasErr, setHasErr] = useState<boolean>(false);
  const [countErrors, setCountErrors] = useState<number>(0);
  const [time, setTime] = useState<number>(0);


  useEffect(() => {
    let id = searchParams.get('id');
    if (id) {
      const Level = GetLevelById(id)
      Level.then((levelInfo) => {
        let data: ILevel | null = levelInfo?.data;
        if (data) {
          setLevel(data);
          setGameText(data.LevelText);
        } else {
          router.replace('/levels')
        }
      });
    } else {
      router.replace('/levels')
    }
  }, [])
  useEffect(() => {
    if (gameText.length) {
      var id = setInterval(() => {
        setTime(time + 1)
      }, 1000);
    }
    return () => clearInterval(id);
  }, [time])

  useEffect(() => {
    const handleKeyPress = ({ key }: {
      key: string
    }) => {
      if (key !== gameText[0]) {
        setCountErrors((prevCountErrors) => prevCountErrors + 1);
        setHasErr(true);
      } else {
        setHasErr(false);
        setGameText((prevGameText) => prevGameText.slice(1));
      }
    };

    document.addEventListener('keypress', handleKeyPress);
    if (gameText.length <= 0) {
      onOpen();
    }
    return () => {
      document.removeEventListener('keypress', handleKeyPress);
    };
  }, [gameText]);

  return (

    <>
      <Modal size="full" isDismissable={false} isOpen={isOpen} onClose={onClose} hideCloseButton backdrop='blur'>
        <ModalContent>
          <ModalHeader>
            {level?.LevelName}
          </ModalHeader>
          <ModalBody>
            <div>
              <p>Time: {convertTime(time).minutes} minutes {convertTime(time).seconds} seconds</p>
              <p>Mistakes: {countErrors}</p>
            </div>
            <ButtonGroup>
            </ButtonGroup>
          </ModalBody>
        </ModalContent>
      </Modal>
      <div className={`p-4  ${hasErr && " border border-danger-500"} bg-default-100 rounded-sm justify-center flex`}>
        <p className=' bg-default-200 overflow-hidden text-left p-4 text-lg rounded-xl w-11/12'>{gameText}</p>
      </div>
    </>
  );
}
