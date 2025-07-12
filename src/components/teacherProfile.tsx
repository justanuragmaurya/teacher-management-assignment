"use client";
import { useParams } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import { User } from "@/generated/prisma";
import MaxWidthContainer from "@/components/maxwidthcontainer";
import { EditIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function TeachProfileCompo() {
  const [teacherData, setData] = useState<User>();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const { data: session } = useSession();
  const params = useParams();
  if (!params?.id) {
    return <div>Invalid Page Request</div>;
  }

  const fetchData = async () => {
    const response = await axios.post("/api/teacher", { id: params.id });
    setData(response.data);
    setFormData({
      name: response.data.name || "",
      email: response.data.email || "",
      phone: response.data.phone || "",
      address: response.data.address || "",
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Check if current user can edit this profile
  const canEdit = session && (
    session.user?.id === params.id || // User editing their own profile
    (session.user as any)?.role === "Admin"    // Admin can edit any profile
  );

  const handleUpdateProfile = async () => {
    try {
      await axios.put("/api/teacher", {
        id: params.id,
        ...formData,
      });
      fetchData(); // Refresh data
      setEditDialogOpen(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (!teacherData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading teacher profile...</div>
      </div>
    );
  }

  return (
      <div className="max-w-3/5">
        <div className="bg-card rounded-lg shadow-lg overflow-hidden border">
          <div className="bg-gradient-to-r from-primary to-primary/80 px-6 py-8 flex justify-between">
            <div className="flex items-center space-x-4">
              {teacherData.image && (
                <img
                  src={teacherData.image}
                  alt={teacherData.name || "Teacher"}
                  className="w-20 h-20 rounded-full border-4 border-card shadow-lg"
                />
              )}
              <div className="text-primary-foreground">
                <h1 className="text-3xl font-bold">{teacherData.name}</h1>
                <p className="text-primary-foreground/80 text-lg">
                  {teacherData.role}
                </p>
              </div>
            </div>
            <div className="">
              {canEdit && (
                <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant={"outline"} className="flex gap-5 items-center">
                      Update Profile
                      <EditIcon />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Edit Profile</DialogTitle>
                      <DialogDescription>
                        Make changes to the teacher profile here. Click save when you're done.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="name" className="text-right">
                          Name
                        </label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="email" className="text-right">
                          Email
                        </label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="phone" className="text-right">
                          Phone
                        </label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="address" className="text-right">
                          Address
                        </label>
                        <Input
                          id="address"
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleUpdateProfile}>Save changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground border-b border-border pb-2">
                  Personal Information
                </h2>

                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="text-muted-foreground font-medium w-24">
                      Email:
                    </span>
                    <span className="text-foreground">{teacherData.email}</span>
                  </div>

                  <div className="flex items-center">
                    <span className="text-muted-foreground font-medium w-24">
                      Phone:
                    </span>
                    <span className="text-foreground">
                      {teacherData.phone || "Not provided"}
                    </span>
                  </div>

                  <div className="flex items-start">
                    <span className="text-muted-foreground font-medium w-24">
                      Address:
                    </span>
                    <span className="text-foreground">
                      {teacherData.address || "Not provided"}
                    </span>
                  </div>

                  <div className="flex items-center">
                    <span className="text-muted-foreground font-medium w-24">
                      Birthday:
                    </span>
                    <span className="text-foreground">
                      {teacherData.birthdate
                        ? new Date(teacherData.birthdate).toLocaleDateString()
                        : "Not provided"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground border-b border-border pb-2">
                  Account Information
                </h2>

                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="text-muted-foreground font-medium w-32">
                      Teacher ID:
                    </span>
                    <span className="text-foreground font-mono text-sm">
                      {teacherData.id}
                    </span>
                  </div>

                  <div className="flex items-center">
                    <span className="text-muted-foreground font-medium w-32">
                      Role:
                    </span>
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-sm font-medium border border-primary/20">
                      {teacherData.role}
                    </span>
                  </div>

                  <div className="flex items-center">
                    <span className="text-muted-foreground font-medium w-32">
                      Joined:
                    </span>
                    <span className="text-foreground">
                      {new Date(teacherData.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex items-center">
                    <span className="text-muted-foreground font-medium w-32">
                      Last Updated:
                    </span>
                    <span className="text-foreground">
                      {new Date(teacherData.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
