import { observer } from "mobx-react-lite";
import { Context } from "../../App.tsx";
import { CircularProgress, Box } from "@mui/material";
import React, { useContext} from "react";
const WrapperComponent = observer(({ children } : {
    children: React.ReactNode;
}) => {
  const store = useContext(Context);
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        flexDirection: "column",
      }}
    >
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
});

export default WrapperComponent;