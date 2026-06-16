<!-- BEGIN:nextjs-agent-rules -->
# AGENTS.md — Next.js Clean Code Skill

You are working on a Next.js App Router project.

Your main goal is to write clean, maintainable, reusable, and production-ready code. Always prioritize clear structure, low redundancy, good separation of concerns, correct Server Component and Client Component usage, reusable UI, and consistent API handling.

## Core Principles

* Use Next.js App Router correctly.
* Use Server Components by default.
* Use Client Components only when interactivity is required.
* Keep `src/app` as the routing and composition layer only.
* Do not put heavy business logic directly inside `page.tsx`.
* Put domain-specific business logic inside `src/features`.
* Put reusable UI components inside `src/components/ui`.
* Put reusable layout components inside `src/components/layout`.
* Put route-only components inside `_components`.
* Do not create duplicate components if an existing reusable component can be used.
* Always use TypeScript with clear types.
* Avoid `any`.
* Use absolute imports with `@/`.
* Use kebab-case for file names.
* Use PascalCase for component names.
* Split large components into smaller components.
* Keep UI, data fetching, mutation logic, validation, and types separated.

## Recommended Folder Structure

```txt
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── (auth)/
│   │   └── login/
│   │       └── page.tsx
│   └── (dashboard)/
│       ├── dashboard/
│       │   ├── page.tsx
│       │   └── _components/
│       └── settings/
│           └── page.tsx
│
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   ├── table.tsx
│   │   ├── badge.tsx
│   │   ├── empty-state.tsx
│   │   ├── error-state.tsx
│   │   ├── loading-spinner.tsx
│   │   └── skeleton.tsx
│   └── layout/
│       ├── navbar.tsx
│       ├── sidebar.tsx
│       ├── header.tsx
│       └── app-shell.tsx
│
├── features/
│   ├── tickets/
│   │   ├── actions/
│   │   ├── components/
│   │   ├── queries/
│   │   ├── services/
│   │   ├── schemas.ts
│   │   └── types.ts
│   └── users/
│       ├── actions/
│       ├── components/
│       ├── queries/
│       ├── services/
│       ├── schemas.ts
│       └── types.ts
│
├── lib/
│   ├── axios.ts
│   ├── utils.ts
│   └── constants.ts
│
└── middleware.ts
```

## App Router Rules

The `src/app` folder is only for routing, layouts, route groups, and page composition.

Do not put complex UI, API logic, validation logic, or business rules directly inside `page.tsx`.

Preferred pattern:

```tsx
import { DashboardView } from "@/features/dashboard/components/dashboard-view";

export default function DashboardPage() {
  return <DashboardView />;
}
```

Avoid this pattern:

```tsx
export default function DashboardPage() {
  // Avoid putting large state, API calls, table logic, modal logic,
  // form logic, and business rules directly here.
}
```

## Server Component and Client Component Rules

Use Server Components by default.

Do not add `"use client"` unless the component truly needs client-side behavior.

Use Server Components for:

* Initial data fetching
* SEO-friendly pages
* Static or mostly static UI
* Rendering data from the server
* Pages without user interaction
* List or table initial rendering

Use Client Components for:

* `useState`
* `useEffect`
* `useRouter`
* `useSearchParams`
* `onClick`
* `onChange`
* `onSubmit`
* Forms
* Modals
* Dropdowns
* Tabs
* Sidebar toggles
* Hide/unhide UI
* Browser APIs such as `localStorage` or `window`

Example Server Component:

```tsx
import { getTickets } from "@/features/tickets/queries/get-tickets";
import { TicketTable } from "@/features/tickets/components/ticket-table";

export default async function TicketsPage() {
  const tickets = await getTickets();

  return <TicketTable tickets={tickets} />;
}
```

Example Client Component:

```tsx
"use client";

import { useState } from "react";
import type { Ticket } from "../types";

type TicketTableProps = {
  tickets: Ticket[];
};

export function TicketTable({ tickets }: TicketTableProps) {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  return (
    <div>
      {/* interactive table */}
    </div>
  );
}
```

## API Calling Rules

All API calls must use Axios from:

```txt
src/lib/axios.ts
```

Do not create random Axios instances inside components.

Do not call Axios directly in UI components if the call can be separated into `queries`, `services`, or `actions`.

Use this setup:

```tsx
import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export const apiFormData = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

apiFormData.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);
```

Use `queries` for read operations:

```tsx
import { api } from "@/lib/axios";
import type { Ticket } from "../types";

export async function getTickets(): Promise<Ticket[]> {
  const response = await api.get<Ticket[]>("/tickets");
  return response.data;
}
```

Use `services` for client-side mutations:

```tsx
import { api } from "@/lib/axios";
import type { CreateTicketPayload, Ticket } from "../types";

export async function createTicketRequest(
  payload: CreateTicketPayload
): Promise<Ticket> {
  const response = await api.post<Ticket>("/tickets", payload);
  return response.data;
}
```

Use `actions` for Server Actions when appropriate:

```tsx
"use server";

import { revalidatePath } from "next/cache";
import { api } from "@/lib/axios";
import type { CreateTicketPayload } from "../types";

export async function createTicket(payload: CreateTicketPayload) {
  await api.post("/tickets", payload);

  revalidatePath("/dashboard/tickets");
}
```

## Utility Class Rules

All conditional Tailwind classes must use `cn()` from:

```txt
src/lib/utils.ts
```

Use this setup:

```tsx
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

Correct usage:

```tsx
import { cn } from "@/lib/utils";

type ButtonProps = React.ComponentProps<"button"> & {
  variant?: "default" | "outline" | "danger";
};

export function Button({
  className,
  variant = "default",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition",
        variant === "default" && "bg-blue-600 text-white hover:bg-blue-700",
        variant === "outline" && "border border-gray-300 bg-white text-gray-700",
        variant === "danger" && "bg-red-600 text-white hover:bg-red-700",
        className
      )}
      {...props}
    />
  );
}
```

Avoid long template strings for conditional Tailwind classes.

Avoid this:

```tsx
className={`px-4 py-2 ${isActive ? "bg-blue-500" : "bg-gray-500"}`}
```

Use this:

```tsx
className={cn(
  "px-4 py-2",
  isActive ? "bg-blue-500" : "bg-gray-500"
)}
```

## Reusable Component Rules

Before creating a new component, check these folders first:

```txt
src/components/ui
src/components/layout
src/features/[domain]/components
src/app/[route]/_components
```

Component placement rules:

```txt
Reusable primitive UI:
src/components/ui

Reusable layout:
src/components/layout

Feature-specific component:
src/features/[domain]/components

Route-only component:
src/app/[route]/_components
```

Examples:

* `Button`, `Input`, `Dialog`, `Select`, `Table`, `Badge`, `Card` belong in `components/ui`.
* `Navbar`, `Sidebar`, `Header`, `AppShell` belong in `components/layout`.
* `TicketTable`, `TicketForm`, `TicketFilter` belong in `features/tickets/components`.
* Components used only by one route may stay in that route's `_components`.

Do not create many duplicated components like:

```txt
SubmitButton.tsx
SaveButton.tsx
DeleteButton.tsx
CancelButton.tsx
```

Use one reusable component instead:

```tsx
<Button variant="default">Submit</Button>
<Button variant="danger">Delete</Button>
<Button variant="outline">Cancel</Button>
```

## Component Composition Rules

Prefer composition over creating many similar components.

Use reusable primitives like:

```tsx
<Card>
  <CardHeader>
    <CardTitle>Ticket Summary</CardTitle>
  </CardHeader>
  <CardContent>
    Content here
  </CardContent>
</Card>
```

Do not create separate card components if the layout is almost the same:

```txt
TicketCard
UserCard
ProductCard
SummaryCard
```

Create a reusable `Card` and compose the content instead.

## Hide and Unhide State Rules

If a component can be hidden/unhidden, collapsed/expanded, toggled, or temporarily hidden while preserving internal state, use the React `<Activity>` component when available, or use CSS hiding with `cn()` instead of unmounting.

Use this rule for:

* Sidebar hide/unhide
* Filter panel
* Detail panel
* Collapsible card
* Tab content
* Stepper form
* Search/filter form
* Any component with internal input state that should not reset when hidden

Do not use conditional rendering if the internal state must be preserved.

Avoid this when state must stay:

```tsx
{isOpen && <FilterForm />}
```

Because this unmounts the component and can reset its internal state.

Prefer hiding with className:

```tsx
<FilterForm className={cn(!isOpen && "hidden")} />
```

If using React Activity is available in the project, use it for preserving hidden UI state:

```tsx
<Activity mode={isOpen ? "visible" : "hidden"}>
  <FilterForm />
</Activity>
```

For simple elements without internal state, normal conditional rendering is allowed.

## Form Rules

Forms must be Client Components if they use state, event handlers, validation feedback, or interactive behavior.

Separate:

* Form UI
* Validation schema
* Submit handler
* API service
* Types

Recommended structure:

```txt
features/tickets/
├── components/
│   └── ticket-form.tsx
├── services/
│   └── create-ticket-request.ts
├── schemas.ts
└── types.ts
```

Example:

```tsx
"use client";

import { useState } from "react";
import { createTicketRequest } from "../services/create-ticket-request";

export function TicketForm() {
  const [title, setTitle] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await createTicketRequest({ title });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Ticket title"
      />

      <button type="submit">Submit</button>
    </form>
  );
}
```

## Table and List Rules

For table or list features, separate these parts:

* Table wrapper
* Row component
* Empty state
* Loading state
* Error state
* Pagination
* Filter/search

Recommended structure:

```txt
features/tickets/components/
├── ticket-table.tsx
├── ticket-table-row.tsx
├── ticket-empty-state.tsx
├── ticket-filter.tsx
└── ticket-pagination.tsx
```

Every data-driven UI must handle:

* Loading state
* Error state
* Empty state
* Success state

Example:

```tsx
if (isLoading) {
  return <TicketTableSkeleton />;
}

if (error) {
  return <ErrorState message="Failed to load tickets." />;
}

if (tickets.length === 0) {
  return <EmptyState title="No tickets found." />;
}
```

## Modal and Dialog Rules

Use reusable dialog components from:

```txt
src/components/ui/dialog.tsx
```

Do not build modal UI from scratch repeatedly.

Example:

```tsx
<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Delete Ticket</DialogTitle>
    </DialogHeader>

    <p>Are you sure you want to delete this ticket?</p>

    <DialogFooter>
      <Button variant="outline">Cancel</Button>
      <Button variant="danger">Delete</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

## Naming Rules

Use kebab-case for file names:

```txt
ticket-table.tsx
ticket-form.tsx
create-ticket-request.ts
get-tickets.ts
user-profile-card.tsx
```

Use PascalCase for component names:

```tsx
export function TicketTable() {}
export function UserProfileCard() {}
```

Use descriptive function names:

```tsx
getTickets()
createTicketRequest()
deleteTicketRequest()
updateUserProfile()
```

Avoid unclear names:

```tsx
handleData()
doSubmit()
fetchIt()
process()
```

## Import Rules

Use absolute imports:

```tsx
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getTickets } from "@/features/tickets/queries/get-tickets";
```

Avoid long relative imports:

```tsx
import { Button } from "../../../../components/ui/button";
```

## TypeScript Rules

Always define clear types or interfaces.

Example:

```tsx
export type TicketStatus = "pending" | "approved" | "rejected";

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  createdAt: string;
}

export interface CreateTicketPayload {
  title: string;
  description: string;
}
```

Avoid `any`.

If the data shape is unknown, use `unknown` and validate or narrow it safely.

## Clean Code Checklist

Before writing or editing code, always check:

```txt
[ ] Is this component really needed, or can an existing reusable component be used?
[ ] Is this a Server Component or Client Component?
[ ] Is "use client" really necessary?
[ ] Is src/app only used for routing and composition?
[ ] Is business logic placed inside src/features?
[ ] Is API calling handled through src/lib/axios.ts?
[ ] Is Axios separated into queries, services, or actions?
[ ] Are conditional Tailwind classes using cn()?
[ ] Should hide/unhide UI preserve internal state?
[ ] Is TypeScript used properly without any?
[ ] Are loading, error, empty, and success states handled?
[ ] Is the component too large and should be split?
[ ] Are reusable components used instead of duplicated UI?
[ ] Are file names using kebab-case?
[ ] Are component names using PascalCase?
[ ] Are imports using @/ absolute imports?
```

## Final Behavior

When asked to create or edit a feature:

* Complete the requested task fully.
* Do not stop at partial code unless impossible.
* Do not ask unnecessary follow-up questions.
* Make reasonable assumptions based on the existing structure.
* Reuse existing components whenever possible.
* Keep the code clean, typed, and maintainable.
* Explain briefly what was changed after giving the code.

<!-- END:nextjs-agent-rules -->
