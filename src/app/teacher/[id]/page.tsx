import MaxWidthContainer from "@/components/maxwidthcontainer";
import TeachProfileCompo from "@/components/teacherProfile";
import QualificationsComponent from "@/components/qualifications";
import AvailabilityComponent from "@/components/availability";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function TechersPage({ params }: { params: { id: string } }) {
  const session = await auth();
  
  if (!session) {
    redirect("/");
  }

  return (
    <MaxWidthContainer className="p-5 space-y-5">
      <div className="flex gap-5">
        <TeachProfileCompo />
        <QualificationsComponent />
      </div>
      <div className="w-full">
        <AvailabilityComponent />
      </div>
    </MaxWidthContainer>
  );
}