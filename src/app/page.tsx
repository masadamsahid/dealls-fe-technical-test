import { redirect } from "next/navigation";

export default function Home() {
  
  redirect('/products');
  
  return (
    <main className="">
      You're being redirected. Please wait!
    </main>
  )
}
