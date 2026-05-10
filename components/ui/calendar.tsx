"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3 rounded-xl", className)}
      components={{
        Chevron: ({ orientation }) => {
          if (orientation === "left")
            return <ChevronLeft className="h-4 w-4" />;
          return <ChevronRight className="h-4 w-4" />;
        },
      }}
      classNames={{
        months: "flex flex-col",
        month: "flex flex-col gap-3",
        month_caption: "",
        caption_label:
          "absolute top-[18px] left-1/2 -translate-x-1/2 inline-flex text-sm font-medium text-neutral-900 select-none",
        nav: "flex items-center justify-between px-1",
        button_previous:
          "inline-flex items-center justify-center rounded-lg h-8 w-8 bg-transparent p-0 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition-colors disabled:opacity-30 cursor-pointer",
        button_next:
          "inline-flex items-center justify-center rounded-lg h-8 w-8 bg-transparent p-0 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition-colors disabled:opacity-30 cursor-pointer",
        month_grid: "w-full",
        weekdays: "flex w-full",
        weekday:
          "flex-1 text-center text-neutral-400 font-medium text-xs uppercase pb-1",
        week: "flex w-full",
        day: "flex-1 text-center p-0",
        day_button: cn(
          "inline-flex items-center justify-center rounded-lg text-sm h-9 w-full p-0 font-normal transition-all cursor-pointer",
          "hover:bg-neutral-100 hover:text-neutral-900",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
        ),
        range_end: "day-range-end",
        selected:
          "rounded-lg bg-accent text-white hover:bg-accent-hover shadow-sm",
        today: "font-semibold text-accent",
        outside: "text-neutral-300",
        disabled: "text-neutral-200",
        range_middle:
          "aria-selected:bg-accent/10 aria-selected:text-accent rounded-none",
        hidden: "invisible",
        ...classNames,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
