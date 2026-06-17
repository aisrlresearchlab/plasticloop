import { AuthLayout } from "@/features/plastic-twin/components/auth-layout";
import { SignUpForm } from "@/features/plastic-twin/components/sign-up-form";

export function SignUpView() {
  return (
    <AuthLayout>
      <SignUpForm />
    </AuthLayout>
  );
}
