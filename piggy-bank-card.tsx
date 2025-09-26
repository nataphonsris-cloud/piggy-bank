"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PiggyBank, Plus, Wallet } from "lucide-react"

interface PiggyBankProps {
  id: string
  ownerName: string
  money: number
  createdAt: Date
}

interface PiggyBankCardProps {
  piggyBank: PiggyBankProps
  onAddMoney: (amount: number) => void
}

export function PiggyBankCard({ piggyBank, onAddMoney }: PiggyBankCardProps) {
  const [amount, setAmount] = useState("")
  const [isAdding, setIsAdding] = useState(false)

  const handleAddMoney = (e: React.FormEvent) => {
    e.preventDefault()
    const numAmount = Number.parseFloat(amount)
    if (numAmount > 0) {
      onAddMoney(numAmount)
      setAmount("")
      setIsAdding(false)

      // Show success message (simulate console.log from Java version)
      console.log(`หยอดเงินใส่กระปุกของ ${piggyBank.ownerName} จำนวน ${numAmount} บาท`)
    }
  }

  const showMoney = () => {
    console.log(`กระปุกของ ${piggyBank.ownerName} มีเงินทั้งหมด ${piggyBank.money} บาท`)
  }

  return (
    <Card className="hover:shadow-lg transition-all duration-200 border border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <PiggyBank className="w-6 h-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">{piggyBank.ownerName}</CardTitle>
              <CardDescription className="text-sm">
                สร้างเมื่อ {piggyBank.createdAt.toLocaleDateString("th-TH")}
              </CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Money Display */}
        <div className="bg-gradient-to-r from-secondary/10 to-accent/10 rounded-lg p-4 border border-border">
          <div className="flex items-center gap-2 mb-1">
            <Wallet className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium text-muted-foreground">ยอดเงินในกระปุก</span>
          </div>
          <p className="text-2xl font-bold text-foreground">
            ฿{piggyBank.money.toLocaleString("th-TH", { minimumFractionDigits: 2 })}
          </p>
        </div>

        {/* Add Money Form */}
        {isAdding ? (
          <form onSubmit={handleAddMoney} className="space-y-3">
            <Input
              type="number"
              step="0.01"
              min="0.01"
              placeholder="จำนวนเงิน (บาท)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-center"
              autoFocus
            />
            <div className="flex gap-2">
              <Button
                type="submit"
                disabled={!amount || Number.parseFloat(amount) <= 0}
                className="flex-1 bg-secondary hover:bg-secondary/90"
              >
                หยอดเงิน
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsAdding(false)
                  setAmount("")
                }}
              >
                ยกเลิก
              </Button>
            </div>
          </form>
        ) : (
          <div className="flex gap-2">
            <Button onClick={() => setIsAdding(true)} className="flex-1 bg-secondary hover:bg-secondary/90">
              <Plus className="w-4 h-4 mr-2" />
              หยอดเงิน
            </Button>
            <Button variant="outline" onClick={showMoney} className="flex-1 bg-transparent">
              ดูยอดเงิน
            </Button>
          </div>
        )}

        {/* Quick Add Buttons */}
        <div className="grid grid-cols-3 gap-2">
          {[20, 50, 100].map((quickAmount) => (
            <Button
              key={quickAmount}
              variant="outline"
              size="sm"
              onClick={() => {
                onAddMoney(quickAmount)
                console.log(`หยอดเงินใส่กระปุกของ ${piggyBank.ownerName} จำนวน ${quickAmount} บาท`)
              }}
              className="text-xs"
            >
              +฿{quickAmount}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
