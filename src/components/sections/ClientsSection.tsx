const clients = [
  { name: "Microsoft", logo: "M" },
  { name: "Amazon", logo: "A" },
  { name: "Google", logo: "G" },
  { name: "IBM", logo: "I" },
  { name: "Oracle", logo: "O" },
  { name: "SAP", logo: "S" },
];

export const ClientsSection = () => {
  return (
    <section className="py-16 border-y border-teal/10 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-muted-foreground text-sm uppercase tracking-wider font-medium">
            Trusted by Leading Enterprises Worldwide
          </p>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16">
          {clients.map((client) => (
            <div
              key={client.name}
              className="w-24 h-12 flex items-center justify-center grayscale hover:grayscale-0 transition-all opacity-50 hover:opacity-100"
            >
              <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center hover:bg-teal/20 transition-colors">
                <span className="text-xl font-bold text-teal">{client.logo}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
