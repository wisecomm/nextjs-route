"use client"

import { useEffect, useState } from "react"
import { User } from "@/types"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { api } from "@/app/api/axiosClient"

export default function UsersPage() {
    const [data, setData] = useState<User[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get<User[]>("/users")
                // The mock server returns { code, data, message }, and axiosClient returns that object.
                // So response.data is the array of users.
                if (response.data && Array.isArray(response.data)) {
                    setData(response.data)
                } else {
                    console.error("Invalid data format received:", response)
                    setData([])
                }
            } catch (error) {
                console.error("Failed to fetch users:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    if (loading) {
        return <div className="p-8">Loading...</div>
    }

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-2xl font-bold mb-5">User Management</h1>
            <DataTable columns={columns} data={data} />
        </div>
    )
}
