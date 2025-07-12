"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, Edit3, Save, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Availability {
  id: string;
  teacherId: string;
  dayOfWeek: string;
  timeSlot: string;
  status: "AVAILABLE" | "UNAVAILABLE" | "SCHEDULED";
  createdAt: string;
  updatedAt: string;
}

const daysOfWeek = [
  "MONDAY",
  "TUESDAY", 
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY"
];

const timeSlots = [
  "07:30-08:30",
  "08:30-09:30",
  "09:30-10:30",
  "10:30-11:30",
  "11:30-12:30",
  "12:30-13:30",
  "13:30-14:30",
  "14:30-15:30",
  "15:30-16:30",
  "16:30-17:30",
  "17:30-18:30"
];

export default function AvailabilityComponent() {
  const [availabilityData, setAvailabilityData] = useState<Availability[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedData, setEditedData] = useState<{[key: string]: string}>({});
  const [saving, setSaving] = useState(false);
  const { data: session } = useSession();
  const params = useParams();

  if (!params?.id) {
    return <div>Invalid Page Request</div>;
  }

  const fetchAvailability = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/availability", { teacherId: params.id });
      setAvailabilityData(response.data);
    } catch (error) {
      console.error("Error fetching availability:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAvailability();
  }, []);

  // Check if current user can edit availability
  const canEdit = session && (
    session.user?.id === params.id || 
    (session.user as any)?.role === "Admin"
  );

  const getAvailabilityForSlot = (day: string, timeSlot: string) => {
    return availabilityData.find(
      (availability) => availability.dayOfWeek === day && availability.timeSlot === timeSlot
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "AVAILABLE":
        return <Badge variant="default" className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">Available</Badge>;
      case "UNAVAILABLE":
        return <Badge variant="secondary" className="bg-muted text-muted-foreground border-border">Unavailable</Badge>;
      case "SCHEDULED":
        return <Badge variant="destructive" className="bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/20">Scheduled</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const handleStatusChange = async (availabilityId: string, newStatus: string) => {
    if (!canEdit) return;

    try {
      await axios.put("/api/availability", {
        availabilityId,
        status: newStatus,
        teacherId: params.id
      });
      fetchAvailability();
    } catch (error) {
      console.error("Error updating availability:", error);
    }
  };

  const handleEditModeToggle = () => {
    if (isEditMode) {
      setEditedData({});
    }
    setIsEditMode(!isEditMode);
  };

  const handleDropdownChange = (day: string, timeSlot: string, newStatus: string) => {
    const key = `${day}-${timeSlot}`;
    setEditedData(prev => ({
      ...prev,
      [key]: newStatus
    }));
  };

  const handleSaveAll = async () => {
    if (!canEdit) return;
    
    setSaving(true);
    try {
      const updates = Object.entries(editedData).map(([key, status]) => {
        const [day, timeSlot] = key.split('-');
        const availability = getAvailabilityForSlot(day, timeSlot);
        
        if (availability) {
          return {
            availabilityId: availability.id,
            status,
            teacherId: params.id
          };
        }
        return null;
      }).filter(Boolean);

      await Promise.all(
        updates.map(update => 
          axios.put("/api/availability", update)
        )
      );

      await fetchAvailability();
      setEditedData({});
      setIsEditMode(false);
    } catch (error) {
      console.error("Error saving availability:", error);
    } finally {
      setSaving(false);
    }
  };

  const getDropdownStatusBadge = (day: string, timeSlot: string, currentStatus: string) => {
    const key = `${day}-${timeSlot}`;
    const displayStatus = editedData[key] || currentStatus;
    
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="cursor-pointer">
            {getStatusBadge(displayStatus)}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => handleDropdownChange(day, timeSlot, "AVAILABLE")}>
            <div className="flex items-center gap-2">
              {getStatusBadge("AVAILABLE")}
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleDropdownChange(day, timeSlot, "UNAVAILABLE")}>
            <div className="flex items-center gap-2">
              {getStatusBadge("UNAVAILABLE")}
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleDropdownChange(day, timeSlot, "SCHEDULED")}>
            <div className="flex items-center gap-2">
              {getStatusBadge("SCHEDULED")}
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  if (loading) {
    return (
      <div className="flex-1">
        <Card className="h-full">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Calendar className="h-6 w-6 text-primary" />
              <CardTitle>Weekly Availability</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-8">
              <div className="text-lg text-muted-foreground">Loading availability...</div>
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
              <Calendar className="h-6 w-6 text-primary" />
              <CardTitle>Weekly Availability</CardTitle>
            </div>
            {canEdit && (
            <div className="mt-4 text-sm text-muted-foreground items-center flex">
              {isEditMode ? (
                <p>💡 Use the dropdown menus to change availability status, then click Save to apply all changes</p>
              ) : (
                <p>💡 Click on any time slot to change availability status, or use "Edit All" for bulk changes</p>
              )}
            </div>
          )}
            {canEdit && (
              <div className="flex items-center gap-2">
                {isEditMode ? (
                  <>
                    <Button 
                      variant="destructive" 
                      onClick={handleEditModeToggle}
                      disabled={saving}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleSaveAll}
                      disabled={saving || Object.keys(editedData).length === 0}
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {saving ? "Saving..." : `Save${Object.keys(editedData).length > 0 ? ` (${Object.keys(editedData).length})` : ""}`}
                    </Button>
                  </>
                ) : (
                  <Button  
                    onClick={handleEditModeToggle}
                  >
                    <Edit3 className="h-4 w-4 mr-2" />
                    Edit All
                  </Button>
                )}
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border border-border p-2 bg-muted/50 font-medium text-left">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>Time</span>
                    </div>
                  </th>
                  {daysOfWeek.map((day) => (
                    <th key={day} className="border border-border p-2 bg-muted/50 font-medium text-center min-w-[120px]">
                      {day.charAt(0) + day.slice(1).toLowerCase()}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((timeSlot) => (
                  <tr key={timeSlot}>
                    <td className="border border-border p-2 bg-muted/50 font-medium text-sm">
                      {timeSlot}
                    </td>
                    {daysOfWeek.map((day) => {
                      const availability = getAvailabilityForSlot(day, timeSlot);
                      return (
                        <td key={`${day}-${timeSlot}`} className="border border-border p-1 text-center">
                          {availability ? (
                            isEditMode ? (
                              <div className="p-2">
                                {getDropdownStatusBadge(day, timeSlot, availability.status)}
                              </div>
                            ) : (
                              <div 
                                className={`p-2 rounded cursor-pointer transition-colors ${
                                  canEdit ? 'hover:opacity-80' : ''
                                }`}
                              >
                                {getStatusBadge(availability.status)}
                              </div>
                            )
                          ) : (
                            <div className="p-2 text-muted-foreground">-</div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
