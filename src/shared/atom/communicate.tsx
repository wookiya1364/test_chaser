import Link from "next/link";

const Communicate = () => {
  return (
    <Link
      target="_blank"
      href={
        "https://www.wemix.com/ko/communication?category=WEMIX%20PLAY&page=1"
      }
    >
      <svg
        className="reverse-fill-color"
        width="18"
        height="18"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M40 19.7128C40 25.0117 39.1119 29.3099 38.0161 29.3099C36.9203 29.3099 36.0327 25.0128 36.0327 19.7128C36.0327 14.4128 36.9207 10.1157 38.0161 10.1157C39.1115 10.1157 40 14.4124 40 19.7128Z"
          fill="white"
        ></path>
        <path
          d="M34.938 19.7129C34.938 25.6285 32.4126 30.4258 29.2973 30.4258C26.182 30.4258 23.6566 25.6285 23.6566 19.7129C23.6566 13.7974 26.1817 9 29.2969 9C32.4122 9 34.9376 13.7959 34.9376 19.7129"
          fill="white"
        ></path>
        <path
          d="M22.5624 19.713C22.5624 25.9975 17.5116 31.0921 11.2814 31.0921C5.05122 31.0921 0 25.9964 0 19.713C0 13.4296 5.05083 8.3335 11.2814 8.3335C17.512 8.3335 22.5624 13.4285 22.5624 19.713Z"
          fill="white"
        ></path>
      </svg>
    </Link>
  );
};

export { Communicate };
