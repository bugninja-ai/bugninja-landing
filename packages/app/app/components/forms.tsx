'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { CalendarIcon } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { format } from 'date-fns'

export function FormShowcase() {
  const [date, setDate] = React.useState<Date>()

  return (
    <div className="space-y-8">
      {/* Text Input */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Text Input</h3>
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-2">
            <Label>Form Label</Label>
            <Input placeholder="Placeholder text..." />
          </div>
          <div className="space-y-2">
            <Label>Disabled</Label>
            <Input placeholder="Placeholder text..." disabled />
          </div>
        </div>
      </div>

      {/* Text Area */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Text Area</h3>
        <div className="space-y-2">
          <Label>Form Label</Label>
          <Textarea placeholder="Placeholder text..." />
        </div>
      </div>

      {/* Select Dropdown */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Select Dropdown</h3>
        <div className="space-y-2">
          <Label>Select an option</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option1">Option 1</SelectItem>
              <SelectItem value="option2">Option 2</SelectItem>
              <SelectItem value="option3">Option 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Checkbox */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Checkbox</h3>
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I agree to terms
          </label>
        </div>
      </div>

      {/* Radio Button */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Radio Button</h3>
        <RadioGroup defaultValue="option1">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option1" id="option1" />
              <Label htmlFor="option1">Option 1</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option2" id="option2" />
              <Label htmlFor="option2">Option 2</Label>
            </div>
          </div>
        </RadioGroup>
      </div>

      {/* Toggle/Switch */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Toggle/Switch</h3>
        <div className="flex items-center space-x-2">
          <Switch id="airplane-mode" />
          <Label htmlFor="airplane-mode">Airplane Mode</Label>
        </div>
      </div>

      {/* Slider */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Slider</h3>
        <div className="space-y-2">
          <Label>Volume</Label>
          <Slider defaultValue={[66]} max={100} step={1} />
        </div>
      </div>

      {/* Date Picker */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Date Picker</h3>
        <div className="space-y-2">
          <Label>Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'w-full justify-start text-left font-normal',
                  !date && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, 'PPP') : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* File Upload */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">File Upload</h3>
        <div className="space-y-2">
          <Label>File Upload</Label>
          <Input type="file" />
        </div>
      </div>

      {/* Form Validation */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Form Validation</h3>
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-2">
            <Label>Valid Input</Label>
            <Input defaultValue="Correct input" className="border-green-500" />
            <p className="text-sm text-green-600">Looks good!</p>
          </div>
          <div className="space-y-2">
            <Label>Invalid Input</Label>
            <Input defaultValue="Wrong input" className="border-red-500" />
            <p className="text-sm text-red-600">This field is required!</p>
          </div>
        </div>
      </div>

      {/* Form Group */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Form Group</h3>
        <div className="space-y-4 rounded-lg border p-4">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input defaultValue="John Doe" />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input type="email" defaultValue="john@example.com" />
          </div>
        </div>
      </div>
    </div>
  )
} 