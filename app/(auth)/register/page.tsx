import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Register as Artist</h1>
      <form className="space-y-4">
        <Input type="text" placeholder="Full Name" />
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Button className="w-full">Register</Button>
      </form>
      <div className="mt-4 text-center text-sm">
        Already have an account? <Link href="/login" className="text-primary font-semibold">Login</Link>
      </div>
    </div>
  );
}
