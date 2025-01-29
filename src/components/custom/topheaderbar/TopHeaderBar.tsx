import Image from "next/image";
import { ThemeToggle } from "../ThemeToggle";
import { Label } from "@/components/ui";

const TopHeaderBar = () => {
  return (
    <div className="flex items-center justify-between p-4">
      {/* TITLE BAR */}
      <div className="flex items-center text-9xl font-bold">
        <Label>Email Anyalyze System V1</Label>
      </div>
      {/* ICONS AND USER */}
      <div className="flex items-center gap-6 justify-end">
        <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">
          <Image src="/image/message.png" alt="" width={20} height={20} />
        </div>
        <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative">
          <Image src="/image/announcement.png" alt="" width={20} height={20} />
          <div className="absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-purple-500 text-white rounded-full text-xs">
            1
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-xs leading-3 font-medium">John Doe</span>
          <span className="text-[10px] text-gray-500 text-right">Admin</span>
        </div>
        <Image
          src="/image/avatar.png"
          alt=""
          width={36}
          height={36}
          className="rounded-full"
        />
          <div className="border-l pl-4 dark:border-gray-800">
            <ThemeToggle />
          </div>
      </div>
    </div>
  );
};

export default TopHeaderBar;
