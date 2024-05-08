import { Note } from "@prisma/client"

export interface Label {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date
}
