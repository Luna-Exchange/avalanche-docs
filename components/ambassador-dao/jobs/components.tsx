"use client";

import { useState, Key } from "react";
import {
  FileText,
  Hourglass,
  CircleUser,
  BriefcaseBusiness,
  Loader2,
} from "lucide-react";
import { Outline } from "@/components/ambassador-dao/ui/Outline";
import JobApplicationModal from "@/components/ambassador-dao/jobs/JobApplicationModal";
import { useCheckJobStatus } from "@/services/ambassador-dao/requests/opportunity";
import { getTimeLeft } from "@/utils/timeFormatting";
import { useCountdown } from "@/components/ambassador-dao/hooks/useCountdown";
import Image from "next/image";
import Token from "@/public/ambassador-dao-images/token.png";
import { getOrdinalPosition } from "@/utils/getOrdinalPosition";
import { useFetchUserDataQuery } from "@/services/ambassador-dao/requests/auth";
import { AuthModal } from "@/components/ambassador-dao/sections/auth-modal";
import ReactMarkdown from "react-markdown";
import OnboardModal from "../ui/OnboardModal";

interface JobHeaderProps {
  job: {
    id: string;
    title: string;
    companyName: string;
    companyLogo?: string;
    createdBy: string;
    type?: string;
    deadline: string;
    skills: Array<{ name: string } | string>;
    _count: {
      applications: number;
    };
  };
}

interface JobDescriptionProps {
  data: {
    title: string;
    content: string[];
  };
}

interface JobSidebarProps {
  nullAction?: boolean;
  job: {
    id: string;
    category: string;
    status: string;
    total_budget: number;
    deadline: string;
    proposalsCount: number;
    skills: Array<{ name: string }>;
    custom_questions: any[];
    prize_distribution?: Array<{
      amount: number;
      position: number;
    }>;
  };
}

export const JobSidebar: React.FC<JobSidebarProps> = ({ job, nullAction }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isOnboardModalOpen, setIsOnboadModalOpen] = useState<boolean>(false);
  const timeLeft = useCountdown(job?.deadline);
  const [openAuthModal, setOpenAuthModal] = useState(false);

  const { data, isLoading } = useCheckJobStatus(job.id);
  const { data: userData } = useFetchUserDataQuery();

  return (
    <div className='bg-transparent p-4 rounded-md border border-[var(--default-border-color)] sticky top-6'>
      <div className='flex items-center justify-between mb-4'>
        <div className='flex items-center gap-2'>
          <span className='text-[var(--white-text-color)] flex items-center gap-2'>
            <Image src={Token} alt='$' />
            {job?.total_budget} USDC
          </span>
        </div>
      </div>

      {job?.prize_distribution &&
        job?.prize_distribution?.map(
          (prize: { amount: number; position: number }, index: number) => (
            <div key={index} className='flex items-center gap-2 my-2'>
              <Image src={Token} alt='$' />
              {prize.amount} USDC{" "}
              <span className='text-[var(--secondary-text-color)]'>
                {getOrdinalPosition(prize.position)}
              </span>
            </div>
          )
        )}

      <div className='flex gap-4 items-center mb-6 mt-2'>
        <div className='flex flex-col'>
          <span className='text-[var(--white-text-color)] flex items-center'>
            <BriefcaseBusiness
              size={16}
              className='inline mr-1'
              color='#9F9FA9'
            />
            <span>{job?.proposalsCount}</span>
          </span>
<<<<<<< HEAD
          <span className="text-gray-400 text-sm">
            {job?.proposalsCount > 1 ? "Applications" : "Application"}
=======
          <span className='text-[var(--secondary-text-color)] text-sm'>
            Applications
>>>>>>> 4289f3331... feat: light and dark mode
          </span>
        </div>
        <div className='flex flex-col justify-center'>
          <span className='text-[var(--white-text-color)] flex items-center'>
            <Hourglass size={16} className='inline mr-1' color='#9F9FA9' />
            <span>{timeLeft}</span>
          </span>
          <span className='text-[var(--secondary-text-color)] text-sm'>
            Remaining
          </span>
        </div>
      </div>

      <div className='mb-6'>
        <h2 className='text-lg font-medium mb-3 text-[var(--primary-text-color)]'>
          SKILL NEEDED
        </h2>
        {job?.skills?.length > 0 ? (
          <div className='flex flex-wrap gap-2'>
            {job?.skills?.map((skill: { name: string }, index: number) => (
              <div key={index}>
                <Outline label={skill.name} />
              </div>
            ))}
          </div>
        ) : (
          <div>No skills available</div>
        )}
      </div>

      {job.category === "AMBASSADOR_SPECIFIC" &&
      userData?.role !== "AMBASSADOR" ? null : job.status === "PUBLISHED" ? (
        <button
          disabled={data?.has_applied || timeLeft === "Expired"}
          className={`w-full font-medium py-3 rounded-md transition ${
            data?.has_applied || timeLeft === "Expired"
<<<<<<< HEAD
              ? "bg-gray-400 text-white cursor-not-allowed"
=======
              ? "bg-gray-400 text-[var(--white-text-color)] cursor-not-allowed"
>>>>>>> 4289f3331... feat: light and dark mode
              : "bg-red-500 hover:bg-red-600 text-white"
          }`}
          onClick={() => {
            if (nullAction) return;

            if (!userData) {
              setOpenAuthModal(true);
              return;
            }

            if (
              !userData?.role ||
              !userData?.username ||
              !userData?.wallet_address
            ) {
              setIsOnboadModalOpen(true);
              return;
            }

            if (!data?.has_applied && timeLeft !== "Expired") {
              setIsModalOpen(true);
            }
          }}
        >
          {isLoading ? (
<<<<<<< HEAD
            <Loader2 className="mx-auto" color="#FFF" />
=======
            <div className='flex items-center justify-center'>
              <Loader2 color='var(--white-text-color)' />
            </div>
>>>>>>> 4289f3331... feat: light and dark mode
          ) : data?.has_applied ? (
            "Already Applied"
          ) : timeLeft === "Expired" ? (
            "Expired"
          ) : (
            "APPLY"
          )}
        </button>
      ) : null}

      <AuthModal
        isOpen={openAuthModal}
        onClose={() => setOpenAuthModal(false)}
        stopRedirection={true}
      />

      {isModalOpen && (
        <JobApplicationModal
          id={job.id}
          customQuestions={job?.custom_questions}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {isOnboardModalOpen && (
        <OnboardModal
          isOpen={isOnboardModalOpen}
          onClose={() => setIsOnboadModalOpen(false)}
        />
      )}
    </div>
  );
};

export const JobHeader: React.FC<JobHeaderProps> = ({ job }) => {
  return (
    <div className='border border-[var(--default-border-color)] p-4 mb-6 rounded-lg'>
      <div className='flex items-center gap-5'>
        {job.companyLogo ? (
          <img
            src={job.companyLogo}
            alt={job.companyName}
            className='w-14 h-14 rounded-full object-cover'
          />
        ) : (
          <CircleUser color='#9F9FA9' size={56} />
        )}
        <div className='mb-6'>
          <h1 className='text-base font-bold text-red-500 mb-2'>{job.title}</h1>
          <div className='flex justify-between items-center'>
            <div className='flex items-center gap-2'>
              <span className='text-[var(--secondary-text-color)] text-sm'>
                {job.companyName}
              </span>
            </div>
          </div>
          <div className='flex flex-wrap gap-4 rounded-md mt-2'>
            <div className='flex items-center gap-2 text-sm text-[var(--secondary-text-color)]'>
              <BriefcaseBusiness size={16} color='#9F9FA9' />
              <span className='capitalize'>{job.type?.toLowerCase()}</span>
            </div>
            <div className='flex items-center gap-2 text-sm text-[var(--secondary-text-color)]'>
              <Hourglass size={16} color='#9F9FA9' />
              <span>
                {getTimeLeft(job?.deadline) === "Expired"
                  ? "Closed"
                  : `Due in: ${getTimeLeft(job?.deadline)}`}
              </span>
            </div>
<<<<<<< HEAD
            <div className="flex items-center gap-2 text-sm text-[#9F9FA9]">
              <FileText size={16} color="#9F9FA9" />
              <span>
                {job._count?.applications}{" "}
                {job?._count?.applications > 1 ? "Applications" : "Application"}
              </span>
=======
            <div className='flex items-center gap-2 text-sm text-[var(--secondary-text-color)]'>
              <FileText size={16} color='#9F9FA9' />
              <span>{job._count?.applications} Applications</span>
>>>>>>> 4289f3331... feat: light and dark mode
            </div>
          </div>
          <div className='flex flex-wrap gap-2 mt-2'>
            {job.skills.length > 0 ? (
              job.skills.map((skill: { name: string } | string, index: Key) => (
                <div key={index}>
                  <Outline
                    label={typeof skill === "string" ? skill : skill.name}
                  />
                </div>
              ))
            ) : (
              <span className='text-[var(--secondary-text-color)] text-sm'>
                No skills specified
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const JobDescription: React.FC<JobDescriptionProps> = ({ data }) => {
  return (
    <div className='mb-6 text-[var(--secondary-text-color)]'>
      <h2 className='text-xl font-semibold mb-2 text-[var(--primary-text-color)]'>
        {data.title}
      </h2>
      <div className='space-y-4 break-all text-[var(--secondary-text-color)]'>
        <ReactMarkdown
          components={{
            ul: ({ node, ...props }) => (
              <ul className='list-disc pl-6 mb-4 space-y-2' {...props} />
            ),
            ol: ({ node, ...props }) => (
              <ol className='list-decimal pl-6 mb-4 space-y-2' {...props} />
            ),
          }}
        >
          {data?.content?.join("\n\n")}
        </ReactMarkdown>
      </div>
    </div>
  );
};
