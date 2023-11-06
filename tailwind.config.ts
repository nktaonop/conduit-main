import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#5cb85c",
        primaryHover: "#3d8b3d",
        white: "#fff",
        unClicked: "rgba(0, 0, 0, 0.3)",
        clicked: "black",
        error: "#B85C5C",
        tagsButton: "#818a91",
        tagsButtonHover: "#373a3c",
        backgroundPopularTags: "#f3f3f3",
        dataColor: "#bbb",
        previewColor: "#999",
        paginationBorder: "#ddd",
        paginationHover: "#eceeef",
        logoutButton: "#B85C5C",
        inputColor: "#55595c",
        activeButtonColor: "#aaaaaa",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
