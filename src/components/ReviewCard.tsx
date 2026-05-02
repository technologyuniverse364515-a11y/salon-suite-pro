import { Star } from "lucide-react";
import type { Review } from "@/lib/sample-data";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="bg-card border border-border rounded-lg p-5">
      <div className="flex items-center gap-1 mb-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className={`h-4 w-4 ${i < review.rating ? "fill-primary text-primary" : "text-border"}`} />
        ))}
      </div>
      <p className="text-sm text-foreground italic">"{review.reviewText}"</p>
      <div className="flex items-center justify-between mt-3">
        <span className="text-sm font-medium text-foreground">{review.customerName}</span>
        <span className="text-xs text-muted-foreground">{review.createdAt}</span>
      </div>
    </div>
  );
}
