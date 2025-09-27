import React from "react";

const Footer = () => {
  return (
    <footer
      className="
        mt-10 
        w-full 
        border-t 
        border-slate-200 
        bg-slate-50 
        py-2 
        text-center 
        text-[10px]
        dark:border-slate-800 
        dark:bg-slate-900 
        dark:text-slate-400
      "
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-0.5">
          <p>
            &copy; {new Date().getFullYear()} Prog Intro Lectures. All rights
            reserved.
          </p>
          <p>
            Designed and Developed by{" "}
            <a
              href="https://github.com/matinanadali"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-blue-500 dark:text-slate-300"
            >
              matinanadali
            </a>{" "}
            and{" "}
            <a
              href="https://github.com/mgiannopoulos24"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-blue-500 dark:text-slate-300"
            >
              mgiannopoulos24
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
