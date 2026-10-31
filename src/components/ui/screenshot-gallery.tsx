import AccordionGallery from "@/components/ui/accordion-gallery";
import { withBasePath } from "@/lib/utils";

interface ScreenshotGalleryProps {
  images: string[];
  title: string;
}

const ROW_SIZE = 5;

export function ScreenshotGallery({ images, title }: ScreenshotGalleryProps) {
  if (images.length === 0) return null;

  const rows: string[][] = [];
  for (let i = 0; i < images.length; i += ROW_SIZE) {
    rows.push(images.slice(i, i + ROW_SIZE));
  }

  return (
    <div className="space-y-3">
      {rows.map((row, rowIndex) => (
        <AccordionGallery
          key={row[0]}
          items={row.map((src, index) => {
            const number = rowIndex * ROW_SIZE + index + 1;
            return {
              image: withBasePath(src),
              label: String(number).padStart(2, "0"),
              alt: `${title} screenshot ${number}`,
            };
          })}
          defaultIndex={Math.min(2, row.length - 1)}
          expandRatio={0.52}
          trigger="hover"
          accentColor="var(--accent)"
          overlayColor="#101418"
          textColor="#f2efe6"
          height={480}
          radius={20}
          className="accordion-gallery--screens"
        />
      ))}
    </div>
  );
}
