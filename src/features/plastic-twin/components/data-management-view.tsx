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
  return (
    <AppShell
      activeKey="data-management"
      dateLabel="May 12, 2024 - May 18, 2024"
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
                  <Input className="h-9 w-48 pl-9" placeholder="Search records..." />
                </div>
                <Button className="h-9" variant="outline">
                  <Filter className="size-4" />
                  Filter
                </Button>
                <Button className="h-9" variant="outline">
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
            {wasteRecords.length === 0 ? (
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
                    <TableHead>Source</TableHead>
                    <TableHead>Uploaded By</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {wasteRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-semibold">{record.id}</TableCell>
                      <TableCell>{record.dateTime}</TableCell>
                      <TableCell>{record.location}</TableCell>
                      <TableCell>{record.plasticType}</TableCell>
                      <TableCell>{record.weightKg.toFixed(2)}</TableCell>
                      <TableCell>{record.source}</TableCell>
                      <TableCell>{record.uploadedBy}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Button size="icon" variant="ghost">
                            <Eye className="size-4" />
                          </Button>
                          <Button size="icon" variant="ghost">
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
              <span>Showing 1 to 8 of 12,458 records</span>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((page) => (
                  <Button
                    key={page}
                    size="sm"
                    variant={page === 1 ? "default" : "ghost"}
                  >
                    {page}
                  </Button>
                ))}
                <Button size="sm" variant="outline">
                  8 / page
                </Button>
              </div>
            </div>
          </PanelCard>

          <div className="grid content-start gap-5">
            <PanelCard title="Upload Datasets">
              <p className="mb-4 text-sm text-muted-foreground">
                Upload new datasets to the system
              </p>
              <UploadDropzone
                action="Choose Files"
                helper="Supported formats: CSV, XLSX, JSON. Max file size: 500 MB"
              />
            </PanelCard>

            <PanelCard
              action={<Button className="h-8 px-0 text-emerald-700" variant="ghost">View All</Button>}
              title="Dataset Management"
            >
              <p className="mb-4 text-sm text-muted-foreground">
                View and manage uploaded datasets
              </p>
              <div className="space-y-4">
                {datasetFiles.map((file) => (
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
                    <Button size="icon" variant="ghost">
                      <Download className="size-4" />
                    </Button>
                    <Button size="icon" variant="ghost">
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
                <Button className="mt-4 w-full">Import CSV</Button>
              </Card>
              <Card className="p-4">
                <p className="font-semibold text-slate-900">Export CSV</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Export filtered data or reports
                </p>
                <Button className="mt-4 w-full">Export CSV</Button>
              </Card>
            </div>
            <div className="mt-5 border-t pt-4">
              <p className="font-semibold text-slate-900">Recent Exports</p>
              <div className="mt-3 flex items-center justify-between gap-3 text-sm">
                <span>waste_records_may_18_2024.csv</span>
                <Button size="icon" variant="ghost">
                  <Download className="size-4" />
                </Button>
              </div>
            </div>
          </PanelCard>

          <PanelCard
            action={<Button className="h-8 px-0 text-emerald-700" variant="ghost">View All</Button>}
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
              <span>Last Updated: May 18, 2024 09:45 AM</span>
              <Button size="sm" variant="outline">
                Manage Training Data
              </Button>
            </div>
          </PanelCard>

          <PanelCard
            action={<Button className="h-8 px-0 text-emerald-700" variant="ghost">View All</Button>}
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
                <p>May 18, 2024 10:29 AM</p>
              </div>
              <Button size="sm" variant="outline">
                Manage Sensors
              </Button>
            </div>
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
