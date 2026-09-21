export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-3xl md:text-5xl font-bold mb-4 logo-font">About SWEETE</h1>
      <p className="text-foreground/50 text-lg mb-12">Delivering happiness, one sweet at a time</p>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-primary">Our Story</h2>
        <p className="text-foreground/70 leading-relaxed text-lg">sweeTe was born from a simple idea: everyone deserves access to the finest sweets, pastries, and desserts from the best bakeries in their city. We connect sweet lovers with top-rated sweet shops, bringing authentic flavours and artisan treats right to your doorstep.</p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-primary">Mission</h2>
        <p className="text-foreground/70 leading-relaxed text-lg">To make the joy of sweets accessible to everyone by connecting the best sweet shops with customers through technology, freshness guarantee, and lightning-fast delivery.</p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-primary">Vision</h2>
        <p className="text-foreground/70 leading-relaxed text-lg">To become India&apos;s most loved sweets delivery platform, where every celebration is sweeter and every craving is satisfied in minutes.</p>
      </section>
    </div>
  );
}
