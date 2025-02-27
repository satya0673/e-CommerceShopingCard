import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext();

// eslint-disable-next-line react/prop-types
const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    console.log('myuser 1 : ' + user);

    useEffect(() => {

        const storedUser = localStorage.getItem('ewgcsCrm');

        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);

                setUser({
                    userId: parsedUser?.user,
                    userRole: parsedUser?.userRole
                });
            } catch (error) {
                console.error("Error parsing JSON from localStorage:", error);
            }
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

export const useAuth = () => {
    const authContextValue = useContext(UserContext);

    if (!authContextValue) {
        throw new Error('useAuth used outside of the provider');
    }

    return authContextValue;
}

export default UserProvider;
