'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ArrowLeftRight } from 'lucide-react'
import TransactionHistory from "@/components/transaction"

export function SlideOutPanel() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="fixed right-4 top-1/2 -translate-y-1/2 z-50"
          aria-label="Toggle Transaction History"
        >
          <ArrowLeftRight className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:w-[400px] sm:max-w-md">
        <TransactionHistory />
      </SheetContent>
    </Sheet>
  )
}

