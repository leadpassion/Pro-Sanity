import { nanoid } from 'nanoid'
import { getCraftFormInfo } from '../helpers'

export type CraftMarketoFormBlockFields = {
  form: [number] // -> form
}

export const handleFormBlock = (fields: CraftMarketoFormBlockFields) => {
  const { form: formEntryId } = fields

  const { marketoFormId } = getCraftFormInfo(formEntryId[0]) || {
    marketoFormId: undefined,
  }

  const newSanityBlock = {
    _key: nanoid(),
    _type: 'marketoForm',
    formId: marketoFormId,
  }

  return [newSanityBlock]
}
