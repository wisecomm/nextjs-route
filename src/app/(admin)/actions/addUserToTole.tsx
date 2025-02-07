import React from 'react'

export type CreatePostFormState = {
    success: boolean
    message: string
} | null

export async function addUserToTole(prevState: CreatePostFormState, formData: any) {

    await new Promise(resolve => setTimeout(resolve, 2000))
    return {
        success: true,
        message: "User added to role successfully",
    }
}

export default addUserToTole