import React from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, Button, Input, Label } from '@/components/ui';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export function FormModalDemo({
  open,
  onOpenChange,
  onConfirm,
  onCancel,
}: Props) {


  const handleConfirm = () => {
    //    formData.reset();
    onConfirm?.();
    onOpenChange(false);
  };

  const handleCancel = () => {
    //    formData.reset();
    onCancel?.();
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-[425px] pt-2">
        <AlertDialogHeader>
        <AlertDialogTitle className="text-center text-xl font-bold border-b-2">
            타이틀 제목
          </AlertDialogTitle>
          <form>
            <div className="grid gap-4 py-2">
              <div className="grid grid-cols-4 items-center gap-1">
                <Label
                  htmlFor="username"
                  className="text-center border-2 border-black-500 bg-yellow-400 rounded-md py-2"
                >
                  이름
                </Label>
                <Input
                  id="username"
                  placeholder="이름을 입력하세요"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-1">
                <Label
                  htmlFor="age"
                  className="text-center border-2 border-black-500 bg-yellow-400 rounded-md py-2"
                >
                  나이
                </Label>
                <Input
                  id="age"
                  type="number"
                  min="0"
                  step="1"
                  placeholder="나이를 입력하세요"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-1">
                <Label
                  htmlFor="hobby"
                  className="text-center border-2 border-black-500 bg-yellow-400 rounded-md py-2"
                >
                  취미
                </Label>
                <Input
                  id="hobby"
                  placeholder="취미를 입력하세요"
                  className="col-span-3"
                />
              </div>
            </div>
          </form>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>취소</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>저장</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};