import Link from "next/link";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";
import { IndexList } from "./IndexList";
import { buttonClasses } from "./Button";
import { company } from "@/lib/content";
import { projectItems } from "@/lib/projects";

const featuredItems = projectItems.slice(0, 6).map((item) => ({
  key: item.id,
  icon: item.icon,
  title: item.category,
}));

export function ProjectsSection() {
  return (
    <section id="projekt" className="scroll-mt-24 bg-white">
      <div className="mx-auto max-w-content px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
        <Reveal>
          <Eyebrow index={2} label="Våra projekt" className="mb-5" />
          <h2 className="max-w-2xl text-h2-mobile text-dark lg:text-h2">Våra projekt</h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-body">
            Ett urval av mark- och grundarbeten vi har genomfört i {company.serviceArea}.
          </p>
        </Reveal>

        <div className="mt-12">
          <IndexList items={featuredItems} />
        </div>

        <Reveal className="mt-12 flex justify-center">
          <Link href="/projekt" className={buttonClasses("primary")}>
            Se alla projekt
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
