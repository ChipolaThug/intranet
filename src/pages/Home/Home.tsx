import { FC, memo } from "react"
import { RouteComponentProps, Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { Helmet } from "react-helmet"

import { AppThunk } from "../../store"
import { fetchForNotifications, LoginForm, Notifications } from "../../components"
import styles from "./styles.module.scss"
import { fetchVolunteerNotifsSetIfNeed } from "../../store/volunteerNotifsSet"
import { selectUserJwtToken } from "../../store/auth"

export type Props = RouteComponentProps

const HomePage: FC<Props> = (): JSX.Element => {
    const jwtToken = useSelector(selectUserJwtToken)

    if (jwtToken === undefined) return <p>Loading...</p>

    if (jwtToken) {
        return <Notifications />
    }
    return (
        <div>
            <div className={styles.homePage}>
                <div className={styles.loginContent}>
                    <Helmet title="LoginPage" />
                    <LoginForm />
                </div>
            </div>
            <div className={styles.homePage}>
                <div className={styles.navigationLink}>
                    <Link to="/sinscrire"> S&apos;informer sur le bénévolat </Link>
                </div>
            </div>
        </div>
    )
}

// Fetch server-side data here
export const loadData = (): AppThunk[] => [
    fetchVolunteerNotifsSetIfNeed(),
    ...fetchForNotifications.map((f) => f()),
]

export default memo(HomePage)
