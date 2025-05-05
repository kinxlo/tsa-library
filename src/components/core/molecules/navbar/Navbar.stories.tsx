import { Navbar } from ".";
import { NAV_LINKS } from "@/lib/constants";
import type { Meta, StoryObj } from "@storybook/react";

import Button from "../../atoms/button";
import { Logo } from "../../atoms/logo";

const meta: Meta<typeof Navbar> = {
  title: "Molecules/Navbar",
  component: Navbar,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
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
    sticky: true,
    cta: <Button>Register</Button>,
  },
};

export const WithUser: Story = {
  args: {
    ...Default.args,
    user: <UserProfile />,
  },
};
