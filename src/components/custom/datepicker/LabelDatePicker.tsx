'use client'

import { format } from "date-fns"
import { ko } from "date-fns/locale" // Add Korean locale
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface LabelDatePickerProps {
  label: string
  value?: Date
  onChange?: (date?: Date) => void
  className?: string
}

export function LabelDatePicker({
  label,
  value,
  onChange,
  className,
}: LabelDatePickerProps) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !value && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? format(value, "PPP", { locale: ko }) : label}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={onChange}
            initialFocus
            locale={ko} // Add Korean locale
            weekStartsOn={0} // Sunday as first day
            formatters={{
              formatWeekdayName: (day) => 
                format(day, "EEE", { locale: ko }),
              formatCaption: (date) => 
                format(date, "yyyy년 MM월", { locale: ko }),
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
