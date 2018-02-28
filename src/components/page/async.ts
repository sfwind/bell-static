import { pget, ppost } from '../../utils/request'

export function storeFormId(formId) {
  return ppost(`/wx/mini/formId/generate?formId=${formId}`)
}

export function getFormIdsCount() {
  return pget(`/wx/mini/formId/sum`)
}