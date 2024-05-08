import { LabelToNote } from "@prisma/client"
import { PrismaClientSingleton } from "../../utils/DatabaseInstance"
import { ApiResponse } from "../types/Api"

export class LabelToNoteController {
  public createNewNoteWithLabel = async (data: LabelToNote): Promise<ApiResponse> => {
    const prisma = PrismaClientSingleton.getInstance()
    try {
      const noteWithLabel = await prisma.labelToNote.create({
        data,
      })
      return {
        status: "success",
        code: 201,
        data: noteWithLabel,
        message: "Label added to note successfully",
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

  public deleteNoteWithLabel = async (noteId: number, labelId: number): Promise<ApiResponse> => {
    const prisma = PrismaClientSingleton.getInstance()
    try {
      const labelToNote = await prisma.labelToNote.findFirst({
        where: {
          noteId: noteId,
          labelId: labelId,
        },
      })
      if (!labelToNote) {
        return {
          status: "error",
          code: 404,
          message: "Note with label not found",
        }
      }
      const deletedLabel = await prisma.labelToNote.delete({
        where: {
          id: labelToNote.id,
        },
      })
      return {
        status: "success",
        code: 200,
        data: deletedLabel,
        message: "Note with label deleted successfully",
      }
    } catch (error: any) {
      return {
        status: "error",
        code: 500,
        message: error.message,
      }
    }
  }

  public getAllNotesWithLabels = async (): Promise<ApiResponse> => {
    const prisma = PrismaClientSingleton.getInstance()
    try {
      const labels = await prisma.labelToNote.findMany()
      return {
        status: "success",
        code: 200,
        data: labels,
        message: "Notes with labels fetched successfully",
      }
    } catch (error: any) {
      return {
        status: "error",
        code: 500,
        message: error.message,
      }
    }
  }
  //   public updateLabel = async (data: Label): Promise<ApiResponse> => {
  //     const prisma = PrismaClientSingleton.getInstance()
  //     try {
  //       const updatedLabel = await prisma.label.update({
  //         where: {
  //           id: data.id,
  //         },
  //         data,
  //       })
  //       return {
  //         status: "success",
  //         code: 200,
  //         data: updatedLabel,
  //         message: "Label updated successfully",
  //       }
  //     } catch (error: any) {
  //       return {
  //         status: "error",
  //         code: 500,
  //         message: error.message,
  //       }
  //     }
  //   }
}
