import { Request, Response, Router } from "express"
import { LabelToNoteController } from "../Controllers/LabelToNoteController"

export class LabelToNoteRouter {
  private static instance: LabelToNoteRouter
  private router: Router
  private labelToNoteController: LabelToNoteController
  private constructor(labelToNoteController: LabelToNoteController) {
    this.router = Router()
    this.labelToNoteController = labelToNoteController
    this.router.post("/new", this.postNewNoteWithLabel)
    this.router.get("/all", this.getAllNotesWithLabels)
    this.router.delete("/delete/", this.deleteNoteWithLabel)
  }
  static getRouter(): Router {
    if (!LabelToNoteRouter.instance) {
      const labelToNoteController = new LabelToNoteController()
      LabelToNoteRouter.instance = new LabelToNoteRouter(labelToNoteController)
    }
    return LabelToNoteRouter.instance.router
  }
  private deleteNoteWithLabel = async (req: Request, res: Response) => {
    try {
      const noteId = parseInt(req.query.noteId as string)
      const labelId = parseInt(req.query.labelId as string)
      console.log(noteId, labelId)
      const response = await this.labelToNoteController.deleteNoteWithLabel(noteId, labelId)
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
  private postNewNoteWithLabel = async (req: Request, res: Response) => {
    try {
      const data = req.body
      const response = await this.labelToNoteController.createNewNoteWithLabel(data)
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
  private getAllNotesWithLabels = async (req: Request, res: Response) => {
    try {
      const response = await this.labelToNoteController.getAllNotesWithLabels()
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
