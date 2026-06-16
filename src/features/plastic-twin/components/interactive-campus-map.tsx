"use client";

import * as L from "leaflet";
import {
  Circle,
  MapContainer,
  Marker,
  Polygon,
  Polyline,
  Popup,
  TileLayer,
} from "react-leaflet";
import {
  LocateFixed,
  Maximize2,
  RotateCcw,
  SlidersHorizontal,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckboxVisual } from "@/features/plastic-twin/components/map-widgets";
import type { MapVariant } from "@/features/plastic-twin/components/map-view";
import type { MapLocation } from "@/features/plastic-twin/types";

type InteractiveCampusMapProps = {
  locations: MapLocation[];
  variant: MapVariant;
};

const campusCenter: [number, number] = [-1.4583, 124.8269];

const campusBoundary: Array<[number, number]> = [
  [-1.4528, 124.8214],
  [-1.4528, 124.8331],
  [-1.4641, 124.8342],
  [-1.4645, 124.8218],
];

const wasteFlow: Array<[number, number]> = [
  [-1.456, 124.826],
  [-1.4576, 124.8227],
  [-1.4608, 124.8249],
  [-1.4617, 124.8266],
  [-1.459, 124.831],
  [-1.4627, 124.8222],
];

function levelColor(level: MapLocation["level"]) {
  if (level === "high") {
    return "#dc2626";
  }

  if (level === "medium") {
    return "#f59e0b";
  }

  return "#10b981";
}

function createLocationIcon(location: MapLocation) {
  if (location.type === "collection" || location.type === "recycling") {
    return L.divIcon({
      className: "",
      html: `<div class="map-pin-icon" style="width:28px;height:28px;background:${location.type === "recycling" ? "#7c3aed" : "#109252"}"><span>${location.type === "recycling" ? "R" : ""}</span></div>`,
      iconAnchor: [14, 28],
      popupAnchor: [0, -26],
    });
  }

  const color = levelColor(location.level);

  return L.divIcon({
    className: "",
    html: `<div class="map-hotspot-icon" style="width:38px;height:38px;background:${color}">${location.wasteKg}</div>`,
    iconAnchor: [19, 19],
    popupAnchor: [0, -16],
  });
}

export function InteractiveCampusMap({
  locations,
  variant,
}: InteractiveCampusMapProps) {
  const showDigitalOverlay = variant === "digital-twin";
  const showPredictionOverlay = variant === "prediction";
  const highRiskLocations = locations.filter((location) => location.level !== "low");

  return (
    <div className="relative h-full min-h-[inherit]">
      <MapContainer
        center={campusCenter}
        className="z-0"
        maxZoom={19}
        minZoom={14}
        scrollWheelZoom={false}
        zoom={variant === "digital-twin" ? 16 : 15}
        zoomControl={false}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polygon
          pathOptions={{
            color: "#109252",
            fillColor: "#10b981",
            fillOpacity: 0.08,
            weight: 2,
          }}
          positions={campusBoundary}
        />
        <Polyline
          pathOptions={{
            color: variant === "digital-twin" ? "#2563eb" : "#109252",
            dashArray: variant === "digital-twin" ? "8 8" : undefined,
            weight: variant === "digital-twin" ? 4 : 3,
          }}
          positions={wasteFlow}
        />

        {locations.map((location) => (
          <Marker
            icon={createLocationIcon(location)}
            key={location.id}
            position={location.position}
          >
            <Popup>
              <div className="min-w-40">
                <p className="font-semibold text-slate-950">{location.name}</p>
                <p className="mt-1 text-sm text-slate-600">
                  Waste today: {location.wasteKg} kg
                </p>
                <p className="text-sm text-slate-600">
                  Recycling rate: {location.recyclingRate ?? 0}%
                </p>
              </div>
            </Popup>
          </Marker>
        ))}

        {highRiskLocations.map((location) => (
          <Circle
            center={location.position}
            key={`${location.id}-circle`}
            pathOptions={{
              color: levelColor(location.level),
              fillColor: levelColor(location.level),
              fillOpacity: location.level === "high" ? 0.18 : 0.12,
              weight: 1,
            }}
            radius={location.level === "high" ? 90 : 70}
          />
        ))}
      </MapContainer>

      <div className="absolute right-3 top-3 z-[400] flex gap-2">
        <Button className="h-9 bg-white/95 text-slate-800 hover:bg-white" size="sm" variant="outline">
          <Maximize2 className="size-4" />
          {variant === "dashboard" ? "3D View" : "Compare Time"}
        </Button>
      </div>

      {showDigitalOverlay ? <DigitalTwinOverlay locations={locations} /> : null}
      {showPredictionOverlay ? <PredictionOverlay /> : null}

      <div className="absolute bottom-4 right-4 z-[400] grid overflow-hidden rounded-lg border bg-white shadow-sm">
        <Button className="rounded-none border-0" size="icon" variant="ghost">
          +
        </Button>
        <Button className="rounded-none border-0" size="icon" variant="ghost">
          -
        </Button>
        <Button className="rounded-none border-0" size="icon" variant="ghost">
          <LocateFixed className="size-4" />
        </Button>
      </div>

      {variant === "dashboard" ? (
        <div className="absolute bottom-4 left-4 right-4 z-[400] rounded-lg bg-white/95 px-4 py-3 text-xs shadow-sm">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="font-semibold">Waste Level:</span>
            <LegendDot color="#dc2626" label="High (>150 kg)" />
            <LegendDot color="#f59e0b" label="Medium (50 - 150 kg)" />
            <LegendDot color="#10b981" label="Low (<50 kg)" />
          </div>
        </div>
      ) : null}
    </div>
  );
}

function DigitalTwinOverlay({ locations }: { locations: MapLocation[] }) {
  return (
    <>
      <Card className="absolute left-4 top-4 z-[400] hidden w-52 bg-white/95 p-4 shadow-md md:block">
        <p className="font-semibold text-slate-950">Map Layers</p>
        <div className="mt-3 space-y-3 text-sm">
          {[
            "Faculty / Buildings",
            "Waste Hotspots",
            "Waste Flow",
            "Collection Points",
            "Recycling Centers",
          ].map((item) => (
            <div className="flex items-center gap-2" key={item}>
              <CheckboxVisual checked />
              <span>{item}</span>
            </div>
          ))}
          <div className="flex items-center gap-2 text-muted-foreground">
            <CheckboxVisual checked={false} />
            <span>Boundaries</span>
          </div>
          <Button className="mt-2 w-full" size="sm" variant="outline">
            <RotateCcw className="size-4" />
            Reset Layers
          </Button>
        </div>
      </Card>

      <Card className="absolute bottom-4 left-4 z-[400] hidden w-60 bg-white/95 p-4 shadow-md md:block">
        <p className="text-xs text-muted-foreground">Selected Location</p>
        <div className="mt-2 flex items-center justify-between">
          <p className="font-semibold text-slate-950">Engineering Faculty</p>
          <Badge variant="danger">45 kg</Badge>
        </div>
        <div className="mt-3 space-y-1 text-xs text-slate-600">
          <p>Waste today: 15.6% vs yesterday</p>
          <p>Dominant type: PET (48%)</p>
          <p>Recycling rate: 52.3%</p>
        </div>
        <Button className="mt-3 w-full" size="sm" variant="outline">
          View Details
        </Button>
      </Card>

      <Card className="absolute right-4 top-16 z-[400] hidden w-56 bg-white/95 p-4 shadow-md lg:block">
        <p className="font-semibold text-slate-950">Legend</p>
        <div className="mt-3 space-y-2 text-xs">
          <p className="font-medium">Waste Hotspots (kg)</p>
          <LegendDot color="#dc2626" label="High (> 30 kg)" />
          <LegendDot color="#f59e0b" label="Medium (15 - 30 kg)" />
          <LegendDot color="#10b981" label="Low (< 15 kg)" />
          <p className="pt-2 font-medium">Waste Flow (kg/day)</p>
          <LegendDot color="#dc2626" label="High (> 50 kg)" />
          <LegendDot color="#f59e0b" label="Medium (20 - 50 kg)" />
          <LegendDot color="#2563eb" label="Low (< 20 kg)" />
          <p className="pt-2 font-medium">Collection Points</p>
          <LegendDot color="#109252" label="Collection Points" />
          <LegendDot color="#7c3aed" label="Recycling Centers" />
        </div>
      </Card>

      <Card className="absolute bottom-24 right-4 z-[400] hidden w-52 bg-white/95 p-4 shadow-md lg:block">
        <p className="font-semibold text-slate-950">Waste by Type</p>
        <div className="mt-3 grid place-items-center">
          <div className="grid size-24 place-items-center rounded-full bg-[conic-gradient(#2563eb_0_42%,#16a34a_42%_65%,#f59e0b_65%_83%,#7c3aed_83%_94%,#94a3b8_94%)]">
            <div className="grid size-14 place-items-center rounded-full bg-white text-center text-xs font-bold">
              2,845 kg
            </div>
          </div>
        </div>
      </Card>

      <Card
        className="absolute bottom-4 left-72 right-72 z-[400] hidden bg-white/95 p-4 shadow-md xl:block"
        id="waste-flow"
      >
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
          <Button size="icon">
            <SlidersHorizontal className="size-4" />
          </Button>
          <div className="h-2 flex-1 rounded-full bg-slate-200">
            <div className="relative h-2 w-3/5 rounded-full bg-emerald-600">
              <span className="absolute right-0 top-1/2 size-5 -translate-y-1/2 rounded-full border-4 border-white bg-emerald-600 shadow" />
            </div>
          </div>
        </div>
      </Card>

      <div className="absolute left-4 right-4 top-4 z-[401] flex flex-wrap gap-2 md:left-60 lg:right-72">
        {locations.slice(0, 8).map((location) => (
          <span
            className="rounded-md bg-white/95 px-2 py-1 text-xs font-semibold text-slate-800 shadow-sm"
            key={`${location.id}-label`}
          >
            {location.shortName}
          </span>
        ))}
      </div>
    </>
  );
}

function PredictionOverlay() {
  return (
    <div className="absolute right-4 top-14 z-[400] hidden rounded-lg bg-white/95 p-4 text-xs shadow-md md:block">
      <p className="font-semibold text-slate-950">Risk Level</p>
      <div className="mt-3 space-y-2">
        <LegendDot color="#dc2626" label="High Risk (> 250 kg)" />
        <LegendDot color="#f59e0b" label="Medium Risk (150 - 250 kg)" />
        <LegendDot color="#10b981" label="Low Risk (< 150 kg)" />
      </div>
    </div>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="size-2.5 shrink-0 rounded-full" style={{ backgroundColor: color }} />
      <span className="text-slate-700">{label}</span>
    </div>
  );
}
