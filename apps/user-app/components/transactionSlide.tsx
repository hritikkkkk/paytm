"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ArrowLeftRight } from 'lucide-react';
import TransactionHistory from "@/components/transaction";

export function SlideOutPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50">
      <div className="relative">
        {showTooltip && (
          <div className="absolute bottom-full  left-1/10 -translate-x-1/2 mb-2  px-2 py-1 bg-gray-800 text-white text-sm rounded">
            Transaction details
          </div>
        )}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              aria-label="Toggle Transaction History"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <ArrowLeftRight className="h-10 w-10" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-full sm:w-[400px] sm:max-w-md"
          >
            <TransactionHistory />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

