export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "My Investment Journal",
  description:
    "Investment Tracker",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/superoverflow/crypto-investment-journal",
    docs: "https://ui.shadcn.com",
  },
}
