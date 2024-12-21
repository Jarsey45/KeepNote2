"use client";

import { z, } from "zod";
import { AuthCard, } from "@/app/components/auth/AuthCard";
// import { AuthInput, } from "@/app/components/auth/AuthInput";

const loginSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
	return (
		<AuthCard>
			<form className="mt-8 space-y-6">
			</form>
		</AuthCard>
	);
}
