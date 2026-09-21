import Link from 'next/link';
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";

export default function LoginPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Login to your account</h1>
      <form className="space-y-4">
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Button className="w-full">Login</Button>
      </form>
      <div className="mt-4 text-center">
        <Link href="/forgot-password" className="text-sm text-primary">Forgot password?</Link>
      </div>
    </div>
  );
}
