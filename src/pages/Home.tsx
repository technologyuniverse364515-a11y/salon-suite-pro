import { Link } from "react-router-dom";
import { ArrowRight, Star, Users, Award, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ServiceCard } from "@/components/ServiceCard";
import { ReviewCard } from "@/components/ReviewCard";
import { services, reviews } from "@/lib/sample-data";
import { ScreenText, ButtonLabels } from "@/lib/constants";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=1600"
          alt="Luxe Salon hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
        <div className="relative container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 mb-6">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-medium text-primary tracking-wide uppercase">Premium Beauty Studio</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight max-w-4xl mx-auto leading-tight">
            {ScreenText.hero.title}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mt-6">
            {ScreenText.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Button asChild size="lg" className="text-base px-8">
              <Link to="/booking">{ButtonLabels.bookNow}</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base px-8">
              <Link to="/services">{ButtonLabels.viewServices} <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          {/* Stats */}
          <div className="flex items-center justify-center gap-8 md:gap-12 mt-16">
            {[
              { icon: Users, label: "Happy Clients", value: "5,000+" },
              { icon: Award, label: "Years Experience", value: "12+" },
              { icon: Star, label: "Average Rating", value: "4.9" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <s.icon className="h-5 w-5 text-primary mx-auto mb-1" />
                <div className="text-2xl font-bold text-foreground">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">{ScreenText.services.title}</h2>
            <p className="text-muted-foreground mt-2">{ScreenText.services.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.slice(0, 6).map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Button asChild variant="outline" size="lg">
              <Link to="/services">{ButtonLabels.viewAll} Services <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">{ScreenText.testimonials.title}</h2>
            <p className="text-muted-foreground mt-2">{ScreenText.testimonials.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {reviews.slice(0, 6).map((r) => (
              <ReviewCard key={r.id} review={r} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Ready for Your Transformation?</h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">Book your appointment today and experience the difference premium care makes.</p>
          <Button asChild size="lg" className="mt-8 text-base px-10">
            <Link to="/booking">{ButtonLabels.bookNow}</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
