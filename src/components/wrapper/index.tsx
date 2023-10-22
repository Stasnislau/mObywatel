import { ClearAll } from "@mui/icons-material";
import { observer } from "mobx-react-lite";
import React from "react";
import useStateLS from "../../hooks/useStateLS";
import { chat } from "../../types";
const WrapperComponent = observer(
  ({ children }: { children: React.ReactNode }) => {
    const [chat, setChat] = useStateLS<chat>("chat", { messages: [] });
    return (
      <div className="w-full h-screen flex flex-col">
        <header className="h-[10vh] flex justify-between items-center px-5">
          <img src="/logo.png" alt="logo" className="w-10 h-10 rounded-lg" />
          <h3 className="w-fit">mEkspert</h3>
          <ClearAll onClick={() => setChat({ messages: [] })} />
        </header>
        {children}
      </div>
    );
  }
);

export default WrapperComponent;
