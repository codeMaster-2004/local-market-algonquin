import Image from "next/image";
import { departments } from "@/lib/content";
import { Reveal } from "@/components/Reveal";

export function Departments() {
  return (
    <section
      id="departments"
      aria-labelledby="departments-heading"
      className="bg-mist"
    >
      <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 lg:py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-leaf">
            Specialized departments
          </p>
          <h2
            id="departments-heading"
            className="mt-3 font-display text-3xl font-semibold tracking-tight text-forest sm:text-4xl"
          >
            What we&apos;re known for
          </h2>
          <p className="mt-4 text-muted leading-relaxed">
            From the produce wall to the smokehouse counter — four departments that
            make this store worth the trip.
          </p>
        </div>

        <ul className="mt-12 grid gap-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12">
          {departments.map((dept, index) => (
            <li key={dept.id}>
              <Reveal delayMs={index * 90}>
                <article>
                  <div className="relative aspect-[4/3] overflow-hidden bg-forest/10">
                    <Image
                      src={dept.image}
                      alt={dept.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover transition duration-700 ease-out hover:scale-105"
                    />
                    <div
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-forest-deep/35 to-transparent"
                      aria-hidden
                    />
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-semibold text-forest">
                    {dept.title}
                  </h3>
                  <p className="mt-2 text-muted leading-relaxed">{dept.blurb}</p>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
