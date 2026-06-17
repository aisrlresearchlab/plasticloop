"use client";

import * as React from "react";
import {
  Eye,
  Layers3,
  LocateFixed,
  MapPin,
  Maximize2,
  Recycle,
  RotateCcw,
  SlidersHorizontal,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckboxVisual } from "@/features/plastic-twin/components/map-widgets";
import type { MapVariant } from "@/features/plastic-twin/components/map-view";
import type { MapLocation } from "@/features/plastic-twin/types";
import { cn } from "@/lib/utils";

type MapcnCampusMapProps = {
  locations: MapLocation[];
  variant: MapVariant;
};

type MapLayerKey = "buildings" | "hotspots" | "flow" | "collection" | "recycling";

type PositionedLocation = MapLocation & {
  x: number;
  y: number;
};

const layerLabels: Record<MapLayerKey, string> = {
  buildings: "Faculty / Buildings",
  hotspots: "Waste Hotspots",
  flow: "Waste Flow",
  collection: "Collection Points",
  recycling: "Recycling Centers",
};

const campusPositions: Record<string, { x: number; y: number }> = {
  rectorate: { x: 52, y: 20 },
  engineering: { x: 82, y: 48 },
  canteen: { x: 44, y: 47 },
  dormitory: { x: 27, y: 22 },
  library: { x: 72, y: 72 },
  auditorium: { x: 44, y: 34 },
  agriculture: { x: 35, y: 33 },
  social: { x: 32, y: 68 },
  medicine: { x: 67, y: 42 },
  recycling: { x: 18, y: 76 },
};

const buildingBlocks = [
  { x: 12, y: 18, w: 10, h: 8, label: "Animal Science" },
  { x: 28, y: 20, w: 12, h: 7, label: "Agriculture" },
  { x: 48, y: 14, w: 14, h: 9, label: "Rectorate" },
  { x: 68, y: 22, w: 15, h: 8, label: "Fisheries" },
  { x: 22, y: 40, w: 13, h: 8, label: "Math & Science" },
  { x: 41, y: 33, w: 12, h: 7, label: "Auditorium" },
  { x: 63, y: 39, w: 12, h: 7, label: "Medicine" },
  { x: 77, y: 45, w: 13, h: 8, label: "Engineering" },
  { x: 27, y: 66, w: 17, h: 8, label: "Social Sciences" },
  { x: 68, y: 68, w: 15, h: 8, label: "Economics" },
];

const wasteFlowPath = [
  { x: 52, y: 20 },
  { x: 44, y: 34 },
  { x: 44, y: 47 },
  { x: 32, y: 68 },
  { x: 18, y: 76 },
  { x: 72, y: 72 },
  { x: 82, y: 48 },
];

function levelTone(level: MapLocation["level"]) {
  if (level === "high") {
    return {
      bg: "bg-red-600",
      soft: "bg-red-500/20",
      text: "text-red-700",
      badge: "danger" as const,
      ring: "ring-red-500/30",
    };
  }

  if (level === "medium") {
    return {
      bg: "bg-amber-500",
      soft: "bg-amber-400/20",
      text: "text-amber-700",
      badge: "warning" as const,
      ring: "ring-amber-500/30",
    };
  }

  return {
    bg: "bg-emerald-600",
    soft: "bg-emerald-500/20",
    text: "text-emerald-700",
    badge: "success" as const,
    ring: "ring-emerald-500/30",
  };
}

export function MapcnCampusMap({ locations, variant }: MapcnCampusMapProps) {
  const [selectedLocationId, setSelectedLocationId] = React.useState<string>(
    locations[1]?.id ?? locations[0]?.id ?? "",
  );
  const [layers, setLayers] = React.useState<Record<MapLayerKey, boolean>>({
    buildings: true,
    hotspots: true,
    flow: true,
    collection: true,
    recycling: true,
  });
  const [zoomLevel, setZoomLevel] = React.useState(100);
  const [mapMessage, setMapMessage] = React.useState<string | null>(null);

  const positionedLocations = React.useMemo<PositionedLocation[]>(
    () =>
      locations.map((location) => ({
        ...location,
        ...(campusPositions[location.id] ?? { x: 50, y: 50 }),
      })),
    [locations],
  );

  const selectedLocation =
    positionedLocations.find((location) => location.id === selectedLocationId) ??
    positionedLocations[0];

  function toggleLayer(layer: MapLayerKey) {
    setLayers((currentLayers) => ({
      ...currentLayers,
      [layer]: !currentLayers[layer],
    }));
  }

  function resetLayers() {
    setLayers({
      buildings: true,
      hotspots: true,
      flow: true,
      collection: true,
      recycling: true,
    });
    setMapMessage("All map layers are visible.");
  }

  return (
    <div className="relative h-full min-h-[inherit] overflow-hidden bg-[#dff0e6]">
      <div
        className="absolute inset-0 origin-center transition-transform duration-200"
        style={{ transform: `scale(${zoomLevel / 100})` }}
      >
        <CampusBaseMap variant={variant} />

        {layers.buildings ? <BuildingLayer variant={variant} /> : null}
        {layers.flow ? <WasteFlowLayer variant={variant} /> : null}
        {layers.hotspots || layers.collection || layers.recycling ? (
          <LocationLayer
            layers={layers}
            locations={positionedLocations}
            onSelect={(locationId) => {
              setSelectedLocationId(locationId);
              setMapMessage(
                `${locations.find((location) => location.id === locationId)?.name ?? "Location"} selected.`,
              );
            }}
            selectedLocationId={selectedLocation?.id}
            variant={variant}
          />
        ) : null}
      </div>

      <div className="absolute right-3 top-3 z-20 flex gap-2">
        <Button
          className="h-9 bg-white/95 text-slate-800 hover:bg-white"
          onClick={() =>
            setMapMessage(
              variant === "dashboard"
                ? "3D campus view is available on the Digital Twin page."
                : "Compare time mode enabled for this map preview.",
            )
          }
          size="sm"
          type="button"
          variant="outline"
        >
          <Maximize2 className="size-4" />
          {variant === "dashboard" ? "3D View" : "Compare Time"}
        </Button>
      </div>

      {mapMessage ? (
        <div
          className={cn(
            "absolute left-4 z-30 max-w-72 rounded-md bg-white/95 px-3 py-2 text-xs font-medium text-emerald-800 shadow-sm",
            variant === "digital-twin" ? "top-64" : "top-4",
          )}
        >
          {mapMessage}
        </div>
      ) : null}

      {variant === "digital-twin" ? (
        <DigitalTwinControls
          layers={layers}
          onAdvanceSimulation={() =>
            setMapMessage("Map time simulation advanced by one step.")
          }
          onReset={resetLayers}
          onToggle={toggleLayer}
          onViewDetails={() =>
            setMapMessage(`${selectedLocation?.name ?? "Location"} details opened.`)
          }
          selectedLocation={selectedLocation}
        />
      ) : null}

      {variant === "prediction" ? <PredictionLegend /> : null}

      {variant === "dashboard" ? (
        <div className="absolute bottom-4 left-4 right-4 z-20 rounded-lg bg-white/95 px-4 py-3 text-xs shadow-sm">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="font-semibold">Waste Level:</span>
            <LegendDot className="bg-red-600" label="High (>150 kg)" />
            <LegendDot className="bg-amber-500" label="Medium (50 - 150 kg)" />
            <LegendDot className="bg-emerald-600" label="Low (<50 kg)" />
          </div>
        </div>
      ) : null}

      <div className="absolute bottom-4 right-4 z-20 grid overflow-hidden rounded-lg border bg-white shadow-sm">
        <Button
          className="rounded-none border-0"
          onClick={() => setZoomLevel((value) => Math.min(value + 10, 130))}
          size="icon"
          type="button"
          variant="ghost"
        >
          +
        </Button>
        <Button
          className="rounded-none border-0"
          onClick={() => setZoomLevel((value) => Math.max(value - 10, 80))}
          size="icon"
          type="button"
          variant="ghost"
        >
          -
        </Button>
        <Button
          className="rounded-none border-0"
          onClick={() => {
            setZoomLevel(100);
            setSelectedLocationId(locations[0]?.id ?? "");
            setMapMessage("Map centered to the first campus location.");
          }}
          size="icon"
          type="button"
          variant="ghost"
        >
          <LocateFixed className="size-4" />
        </Button>
      </div>
    </div>
  );
}

function CampusBaseMap({ variant }: { variant: MapVariant }) {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_20%,rgba(16,185,129,0.25),transparent_18%),radial-gradient(circle_at_74%_24%,rgba(34,197,94,0.18),transparent_22%),linear-gradient(135deg,#cce7d4,#e7f3df_42%,#b8d7c4)]" />
      <div className="absolute left-[5%] top-[9%] h-[76%] w-[90%] rounded-[44%] border border-white/60 bg-emerald-100/25" />
      <div className="absolute left-[4%] top-[46%] h-[9%] w-[94%] rotate-3 rounded-full bg-slate-200/80 shadow-inner" />
      <div className="absolute left-[45%] top-[7%] h-[86%] w-[7%] -rotate-6 rounded-full bg-slate-200/80 shadow-inner" />
      <div className="absolute left-[16%] top-[17%] h-[68%] w-[5%] rotate-12 rounded-full bg-slate-100/80" />
      <div className="absolute left-[64%] top-[20%] h-[64%] w-[5%] -rotate-12 rounded-full bg-slate-100/80" />
      <div className="absolute left-[39%] top-[51%] h-[22%] w-[22%] rounded-[44%] border-[10px] border-lime-200/90 bg-emerald-500/25" />
      <div className="absolute left-[42%] top-[55%] h-[14%] w-[16%] rounded-[40%] border-2 border-white/70" />
      <div className="absolute left-[48%] top-[36%] h-[12%] w-[20%] rounded-[45%] bg-sky-300/45" />
      <TreeDots />
      {variant === "digital-twin" ? (
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] bg-[size:42px_42px]" />
      ) : null}
    </div>
  );
}

function TreeDots() {
  const dots = [
    [8, 16],
    [14, 11],
    [19, 28],
    [29, 12],
    [38, 18],
    [61, 13],
    [75, 11],
    [86, 18],
    [90, 31],
    [9, 72],
    [17, 84],
    [28, 82],
    [58, 84],
    [73, 80],
    [86, 76],
    [92, 64],
    [13, 51],
    [84, 55],
  ];

  return (
    <>
      {dots.map(([x, y]) => (
        <span
          className="absolute size-5 rounded-full bg-emerald-700/45 shadow-sm"
          key={`${x}-${y}`}
          style={{ left: `${x}%`, top: `${y}%` }}
        />
      ))}
    </>
  );
}

function BuildingLayer({ variant }: { variant: MapVariant }) {
  return (
    <>
      {buildingBlocks.map((building) => (
        <div
          className="absolute z-10 rounded-md border border-white/70 bg-white/90 shadow-sm"
          key={building.label}
          style={{
            left: `${building.x}%`,
            top: `${building.y}%`,
            width: `${building.w}%`,
            height: `${building.h}%`,
          }}
        >
          <div className="h-2 rounded-t-md bg-red-400/80" />
          {variant !== "dashboard" ? (
            <span className="absolute -top-7 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-white px-2 py-1 text-[11px] font-bold text-slate-800 shadow-sm md:block">
              {building.label}
            </span>
          ) : null}
        </div>
      ))}
    </>
  );
}

function WasteFlowLayer({ variant }: { variant: MapVariant }) {
  const points = wasteFlowPath.map((point) => `${point.x},${point.y}`).join(" ");

  return (
    <svg
      className="pointer-events-none absolute inset-0 z-[11] h-full w-full"
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
    >
      <polyline
        fill="none"
        points={points}
        stroke={variant === "digital-twin" ? "#2563eb" : "#109252"}
        strokeDasharray={variant === "digital-twin" ? "2 2" : undefined}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={variant === "digital-twin" ? 1.1 : 0.8}
      />
      {wasteFlowPath.slice(1).map((point) => (
        <circle
          cx={point.x}
          cy={point.y}
          fill={variant === "digital-twin" ? "#38bdf8" : "#10b981"}
          key={`${point.x}-${point.y}`}
          r="0.8"
        />
      ))}
    </svg>
  );
}

function LocationLayer({
  layers,
  locations,
  onSelect,
  selectedLocationId,
  variant,
}: {
  layers: Record<MapLayerKey, boolean>;
  locations: PositionedLocation[];
  onSelect: (locationId: string) => void;
  selectedLocationId?: string;
  variant: MapVariant;
}) {
  return (
    <>
      {locations.map((location) => {
        const visible =
          (location.type === "hotspot" && layers.hotspots) ||
          (location.type === "building" && layers.buildings) ||
          (location.type === "collection" && layers.collection) ||
          (location.type === "recycling" && layers.recycling);

        if (!visible) {
          return null;
        }

        const tone = levelTone(location.level);
        const selected = selectedLocationId === location.id;
        const isPoint =
          location.type === "collection" || location.type === "recycling";

        return (
          <button
            className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
            key={location.id}
            onClick={() => onSelect(location.id)}
            style={{ left: `${location.x}%`, top: `${location.y}%` }}
            type="button"
          >
            {isPoint ? (
              <span
                className={cn(
                  "grid size-8 place-items-center rounded-full border-2 border-white shadow-lg",
                  location.type === "recycling" ? "bg-violet-600" : "bg-emerald-600",
                  selected && "ring-4 ring-white/70",
                )}
              >
                {location.type === "recycling" ? (
                  <Recycle className="size-4 text-white" />
                ) : (
                  <MapPin className="size-4 text-white" />
                )}
              </span>
            ) : (
              <span
                className={cn(
                  "relative grid size-11 place-items-center rounded-full text-xs font-black text-white shadow-xl ring-8",
                  tone.bg,
                  tone.ring,
                  selected && "scale-110 ring-white/80",
                )}
              >
                {location.wasteKg}
                <span className={cn("absolute inset-0 -z-10 rounded-full", tone.soft)} />
              </span>
            )}
            {variant !== "dashboard" ? (
              <span className="mt-2 hidden max-w-36 rounded-md bg-white/95 px-2 py-1 text-[11px] font-bold text-slate-800 shadow-sm md:block">
                {location.shortName}
              </span>
            ) : null}
          </button>
        );
      })}
    </>
  );
}

function DigitalTwinControls({
  layers,
  onAdvanceSimulation,
  onReset,
  onToggle,
  onViewDetails,
  selectedLocation,
}: {
  layers: Record<MapLayerKey, boolean>;
  onAdvanceSimulation: () => void;
  onReset: () => void;
  onToggle: (layer: MapLayerKey) => void;
  onViewDetails: () => void;
  selectedLocation?: PositionedLocation;
}) {
  return (
    <>
      <Card className="absolute left-4 top-4 z-30 hidden w-56 bg-white/95 p-4 shadow-md md:block">
        <div className="flex items-center gap-2">
          <Layers3 className="size-4 text-emerald-700" />
          <p className="font-semibold text-slate-950">Map Layers</p>
        </div>
        <div className="mt-3 space-y-3 text-sm">
          {(Object.keys(layerLabels) as MapLayerKey[]).map((layer) => (
            <button
              className="flex w-full items-center gap-2 text-left"
              key={layer}
              onClick={() => onToggle(layer)}
              type="button"
            >
              <CheckboxVisual checked={layers[layer]} />
              <span>{layerLabels[layer]}</span>
            </button>
          ))}
          <Button className="mt-2 w-full" onClick={onReset} size="sm" variant="outline">
            <RotateCcw className="size-4" />
            Reset Layers
          </Button>
        </div>
      </Card>

      {selectedLocation ? (
        <Card className="absolute bottom-4 left-4 z-30 hidden w-64 bg-white/95 p-4 shadow-md md:block">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs text-muted-foreground">Selected Location</p>
              <p className="mt-1 font-semibold text-slate-950">
                {selectedLocation.name}
              </p>
            </div>
            <Badge variant={levelTone(selectedLocation.level).badge}>
              {selectedLocation.wasteKg} kg
            </Badge>
          </div>
          <div className="mt-3 space-y-1 text-xs text-slate-600">
            <p>Waste today: +15.6% vs yesterday</p>
            <p>Dominant type: PET (48%)</p>
            <p>Recycling rate: {selectedLocation.recyclingRate ?? 0}%</p>
          </div>
          <Button
            className="mt-3 w-full"
            onClick={onViewDetails}
            size="sm"
            type="button"
            variant="outline"
          >
            <Eye className="size-4" />
            View Details
          </Button>
        </Card>
      ) : null}

      <Card className="absolute right-4 top-16 z-30 hidden w-56 bg-white/95 p-4 shadow-md lg:block">
        <p className="font-semibold text-slate-950">Legend</p>
        <div className="mt-3 space-y-2 text-xs">
          <p className="font-medium">Waste Hotspots (kg)</p>
          <LegendDot className="bg-red-600" label="High (> 30 kg)" />
          <LegendDot className="bg-amber-500" label="Medium (15 - 30 kg)" />
          <LegendDot className="bg-emerald-600" label="Low (< 15 kg)" />
          <p className="pt-2 font-medium">Waste Flow (kg/day)</p>
          <LegendLine className="bg-red-500" label="High (> 50 kg)" />
          <LegendLine className="bg-amber-500" label="Medium (20 - 50 kg)" />
          <LegendLine className="bg-blue-500" label="Low (< 20 kg)" />
        </div>
      </Card>

      <Card className="absolute bottom-24 right-4 z-30 hidden w-52 bg-white/95 p-4 shadow-md lg:block">
        <p className="font-semibold text-slate-950">Waste by Type</p>
        <div className="mt-3 grid place-items-center">
          <div className="grid size-24 place-items-center rounded-full bg-[conic-gradient(#2563eb_0_42%,#16a34a_42%_65%,#f59e0b_65%_83%,#7c3aed_83%_94%,#94a3b8_94%)]">
            <div className="grid size-14 place-items-center rounded-full bg-white text-center text-xs font-bold">
              2,845 kg
            </div>
          </div>
        </div>
      </Card>

      <Card className="absolute bottom-4 left-72 right-72 z-30 hidden bg-white/95 p-4 shadow-md xl:block">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-slate-950">Time Slider Simulation</p>
            <p className="text-xs text-muted-foreground">
              Simulate waste distribution at different times
            </p>
          </div>
          <Badge variant="success">10:30</Badge>
        </div>
        <div className="mt-4 flex items-center gap-4">
          <Button onClick={onAdvanceSimulation} size="icon" type="button">
            <SlidersHorizontal className="size-4" />
          </Button>
          <div className="h-2 flex-1 rounded-full bg-slate-200">
            <div className="relative h-2 w-3/5 rounded-full bg-emerald-600">
              <span className="absolute right-0 top-1/2 size-5 -translate-y-1/2 rounded-full border-4 border-white bg-emerald-600 shadow" />
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}

function PredictionLegend() {
  return (
    <Card className="absolute right-4 top-14 z-30 hidden bg-white/95 p-4 text-xs shadow-md md:block">
      <p className="font-semibold text-slate-950">Risk Level</p>
      <div className="mt-3 space-y-2">
        <LegendDot className="bg-red-600" label="High Risk (> 250 kg)" />
        <LegendDot className="bg-amber-500" label="Medium Risk (150 - 250 kg)" />
        <LegendDot className="bg-emerald-600" label="Low Risk (< 150 kg)" />
      </div>
    </Card>
  );
}

function LegendDot({ className, label }: { className: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={cn("size-2.5 shrink-0 rounded-full", className)} />
      <span className="text-slate-700">{label}</span>
    </div>
  );
}

function LegendLine({ className, label }: { className: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={cn("h-0.5 w-5 shrink-0 rounded-full", className)} />
      <span className="text-slate-700">{label}</span>
    </div>
  );
}
