"use client";

import * as React from "react";
import {
  Columns3,
  Download,
  Eye,
  Filter,
  MoreVertical,
  Search,
} from "lucide-react";

import { AppShell } from "@/components/layout/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DonutChartView } from "@/features/plastic-twin/components/analytics-charts";
import {
  MetricCard,
  PanelCard,
  TipBar,
  UploadDropzone,
} from "@/features/plastic-twin/components/shared-widgets";
import {
  dataManagementStats,
  dataTrainingSegments,
  datasetFiles,
  wasteRecords,
} from "@/features/plastic-twin/data/plastic-twin-data";

export function DataManagementView() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [plasticFilter, setPlasticFilter] = React.useState<string | null>(null);
  const [activePage, setActivePage] = React.useState(1);
  const [recordsPerPage, setRecordsPerPage] = React.useState(4);
  const [showSourceColumn, setShowSourceColumn] = React.useState(true);
  const [statusMessage, setStatusMessage] = React.useState<string | null>(null);
  const [uploadedDatasets, setUploadedDatasets] = React.useState(datasetFiles);
  const [showAllDatasets, setShowAllDatasets] = React.useState(false);
  const [showTrainingDetails, setShowTrainingDetails] = React.useState(false);
  const [showSensorDetails, setShowSensorDetails] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const plasticTypes = ["PET", "HDPE", "PP", "LDPE", "Others"];
  const filteredRecords = wasteRecords.filter((record) => {
    const query = searchQuery.trim().toLowerCase();
    const matchesQuery =
      query.length === 0 ||
      record.id.toLowerCase().includes(query) ||
      record.location.toLowerCase().includes(query) ||
      record.plasticType.toLowerCase().includes(query) ||
      record.uploadedBy.toLowerCase().includes(query);
    const matchesPlasticType =
      plasticFilter === null || record.plasticType === plasticFilter;

    return matchesQuery && matchesPlasticType;
  });
  const paginatedRecords = filteredRecords.slice(
    (activePage - 1) * recordsPerPage,
    activePage * recordsPerPage,
  );
  const totalPages = Math.max(Math.ceil(filteredRecords.length / recordsPerPage), 1);
  const visibleDatasets = showAllDatasets
    ? uploadedDatasets
    : uploadedDatasets.slice(0, 3);

  function cyclePlasticFilter() {
    setActivePage(1);
    setPlasticFilter((currentFilter) => {
      if (currentFilter === null) {
        return plasticTypes[0];
      }

      const currentIndex = plasticTypes.indexOf(currentFilter);
      return currentIndex === plasticTypes.length - 1
        ? null
        : plasticTypes[currentIndex + 1];
    });
  }

  function cycleRecordsPerPage() {
    setActivePage(1);
    setRecordsPerPage((currentSize) =>
      currentSize === 4 ? 8 : currentSize === 8 ? 12 : 4,
    );
  }

  function handleDatasetUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setUploadedDatasets((currentFiles) => [
      {
        name: file.name,
        meta: `${(file.size / 1024 / 1024).toFixed(1)} MB - Uploaded: Just now`,
        badge: "New",
        tone: "green",
        icon: Download,
      },
      ...currentFiles,
    ]);
    setStatusMessage(`${file.name} added to dummy dataset list.`);
    event.target.value = "";
  }

  return (
    <AppShell
      activeKey="data-management"
      dateLabel="June 11, 2026 - June 17, 2026"
      subtitle="Manage waste data, datasets, and system integrations"
      title="Data Management"
    >
      <div className="grid gap-5">
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {dataManagementStats.map((metric) => (
            <MetricCard key={metric.label} metric={metric} />
          ))}
        </section>

        <Tabs defaultValue="records">
          <TabsList className="h-auto flex-wrap justify-start bg-transparent p-0">
            {[
              "Waste Records",
              "Upload Datasets",
              "AI Model Training Datasets",
              "Import / Export CSV",
              "Sensor Data Integration",
            ].map((tab) => (
              <TabsTrigger
                className="rounded-none border-b-2 border-transparent bg-transparent px-4 py-3 data-[state=active]:border-emerald-700 data-[state=active]:bg-transparent data-[state=active]:text-emerald-800 data-[state=active]:shadow-none"
                key={tab}
                value={tab.toLowerCase().replaceAll(" ", "-")}
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <section className="grid gap-5 xl:grid-cols-[1.45fr_0.95fr]">
          <PanelCard
            action={
              <div className="flex flex-wrap gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    className="h-9 w-48 pl-9"
                    onChange={(event) => {
                      setSearchQuery(event.target.value);
                      setActivePage(1);
                    }}
                    placeholder="Search records..."
                    value={searchQuery}
                  />
                </div>
                <Button className="h-9" onClick={cyclePlasticFilter} type="button" variant="outline">
                  <Filter className="size-4" />
                  {plasticFilter ?? "Filter"}
                </Button>
                <Button
                  className="h-9"
                  onClick={() => setShowSourceColumn((value) => !value)}
                  type="button"
                  variant="outline"
                >
                  <Columns3 className="size-4" />
                  Columns
                </Button>
              </div>
            }
            title="Waste Records"
          >
            <p className="mb-4 text-sm text-muted-foreground">
              Latest waste collection and measurement records
            </p>
            {filteredRecords.length === 0 ? (
              <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
                No waste records found.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Plastic Type</TableHead>
                    <TableHead>Weight (kg)</TableHead>
                    {showSourceColumn ? <TableHead>Source</TableHead> : null}
                    <TableHead>Uploaded By</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-semibold">{record.id}</TableCell>
                      <TableCell>{record.dateTime}</TableCell>
                      <TableCell>{record.location}</TableCell>
                      <TableCell>{record.plasticType}</TableCell>
                      <TableCell>{record.weightKg.toFixed(2)}</TableCell>
                      {showSourceColumn ? <TableCell>{record.source}</TableCell> : null}
                      <TableCell>{record.uploadedBy}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Button
                            onClick={() => setStatusMessage(`Viewing ${record.id}`)}
                            size="icon"
                            type="button"
                            variant="ghost"
                          >
                            <Eye className="size-4" />
                          </Button>
                          <Button
                            onClick={() => setStatusMessage(`Actions opened for ${record.id}`)}
                            size="icon"
                            type="button"
                            variant="ghost"
                          >
                            <MoreVertical className="size-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
            <div className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
              <span>
                Showing {paginatedRecords.length} of {filteredRecords.length} records
              </span>
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                  <Button
                    key={page}
                    onClick={() => setActivePage(page)}
                    size="sm"
                    type="button"
                    variant={page === activePage ? "default" : "ghost"}
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  onClick={cycleRecordsPerPage}
                  size="sm"
                  type="button"
                  variant="outline"
                >
                  {recordsPerPage} / page
                </Button>
              </div>
            </div>
          </PanelCard>

          <div className="grid content-start gap-5">
            <PanelCard title="Upload Datasets">
              <p className="mb-4 text-sm text-muted-foreground">
                Upload new datasets to the system
              </p>
              <input
                accept=".csv,.xlsx,.json"
                className="hidden"
                onChange={handleDatasetUpload}
                ref={fileInputRef}
                type="file"
              />
              <UploadDropzone
                action="Choose Files"
                helper="Supported formats: CSV, XLSX, JSON. Max file size: 500 MB"
                onAction={() => fileInputRef.current?.click()}
              />
              {statusMessage ? (
                <p className="mt-3 rounded-md bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700">
                  {statusMessage}
                </p>
              ) : null}
            </PanelCard>

            <PanelCard
              action={
                <Button
                  className="h-8 px-0 text-emerald-700"
                  onClick={() => setShowAllDatasets((value) => !value)}
                  type="button"
                  variant="ghost"
                >
                  {showAllDatasets ? "Show Less" : "View All"}
                </Button>
              }
              title="Dataset Management"
            >
              <p className="mb-4 text-sm text-muted-foreground">
                View and manage uploaded datasets
              </p>
              <div className="space-y-4">
                {visibleDatasets.map((file) => (
                  <div className="flex items-center gap-3" key={file.name}>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-slate-900">
                        {file.name}
                      </p>
                      <p className="text-xs text-muted-foreground">{file.meta}</p>
                    </div>
                    <Badge variant={file.tone === "amber" ? "warning" : file.tone === "blue" ? "info" : "success"}>
                      {file.badge}
                    </Badge>
                    <Button
                      onClick={() => setStatusMessage(`${file.name} download simulated.`)}
                      size="icon"
                      type="button"
                      variant="ghost"
                    >
                      <Download className="size-4" />
                    </Button>
                    <Button
                      onClick={() => setStatusMessage(`${file.name} menu simulated.`)}
                      size="icon"
                      type="button"
                      variant="ghost"
                    >
                      <MoreVertical className="size-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </PanelCard>
          </div>
        </section>

        <section className="grid gap-5 xl:grid-cols-[0.68fr_0.72fr_0.6fr]">
          <PanelCard title="Import / Export CSV">
            <p className="mb-4 text-sm text-muted-foreground">
              Import or export data in CSV format
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <Card className="p-4">
                <p className="font-semibold text-slate-900">Import CSV</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Import waste records or other data
                </p>
                <Button
                  className="mt-4 w-full"
                  onClick={() => setStatusMessage("Import CSV simulated with dummy state.")}
                  type="button"
                >
                  Import CSV
                </Button>
              </Card>
              <Card className="p-4">
                <p className="font-semibold text-slate-900">Export CSV</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Export filtered data or reports
                </p>
                <Button
                  className="mt-4 w-full"
                  onClick={() => setStatusMessage("Export CSV simulated with filtered records.")}
                  type="button"
                >
                  Export CSV
                </Button>
              </Card>
            </div>
            <div className="mt-5 border-t pt-4">
              <p className="font-semibold text-slate-900">Recent Exports</p>
              <div className="mt-3 flex items-center justify-between gap-3 text-sm">
                <span>waste_records_june_17_2026.csv</span>
                <Button
                  onClick={() => setStatusMessage("Recent export download simulated.")}
                  size="icon"
                  type="button"
                  variant="ghost"
                >
                  <Download className="size-4" />
                </Button>
              </div>
            </div>
          </PanelCard>

          <PanelCard
            action={
              <Button
                className="h-8 px-0 text-emerald-700"
                onClick={() => {
                  setShowTrainingDetails((value) => !value);
                  setStatusMessage("Training dataset details toggled.");
                }}
                type="button"
                variant="ghost"
              >
                {showTrainingDetails ? "Hide" : "View All"}
              </Button>
            }
            title="AI Model Training Datasets"
          >
            <p className="mb-4 text-sm text-muted-foreground">
              Manage datasets used for AI model training
            </p>
            <DonutChartView
              centerLabel="Total Datasets"
              centerValue="15"
              data={dataTrainingSegments}
              height={220}
            />
            <div className="mt-4 flex items-center justify-between gap-3 text-xs text-muted-foreground">
              <span>Last Updated: June 17, 2026 09:45 AM</span>
              <Button
                onClick={() => setStatusMessage("Training data manager opened.")}
                size="sm"
                type="button"
                variant="outline"
              >
                Manage Training Data
              </Button>
            </div>
            {showTrainingDetails ? (
              <div className="mt-4 rounded-md bg-slate-50 p-3 text-xs text-slate-700">
                15 datasets available: 8 verified, 5 processing, and 2 need review.
              </div>
            ) : null}
          </PanelCard>

          <PanelCard
            action={
              <Button
                className="h-8 px-0 text-emerald-700"
                onClick={() => {
                  setShowSensorDetails((value) => !value);
                  setStatusMessage("Sensor integration details toggled.");
                }}
                type="button"
                variant="ghost"
              >
                {showSensorDetails ? "Hide" : "View All"}
              </Button>
            }
            title="Sensor Data Integration"
          >
            <p className="mb-4 text-sm text-muted-foreground">
              Monitor and manage connected sensors
            </p>
            <DonutChartView
              centerLabel="Total Sensors"
              centerValue="42"
              data={[
                { name: "Online", value: 90.5, color: "#16a34a", meta: "38" },
                { name: "Offline", value: 4.8, color: "#dc2626", meta: "2" },
                { name: "Maintenance", value: 4.8, color: "#f59e0b", meta: "2" },
              ]}
              height={220}
            />
            <div className="mt-4 flex items-end justify-between gap-3">
              <div className="text-xs text-muted-foreground">
                <p>Last Data Received</p>
                <p>June 17, 2026 10:29 AM</p>
              </div>
              <Button
                onClick={() => setStatusMessage("Sensor manager opened.")}
                size="sm"
                type="button"
                variant="outline"
              >
                Manage Sensors
              </Button>
            </div>
            {showSensorDetails ? (
              <div className="mt-4 rounded-md bg-slate-50 p-3 text-xs text-slate-700">
                38 sensors online, 2 offline, and 2 scheduled for maintenance.
              </div>
            ) : null}
          </PanelCard>
        </section>

        <TipBar>
          Tip: Regularly update your datasets to improve AI model accuracy and
          system performance.
        </TipBar>
      </div>
    </AppShell>
  );
}
