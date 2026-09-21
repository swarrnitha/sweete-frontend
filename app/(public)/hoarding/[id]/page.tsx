'use client';
import { useParams, useRouter } from 'next/navigation';
import { Button } from "@/components/atoms/Button";
import { sweets } from "@/components/organisms/hoardings-data";
import { ArrowLeft, Star, Clock, ShoppingBag, BadgeCheck, Truck } from 'lucide-react';

export default function SweetDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const sweet = sweets.find(s => s.id === Number(id));

  if (!sweet) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Sweet not found</h1>
        <Button onClick={() => router.push('/explore')}>Browse Sweets</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-5xl">
      <button onClick={() => router.back()} className="flex items-center gap-2 text-foreground/50 hover:text-foreground transition-colors mb-8">
        <ArrowLeft className="w-5 h-5" /> Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="rounded-3xl overflow-hidden shadow-lg">
          <img src={sweet.image} alt={sweet.name} className="w-full aspect-[4/3] md:aspect-auto md:h-full object-cover" />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full">{sweet.tag}</span>
            <span className="text-foreground/40 text-sm">{sweet.city} · {sweet.area}</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-bold mt-3 mb-2">{sweet.name}</h1>
          <p className="text-foreground/50 mb-4">by {sweet.shop}</p>
          <p className="text-foreground/60 leading-relaxed mb-6">{sweet.description}</p>

          <div className="space-y-3 mb-8">
            <div className="flex items-center gap-3 text-sm">
              <span className="w-5 h-5 rounded-sm bg-green-500 border border-green-600 flex items-center justify-center" />
              <span className="text-foreground/70">Vegetarian</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Star className="w-5 h-5 text-green-600 fill-green-600" />
              <span className="text-foreground/70">{sweet.rating} ({sweet.reviews} reviews)</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Clock className="w-5 h-5 text-primary" />
              <span className="text-foreground/70">Delivery: {sweet.deliveryTime}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Truck className="w-5 h-5 text-primary" />
              <span className="text-foreground/70">Weight: {sweet.weight}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <BadgeCheck className="w-5 h-5 text-primary" />
              <span className="text-foreground/70">Quality verified by sweeTe</span>
            </div>
          </div>

          {sweet.customization && (
            <div className="mb-6">
              <p className="font-semibold text-sm mb-2">Available Sizes:</p>
              <div className="flex flex-wrap gap-2">
                {sweet.customization.map((c, i) => (
                  <span key={i} className="px-3 py-1.5 bg-stone-100 rounded-lg text-sm text-foreground/70 hover:bg-primary/10 hover:text-primary cursor-pointer transition-colors border border-transparent hover:border-primary/30">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-extrabold text-primary">&#8377;{sweet.price}</span>
            {sweet.originalPrice && (
              <span className="text-lg text-foreground/40 line-through">&#8377;{sweet.originalPrice}</span>
            )}
            {sweet.originalPrice && (
              <span className="text-sm text-green-600 font-semibold">{Math.round((1 - sweet.price / sweet.originalPrice) * 100)}% OFF</span>
            )}
          </div>

          <Button size="lg" className="w-full flex items-center justify-center gap-2">
            <ShoppingBag className="w-5 h-5" /> Add to Cart - &#8377;{sweet.price}
          </Button>
        </div>
      </div>
    </div>
  );
}
