"use client";
import Button from "@/app/components/inputs/Button";
import Input from "@/app/components/inputs/Input";
import clsx from "clsx";
import React, { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
type Variant = "LOGIN" | "Register";

function AuthForm() {
  const [Variant, setVariant] = useState<Variant>("LOGIN");
  const [IsLoading, setIsLoading] = useState<boolean>(false);
  const toggleVariant = useCallback(() => {
    if (Variant === "LOGIN") {
      setVariant("Register");
    } else {
      setVariant("LOGIN");
    }
  }, [Variant]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    if (Variant === "Register") {
      //Axios register
    } else if (Variant === "LOGIN") {
      // Auth SignIn
    }
  };
  const socialAction = (action: string) => {
    setIsLoading(true);
    // NextAuth social signIn
  };
  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {Variant === "Register" && (
            <Input label="name" register={register} id="name" errors={errors} />
          )}
          <Input
            label="email"
            type="email"
            id="email"
            register={register}
            errors={errors}
          />
          <Input
            label="password"
            type="password"
            id="password"
            register={register}
            errors={errors}
          />
          <div>
            <Button disabled={IsLoading} fullWidth type="submit">
              {Variant === "LOGIN" ? "Sign In" : "Register"}
            </Button>
          </div>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or Continue with
              </span>
            </div>
          </div>
          <div className="mt-6 flex gap-2">
            {/* <AuthSocialButton /> TODO:                 */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;
