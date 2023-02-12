import {createTypedHooks} from "easy-peasy";
import {GlobalStore} from "./export";

const typedHook = createTypedHooks<GlobalStore>()

export const useStoreState = typedHook.useStoreState;
