/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-blue-sideBar": "#011a38",
        tecnavis: "#0b0b23",
      },
      fontFamily: {
        poppins: ["Poppins"],
        sansita: ["sansita-regular"],
        surfer: ["original-surfer-regular"],
      },
      height: {
        P100: ["58vh"],
        height: ["62vh"]
      },
      width: {
        formWidth: ["28vw"],
        width: [""],
      },
      margin: {
        left: ["26rem"],
      },
      fontSize:{
        userSize:["8rem"]
      }
    },
  },
  plugins: [],
};
