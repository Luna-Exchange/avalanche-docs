"use client";

import React, { useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import dayjs from "dayjs";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
} from "lucide-react";

interface DatePickerProps {
  value?: string;
  onChange?: (date: Date) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ value, onChange }) => {
  const [date, setDate] = useState(value ? dayjs(value) : null);
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [open, setOpen] = useState(false);

  const handleSelect = (day: React.SetStateAction<dayjs.Dayjs | null>) => {
    if (day) {
      setDate(day);
      if (typeof day === "function") {
        const newDate = day(dayjs());
        if (newDate) {
          onChange?.(newDate.toDate());
        }
      } else {
        onChange?.(day.toDate());
      }
    }
    setOpen(false);
  };

  const previousMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, "month"));
  };

  const nextMonth = () => {
    setCurrentMonth(currentMonth.add(1, "month"));
  };

  const generateCalendarDays = () => {
    const firstDayOfMonth = currentMonth.startOf("month");
    const lastDayOfMonth = currentMonth.endOf("month");

    let calendarStart = firstDayOfMonth.startOf("week");

    let calendarEnd = lastDayOfMonth.endOf("week");

    const days = [];
    let day = calendarStart;

    while (day.isBefore(calendarEnd) || day.isSame(calendarEnd, "day")) {
      days.push(day);
      day = day.add(1, "day");
    }

    return days;
  };

  const calendarDays = generateCalendarDays();
  const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button
          className={`inline-flex items-center justify-between h-11 rounded-md bg-gray-800 px-4 py-2 text-sm focus:outline-none min-w-[160px] ${
            date ? "text-white" : "text-[#9F9FA9]"
          } `}
          aria-label="Select date"
        >
          {date ? date.format("MMM D, YYYY") : "Select date"}
          <CalendarIcon
            className="ml-2 h-4 w-4"
            color={`${date ? "#fff" : "#9F9FA9"}`}
          />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="bg-gray-800 text-white p-4 rounded-md shadow-md z-50 w-[300px]"
          sideOffset={5}
          align="start"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <button
                onClick={previousMonth}
                className="p-2 hover:bg-gray-700 rounded-md focus:outline-none"
                aria-label="Previous month"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="font-medium">
                {currentMonth.format("MMMM YYYY")}
              </div>
              <button
                onClick={nextMonth}
                className="p-2 hover:bg-gray-700 rounded-md focus:outline-none"
                aria-label="Next month"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div>
              <div className="grid grid-cols-7 mb-2">
                {weekDays.map((day) => (
                  <div
                    key={day}
                    className="text-center text-xs text-gray-400 py-1"
                  >
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day) => {
                  const isCurrentMonth = day.month() === currentMonth.month();
                  const isSelected = date ? day.isSame(date, "day") : false;

                  return (
                    <button
                      key={day.format()}
                      onClick={() => handleSelect(day)}
                      className={`
                        h-8 w-8 rounded-full flex items-center justify-center text-sm
                        ${isCurrentMonth ? "text-white" : "text-gray-500"}
                        ${
                          isSelected
                            ? "bg-red-500 text-white hover:bg-red-600"
                            : "hover:bg-gray-700"
                        }
                        focus:outline-none
                      `}
                    >
                      {day.date()}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <Popover.Arrow className="fill-gray-800" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default DatePicker;
