"use client"

import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, Heart, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { formatPrice } from "@/lib/utils"
import { addToCart } from "@/lib/cart"
import { toast } from "sonner"
import { useState } from "react"

interface ProductCardProps {
  id: string
  name: string
  price: number
  category: string
  imageUrl: string
  isNew?: boolean
}

export function ProductCard({ id, name, price, category, imageUrl, isNew }: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false) // added loading state for cart button

  // Use a fallback for the image if it's missing or an invalid placeholder
  const images = imageUrl ? imageUrl.split('|') : []
  let firstImage = images[0]

  // Override first image specifically for the target products if the database hasn't updated yet
  if (name === "Modern Cotton Kurta") {
    firstImage = "/Modern Cotton Kurta 1.jpg"
  } else if (name === "Temple Jewellery Set") {
    firstImage = "/Temple Jewellery Set 1.avif"
  } else if (name === "Silver Filigree Earrings") {
    firstImage = "/Silver Filigree Earrings 1.webp"
  } else if (name === "Brass Puja Thali Set") {
    firstImage = "/Brass Puja Thali Set 1.webp"
  } else if (name === "Handmade Terracotta Planter") {
    firstImage = "/Handmade Terracotta Planter 1.jpg"
  } else if (name === "Hand-painted Madhubani Stole") {
    firstImage = "/Hand-painted Madhubani Stole 1.webp"
  } else if (name === "Aromatic Sandalwood Box") {
    firstImage = "/Aromatic Sandalwood Box 1.avif"
  } else if (name === "Linen Nehru Jacket") {
    firstImage = "/Linen Nehru Jacket 1.avif"
  } else if (name === "Ikat Print Tote Bag") {
    firstImage = "/Ikat Print Tote Bag.webp"
  } else if (name === "Kalamkari Cotton Shirt") {
    firstImage = "/Kalamkari Cotton Shirt 1.webp"
  } else if (name === "Jaipur Blue Pottery Vase") {
    firstImage = "/Jaipur Blue Pottery Vase 1.jpg"
  } else if (name === "Sanganeri Print Bedspread") {
    firstImage = "/Sanganeri Print Bedspread 1.webp"
  } else if (name === "Pochampally Ikat Saree") {
    firstImage = "/Pochampally Ikat Saree 1.webp"
  } else if (name === "Kutch Embroidered Cushion") {
    firstImage = "/Kutch Embroidered Cushion 1.webp"
  } else if (name === "Hand-carved Stone Lamp") {
    firstImage = "/Hand-carved Stone Lamp 1.webp"
  } else if (name === "Tussar Silk Kurti") {
    firstImage = "/Tussar Silk Kurti 1.webp"
  } else if (name === "Paper Mache Easter Eggs") {
    firstImage = "/Paper Mache Easter Eggs 1.webp"
  } else if (name === "Wooden Block Print Stamps") {
    firstImage = "/Wooden Block Print Stamps 1.jpg"
  } else if (name === "Handmade Incense Holder") {
    firstImage = "/Handmade Incense Holder 1.webp"
  } else if (name === "Embroidered Denim Jacket") {
    firstImage = "/Embroidered Denim Jacket 1.webp"
  } else if (name === "Silk Thread Bangles") {
    firstImage = "/Silk Thread Bangles 1.webp"
  } else if (name === "Bamboo Charcoal Soap") {
    firstImage = "/Bamboo Charcoal Soap 1.webp"
  } else if (name === "Handcrafted Wooden Chess Set") {
    firstImage = "/Handcrafted Wooden Chess Set 1.webp"
  } else if (name === "Kashmiri Saffron Gift Box") {
    firstImage = "/Kashmiri Saffron Gift Box 1.jpeg"
  } else if (name === "Ajrakh Block Print Dupatta") {
    firstImage = "/Ajrakh Block Print Dupatta 1.webp"
  } else if (name === "Jute Shopping Tote") {
    firstImage = "/Jute Shopping Tote 1.jpg"
  } else if (name === "Organic Darjeeling Tea Collection") {
    firstImage = "/Organic Darjeeling Tea Collection 1.webp"
  } else if (name === "Embroidered Velvet Cushion Covers") {
    firstImage = "/Embroidered Velvet Cushion Covers 1.webp"
  } else if (name === "Copper Hammered Water Jug Set") {
    firstImage = "/Copper Hammered Water Jug Set 1.jpg"
  } else if (name === "Silk Thread Necklace Set") {
    firstImage = "/Silk Thread Necklace Set 1.jpg"
  } else if (name === "Organic Cotton Bath Towel Set") {
    firstImage = "/Organic Cotton Bath Towel Set 1.webp"
  } else if (name === "Handwoven Seagrass Basket Set") {
    firstImage = "/Handwoven Seagrass Basket Set 1.webp"
  } else if (name === "Traditional Kolam Stencils") {
    firstImage = "/Traditional Kolam Stencils 1.webp"
  } else if (name === "Handmade Leather Journal") {
    firstImage = "/Handmade Leather Journal 1.avif"
  } else if (name === "Organic Turmeric Face Pack") {
    firstImage = "/Organic Turmeric Face Pack 1.webp"
  } else if (name === "Silk Brocade Cushion Covers") {
    firstImage = "/Silk Brocade Cushion Covers 1.jpg"
  } else if (name === "Organic Herbal Hair Oil") {
    firstImage = "/Organic Herbal Hair Oil 1.webp"
  } else if (name === "Pure Silver Anklets") {
    firstImage = "/Pure Silver Anklets 1.jpg"
  } else if (name === "Copper Serving Tray") {
    firstImage = "/Copper Serving Tray 1.jpg"
  } else if (name === "Brass Temple Bell") {
    firstImage = "/Brass Temple Bell 1.webp"
  } else if (name === "Handwoven Jute Floor Mat") {
    firstImage = "/Handwoven Jute Floor Mat 1.jpg"
  } else if (name === "Organic Green Tea Sampler") {
    firstImage = "/Organic Green Tea Sampler 1.jpg"
  } else if (name === "Classic Silk Saree") {
    firstImage = "/Classic Silk Saree 1.webp"
  } else if (name === "Premium Leather Juttis") {
    firstImage = "/Premium Leather Juttis 1.jpeg"
  } else if (name === "Embroidered Pashmina Shawl") {
    firstImage = "/Embroidered Pashmina Shawl 1.webp"
  } else if (name === "Indigo Block Print Dress") {
    firstImage = "/Indigo Block Print Dress 1.webp"
  } else if (name === "Woven Bamboo Basket") {
    firstImage = "/Woven Bamboo Basket 1.webp"
  } else if (name === "Chanderi Silk Tunic") {
    firstImage = "/Chanderi Silk Tunic 1.jpg"
  } else if (name === "Beaded Macrame Wall Hanging") {
    firstImage = "/Beaded Macrame Wall Hanging 1.webp"
  } else if (name === "Bronze Nataraja Statue") {
    firstImage = "/Bronze Nataraja Statue 1.webp"
  } else if (name === "Lacquerware Jewelry Box") {
    firstImage = "/Lacquerware Jewelry Box 1.jpg"
  } else if (name === "Hand-knotted Woolen Rug") {
    firstImage = "/Hand-knotted Woolen Rug 1.webp"
  } else if (name === "Handmade Khadi Cotton Shirt") {
    firstImage = "/Handmade Khadi Cotton Shirt 1.jpg"
  } else if (name === "Hand-painted Terracotta Vase") {
    firstImage = "/Hand-painted Terracotta Vase 1.webp"
  } else if (name === "Brass Antique Wall Hanging") {
    firstImage = "/Brass Antique Wall Hanging 1.webp"
  } else if (name === "Handmade Crochet Table") {
    firstImage = "/Handmade Crochet Table 1.webp"
  } else if (name === "Copper Water Bottle") {
    firstImage = "/Copper Water Bottle 1.jpg"
  } else if (name === "Dhurrie Cotton Rug") {
    firstImage = "/Dhurrie Cotton Rug 1.webp"
  } else if (name === "Kolhapuri Leather Sandals") {
    firstImage = "/Kolhapuri Leather Sandals 1.jpg"
  } else if (name === "Marble Carved Elephant") {
    firstImage = "/Marble Carved Elephant 1.webp"
  } else if (name === "Dokra Art Wall Clock") {
    firstImage = "/Dokra Art Wall Clock 1.webp"
  } else if (name === "Organic Herbal Tea Set") {
    firstImage = "/Organic Herbal Tea Set 1.webp"
  } else if (name === "Clay Tawa for Roti") {
    firstImage = "/Clay Tawa for Roti 1.jpg"
  } else if (name === "Hand-painted Kettle") {
    firstImage = "/Hand-painted Kettle 1.webp"
  } else if (name === "Premium Leather Laptop Bag") {
    firstImage = "/Premium Leather Laptop Bag 1.jpg"
  } else if (name === "Organic Cotton Yoga Mat") {
    firstImage = "/Organic Cotton Yoga Mat 1.webp"
  } else if (name === "Hand-painted Ceramic Dinner Set") {
    firstImage = "/Hand-painted Ceramic Dinner Set1.webp"
  } else if (name === "Brass Antique Table Lamp") {
    firstImage = "/Brass Antique Table Lamp1.webp"
  } else if (name === "Silver Meenakari Jewelry Box") {
    firstImage = "/Silver Meenakari Jewelry Box 1.webp"
  } else if (name === "Hand-knotted Persian Style Carpet") {
    firstImage = "/Hand-knotted Persian Style Carpet 1.webp"
  } else if (name === "Bidriware Flower Vase") {
    firstImage = "/Bidriware Flower Vase 1.webp"
  } else if (name === "Warli Art Painted Plate") {
    firstImage = "/Warli Art Painted Plate 1.webp"
  } else if (name === "Bamboo Fiber Towel Set") {
    firstImage = "/Bamboo Fiber Towel Set1.webp"
  } else if (name === "Ayurvedic Skin Care Kit") {
    firstImage = "/Ayurvedic Skin Care Kit1.webp"
  } else if (name === "Batik Print Silk Scarf") {
    firstImage = "/Batik Print Silk Scarf1.webp"
  } else if (name === "Bell Metal Utensil Set") {
    firstImage = "/Bell Metal Utensil Set1.jpg"
  } else if (name === "Bandhani Tie-Dye Saree") {
    firstImage = "/Bandhani Tie-Dye Saree.jpg"
  } else if (name === "Cane Outdoor Chair") {
    firstImage = "/Cane Outdoor Chair1.jpg"
  } else if (name === "Mulberry Silk Sleep Mask") {
    firstImage = "/Mulberry Silk Sleep Mask 1.webp"
  } else if (name === "Terracotta Tea Cups (Set of 6)") {
    firstImage = "/Terracotta Tea Cups (Set of 6) 1.webp"
  } else if (name === "Kanjeevaram Silk Border") {
    firstImage = "/Kanjeevaram Silk Border 1.webp"
  } else if (name === "Organic Coconut Oil Beauty Set") {
    firstImage = "/Organic Coconut Oil Beauty Set 1.avif"
  } else if (name === "Embroidered Table Cloth") {
    firstImage = "/Embroidered Table Cloth1.webp"
  } else if (name === "Hand-carved Wooden Mirror") {
    firstImage = "/Hand-carved Wooden Mirror 1.webp"
  } else if (name === "Handwoven Cotton Dhurrie Runner") {
    firstImage = "/Handwoven Cotton Dhurrie Runner1.webp"
  } else if (name === "Pure Wool Shawl") {
    firstImage = "/Pure Wool Shawl 1.jpg"
  } else if (name === "Handmade Paper Diary") {
    firstImage = "/Handmade Paper Diary 1.webp"
  } else if (name === "Hand-carved Sandalwood Incense Box") {
    firstImage = "/Hand-carved Sandalwood Incense Box 1.webp"
  } else if (name === "Premium Cashmere Scarf") {
    firstImage = "/Premium Cashmere Scarf.jpg"
  } else if (name === "Marble Inlay Work Coasters") {
    firstImage = "/Marble Inlay Work Coasters 1.webp"
  } else if (name === "Hand-painted Ceramic Tea") {
    firstImage = "/Hand-painted Ceramic Tea 1.jpg"
  } else if (name === "Hand-painted Clay Pots") {
    firstImage = "/Hand-painted Clay Pots1.webp"
  } else if (name === "Phulkari Embroidered Dupatta") {
    firstImage = "/Phulkari Embroidered Dupatta 1.jpg"
  } else if (name === "Hand-painted Wooden Toy Set") {
    firstImage = "/Hand-painted Wooden Toy Set 1.webp"
  } else if (name === "Handmade Soap Gift Box") {
    firstImage = "/Handmade Soap Gift Box.webp"
  } else if (name === "Traditional Mehndi Cone Set") {
    firstImage = "/Traditional Mehndi Cone Set 1.webp"
  } else if (name === "Organic Cotton Kids Dress") {
    firstImage = "/Organic Cotton Kids Dress 1.webp"
  } else if (name === "Silver Oxidized Earrings") {
    firstImage = "/Silver Oxidized Earrings 1.jpg"
  } else if (name === "Kashmiri Walnut Wood Tray") {
    firstImage = "/Kashmiri Walnut Wood Tray 1.webp"
  } else if (name === "Zardosi Work Clutch") {
    firstImage = "/Zardosi Work Clutch 1.webp"
  } else if (name === "Pure Ghee Diya Wicks") {
    firstImage = "/Pure Ghee Diya Wicks 1.webp"
  } else if (name === "Handwoven Banarasi Silk Saree") {
    firstImage = "/Handwoven Banarasi Silk Saree 1.webp"
  } else if (name === "Hand-carved Wooden Mirror Frame") {
    firstImage = "/Hand-carved Wooden Mirror Frame 1.webp"
  } else if (name === "Hand-painted Ceramic Tea Set") {
    firstImage = "/Hand-painted Ceramic Tea Set 1.webp"
  } else if (name === "Handwoven Bamboo Table Runner") {
    firstImage = "/Handwoven Bamboo Table Runner 1.webp"
  } else if (name === "Brass Puja Diya Set") {
    firstImage = "/Brass Puja Diya Set 1.webp"
  } else if (name === "Hand-embroidered Bedspread") {
    firstImage = "/Hand-embroidered Bedspread 1.webp"
  } else if (name === "Traditional Wooden Charkha") {
    firstImage = "/Traditional Wooden Charkha 1.webp"
  } else if (name === "Handmade Crochet Table Runner") {
    firstImage = "/Handmade Crochet Table Runner 1.webp"
  } else if (name === "Hand-loomed Cotton Tunic") {
    firstImage = "/Hand-loomed Cotton Tunic 1.jpg"
  } else if (name === "Silk Blend Kurta") {
    firstImage = "/Silk Blend Kurta 1.webp"
  } else if (name === "Floral Print Anarkali") {
    firstImage = "/Floral Print Anarkali 1.avif"
  } else if (name === "Embroidered Chanderi Dupatta") {
    firstImage = "/Embroidered Chanderi Dupatta 1.webp"
  } else if (name === "Block Printed Saree") {
    firstImage = "/Block Printed Saree 1.jpg"
  } else if (name === "Hand-painted Silk Scarf") {
    firstImage = "/Hand-painted Silk Scarf 1.jpg"
  } else if (name === "Designer Mens Sherwani") {
    firstImage = "/Designer Mens Sherwani 1.webp"
  } else if (name === "Bandhani Print Salwar Kameez") {
    firstImage = "/Bandhani Print Salwar Kameez 1.jpg"
  } else if (name === "Zardozi Work Lehenga") {
    firstImage = "/Zardozi Work Lehenga 1.webp"
  } else if (name === "Traditional Pashmina Shawl") {
    firstImage = "/Traditional Pashmina Shawl 1.webp"
  } else if (name === "Silver Jhumka Earrings") {
    firstImage = "/Silver Jhumka Earrings1.jpg"
  } else if (name === "Beaded Statement Necklace") {
    firstImage = "/Beaded Statement Necklace 1.webp"
  } else if (name === "Gold-plated Bangle Set") {
    firstImage = "/Gold-plated Bangle Set 1.jpg"
  } else if (name === "Pearl Drop Earrings") {
    firstImage = "/Pearl Drop Earrings 1.webp"
  } else if (name === "Kundan Work Maang Tikka") {
    firstImage = "/Kundan Work Maang Tikka 1.jpg"
  } else if (name === "Enamel Painted Ring") {
    firstImage = "/Enamel Painted Ring 1.avif"
  } else if (name === "Hand-carved Wooden Bangles") {
    firstImage = "/Hand-carved Wooden Bangles 1.jpg"
  } else if (name === "Terracotta Jewellery Set") {
    firstImage = "/Terracotta Jewellery Set 1.jpg"
  } else if (name === "Hand-painted Ceramic Plate") {
    firstImage = "/Hand-painted Ceramic Plate 1.jpg"
  } else if (name === "Macrame Wall Hanging") {
    firstImage = "/Macrame Wall Hanging 1.webp"
  } else if (name === "Embroidered Table Runner") {
    firstImage = "/Embroidered Table Runner 1.jpg"
  } else if (name === "Wooden Carved Candle Holder") {
    firstImage = "/Wooden Carved Candle Holder 1.webp"
  } else if (name === "Hand-woven Cotton Throw") {
    firstImage = "/Hand-woven Cotton Throw 1.webp"
  } else if (name === "Terracotta Figurines") {
    firstImage = "/Terracotta Figurines 1.webp"
  } else if (name === "Copper Flower Vase") {
    firstImage = "/Copper Flower Vase 1.avif"
  } else if (name === "Decorative Glass Lantern") {
    firstImage = "/Decorative Glass Lantern1.webp"
  } else if (name === "Bamboo Wind Chimes") {
    firstImage = "/Bamboo Wind Chimes 1.jpg"
  } else if (name === "Brass Incense Burner") {
    firstImage = "/Brass Incense Burner 1.webp"
  } else if (name === "Ceramic Bird House") {
    firstImage = "/Ceramic Bird House 1.webp"
  } else if (name === "Metal Garden Stake") {
    firstImage = "/Metal Garden Stake1.webp"
  } else if (name === "Hanging Planter Basket") {
    firstImage = "/Hanging Planter Basket 1.webp"
  } else if (name === "Solar Garden Lights") {
    firstImage = "/Solar Garden Lights 1.jpg"
  } else if (name === "Garden Tool Set") {
    firstImage = "/Garden Tool Set 1.jpg"
  } else if (name === "Stone Buddha Statue") {
    firstImage = "/Stone Buddha Statue 1.webp"
  } else if (name === "Bamboo Plant Trellis") {
    firstImage = "/Bamboo Plant Trellis1.webp"
  } else if (name === "Watering Can") {
    firstImage = "/Watering Can1.webp"
  } else if (name === "Garden Kneeler Pad") {
    firstImage = "/Garden Kneeler Pad 1.jpg"
  } else if (name === "Butterfly Garden Ornaments") {
    firstImage = "/Butterfly Garden Ornaments 1.webp"
  } else if (name === "Leather Card Holder") {
    firstImage = "/Leather Card Holder 1.avif"
  } else if (name === "Elegant silk pocket square for men") {
    firstImage = "/Elegant silk pocket square for men 1.avif"
  } else if (name === "Hand-painted Umbrella") {
    firstImage = "/Hand-painted Umbrella 1.jpg"
  } else if (name === "Embroidered Belt") {
    firstImage = "/Embroidered Belt 1.jpg"
  } else if (name === "Woolen Beanie Cap") {
    firstImage = "/Woolen Beanie Cap1.jpg"
  } else if (name === "Canvas Laptop Sleeve") {
    firstImage = "/Canvas Laptop Sleeve 1.webp"
  } else if (name === "Beaded Keychain") {
    firstImage = "/Beaded Keychain 1.webp"
  } else if (name === "Silk Eye Mask") {
    firstImage = "/Silk Eye Mask1.webp"
  } else if (name === "Fabric Hair Accessories Set") {
    firstImage = "/Fabric Hair Accessories Set1.jpg"
  } else if (name === "Artisanal Soap Box") {
    firstImage = "/Artisanal Soap Box.webp"
  } else if (name === "Scented Candle Set") {
    firstImage = "/Scented Candle Set 1.jpg"
  } else if (name === "Gourmet Tea Sampler") {
    firstImage = "/Gourmet Tea Sampler 1.jpg"
  } else if (name === "Personalized Leather Journal") {
    firstImage = "/Personalized Leather Journal 1.webp"
  } else if (name === "Hand-painted Mug Set") {
    firstImage = "/Hand-painted Mug Set 1.jpg"
  } else if (name === "Chocolate Truffle Box") {
    firstImage = "/Chocolate Truffle Box1.webp"
  } else if (name === "Hand-woven Basket Hamper") {
    firstImage = "/Hand-woven Basket Hamper1.avif"
  } else if (name === "Aromatic Oil Diffuser") {
    firstImage = "/Aromatic Oil Diffuser 1.webp"
  } else if (name === "Succulent Plant Gift") {
    firstImage = "/Succulent Plant Gift1.webp"
  } else if (name === "Designer Stationery Kit") {
    firstImage = "/Designer Stationery Kit 1.jpg"
  } else if (name === "Linen Casual Shirt") {
    firstImage = "/Linen Casual Shirt 1.avif"
  } else if (name === "Cotton Chino Trousers") {
    firstImage = "/Cotton Chino Trousers1.webp"
  } else if (name === "Polo T-shirt") {
    firstImage = "/Polo T-shirt1.webp"
  } else if (name === "Denim Jacket") {
    firstImage = "/Denim Jacket1.webp"
  } else if (name === "Leather Boots") {
    firstImage = "/Leather Boots1.webp"
  } else if (name === "Casual Canvas Shoes") {
    firstImage = "/Casual Canvas Shoes1.jpg"
  } else if (name === "Graphic Print Tee") {
    firstImage = "/Graphic Print Tee1.jpg"
  } else if (name === "Slim Fit Suit") {
    firstImage = "/Slim Fit Suit 1.jpg"
  } else if (name === "Knitted Sweater") {
    firstImage = "/Knitted Sweater1.jpg"
  } else if (name === "Mens Leather Belt") {
    firstImage = "/Mens Leather Belt1.webp"
  } else if (name === "Leather Tote Bag") {
    firstImage = "/Leather Tote Bag1.webp"
  } else if (name === "Canvas Backpack") {
    firstImage = "/Canvas Backpack 1.webp"
  } else if (name === "Crossbody Sling Bag") {
    firstImage = "/Crossbody Sling Bag 1.webp"
  } else if (name === "Designer Clutch") {
    firstImage = "/Designer Clutch 1.webp"
  } else if (name === "Laptop Messenger Bag") {
    firstImage = "/Laptop Messenger Bag1.webp"
  } else if (name === "Travel Duffel Bag") {
    firstImage = "/Travel Duffel Bag1.webp"
  } else if (name === "Embroidered Potli Bag") {
    firstImage = "/Embroidered Potli Bag 1.jpg"
  } else if (name === "Mens Leather Wallet") {
    firstImage = "/Mens Leather Wallet 1.webp"
  } else if (name === "Small Coin Purse") {
    firstImage = "/Small Coin Purse 1.jpg"
  } else if (name === "Eco-friendly Jute Bag") {
    firstImage = "/Eco-friendly Jute Bag 1.webp"
  }

  const safeImageUrl =
    firstImage && (firstImage.startsWith("/") || firstImage.startsWith("http"))
      ? firstImage
      : `/placeholder.svg?height=600&width=600&query=${encodeURIComponent(name)}`

  const handleAddToCart = () => {
    setIsAdding(true)
    addToCart({
      id,
      name,
      price,
      imageUrl: firstImage || safeImageUrl,
      category,
    })

    setTimeout(() => {
      setIsAdding(false)
      toast.success(`${name} added to cart!`, {
        description: "View your cart to checkout.",
        action: {
          label: "View Cart",
          onClick: () => (window.location.href = "/cart"),
        },
      })
    }, 400)
  }

  return (
    <Card className="group relative flex flex-col overflow-hidden border-none bg-white dark:bg-neutral-900 shadow-sm transition-all hover:shadow-md hover:translate-y-[-4px] p-0 gap-0">
      <CardContent className="p-0">
        <Link 
          href={`/product/${id}`} 
          className="relative block aspect-square w-full overflow-hidden"
        >
          <Image
            src={safeImageUrl || "/placeholder.svg"}
            alt={name}
            fill
            className="object-contain transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {isNew && (
            <Badge className="absolute left-3 top-3 bg-white/90 text-black hover:bg-white border-none shadow-sm">
              New
            </Badge>
          )}

          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-black/60 px-2 py-1 text-[10px] font-medium text-white backdrop-blur-sm opacity-0 transition-opacity group-hover:opacity-100">
            <Eye className="h-3 w-3" />
            <span>Quick View</span>
          </div>

          <Button
            variant="secondary"
            size="icon"
            className="absolute right-3 top-3 h-8 w-8 rounded-full opacity-0 shadow-sm transition-opacity group-hover:opacity-100 bg-white/90 hover:bg-white text-black border-none"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-1 p-4 pb-4">
        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{category}</div>
        <div className="flex w-full items-start justify-between gap-2">
          <Link
            href={`/product/${id}`}
            className="font-bold text-base hover:text-primary transition-colors line-clamp-1"
          >
            {name}
          </Link>
          <span className="font-bold text-base whitespace-nowrap">{formatPrice(price)}</span>
        </div>
        <Button
          onClick={handleAddToCart}
          disabled={isAdding}
          className="mt-4 w-full gap-2 rounded-xl h-11 text-sm font-bold transition-all active:scale-95 shadow-sm"
        >
          {isAdding ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Adding...
            </span>
          ) : (
            <>
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
