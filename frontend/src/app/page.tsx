import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center p-8 pb-20 gap-16 sm:p-20 h-full">
      <div className="flex w-fit items-center justify-center gap-4">
        <button className="btn btn-wide">
          <Link href="/claim">File a claim</Link></button>
        <button className="btn btn-wide">Learn more</button>
      </div>
    </div>
  );
}
