import React, { memo, useState } from "react"
import { useSelector } from "react-redux"
import styles from "./styles.module.scss"
import BoxItem from "./BoxItem"
import { fetchBoxListIfNeed, selectSortedUniqueDetailedBoxes } from "../../store/boxList"
import {
    fetchVolunteerKnowledgeSetIfNeed,
    useVolunteerKnowledge,
} from "../../store/volunteerKnowledgeSet"
import { DetailedBox } from "../../services/boxes"

const BoxList: React.FC = (): JSX.Element | null => {
    const detailedBoxes = useSelector(selectSortedUniqueDetailedBoxes)
    const [volunteerKnowledge, saveVolunteerKnowledge] = useVolunteerKnowledge()
    const [showUnknownOnly, setShowUnknownOnly] = useState(false)
    const [searchGame, setSearchGame] = useState("")

    const onShowUnknownOnly = (e: React.ChangeEvent<HTMLInputElement>) =>
        setShowUnknownOnly(e.target.checked)

    if (!detailedBoxes || detailedBoxes.length === 0) return null

    const isGameSearched = (box: any) => {
        const lowerTitle = box.title.toLowerCase()
        const lowerSearch = searchGame.toLowerCase()
        return lowerTitle.includes(lowerSearch)
    }

    const boxesToShow = detailedBoxes.filter(
        (box) =>
            !box ||
            (isGameSearched(box) &&
                (!showUnknownOnly ||
                    !volunteerKnowledge ||
                    (!volunteerKnowledge.ok.includes(box.gameId) &&
                        !volunteerKnowledge.bof.includes(box.gameId) &&
                        !volunteerKnowledge.niet.includes(box.gameId))))
    )

    return (
        <div>
            <div className={styles.filters}>
                <label className={styles.showUnknownOnlyLabel}>
                    <input
                        type="checkbox"
                        name="showUnknownOnly"
                        onChange={onShowUnknownOnly}
                        checked={showUnknownOnly}
                    />{" "}
                    Uniquement les non-renseignés
                </label>
                <label htmlFor="filterInput">
                    <span className={styles.searchLabel}>Rechercher un jeu...</span>
                    <input
                        placeholder="Rechercher un jeu..."
                        type="text"
                        id="filterInput"
                        name="filterInput"
                        value={searchGame}
                        onChange={(e) => setSearchGame(e.target.value)}
                    />
                </label>
            </div>
            <ul className={styles.boxList}>
                {boxesToShow.map((detailedBox: any) => (
                    <BoxItem
                        detailedBox={detailedBox}
                        volunteerKnowledge={volunteerKnowledge}
                        saveVolunteerKnowledge={saveVolunteerKnowledge}
                        key={detailedBox.id}
                    />
                ))}
            </ul>
        </div>
    )
}

export default memo(BoxList)

export const fetchFor = [fetchBoxListIfNeed, fetchVolunteerKnowledgeSetIfNeed]
