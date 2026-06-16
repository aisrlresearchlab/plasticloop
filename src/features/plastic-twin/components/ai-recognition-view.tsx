import { Camera, Image as ImageIcon, Recycle } from "lucide-react";

import { AppShell } from "@/components/layout/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  BottleVisual,
  IconBubble,
  PanelCard,
  TipBar,
} from "@/features/plastic-twin/components/shared-widgets";
import {
  aiRecentScans,
  recognitionDetails,
} from "@/features/plastic-twin/data/plastic-twin-data";
import { cn } from "@/lib/utils";

export function AiRecognitionView() {
  return (
    <AppShell
      activeKey="ai-recognition"
      subtitle="Upload an image or capture a photo to identify plastic type using AI"
      title="AI Waste Recognition"
    >
      <div className="grid gap-5">
        <section className="grid gap-5 xl:grid-cols-[0.95fr_0.82fr_0.65fr]">
          <div className="grid gap-5">
            <PanelCard title="1. Upload or Capture Image">
              <div className="grid min-h-64 place-items-center rounded-lg border border-dashed border-emerald-400 bg-emerald-50/20 p-8 text-center">
                <div>
                  <ImageIcon className="mx-auto size-14 text-emerald-700" />
                  <p className="mt-5 text-base font-medium text-slate-800">
                    Drag and drop an image here
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">or</p>
                  <Button className="mt-4">Browse Files</Button>
                  <p className="mt-4 text-xs text-muted-foreground">
                    JPG, PNG, WebP (Max. 10MB)
                  </p>
                </div>
              </div>

              <div className="my-8 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="h-px flex-1 bg-border" />
                <span>OR</span>
                <span className="h-px flex-1 bg-border" />
              </div>

              <div>
                <p className="mb-3 font-semibold text-slate-900">Take a Photo</p>
                <Button
                  className="h-24 w-full flex-col gap-2 border-emerald-200 bg-emerald-50/20 text-slate-800 hover:bg-emerald-50"
                  variant="outline"
                >
                  <Camera className="size-10 text-emerald-700" />
                  Open Camera
                </Button>
              </div>
            </PanelCard>

            <PanelCard
              action={<Button className="h-8 px-2 text-xs text-emerald-700" variant="ghost">View All</Button>}
              title="Recent Scans"
            >
              <div className="grid gap-3 sm:grid-cols-4">
                {aiRecentScans.map((scan, index) => (
                  <Card className="overflow-hidden" key={scan.name}>
                    <div
                      className={cn(
                        "h-24",
                        index === 0 &&
                          "bg-[radial-gradient(circle_at_50%_35%,#dbeafe_0_12%,transparent_13%),linear-gradient(135deg,#a7c7a7,#6f8f6f)]",
                        index === 1 && "bg-[radial-gradient(circle,#ffffff_0_24%,#dbeafe_25%)]",
                        index === 2 && "bg-[linear-gradient(135deg,#16a34a,#f59e0b)]",
                        index === 3 && "bg-[linear-gradient(135deg,#cbd5e1,#475569)]",
                      )}
                    />
                    <CardContent className="p-3">
                      <p className="text-xs font-bold text-slate-900">{scan.name}</p>
                      <p className="mt-1 text-xs font-semibold text-emerald-700">
                        {scan.score}
                      </p>
                      <p className="mt-3 text-[11px] text-muted-foreground">
                        {scan.date}
                        <br />
                        {scan.time}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </PanelCard>
          </div>

          <PanelCard title="2. AI Prediction Result">
            <BottleVisual />
            <div className="mt-8 text-center">
              <h2 className="text-4xl font-bold tracking-normal text-slate-950">
                PET Bottle
              </h2>
              <p className="mt-2 text-lg font-medium text-slate-700">
                (Polyethylene Terephthalate)
              </p>
              <div className="mx-auto mt-6 max-w-sm rounded-lg border border-emerald-100 bg-emerald-50/60 p-6">
                <p className="text-5xl font-bold text-emerald-700">94.8%</p>
                <p className="mt-2 text-base font-medium text-slate-700">
                  Confidence Score
                </p>
              </div>
            </div>
          </PanelCard>

          <div className="grid content-start gap-5">
            <PanelCard title="Prediction Details">
              <div className="space-y-5">
                {recognitionDetails.map((detail) => (
                  <div className="flex items-center gap-4" key={detail.label}>
                    <IconBubble icon={detail.icon} tone={detail.tone} />
                    <div>
                      <p className="text-sm text-muted-foreground">{detail.label}</p>
                      <p className="font-bold text-slate-900">{detail.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </PanelCard>

            <PanelCard title="Suggested Bin">
              <div className="flex items-center gap-5">
                <div className="grid size-32 shrink-0 place-items-center rounded-lg bg-emerald-700 text-white shadow-sm">
                  <Recycle className="size-16" />
                </div>
                <div>
                  <p className="text-xl font-bold text-emerald-700">
                    Recyclable Plastic
                  </p>
                  <p className="mt-3 text-sm leading-6 text-slate-700">
                    Please dispose of this item in the Recyclable Plastic bin.
                  </p>
                </div>
              </div>
            </PanelCard>

            <div className="rounded-lg border border-emerald-100 bg-emerald-50 p-5">
              <div className="flex items-start gap-4">
                <IconBubble icon={Recycle} tone="green" />
                <div>
                  <p className="text-lg font-bold text-emerald-800">
                    Environmental Impact
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-700">
                    Recycling this PET bottle helps reduce CO2 emissions and
                    supports a circular economy.
                  </p>
                  <Badge className="mt-4" variant="success">
                    High value recyclable
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </section>

        <TipBar>
          Tip: For better accuracy, please ensure the image is clear, well-lit,
          and the plastic item is visible.
        </TipBar>
      </div>
    </AppShell>
  );
}
