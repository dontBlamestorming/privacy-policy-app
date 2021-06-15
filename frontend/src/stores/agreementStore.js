import { makeAutoObservable } from 'mobx'

class AgreementStore {
  formLists = null
  /*
    formLists = {
      id: int,
      studio: int, 
      receiver: int,
      name: str,
      email: str,
      phone: str,
      gender: str,
      birthday: str,
      created: str,
      sign: str,
      files: {
        id: int,
        file: str,
      },
      {...}
    }
  */

  formDetail = null

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  setFormLists(lists) {
    this.formLists = lists
  }

  setFormDetails(detail) {
    this.formDetail = detail
  }
}

const agreementStore = new AgreementStore()

export default agreementStore
