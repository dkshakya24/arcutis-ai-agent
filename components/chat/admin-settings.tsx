"use client"

import { useState } from "react"
import { Info, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function AdminSettings() {
  const [savedConfig, setSavedConfig] = useState({
    temperature: 0.7,
    topP: 0.95,
    freqPenalty: 0,
    presPenalty: 0,
    stopSequence: "",
  })

  const [temperature, setTemperature] = useState([savedConfig.temperature])
  const [topP, setTopP] = useState([savedConfig.topP])
  const [freqPenalty, setFreqPenalty] = useState([savedConfig.freqPenalty])
  const [presPenalty, setPresPenalty] = useState([savedConfig.presPenalty])
  const [stopSequence, setStopSequence] = useState(savedConfig.stopSequence)
  const [open, setOpen] = useState(false)

  const handleCancel = () => {
    setTemperature([savedConfig.temperature])
    setTopP([savedConfig.topP])
    setFreqPenalty([savedConfig.freqPenalty])
    setPresPenalty([savedConfig.presPenalty])
    setStopSequence(savedConfig.stopSequence)
    setOpen(false)
  }

  const handleSubmit = () => {
    setSavedConfig({
      temperature: temperature[0],
      topP: topP[0],
      freqPenalty: freqPenalty[0],
      presPenalty: presPenalty[0],
      stopSequence,
    })
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
          <SlidersHorizontal className="h-5 w-5" />
          <span className="sr-only">Admin Settings</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4" align="end">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Configuration</h4>
            <p className="text-sm text-muted-foreground">Adjust the model parameters.</p>
          </div>
          <div className="grid gap-4">
            {/* Temperature */}
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Label htmlFor="temperature">Temperature</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-3 w-3 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>Controls randomness: lowering results in less random completions.</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Slider
                  id="temperature"
                  max={1}
                  step={0.01}
                  value={temperature}
                  onValueChange={setTemperature}
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={temperature[0]}
                  onChange={(e) => setTemperature([Number.parseFloat(e.target.value)])}
                  className="w-16 h-8 text-xs"
                  step={0.1}
                  max={1}
                  min={0}
                />
              </div>
            </div>

            {/* Top P */}
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Label htmlFor="top-p">Top P</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-3 w-3 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>Controls diversity via nucleus sampling.</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Slider id="top-p" max={1} step={0.01} value={topP} onValueChange={setTopP} className="flex-1" />
                <Input
                  type="number"
                  value={topP[0]}
                  onChange={(e) => setTopP([Number.parseFloat(e.target.value)])}
                  className="w-16 h-8 text-xs"
                  step={0.01}
                  max={1}
                  min={0}
                />
              </div>
            </div>

            {/* Stop Sequence */}
            <div className="grid gap-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="stop-sequence">Stop sequence</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-3 w-3 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>A sequence where the API will stop generating further tokens.</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id="stop-sequence"
                placeholder="Stop sequence"
                value={stopSequence}
                onChange={(e) => setStopSequence(e.target.value)}
                className="h-8"
              />
            </div>

            {/* Frequency Penalty */}
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Label htmlFor="freq-penalty">Frequency penalty</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-3 w-3 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        How much to penalize new tokens based on their existing frequency in the text so far.
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Slider
                  id="freq-penalty"
                  max={2}
                  step={0.1}
                  value={freqPenalty}
                  onValueChange={setFreqPenalty}
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={freqPenalty[0]}
                  onChange={(e) => setFreqPenalty([Number.parseFloat(e.target.value)])}
                  className="w-16 h-8 text-xs"
                  step={0.1}
                  max={2}
                  min={0}
                />
              </div>
            </div>

            {/* Presence Penalty */}
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Label htmlFor="pres-penalty">Presence penalty</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-3 w-3 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        How much to penalize new tokens based on whether they appear in the text so far.
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Slider
                  id="pres-penalty"
                  max={2}
                  step={0.1}
                  value={presPenalty}
                  onValueChange={setPresPenalty}
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={presPenalty[0]}
                  onChange={(e) => setPresPenalty([Number.parseFloat(e.target.value)])}
                  className="w-16 h-8 text-xs"
                  step={0.1}
                  max={2}
                  min={0}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t">
            <Button variant="outline" size="sm" onClick={handleCancel}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
