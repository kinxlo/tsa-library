export const SLIDE_CONTENT: slideContentProperties[] = [
  { name: "Fullstack development", image: "/images/img.png", link: "https://example.com/page1" },
  { name: "Item 2", image: "/images/img.png", link: "https://example.com/page2" },
  { name: "Item 3", image: "/images/img.png", link: "https://example.com/page3" },
  { name: "Item 4", image: "/images/img.png", link: "https://example.com/page4" },
  { name: "Item 5", image: "/images/img.png", link: "https://example.com/page5" },
  { name: "Item 6", image: "/images/img.png", link: "https://example.com/page5" },
  { name: "Item 7", image: "/images/img.png", link: "https://example.com/page5" },
  { name: "Item 8", image: "/images/img.png", link: "https://example.com/page5" },
];

// Use the types to define the NAV_LINKS array
export const NAV_LINKS: NavLink[] = [
  {
    id: 3,
    title: "Link 1",
    href: "/explore",
    type: "dropdown",
    subLinks: [
      {
        id: 1,
        title: "Alert Dialog",
        href: "/docs/primitives/alert-dialog",
        description: "A modal dialog that interrupts the user with important content and expects a response.",
      },
      {
        id: 2,
        title: "Hover Card",
        href: "/docs/primitives/hover-card",
        description: "For sighted users to preview content available behind a link.",
      },
      {
        id: 3,
        title: "Progress",
        href: "/docs/primitives/progress",
        description:
          "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
      },
      {
        id: 4,
        title: "Scroll-area",
        href: "/docs/primitives/scroll-area",
        description: "Visually or semantically separates content.",
      },
      {
        id: 5,
        title: "Tabs",
        href: "/docs/primitives/tabs",
        description: "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
      },
      {
        id: 6,
        title: "Tooltip",
        href: "/docs/primitives/tooltip",
        description:
          "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
      },
    ],
  },
  { id: 5, title: "Link 2", href: "/features", type: "link" },
  { id: 4, title: "Link 3", href: "/pricing", type: "link" },
];

export const IMG_PATH = [
  "/images/logo-black.png",
  "/images/logo-black.png",
  "/images/logo-black.png",
  "/images/logo-black.png",
  "/images/logo-black.png",
  "/images/logo-black.png",
  "/images/logo-black.png",
  "/images/logo-black.png",
  "/images/logo-black.png",
  "/images/logo-black.png",
];

export const TESTIMONIAL_LIST = [
  {
    message: `I have been trying to figure out a way to kickstart my career in tech to no avail.
I tried self tutorial, still nothing. When I tried techstudio 10 weeks training, my
story changed for better`,
    image: `/icons/android-chrome-192x192.png`,
    name: `Sherif Sorunke`,
    job: `Product Design, Graduate`,
  },
  {
    message: `I have been trying to figure out a way to kickstart my career in tech to no avail.
I tried self tutorial, still nothing. When I tried techstudio 10 weeks training, my
story changed for better`,
    image: `/icons/android-chrome-192x192.png`,
    name: `Sherif Sorunke`,
    job: `Product Design, Graduate`,
  },
  {
    message: `I have been trying to figure out a way to kickstart my career in tech to no avail.
I tried self tutorial, still nothing. When I tried techstudio 10 weeks training, my
story changed for better`,
    image: `/icons/android-chrome-192x192.png`,
    name: `Sherif Sorunke`,
    job: `Product Design, Graduate`,
  },
];
