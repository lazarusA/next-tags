import Image from "next/image";
import { BsTags } from "react-icons/bs";
import VersionSelector from "./VersionSelector";
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
      <h1>Template with CI workflows for deploying tagged versions of Next.js sites.</h1>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://github.com/lazarusA/next-tags"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsTags />
            git tag v0.1.3
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[200px]"
            href="https://github.com/lazarusA/next-tags"
            target="_blank"
            rel="noopener noreferrer"
          >
            git push origin v0.1.3
          </a>
        </div>
      </main>
    </div>
    </>
  );
}
