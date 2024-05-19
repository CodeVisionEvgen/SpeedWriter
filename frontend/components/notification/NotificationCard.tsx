"use client"

import { GetUser } from "@/app/actions/User";
import { UserType } from "@/types"
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { useEffect, useState } from "react"
import { calcUnReadMessages } from "../user";
import Image from "next/image";
import logo from "@/public/favicon.ico"
import { CloseIcon, MailIcon } from "../icons";
import { motion as Motion } from "framer-motion"
import { useRouter } from "next/navigation";
import { Divider } from "@nextui-org/divider";
import { Button } from "@nextui-org/button";
import { getCookie, getCookies } from "cookies-next";

export default function NotificationCard() {
  const [user, setUser] = useState<UserType | null>(null);
  const router = useRouter()

  const MonitionVariantNotify = {
    show: {
      opacity: 1,
      x: 0,
      transition: {
        ease: 'linear',
        duration: .5
      }
    },
    hide: {
      x: 30,
      opacity: 0
    }
  }

  useEffect(() => {
    setTimeout(() => {
      if (getCookie("AccessToken")) {
        GetUser().then((data) => {
          setUser(data);
        })
      }
    }, 1000)
  }, [])
  return (
    <>
      {user && calcUnReadMessages(user.notifies) &&
        <Motion.div animate={'show'} initial="hide" variants={MonitionVariantNotify}>
          <Card className=" p-2 select-none cursor-pointer hover:bg-default-100">
            <CardBody className="grid">
              <span className=" z-50 w-full flex justify-end">
                <Button isIconOnly variant="light" className="w-3 h-5" startContent={<CloseIcon className="w-max" fill="#444" />} /></span>
              <div className="flex -z-0 items-end gap-2">
                <Image src={logo} width={50} height={50} alt="logo" />
                <div className="grid">
                  <span>You have <p className=" inline text-secondary-500">{calcUnReadMessages(user.notifies)}</p> unread messages</span>
                  <Button startContent={<MailIcon fill="currentColor" />} variant="ghost" onClick={() => { router.push('/account?state=mail') }} size="sm" color="secondary" className=" text-md">Open</Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </Motion.div>
      }
    </>
  )
}
