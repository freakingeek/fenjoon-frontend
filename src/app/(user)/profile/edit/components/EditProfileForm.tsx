"use client";

import { useForm } from "react-hook-form";
import { useGetCurrentUser, useUpdateCurrentUser } from "@/services/user";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/classnames";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type Inputs = {
  firstName: string;
  lastName: string;
  nickname: string;
  phone: string;
  bio: string;
};

type EditProfileFormProps = {
  className?: string;
};

export default function EditProfileForm({ className }: EditProfileFormProps) {
  const router = useRouter();
  const { data: currentUser, isPending: isCurrentUserApiPending } = useGetCurrentUser();
  const { mutate: updateCurrentUser } = useUpdateCurrentUser({
    onSuccess: () => {
      toast.success("ویرایش پروفایل با موفقیت انجام شد");
      router.push("/profile");
    },
    onError: () => {
      toast.error("خطا در ویرایش پروفایل");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    values: currentUser
      ? {
          firstName: currentUser.firstName,
          lastName: currentUser.lastName,
          nickname: currentUser.nickname,
          phone: currentUser.phone,
          bio: currentUser.bio,
        }
      : undefined,
  });

  const onSubmit = handleSubmit((data) => {
    updateCurrentUser(data);
  });

  return (
    <form className={cn("flex flex-col", className)} onSubmit={onSubmit}>
      <div className="flex gap-x-2">
        <Input type="text" autoComplete="off" placeholder="نام" {...register("firstName")} />
        {errors.firstName && <span className="text-danger">{errors.firstName.message}</span>}

        <Input
          type="text"
          autoComplete="off"
          placeholder="نام خانوادگی"
          {...register("lastName")}
        />
        {errors.lastName && <span className="text-danger">{errors.lastName.message}</span>}
      </div>

      <Input
        type="text"
        autoComplete="off"
        placeholder="نام مستعار"
        {...register("nickname")}
        className="mt-2"
      />
      {errors.nickname && <span className="text-danger">{errors.nickname.message}</span>}

      <Input
        type="text"
        autoComplete="off"
        placeholder="معرفی کوتاه (حداکثر ۱۰۰ حرف)"
        {...register("bio")}
        className="mt-2"
      />
      {errors.bio && <span className="text-danger">{errors.bio.message}</span>}

      <Input
        type="text"
        autoComplete="off"
        placeholder="شماره همراه"
        {...register("phone")}
        className="ltr placeholder:text-right mt-2"
        disabled
      />
      {errors.phone && <span className="text-danger">{errors.phone.message}</span>}

      <Button
        type="submit"
        disabled={isSubmitting || isCurrentUserApiPending}
        className="w-full mt-auto"
      >
        {isSubmitting ? "در حال ویرایش ..." : "ویرایش اطلاعات"}
      </Button>
    </form>
  );
}
