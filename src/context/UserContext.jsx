import React,{createContext,useState} from 'react'

const UserContext = createContext();

export const UserProvider = ({children}) => {
  const [user, setUser] = useState(null);


//   function to update user info
const updateUser = (userData) => {
  setUser(userData);
};
// function to clear user data on logout
const clearUser = () => {
  setUser(null);
};

  return (
    <UserContext.Provider value={{user, updateUser, clearUser}}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext;
