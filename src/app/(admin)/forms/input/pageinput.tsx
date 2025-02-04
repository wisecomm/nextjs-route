"use client"

import React, {useActionState, useState} from 'react'
import { Form } from '@/components/ui/form'
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui'
import { formatErrorMessages } from "@/app/utils/utils";
import { saveUser } from './userActions'

const accountFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
})

type AccountFormValues = z.infer<typeof accountFormSchema>

const defaultValues: Partial<AccountFormValues> = {
  // name: "Your name",
  // dob: new Date("2023-01-23"),
}
function PageInput() {

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  })
  
  function onSubmit(data: AccountFormValues) {
    console.log(data)

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

    const [errorMessages, setErrorMessages] = useState("");
    // const [state, formAction] = useActionState(saveUser, {
    //   error: false,
    //   success: false,
    // });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const fields = Object.fromEntries(formData);
    // console.log(fields);

    const validation = accountFormSchema.safeParse(fields);
    if (!validation.success) {
      // console.log(validation.error.flatten().fieldErrors);
      setErrorMessages(
        formatErrorMessages(validation.error.flatten().fieldErrors)
      );
    } else {
//      formAction({ formData });
    }
  };


  return (
    <div className="border border-gray-600 w-[600px] rounded-lg p-8">
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name : </label>
        <input type="text" id="name" name="name" />
      </div>
      <div>
        <label htmlFor="age">Age : </label>
        <input type="text" id="age" name="age" />
      </div>
      <br />
      <br />
      <Button type="submit">Update account</Button>
      </form>
    </div>

  )
}

export default PageInput