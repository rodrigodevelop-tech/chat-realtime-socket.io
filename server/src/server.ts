import { serverHttp } from "./http";
import "./websocket";

const PORT = process.env.SERVER_PORT;

serverHttp.listen(PORT, () => {
  console.log(`Server running in PORT ${PORT}`);
});
