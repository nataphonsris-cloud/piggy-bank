"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"

interface CreatePiggyBankFormProps {
  onCreatePiggyBank: (ownerName: string) => void
}

export function CreatePiggyBankForm({ onCreatePiggyBank }: CreatePiggyBankFormProps) {
  const [ownerName, setOwnerName] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (ownerName.trim()) {
      onCreatePiggyBank(ownerName.trim())
      setOwnerName("")
    }
  }

  return (
    <Card className="border-2 border-dashed border-border hover:border-primary/50 transition-colors">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="w-5 h-5" />
          สร้างกระปุกออมสินใหม่
        </CardTitle>
        <CardDescription>ใส่ชื่อเจ้าของกระปุกออมสินเพื่อเริ่มต้นการออมเงิน</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex gap-3">
          <Input
            type="text"
            placeholder="เช่น น้องพอใจ"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" disabled={!ownerName.trim()} className="bg-primary hover:bg-primary/90">
            สร้าง
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
