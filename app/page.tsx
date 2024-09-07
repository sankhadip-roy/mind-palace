import Navbar from '../components/navbar'
export default function Home() {
console.log(process.env.GOOGLE_CLIENT_ID)
console.log(process.env.GOOGLE_CLIENT_SECRET)
  return (
    <div >
      notes
      <Navbar/>
    </div>
  );
}
