import { createContext } from "react"
import { MapStore } from "./Map"

class RootStore {
  mapContext: any
  mapStore: any
  constructor() {
    this.mapContext = createContext<MapStore | null>(null)
    this.mapStore = MapStore
  }
}

export default RootStore
