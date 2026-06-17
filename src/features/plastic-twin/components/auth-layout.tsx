import type { ReactNode } from "react";

import { Brand } from "@/components/layout/brand";
import {
  CampusIllustration,
  IconBubble,
} from "@/features/plastic-twin/components/shared-widgets";
import { loginFeatures } from "@/features/plastic-twin/data/plastic-twin-data";

type AuthLayoutProps = {
  children: ReactNode;
};

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="min-h-dvh bg-slate-100 p-4 text-slate-950 sm:p-6">
      <div className="mx-auto grid min-h-[calc(100dvh-2rem)] max-w-[1600px] overflow-hidden rounded-xl border bg-white shadow-sm lg:grid-cols-[minmax(360px,0.82fr)_1.18fr]">
        <section className="relative hidden overflow-hidden bg-gradient-to-br from-sky-50 via-white to-emerald-50 lg:block">
          <div className="relative z-10 flex h-full flex-col justify-between p-10">
            <div>
              <Brand />
              <div className="mt-20 max-w-md">
                <p className="text-4xl font-bold leading-tight text-emerald-800">
                  Welcome to
                  <br />
                  PlasticTwin-Campus
                </p>
                <p className="mt-6 text-lg leading-8 text-slate-800">
                  An Explainable AI and Digital Twin Platform for Predictive
                  Plastic Waste Management and Circularity Assessment in
                  University Environments.
                </p>
                <div className="mt-7 h-1 w-12 rounded-full bg-emerald-700" />
              </div>
              <div className="mt-9 grid max-w-md gap-7">
                {loginFeatures.map((feature) => (
                  <div className="flex items-start gap-4" key={feature.title}>
                    <IconBubble icon={feature.icon} />
                    <div>
                      <p className="font-bold text-slate-900">{feature.title}</p>
                      <p className="mt-1 text-sm leading-6 text-slate-700">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-2/5">
            <CampusIllustration />
          </div>
        </section>

        <section className="grid place-items-center bg-white px-5 py-10 sm:px-8 lg:px-16">
          {children}
        </section>
      </div>
      <footer className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-muted-foreground">
        <span>(c) 2026 PlasticTwin-Campus. All rights reserved.</span>
        <span className="text-emerald-700">Privacy Policy</span>
        <span className="text-emerald-700">Terms of Use</span>
      </footer>
    </main>
  );
}
