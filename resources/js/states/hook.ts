import { createTypedHooks } from 'easy-peasy'
import { type GlobalStore } from './export'

const typedHook = createTypedHooks<GlobalStore>()

export const useStoreState = typedHook.useStoreState
