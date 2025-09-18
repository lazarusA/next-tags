"use client"
import React, { useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Button } from "@/components/ui/button"
import { FaCheck } from "react-icons/fa6";
import { LuChevronDown } from "react-icons/lu";
import { BsTags } from "react-icons/bs";

const VersionSelector = () => {
  const rawVersions: string[] = ["v1.2.3", "v1.1.0", "v1.0.0", "latest"];
  
  // Sort versions with 'latest' first, then semantic versions in descending order
  const versions: string[] = rawVersions.sort((a, b) => {
    if (a === 'latest') return -1;
    if (b === 'latest') return 1;
    
    // Compare semantic versions (assuming format vX.Y.Z)
    const parseVersion = (v: string) => v.replace('v', '').split('.').map(Number);
    const [aMajor, aMinor, aPatch] = parseVersion(a);
    const [bMajor, bMinor, bPatch] = parseVersion(b);
    
    if (aMajor !== bMajor) return bMajor - aMajor;
    if (aMinor !== bMinor) return bMinor - aMinor;
    return bPatch - aPatch;
  });
  
  const [selectedVersion, setSelectedVersion] = useState<string>(versions[0]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleVersionSelect = (version: string): void => {
    setSelectedVersion(version);
    setIsOpen(false);
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <Tooltip >
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <Button variant={"ghost"}>
                <span className="font-mono"><BsTags /></span>
                <LuChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </Button>
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p className="font-mono">{selectedVersion}</p>
          </TooltipContent>
        </Tooltip>
        <PopoverContent className="w-28 p-1" align="start">
          <div className="space-y-1">
            {versions.map((version) => (
              <button
                key={version}
                onClick={() => handleVersionSelect(version)}
                className="flex items-center justify-between w-full px-3 py-2 text-sm text-left hover:bg-gray-100 rounded-sm focus:outline-none focus:bg-gray-100"
              >
                <span className="font-mono">{version}</span>
                {selectedVersion === version && (
                  <FaCheck className="w-4 h-4 text-orange-600" />
                )}
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default VersionSelector;