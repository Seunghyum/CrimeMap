import { observable, action } from "mobx"

export class MapStore {
  @observable isLoading: boolean = false
  @action changeIsLoading() {
    this.isLoading = !this.isLoading
  }
  root: object
  constructor(root: object) {
    this.root = root
  }
}
