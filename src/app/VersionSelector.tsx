"use client";
import React, { useState, useEffect } from "react";
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

import { Button } from "@/components/ui/button";
import { FaCheck } from "react-icons/fa6";
import { LuChevronDown } from "react-icons/lu";
import { BsTags } from "react-icons/bs";

const VersionSelector = () => {
  const [versions, setVersions] = useState<string[]>([]);
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    fetch("/versions.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load versions.json");
        return res.json();
      })
      .then((data: string[]) => {
        // ensure latest first, then semver descending
        const sorted = data.sort((a, b) => {
          if (a === "latest") return -1;
          if (b === "latest") return 1;

          const parseVersion = (v: string) =>
            v.replace("v", "").split(".").map(Number);
          const [aMajor, aMinor, aPatch] = parseVersion(a);
          const [bMajor, bMinor, bPatch] = parseVersion(b);

          if (aMajor !== bMajor) return bMajor - aMajor;
          if (aMinor !== bMinor) return bMinor - aMinor;
          return bPatch - aPatch;
        });

        setVersions(sorted);

        // detect current version from path
        const currentPath = window.location.pathname.split("/")[1]; // e.g. "latest" or "v1.2.3"
        if (sorted.includes(currentPath)) {
          setSelectedVersion(currentPath);
        } else {
          setSelectedVersion(sorted[0] ?? null);
        }
      })
      .catch((err) => {
        console.error("Could not fetch versions.json", err);
        const fallback = ["latest"];
        setVersions(fallback);
        setSelectedVersion("latest");
      });
  }, []);

  const handleVersionSelect = (version: string) => {
    setSelectedVersion(version);
    setIsOpen(false);

    // redirect
    if (version === "latest") {
      window.location.href = "/latest/";
    } else {
      window.location.href = `/${version}/`;
    }
  };

  if (!versions.length || !selectedVersion) return null;

  return (
    <div className="fixed top-4 right-4 z-50">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <Button variant="ghost">
                <span>
                  <BsTags />
                </span>
                <LuChevronDown
                  className={`w-4 h-4 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </Button>
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>{selectedVersion}</p>
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
                <span>{version}</span>
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