import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

// Mock product data
const products = [
  { id: 1, name: "Product 1", price: "$19.99", image: "/placeholder.svg?height=200&width=200" },
  { id: 2, name: "Product 2", price: "$29.99", image: "/placeholder.svg?height=200&width=200" },
  { id: 3, name: "Product 3", price: "$39.99", image: "/placeholder.svg?height=200&width=200" },
  { id: 4, name: "Product 4", price: "$49.99", image: "/placeholder.svg?height=200&width=200" },
  { id: 5, name: "Product 5", price: "$59.99", image: "/placeholder.svg?height=200&width=200" },
]

export default function Component() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white shadow-md">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/">Home</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/about">Sobre</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/products">Produtos</Link>
            </Button>
          </div>
          <div className="flex space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/partners">Parceiros</Link>
            </Button>
          </div>
        </nav>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Nossos Produtos</h1>
        <Carousel className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
          <CarouselContent>
            {products.map((product) => (
              <CarouselItem key={product.id}>
                <Card>
                  <CardContent className="flex flex-col items-center p-6">
                    <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4" />
                    <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                    <p className="text-lg font-bold text-blue-600">{product.price}</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </main>

      <footer className="bg-gray-100 py-4 text-center">
        <p>&copy; 2024 Your Company Name. All rights reserved.</p>
      </footer>
    </div>
  )
}