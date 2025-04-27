/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";

type LogoProperties = {
  logo?: string;
  width?: number;
  height?: number;
  className?: string;
  LinkComponent: React.ComponentType<any>;
  ImageComponent: React.ComponentType<any>;
};

const Logo: FC<LogoProperties> = ({ logo, width = 120, height = 37, className, LinkComponent, ImageComponent }) => {
  return (
    <LinkComponent href="/" data-testid="logo" className="">
      {logo ? (
        <ImageComponent src={logo} alt="Logo" width={width} height={height} className={className} />
      ) : (
        <p className="text-xl font-bold">LOGO</p>
      )}
    </LinkComponent>
  );
};

export default Logo;
