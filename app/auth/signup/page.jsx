"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { registerUser } from "@/redux/features/authSlice";
import Spinner from "@/components/Spinner";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const router = useRouter();

  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(registerUser(formData)).unwrap();
      router.push("/auth/login");
    } catch (err) {
      console.log("Signup Error", err);
    }
  };

  return (
    <div className="relative flex justify-center items-center h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Create Account</CardTitle>
          <CardDescription>Get Access for Free</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">UserName</Label>
                <Input
                  id="username"
                  name="username"
                  placeholder="UserName"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="example@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>
            {error ? (
              <p className="text-red-500 text-sm mt-2">Please Try Again</p>
            ) : null}
            <CardFooter className="flex justify-between mt-4">
              <Button
                variant="outline"
                type="button"
                onClick={() => router.push("/auth/login")}
              >
                Login
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? <Spinner /> : "Register"}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupPage;
