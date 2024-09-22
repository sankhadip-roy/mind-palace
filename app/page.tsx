import Navbar from "../components/navbar";
import Notes from "../components/notes-app";
// import { ModeToggle } from "../components/dark-toggle";
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {/* <ModeToggle /> */}
      <main className="flex-grow pt-16">
        <Notes />
      </main>
    </div>
  );
}
