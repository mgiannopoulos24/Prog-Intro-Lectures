import React, { useState, useEffect } from "react";
import { loadImage } from "@/utils/imageLoader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProfessorSwitch from "@/components/buttons/ProfessorSwitch";
import { cn } from "@/lib/utils";

const LectureCard = ({ icon, title, slides, prof1, prof2 }) => {
  const [iconSrc, setIconSrc] = useState(null);
  const [selectedProf, setSelectedProf] = useState("prof1");

  useEffect(() => {
    const fetchImage = async () => {
      if (icon) {
        const src = await loadImage(icon);
        setIconSrc(src);
      }
    };
    fetchImage();
  }, [icon]);

  const lectures = selectedProf === "prof1" ? prof1 : prof2;

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

        <div className="flex justify-center items-center gap-4 p-3 border-t-2 bg-slate-100 dark:border-slate-700 dark:bg-slate-800/50">
          <span
            className={cn(
              "text-sm font-semibold transition-colors",
              selectedProf === "prof1"
                ? "text-sky-600 dark:text-sky-400"
                : "text-slate-500 dark:text-slate-400",
            )}
          >
            Αυγερινός
          </span>
          <ProfessorSwitch value={selectedProf} onChange={setSelectedProf} />
          <span
            className={cn(
              "text-sm font-semibold transition-colors",
              selectedProf === "prof2"
                ? "text-sky-600 dark:text-sky-400"
                : "text-slate-500 dark:text-slate-400",
            )}
          >
            Σταματόπουλος
          </span>
        </div>
        <div className="flex">
          <Button
            asChild
            variant="outline"
            className="w-1/2 rounded-none border-x-0 border-b-0 border-t-2 border-r-2 py-7 text-base"
          >
            <a href={lectures.part1} target="_blank" rel="noopener noreferrer">
              Διάλεξη Μέρος 1
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="w-1/2 rounded-none border-x-0 border-b-0 border-t-2 py-7 text-base"
          >
            <a href={lectures.part2} target="_blank" rel="noopener noreferrer">
              Διάλεξη Μέρος 2
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LectureCard;
