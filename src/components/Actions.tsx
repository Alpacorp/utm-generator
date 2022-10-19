import { Check, Save } from "@mui/icons-material";
import { Box, CircularProgress, Fab } from "@mui/material";
import { green } from "@mui/material/colors";
import { useState } from "react";
import { useBusinessLine } from "../hooks/useBusinessLine";

const Actions = ({ params, rowId, setRowId }: any) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { updateBusinessLineStore, businessLineStore } = useBusinessLine();

  const handleSubmit = async () => {
    setLoading(true);
    setTimeout(async () => {
      const { name, shortname, idchanneltype } = params.row;
      await updateBusinessLineStore(params.id, {
        name,
        shortname,
        idchanneltype,
      });
      businessLineStore();
      setRowId(null);
      setLoading(false);
    }, 1500);
    setSuccess(true);
  };

  return (
    <Box
      sx={{
        m: 1,
        position: "relative",
      }}
    >
      {success ? (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
            bgcolor: green[500],
            "&:hover": {
              bgcolor: green[700],
            },
          }}
        >
          <Check />
        </Fab>
      ) : (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
            bgcolor: green[500],
          }}
          disabled={params.id !== rowId || loading}
          onClick={() => {
            handleSubmit();
          }}
        >
          <Save />
        </Fab>
      )}
      {loading && (
        <CircularProgress
          size={52}
          sx={{
            color: green[500],
            position: "absolute",
            top: -6,
            left: -6,
            zIndex: 1,
          }}
        />
      )}
    </Box>
  );
};

export default Actions;
