import { Button } from "@/components/atoms/Button";

export default function SubscriptionsPage() {
  const plans = [
    { name: "Basic", price: "₹999", features: ["Profile Listing", "Limited Searches"] },
    { name: "Pro", price: "₹2999", features: ["Featured Listing", "Unlimited Searches", "Analytics"] },
    { name: "Enterprise", price: "₹9999", features: ["Dedicated Support", "Priority Listing", "Custom Features"] }
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Subscription Plans</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan.name} className="border border-border p-6 rounded-xl bg-card shadow-sm">
            <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
            <p className="text-4xl font-extrabold mb-4">{plan.price}<span className="text-sm font-normal">/month</span></p>
            <ul className="mb-6 space-y-2 text-foreground/80">
              {plan.features.map(f => <li key={f}>✓ {f}</li>)}
            </ul>
            <Button className="w-full">Select Plan</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
