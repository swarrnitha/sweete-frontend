import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";

export default function OTPVerificationPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Verify OTP</h1>
      <p className="mb-4 text-sm text-foreground/70">Enter the 6-digit code sent to your email.</p>
      <form className="space-y-4">
        <Input type="text" maxLength={6} placeholder="000000" className="text-center text-2xl tracking-widest" />
        <Button className="w-full">Verify</Button>
      </form>
    </div>
  );
}
