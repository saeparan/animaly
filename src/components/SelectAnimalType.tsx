import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default function SelectAnimalType() {
  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">축종</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="축종"
          onChange={handleChange}
          sx={{ background: "#FFFFFF" }}
        >
          <MenuItem value={-1}>전체</MenuItem>
          <MenuItem value={0}>개</MenuItem>
          <MenuItem value={1}>고양이</MenuItem>
          <MenuItem value={2}>기타</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
