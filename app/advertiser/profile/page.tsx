import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { Textarea } from "@/components/atoms/Textarea";

export default function ProfilePage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Artist Profile Management</h1>
      <form className="space-y-6 bg-card p-6 border border-border rounded-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input type="text" placeholder="Artist/Brand Name" />
          <Input type="text" placeholder="Category" />
        </div>
        <Textarea placeholder="Bio / Description" className="h-32" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input type="text" placeholder="Pricing (e.g. ₹5000/event)" />
          <Input type="text" placeholder="Location" />
        </div>
        <div className="border-2 border-dashed border-border p-8 text-center rounded-lg text-foreground/60">
          Upload Profile Photo
        </div>
        <Button type="submit">Save Profile</Button>
      </form>
    </div>
  );
}
