import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

const blogPosts = [
  {
    id: 1,
    title: "The Future of Cybersecurity: AI-Powered Threat Detection",
    excerpt: "Explore how artificial intelligence is revolutionizing the way organizations detect and respond to cyber threats in real-time.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=267&fit=crop&fm=webp&q=80",
    author: "Dr. Priya Sharma",
    date: "Dec 28, 2024",
    readTime: "5 min read",
    category: "Cybersecurity",
  },
  {
    id: 2,
    title: "Cloud Migration Best Practices for Enterprise Success",
    excerpt: "A comprehensive guide to planning and executing successful cloud migration strategies for large-scale enterprises.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=267&fit=crop&fm=webp&q=80",
    author: "Rajesh Kumar",
    date: "Dec 20, 2024",
    readTime: "7 min read",
    category: "Cloud Computing",
  },
  {
    id: 3,
    title: "Zero Trust Architecture: A Modern Security Approach",
    excerpt: "Understanding the principles of Zero Trust and how it can strengthen your organization's security posture.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=267&fit=crop&fm=webp&q=80",
    author: "Arun Patel",
    date: "Dec 15, 2024",
    readTime: "6 min read",
    category: "Security",
  },
];

export const BlogSection = () => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <section ref={ref} className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div
          className={cn(
            "text-center mb-16 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <span className="text-teal font-semibold text-sm uppercase tracking-wider">
            Insights & Thought Leadership
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-4 mb-4">
            Latest from Our Experts
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Stay ahead with insights on cybersecurity, digital transformation, and emerging technologies from our industry experts.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <article
              key={post.id}
              className={cn(
                "group bg-card rounded-2xl overflow-hidden border border-border hover:border-teal/30 transition-all duration-500 hover:shadow-xl",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  width={400}
                  height={192}
                  loading="lazy"
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-teal text-white text-xs font-semibold rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-teal transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="w-4 h-4" />
                    {post.author}
                  </span>
                  <span className="text-teal font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div
          className={cn(
            "text-center mt-12 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
          style={{ transitionDelay: "450ms" }}
        >
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-teal text-teal hover:bg-teal hover:text-white"
          >
            <Link to="/insights">
              View All Insights
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
