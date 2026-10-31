import { FEATURED_PROJECTS, type Testimonial } from "@/lib/data";
import { publicAssetExists } from "@/lib/assets";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TestimonialsCarousel, type TestimonialItem } from "@/components/ui/TestimonialsCarousel";

export function Testimonials({ index, items }: { index: string; items: readonly Testimonial[] }) {
  const prepared: TestimonialItem[] = items.map((item) => ({
    ...item,
    // A missing file falls back to the initials block instead of a broken image.
    photo: item.photo && publicAssetExists(item.photo) ? item.photo : undefined,
    projectName: FEATURED_PROJECTS.find((project) => project.id === item.project)?.name,
  }));

  return (
    <section id="testimonials" className="border-t border-border px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionLabel index={index} label="Depoimentos" />
        <TestimonialsCarousel items={prepared} />
      </div>
    </section>
  );
}
