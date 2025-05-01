import { Navbar } from ".";
import { NAV_LINKS } from "@/lib/constants";
import type { Meta, StoryObj } from "@storybook/react";

import Logo from "../../atoms/logo";

const meta: Meta<typeof Navbar> = {
  title: "Molecules/Navbar",
  component: Navbar,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    theme: {
      control: { type: "select" },
      options: ["light", "dark", "custom"],
    },
    mobileBreakpoint: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "xl"],
    },
    sticky: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Navbar>;

const UserProfile = () => (
  <div className="flex items-center space-x-2">
    <div className="h-8 w-8 rounded-full bg-gray-300"></div>
    <span className="text-sm">John Doe</span>
  </div>
);

export const Default: Story = {
  args: {
    logo: <Logo logo={"/images/logo-black.png"} />,
    links: NAV_LINKS,
    theme: "light",
    sticky: true,
    mobileBreakpoint: "lg",
  },
};

export const DarkTheme: Story = {
  args: {
    ...Default.args,
    logo: <Logo logo={"/images/logo-white.png"} />,
    theme: "dark",
  },
};

export const WithUser: Story = {
  args: {
    ...Default.args,
    user: <UserProfile />,
  },
};

export const WithCustomCTA: Story = {
  args: {
    ...Default.args,
    cta: (
      <button className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700">
        Custom CTA
      </button>
    ),
  },
};
