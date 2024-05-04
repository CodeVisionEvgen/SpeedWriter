"use client"
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import { Button, ButtonGroup } from '@nextui-org/button';
import { useRouter } from 'next/navigation';



export default function Page() {
  const [level, setLevel] = useState<number>();
  const [gameText, setGameText] = useState<string>("A game");
  const [hasErr, setHasErr] = useState<boolean>(false);
  const [countErrors, setCountErrors] = useState<number>(0);
  const { onOpen, isOpen, onClose } = useDisclosure();
  const searchParams = useSearchParams();
  const router = useRouter();

  function ToNextLevel() {
    if (level) {
      onClose()
      router.push(`/level?q=${level + 1}`);
    }
  }

  function refreshLevel() {
    if (level) {
      onClose()
      router.push(`/level?q=${level}`);
    }
  }

  useEffect(() => {

  }, [level]);

  useEffect(() => {
    let level = searchParams.get('q');

    if (level) {
      setLevel(+level)
    } else {

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

    return () => {
      document.removeEventListener('keypress', handleKeyPress);
    };
  }, [gameText]);

  useEffect(() => {
    if (gameText.length <= 1) {
      onOpen();
    }
  }, [gameText, countErrors]);

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
              <Button variant="bordered" onClick={refreshLevel} color="secondary">Again</Button>
              <Button variant="bordered" onClick={ToNextLevel} color='success'>Next</Button>
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
