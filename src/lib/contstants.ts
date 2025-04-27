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
  { route: "About Us", link: "/about" },
  {
    route: "Courses",
    link: "",
    dropdown: [
      {
        title: "Alert Dialog",
        href: "/",
        description: "A modal dialog that interrupts the user with important content and expects a response.",
      },
      {
        title: "Hover Card",
        href: "/",
        description: "For sighted users to preview content available behind a link.",
      },
      {
        title: "Progress",
        href: "/",
        description:
          "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
      },
      {
        title: "Scroll-area",
        href: "/",
        description: "Visually or semantically separates content.",
      },
      {
        title: "Tabs",
        href: "/",
        description: "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
      },
      {
        title: "Tooltip",
        href: "/",
        description:
          "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
      },
    ],
  },
  { route: "Employers", link: "/employers" },
  { route: "FAQ", link: "/faq" },
  { route: "Contact Us", link: "/contact" },
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
