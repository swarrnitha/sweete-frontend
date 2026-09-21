export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {['Active Subscriptions', 'Pending Requests', 'Saved Hoardings', 'Recent Activity'].map(stat => (
          <div key={stat} className="card p-6">
            <h3 className="font-semibold text-foreground/70">{stat}</h3>
            <p className="text-3xl font-bold mt-2">0</p>
          </div>
        ))}
      </div>
    </div>
  );
}
