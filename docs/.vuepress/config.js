module.exports = {
  title: "Lost in Compilation",
  description: "Inside the mind of tmerkel",

  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "About Me", link: "/about-me/" }
    ],
    sidebar: [
      {
        title: "Getting Started", // required
        path: "/", // optional, which should be a absolute path.
        collapsable: true, // optional, defaults to true
        sidebarDepth: 1, // optional, defaults to 1
        children: [
          ["/", "Introduction"],
          ["/desktop-setup/", "Desktop Setup"]
        ]
      }
    ]
  }
};
