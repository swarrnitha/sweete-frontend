import Link from 'next/link';
import { SWEET_CATEGORIES } from "@/constants/categories";

export const CategoryGrid = () => {
  return (
    <div className="container mx-auto py-12">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Browse by Category</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SWEET_CATEGORIES.map((category) => (
          <div key={category.name} className="card p-6 hover:shadow-md">
            <h3 className="text-2xl font-semibold mb-5 text-primary">{category.icon} {category.name}</h3>
            <div className="flex flex-wrap gap-2">
              {category.subcategories.map((sub) => (
                <Link
                  key={sub}
                  href={`/explore?q=${encodeURIComponent(sub)}`}
                  className="px-3 py-1 bg-background border border-border rounded-full text-sm hover:border-primary hover:text-primary transition-all"
                >
                  {sub}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
