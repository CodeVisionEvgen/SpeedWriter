"use client"
import { Card, CardBody } from "@nextui-org/card";
import { Tab, Tabs } from "@nextui-org/tabs";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import { AuthWithGoogleBtn } from "@/components/ui/btns";
import { Spacer } from "@nextui-org/spacer";
import { FileImageInput } from "@/components/ui/inputs";
import { useRouter } from "next/navigation";
import axios from "axios";
import { UserType } from "@/types";
import { GetUser } from "../actions/User";
import { getCookies } from "cookies-next";
import { cookies } from "next/headers";
export default function App() {

  // ADD REF TO USER IN REFRESH DB SCHEMA FOR DELETE TOKENS IN NEW AUTH


  const [selected, setSelected] = useState("login");
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [user, setUser] = useState<UserType | null>(null);
  const cookies = getCookies()
  useEffect(() => {
    if (cookies.AccessToken) {
      GetUser().then((data) => {
        setUser(data);
      });
    }
  }, []);
  useEffect(() => {
    if (user) {
      router.replace('/account')
    }
  }, [user])
  async function handleSigninSubmit(e: FormEvent) {
    e.preventDefault();
    const data = axios.formToJSON(e.currentTarget);
    try {
      await axios.post("/api/auth/signin/", data);
      window.location.replace('/')
    } catch (err: any) {
      const { message } = err.response.data
      setError(Array.isArray(message) ? message[0] : message);
    }
  }
  async function handleSignupSubmit(e: FormEvent) {
    e.preventDefault();
    const data = axios.formToJSON(e.currentTarget);
    try {
      await axios.post('/api/auth/signup/', data, { headers: { "Content-Type": "multipart/form-data" }, })
      window.location.replace('/')
    }
    catch (err: any) {
      const { message } = err.response.data
      setError(Array.isArray(message) ? message[0] : message);
    }
  }
  return (
    <div className="flex w-full h-[50vh] justify-center">
      <Card className="max-w-full w-[340px] h-max">
        <CardBody className="overflow-hidden">
          <div className="flex w-full justify-center p-5">
            <Image src={"/favicon.ico"} alt="logo" width={70} height={70} />
          </div>
          {error && <div className=" bg-default-100 p-2 rounded text-[14px] before:content-['ⓘ'] before:p-1 text-danger-500 ml-2">{error}</div>}
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
              <form className="flex flex-col gap-4" onSubmit={handleSigninSubmit}>
                <Input isRequired label="Email" name="UserEmail" placeholder="Enter your email" type="email" />
                <Input
                  isRequired
                  label="Password"
                  name="UserPassword"
                  placeholder="Enter your password"
                  type="password" />
                <div className="flex gap-2 justify-end">
                  <Button fullWidth color="default" type="submit">
                    Login
                  </Button>
                </div>
              </form>
            </Tab>
            <Tab key="sign-up" title="Sign up">
              <form className="flex flex-col gap-4 h-[300px]" onSubmit={handleSignupSubmit}>
                <Input isRequired label="Name" name="UserName" placeholder="Enter your name" type="text" />
                <Input isRequired label="Email" name="UserEmail" placeholder="Enter your email" type="email" />
                <Input
                  name="UserPassword"
                  isRequired
                  label="Password"
                  placeholder="Enter your password"
                  type="password" />
                <FileImageInput />
                <div className="flex gap-2 justify-end">
                  <Button fullWidth color="default" type="submit">
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
