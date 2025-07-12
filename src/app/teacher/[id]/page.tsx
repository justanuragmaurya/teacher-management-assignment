import MaxWidthContainer from "@/components/maxwidthcontainer";
import TeachProfileCompo from "@/components/teacherProfile";
import QualificationsComponent from "@/components/qualifications";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function TechersPage({ params }: { params: { id: string } }) {
  const session = await auth();
  
  if (!session) {
    redirect("/");
  }

  return (
    <MaxWidthContainer className="flex p-5 gap-5">
      <TeachProfileCompo />
      <QualificationsComponent />
    </MaxWidthContainer>
  );
}