export default function DashboardPage() {
  const stats = [
    { name: "Analytics", value: "85%" },
    { name: "Revenue", value: "₹12,40,000" },
    { name: "Occupancy", value: "72%" },
    { name: "Advertisers", value: "156" },
    { name: "Hoardings", value: "450" },
    { name: "Recent Activities", value: "24" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="card p-6">
            <h3 className="text-sm font-semibold text-foreground/70 uppercase tracking-wide">{stat.name}</h3>
            <p className="text-3xl font-bold mt-2 text-primary">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
