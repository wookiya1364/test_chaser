import Link from "next/link";

const Twitter = () => {
  return (
    <Link target="_blank" href={""}>
      <svg
        className="reverse-fill-color"
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 0.157543H5.32364L10.2444 7.03282L16.3696 0L17.8249 0.0262571L10.97 8.02187L18 17.8424H12.6785L8.03398 11.4354L2.36021 18H0.928051L7.32951 10.4989L0 0.157543ZM4.82166 1.17286H2.01008L13.2585 16.8009H16.0195L4.82166 1.17286Z"
          fill="white"
        ></path>
      </svg>
    </Link>
  );
};

export { Twitter };
