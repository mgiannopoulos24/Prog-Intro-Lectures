import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const BackToChalls = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Set state to true if user has scrolled more than 10px, for example
      setIsScrolled(window.scrollY > 10);
    };

    // Add event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array means this effect runs only once on mount

  return (
    <Button
      asChild // This is the key prop: the Button will render its child (the Link)
      className={cn(
        // Base classes for positioning, styling, and transitions
        "fixed top-20 left-5 z-40 h-auto rounded-full shadow-lg",
        "bg-sky-300 text-black hover:bg-sky-400",
        "dark:bg-sky-700 dark:text-slate-100 dark:hover:bg-sky-600",
        "transition-all duration-300 ease-in-out",
        // Conditional classes based on the scroll state
        {
          "px-3 py-2": !isScrolled, // Larger padding when at the top
          "p-2": isScrolled, // Smaller, square-like padding when scrolled
        },
      )}
    >
      <Link to="/CodeChallenges">
        <div className="flex items-center">
          <ChevronLeft className="h-5 w-5" />
          {/* 
            The text is wrapped in a span with its own transition.
            It shrinks to zero width and fades out when scrolled.
          */}
          <span
            className={cn(
              "overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out",
              {
                "max-w-xs ml-2": !isScrolled, // Visible and has margin
                "max-w-0 ml-0": isScrolled, // Hidden (zero width)
              },
            )}
          >
            Challenges
          </span>
        </div>
      </Link>
    </Button>
  );
};

export default BackToChalls;
