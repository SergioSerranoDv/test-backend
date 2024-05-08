import { Request, Response, Router } from "express"
import { LabelRouter } from "./LabelRouter"
import { NoteRouter } from "./NoteRouter"
import { LabelToNoteRouter } from "./LabelToNoteRouter"
export class RootRouter {
  private static instance: RootRouter
  private router: Router
  private constructor() {
    this.router = Router()
    this.router.get("/", (req: Request, res: Response) => {
      res.send("Hello World")
    })
    this.router.use("/v1/notes", NoteRouter.getRouter())
    this.router.use("/v1/labels", LabelRouter.getRouter())
    this.router.use("/v1/labeltonote", LabelToNoteRouter.getRouter())
  }
  static getRouter(): Router {
    if (!RootRouter.instance) {
      RootRouter.instance = new RootRouter()
    }
    return RootRouter.instance.router
  }
}
