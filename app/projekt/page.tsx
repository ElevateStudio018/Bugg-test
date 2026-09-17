import type { Metadata } from "next";
import { ProjectsMasonry } from "@/components/ProjectsMasonry";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { FinalCta } from "@/components/FinalCta";
import { GalleryCtaButton } from "./GalleryCtaButton";
import { company } from "@/lib/content";
import { projectCategories, projectItems } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Våra projekt",
  description: `Se exempel på bygg- och renoveringsprojekt utförda av ${company.legalName} i ${company.serviceArea}.`,
  alternates: { canonical: "/projekt" },
};

export default function ProjectGalleryPage() {
  return (
    <>
      <section className="bg-white pt-16 lg:pt-20">
        <div className="mx-auto max-w-content px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
          <Reveal className="max-w-2xl">
            <Eyebrow label="Våra projekt" className="mb-5" />
            <h1 className="text-h2-mobile text-dark lg:text-h2">Våra projekt</h1>
            <p className="mt-4 text-base leading-relaxed text-gray-body">
              Ett urval av bygg- och renoveringsprojekt vi har genomfört i {company.serviceArea}.
            </p>
          </Reveal>

          <div className="mt-12">
            <ProjectsMasonry items={projectItems} categories={projectCategories} showFilter />
          </div>

          <Reveal className="mt-12 flex justify-center">
            <GalleryCtaButton />
          </Reveal>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
