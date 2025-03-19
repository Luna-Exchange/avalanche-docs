"use client";

import { SetStateAction } from "react";
import { Search } from "lucide-react";
import EmptyState from "../ui/EmptyState";
import { jobTypes, minBudget, statusOptions } from "../constants";
import { useFetchAllSkills } from "@/services/ambassador-dao/requests/onboard";
import { ViewAllButton } from "./ViewAllButton";
import { FilterDropdown } from "./FilterDropdown";
import { BountyCard } from "./BountyCard";


interface BountiesSectionProps {
  data: any[];
  filters: {
    type: string;
    query: string;
    category: string;
    skillSet: string;
    min_budget: string;
    status: string;
  };
  searchInput: string;
  handleSearchChange: (e: {
    target: { value: SetStateAction<string> };
  }) => void;
  updateFilters: (newFilterValues: any) => void;
}

const BountiesSection = ({
  data,
  filters,
  searchInput,
  handleSearchChange,
  updateFilters,
}: BountiesSectionProps) => {

  const { data: skills } = useFetchAllSkills();

  const clearAllFilters = () => {
    updateFilters({
      query: "",
      industry: "",
      skillSet: "",
      category: "",
      status: ""
    });
    if (handleSearchChange) {
      const resetEvent = {
        target: { value: "" }
      };
      handleSearchChange(resetEvent);
    }
  };

  return (
    <section className="border border-[#27272A] rounded-md py-14 px-8">
      <h2 className="text-3xl font-bold mb-6">ALL BOUNTIES</h2>
      <div className="flex gap-4 mb-6 flex-wrap">
        <FilterDropdown
          label="Skill Set"
          options={skills}
          value={filters.skillSet}
          onValueChange={(value) => updateFilters({ skillSet: value })}
        />

        <FilterDropdown
          label="Bounty Type"
          options={jobTypes}
          value={filters.category}
          onValueChange={(value) => updateFilters({ category: value })}
        />

        <FilterDropdown
          label="Min Budget"
          options={minBudget}
          value={filters.min_budget}
          onValueChange={(value) => updateFilters({ status: value })}
        />

        <FilterDropdown
          label="Status"
          options={statusOptions}
          value={filters.status}
          onValueChange={(value) => updateFilters({ status: value })}
        />  

        {/* Search input */}
        <div className="relative min-w-[200px]">
          <input
            type="text"
            placeholder="Search Bounties"
            value={searchInput}
            onChange={handleSearchChange}
            className="text-xs sm:text-sm lg:text-base h-8 sm:h-11 bg-gray-800 rounded-md px-4 py-2 focus:outline-none w-full"
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Search color="#9F9FA9" className="h-3 w-3 sm:w-5 sm:h-5" />
          </button>
        </div>
        {(filters.query || filters.category || filters.skillSet || filters.min_budget || filters.status) && (
          <span 
            className="underline flex cursor-pointer text-red-500 ml-auto items-center" 
            onClick={clearAllFilters}
          >
            Clear filters
          </span>
        )}
      </div>

      <div className="space-y-4">
        {data?.length > 0 ? (
          data.map((bounty) => <BountyCard key={bounty.id} bounty={bounty} />)
        ) : (
          <EmptyState
            title="No Bounty Matches Your Filters"
            description="Try adjusting criteria"
            className="mt-8"
          />
        )}
      </div>

      {data?.length > 0 && <ViewAllButton type="bounties" />}
    </section>
  );
};

export default BountiesSection;
