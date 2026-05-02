import { ScreenText } from "@/lib/constants";

const galleryImages = [
  "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600",
  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600",
  "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600",
  "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600",
  "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600",
  "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=600",
  "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600",
  "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600",
  "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600",
];

export default function Gallery() {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">{ScreenText.gallery.title}</h1>
          <p className="text-muted-foreground mt-2">{ScreenText.gallery.subtitle}</p>
        </div>
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 max-w-6xl mx-auto">
          {galleryImages.map((img, i) => (
            <div key={i} className="mb-4 break-inside-avoid">
              <img
                src={img}
                alt={`Gallery ${i + 1}`}
                className="w-full rounded-lg border border-border hover:border-primary/50 transition-colors"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
