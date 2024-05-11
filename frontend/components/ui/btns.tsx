import { Button, ButtonProps } from "@nextui-org/button"
import { GoogleColorIcon } from "../icons"

export const AuthWithGoogleBtn = (props: ButtonProps) => {
  return (
    <Button className=" bg-white text-gray-500" startContent={<GoogleColorIcon />} {...props}>Login with Google</Button>
  )
}