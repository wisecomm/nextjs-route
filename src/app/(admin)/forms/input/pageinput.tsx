"use client"

import React from 'react'
import { useForm } from "react-hook-form"
import { z } from "zod"

import { toast } from '@/hooks/use-toast'
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input } from '@/components/ui'
import { cn } from '@/lib/utils'

function PageInput() {

  const accountFormSchema = z.object({
    username: z.string().min(2, {
      message: "사용자 이름을 입력하세요.",
    }),
    age: z.number(),
    hobby: z.string().min(2, {
      message: "취미를 입력하세요.",
    }),
  })
  type AccountFormValues = z.infer<typeof accountFormSchema>
  const defaultValues: Partial<AccountFormValues> = {
    username: "홍길동",
    age: 20,
    hobby: '',
  }
  const form = useForm<AccountFormValues>({
    defaultValues,
  })

  function onSubmit(data: AccountFormValues) {
    console.log(data)

    const result = accountFormSchema.safeParse(data)
    if (!result.success) {
      console.log("입력필드 에러 : " + result.error)
      const firstError = result.error.errors[0]
      toast({
        title: "Validation Error",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(firstError.message, null, 2)}</code>
          </pre>
        ),
      })
      return
    }

    toast({
      title: "You onSubmit the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <Card className={cn("w-[380px]")}>
        <CardHeader>
          <CardTitle>계정을 생성합니다</CardTitle>
          <CardDescription>필수 정보를 입력헤볼게요.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="username">Username</label>
              <Input {...form.register('username')} id="username" placeholder="Enter your username" />
            </div>
            <div className="mb-4">
              <label htmlFor="age">Age</label>
              <Input {...form.register('age')} id="age" type="number" placeholder="Enter your age" />
            </div>
            <div className="mb-4">
              <label htmlFor="hobby">취미</label>
              <Input {...form.register('hobby')} id="hobby" />
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </CardContent>
      </Card>
    </div>

  )
}

export default PageInput