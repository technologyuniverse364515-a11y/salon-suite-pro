import { useParams, Link, useNavigate } from "react-router-dom";
import { Clock, DollarSign, Star, CheckCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReviewCard } from "@/components/ReviewCard";
import { ServiceCard } from "@/components/ServiceCard";
import { services, reviews } from "@/lib/sample-data";
import { ButtonLabels } from "@/lib/constants";

export default function ServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = services.find((s) => s.id === id);

  if (!service) {
    return (
      <div className="py-32 text-center">
        <p className="text-muted-foreground">Service not found.</p>
        <Button asChild variant="outline" className="mt-4"><Link to="/services">Back to Services</Link></Button>
      </div>
    );
  }

  const serviceReviews = reviews.filter((r) => r.serviceId === service.id);
  const avgRating = serviceReviews.length ? (serviceReviews.reduce((a, r) => a + r.rating, 0) / serviceReviews.length).toFixed(1) : "5.0";
  const relatedServices = services.filter((s) => s.category === service.category && s.id !== service.id).slice(0, 3);

  return (
    <div className="relative">
      {/* Hero */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="container mx-auto">
            <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <span className="text-xs font-medium uppercase tracking-wider text-primary">{service.category}</span>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mt-1">{service.name}</h1>
            <div className="flex items-center gap-4 mt-3 text-muted-foreground">
              <span className="flex items-center gap-1"><DollarSign className="h-4 w-4" />{service.price}</span>
              <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{service.duration} min</span>
              <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-primary text-primary" />{avgRating} ({serviceReviews.length} reviews)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-10">
            {/* Description */}
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-3">About This Service</h2>
              <p className="text-muted-foreground leading-relaxed">{service.longDescription}</p>
            </div>

            {/* Benefits */}
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-3">Why Choose This Service</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.benefits.map((b) => (
                  <div key={b} className="flex items-start gap-2 bg-card border border-border rounded-lg p-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm text-foreground">{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            {serviceReviews.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-3">Client Reviews</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {serviceReviews.map((r) => (
                    <ReviewCard key={r.id} review={r} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sticky CTA sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-card border border-border rounded-lg p-6 space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Ready to Book?</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between"><span>Price</span><span className="text-foreground font-medium">${service.price}</span></div>
                <div className="flex justify-between"><span>Duration</span><span className="text-foreground font-medium">{service.duration} min</span></div>
                <div className="flex justify-between"><span>Rating</span><span className="text-foreground font-medium flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-primary text-primary" />{avgRating}</span></div>
              </div>
              <Button asChild className="w-full" size="lg">
                <Link to={`/booking?service=${service.id}`}>{ButtonLabels.bookNow}</Link>
              </Button>
              <p className="text-xs text-muted-foreground text-center">Free cancellation up to 24h before</p>
            </div>
          </div>
        </div>

        {/* Related */}
        {relatedServices.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-semibold text-foreground mb-6">Related Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedServices.map((s) => (
                <ServiceCard key={s.id} service={s} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-background/95 backdrop-blur border-t border-border p-4 z-40">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-foreground font-semibold">${service.price}</div>
            <div className="text-xs text-muted-foreground">{service.duration} min</div>
          </div>
          <Button asChild>
            <Link to={`/booking?service=${service.id}`}>{ButtonLabels.bookNow}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
