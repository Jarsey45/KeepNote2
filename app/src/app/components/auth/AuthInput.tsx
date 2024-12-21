"use client";

import { forwardRef, } from "react";
import { FieldError, } from "react-hook-form";

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	error?: FieldError;
	label?: string;
}

export const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
	({ error, label, ...props }, ref) => (
		<div className="space-y-1">
			{label && (
				<label className="block text-sm font-medium text-gray-700">
					{label}
				</label>
			)}
			<input
				ref={ref}
				{...props}
				className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
			/>
			{error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
		</div>
	)
);

AuthInput.displayName = "AuthInput";
