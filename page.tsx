"use client"

import { useState } from "react"
import { PiggyBankCard } from "@/components/piggy-bank-card"
import { CreatePiggyBankForm } from "@/components/create-piggy-bank-form"
import { Coins, PiggyBankIcon } from "lucide-react"

interface PiggyBank {
  id: string
  ownerName: string
  money: number
  createdAt: Date
}

export default function Home() {
  const [piggyBanks, setPiggyBanks] = useState<PiggyBank[]>([])

  const createPiggyBank = (ownerName: string) => {
    const newPiggyBank: PiggyBank = {
      id: Date.now().toString(),
      ownerName,
      money: 0.0,
      createdAt: new Date(),
    }
    setPiggyBanks((prev) => [...prev, newPiggyBank])
  }

  const addMoney = (id: string, amount: number) => {
    setPiggyBanks((prev) => prev.map((bank) => (bank.id === id ? { ...bank, money: bank.money + amount } : bank)))
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-xl">
              <PiggyBankIcon className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">กระปุกออมสินดิจิทัล</h1>
              <p className="text-muted-foreground">Digital Piggy Bank - เริ่มต้นการออมเงินของคุณ</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-6 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Coins className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium text-muted-foreground">ยอดรวมทั้งหมด</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              ฿
              {piggyBanks
                .reduce((total, bank) => total + bank.money, 0)
                .toLocaleString("th-TH", { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Create New Piggy Bank */}
        <div className="mb-8">
          <CreatePiggyBankForm onCreatePiggyBank={createPiggyBank} />
        </div>

        {/* Piggy Banks Grid */}
        {piggyBanks.length === 0 ? (
          <div className="text-center py-12">
            <div className="p-4 bg-muted/50 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <PiggyBankIcon className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">ยังไม่มีกระปุกออมสิน</h3>
            <p className="text-muted-foreground">สร้างกระปุกออมสินแรกของคุณเพื่อเริ่มต้นการออมเงิน</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {piggyBanks.map((bank) => (
              <PiggyBankCard key={bank.id} piggyBank={bank} onAddMoney={(amount) => addMoney(bank.id, amount)} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
