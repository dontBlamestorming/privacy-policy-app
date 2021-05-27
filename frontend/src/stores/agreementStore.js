import { makeAutoObservable } from 'mobx'

class AgreementStore {
  formLists = null
  /*
    formLists = {
      id: int,
      studio: int, <- studio_id가 아니고?
      receiver: int, <- nameing 고민하기
      name: str,
      email: str,
      phone: str,
      gender: str,
      birthday: str,
      created: str,
      sign: str,
      files: { <- 여기서 가져올 필요는 없을듯
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
