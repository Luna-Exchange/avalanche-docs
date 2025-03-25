"use client";
import FullScreenLoader from "@/components/ambassador-dao/full-screen-loader";
import { useFetchUserDataQuery } from "@/services/ambassador-dao/requests/auth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

const AmbasssadorDaoOnboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const { data: user, isLoading } = useFetchUserDataQuery();

  useEffect(() => {
    if (!isLoading && !user) {
      toast.error("Error Authenticating");
      router.push("/ambassador-dao");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return <FullScreenLoader />;
  }
  return <main>{user && children}</main>;
};

export default AmbasssadorDaoOnboardLayout;
