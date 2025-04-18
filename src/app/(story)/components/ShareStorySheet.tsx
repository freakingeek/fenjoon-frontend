"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { postMessage } from "@/lib/utils/app";
import { Button } from "@/components/ui/button";
import { isApp } from "@/lib/utils/environment";
import StorySharePreview from "./StorySharePreview";
import { useGetSingleStory, useShareStory } from "@/services/stories";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

type ShareStorySheetProps = {
  storyId: number;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function ShareStorySheet({ storyId, isOpen, onOpenChange }: ShareStorySheetProps) {
  const [imageBlob, setImageBlob] = useState<Blob>();
  const { data: story, isPending: isStoryPending } = useGetSingleStory({ id: storyId });
  const { mutate } = useShareStory();

  const shareStory = async () => {
    if (!imageBlob || !story?.text || !story.id) return;

    mutate({ id: story.id });

    if (isApp()) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        postMessage("share", { message: story.text, url: String(fileReader.result) });
      };

      fileReader.readAsDataURL(imageBlob);
      return;
    }

    const data = {
      text: story.text,
      files: [new File([imageBlob], `fenjoon-story-${story.id}.png`, { type: imageBlob.type })],
    };

    if (!("share" in navigator) || !navigator.canShare(data)) {
      toast.error("مرورگر شما از این قابلیت پشتیبانی نمی‌کند");
      return;
    }

    await navigator.share(data);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>اشتراک‌گذاری</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>

        <StorySharePreview
          storyId={storyId}
          className="border border-border rounded-sm overflow-hidden select-none"
          onImageCreate={setImageBlob}
        />

        <SheetFooter className="flex gap-x-2 items-end pb-5">
          <SheetClose asChild>
            <Button variant="outline" className="basis-24">
              بستن
            </Button>
          </SheetClose>

          <Button type="submit" disabled={isStoryPending} className="flex-1" onClick={shareStory}>
            اشتراک‌گذاری
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
