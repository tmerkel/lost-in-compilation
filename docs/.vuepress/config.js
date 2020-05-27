module.exports = {
  title: "Lost in Compilation",
  description: "Inside the mind of tmerkel",

  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "About Me", link: "/about-me/" },
    ],
    sidebar: [
      {
        title: "Knowledge Base",
        sidebarDepth: 2,
        children: [
          {
            title: "Getting Started",
            path: "/",
            sidebarDepth: 1,
            children: [
              ["/", "Introduction"],
              ["/knowledge-base/desktop-setup/", "Desktop Setup"],
            ],
          },
          {
            title: ".Net Core Web Api",
            sidebarDepth: 2,
            children: [["/knowledge-base/web-api/", "Overview"]],
          },
        ],
      },
    ],
  },
};
