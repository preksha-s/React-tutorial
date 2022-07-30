import * as React from "react";
import { useState, useEffect } from "react";

const authContext = React.createContext();

 const Auth = () => {
    const [authed, setAuthed] = useState('');

    return {
      authed,
      login() {
        return new Promise((res) => {
          setAuthed(true);
          res();
        });
      },
      logout() {
        return new Promise((res) => {
          setAuthed(false);
          res();
        });
      },
    };
}


export function AuthProvider({ children }) {
    const auth = Auth();
  
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
  }
  
  export default function AuthConsumer() {
    return React.useContext(authContext);
  }