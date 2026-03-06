import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <Image
        src="/images/logo-onemi.svg"
        alt="oneMi — My health in my hands"
        width={100}
        height={48}
        priority
        className="h-10 w-auto object-contain"
      />
    </Link>
  );
}
