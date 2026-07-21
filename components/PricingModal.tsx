import {
  Dialog,
  
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog";

import React from 'react'
import { BlueTitle } from "./reusables";
import { PricingTable } from "@clerk/nextjs";

interface PricingModalProps {
    children: React.ReactNode;
    reason?: "credits" | "upgrade";
}

const PricingModal = ({ children , reason = "upgrade"} : PricingModalProps) => {
 const title =
    reason === "credits" ? "You need more credits" : "Upgrade your plan";

    const description =
    reason === "credits"
      ? "You have run out of credits. Please upgrade your plan to continue using the service."
      : "You need to upgrade your plan to access this feature.";

      return (
        <Dialog>
      <DialogTrigger className={"cursor-pointer"}>{children}</DialogTrigger>
      <DialogContent className="border-white/8 bg-[#0f0f0f] p-0 text-white sm:max-w-6xl max-h-[90dvh] overflow-y-auto">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className="font-serif text-xl tracking-tight text-white/90">
            <BlueTitle className="text-4xl">{title}</BlueTitle>
          </DialogTitle>
          <DialogDescription className="text-sm text-white/35">
            {description}
          </DialogDescription>
        </DialogHeader>

<div className="px-6 pb-6">
    <PricingTable 
    checkoutProps={{
        appearance: {
            elements: {
                drawerRoot:{
                    zIndex: 2000,
                },
            },
        },
    }}
    />
</div>

        </DialogContent>
        </Dialog>
      )
}

export default PricingModal
