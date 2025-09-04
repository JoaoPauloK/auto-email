import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import api from "@/api/api";
import axios from "axios";
import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { Badge } from "@/components/ui/badge";

interface AuthContextType {
    token: string;
    setToken: (token: string) => void;
    isAuthenticated?: boolean;
    logout: () => React.ReactNode;
    login: (username: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken_] = useState(localStorage.getItem("token") || "");

    function setToken(newToken: string) {
        setToken_(newToken);
    }

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            localStorage.setItem("token", token);
        } else {
            delete axios.defaults.headers.common["Authorization"];
            localStorage.removeItem("token");
        }
    }, [token]);

    const contextValue = useMemo(
        () => ({
            token,
            setToken,
            isAuthenticated: !!token,
            logout: () => {
                return (
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Badge
                                variant="outline"
                                className="gap-1.5 px-3 py-0.5 text-neutral-200 hover:bg-neutral-600"
                            >
                                <Button className="size-1.5 text-xs cursor-pointer">
                                    Logout
                                </Button>
                            </Badge>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="text-neutral-200">
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Are you sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    All unsaved progress will be lost.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => setToken('')}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                );
            },
            login: async (username: string, password: string) => {
                const data = new URLSearchParams();
                data.append("username", username);
                data.append("password", password);
                console.log("Logging in with:", { username, password });
                const response = await api.post("/login", data, {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                });
                setToken(response.data.access_token);
            },
        }),
        [token]
    );

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    return useContext(AuthContext);
}
