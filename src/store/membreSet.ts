import { PayloadAction, createSlice, createEntityAdapter } from "@reduxjs/toolkit"

import { StateRequest, toastError, toastSuccess, elementSet } from "./utils"
import { Membre, membreSet } from "../services/membres"

const membreAdapter = createEntityAdapter<Membre>()

const membreSetSlice = createSlice({
    name: "membreSet",
    initialState: membreAdapter.getInitialState({
        readyStatus: "idle",
    } as StateRequest),
    reducers: {
        getRequesting: (state) => {
            state.readyStatus = "request"
        },
        getSuccess: (state, { payload }: PayloadAction<Membre>) => {
            state.readyStatus = "success"
            membreAdapter.setOne(state, payload)
        },
        getFailure: (state, { payload }: PayloadAction<string>) => {
            state.readyStatus = "failure"
            state.error = payload
        },
    },
})

export default membreSetSlice.reducer
export const { getRequesting, getSuccess, getFailure } = membreSetSlice.actions

export const fetchMembreSet = elementSet(
    membreSet,
    getRequesting,
    getSuccess,
    getFailure,
    (error: Error) => toastError(`Erreur lors de la modification d'un membre: ${error.message}`),
    () => toastSuccess("Membre modifié !")
)