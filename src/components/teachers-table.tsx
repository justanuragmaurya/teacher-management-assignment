import { User } from "@/generated/prisma"
import { Edit, Trash2Icon } from "lucide-react"
import { Button } from "./ui/button"

interface TeachersTableProps {
  teachers: User[]
}

export default function TeachersTable({ teachers }: TeachersTableProps) {
  return (
    <div className="w-full">
      <div className="rounded-md border">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted">
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Name
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Phone
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Email
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Birth Date
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Address
              </th>
              <th className="h-12 px-4 text-center align-middle font-medium text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => (
              <tr key={teacher.id} className="border-b transition-colors hover:bg-muted/50">
                <td className="p-4 align-middle font-medium">
                  {teacher.name}
                </td>
                <td className="p-4 align-middle">
                  {teacher.phone || "Not Available"}
                </td>
                <td className="p-4 align-middle">
                  {teacher.email}
                </td>
                <td className="p-4 align-middle">
                  {teacher.birthdate 
                    ? new Date(teacher.birthdate).toLocaleDateString()
                    : "Not Available"
                  }
                </td>
                <td className="p-4 align-middle">
                  {teacher.address || "Not Available"}
                </td>
                <td className="p-4 align-middle">
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                    >
                      <Trash2Icon className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {teachers.length === 0 && (
        <div className="flex h-24 items-center justify-center text-muted-foreground">
          No teachers found.
        </div>
      )}
    </div>
  )
}