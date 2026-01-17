import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "CYBERVIBE transformed our legacy systems into a modern, scalable platform. Their expertise in cloud migration was exceptional, and they delivered ahead of schedule.",
    author: "Sarah Chen",
    role: "CTO",
    company: "Global Finance Corp",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=56&h=56&fit=crop&crop=face&fm=webp&q=80",
  },
  {
    quote: "The cybersecurity solutions implemented by CYBERVIBE have significantly strengthened our security posture. Their team's knowledge and professionalism are unmatched.",
    author: "Michael Rodriguez",
    role: "CISO",
    company: "HealthTech Solutions",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=56&h=56&fit=crop&crop=face&fm=webp&q=80",
  },
  {
    quote: "Working with CYBERVIBE on our AI initiative was a game-changer. They delivered innovative solutions that gave us a competitive edge in the market.",
    author: "Emily Watson",
    role: "VP of Innovation",
    company: "RetailMax Industries",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=56&h=56&fit=crop&crop=face&fm=webp&q=80",
  },
  {
    quote: "Their agile approach and deep technical expertise helped us launch our product 40% faster than projected. Truly a world-class technology partner.",
    author: "David Kim",
    role: "CEO",
    company: "TechStart Ventures",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=56&h=56&fit=crop&crop=face&fm=webp&q=80",
  },
];

export const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Client Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-4 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it—hear from the enterprises we've helped transform.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.author}
              className="bg-card p-8 rounded-2xl shadow-card hover-lift animate-fade-in relative"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Quote className="w-10 h-10 text-primary/20 absolute top-6 right-6" />
              <p className="text-foreground text-lg mb-6 relative z-10">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  width={56}
                  height={56}
                  loading="lazy"
                  className="w-14 h-14 rounded-full object-cover border-2 border-primary"
                />
                <div>
                  <div className="font-semibold text-foreground">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}, {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
