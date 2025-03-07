import {Stack} from "@mui/material";
import "TInput.css";

function TInput() {
    return (
      <Stack>
          <input type={'text'} name={'title'} placeholder={'Please enter title.'}/>
      </Stack>
    );
}

export default TInput;