import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";

export default function ResetPasswordPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Reset Password</h1>
      <form className="space-y-4">
        <Input type="password" placeholder="New Password" />
        <Input type="password" placeholder="Confirm Password" />
        <Button className="w-full">Reset Password</Button>
      </form>
    </div>
  );
}
