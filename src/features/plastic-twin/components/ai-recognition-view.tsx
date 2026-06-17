"use client";

import * as React from "react";
import Image from "next/image";
import {
  Archive,
  Camera,
  CheckCircle2,
  Image as ImageIcon,
  LineChart,
  PackageCheck,
  Recycle,
  Sparkles,
} from "lucide-react";

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
import { aiRecentScans } from "@/features/plastic-twin/data/plastic-twin-data";
import { recognizePlasticRequest } from "@/features/plastic-twin/services/recognize-plastic-request";
import type { AiRecognitionResult } from "@/features/plastic-twin/types";
import { cn } from "@/lib/utils";

function readFileAsBase64(file: File): Promise<{
  imageBase64: string;
  dataUrl: string;
}> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result !== "string") {
        reject(new Error("Failed to read image file."));
        return;
      }

      const [, base64 = ""] = reader.result.split(",");
      resolve({
        imageBase64: base64,
        dataUrl: reader.result,
      });
    };
    reader.onerror = () => reject(new Error("Failed to read image file."));
    reader.readAsDataURL(file);
  });
}

export function AiRecognitionView() {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const cameraInputRef = React.useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const [result, setResult] = React.useState<AiRecognitionResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [successMessage, setSuccessMessage] = React.useState<string | null>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [lastSource, setLastSource] = React.useState<"upload" | "camera" | null>(
    null,
  );
  const [showAllScans, setShowAllScans] = React.useState(false);

  const confidence = result && Number.isFinite(result.confidence)
    ? Math.round(result.confidence * 10) / 10
    : null;
  const visibleScans = showAllScans
    ? [
        ...aiRecentScans,
        ...aiRecentScans.map((scan) => ({
          ...scan,
          date: "June 16, 2026",
          time: "09:15 AM",
        })),
      ]
    : aiRecentScans;

  const details = result
    ? [
        {
          label: "Plastic Type",
          value: result.plasticType,
          icon: PackageCheck,
          tone: "blue" as const,
        },
        {
          label: "Material",
          value: result.material,
          icon: Archive,
          tone: "purple" as const,
        },
        {
          label: "Confidence",
          value: `${confidence}%`,
          icon: LineChart,
          tone: "green" as const,
        },
        {
          label: "Recyclability",
          value: result.recyclability,
          icon: Recycle,
          tone: "green" as const,
        },
        {
          label: "Estimated Purity",
          value: result.estimatedPurity,
          icon: Sparkles,
          tone: "green" as const,
        },
      ]
    : [];

  async function handleImageFile(file: File, source: "upload" | "camera") {
    setResult(null);
    setPreviewUrl(null);

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setErrorMessage("Format gambar harus JPG, PNG, atau WebP.");
      setSuccessMessage(null);
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage("Ukuran gambar maksimal 10MB.");
      setSuccessMessage(null);
      return;
    }

    setErrorMessage(null);
    setSuccessMessage(null);
    setIsAnalyzing(true);
    setLastSource(source);

    try {
      const image = await readFileAsBase64(file);
      setPreviewUrl(image.dataUrl);

      const prediction = await recognizePlasticRequest({
        imageBase64: image.imageBase64,
        mimeType: file.type,
      });

      setResult(prediction);
      setSuccessMessage("Gemini berhasil mendeteksi jenis plastik dari gambar.");
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to analyze image with Gemini.",
      );
    } finally {
      setIsAnalyzing(false);
    }
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (file) {
      void handleImageFile(file, "upload");
    }

    event.target.value = "";
  }

  function handleCameraChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (file) {
      void handleImageFile(file, "camera");
    }

    event.target.value = "";
  }

  function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files[0];

    if (file) {
      void handleImageFile(file, "upload");
    }
  }

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
              <input
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={handleFileChange}
                ref={fileInputRef}
                type="file"
              />
              <input
                accept="image/jpeg,image/png,image/webp"
                capture="environment"
                className="hidden"
                onChange={handleCameraChange}
                ref={cameraInputRef}
                type="file"
              />
              <div
                className={cn(
                  "grid min-h-64 place-items-center rounded-lg border border-dashed border-emerald-400 bg-emerald-50/20 p-8 text-center transition-colors",
                  isDragging && "border-emerald-700 bg-emerald-100/70",
                )}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <div>
                  <ImageIcon className="mx-auto size-14 text-emerald-700" />
                  <p className="mt-5 text-base font-medium text-slate-800">
                    Drag and drop an image here
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">or</p>
                  <Button
                    className="mt-4"
                    disabled={isAnalyzing}
                    onClick={() => fileInputRef.current?.click()}
                    type="button"
                  >
                    {isAnalyzing ? "Analyzing..." : "Browse Files"}
                  </Button>
                  <p className="mt-4 text-xs text-muted-foreground">
                    JPG, PNG, WebP (Max. 10MB)
                  </p>
                  {errorMessage ? (
                    <p className="mt-4 rounded-md bg-red-50 px-3 py-2 text-xs font-medium text-red-700">
                      {errorMessage}
                    </p>
                  ) : null}
                  {successMessage ? (
                    <p className="mt-4 inline-flex items-center gap-2 rounded-md bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700">
                      <CheckCircle2 className="size-4" />
                      {successMessage}
                    </p>
                  ) : null}
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
                  disabled={isAnalyzing}
                  onClick={() => cameraInputRef.current?.click()}
                  type="button"
                  variant="outline"
                >
                  <Camera className="size-10 text-emerald-700" />
                  {isAnalyzing && lastSource === "camera"
                    ? "Analyzing Photo..."
                    : "Open Camera"}
                </Button>
              </div>
            </PanelCard>

            <PanelCard
              action={
                <Button
                  className="h-8 px-2 text-xs text-emerald-700"
                  onClick={() => setShowAllScans((value) => !value)}
                  type="button"
                  variant="ghost"
                >
                  {showAllScans ? "Show Less" : "View All"}
                </Button>
              }
              title="Recent Scans"
            >
              <div className="grid gap-3 sm:grid-cols-4">
                {visibleScans.map((scan, index) => (
                  <Card className="overflow-hidden" key={`${scan.name}-${index}`}>
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
            {previewUrl ? (
              <div className="relative grid min-h-[480px] place-items-center overflow-hidden rounded-lg bg-slate-100">
                <Image
                  alt="Uploaded plastic waste preview"
                  className="h-full max-h-[520px] w-full object-cover"
                  height={520}
                  unoptimized
                  src={previewUrl}
                  width={720}
                />
                <Badge className="absolute bottom-8 left-1/2 -translate-x-1/2" variant="success">
                  {isAnalyzing ? "Analyzing with Gemini" : result ? "Gemini Analysis" : "Image Ready"}
                </Badge>
              </div>
            ) : (
              <BottleVisual />
            )}
            {result ? (
              <div className="mt-8 text-center">
                <h2 className="text-4xl font-bold tracking-normal text-slate-950">
                  {result.plasticType}
                </h2>
                <p className="mt-2 text-lg font-medium text-slate-700">
                  ({result.material})
                </p>
                <div className="mx-auto mt-6 max-w-sm rounded-lg border border-emerald-100 bg-emerald-50/60 p-6">
                  <p className="text-5xl font-bold text-emerald-700">
                    {confidence}%
                  </p>
                  <p className="mt-2 text-base font-medium text-slate-700">
                    Confidence Score
                  </p>
                </div>
              </div>
            ) : (
              <div className="mt-8 rounded-lg border border-dashed bg-slate-50 p-6 text-center">
                <p className="text-lg font-bold text-slate-900">
                  {isAnalyzing ? "Analyzing image with Gemini..." : "No AI result yet"}
                </p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Upload or capture an image first. Plastic type, material,
                  confidence score, recyclability, and purity will appear only
                  after Gemini returns the analysis.
                </p>
              </div>
            )}
          </PanelCard>

          <div className="grid content-start gap-5">
            <PanelCard title="Prediction Details">
              {result ? (
                <div className="space-y-5">
                  {details.map((detail) => (
                    <div className="flex items-center gap-4" key={detail.label}>
                      <IconBubble icon={detail.icon} tone={detail.tone} />
                      <div>
                        <p className="text-sm text-muted-foreground">{detail.label}</p>
                        <p className="font-bold text-slate-900">{detail.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-lg border border-dashed bg-slate-50 p-5 text-sm leading-6 text-muted-foreground">
                  Prediction details are generated by Gemini after image
                  analysis. No score is shown before AI data is available.
                </div>
              )}
            </PanelCard>

            <PanelCard title="Suggested Bin">
              {result ? (
                <div className="flex items-center gap-5">
                  <div className="grid size-32 shrink-0 place-items-center rounded-lg bg-emerald-700 text-white shadow-sm">
                    <Recycle className="size-16" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-emerald-700">
                      {result.suggestedBin}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-slate-700">
                      Please dispose of this item in the {result.suggestedBin} bin.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="rounded-lg border border-dashed bg-slate-50 p-5 text-sm leading-6 text-muted-foreground">
                  Suggested bin will be shown after Gemini classifies the item.
                </div>
              )}
            </PanelCard>

            <div className="rounded-lg border border-emerald-100 bg-emerald-50 p-5">
              {result ? (
                <div className="flex items-start gap-4">
                  <IconBubble icon={Recycle} tone="green" />
                  <div>
                    <p className="text-lg font-bold text-emerald-800">
                      Environmental Impact
                    </p>
                    <p className="mt-3 text-sm leading-7 text-slate-700">
                      {result.environmentalImpact}
                    </p>
                    <Badge className="mt-4" variant="success">
                      {result.recyclability} recyclability
                    </Badge>
                  </div>
                </div>
              ) : (
                <div className="text-sm leading-6 text-emerald-900">
                  Environmental impact will be generated from Gemini analysis.
                </div>
              )}
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
