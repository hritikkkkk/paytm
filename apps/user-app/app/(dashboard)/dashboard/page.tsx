"use client";


import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, CreditCard, Banknote, Shield, Zap } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-purple-50 to-white">
      <main className="container mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <h2 className="text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            Revolutionize Your Payments
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Experience lightning-fast, secure transactions with our cutting-edge
            payment platform.
          </p>
        </section>

        <section className="mb-16">
          <Tabs defaultValue="features" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
            </TabsList>
            <TabsContent value="features">
              <Card>
                <CardHeader>
                  <CardTitle>Powerful Features</CardTitle>
                  <CardDescription>
                    Explore what makes us stand out
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-4">
                    <Zap className="h-10 w-10 text-purple-500" />
                    <div>
                      <h3 className="font-semibold">Instant Transfers</h3>
                      <p className="text-sm text-gray-500">
                        Send money in seconds, anytime, anywhere
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <CreditCard className="h-10 w-10 text-purple-500" />
                    <div>
                      <h3 className="font-semibold">
                        Multiple Payment Options
                      </h3>
                      <p className="text-sm text-gray-500">
                        Cards, UPI, net banking, and more
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Bank-Grade Security</CardTitle>
                  <CardDescription>
                    Your safety is our top priority
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex items-center space-x-4">
                  <Shield className="h-10 w-10 text-purple-500" />
                  <div>
                    <h3 className="font-semibold">End-to-End Encryption</h3>
                    <p className="text-sm text-gray-500">
                      Your transactions are always protected
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="pricing">
              <Card>
                <CardHeader>
                  <CardTitle>Transparent Pricing</CardTitle>
                  <CardDescription>No hidden fees, ever</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center space-x-4">
                  <Banknote className="h-10 w-10 text-purple-500" />
                  <div>
                    <h3 className="font-semibold">Free Transfers</h3>
                    <p className="text-sm text-gray-500">
                      Send money to friends and family at no cost
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>
      </main>
    </div>
  );
}
