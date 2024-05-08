import dotenv from "dotenv"
import { App } from "./App"
dotenv.config()

export class Server {
  private static instance: Server
  private constructor() {
    this.startServer()
  }

  static getInstance(): Server {
    if (!Server.instance) {
      Server.instance = new Server()
    }
    return Server.instance
  }
  private startServer() {
    App.getInstance().listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`)
    })
  }
}
