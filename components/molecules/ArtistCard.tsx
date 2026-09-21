import Link from 'next/link';

interface ArtistCardProps {
  name: string;
  category: string;
  price: string;
  location: string;
  rating: number;
}

export const ArtistCard = ({ name, category, price, location, rating }: ArtistCardProps) => (
  <div className="border border-border rounded-xl p-4 bg-card hover:shadow-lg transition-shadow">
    <div className="w-full h-40 bg-slate-200 rounded-lg mb-4"></div> {/* Placeholder for Image */}
    <h3 className="text-lg font-semibold">{name}</h3>
    <p className="text-sm text-foreground/70 mb-2">{category} • {location}</p>
    <div className="flex justify-between items-center">
      <span className="font-bold text-primary">{price}</span>
      <span className="text-sm">★ {rating}</span>
    </div>
    <Link href="#" className="block w-full mt-4 text-center border border-primary text-primary py-2 rounded-lg hover:bg-primary hover:text-primary-foreground transition-all">
      View Details
    </Link>
  </div>
);
