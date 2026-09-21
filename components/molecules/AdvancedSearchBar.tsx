import { SWEET_CATEGORIES } from "@/constants/categories";

export const AdvancedSearchBar = () => (
  <div className="w-full max-w-5xl mx-auto my-8 p-4 bg-card border border-border rounded-2xl shadow-lg grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
    <input 
      type="text" 
      placeholder="Search for sweets..." 
      className="p-3 border border-border rounded-lg"
    />
    <select className="p-3 border border-border rounded-lg bg-background">
      <option value="">Select Category</option>
      {SWEET_CATEGORIES.map((cat) => (
        <option key={cat.name} value={cat.name}>{cat.name}</option>
      ))}
    </select>
    <input 
      type="text" 
      placeholder="City" 
      className="p-3 border border-border rounded-lg"
    />
    <button className="bg-primary text-primary-foreground p-3 rounded-lg font-semibold hover:bg-primary/90 transition-all">
      Search
    </button>
  </div>
);
