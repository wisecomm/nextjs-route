'use client'

import React, { useState } from 'react'
import { DalAlertDialog } from '@/components/custom/ui/dal-alert-dialog'
import { Button } from '@/components/ui/button'

function DialogPage() {
  const [open, setOpen] = useState(false)

  const handleConfirm = () => {
    console.log("확인 버튼 클릭됨");
    // 여기에 확인 시 실행할 로직 추가
  };

  const handleCancel = () => {
    console.log("취소 버튼 클릭됨");
    // 여기에 취소 시 실행할 로직 추가
  };

  return (
    <div className="flex items-center px-2">
      <Button variant="outline" size="lg" onClick={() => setOpen(true)}>
        추가
      </Button>
      <DalAlertDialog 
        open={open}
        onOpenChange={setOpen}
        title='정말 삭제하시겠습니까?'
        description='이 작업은 되돌릴 수 없습니다.'
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </div>
  )
}

export default DialogPage