import { Request, Response, NextFunction } from "express"
import { getList, get, add } from "./utils"
import { Membre, MembreWithoutId } from "../services/membres"

export const getMembreList = async (
    _request: Request,
    response: Response,
    _next: NextFunction
): Promise<void> => {
    try {
        const list = await getList<Membre>("Membres", new Membre())
        if (list) {
            response.status(200).json(list)
        }
    } catch (e: unknown) {
        response.status(400).json(e)
    }
}

export const getMembre = async (
    request: Request,
    response: Response,
    _next: NextFunction
): Promise<void> => {
    try {
        const id = parseInt(request.query.id as string, 10) || -1
        const membre = await get<Membre>("Membres", id, new Membre())
        response.status(200).json(membre)
    } catch (e: unknown) {
        response.status(400).json(e)
    }
}

export const addMembre = async (
    request: Request,
    response: Response,
    _next: NextFunction
): Promise<void> => {
    try {
        const membre = await add<MembreWithoutId, Membre>("Membres", "membreId", request.body)
        if (membre) {
            response.status(200).json(membre)
        }
    } catch (e: unknown) {
        response.status(400).json(e)
    }
}