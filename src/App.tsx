import { useEffect, useState } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import LoginContext from "./StateManagement/LoginContext";
import { user } from "./Services/http-service_user";
import useUrl from "./hooks/useUrl";
import { useColorMode } from "@chakra-ui/color-mode";

function App() {
  const [status, setStatus] = useState<boolean | null>(null);
  const [id, setId] = useState<number | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [user, setUser] = useState<user>({} as user);

  const { setColorMode } = useColorMode();
  useEffect(() => {
    setColorMode("dark");
  });
  return (
    <>
      <LoginContext.Provider
        value={{
          status,

          message,
          user,

          setMessage,
          setStatus,
          setUser,
        }}
      >
        <Outlet></Outlet>
      </LoginContext.Provider>
    </>
  );
}

export default App;
