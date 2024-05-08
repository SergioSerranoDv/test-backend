import { PrismaClientSingleton } from "../../utils/DatabaseInstance"
import { Note } from "../types/Note"
import { ApiResponse } from "../types/Api"
export class NoteController {
  public createNewNote = async (data: Note): Promise<ApiResponse> => {
    const prisma = PrismaClientSingleton.getInstance()
    try {
      const newNote = await prisma.note.create({
        data,
      })
      return {
        status: "success",
        code: 201,
        data: newNote,
        message: "Note created successfully",
      }
    } catch (error: any) {
      return {
        status: "error",
        code: 500,
        message: error.message,
      }
    }
  }
  public getActiveNotes = async (): Promise<ApiResponse> => {
    const prisma = PrismaClientSingleton.getInstance()
    try {
      const notes = await prisma.note.findMany({
        where: {
          status: "active",
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
  public getArchivedNotes = async (): Promise<ApiResponse> => {
    const prisma = PrismaClientSingleton.getInstance()
    try {
      const notes = await prisma.note.findMany({
        where: {
          status: "archived",
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
  public deleteNoteById = async (id: number): Promise<ApiResponse> => {
    const prisma = PrismaClientSingleton.getInstance()
    try {
      const note = await prisma.note.delete({
        where: {
          id,
        },
      })
      return {
        status: "success",
        code: 200,
        data: note,
        message: "Note deleted successfully",
      }
    } catch (error: any) {
      return {
        status: "error",
        code: 500,
        message: error.message,
      }
    }
  }
  public updateNoteById = async (id: number, data: Note): Promise<ApiResponse> => {
    const prisma = PrismaClientSingleton.getInstance()
    try {
      const note = await prisma.note.update({
        where: {
          id,
        },
        data,
      })
      return {
        status: "success",
        code: 200,
        data: note,
        message: "Note updated successfully",
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
