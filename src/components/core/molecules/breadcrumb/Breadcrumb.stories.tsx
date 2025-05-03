import { BreadCrumb } from ".";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof BreadCrumb> = {
  title: "Molecules/Breadcrumb",
  component: BreadCrumb,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof BreadCrumb>;

export const Default: Story = {
  args: {},
};
