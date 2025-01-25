import { Autocomplete, Button, TextField } from "@mui/material";
import Modal from "../../../components/Modal";
import { useState } from "react";
import { useAppContext } from "../../../context/AppContext";
import { generateUniqueId } from "../../../utils";
import "./index.scss";

interface ICreateMemberModalProps {
  open: boolean;
  handleClose: () => void;
}

const CreateMemberModal = ({ open, handleClose }: ICreateMemberModalProps) => {
  const [name, setName] = useState("");
  const [teamId, setTeamId] = useState("");

  const { teams, handleAddMember } = useAppContext();

  const isValid = name.trim() !== "" && teamId !== "";

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleChangeTeamId = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _: any,
    newValue: { id: string; label: string } | null
  ) => {
    setTeamId(newValue?.id || "");
  };

  const handleCreateMember = () => {
    handleAddMember({ name, id: generateUniqueId() }, teamId);

    setName("");
    setTeamId("");
    handleClose();
  };

  const teamsOptions = teams.map((team) => ({
    label: team.name,
    id: team.id,
  }));

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="create-member-modal">
        <div className="create-member-modal__item">
          <Autocomplete
            value={teamsOptions.find((team) => team.id === teamId) || null}
            onChange={handleChangeTeamId}
            disablePortal
            size="small"
            options={teamsOptions}
            renderInput={(params) => (
              <TextField {...params} label="Select a team" />
            )}
          />
        </div>
        <div className="create-member-modal__item">
          <TextField
            size="small"
            label="Name"
            variant="outlined"
            value={name}
            onChange={handleChangeName}
          />
        </div>
        <div className="create-member-modal__item">
          <Button
            disabled={!isValid}
            variant="contained"
            onClick={handleCreateMember}
          >
            Create
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CreateMemberModal;
