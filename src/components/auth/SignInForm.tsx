"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import Cookies from "js-cookie";
import { useAuthStore } from "@/stores/authStore";
import { loginUser } from "@/lib/api/auth/mutations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required"),
});

type SignInValues = z.infer<typeof signInSchema>;

export function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  
  const { login } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "password" }, // mock default password
  });

  const onSubmit = async (data: SignInValues) => {
    setIsLoading(true);
    try {
      const response = await loginUser({
        email: data.email,
        password: data.password,
      });

      // Update global store
      login(response.access_token, response.user);

      // Sync cookies immediately so middleware recognizes this user on redirect
      Cookies.set("user_role", response.user.role, { expires: 7, path: "/", sameSite: "lax" });
      Cookies.set("access_token", response.access_token, { expires: 7, path: "/", sameSite: "lax" });

      toast.success("Welcome back!", {
        description: `Signed in as ${response.user.fullName} (${response.user.role})`
      });

      // Route dynamically based on user role (if no explicit redirect exists)
      if (redirect) {
        router.push(redirect);
      } else {
        if (response.user.role === "PI") {
          router.push("/pi");
        } else {
          router.push("/admin");
        }
      }
    } catch (error) {
      toast.error("Sign In Failed", {
        description: "Please check your credentials and try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email address</Label>
        <Input
          id="email"
          type="email"
          placeholder="pi@crmp.edu or rad@crmp.edu"
          disabled={isLoading}
          {...register("email")}
        />
        {errors.email && (
          <p className="text-sm font-medium text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <a
            href="#"
            className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
          >
            Forgot password?
          </a>
        </div>
        <Input
          id="password"
          type="password"
          disabled={isLoading}
          {...register("password")}
        />
        {errors.password && (
          <p className="text-sm font-medium text-red-500">
            {errors.password.message}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Signing in...
          </>
        ) : (
          "Sign in"
        )}
      </Button>

      <div className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400">
        <p>Testing accounts (Mock Data):</p>
        <ul className="mt-1 flex flex-wrap justify-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-300">
          <li>pi@crmp.edu</li>
          <li>&bull;</li>
          <li>rad@crmp.edu</li>
          <li>&bull;</li>
          <li>finance@crmp.edu</li>
        </ul>
      </div>
    </form>
  );
}
