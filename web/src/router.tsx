import { Route, Routes } from "react-router-dom";
import { Chat } from "./pages/Chat";
import { ClassRoom } from "./pages/ClassRoom";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<ClassRoom />} />
      <Route path="/chat/:select_room/:username" element={<Chat />} />
    </Routes>
  );
}
