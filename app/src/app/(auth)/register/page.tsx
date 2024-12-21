"use client";

import { z, } from "zod";
import { AuthCard, } from "@/app/components/auth/AuthCard";
// import { AuthInput, } from "@/app/components/auth/AuthInput";

const registerSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z.string().min(6, "Password must be at least 6 characters"),
	confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
	return (
		<AuthCard>
			<form className="mt-8 space-y-6">
			</form>
		</AuthCard>
	);
}
