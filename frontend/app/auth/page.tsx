"use client"
import { Card, CardBody } from "@nextui-org/card";
import { Tab, Tabs } from "@nextui-org/tabs";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import Image from "next/image";
import { AuthWithGoogleBtn } from "@/components/ui/btns";
import { Spacer } from "@nextui-org/spacer";
import { FileImageInput } from "@/components/ui/inputs";
import { useRouter } from "next/navigation";
export default function App() {
  const [selected, setSelected] = useState("login");
  const router = useRouter();
  return (
    <div className="flex w-full h-[50vh] justify-center">
      <Card className="max-w-full w-[340px] h-max">
        <CardBody className="overflow-hidden">
          <div className="flex w-full justify-center p-5">
            <Image src={"/favicon.ico"} alt="logo" width={70} height={70} />
          </div>
          <Tabs
            // placement="bottom"
            color="primary"
            variant="underlined"
            classNames={{
              cursor: " bg-[#292929]"
            }}
            fullWidth
            size="md"
            aria-label="Tabs form"
            selectedKey={selected}
            // @ts-ignore
            onSelectionChange={setSelected}
          >
            <Tab key="login" title="Login">
              <form className="flex flex-col gap-4">
                <Input isRequired label="Email" placeholder="Enter your email" type="email" />
                <Input
                  isRequired
                  label="Password"
                  placeholder="Enter your password"
                  type="password" />
                <FileImageInput />

                <div className="flex gap-2 justify-end">
                  <Button fullWidth color="default">
                    Login
                  </Button>
                </div>
              </form>
            </Tab>
            <Tab key="sign-up" title="Sign up">
              <form className="flex flex-col gap-4 h-[300px]">
                <Input isRequired label="Name" placeholder="Enter your name" type="password" />
                <Input isRequired label="Email" placeholder="Enter your email" type="email" />
                <Input
                  isRequired
                  label="Password"
                  placeholder="Enter your password"
                  type="password" />
                <FileImageInput />
                <div className="flex gap-2 justify-end">
                  <Button fullWidth color="default">
                    Sign up
                  </Button>
                </div>
              </form>
            </Tab>
          </Tabs>
          <Spacer y={9} />
          <AuthWithGoogleBtn onClick={() => {
            router.replace('/api/auth/google/callback')
          }} />
        </CardBody>
      </Card>
    </div >
  );
}