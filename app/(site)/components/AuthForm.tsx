"use client";
import Button from "@/app/components/inputs/Button";
import Input from "@/app/components/inputs/Input";
import React, { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
type Variant = "LOGIN" | "Register";

function AuthForm() {
  const session = useSession();
  const [Variant, setVariant] = useState<Variant>("LOGIN");
  const [IsLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/users");
    }
  }, [router, session?.status]);

  //

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
      axios
        .post("/api/register", data)
        .then(() => signIn("credentials", data))
        .catch((error) => toast.error("Something went wrong!"))
        .finally(() => setIsLoading(false));
    }
    if (Variant === "LOGIN") {
      // Auth SignIn
      signIn("credentials", { ...data, redirect: false })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials !");
          }
          if (callback?.ok && !callback?.error) {
            toast.success("Logged in successfully");
            router.push("/users");
          }
        })
        .finally(() => setIsLoading(false));
    }
  };
  const socialAction = (action: string) => {
    setIsLoading(true);
    // NextAuth social signIn
    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid credentials !");
        }
        if (callback?.ok && !callback?.error) {
          toast.success("Logged in successfully");
        }
      })
      .finally(() => setIsLoading(false));
  };
  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {Variant === "Register" && (
            <Input label="name" register={register} id="name" errors={errors} />
          )}
          <Input
            label="email address"
            type="email"
            id="email"
            register={register}
            errors={errors}
            disabled={IsLoading}
          />
          <Input
            label="password"
            type="password"
            id="password"
            register={register}
            disabled={IsLoading}
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
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction("github")}
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction("google")}
            />
          </div>
        </div>
        <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
          <div>
            {Variant === "LOGIN"
              ? "New to Messenger ?"
              : "Already have an account ?"}
          </div>
          <div onClick={toggleVariant} className="underline cursor-pointer">
            {Variant === "LOGIN" ? "Create An Account" : "Log In"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;
