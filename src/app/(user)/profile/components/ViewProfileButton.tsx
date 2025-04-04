"use client";

import Link from "next/link";
import { useGetCurrentUser } from "@/services/user";
import { ArrowLeftIcon, UserIcon } from "lucide-react";

export default function ViewProfileButton() {
  const { data: currentUser } = useGetCurrentUser();

  return (
    <Link href={`/author/${currentUser?.id}`} className="flex gap-x-2 items-center py-3 px-2">
      <div className="bg-background rounded-[8px] p-2">
        <UserIcon className="size-5 " />
      </div>

      <span className="text-sm  mt-[2px]">مشاهده پروفایل از نگاه دیگران</span>

      <ArrowLeftIcon className="size-5 ms-auto me-1" />
    </Link>
  );
}
