import { Button } from "@nextui-org/button"
import Image from "next/image"
import { GoogleColorIcon } from "../icons"


export const AuthWithGoogleBtn = (cb: any) => {
  return (
    <Button onClick={cb} className=" bg-white text-gray-500" startContent={<GoogleColorIcon />}>Login with Google</Button>
  )
}