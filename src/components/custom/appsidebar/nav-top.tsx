import React from 'react'
import Image from "next/image";
import { Separator, SidebarTrigger } from '@/components/ui';

function NavTop() {
  return (
    <div className="flex items-center gap-2 p-4">
        <Image
          src="/image/myimage/dalcomlab-log.avif"
          alt=""
          width={42}
          height={42}
        />
        <div className="flex flex-col">
          <span className="text-xs leading-3 font-medium">Dalcomlab Ai</span>
          <span className="text-[10px] text-gray-500">Email analyze</span>
        </div>
    </div>
  )
}

export default NavTop