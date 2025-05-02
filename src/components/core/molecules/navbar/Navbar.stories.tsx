import { TsaNavbar } from ".";
import { Meta, StoryFn } from "@storybook/react";

import { CustomButton } from "../../atoms/button";

const meta: Meta<typeof TsaNavbar> = {
  title: "Molecules/tsa-navbar",
  component: TsaNavbar,
};
export default meta;

const Template: StoryFn<typeof TsaNavbar> = (arguments_: TsaNavbarProperties) => <TsaNavbar {...arguments_} />;

export const Default = Template.bind({});
Default.args = {
  navLinks: [
    {
      route: "LINK 1",
      link: "/",
      dropdown: undefined,
      id: 0,
      name: "",
      path: "",
      type: "",
    },
    {
      route: "LINK 2",
      link: "/",
      dropdown: undefined,
      id: 0,
      name: "",
      path: "",
      type: "",
    },
    {
      route: "LINK 3",
      link: "/",
      dropdown: undefined,
      id: 0,
      name: "",
      path: "",
      type: "",
    },
    {
      route: "LINK 4",
      link: "/",
      dropdown: undefined,
      id: 0,
      name: "",
      path: "",
      type: "",
    },
    {
      route: "LINK 5",
      link: "/",
      dropdown: undefined,
      id: 0,
      name: "",
      path: "",
      type: "",
    },
  ],
  children: (
    <>
      <CustomButton href="/signin" variant="primary" className="h-[47px] w-[97px] rounded-lg">
        CTA 1
      </CustomButton>
      <CustomButton href="/signup" variant="outline" className="h-[47px] w-[97px] rounded-lg">
        CTA 2
      </CustomButton>
    </>
  ),
};

export const CustomCTA = Template.bind({});
CustomCTA.args = {
  ...Default.args,
  logoPath: "/images/logo-black.png",
  className: "bg-accent",
  linkClassName: "text-black",
};

export const CustomCTA_2 = Template.bind({});
CustomCTA_2.args = {
  ...Default.args,
  logoPath: "/images/logo-white.png",
  className: "bg-primary",
  linkClassName: "text-white",
};

export const CustomCTA_2_with_banner = Template.bind({});
CustomCTA_2_with_banner.args = {
  ...Default.args,
  logoPath: "/images/logo-white.png",
  className: "bg-primary",
  linkClassName: "text-white",
  showBanner: true,
};
