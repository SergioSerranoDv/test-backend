import { Label } from "@prisma/client"
import { PrismaClientSingleton } from "../../utils/DatabaseInstance"
import { ApiResponse } from "../types/Api"

export class LabelController {
  public createNewLabel = async (data: Label): Promise<ApiResponse> => {
    const prisma = PrismaClientSingleton.getInstance()
    try {
      const newNote = await prisma.label.create({
        data,
      })
      return {
        status: "success",
        code: 201,
        data: newNote,
        message: "Label created successfully",
      }
    } catch (error: any) {
      return {
        status: "error",
        code: 500,
        message: error.message,
      }
    }
  }
  public deleteLabelById = async (id: number): Promise<ApiResponse> => {
    const prisma = PrismaClientSingleton.getInstance()
    try {
      const deletedLabel = await prisma.label.delete({
        where: {
          id,
        },
      })
      return {
        status: "success",
        code: 200,
        data: deletedLabel,
        message: "Label deleted successfully",
      }
    } catch (error: any) {
      return {
        status: "error",
        code: 500,
        message: error.message,
      }
    }
  }
  public getAllLabels = async (): Promise<ApiResponse> => {
    const prisma = PrismaClientSingleton.getInstance()
    try {
      const labels = await prisma.label.findMany()
      return {
        status: "success",
        code: 200,
        data: labels,
        message: "labels fetched successfully",
      }
    } catch (error: any) {
      return {
        status: "error",
        code: 500,
        message: error.message,
      }
    }
  }
  public getNoteByLabel = async (nameLabel: string): Promise<ApiResponse> => {
    const prisma = PrismaClientSingleton.getInstance()
    try {
      const notes = await prisma.note.findMany({
        where: {
          labels: {
            some: {
              label: {
                name: nameLabel,
              },
            },
          },
        },
      })
      if (!notes.length) {
        return {
          status: "error",
          code: 404,
          message: "No notes found with this label",
        }
      }
      return {
        status: "success",
        code: 200,
        data: notes,
        message: "Notes fetched successfully",
      }
    } catch (error: any) {
      return {
        status: "error",
        code: 500,
        message: error.message,
      }
    }
  }
  public updateLabel = async (data: Label): Promise<ApiResponse> => {
    const prisma = PrismaClientSingleton.getInstance()
    try {
      const updatedLabel = await prisma.label.update({
        where: {
          id: data.id,
        },
        data,
      })
      return {
        status: "success",
        code: 200,
        data: updatedLabel,
        message: "Label updated successfully",
      }
    } catch (error: any) {
      return {
        status: "error",
        code: 500,
        message: error.message,
      }
    }
  }
}
