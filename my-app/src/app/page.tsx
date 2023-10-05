import Link from "next/link"
import ProductCard from "./components/ProductCard"

//Home Page
export default function Home() {
  return (
    <div>
      <p>Hello World</p>
      <Link href="/users">USERS</Link>
      <br />
      <ProductCard></ProductCard>
    </div>
  )
}
