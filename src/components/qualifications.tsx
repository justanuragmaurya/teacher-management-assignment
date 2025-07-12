"use client";
import { useParams } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import { User, Qualifications } from "@/generated/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GraduationCap, Calendar, Star, Plus } from "lucide-react";
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

interface TeacherWithQualifications extends User {
  Qualifications: Qualifications[];
}

export default function QualificationsComponent() {
  const [teacherData, setData] = useState<TeacherWithQualifications>();
  const [loading, setLoading] = useState(true);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newQualification, setNewQualification] = useState({
    title: "",
    date: "",
    rate: "",
  });
  const { data: session } = useSession();
  const params = useParams();

  if (!params?.id) {
    return <div>Invalid Page Request</div>;
  }

  const fetchData = async () => {
    try {
      const response = await axios.post("/api/teacher", { id: params.id });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching teacher data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Check if current user can edit qualifications
  const canEdit = session && (
    session.user?.id === params.id || // User editing their own qualifications
    (session.user as any)?.role === "Admin"    // Admin can edit any qualifications
  );

  const handleAddQualification = async () => {
    try {
      await axios.post("/api/qualifications", {
        teacherId: params.id,
        title: newQualification.title,
        date: new Date(newQualification.date).toISOString(),
        rate: parseInt(newQualification.rate),
      });
      
      fetchData(); // Refresh data
      setAddDialogOpen(false);
      setNewQualification({ title: "", date: "", rate: "" });
    } catch (error) {
      console.error("Error adding qualification:", error);
    }
  };

  const getGradeVariant = (Grade: number): "default" | "secondary" | "destructive" => {
    if (Grade >= 8) return "default";
    if (Grade >= 6) return "secondary";
    return "destructive";
  };

  if (loading) {
    return (
      <div className="flex-1">
        <Card className="h-full">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-6 w-6 text-primary" />
              <CardTitle>Qualifications</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-8">
              <div className="text-lg text-muted-foreground">Loading qualifications...</div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!teacherData) {
    return (
      <div className="flex-1">
        <Card className="h-full">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-6 w-6 text-primary" />
              <CardTitle>Qualifications</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-8">
              <div className="text-lg text-muted-foreground">Error loading qualifications</div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <Card className="h-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-6 w-6 text-primary" />
              <CardTitle>Qualifications</CardTitle>
            </div>
            {canEdit && (
              <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add Qualification
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add New Qualification</DialogTitle>
                    <DialogDescription>
                      Add a new qualification to the teacher's profile.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="title" className="text-right">
                        Title
                      </label>
                      <Input
                        id="title"
                        value={newQualification.title}
                        onChange={(e) => setNewQualification({ ...newQualification, title: e.target.value })}
                        className="col-span-3"
                        placeholder="e.g., Bachelor of Science"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="date" className="text-right">
                        Date
                      </label>
                      <Input
                        id="date"
                        type="date"
                        value={newQualification.date}
                        onChange={(e) => setNewQualification({ ...newQualification, date: e.target.value })}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="rate" className="text-right">
                        Grade
                      </label>
                      <Input
                        id="rate"
                        type="number"
                        min="1"
                        max="10"
                        value={newQualification.rate}
                        onChange={(e) => setNewQualification({ ...newQualification, rate: e.target.value })}
                        className="col-span-3"
                        placeholder="1-10"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleAddQualification}>Add Qualification</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {teacherData.Qualifications && teacherData.Qualifications.length > 0 ? (
            <div className="space-y-4">
              {teacherData.Qualifications.map((qualification) => (
                <div
                  key={qualification.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-muted/20"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-lg text-foreground">
                      {qualification.title}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <Badge variant={getGradeVariant(qualification.rate)}>
                        {qualification.rate}/10
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">
                      Completed on {new Date(qualification.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              ))}
              <div className="border-t pt-4 mt-6">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-primary/5 rounded-lg p-3">
                    <div className="text-2xl font-bold text-primary">
                      {teacherData.Qualifications.length}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Total Qualifications
                    </div>
                  </div>
                  <div className="bg-secondary/10 rounded-lg p-3">
                    <div className="text-2xl font-bold text-secondary-foreground">
                      {(teacherData.Qualifications.reduce((sum, q) => sum + q.rate, 0) / 
                        teacherData.Qualifications.length).toFixed(1)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Average Grades
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <GraduationCap className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                No Qualifications Found
              </h3>
              <p className="text-muted-foreground text-sm">
                This teacher has not added any qualifications yet.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
