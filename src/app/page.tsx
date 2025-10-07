"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BsTags } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import VersionSelector from "./VersionSelector";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";

function CopyCommand({ command, icon: Icon }: { command: string; icon?: React.ElementType }) {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setOpen(true);
    setTimeout(() => {
      setCopied(false);
      setOpen(false);
    }, 2000);
  };

  return (
    <div className="relative group flex items-center rounded-md border px-3 py-2 text-sm font-mono bg-muted leading-none">
      {Icon && <Icon className="mr-2 h-4 w-4" />}
      <code>{command}</code>

      <TooltipProvider>
        <Tooltip open={open || undefined} onOpenChange={setOpen}>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              onClick={handleCopy}
              className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6"
            >
              {copied ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">{copied ? "Copied!" : "Copy to clipboard"}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <div className="fixed top-2 right-2 z-50 flex items-center gap-0">
        <VersionSelector />
      </div>
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <Image
            className="dark:invert"
            src="./next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
          <h1>
            Template with CI workflows for deploying tagged versions of Next.js sites to GitHub Pages.
          </h1>

          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <Button asChild size="lg">
              <a
                href="https://github.com/lazarusA/next-tags"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub />
                Get the code!
              </a>
            </Button>

            <CopyCommand command="git tag v0.1.3" icon={BsTags} />
            <CopyCommand command="git push origin v0.1.3" />
          </div>
        </main>
        <footer className="fixed bottom-4 left-1/2 transform -translate-x-1/2 text-center text-sm text-muted-foreground">
          <Link
            href="https://lazarusa.github.io"
            target="_blank"
            rel="noopener noreferrer"
            className="relative after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full"
          >
            © 2025 Lazaro Alonso
          </Link>
        </footer>
      </div>
    </>
  );
}