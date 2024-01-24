import Image from "next/image";
import Link from "next/link";

export default function User({ user, route }: any) {
  if (user) {
    return (
      <Link href="/account">
        <a className="flex flex-col items-center w-[20%]">
          {route === "/account" ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M18.685 19.097C19.654 18.1865 20.426 17.0869 20.9532 15.8662C21.4803 14.6455 21.7515 13.3297 21.75 12C21.75 6.615 17.385 2.25 12 2.25C6.61501 2.25 2.25001 6.615 2.25001 12C2.24847 13.3297 2.51967 14.6455 3.04686 15.8662C3.57404 17.0869 4.346 18.1865 5.31501 19.097C7.12194 20.8039 9.51435 21.7533 12 21.75C14.4857 21.7533 16.8781 20.8039 18.685 19.097ZM6.14501 17.812C6.84708 16.9336 7.73802 16.2247 8.75164 15.7379C9.76527 15.2511 10.8755 14.9989 12 15C13.1245 14.9989 14.2347 15.2511 15.2484 15.7379C16.262 16.2247 17.1529 16.9336 17.855 17.812C17.089 18.5857 16.1771 19.1996 15.172 19.6181C14.1669 20.0366 13.0887 20.2514 12 20.25C10.9113 20.2514 9.83311 20.0366 8.82803 19.6181C7.82296 19.1996 6.91098 18.5857 6.14501 17.812ZM15.75 9C15.75 9.99456 15.3549 10.9484 14.6517 11.6517C13.9484 12.3549 12.9946 12.75 12 12.75C11.0054 12.75 10.0516 12.3549 9.34836 11.6517C8.64509 10.9484 8.25001 9.99456 8.25001 9C8.25001 8.00544 8.64509 7.05161 9.34836 6.34835C10.0516 5.64509 11.0054 5.25 12 5.25C12.9946 5.25 13.9484 5.64509 14.6517 6.34835C15.3549 7.05161 15.75 8.00544 15.75 9Z"
                fill="#E63131"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          )}
          <p
            className={`${
              (route === "/account" || route === "/account/edit") &&
              "text-brandPrimary600 font-medium"
            }`}
          >
            Akun
          </p>
        </a>
      </Link>
    );
  }
  return (
    <Link href={"/login"}>
      <a
        className={`flex flex-col items-center w-[20%]  ${
          route === "/login" && "text-brandPrimary600 font-medium"
        }`}
      >
        {route === "/login" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        )}
        <p>Akun</p>
      </a>
    </Link>
  );
}
