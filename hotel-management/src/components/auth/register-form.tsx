"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  registerSchema,
  type RegisterFormValues,
} from "@/lib/validations/auth";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../ui/label";

type TName =
  | "number"
  | "name"
  | "email"
  | "username"
  | "password"
  | "confirmPassword"
  | "role";

type TRole =
  | "admin"
  | "front-desk"
  | "housekeeping"
  | "restaurant-staff"
  | "inventory-manager"
  | undefined;

const formData: { name: TName; label: string; placeholder: string }[] = [
  {
    name: "name",
    label: "Name",
    placeholder: "Jhon doe",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "yourmail@example.com",
  },
  {
    name: "number",
    label: "Number",
    placeholder: "01xxxxxxxxx",
  },
  {
    name: "username",
    label: "Username",
    placeholder: "username",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "********",
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    placeholder: "********",
  },
];

export function RegisterForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState<TRole>("admin");

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      number: "",
      role: role,
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: RegisterFormValues) {
    setIsLoading(true);

    try {
      console.log(data);

      toast({
        title: "Success",
        description: "Your account has been created. Please login.",
      });

      router.push("/auth/login");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {/* role select */}
      <Select onValueChange={(value) => setRole(value as TRole)}>
        <Label>Role</Label>

        <SelectTrigger className="w-full">
          <SelectValue placeholder="user role" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="admin">Admin</SelectItem>
          <SelectItem value="front-desk">Front Desk</SelectItem>
          <SelectItem value="housekeeping">House Keeping</SelectItem>
          <SelectItem value="restaurant-staff">Restaurant Staff</SelectItem>
          <SelectItem value="inventory-manager">Inventory Manager</SelectItem>
        </SelectContent>
      </Select>

      {/* user register formf */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {formData.map((item, id) => (
            <FormField
              key={id}
              control={form.control}
              name={item.name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{item.label}</FormLabel>
                  <FormControl>
                    <Input
                      type={
                        item.name === "confirmPassword" ||
                        item.name === "password"
                          ? "password"
                          : "text"
                      }
                      placeholder={item.placeholder}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
              </>
            ) : (
              "Register"
            )}
          </Button>
        </form>
      </Form>
    </>
  );
}
