"use client"
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import { Button, ButtonGroup } from '@nextui-org/button';
import { useRouter } from 'next/navigation';
import { GetLevelById } from '../actions/Levels';
import { ILevel, LevelDifficultyEmuns, UserStatsType, UserType } from '@/types';
// @ts-expect-error;
import convertTime from "convert-seconds";
import { GetUser, UpdateUserStats } from '../actions/User';
import UserChart from '@/components/account/chart/userChart';
import "@/styles/colors.css"
import Confetti from "react-confetti";
export function GetColorFromDiff(diff: LevelDifficultyEmuns) {
  const colors = {
    hard: "danger",
    medium: "warning",
    easy: "success"
  }
  return colors[diff];
}
export default function Page() {
  const [level, setLevel] = useState<ILevel | null>(null)
  const [gameText, setGameText] = useState<string>("  ");
  const { onOpen, isOpen, onClose } = useDisclosure();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [hasErr, setHasErr] = useState<boolean>(false);
  const [countErrors, setCountErrors] = useState<number>(0);
  const [time, setTime] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(0);
  const [highSpeed, setHighSpeed] = useState<number>(0);
  const [timeoutQueue, setTimeoutQueue] = useState<boolean>(false)
  const [user, setUser] = useState<UserType & { stats: UserStatsType } | null>(null)
  const [runConfetti, setRunConfetti] = useState<boolean>(true)

  useEffect(() => {
    let id = searchParams.get('id');
    if (id) {
      const Level = GetLevelById(id)
      GetUser().then((data) => {
        setUser(data)
      });
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
    if (gameText.length != 1) {
      var id = setInterval(() => {
        setTime(time + 1)
      }, 1000);
    }
    return () => clearInterval(id);
  }, [time])

  useEffect(() => {
    const handleKeyPress = async ({ key }: {
      key: string
    }) => {
      if (gameText.length <= 1) {
        await UpdateUserStats({
          _id: level?._id,
          stats: {
            Mistakes: countErrors,
            SpeedWriting: highSpeed,
          }
        });
        GetUser().then((data) => {
          setUser(data);
          onOpen();
          setTimeout(() => {
            setRunConfetti((c) => c = false);
          }, 3000)
        })
        return false
      }
      if (key !== gameText[0]) {
        setCountErrors((prevCountErrors) => prevCountErrors + 1);
        setHasErr(true);
      } else {
        setSpeed((prevSpeed) => prevSpeed + 1)
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
    setHighSpeed(highSpeed < speed ? speed : highSpeed);
    if (hasErr) {
      setSpeed(0);
    }
    if (!timeoutQueue) {
      setTimeoutQueue((q) => q = true)
      setTimeout(() => {
        setTimeoutQueue((q) => q = false)
        setSpeed((prev) => prev = 0)
      }, 3000)
    }
  }, [speed, hasErr])

  return (

    <>
      {
        level &&
        <Modal size="full" isDismissable={false} isOpen={isOpen} onClose={onClose} hideCloseButton backdrop='blur'>
          <ModalContent>
            <ModalBody className={` level-${level.LevelDifficulty}-bg flex items-center`}>
              <div className="flex mt-10 p-5 rounded-md bg-default-100  items-center justify-items-center align-middle gap-3">
                {runConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}
                <div className='grid gap-4 full'>
                  <h2 className=' text-lg text-default-500'>{level?.LevelName}</h2>
                  <div>
                    <p>Time: {convertTime(time).seconds} seconds</p>
                    <p>Mistakes: {countErrors}</p>
                    <p>Speed writing: {highSpeed} letters per 3 seconds</p>
                  </div>
                  {user && <UserChart className=' w-full' stats={user.stats} />}
                </div>
              </div>
              <Button variant="flat" onClick={() => router.replace('/levels')} color="default">Back to levels</Button>
            </ModalBody>
          </ModalContent>
        </Modal>
      }
      <div className={`p-4  ${hasErr && " border border-danger-500"} bg-default-100 rounded-sm justify-center flex`}>
        <p className=' bg-default-200 overflow-hidden text-left p-4 text-lg rounded-xl w-11/12'>{gameText}</p>
      </div>
    </>
  );
}
