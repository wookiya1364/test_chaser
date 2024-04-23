import Link from "next/link";

const Youtube = () => {
  return (
    <Link
      target="_blank"
      href={""}
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
          d="M39.6016 12C39.6016 12 39.2109 9.24219 38.0078 8.03125C36.4844 6.4375 34.7812 6.42969 34 6.33594C28.4063 5.92969 20.0078 5.92969 20.0078 5.92969H19.9922C19.9922 5.92969 11.5938 5.92969 6 6.33594C5.21875 6.42969 3.51562 6.4375 1.99219 8.03125C0.789063 9.24219 0.40625 12 0.40625 12C0.40625 12 0 15.2422 0 18.4766V21.5078C0 24.7422 0.398437 27.9844 0.398437 27.9844C0.398437 27.9844 0.789062 30.7422 1.98437 31.9531C3.50781 33.5469 5.50781 33.4922 6.39844 33.6641C9.60156 33.9688 20 34.0625 20 34.0625C20 34.0625 28.4063 34.0469 34 33.6484C34.7812 33.5547 36.4844 33.5469 38.0078 31.9531C39.2109 30.7422 39.6016 27.9844 39.6016 27.9844C39.6016 27.9844 40 24.75 40 21.5078V18.4766C40 15.2422 39.6016 12 39.6016 12ZM15.8672 25.1875V13.9453L26.6719 19.5859L15.8672 25.1875Z"
          fill="white"
        ></path>
      </svg>
    </Link>
  );
};

export { Youtube };