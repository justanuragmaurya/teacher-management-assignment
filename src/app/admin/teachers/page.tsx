import AddTeacherDialog from "@/components/add-user-dialog";
import MaxWidthContainer from "@/components/maxwidthcontainer";
import TeachersTable from "@/components/teachers-table";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Edit, Plus, Trash2Icon } from "lucide-react";

export default async function TeachersPage() {
  const session = await auth();
  if (!session) {
    return <div className="flex h-screen items-center justify-center">Please login </div>;
  }

  const user = await prisma.user.findUnique({
    where:{id:session.user?.id}
  })
  if(user?.role!=="Admin"){
    return(
        <div className="flex h-screen items-center justify-center">Not an Admin</div>
    )
  }

  const teachers = await prisma.user.findMany({
    where: { role: "Teacher" },
  });

  return (
    <div>
      <MaxWidthContainer>
        <div className="p-5">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-3xl font-bold">Teachers</h1>
            <div><AddTeacherDialog/></div>
          </div>
          <TeachersTable teachers={teachers}></TeachersTable>
        </div>
      </MaxWidthContainer>
    </div>
  );
}
