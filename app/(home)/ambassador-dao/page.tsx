"use client";
import { SignupModal } from "@/components/ambassador-dao/sections/signup-modal";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const AmbasssadorDao = () => {
  const [singupModal, setSignupModal] = useState(false);
  return (
    <div>
      <Button onClick={() => setSignupModal(true)}>Onboard</Button>

      <SignupModal isOpen={singupModal} onClose={() => setSignupModal(false)} />
    </div>
  );
};

export default AmbasssadorDao;
