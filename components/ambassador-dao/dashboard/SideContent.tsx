import { ArrowUpRight } from "lucide-react";
import { Progress } from "../ui/Progress";
import { useFetchUserDataQuery } from "@/services/ambassador-dao/requests/auth";
import Link from "next/link";

const UserProfileCard = ({userData}: any) => {
    return (
      <div className="shadow-sm border border-[#27272A] rounded-lg p-4 mb-6">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-gray-600 mr-3 flex items-center justify-center">
            <span className="text-white">DA</span>
          </div>
          <div className="text-sm">
            <h3 className="font-medium">{userData?.first_name} {userData?.last_name}</h3>
            <p className="text-xs text-gray-400">@{userData?.username}</p>
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
        <Link href="/ambassador-dao/onboard" className="text-xs text-gray-400 mt-1 underline cursor-pointer">
          Complete your profile
        </Link>
      </div>
    );
  };



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



export const SideContent = ({
    setOpenAuthModal,
  }: {
    setOpenAuthModal: React.Dispatch<React.SetStateAction<boolean>>;
  }) => {

  const { data: user, isLoading } = useFetchUserDataQuery();

  console.log(user, isLoading)
    return (
      <div className="lg:col-span-1">
        {!user && <AmbassadorCard setOpenAuthModal={setOpenAuthModal} />}
        {user && <UserProfileCard userData={user} />}
        {/* <PreferenceSection /> */}
      </div>
    );
  };