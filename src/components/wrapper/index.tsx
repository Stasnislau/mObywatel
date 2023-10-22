import { observer } from "mobx-react-lite";
import { Context } from "../../App.tsx";
import { CircularProgress, Box } from "@mui/material";
import React, { useContext } from "react";
import { ClearAll } from "@mui/icons-material";
const WrapperComponent = observer(
  ({ children }: { children: React.ReactNode }) => {
    const store = useContext(Context);
    return (
      <div className="w-full h-screen flex flex-col">
        <header className="h-[10vh] flex justify-between items-center px-5">
          <h3 className="w-fit">mEkspert</h3>
          <ClearAll />
        </header>
        {children}
        <div
          style={{
            position: "fixed",
            zIndex: 5000,
          }}
        >
          {store.state.isLoading && (
            <Box
              sx={{
                position: "fixed",
                zIndex: 5000,
                top: "90%",
                left: "90%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <CircularProgress />
            </Box>
          )}
        </div>
      </div>
    );
  }
);

export default WrapperComponent;
