import SendCard from "@/components/SendCard"
import { SlideOutPanel } from "@/components/transactionSlide"

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-4 relative min-h-screen">
      <div className="max-w-md mx-auto">
        <SendCard />
      </div>
      <SlideOutPanel />
    </div>
  )
}
