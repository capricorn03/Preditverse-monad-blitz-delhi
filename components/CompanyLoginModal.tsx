"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Building, Factory, Store } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth-context";

// Predefined company credentials
const COMPANIES = [
  {
    id: "company1",
    name: "company1",
    email: "tech@predictverse.com",
    password: "company123",
    icon: Building
  },
  {
    id: "company2",
    name: "company2",
    email: "factory@predictverse.com",
    password: "company123",
    icon: Factory
  },
  {
    id: "company3",
    name: "company3",
    email: "store@predictverse.com",
    password: "company123",
    icon: Store
  }
];

interface CompanyLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CompanyLoginModal({ isOpen, onClose }: CompanyLoginModalProps) {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const { login } = useAuth();

  const handleLogin = (company: typeof COMPANIES[0]) => {
    login({
      id: company.id,
      name: company.name,
      type: 'company'
    });
    toast.success(`Logged in as ${company.name}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Choose Company
          </CardTitle>
          <CardDescription className="text-center">
            Select a company to login and manage predictions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            {COMPANIES.map((company) => {
              const Icon = company.icon;
              return (
                <Button
                  key={company.id}
                  variant={selectedCompany === company.id ? "default" : "outline"}
                  className="flex flex-col items-center justify-center h-32 p-2"
                  onClick={() => {
                    setSelectedCompany(company.id);
                    handleLogin(company);
                  }}
                >
                  <Icon className="h-12 w-12 mb-2" />
                  <span className="text-sm">{company.name}</span>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 