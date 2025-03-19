"use client";

import { SetStateAction } from "react";
import { Search } from "lucide-react";
import EmptyState from "../ui/EmptyState";
import { statusOptions } from "../constants";
import { useFetchAllSkills } from "@/services/ambassador-dao/requests/onboard";
import { ViewAllButton } from "./ViewAllButton";
import { FilterDropdown } from "./FilterDropdown";
import { JobCard } from "./JobCard";


interface JobsSectionProps {
  data: any[];
  filters: {
    type: string;
    query: string;
    industry: string;
    skillSet: string;
    jobType: string;
    status: string;
  };
  searchInput: string;
  handleSearchChange: (e: {
    target: { value: SetStateAction<string> };
  }) => void;
  updateFilters: (newFilterValues: any) => void;
}

const JobsSection = ({
  data,
  filters,
  searchInput,
  handleSearchChange,
  updateFilters,
}: JobsSectionProps) => {
  const { data: skills } = useFetchAllSkills();

  console.log(skills);

  return (
    <section className="mb-12 border border-[#27272A] rounded-md py-14 px-8">
      <h2 className="text-3xl font-bold mb-6">ALL JOBS</h2>
      <div className="flex gap-4 mb-6 flex-wrap">
        <FilterDropdown
          label="Skill Set"
          options={skills}
          value={filters.skillSet}
          onValueChange={(value) => updateFilters({ skillSet: value })}
        />
        <FilterDropdown
          label="Status"
          options={statusOptions}
          value={filters.status}
          onValueChange={(value) => updateFilters({ status: value })}
        />
        <div className="relative min-w-[200px]">
          <input
            type="text"
            placeholder="Search Jobs"
            value={searchInput || ""}
            onChange={handleSearchChange}
            className="text-xs sm:text-sm lg:text-base h-8 sm:h-11 bg-gray-800 rounded-md px-4 py-2 focus:outline-none w-full"
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Search color="#9F9FA9" className="h-3 w-3 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {data?.length > 0 ? (
          data.map((job) => <JobCard key={job.id} job={job} />)
        ) : (
          <EmptyState
            title="No Job Matches Your Filters"
            description="Try adjusting criteria"
            className="mt-8"
          />
        )}
      </div>

      {data?.length > 0 && <ViewAllButton type="jobs" />}
    </section>
  );
};

export default JobsSection;
