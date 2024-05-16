"use client"
import { useEffect, useState } from "react";
import { GetUser } from "../actions/User";
import { Card } from "@nextui-org/card";
import UserAccount from "@/components/account/user";
import AccountTabs from "@/components/account/tabs";
import { UserStatsType, UserType } from "@/types";
export default function Page() {
  const [selected, setSelected] = useState<string>('statistics')
  const [user, setUser] = useState<UserType & { stats: UserStatsType } | null>(null);
  useEffect(() => {
    GetUser().then((data) => {
      setUser(data);
    })
  }, []);

  return (
    <Card className=" p-5">
      <div className="flex gap-2">
        {user && <UserAccount setSelected={setSelected} user={user} />}
        {user && <AccountTabs selected={selected} setSelected={setSelected} user={user} />}
      </div>
    </Card>
  )
}
