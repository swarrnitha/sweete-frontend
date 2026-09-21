export default function PricingPage() {
  const plans = [
    { name: "Sweet Starter", price: "Free", desc: "Per order delivery fee" },
    { name: "Sweet Premium", price: "299", desc: "Monthly subscription" },
    { name: "Sweet Elite", price: "599", desc: "Quarterly subscription" },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-12 text-center">Pricing Plans</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {plans.map((plan) => (
          <div key={plan.name} className="card p-8 text-center">
            <h2 className="text-xl md:text-2xl font-bold mb-4">{plan.name}</h2>
            <p className="text-2xl md:text-3xl font-extrabold mb-2">&#8377;{plan.price}</p>
            <p className="text-sm text-foreground/50 mb-6">{plan.desc}</p>
            <button className="w-full bg-primary text-white py-3 rounded-lg font-semibold">Get Started</button>
          </div>
        ))}
      </div>
    </div>
  );
}
