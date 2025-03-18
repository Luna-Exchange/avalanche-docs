"use client";

import Image from "next/image";
import { Suspense, useState } from "react";
import Team1 from "@/public/ambassador-dao-images/Avalanche-team1.png";

import React from "react";
import * as Select from "@radix-ui/react-select";
import { Progress } from "@/components/ambassador-dao/ui/Progress";
import {
  ArrowDown,
  ArrowLeft,
  ArrowUpRight,
  BriefcaseBusiness,
  FileText,
  Hourglass,
  Lightbulb,
  Search,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AuthModal } from "@/components/ambassador-dao/sections/auth-modal";
import { Outline } from "@/components/ambassador-dao/ui/Outline";
import { useFetchOpportunity } from "@/services/ambassador-dao/requests/opportunity";
import Loader from "@/components/ambassador-dao/ui/Loader";
import { getTimeLeft } from "@/utils/timeFormatting";
import { IBountyDataType, IJobDataType } from "@/services/ambassador-dao/interfaces/opportunity";

interface FilterDropdownProps {
  label: string;
  options: string[];
  onValueChange?: (value: string) => void;
  value?: string;
}

// WelcomeSection
const WelcomeSection = () => {
  return (
    <div className="relative bg-gradient-to-r from-[#000] to-[#FF394A40] overflow-hidden backdrop-blur-[200px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="relative z-10">
          <h1 className="text-2xl sm:text-4xl font-bold text-red-500 mb-2">
            Welcome back, John
          </h1>
          <p className="text-sm sm:text-xl text-white">
            We're so glad to have you on Earn
          </p>
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
// JobsSection
const JobsSection = ({ data }: { data: any }) => {
  console.log(data);

  const [filters, setFilters] = useState({
    industry: "",
    skillSet: "",
    jobType: "",
    status: "",
  });


  return (
    <section className="mb-12 border border-[#27272A] rounded-md py-14 px-8">
      <h2 className="text-3xl font-bold mb-6">ALL JOBS</h2>

      <div className="flex gap-4 mb-6 flex-wrap">
        <FilterDropdown
          label="Industry"
          options={["Technology", "Finance", "Marketing"]}
        />
        <FilterDropdown
          label="Skill Set"
          options={["Development", "Design", "Writing"]}
        />
        <FilterDropdown
          label="Job Type"
          options={["Full-time", "Part-time", "Contract"]}
        />
        <FilterDropdown
          label="Status"
          options={["Open", "In Progress", "Closed"]}
          // value=""
          onValueChange={(e) => {
            console.log(e);
          }}
        />

        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="text-xs sm:text-sm lg:text-base bg-gray-800 rounded-md px-4 py-2 focus:outline-none"
          />
          <button className="absolute right-3 top-3">
            <Search color="#9F9FA9" className="w-3 h-3 mr-1" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {data?.map((job: any) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>

      <ViewAllButton type="jobs" />
    </section>
  );
};

// View All Button Component
const ViewAllButton = ({ type }: { type: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasQueryParam = searchParams.has("type");

  const handleViewAll = () => {
    if (!hasQueryParam) {
      const params = new URLSearchParams(searchParams);
      params.set("type", type);
      const url = `${pathname}?${params.toString()}`;
      router.push(url);
    }
  };

  return (
    <button
      className="w-full bg-red-500 hover:bg-red-600 text-white rounded-md py-3 font-medium mt-6"
      onClick={handleViewAll}
    >
      VIEW ALL
    </button>
  );
};

// BountiesSection
const BountiesSection = ({ data }: {data: any}) => {
  const [filters, setFilters] = useState({
    industry: "",
    skillSet: "",
    deadline: "",
    reward: "",
  });


  return (
    <section className="border border-[#27272A] rounded-md py-14 px-8">
      <h2 className="text-3xl font-bold mb-6">ALL BOUNTIES</h2>
      <div className="flex gap-4 mb-6 flex-wrap">
        <FilterDropdown
          label="Industry"
          options={["Technology", "Finance", "Marketing"]}
        />
        <FilterDropdown
          label="Skill Set"
          options={["Development", "Design", "Writing"]}
        />
        <FilterDropdown
          label="Deadline"
          options={["Today", "This Week", "This Month"]}
        />
        <FilterDropdown
          label="Reward"
          options={["0-500 USDC", "500-1000 USDC", "1000+ USDC"]}
        />
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="text-xs sm:text-sm lg:text-base bg-gray-800 rounded-md px-4 py-2 focus:outline-none"
          />
          <button className="absolute right-3 top-3">
            <Search color="#9F9FA9" className="w-3 h-3 mr-1" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {data?.map((bounty: any) => (
          <BountyCard key={bounty.id} bounty={bounty} />
        ))}
      </div>

      <ViewAllButton type="bounties" />
    </section>
  );
};

const FilterDropdown = ({
  label,
  options = [],
  onValueChange,
  value,
}: FilterDropdownProps) => {
  return (
    <Select.Root onValueChange={onValueChange} value={value}>
      <Select.Trigger
        className="text-xs sm:text-sm lg:text-base focus:outline-none h-8 sm:h-10 w-max flex items-center justify-between bg-gray-800 text-white rounded-md px-2 outline-none data-[placeholder]:text-gray-400"
        aria-label={label}
      >
        <Select.Value placeholder={label} />
        <Select.Icon>
          <svg
            className="w-4 h-4 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          className="bg-gray-800 text-white rounded-md shadow-lg overflow-hidden z-50"
          position="popper"
          sideOffset={5}
        >
          <Select.ScrollUpButton className="flex items-center justify-center h-6 bg-gray-800 text-gray-400 cursor-default">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8 4L4 8H12L8 4Z" fill="currentColor" />
            </svg>
          </Select.ScrollUpButton>

          <Select.Viewport className="p-1">
            <Select.Group>
              {options.map((option, index) => (
                <Select.Item
                  key={index}
                  value={option}
                  className="relative flex items-center px-6 py-2 rounded hover:bg-gray-700 focus:bg-gray-700 focus:outline-none select-none data-[highlighted]:bg-gray-700 data-[highlighted]:outline-none"
                >
                  <Select.ItemText>{option}</Select.ItemText>
                  <Select.ItemIndicator className="absolute left-1 inline-flex items-center">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.3334 4L6.00008 11.3333L2.66675 8"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Viewport>

          <Select.ScrollDownButton className="flex items-center justify-center h-6 bg-gray-800 text-gray-400 cursor-default">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8 12L12 8H4L8 12Z" fill="currentColor" />
            </svg>
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

// JobCard
const JobCard = ({ job }: IJobDataType) => {
  const {
    id,
    title,
    created_by,
    total_budget,
    end_date,
    proposals,
    currency,
    skills,
  } = job;

  const router = useRouter();

  const goToDetailsPage = () => {
    console.log("here");
    router.push(`/ambassador-dao/jobs/${id}`);
  };

  return (
    <div
      className="border border-gray-700 rounded-lg p-4 hover:border-red-500 transition-colors cursor-pointer"
      onClick={goToDetailsPage}
    >
      <div>
          <Image
            // src={created_by?.company_profile?.logo}
            src={
              "https://res.cloudinary.com/dtx792i8k/image/upload/v1741375193/ProducemartV2/ProductImages/ZA/nywzcdihl3fkfkuegcao.jpg"
            }
            alt=""
            className="h-full object-cover"
            width={100}
            height={100}
          />
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-medium text-red-500">{title}</h3>
            <p className="text-gray-400">{created_by?.company_profile?.name}</p>
          </div>
          <div className="flex items-center">
            <div className="bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center mr-2">
              <span className="text-xs">{currency}A</span>
            </div>
            <span className="text-white">{total_budget}</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center text-sm text-gray-400">
            <BriefcaseBusiness color="#9F9FA9" className="w-3 h-3 mr-1" />
            Jobs
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <Hourglass color="#9F9FA9" className="w-3 h-3 mr-1" />
            Due in {getTimeLeft(end_date)}
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <FileText color="#9F9FA9" className="w-3 h-3 mr-1" />
            {proposals} Proposals
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-8 gap-2">
        {skills?.map((skill, index) => (
          <div key={index}>
            <Outline label={skill.name} />
          </div>
        ))}
      </div>
    </div>
  );
};

// BountyCard
const BountyCard = ({
  bounty,
}: IBountyDataType) => {
  const {
    id,
    title,
    created_by,
    total_budget,
    end_date,
    proposals,
    currency,
    skills,
  } = bounty;
  const router = useRouter();

  const goToDetailsPage = () => {
    router.push(`/ambassador-dao/bounty/${id}`);
  };

  return (
    <div
      className="border border-gray-700 rounded-lg p-4 hover:border-red-500 transition-colors cursor-pointer"
      onClick={goToDetailsPage}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-medium text-red-500">{title}</h3>
          <p className="text-gray-400">{created_by?.company_profile?.name}</p>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center mb-1">
            <div className="bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center mr-2">
              <span className="text-xs">A</span>
            </div>
            <span className="text-white">{total_budget} USDC</span>
          </div>
          <div className="flex items-center">
            <div className="bg-red-500 rounded-full w-6 h-6 flex items-center justify-center mr-2">
              <span className="text-xs">XP</span>
            </div>
            <span className="text-white">{100} XP</span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center text-sm text-gray-400">
          <Lightbulb color="#9F9FA9" className="w-3 h-3 mr-1" />
          Bounty
        </div>
        <div className="flex items-center text-sm text-gray-400">
          <Hourglass color="#9F9FA9" className="w-3 h-3 mr-1" />
          {end_date}
        </div>
        <div className="flex items-center text-sm text-gray-400">
          <FileText color="#9F9FA9" className="w-3 h-3 mr-1" />
          {proposals} Proposals
        </div>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-2">
        {
          skills.map((skill, index) => (
            <div key={index}>
              <Outline label={skill} />
            </div>
          ))}
      </div>
    </div>
  );
};

// UserProfileCard
const UserProfileCard = () => {
  return (
    <div className="shadow-sm border border-[#27272A] rounded-lg p-4 mb-6">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-gray-600 mr-3 flex items-center justify-center">
          <span className="text-white">JL</span>
        </div>
        <div className="text-sm">
          <h3 className="font-medium">Jackson Lee</h3>
          <p className="text-xs text-gray-400">@jacksonl.near</p>
        </div>
        <div className="ml-auto">
          <span className="px-3 py-1 rounded-full text-sm">
            Frontend/Backend
          </span>
        </div>
      </div>
      <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
        <Progress value={60} className="" />
      </div>
      <p className="text-xs text-gray-400 mt-1 underline cursor-pointer">
        Complete your profile
      </p>
    </div>
  );
};

// AmbassadorCard
const AmbassadorCard = ({
  setOpenAuthModal,
}: {
  setOpenAuthModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div
      className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-lg p-4 mb-4 relative overflow-hidden cursor-pointer"
      onClick={() => setOpenAuthModal(true)}
    >
      <div className="relative z-10">
        <h3 className="font-medium mb-1">Become a Ambassador</h3>
        <p className="text-xs opacity-80">
          Reach 70,000+ crypto talent from one single dashboard
        </p>
      </div>
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
        <ArrowUpRight color="white" className="h-6 w-6" />
      </div>
    </div>
  );
};

// PreferenceSection
const PreferenceSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-8">
      <div
        className="flex items-center justify-between cursor-pointer p-4 rounded-lg border border-[#27272A]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="font-medium">Preference</h3>
        <ArrowDown color="white" className="h-6 w-6" />
      </div>

      {isOpen && (
        <div className="border border-[#27272A] border-t-0 rounded-b-lg p-4">
          {/* Preference options would go here */}
        </div>
      )}
    </div>
  );
};

const SideContent = ({
  setOpenAuthModal,
}: {
  setOpenAuthModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="lg:col-span-1">
      <AmbassadorCard setOpenAuthModal={setOpenAuthModal} />
      <UserProfileCard />
      <PreferenceSection />
    </div>
  );
};

const GoBackButton = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  const handleGoBack = () => {
    // Navigate to the current path without query parameters
    router.push(pathname);
  };

  if (!type) return null;

  return (
    <p className="flex gap-2 py-4 cursor-pointer" onClick={handleGoBack}>
      <ArrowLeft color="#fff" />
      Go Back
    </p>
  );
};

const MainContent = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const [openAuthModal, setOpenAuthModal] = useState(false);

  const { data: opportunityData, isLoading } = useFetchOpportunity();

  // Filter opportunities based on type
  const getFilteredOpportunities = () => {
    if (!opportunityData) return [];
    console.log(opportunityData);

    if (type === "jobs") {
      return opportunityData?.filter((item: { type: string; }) => item.type === "JOB");
    } else if (type === "bounties") {
      return opportunityData?.filter((item: { type: string; }) => item.type === "BOUNTY");
    }
    return opportunityData;
  };

  const filteredOpportunities = getFilteredOpportunities();
  const jobs = filteredOpportunities.filter((item: { type: string; }) => item.type === "JOB");
  const bounties = filteredOpportunities.filter(
    (item: { type: string; }) => item.type === "BOUNTY"
  );

  const renderContent = () => {
    if (isLoading) {
      return <Loader />;
    }

    if (!type) {
      return (
        <>
          <JobsSection data={jobs} />
          <BountiesSection data={bounties} />
        </>
      );
    }

    if (type === "jobs") {
      return <JobsSection data={jobs} />;
    }

    if (type === "bounties") {
      return <BountiesSection data={bounties} />;
    }
  };

  // console.log(opportunityData, filteredOpportunities, jobs)
  return (
    <>
      <GoBackButton />
      <div className="grid grid-cols-1 xl:grid-cols-9 xl:gap-x-8 gap-y-8">
        <div className="lg:col-span-6 order-2 xl:order-1">
          {renderContent()}
        </div>
        <div className="order-1 xl:order-2 col-span-3">
          <SideContent setOpenAuthModal={setOpenAuthModal} />
        </div>
      </div>
      <AuthModal
        isOpen={openAuthModal}
        onClose={() => setOpenAuthModal(false)}
      />
    </>
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
