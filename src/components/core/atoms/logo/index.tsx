import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

type LogoProperties = {
  logo?: string;
  width?: number;
  height?: number;
  className?: string;
};

const Logo: FC<LogoProperties> = ({ logo = "/images/logo-black.png", width = 120, height = 37, className }) => {
  return (
    <Link href="/" data-testid="logo" className="">
      {logo ? (
        <Image src={logo} alt="Logo" width={width} height={height} className={className} />
      ) : (
        <p className="text-xl font-bold">LOGO</p>
      )}
    </Link>
  );
};

export default Logo;
