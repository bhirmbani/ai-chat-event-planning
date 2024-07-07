import { atom, createStore } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export const countMessageAtom = atom(0)
export const wordCloudAtom = atomWithStorage<string>('wordCloud', '')
export const countMessageStore = createStore()
export const wordCloudStore = createStore()