/* eslint-disable @next/next/no-img-element */
/** biome-ignore-all lint/a11y/noStaticElementInteractions: <explanation> */
"use client"

import { Player, Position } from "@/types"
import { mergeCn } from "@/utils/cn"
import Image from "next/image"
import { useState } from "react"
import { Button } from "../button"

const FORMATIONS = {
  "3-4-3": [
    { top: "92%", left: "50%", label: Position.GOL },
    { top: "75%", left: "25%", label: Position.DEF },
    { top: "75%", left: "50%", label: Position.DEF },
    { top: "75%", left: "75%", label: Position.DEF },
    { top: "45%", left: "15%", label: Position.MEI },
    { top: "45%", left: "38%", label: Position.MEI },
    { top: "45%", left: "62%", label: Position.MEI },
    { top: "45%", left: "85%", label: Position.MEI },
    { top: "20%", left: "20%", label: Position.ATA },
    { top: "20%", left: "50%", label: Position.ATA },
    { top: "20%", left: "80%", label: Position.ATA },
  ],
  "3-5-2": [
    { top: "90%", left: "50%", label: Position.GOL },
    { top: "75%", left: "25%", label: Position.DEF },
    { top: "75%", left: "50%", label: Position.DEF },
    { top: "75%", left: "75%", label: Position.DEF },
    { top: "45%", left: "15%", label: Position.MEI },
    { top: "50%", left: "35%", label: Position.MEI },
    { top: "50%", left: "50%", label: Position.MEI },
    { top: "50%", left: "65%", label: Position.MEI },
    { top: "45%", left: "85%", label: Position.MEI },
    { top: "20%", left: "35%", label: Position.ATA },
    { top: "20%", left: "65%", label: Position.ATA },
  ],
  "4-3-3": [
    { top: "90%", left: "50%", label: Position.GOL },
    { top: "75%", left: "15%", label: Position.DEF },
    { top: "75%", left: "38%", label: Position.DEF },
    { top: "75%", left: "62%", label: Position.DEF },
    { top: "75%", left: "85%", label: Position.DEF },
    { top: "50%", left: "25%", label: Position.MEI },
    { top: "50%", left: "50%", label: Position.MEI },
    { top: "50%", left: "75%", label: Position.MEI },
    { top: "20%", left: "20%", label: Position.ATA },
    { top: "20%", left: "50%", label: Position.ATA },
    { top: "20%", left: "80%", label: Position.ATA },
  ],
  "4-4-2": [
    { top: "90%", left: "50%", label: Position.GOL },
    { top: "75%", left: "15%", label: Position.DEF },
    { top: "75%", left: "38%", label: Position.DEF },
    { top: "75%", left: "62%", label: Position.DEF },
    { top: "75%", left: "85%", label: Position.DEF },
    { top: "50%", left: "15%", label: Position.MEI },
    { top: "50%", left: "38%", label: Position.MEI },
    { top: "50%", left: "62%", label: Position.MEI },
    { top: "50%", left: "85%", label: Position.MEI },
    { top: "20%", left: "35%", label: Position.ATA },
    { top: "20%", left: "65%", label: Position.ATA },
  ],
  "4-5-1": [
    { top: "90%", left: "50%", label: Position.GOL },
    { top: "75%", left: "15%", label: Position.DEF },
    { top: "75%", left: "38%", label: Position.DEF },
    { top: "75%", left: "62%", label: Position.DEF },
    { top: "75%", left: "85%", label: Position.DEF },
    { top: "50%", left: "15%", label: Position.MEI },
    { top: "50%", left: "32%", label: Position.MEI },
    { top: "50%", left: "50%", label: Position.MEI },
    { top: "50%", left: "68%", label: Position.MEI },
    { top: "50%", left: "85%", label: Position.MEI },
    { top: "20%", left: "50%", label: Position.ATA },
  ],
  "5-3-2": [
    { top: "100%", left: "50%", label: Position.GOL },
    { top: "75%", left: "10%", label: Position.DEF },
    { top: "75%", left: "30%", label: Position.DEF },
    { top: "75%", left: "50%", label: Position.DEF },
    { top: "75%", left: "70%", label: Position.DEF },
    { top: "75%", left: "90%", label: Position.DEF },
    { top: "50%", left: "25%", label: Position.MEI },
    { top: "50%", left: "50%", label: Position.MEI },
    { top: "50%", left: "75%", label: Position.MEI },
    { top: "20%", left: "35%", label: Position.ATA },
    { top: "20%", left: "65%", label: Position.ATA },
  ],
  "5-4-1": [
    { top: "90%", left: "50%", label: Position.GOL },
    { top: "75%", left: "10%", label: Position.DEF },
    { top: "75%", left: "30%", label: Position.DEF },
    { top: "75%", left: "50%", label: Position.DEF },
    { top: "75%", left: "70%", label: Position.DEF },
    { top: "75%", left: "90%", label: Position.DEF },
    { top: "50%", left: "15%", label: Position.MEI },
    { top: "50%", left: "38%", label: Position.MEI },
    { top: "50%", left: "62%", label: Position.MEI },
    { top: "50%", left: "85%", label: Position.MEI },
    { top: "20%", left: "50%", label: Position.ATA },
  ],
}

export type FormationKey = keyof typeof FORMATIONS

interface TacticalFieldProps {
  teamName: string
  flag?: string
  handlePositionClick: (position: Position) => void
  selectedCellIndex: number | null
  setSelectedCellIndex: (index: number | null) => void
  lineup: { player: Player; positionIndex: number }[]
  onSaveTeam: (formation: FormationKey) => void
  formationDefault?: FormationKey
  className?: string
}

export function TacticalField({
  teamName,
  flag,
  handlePositionClick,
  selectedCellIndex,
  setSelectedCellIndex,
  lineup,
  onSaveTeam,
  formationDefault,
  className,
}: TacticalFieldProps) {
  const [formation, setFormation] = useState<FormationKey>(
    formationDefault ?? "4-4-2",
  )

  return (
    <div
      className={mergeCn(
        "glass-card p-4 flex flex-col items-center",
        className,
      )}
    >
      <div className="flex justify-between items-center w-full mb-4 px-2">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">
            Equipe
          </span>
          <div>
            {flag && (
              <Image
                src={flag}
                alt={teamName}
                width={20}
                height={20}
                className="inline-block mr-2"
              />
            )}
            <span className="text-sm font-black italic uppercase">
              {teamName}
            </span>
          </div>
        </div>

        <select
          value={formation}
          onChange={(e) => setFormation(e.target.value as FormationKey)}
          className="bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold p-1 outline-none focus:border-neon/50 transition-colors"
        >
          {Object.keys(FORMATIONS).map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full aspect-[3/4] border-2 border-white/10 rounded-3xl relative bg-green-950/20 overflow-hidden shadow-inner">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-20 border-b border-x border-white/10" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-20 border-t border-x border-white/10" />
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border border-white/10 rounded-full" />

        {FORMATIONS[formation].map((pos, index) => {
          const isSelected = selectedCellIndex === index
          const playerSelected = lineup.find(
            (l) => l.positionIndex === index,
          )?.player

          return (
            <div
              key={`${formation}-${String(index)}`}
              className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-in-out"
              style={{ top: pos.top, left: pos.left }}
            >
              <div className="flex flex-col items-center gap-1 group">
                {playerSelected ? (
                  // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
                  <img
                    src={playerSelected?.image || ""}
                    alt={playerSelected.name}
                    referrerPolicy="no-referrer"
                    className="object-cover rounded-full h-12 w-12"
                    onClick={() => {
                      handlePositionClick(pos.label)
                      setSelectedCellIndex(index)
                    }}
                  />
                ) : (
                  // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
                  <div
                    className={mergeCn(
                      "w-16 h-16 rounded-full bg-white/5 border border-white/20 flex items-center justify-center text-[9px] font-bold text-gray-400 group-hover:border-neon group-hover:text-neon transition-all cursor-pointer shadow-lg backdrop-blur-sm",
                      isSelected && "border-neon text-neon",
                    )}
                    onClick={() => {
                      handlePositionClick(pos.label)
                      setSelectedCellIndex(index)
                    }}
                  >
                    {pos.label}
                  </div>
                )}
                {playerSelected && (
                  <span className="text-[8px] bg-black/60 px-1 rounded uppercase truncate max-w-[60px]">
                    {playerSelected.name}
                  </span>
                )}
                <div className="w-12 h-1 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className={mergeCn(
                      "w-0 h-full bg-neon group-hover:w-full transition-all duration-300",
                      isSelected && "w-full",
                    )}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <Button
        name={`Salvar Tática ${formation}`}
        className={mergeCn(
          "w-full mt-4 py-3 bg-white/5 border border-white/10rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400",
          {
            " hover:border-neon/30 hover:text-neon transition-all text-white hover:bg-neon/10":
              lineup.length === 11,
          },
        )}
        onClick={() => onSaveTeam(formation)}
        disabled={lineup.length < 11}
      />
    </div>
  )
}
