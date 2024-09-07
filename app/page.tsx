import Navbar from "../components/navbar";
import Notes from "../components/notes-app";
// import { ModeToggle } from "../components/dark-toggle";
export default function Home() {
  return (
    <div>
      <Navbar />
      {/* <ModeToggle /> */}
      <Notes />
    </div>
  );
}
