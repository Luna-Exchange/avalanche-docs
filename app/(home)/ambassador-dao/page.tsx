"use client";

import Image from "next/image";
import { Suspense } from "react";
import Team1 from "@/public/ambassador-dao-images/Avalanche-team1.png";

import React from "react";
import {
  ArrowLeft,
  BriefcaseBusiness,
  FileText,
  Hourglass,
  Lightbulb,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Outline } from "@/components/ambassador-dao/ui/Outline";
import { getTimeLeft } from "@/utils/timeFormatting";
import {
  IBountyDataType,
  IJobDataType,
} from "@/services/ambassador-dao/interfaces/opportunity";
import MainContent from "@/components/ambassador-dao/dashboard/MainContent";
import { useFetchUserDataQuery } from "@/services/ambassador-dao/requests/auth";


const WelcomeSection = () => {
  const { data: user } = useFetchUserDataQuery();

  return (
    <div className="relative bg-gradient-to-r from-[#000] to-[#FF394A40] overflow-hidden backdrop-blur-[200px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="relative z-10">
          <h1 className="text-2xl sm:text-4xl font-bold text-red-500 mb-2">
            {user
              ? `Welcome back, ${user?.first_name}`
              : "Welcome to Ambassador DAO"}
          </h1>
          {user ? 
          <p className="text-sm sm:text-xl text-white">
            We're so glad to have you on Ambassador DAO
          </p> :
          <p className="text-sm sm:text-xl text-white">
            Hire Elite Blockchain Talent or Get Hired <br/> Your Gateway to Web3 Opportunities
          </p>}
        </div>
        <div className="h-full">
          <Image
            src={Team1}
            alt="Avalanche Logo"
            className="h-full object-cover"
            width={370.16}
            height={383}
          />
        </div>
      </div>
    </div>
  );
};


const AmbasssadorDao = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      <WelcomeSection />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 xl:px-8 py-12">
        <Suspense fallback={<div>Loading...</div>}>
          <MainContent />
        </Suspense>
      </main>
    </div>
  );
};

export default AmbasssadorDao;
