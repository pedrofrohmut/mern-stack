import type { Store } from "vuex"

import type { RootState } from "./types"

declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
        $store: Store<RootState>
    }
}
