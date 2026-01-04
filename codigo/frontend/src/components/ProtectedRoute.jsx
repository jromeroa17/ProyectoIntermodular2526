import { useState, useLayoutEffect } from "react"
import { Navigate } from "react-router-dom"
import {jwtDecode} from "jwt-decode"
import api from "../api"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"

function ProtectedRoute({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(null) // null = loading

    // refresco del token si está expirado
    const refreshToken = async () => {
        const refresh = localStorage.getItem(REFRESH_TOKEN)
        if (!refresh) {
            setIsAuthorized(false)
            return
        }
        try {
            const res = await api.post("/api/token/refresh/", { refresh })
            if (res.status === 200 && res.data.access) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setIsAuthorized(true)
            } else {
                setIsAuthorized(false)
            }
        } catch (error) {
            console.error("Refresh token failed:", error)
            setIsAuthorized(false)
        }
    }

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (!token) {
            setIsAuthorized(false)
            return
        }

        let decoded
        try {
            decoded = jwtDecode(token)
        } catch (err) {
            // token corrupto
            setIsAuthorized(false)
            return
        }

        const now = Date.now() / 1000
        if (decoded.exp < now) {
            await refreshToken()
        } else {
            setIsAuthorized(true)
        }
    }

    // se ejecuta antes del primer render para evitar parpadeo
    useLayoutEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    }, [])

    // mientras valida, muestra loading
    if (isAuthorized === null) {
        return <div>Loading...</div>
    }

    // si autorizado, renderiza children; si no, redirige a login
    return isAuthorized ? children : <Navigate to="/login" replace />
}

export default ProtectedRoute
