import React from "react";
import { iconMap } from "@/utils/iconMap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const LectureCard = ({ icon, title, slides, part1, part2 }) => {
  const iconSrc = iconMap[icon] || icon;

  return (
    <Card className="w-full max-w-sm overflow-hidden rounded-lg shadow-md dark:bg-slate-800/50">
      <CardHeader className="items-center p-4 text-center bg-sky-200 dark:bg-sky-900/50">
        {iconSrc && (
          <img src={iconSrc} alt={`${title} icon`} className="h-16 w-16 mb-2" />
        )}
        <CardTitle className="flex h-16 items-center text-xl font-bold text-slate-900 dark:text-slate-100">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <Button
          asChild
          variant="outline"
          className="w-full rounded-none border-x-0 border-b-0 border-t-2 py-7 text-base"
        >
          <a href={slides} target="_blank" rel="noopener noreferrer">
            Διαφάνειες
          </a>
        </Button>

        {/* Lectures Buttons Container */}
        <div className="flex">
          <Button
            asChild
            variant="outline"
            className="w-1/2 rounded-none border-x-0 border-b-0 border-t-2 border-r-2 py-7 text-base"
          >
            <a href={part1} target="_blank" rel="noopener noreferrer">
              Διάλεξη Μέρος 1
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="w-1/2 rounded-none border-x-0 border-b-0 border-t-2 py-7 text-base"
          >
            <a href={part2} target="_blank" rel="noopener noreferrer">
              Διάλεξη Μέρος 2
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LectureCard;
