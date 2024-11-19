"use client";

import { useState } from "react";
import { ArrowRight, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createOnRampTransaction } from "@/app/lib/createOnrampTransaction";

const SUPPORTED_BANKS = [
  {
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com",
  },
  {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/",
  },
];

export default function AddMoney() {
  const [redirectUrl, setRedirectUrl] = useState(
    SUPPORTED_BANKS[0]?.redirectUrl
  );
  const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
  const [value, setValue] = useState(0);

  const handleAddMoney = async () => {
    await createOnRampTransaction(provider, value);
    window.location.href = redirectUrl || "";
  };
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-[#6a51a6]">Add Money</CardTitle>
        <CardDescription>
          Choose your bank and enter the amount to add funds to your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            placeholder="Enter amount"
            type="number"
            onChange={(e) => setValue(Number(e.target.value))}
            className="text-lg"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bank">Select Bank</Label>
          <Select
            onValueChange={(value) => {
              const selectedBank = SUPPORTED_BANKS.find(
                (x) => x.name === value
              );
              setRedirectUrl(selectedBank?.redirectUrl || "");
              setProvider(selectedBank?.name || "");
            }}
          >
            <SelectTrigger id="bank">
              <SelectValue placeholder="Select your bank" />
            </SelectTrigger>
            <SelectContent>
              {SUPPORTED_BANKS.map((bank) => (
                <SelectItem key={bank.name} value={bank.name}>
                  {bank.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full text-lg" onClick={handleAddMoney}>
          Add Money <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </CardFooter>
    </Card>
  );
}