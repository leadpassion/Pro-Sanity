import enCraftForms from '@/scripts/data/craftExports/craftMarketoForms.json'
import jpCraftForms from '@/scripts/data/craftExports/localization/craftMarketoFormsJP.json'
import krCraftForms from '@/scripts/data/craftExports/localization/craftMarketoFormsKR.json'
import { craftIdToSanityId } from '../../craftIdToSanityId'
import { htmlToText } from 'html-to-text'
import { nanoid } from 'nanoid'

type CraftFormInfo = {
  canonicalId: number
  embeddedForm: {
    marketoForm: {
      _type: string
      _ref: string
    }
    submitBehavior?: string
    defaultThankYouHeadline?: string
    defaultThankYouMessage?: string
    redirectUrl?: {
      actionType: 'link' | 'internalLink' | 'downloadLink'
      href?: string
      reference?: Record<string, any>
    }
    eyebrow?: Record<string, any>
    heading?: Record<string, any>
    subheading?: string
    submitButtonText?: string
  }
  newSanityFormDoc?: Record<string, unknown>
}

export const getCraftFormInfo = (
  craftCanonicalId: number,
): CraftFormInfo | undefined => {
  const forms = [...enCraftForms, ...jpCraftForms, ...krCraftForms] as
    { canonicalId: number; marketoFormId: string; title: string; marketoThankYou: string }[]

  const form = forms.find((form) => form.canonicalId === craftCanonicalId)

  if (!form) return undefined

  // These are the form ids that were already set up in Sanity prior to imports
  const mapFormIdToSanityId: Record<string | number, string> = {
    2706: 'aaede530-f3ce-4ba3-b661-d703dd18ac04',
    2870: 'f7f81e9f-e521-4e3c-b880-c9379ad45162',
    3022: 'dc1a781f-9147-49ba-aa00-a3a483c871bc',
    2257: 'd2fa5551-e923-4072-b547-4c1b4e227e5b',
    3171: '47661eb5-50f4-4ebb-a772-5e83cb5edb0a',
    2608: 'fc0b805c-276b-49ad-a2cb-be806ad6f842',
  }

  const sanityId = mapFormIdToSanityId[form.marketoFormId] ||
        craftIdToSanityId(form.canonicalId)

  const newSanityFormDoc = {
    _type: 'marketoForm',
    _id: sanityId,
    internalName: form.title,
    formId: form.marketoFormId,
    defaultThankYouHeadline: 'Thank you!',
    defaultThankYouMessage: [
      {
        _type: 'block',
        _key: '24655d02ef46',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: '6b3799ba6a82',
            text: form.marketoThankYou ? htmlToText(form.marketoThankYou) : 'Thank you!',
            marks: [],
          },
        ],
      },
    ],
  }

  const embeddedForm = {
    marketoForm: {
      _type: 'reference',
      _ref: sanityId,
    },
  }

  return {
    canonicalId: form.canonicalId,
    embeddedForm,
    newSanityFormDoc,
  }
}
