import { Request, Response, Router } from "express"
import { NoteController } from "../Controllers/NoteController"

export class NoteRouter {
  private static instance: NoteRouter
  private router: Router
  private noteController: NoteController
  private constructor(noteController: NoteController) {
    this.router = Router()
    this.noteController = noteController
    this.router.post("/new", this.postNewNote)
    this.router.get("/all/active", this.getActiveNotes)
    this.router.get("/all/archived", this.getArchivedNotes)
    this.router.delete("/delete/:id", this.deleteNote)
    this.router.put("/update/:id", this.updateNote)
  }
  static getRouter(): Router {
    if (!NoteRouter.instance) {
      const noteController = new NoteController()
      NoteRouter.instance = new NoteRouter(noteController)
    }
    return NoteRouter.instance.router
  }
  private postNewNote = async (req: Request, res: Response) => {
    try {
      const data = req.body
      const response = await this.noteController.createNewNote(data)
      if (response.status === "error") {
        return res.status(response.code).send({
          status: "error",
          message: response.message,
        })
      }
      return res.status(response.code).send({
        status: response.status,
        data: response.data,
        message: response.message,
      })
    } catch (error: any) {
      return res.status(500).send({
        status: "error",
        message: error.message,
      })
    }
  }
  private getActiveNotes = async (req: Request, res: Response) => {
    try {
      const response = await this.noteController.getActiveNotes()
      if (response.status === "error") {
        return res.status(response.code).send({
          status: "error",
          message: response.message,
        })
      }
      return res.status(response.code).send({
        status: response.status,
        data: response.data,
        message: response.message,
      })
    } catch (error: any) {
      return res.status(500).send({
        status: "error",
        message: error.message,
      })
    }
  }
  private getArchivedNotes = async (req: Request, res: Response) => {
    try {
      const response = await this.noteController.getArchivedNotes()
      if (response.status === "error") {
        return res.status(response.code).send({
          status: "error",
          message: response.message,
        })
      }
      return res.status(response.code).send({
        status: response.status,
        data: response.data,
        message: response.message,
      })
    } catch (error: any) {
      return res.status(500).send({
        status: "error",
        message: error.message,
      })
    }
  }
  private deleteNote = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id)
      const response = await this.noteController.deleteNoteById(id)
      if (response.status === "error") {
        return res.status(response.code).send({
          status: "error",
          message: response.message,
        })
      }
      return res.status(response.code).send({
        status: response.status,
        data: response.data,
        message: response.message,
      })
    } catch (error: any) {
      return res.status(500).send({
        status: "error",
        message: error.message,
      })
    }
  }
  private updateNote = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id)
      const data = req.body
      const response = await this.noteController.updateNoteById(id, data)
      if (response.status === "error") {
        return res.status(response.code).send({
          status: "error",
          message: response.message,
        })
      }
      return res.status(response.code).send({
        status: response.status,
        data: response.data,
        message: response.message,
      })
    } catch (error: any) {
      return res.status(500).send({
        status: "error",
        message: error.message,
      })
    }
  }
}
