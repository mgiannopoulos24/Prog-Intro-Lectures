import React, { useState, useEffect } from "react";
import { loadImage } from "../../utils/imageLoader";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const LabCard = ({ icon, title, desc, solution }) => {
  const [iconSrc, setIconSrc] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      if (icon) {
        const src = await loadImage(icon);
        setIconSrc(src);
      }
    };
    fetchImage();
  }, [icon]);

  return (
    <Card className="w-full max-w-sm overflow-hidden rounded-lg shadow-md dark:bg-slate-800/50">
      {/* Card Header with a distinct background */}
      <CardHeader className="items-center p-4 text-center bg-sky-200 dark:bg-sky-900/50">
        {iconSrc && (
          <img src={iconSrc} alt={`${title} icon`} className="h-16 w-16 mb-2" />
        )}
        <CardTitle className="flex h-16 items-center text-xl font-bold text-slate-900 dark:text-slate-100">
          {title}
        </CardTitle>
      </CardHeader>

      {/* Card Content holds the stacked buttons */}
      <CardContent className="flex flex-col p-0">
        {/* "Εκφώνηση" Button */}
        <Button
          asChild // Use the child <a> tag for navigation
          variant="outline"
          className="w-full rounded-none border-x-0 border-b-2 border-t-2 py-7 text-base"
        >
          <a href={desc} target="_blank" rel="noopener noreferrer">
            Εκφώνηση εργαστηρίου
          </a>
        </Button>

        {/* "Λύση" Button */}
        <Button
          asChild
          variant="outline"
          className="w-full rounded-none border-x-0 border-b-0 border-t-0 py-7 text-base"
        >
          <a href={solution} target="_blank" rel="noopener noreferrer">
            Λύση εργαστηρίου
          </a>
        </Button>
      </CardContent>
    </Card>
  );
};

export default LabCard;
