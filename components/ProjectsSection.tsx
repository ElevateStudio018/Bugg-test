import Link from "next/link";
import { Reveal } from "./Reveal";
import { ProjectsMasonry } from "./ProjectsMasonry";
import { buttonClasses } from "./Button";
import { projectItems } from "@/lib/projects";

const featuredItems = projectItems.slice(0, 6);

export function ProjectsSection() {
  return (
    <section id="projekt" className="scroll-mt-24 bg-white">
      <div className="mx-auto max-w-content px-4 py-16 sm:px-6 lg:px-8 lg:py-28">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-h2-mobile text-dark lg:text-h2">Våra projekt</h2>
          <p className="mt-4 text-base leading-relaxed text-gray-body">
            Ett urval av bygg- och renoveringsprojekt vi har genomfört i Uppsala med omnejd.
          </p>
        </Reveal>

        <div className="mt-12">
          <ProjectsMasonry items={featuredItems} />
        </div>

        <Reveal className="mt-12 flex justify-center">
          <Link href="/projekt" className={buttonClasses("accent")}>
            Se alla projekt
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
