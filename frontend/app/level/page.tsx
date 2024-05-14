"use client"
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import { Button, ButtonGroup } from '@nextui-org/button';
import { useRouter } from 'next/navigation';
import { GetLevelById } from '../actions/Levels';
import { ILevel } from '@/types';



export default function Page() {
  const [level, setLevel] = useState<ILevel | null>(null)
  const [gameText, setGameText] = useState<string>("  ");
  const [hasErr, setHasErr] = useState<boolean>(false);
  const [countErrors, setCountErrors] = useState<number>(0);
  const { onOpen, isOpen, onClose } = useDisclosure();
  const searchParams = useSearchParams();
  const router = useRouter();



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
            Level 1
          </ModalHeader>
          <ModalBody>
            <div>
              <p>Errors: {countErrors}</p>
            </div>
            <ButtonGroup>
            </ButtonGroup>
          </ModalBody>
        </ModalContent>
      </Modal>
      <div className={`p-4 border ${hasErr ? "border-red-600" : "border-gray-800"} rounded-xl`}>
        <p>{gameText}</p>
      </div>
    </>
  );
}
