import Link from "next/link";
import Image from "@/components/Image";

type TestProps = {
  className?: string;
  dark?: boolean;
};

const Test = ({ className, dark }: TestProps) => (
  <Link className={`flex w-[11.88rem] ${className}`} href="/">
    <Image
      className="w-full h-auto"
      src={
        dark
          ? "/images/freestyle-original-transparent-blue-text-logo.png"
          : "/images/freestyle-original-transparent-white-text-logo.png"
      }
      width={190}
      height={65.69}
      alt="FreeStyle"
    />
  </Link>
);

export default Test;
