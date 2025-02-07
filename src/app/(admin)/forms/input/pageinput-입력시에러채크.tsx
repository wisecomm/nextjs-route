"use client"

import React from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { toast } from '@/hooks/use-toast'
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input } from '@/components/ui'
import { cn } from '@/lib/utils'
import { Separator } from '@radix-ui/react-dropdown-menu'

function PageInput() {

  const accountFormSchema = z.object({
    username: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    age: z.number(),
  })

  const form = useForm<z.infer<typeof accountFormSchema>>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      username: "",
      age: 20,
    },
  })

  function onSubmit(values: z.infer<typeof accountFormSchema>) {
    console.log(values)

    toast({
      title: "You onSubmit the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
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
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="relative space-y-3 overflow-x-hidden"
            >
              <FormField name="username" render={({ field }) => (
                  <FormItem>
                    <FormLabel>사용자 이름 : </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField control={form.control} name="age" render={({ field }) => (
                  <FormItem>
                    <FormLabel>나이 : </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Separator/>
              <Button type="submit">전송</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>

  )
}

export default PageInput