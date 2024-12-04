"use client";

import React, { useState } from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";
import { useRouter } from "next/navigation";

const RegisterEmployee = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneno: "",
    address: "",
    cnic_no: "",
    profilePic: "",
  });
  const router=useRouter()

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageFile) {
      setAlert({ message: "Please upload an image before registering!", type: "error" });
      return;
    }

    setLoading(true);

    try {
      // Upload the image
      const imageFormData = new FormData();
      imageFormData.append("file", imageFile);
      imageFormData.append("upload_preset", "helloWorld"); // Replace with your preset

      const imageRes = await fetch("https://api.cloudinary.com/v1_1/dr5xqeyrf/image/upload", {
        method: "POST",
        body: imageFormData,
      });

      const imageData = await imageRes.json();
      const imageUrl = imageData.secure_url;

      if (!imageUrl) {
        throw new Error("Image upload failed");
      }

      // Update form data with profile picture URL
      const updatedFormData = { ...formData, profilePic: imageUrl };

      // Register the employee
      const registerRes = await fetch("https://erp-woad-pi.vercel.app/v1/employe/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFormData),
      });

      if (registerRes.ok) {
        setAlert({ message: "Employee registered successfully!", type: "success" });
      } else {
        throw new Error("Failed to register employee");
      }
    } catch (error) {
      console.error(error);
      setAlert({ message: "An error occurred. Please try again.", type: "error" });
    } finally {
      setLoading(false);
      router.push("/login")
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-gray-50 mt-6 p-2">
      <h1 className="text-2xl text-center font-bold mb-2">Register Employee</h1>
      {alert && (
        <Alert variant={alert.type === "error" ? "destructive" : "default"} className="mb-4">
          <AlertTitle>{alert.type === "success" ? "Success" : "Error"}</AlertTitle>
          <AlertDescription>{alert.message}</AlertDescription>
        </Alert>
      )}
      <form onSubmit={handleRegister} className="space-y-4">
        {/* Name Input */}
        <div>
          {/* <label className="block font-medium ">Name</label> */}
          <Input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        {/* Email Input */}
        <div>
          {/* <label className="block font-medium ">Email</label> */}
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        {/* Password Input */}
        <div>
          {/* <label className="block font-medium ">Password</label> */}
          <Input
            type="text"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        {/* Confirm Password Input */}
        <div>
          {/* <label className="block font-medium ">Confirm Password</label> */}
          <Input
            type="text"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
        </div>
        {/* Phone Number Input */}
        <div>
          {/* <label className="block font-medium ">Phone Number</label> */}
          <Input
            type="text"
            name="phoneno"
            placeholder="Phone Number"
            value={formData.phoneno}
            onChange={handleInputChange}
            required
          />
        </div>
        {/* Address Input */}
        <div>
          {/* <label className="block font-medium ">Address</label> */}
          <Input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </div>
        
        {/* CNIC Number Input */}
        <div>
          {/* <label className="block font-medium ">CNIC Number</label> */}
          <Input
            type="text"
            name="cnic_no"
            placeholder="CNIC number"
            value={formData.cnic_no}
            onChange={handleInputChange}
            required
          />
        </div>
        {/* Profile Picture Upload */}
        <div>
          <label className="block font-medium ">Profile Picture</label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            required
          />
        </div>
        {/* Register Button */}
        <Button type="submit" className="w-full mt-1" disabled={loading}>
          {loading ? "Processing..." : "Register"}
        </Button>
      </form>
    </div>
  );
};

export default RegisterEmployee;