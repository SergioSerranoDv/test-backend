import { Request, Response, Router } from "express"
import { LabelController } from "../Controllers/LabelController"

export class LabelRouter {
  private static instance: LabelRouter
  private router: Router
  private LabelController: LabelController
  private constructor(LabelController: LabelController) {
    this.router = Router()
    this.LabelController = LabelController
    this.router.post("/new", this.postNewLabel)
    this.router.get("/all", this.getAllLabels)
    this.router.get("/notes/:name", this.getNotesWithLabels)
    this.router.put("/update", this.updateLabel)
    this.router.delete("/delete/:id", this.deleteLabelById)
  }
  static getRouter(): Router {
    if (!LabelRouter.instance) {
      const labelController = new LabelController()
      LabelRouter.instance = new LabelRouter(labelController)
    }
    return LabelRouter.instance.router
  }
  private deleteLabelById = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id)
      const response = await this.LabelController.deleteLabelById(id)
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
  private postNewLabel = async (req: Request, res: Response) => {
    try {
      const data = req.body
      const response = await this.LabelController.createNewLabel(data)
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
  private getAllLabels = async (req: Request, res: Response) => {
    try {
      const response = await this.LabelController.getAllLabels()
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
  private getNotesWithLabels = async (req: Request, res: Response) => {
    try {
      const name = req.params.name
      const response = await this.LabelController.getNoteByLabel(name)
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
  private updateLabel = async (req: Request, res: Response) => {
    try {
      const data = req.body
      const response = await this.LabelController.updateLabel(data)
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
