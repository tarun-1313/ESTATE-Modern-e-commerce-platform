"use client"

import { useState } from "react"
import { ShoppingCart, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { addToCart } from "@/lib/cart"
import { toast } from "sonner"
import Image from "next/image"

interface ProductClientProps {
  product: {
    id: string
    name: string
    price: number
    image_url: string
    category: string
  }
}

export function ProductClient({ product }: ProductClientProps) {
  const [isAdding, setIsAdding] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)

  const images = product.image_url ? product.image_url.split('|') : []
  const productImages = images.length > 0 
    ? images.map(img => (img.startsWith("/") || img.startsWith("http")) ? img : `/placeholder.svg?height=800&width=800&query=${encodeURIComponent(product.name)}`)
    : [
        `https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=800`,
        `https://images.unsplash.com/photo-1624371414361-e6e8eaeba82a?q=80&w=800`,
        `https://images.unsplash.com/photo-1596450514735-248b2141b808?q=80&w=800`,
        `https://images.unsplash.com/photo-1627484394148-a554a974024b?q=80&w=800`,
      ]

  // Override fallback images specifically for the target products if the database hasn't updated yet
  if (product.name === "Modern Cotton Kurta") {
    productImages[0] = "/Modern Cotton Kurta 1.jpg"
    productImages[1] = "/Modern Cotton Kurta 2.jpg"
    productImages[2] = "/Modern Cotton Kurta 3.jpg"
    productImages[3] = "/Modern Cotton Kurta 4.jpg"
  } else if (product.name === "Temple Jewellery Set") {
    productImages[0] = "/Temple Jewellery Set 1.avif"
    productImages[1] = "/Temple Jewellery Set 2.webp"
    productImages[2] = "/Temple Jewellery Set 3.jpg"
    productImages[3] = "/Temple Jewellery Set 4.avif"
  } else if (product.name === "Silver Filigree Earrings") {
    productImages[0] = "/Silver Filigree Earrings 1.webp"
    productImages[1] = "/Silver Filigree Earrings 2.jpg"
    productImages[2] = "/Silver Filigree Earrings 3.jpg"
    productImages[3] = "/Silver Filigree Earrings 4.webp"
  } else if (product.name === "Brass Puja Thali Set") {
    productImages[0] = "/Brass Puja Thali Set 1.webp"
    productImages[1] = "/Brass Puja Thali Set 2.webp"
    productImages[2] = "/Brass Puja Thali Set 3.jpg"
    productImages[3] = "/Brass Puja Thali Set.webp"
  } else if (product.name === "Handmade Terracotta Planter") {
    productImages[0] = "/Handmade Terracotta Planter 1.jpg"
    productImages[1] = "/Handmade Terracotta Planter 2.webp"
    productImages[2] = "/Handmade Terracotta Planter 3.webp"
    productImages[3] = "/Handmade Terracotta Planter 4.jpg"
  } else if (product.name === "Hand-painted Madhubani Stole") {
    productImages[0] = "/Hand-painted Madhubani Stole 1.webp"
    productImages[1] = "/Hand-painted Madhubani Stole 2.jpg"
    productImages[2] = "/Hand-painted Madhubani Stole 3.jpg"
    productImages[3] = "/Hand-painted Madhubani Stole 4.jpg"
  } else if (product.name === "Aromatic Sandalwood Box") {
    productImages[0] = "/Aromatic Sandalwood Box 1.avif"
    productImages[1] = "/Aromatic Sandalwood Box 2.webp"
    productImages[2] = "/Aromatic Sandalwood Box 3.webp"
    productImages[3] = "/Aromatic Sandalwood Box 4.webp"
  } else if (product.name === "Linen Nehru Jacket") {
    productImages[0] = "/Linen Nehru Jacket 1.avif"
    productImages[1] = "/Linen Nehru Jacket 2.webp"
    productImages[2] = "/Linen Nehru Jacket 3.jpg"
    productImages[3] = "/Linen Nehru Jacket 4.jpg"
  } else if (product.name === "Ikat Print Tote Bag") {
    productImages[0] = "/Ikat Print Tote Bag.webp"
    productImages[1] = "/Ikat Print Tote Bag 2.webp"
    productImages[2] = "/Ikat Print Tote Bag 3.webp"
    productImages[3] = "/Ikat Print Tote Bag 4.jpg"
  } else if (product.name === "Kalamkari Cotton Shirt") {
    productImages[0] = "/Kalamkari Cotton Shirt 1.webp"
    productImages[1] = "/Kalamkari Cotton Shirt 2.webp"
    productImages[2] = "/Kalamkari Cotton Shirt 3.webp"
    productImages[3] = "/Kalamkari Cotton Shirt 4.webp"
  } else if (product.name === "Jaipur Blue Pottery Vase") {
    productImages[0] = "/Jaipur Blue Pottery Vase 1.jpg"
    productImages[1] = "/Jaipur Blue Pottery Vase 2.jpeg"
    productImages[2] = "/Jaipur Blue Pottery Vase 3.webp"
    productImages[3] = "/Jaipur Blue Pottery Vase 4.webp"
  } else if (product.name === "Sanganeri Print Bedspread") {
    productImages[0] = "/Sanganeri Print Bedspread 1.webp"
    productImages[1] = "/Sanganeri Print Bedspread 2.webp"
    productImages[2] = "/Sanganeri Print Bedspread 3.webp"
    productImages[3] = "/Sanganeri Print Bedspread 4.jpg"
  } else if (product.name === "Pochampally Ikat Saree") {
    productImages[0] = "/Pochampally Ikat Saree 1.webp"
    productImages[1] = "/Pochampally Ikat Saree 2.webp"
    productImages[2] = "/Pochampally Ikat Saree 3.webp"
    productImages[3] = "/Pochampally Ikat Saree 4.webp"
  } else if (product.name === "Kutch Embroidered Cushion") {
    productImages[0] = "/Kutch Embroidered Cushion 1.webp"
    productImages[1] = "/Kutch Embroidered Cushion 2.jpeg"
    productImages[2] = "/Kutch Embroidered Cushion 3.webp"
    productImages[3] = "/Kutch Embroidered Cushion 4.webp"
  } else if (product.name === "Hand-carved Stone Lamp") {
    productImages[0] = "/Hand-carved Stone Lamp 1.webp"
    productImages[1] = "/Hand-carved Stone Lamp 2.jpg"
    productImages[2] = "/Hand-carved Stone Lamp 3.jpg"
    productImages[3] = "/Hand-carved Stone Lamp 4.jpg"
  } else if (product.name === "Tussar Silk Kurti") {
    productImages[0] = "/Tussar Silk Kurti 1.webp"
    productImages[1] = "/Tussar Silk Kurti 2.avif"
    productImages[2] = "/Tussar Silk Kurti 3.jpg"
    productImages[3] = "/Tussar Silk Kurti 4.jpg"
  } else if (product.name === "Paper Mache Easter Eggs") {
    productImages[0] = "/Paper Mache Easter Eggs 1.webp"
    productImages[1] = "/Paper Mache Easter Eggs 2.webp"
    productImages[2] = "/Paper Mache Easter Eggs 3.jpg"
    productImages[3] = "/Paper Mache Easter Eggs 4.webp"
  } else if (product.name === "Wooden Block Print Stamps") {
    productImages[0] = "/Wooden Block Print Stamps 1.jpg"
    productImages[1] = "/Wooden Block Print Stamps 2.webp"
    productImages[2] = "/Wooden Block Print Stamps 3.webp"
    productImages[3] = "/Wooden Block Print Stamps 4.jpg"
  } else if (product.name === "Handmade Incense Holder") {
    productImages[0] = "/Handmade Incense Holder 1.webp"
    productImages[1] = "/Handmade Incense Holder 2.webp"
    productImages[2] = "/Handmade Incense Holder 3.webp"
    productImages[3] = "/Handmade Incense Holder 4.webp"
  } else if (product.name === "Embroidered Denim Jacket") {
    productImages[0] = "/Embroidered Denim Jacket 1.webp"
    productImages[1] = "/Embroidered Denim Jacket 2.webp"
    productImages[2] = "/Embroidered Denim Jacket 3.webp"
    productImages[3] = "/Embroidered Denim Jacket 4.jpg"
  } else if (product.name === "Silk Thread Bangles") {
    productImages[0] = "/Silk Thread Bangles 1.webp"
    productImages[1] = "/Silk Thread Bangles 2.webp"
    productImages[2] = "/Silk Thread Bangles 3.webp"
    productImages[3] = "/Silk Thread Bangles 4.webp"
  } else if (product.name === "Bamboo Charcoal Soap") {
    productImages[0] = "/Bamboo Charcoal Soap 1.webp"
    productImages[1] = "/Bamboo Charcoal Soap 2.webp"
    productImages[2] = "/Bamboo Charcoal Soap 3.jpg"
    productImages[3] = "/Bamboo Charcoal Soap 4.webp"
  } else if (product.name === "Handcrafted Wooden Chess Set") {
    productImages[0] = "/Handcrafted Wooden Chess Set 1.webp"
    productImages[1] = "/Handcrafted Wooden Chess Set 2.webp"
    productImages[2] = "/Handcrafted Wooden Chess Set 3.webp"
    productImages[3] = "/Handcrafted Wooden Chess Set 4.webp"
  } else if (product.name === "Kashmiri Saffron Gift Box") {
    productImages[0] = "/Kashmiri Saffron Gift Box 1.jpeg"
    productImages[1] = "/Kashmiri Saffron Gift Box 2.webp"
    productImages[2] = "/Kashmiri Saffron Gift Box 3.webp"
    productImages[3] = "/Kashmiri Saffron Gift Box 4.webp"
  } else if (product.name === "Ajrakh Block Print Dupatta") {
    productImages[0] = "/Ajrakh Block Print Dupatta 1.webp"
    productImages[1] = "/Ajrakh Block Print Dupatta 2.jpg"
    productImages[2] = "/Ajrakh Block Print Dupatta 3.png"
    productImages[3] = "/Ajrakh Block Print Dupatta 4.jpg"
  } else if (product.name === "Jute Shopping Tote") {
    productImages[0] = "/Jute Shopping Tote 1.jpg"
    productImages[1] = "/Jute Shopping Tote 2.webp"
    productImages[2] = "/Jute Shopping Tote 3.webp"
    productImages[3] = "/Jute Shopping Tote 4.png"
  } else if (product.name === "Organic Darjeeling Tea Collection") {
    productImages[0] = "/Organic Darjeeling Tea Collection 1.webp"
    productImages[1] = "/Organic Darjeeling Tea Collection 2.webp"
    productImages[2] = "/Organic Darjeeling Tea Collection 3.webp"
    productImages[3] = "/Organic Darjeeling Tea Collection 4.webp"
  } else if (product.name === "Embroidered Velvet Cushion Covers") {
    productImages[0] = "/Embroidered Velvet Cushion Covers 1.webp"
    productImages[1] = "/Embroidered Velvet Cushion Covers 2.webp"
    productImages[2] = "/Embroidered Velvet Cushion Covers 3.jpg"
    productImages[3] = "/Embroidered Velvet Cushion Covers 4.avif"
  } else if (product.name === "Copper Hammered Water Jug Set") {
    productImages[0] = "/Copper Hammered Water Jug Set 1.jpg"
    productImages[1] = "/Copper Hammered Water Jug Set 2.webp"
    productImages[2] = "/Copper Hammered Water Jug Set 3.jpg"
    productImages[3] = "/Copper Hammered Water Jug Set 4.webp"
  } else if (product.name === "Silk Thread Necklace Set") {
    productImages[0] = "/Silk Thread Necklace Set 1.jpg"
    productImages[1] = "/Silk Thread Necklace Set 2.webp"
    productImages[2] = "/Silk Thread Necklace Set 3.webp"
    productImages[3] = "/Silk Thread Necklace Set 4.webp"
  } else if (product.name === "Organic Cotton Bath Towel Set") {
    productImages[0] = "/Organic Cotton Bath Towel Set 1.webp"
    productImages[1] = "/Organic Cotton Bath Towel Set 2.webp"
    productImages[2] = "/Organic Cotton Bath Towel Set 3.webp"
    productImages[3] = "/Organic Cotton Bath Towel Set 4.webp"
  } else if (product.name === "Handwoven Seagrass Basket Set") {
    productImages[0] = "/Handwoven Seagrass Basket Set 1.webp"
    productImages[1] = "/Handwoven Seagrass Basket Set 2.webp"
    productImages[2] = "/Handwoven Seagrass Basket Set 3.webp"
    productImages[3] = "/Handwoven Seagrass Basket Set 4.webp"
  } else if (product.name === "Traditional Kolam Stencils") {
    productImages[0] = "/Traditional Kolam Stencils 1.webp"
    productImages[1] = "/Traditional Kolam Stencils 2.webp"
    productImages[2] = "/Traditional Kolam Stencils 3.jpg"
    productImages[3] = "/Traditional Kolam Stencils 4.webp"
  } else if (product.name === "Handmade Leather Journal") {
    productImages[0] = "/Handmade Leather Journal 1.avif"
    productImages[1] = "/Handmade Leather Journal 2.jpg"
    productImages[2] = "/Handmade Leather Journal 3.avif"
    productImages[3] = "/Handmade Leather Journal 4.avif"
  } else if (product.name === "Organic Turmeric Face Pack") {
    productImages[0] = "/Organic Turmeric Face Pack 1.webp"
    productImages[1] = "/Organic Turmeric Face Pack 2.jpg"
    productImages[2] = "/Organic Turmeric Face Pack 3.webp"
    productImages[3] = "/Organic Turmeric Face Pack 4.jpeg"
  } else if (product.name === "Silk Brocade Cushion Covers") {
    productImages[0] = "/Silk Brocade Cushion Covers 1.jpg"
    productImages[1] = "/Silk Brocade Cushion Covers 2.webp"
    productImages[2] = "/Silk Brocade Cushion Covers 3.jpg"
    productImages[3] = "/Silk Brocade Cushion Covers 4.webp"
  } else if (product.name === "Organic Herbal Hair Oil") {
    productImages[0] = "/Organic Herbal Hair Oil 1.webp"
    productImages[1] = "/Organic Herbal Hair Oil 2.png"
    productImages[2] = "/Organic Herbal Hair Oil 3.png"
    productImages[3] = "/Organic Herbal Hair Oil 4.webp"
  } else if (product.name === "Pure Silver Anklets") {
    productImages[0] = "/Pure Silver Anklets 1.jpg"
    productImages[1] = "/Pure Silver Anklets 2.webp"
    productImages[2] = "/Pure Silver Anklets 3.webp"
    productImages[3] = "/Pure Silver Anklets 4.webp"
  } else if (product.name === "Copper Serving Tray") {
    productImages[0] = "/Copper Serving Tray 1.jpg"
    productImages[1] = "/Copper Serving Tray 2.webp"
    productImages[2] = "/Copper Serving Tray 3.webp"
    productImages[3] = "/Copper Serving Tray 4.avif"
  } else if (product.name === "Brass Temple Bell") {
    productImages[0] = "/Brass Temple Bell 1.webp"
    productImages[1] = "/Brass Temple Bell 2.jpg"
    productImages[2] = "/Brass Temple Bell 3.webp"
    productImages[3] = "/Brass Temple Bell 4.jpg"
  } else if (product.name === "Handwoven Jute Floor Mat") {
    productImages[0] = "/Handwoven Jute Floor Mat 1.jpg"
    productImages[1] = "/Handwoven Jute Floor Mat 2.jpg"
    productImages[2] = "/Handwoven Jute Floor Mat 3.webp"
    productImages[3] = "/Handwoven Jute Floor Mat 4.webp"
  } else if (product.name === "Organic Green Tea Sampler") {
    productImages[0] = "/Organic Green Tea Sampler 1.jpg"
    productImages[1] = "/Organic Green Tea Sampler 2.jpg"
    productImages[2] = "/Organic Green Tea Sampler 3.webp"
    productImages[3] = "/Organic Green Tea Sampler 4.jpg"
  } else if (product.name === "Classic Silk Saree") {
    productImages[0] = "/Classic Silk Saree 1.webp"
    productImages[1] = "/Classic Silk Saree 2.webp"
    productImages[2] = "/Classic Silk Saree3.jpg"
    productImages[3] = "/Classic Silk Saree 4.webp"
  } else if (product.name === "Premium Leather Juttis") {
    productImages[0] = "/Premium Leather Juttis 1.jpeg"
    productImages[1] = "/Premium Leather Juttis 2.jpg"
    productImages[2] = "/Premium Leather Juttis 3.webp"
    productImages[3] = "/Premium Leather Juttis 4.jpeg"
  } else if (product.name === "Embroidered Pashmina Shawl") {
    productImages[0] = "/Embroidered Pashmina Shawl 1.webp"
    productImages[1] = "/Embroidered Pashmina Shawl 2.webp"
    productImages[2] = "/Embroidered Pashmina Shawl 3.webp"
    productImages[3] = "/Embroidered Pashmina Shawl 4.jpg"
  } else if (product.name === "Indigo Block Print Dress") {
    productImages[0] = "/Indigo Block Print Dress 1.webp"
    productImages[1] = "/Indigo Block Print Dress 2.jpg"
    productImages[2] = "/Indigo Block Print Dress 3.jpg"
    productImages[3] = "/Indigo Block Print Dress 4.jpg"
  } else if (product.name === "Woven Bamboo Basket") {
    productImages[0] = "/Woven Bamboo Basket 1.webp"
    productImages[1] = "/Woven Bamboo Basket 2.webp"
    productImages[2] = "/Woven Bamboo Basket.webp"
    productImages[3] = "/Woven Bamboo Basket 4.webp"
  } else if (product.name === "Chanderi Silk Tunic") {
    productImages[0] = "/Chanderi Silk Tunic 1.jpg"
    productImages[1] = "/Chanderi Silk Tunic 2.webp"
    productImages[2] = "/Chanderi Silk Tunic 3.webp"
    productImages[3] = "/Chanderi Silk Tunic 4.webp"
  } else if (product.name === "Beaded Macrame Wall Hanging") {
    productImages[0] = "/Beaded Macrame Wall Hanging 1.webp"
    productImages[1] = "/Beaded Macrame Wall Hanging 2.webp"
    productImages[2] = "/Beaded Macrame Wall Hanging 3.webp"
    productImages[3] = "/Beaded Macrame Wall Hanging 4.webp"
  } else if (product.name === "Bronze Nataraja Statue") {
    productImages[0] = "/Bronze Nataraja Statue 1.webp"
    productImages[1] = "/Bronze Nataraja Statue 2.webp"
    productImages[2] = "/Bronze Nataraja Statue3.webp"
    productImages[3] = "/Bronze Nataraja Statue 4.webp"
  } else if (product.name === "Lacquerware Jewelry Box") {
    productImages[0] = "/Lacquerware Jewelry Box 1.jpg"
    productImages[1] = "/Lacquerware Jewelry Box 2.webp"
    productImages[2] = "/Lacquerware Jewelry Box 3.jpg"
    productImages[3] = "/Lacquerware Jewelry Box 4.webp"
  } else if (product.name === "Hand-knotted Woolen Rug") {
    productImages[0] = "/Hand-knotted Woolen Rug 1.webp"
    productImages[1] = "/Hand-knotted Woolen Rug 2.webp"
    productImages[2] = "/Hand-knotted Woolen Rug 3.jpg"
    productImages[3] = "/Hand-knotted Woolen Rug 4.webp"
  } else if (product.name === "Handmade Khadi Cotton Shirt") {
    productImages[0] = "/Handmade Khadi Cotton Shirt 1.jpg"
    productImages[1] = "/Handmade Khadi Cotton Shirt 2.webp"
    productImages[2] = "/Handmade Khadi Cotton Shirt 3.webp"
    productImages[3] = "/Handmade Khadi Cotton Shirt 4.webp"
  } else if (product.name === "Hand-painted Terracotta Vase") {
    productImages[0] = "/Hand-painted Terracotta Vase 1.webp"
    productImages[1] = "/Hand-painted Terracotta Vase 2.webp"
    productImages[2] = "/Hand-painted Terracotta Vase 3.webp"
    productImages[3] = "/Hand-painted Terracotta Vase 4.webp"
  } else if (product.name === "Brass Antique Wall Hanging") {
    productImages[0] = "/Brass Antique Wall Hanging 1.webp"
    productImages[1] = "/Brass Antique Wall Hanging2.webp"
    productImages[2] = "/Brass Antique Wall Hanging 3.jpg"
    productImages[3] = "/Brass Antique Wall Hanging 4.webp"
  } else if (product.name === "Handmade Crochet Table") {
    productImages[0] = "/Handmade Crochet Table 1.webp"
    productImages[1] = "/Handmade Crochet Table 2.jpg"
    productImages[2] = "/Handmade Crochet Table3.webp"
    productImages[3] = "/Handmade Crochet Table4.webp"
  } else if (product.name === "Copper Water Bottle") {
    productImages[0] = "/Copper Water Bottle 1.jpg"
    productImages[1] = "/Copper Water Bottle 2.webp"
    productImages[2] = "/Copper Water Bottle 3.webp"
    productImages[3] = "/Copper Water Bottle 4.webp"
  } else if (product.name === "Dhurrie Cotton Rug") {
    productImages[0] = "/Dhurrie Cotton Rug 1.webp"
    productImages[1] = "/Dhurrie Cotton Rug 2.jpg"
    productImages[2] = "/Dhurrie Cotton Rug 3.webp"
    productImages[3] = "/Dhurrie Cotton Rug 4.webp"
  } else if (product.name === "Kolhapuri Leather Sandals") {
    productImages[0] = "/Kolhapuri Leather Sandals 1.jpg"
    productImages[1] = "/Kolhapuri Leather Sandals 2.webp"
    productImages[2] = "/Kolhapuri Leather Sandals 3.webp"
    productImages[3] = "/Kolhapuri Leather Sandals 4.webp"
  } else if (product.name === "Marble Carved Elephant") {
    productImages[0] = "/Marble Carved Elephant 1.webp"
    productImages[1] = "/Marble Carved Elephant 2.jpg"
    productImages[2] = "/Marble Carved Elephant 3.jpg"
    productImages[3] = "/Marble Carved Elephant 4.webp"
  } else if (product.name === "Dokra Art Wall Clock") {
    productImages[0] = "/Dokra Art Wall Clock 1.webp"
    productImages[1] = "/Dokra Art Wall Clock 2.jpg"
    productImages[2] = "/Dokra Art Wall Clock 3.webp"
    productImages[3] = "/Dokra Art Wall Clock 4.jpg"
  } else if (product.name === "Organic Herbal Tea Set") {
    productImages[0] = "/Organic Herbal Tea Set 1.webp"
    productImages[1] = "/Organic Herbal Tea Set 2.webp"
    productImages[2] = "/Organic Herbal Tea Set 3.webp"
    productImages[3] = "/Organic Herbal Tea Set 4.webp"
  } else if (product.name === "Clay Tawa for Roti") {
    productImages[0] = "/Clay Tawa for Roti 1.jpg"
    productImages[1] = "/Clay Tawa for Roti 2.webp"
    productImages[2] = "/Clay Tawa for Roti 3.webp"
    productImages[3] = "/Clay Tawa for Roti 4.webp"
  } else if (product.name === "Hand-painted Kettle") {
    productImages[0] = "/Hand-painted Kettle 1.webp"
    productImages[1] = "/Hand-painted Kettle 2.avif"
    productImages[2] = "/Hand-painted Kettle 3.avif"
    productImages[3] = "/Hand-painted Kettle 4.avif"
  } else if (product.name === "Premium Leather Laptop Bag") {
    productImages[0] = "/Premium Leather Laptop Bag 1.jpg"
    productImages[1] = "/Premium Leather Laptop Bag 2.avif"
    productImages[2] = "/Premium Leather Laptop Bag3.webp"
    productImages[3] = "/Premium Leather Laptop Bag 4.webp"
  } else if (product.name === "Organic Cotton Yoga Mat") {
    productImages[0] = "/Organic Cotton Yoga Mat 1.webp"
    productImages[1] = "/Organic Cotton Yoga Mat 2.webp"
    productImages[2] = "/Organic Cotton Yoga Mat 3.webp"
    productImages[3] = "/Organic Cotton Yoga Mat 4.webp"
  } else if (product.name === "Hand-painted Ceramic Dinner Set") {
    productImages[0] = "/Hand-painted Ceramic Dinner Set1.webp"
    productImages[1] = "/Hand-painted Ceramic Dinner Set 2.webp"
    productImages[2] = "/Hand-painted Ceramic Dinner Set3.jpg"
    productImages[3] = "/Hand-painted Ceramic Dinner Set 4.jpg"
  } else if (product.name === "Brass Antique Table Lamp") {
    productImages[0] = "/Brass Antique Table Lamp1.webp"
    productImages[1] = "/Brass Antique Table Lamp 2.webp"
    productImages[2] = "/Brass Antique Table Lamp 3.webp"
    productImages[3] = "/Brass Antique Table Lamp 4.webp"
  } else if (product.name === "Silver Meenakari Jewelry Box") {
    productImages[0] = "/Silver Meenakari Jewelry Box 1.webp"
    productImages[1] = "/Silver Meenakari Jewelry Box 2.webp"
    productImages[2] = "/Silver Meenakari Jewelry Box 3.jpg"
    productImages[3] = "/Silver Meenakari Jewelry Box 4.webp"
  } else if (product.name === "Hand-knotted Persian Style Carpet") {
    productImages[0] = "/Hand-knotted Persian Style Carpet 1.webp"
    productImages[1] = "/Hand-knotted Persian Style Carpet 2.webp"
    productImages[2] = "/Hand-knotted Persian Style Carpet3.webp"
    productImages[3] = "/Hand-knotted Persian Style Carpet 4.webp"
  } else if (product.name === "Bidriware Flower Vase") {
    productImages[0] = "/Bidriware Flower Vase 1.webp"
    productImages[1] = "/Bidriware Flower Vase 2.webp"
    productImages[2] = "/Bidriware Flower Vase 3.webp"
    productImages[3] = "/Bidriware Flower Vase 4.jpg"
  } else if (product.name === "Warli Art Painted Plate") {
    productImages[0] = "/Warli Art Painted Plate 1.webp"
    productImages[1] = "/Warli Art Painted Plate 2.webp"
    productImages[2] = "/Warli Art Painted Plate 3.webp"
    productImages[3] = "/Warli Art Painted Plate4.webp"
  } else if (product.name === "Bamboo Fiber Towel Set") {
    productImages[0] = "/Bamboo Fiber Towel Set1.webp"
    productImages[1] = "/Bamboo Fiber Towel Set 2.webp"
    productImages[2] = "/Bamboo Fiber Towel Set 3.avif"
    productImages[3] = "/Bamboo Fiber Towel Set4.webp"
  } else if (product.name === "Ayurvedic Skin Care Kit") {
    productImages[0] = "/Ayurvedic Skin Care Kit1.webp"
    productImages[1] = "/Ayurvedic Skin Care Kit 2.webp"
    productImages[2] = "/Ayurvedic Skin Care Kit3.webp"
    productImages[3] = "/Ayurvedic Skin Care Kit4.webp"
  } else if (product.name === "Batik Print Silk Scarf") {
    productImages[0] = "/Batik Print Silk Scarf1.webp"
    productImages[1] = "/Batik Print Silk Scarf 2.webp"
    productImages[2] = "/Batik Print Silk Scarf3.webp"
    productImages[3] = "/Batik Print Silk Scarf4.webp"
  } else if (product.name === "Bell Metal Utensil Set") {
    productImages[0] = "/Bell Metal Utensil Set1.jpg"
    productImages[1] = "/Bell Metal Utensil Set2.webp"
    productImages[2] = "/Bell Metal Utensil Set 3.webp"
    productImages[3] = "/Bell Metal Utensil Set4.webp"
  } else if (product.name === "Bandhani Tie-Dye Saree") {
    productImages[0] = "/Bandhani Tie-Dye Saree.jpg"
    productImages[1] = "/Bandhani Tie-Dye Saree 2.jpg"
    productImages[2] = "/Bandhani Tie-Dye Saree 3.jpg"
    productImages[3] = "/Bandhani Tie-Dye Saree 4.jpg"
  } else if (product.name === "Cane Outdoor Chair") {
    productImages[0] = "/Cane Outdoor Chair1.jpg"
    productImages[1] = "/Cane Outdoor Chair 2.webp"
    productImages[2] = "/Cane Outdoor Chair 3.avif"
    productImages[3] = "/Cane Outdoor Chair 4.webp"
  } else if (product.name === "Mulberry Silk Sleep Mask") {
    productImages[0] = "/Mulberry Silk Sleep Mask 1.webp"
    productImages[1] = "/Mulberry Silk Sleep Mask 2.jpg"
    productImages[2] = "/Mulberry Silk Sleep Mask 3.jpg"
    productImages[3] = "/Mulberry Silk Sleep Mask 4.webp"
  } else if (product.name === "Terracotta Tea Cups (Set of 6)") {
    productImages[0] = "/Terracotta Tea Cups (Set of 6) 1.webp"
    productImages[1] = "/Terracotta Tea Cups (Set of 6) 2.webp"
    productImages[2] = "/Terracotta Tea Cups (Set of 6) 3.webp"
    productImages[3] = "/Terracotta Tea Cups (Set of 6) 4.webp"
  } else if (product.name === "Kanjeevaram Silk Border") {
    productImages[0] = "/Kanjeevaram Silk Border 1.webp"
    productImages[1] = "/Kanjeevaram Silk Border 2.webp"
    productImages[2] = "/Kanjeevaram Silk Border 3.webp"
    productImages[3] = "/Kanjeevaram Silk Border4.jpg"
  } else if (product.name === "Organic Coconut Oil Beauty Set") {
    productImages[0] = "/Organic Coconut Oil Beauty Set 1.avif"
    productImages[1] = "/Organic Coconut Oil Beauty Set 2.webp"
    productImages[2] = "/Organic Coconut Oil Beauty Set 3.avif"
    productImages[3] = "/Organic Coconut Oil Beauty Set 4.webp"
  } else if (product.name === "Embroidered Table Cloth") {
    productImages[0] = "/Embroidered Table Cloth1.webp"
    productImages[1] = "/Embroidered Table Cloth 2.webp"
    productImages[2] = "/Embroidered Table Cloth3.webp"
    productImages[3] = "/Embroidered Table Cloth4.webp"
  } else if (product.name === "Hand-carved Wooden Mirror") {
    productImages[0] = "/Hand-carved Wooden Mirror 1.webp"
    productImages[1] = "/Hand-carved Wooden Mirror2.webp"
    productImages[2] = "/Hand-carved Wooden Mirror3.webp"
    productImages[3] = "/Hand-carved Wooden Mirror 4.webp"
  } else if (product.name === "Handwoven Cotton Dhurrie Runner") {
    productImages[0] = "/Handwoven Cotton Dhurrie Runner1.webp"
    productImages[1] = "/Handwoven Cotton Dhurrie Runner 2.webp"
    productImages[2] = "/Handwoven Cotton Dhurrie Runner 3.webp"
    productImages[3] = "/Handwoven Cotton Dhurrie Runner 4.webp"
  } else if (product.name === "Pure Wool Shawl") {
    productImages[0] = "/Pure Wool Shawl 1.jpg"
    productImages[1] = "/Pure Wool Shawl2.jpg"
    productImages[2] = "/Pure Wool Shawl 3.jpg"
    productImages[3] = "/Pure Wool Shawl 4.jpg"
  } else if (product.name === "Handmade Paper Diary") {
    productImages[0] = "/Handmade Paper Diary 1.webp"
    productImages[1] = "/Handmade Paper Diary 2.webp"
    productImages[2] = "/Handmade Paper Diary3.webp"
    productImages[3] = "/Handmade Paper Diary4.jpg"
  } else if (product.name === "Hand-carved Sandalwood Incense Box") {
    productImages[0] = "/Hand-carved Sandalwood Incense Box 1.webp"
    productImages[1] = "/Hand-carved Sandalwood Incense Box 2.webp"
    productImages[2] = "/Hand-carved Sandalwood Incense Box 3.webp"
    productImages[3] = "/Hand-carved Sandalwood Incense Box4.webp"
  } else if (product.name === "Premium Cashmere Scarf") {
    productImages[0] = "/Premium Cashmere Scarf.jpg"
    productImages[1] = "/Premium Cashmere Scarf1.jpg"
    productImages[2] = "/Premium Cashmere Scarf2.jpg"
    productImages[3] = "/Premium Cashmere Scarf 4.webp"
  } else if (product.name === "Marble Inlay Work Coasters") {
    productImages[0] = "/Marble Inlay Work Coasters 1.webp"
    productImages[1] = "/Marble Inlay Work Coasters 2.webp"
    productImages[2] = "/Marble Inlay Work Coasters3.webp"
    productImages[3] = "/Marble Inlay Work Coasters 4.webp"
  } else if (product.name === "Hand-painted Ceramic Tea") {
    productImages[0] = "/Hand-painted Ceramic Tea 1.jpg"
    productImages[1] = "/Hand-painted Ceramic Tea 2.jpg"
    productImages[2] = "/Hand-painted Ceramic Tea3.webp"
    productImages[3] = "/Hand-painted Ceramic Tea4.webp"
  } else if (product.name === "Hand-painted Clay Pots") {
    productImages[0] = "/Hand-painted Clay Pots1.webp"
    productImages[1] = "/Hand-painted Clay Pots2.webp"
    productImages[2] = "/Hand-painted Clay Pots3.webp"
    productImages[3] = "/Hand-painted Clay Pots4.webp"
  } else if (product.name === "Phulkari Embroidered Dupatta") {
    productImages[0] = "/Phulkari Embroidered Dupatta 1.jpg"
    productImages[1] = "/Phulkari Embroidered Dupatta 2.webp"
    productImages[2] = "/Phulkari Embroidered Dupatta 3.jpg"
    productImages[3] = "/Phulkari Embroidered Dupatta 4.webp"
  } else if (product.name === "Hand-painted Wooden Toy Set") {
    productImages[0] = "/Hand-painted Wooden Toy Set 1.webp"
    productImages[1] = "/Hand-painted Wooden Toy Set2.webp"
    productImages[2] = "/Hand-painted Wooden Toy Set 3.webp"
    productImages[3] = "/Hand-painted Wooden Toy Set4.webp"
  } else if (product.name === "Handmade Soap Gift Box") {
    productImages[0] = "/Handmade Soap Gift Box.webp"
    productImages[1] = "/Handmade Soap Gift Box 1.webp"
    productImages[2] = "/Handmade Soap Gift Box 2.webp"
    productImages[3] = "/Handmade Soap Gift Box 3.webp"
  } else if (product.name === "Traditional Mehndi Cone Set") {
    productImages[0] = "/Traditional Mehndi Cone Set 1.webp"
    productImages[1] = "/Traditional Mehndi Cone Set2.webp"
    productImages[2] = "/Traditional Mehndi Cone Set 3.webp"
    productImages[3] = "/Traditional Mehndi Cone Set 4.webp"
  } else if (product.name === "Organic Cotton Kids Dress") {
    productImages[0] = "/Organic Cotton Kids Dress 1.webp"
    productImages[1] = "/Organic Cotton Kids Dress2.webp"
    productImages[2] = "/Organic Cotton Kids Dress 3.jpg"
    productImages[3] = "/Organic Cotton Kids Dress 4.webp"
  } else if (product.name === "Silver Oxidized Earrings") {
      productImages[0] = "/Silver Oxidized Earrings 1.jpg"
      productImages[1] = "/Silver Oxidized Earrings 2.webp"
      productImages[2] = "/Silver Oxidized Earrings 3.jpg"
      productImages[3] = "/Silver Oxidized Earrings4.jpeg"
    } else if (product.name === "Kashmiri Walnut Wood Tray") {
      productImages[0] = "/Kashmiri Walnut Wood Tray 1.webp"
      productImages[1] = "/Kashmiri Walnut Wood Tray 2.webp"
      productImages[2] = "/Kashmiri Walnut Wood Tray 3.webp"
      productImages[3] = "/Kashmiri Walnut Wood Tray4.webp"
    } else if (product.name === "Zardosi Work Clutch") {
      productImages[0] = "/Zardosi Work Clutch 1.webp"
      productImages[1] = "/Zardosi Work Clutch 2.webp"
      productImages[2] = "/Zardosi Work Clutch 3.webp"
      productImages[3] = "/Zardosi Work Clutch 4.webp"
    } else if (product.name === "Pure Ghee Diya Wicks") {
      productImages[0] = "/Pure Ghee Diya Wicks 1.webp"
      productImages[1] = "/Pure Ghee Diya Wicks 2.webp"
      productImages[2] = "/Pure Ghee Diya Wicks 3.webp"
      productImages[3] = "/Pure Ghee Diya Wicks 4.webp"
    } else if (product.name === "Handwoven Banarasi Silk Saree") {
      productImages[0] = "/Handwoven Banarasi Silk Saree 1.webp"
      productImages[1] = "/Handwoven Banarasi Silk Saree 2.webp"
      productImages[2] = "/Handwoven Banarasi Silk Saree 3.webp"
      productImages[3] = "/Handwoven Banarasi Silk Saree 4.webp"
    } else if (product.name === "Hand-carved Wooden Mirror Frame") {
      productImages[0] = "/Hand-carved Wooden Mirror Frame 1.webp"
      productImages[1] = "/Hand-carved Wooden Mirror Frame 2.webp"
      productImages[2] = "/Hand-carved Wooden Mirror Frame 3.webp"
      productImages[3] = "/Hand-carved Wooden Mirror Frame 4.webp"
    } else if (product.name === "Hand-painted Ceramic Tea Set") {
      productImages[0] = "/Hand-painted Ceramic Tea Set 1.webp"
      productImages[1] = "/Hand-painted Ceramic Tea Set 2.webp"
      productImages[2] = "/Hand-painted Ceramic Tea Set 3.webp"
      productImages[3] = "/Hand-painted Ceramic Tea Set 4.webp"
    } else if (product.name === "Handwoven Bamboo Table Runner") {
      productImages[0] = "/Handwoven Bamboo Table Runner 1.webp"
      productImages[1] = "/Handwoven Bamboo Table Runner 2.webp"
      productImages[2] = "/Handwoven Bamboo Table Runner 3.webp"
      productImages[3] = "/Handwoven Bamboo Table Runner 4.jpg"
    } else if (product.name === "Brass Puja Diya Set") {
      productImages[0] = "/Brass Puja Diya Set 1.webp"
      productImages[1] = "/Brass Puja Diya Set 2.webp"
      productImages[2] = "/Brass Puja Diya Set 3.jpg"
      productImages[3] = "/Brass Puja Diya Set 4.webp"
    } else if (product.name === "Hand-embroidered Bedspread") {
      productImages[0] = "/Hand-embroidered Bedspread 1.webp"
      productImages[1] = "/Hand-embroidered Bedspread 2.webp"
      productImages[2] = "/Hand-embroidered Bedspread3.webp"
      productImages[3] = "/Hand-embroidered Bedspread 4.webp"
    } else if (product.name === "Traditional Wooden Charkha") {
      productImages[0] = "/Traditional Wooden Charkha 1.webp"
      productImages[1] = "/Traditional Wooden Charkha 2.webp"
      productImages[2] = "/Traditional Wooden Charkha 3.webp"
      productImages[3] = "/Traditional Wooden Charkha 4.webp"
    } else if (product.name === "Handmade Crochet Table Runner") {
      productImages[0] = "/Handmade Crochet Table Runner 1.webp"
      productImages[1] = "/Handmade Crochet Table Runner 2.webp"
      productImages[2] = "/Handmade Crochet Table Runner 3.webp"
      productImages[3] = "/Handmade Crochet Table Runner 4.jpg"
    } else if (product.name === "Hand-loomed Cotton Tunic") {
      productImages[0] = "/Hand-loomed Cotton Tunic 1.jpg"
      productImages[1] = "/Hand-loomed Cotton Tunic 2.webp"
      productImages[2] = "/Hand-loomed Cotton Tunic 3.webp"
      productImages[3] = "/Hand-loomed Cotton Tunic 4.jpg"
    } else if (product.name === "Silk Blend Kurta") {
      productImages[0] = "/Silk Blend Kurta 1.webp"
      productImages[1] = "/Silk Blend Kurta 2.webp"
      productImages[2] = "/Silk Blend Kurta 3.webp"
      productImages[3] = "/Silk Blend Kurta 4.avif"
    } else if (product.name === "Floral Print Anarkali") {
      productImages[0] = "/Floral Print Anarkali 1.avif"
      productImages[1] = "/Floral Print Anarkali 2.jpg"
      productImages[2] = "/Floral Print Anarkali 3.jpg"
      productImages[3] = "/Floral Print Anarkali 4.jpg"
    } else if (product.name === "Embroidered Chanderi Dupatta") {
      productImages[0] = "/Embroidered Chanderi Dupatta 1.webp"
      productImages[1] = "/Embroidered Chanderi Dupatta 2.jpg"
      productImages[2] = "/Embroidered Chanderi Dupatta 3.jpg"
      productImages[3] = "/Embroidered Chanderi Dupatta 4.webp"
    } else if (product.name === "Block Printed Saree") {
      productImages[0] = "/Block Printed Saree 1.jpg"
      productImages[1] = "/Block Printed Saree 2.jpg"
      productImages[2] = "/Block Printed Saree 3.webp"
      productImages[3] = "/Block Printed Saree4.webp"
    } else if (product.name === "Hand-painted Silk Scarf") {
      productImages[0] = "/Hand-painted Silk Scarf 1.jpg"
      productImages[1] = "/Hand-painted Silk Scarf 2.webp"
      productImages[2] = "/Hand-painted Silk Scarf 3.webp"
      productImages[3] = "/Hand-painted Silk Scarf 4.webp"
    } else if (product.name === "Designer Mens Sherwani") {
      productImages[0] = "/Designer Mens Sherwani 1.webp"
      productImages[1] = "/Designer Mens Sherwani 2.webp"
      productImages[2] = "/Designer Mens Sherwani 3.jpg"
      productImages[3] = "/Designer Mens Sherwani 4.jpg"
    } else if (product.name === "Bandhani Print Salwar Kameez") {
      productImages[0] = "/Bandhani Print Salwar Kameez 1.jpg"
      productImages[1] = "/Bandhani Print Salwar Kameez 2.webp"
      productImages[2] = "/Bandhani Print Salwar Kameez 3.webp"
      productImages[3] = "/Bandhani Print Salwar Kameez 4.jpg"
    } else if (product.name === "Zardozi Work Lehenga") {
      productImages[0] = "/Zardozi Work Lehenga 1.webp"
      productImages[1] = "/Zardozi Work Lehenga 2.jpg"
      productImages[2] = "/Zardozi Work Lehenga 3.jpg"
      productImages[3] = "/Zardozi Work Lehenga 4.webp"
    } else if (product.name === "Traditional Pashmina Shawl") {
      productImages[0] = "/Traditional Pashmina Shawl 1.webp"
      productImages[1] = "/Traditional Pashmina Shawl 2.jpg"
      productImages[2] = "/Traditional Pashmina Shawl 3.webp"
      productImages[3] = "/Traditional Pashmina Shawl 4.webp"
    } else if (product.name === "Silver Jhumka Earrings") {
      productImages[0] = "/Silver Jhumka Earrings1.jpg"
      productImages[1] = "/Silver Jhumka Earrings2.jpeg"
      productImages[2] = "/Silver Jhumka Earrings 3.jpg"
      productImages[3] = "/Silver Jhumka Earrings 4.webp"
    } else if (product.name === "Beaded Statement Necklace") {
      productImages[0] = "/Beaded Statement Necklace 1.webp"
      productImages[1] = "/Beaded Statement Necklace 2.webp"
      productImages[2] = "/Beaded Statement Necklace 3.webp"
      productImages[3] = "/Beaded Statement Necklace 4.webp"
    } else if (product.name === "Gold-plated Bangle Set") {
      productImages[0] = "/Gold-plated Bangle Set 1.jpg"
      productImages[1] = "/Gold-plated Bangle Set 2.jpg"
      productImages[2] = "/Gold-plated Bangle Set 3.jpg"
      productImages[3] = "/Gold-plated Bangle Set 4.jpg"
    } else if (product.name === "Pearl Drop Earrings") {
      productImages[0] = "/Pearl Drop Earrings 1.webp"
      productImages[1] = "/Pearl Drop Earrings 2.webp"
      productImages[2] = "/Pearl Drop Earrings 3.webp"
      productImages[3] = "/Pearl Drop Earrings 4.webp"
    } else if (product.name === "Kundan Work Maang Tikka") {
      productImages[0] = "/Kundan Work Maang Tikka 1.jpg"
      productImages[1] = "/Kundan Work Maang Tikka 2.webp"
      productImages[2] = "/Kundan Work Maang Tikka 3.webp"
      productImages[3] = "/Kundan Work Maang Tikka 4.webp"
    } else if (product.name === "Enamel Painted Ring") {
      productImages[0] = "/Enamel Painted Ring 1.avif"
      productImages[1] = "/Enamel Painted Ring2.avif"
      productImages[2] = "/Enamel Painted Ring3.jpg"
      productImages[3] = "/Enamel Painted Ring 4.avif"
    } else if (product.name === "Hand-carved Wooden Bangles") {
      productImages[0] = "/Hand-carved Wooden Bangles 1.jpg"
      productImages[1] = "/Hand-carved Wooden Bangles 2.webp"
      productImages[2] = "/Hand-carved Wooden Bangles 3.webp"
      productImages[3] = "/Hand-carved Wooden Bangles 4.jpg"
    } else if (product.name === "Terracotta Jewellery Set") {
      productImages[0] = "/Terracotta Jewellery Set 1.jpg"
      productImages[1] = "/Terracotta Jewellery Set2.webp"
      productImages[2] = "/Terracotta Jewellery Set 3.webp"
      productImages[3] = "/Terracotta Jewellery Set 4.webp"
    } else if (product.name === "Hand-painted Ceramic Plate") {
      productImages[0] = "/Hand-painted Ceramic Plate 1.jpg"
      productImages[1] = "/Hand-painted Ceramic Plate 2.webp"
      productImages[2] = "/Hand-painted Ceramic Plate 3.webp"
      productImages[3] = "/Hand-painted Ceramic Plate 4.webp"
    } else if (product.name === "Macrame Wall Hanging") {
      productImages[0] = "/Macrame Wall Hanging 1.webp"
      productImages[1] = "/Macrame Wall Hanging2.webp"
      productImages[2] = "/Macrame Wall Hanging 3.webp"
      productImages[3] = "/Macrame Wall Hanging 4.webp"
    } else if (product.name === "Embroidered Table Runner") {
      productImages[0] = "/Embroidered Table Runner 1.jpg"
      productImages[1] = "/Embroidered Table Runner 2.webp"
      productImages[2] = "/Embroidered Table Runner 3.webp"
      productImages[3] = "/Embroidered Table Runner 4.webp"
    } else if (product.name === "Wooden Carved Candle Holder") {
      productImages[0] = "/Wooden Carved Candle Holder 1.webp"
      productImages[1] = "/Wooden Carved Candle Holder 2.webp"
      productImages[2] = "/Wooden Carved Candle Holder 3.webp"
      productImages[3] = "/Wooden Carved Candle Holder 4.webp"
    } else if (product.name === "Hand-woven Cotton Throw") {
      productImages[0] = "/Hand-woven Cotton Throw 1.webp"
      productImages[1] = "/Hand-woven Cotton Throw 2.webp"
      productImages[2] = "/Hand-woven Cotton Throw3.webp"
      productImages[3] = "/Hand-woven Cotton Throw4.webp"
    } else if (product.name === "Terracotta Figurines") {
      productImages[0] = "/Terracotta Figurines 1.webp"
      productImages[1] = "/Terracotta Figurines 2.webp"
      productImages[2] = "/Terracotta Figurines 3.webp"
      productImages[3] = "/Terracotta Figurines 4.webp"
    } else if (product.name === "Copper Flower Vase") {
      productImages[0] = "/Copper Flower Vase 1.avif"
      productImages[1] = "/Copper Flower Vase 2.webp"
      productImages[2] = "/Copper Flower Vase3.webp"
      productImages[3] = "/Copper Flower Vase 4.webp"
    } else if (product.name === "Decorative Glass Lantern") {
      productImages[0] = "/Decorative Glass Lantern1.webp"
      productImages[1] = "/Decorative Glass Lantern 2.webp"
      productImages[2] = "/Decorative Glass Lantern 3.webp"
      productImages[3] = "/Decorative Glass Lantern4.webp"
    } else if (product.name === "Bamboo Wind Chimes") {
      productImages[0] = "/Bamboo Wind Chimes 1.jpg"
      productImages[1] = "/Bamboo Wind Chimes 2.webp"
      productImages[2] = "/Bamboo Wind Chimes 3.webp"
      productImages[3] = "/Bamboo Wind Chimes 4.jpg"
    } else if (product.name === "Brass Incense Burner") {
      productImages[0] = "/Brass Incense Burner 1.webp"
      productImages[1] = "/Brass Incense Burner 2.webp"
      productImages[2] = "/Brass Incense Burner 3.webp"
      productImages[3] = "/Brass Incense Burner 4.webp"
    } else if (product.name === "Ceramic Bird House") {
      productImages[0] = "/Ceramic Bird House 1.webp"
      productImages[1] = "/Ceramic Bird House 2.webp"
      productImages[2] = "/Ceramic Bird House 3.webp"
      productImages[3] = "/Ceramic Bird House 4.jpg"
    } else if (product.name === "Metal Garden Stake") {
      productImages[0] = "/Metal Garden Stake1.webp"
      productImages[1] = "/Metal Garden Stake 2.webp"
      productImages[2] = "/Metal Garden Stake 3.jpg"
      productImages[3] = "/Metal Garden Stake4.webp"
    } else if (product.name === "Hanging Planter Basket") {
      productImages[0] = "/Hanging Planter Basket 1.webp"
      productImages[1] = "/Hanging Planter Basket 2.jpg"
      productImages[2] = "/Hanging Planter Basket 3.jpg"
      productImages[3] = "/Hanging Planter Basket 4.avif"
    } else if (product.name === "Solar Garden Lights") {
      productImages[0] = "/Solar Garden Lights 1.jpg"
      productImages[1] = "/Solar Garden Lights 2.jpg"
      productImages[2] = "/Solar Garden Lights 3.jpg"
      productImages[3] = "/Solar Garden Lights 4.webp"
    } else if (product.name === "Garden Tool Set") {
      productImages[0] = "/Garden Tool Set 1.jpg"
      productImages[1] = "/Garden Tool Set2.webp"
      productImages[2] = "/Garden Tool Set 3.webp"
      productImages[3] = "/Garden Tool Set 4.webp"
    } else if (product.name === "Stone Buddha Statue") {
      productImages[0] = "/Stone Buddha Statue 1.webp"
      productImages[1] = "/Stone Buddha Statue2.webp"
      productImages[2] = "/Stone Buddha Statue 3.webp"
      productImages[3] = "/Stone Buddha Statue 4.webp"
    } else if (product.name === "Bamboo Plant Trellis") {
      productImages[0] = "/Bamboo Plant Trellis1.webp"
      productImages[1] = "/Bamboo Plant Trellis 2.jpg"
      productImages[2] = "/Bamboo Plant Trellis3.jpg"
      productImages[3] = "/Bamboo Plant Trellis 4.jpg"
    } else if (product.name === "Watering Can") {
      productImages[0] = "/Watering Can1.webp"
      productImages[1] = "/Watering Can 2.webp"
      productImages[2] = "/Watering Can 3.jpg"
      productImages[3] = "/Watering Can 4.webp"
    } else if (product.name === "Garden Kneeler Pad") {
      productImages[0] = "/Garden Kneeler Pad 1.jpg"
      productImages[1] = "/Garden Kneeler Pad 2.jpg"
      productImages[2] = "/Garden Kneeler Pad 3.webp"
      productImages[3] = "/Garden Kneeler Pad 4.jpg"
    } else if (product.name === "Butterfly Garden Ornaments") {
      productImages[0] = "/Butterfly Garden Ornaments 1.webp"
      productImages[1] = "/Butterfly Garden Ornaments 2.jpg"
      productImages[2] = "/Butterfly Garden Ornaments 3.jpg"
      productImages[3] = "/Butterfly Garden Ornaments4.webp"
    } else if (product.name === "Leather Card Holder") {
      productImages[0] = "/Leather Card Holder 1.avif"
      productImages[1] = "/Leather Card Holder2.webp"
      productImages[2] = "/Leather Card Holder 3.webp"
      productImages[3] = "/Leather Card Holder 4.webp"
    } else if (product.name === "Elegant silk pocket square for men") {
      productImages[0] = "/Elegant silk pocket square for men 1.avif"
      productImages[1] = "/Elegant silk pocket square for men 2.webp"
      productImages[2] = "/Elegant silk pocket square for men 3.jpg"
      productImages[3] = "/Elegant silk pocket square for men 4.webp"
    } else if (product.name === "Hand-painted Umbrella") {
      productImages[0] = "/Hand-painted Umbrella 1.jpg"
      productImages[1] = "/Hand-painted Umbrella2.webp"
      productImages[2] = "/Hand-painted Umbrella3.webp"
      productImages[3] = "/Hand-painted Umbrella 4.avif"
    } else if (product.name === "Embroidered Belt") {
      productImages[0] = "/Embroidered Belt 1.jpg"
      productImages[1] = "/Embroidered Belt 2.webp"
      productImages[2] = "/Embroidered Belt3.jpg"
      productImages[3] = "/Embroidered Belt 4.webp"
    } else if (product.name === "Woolen Beanie Cap") {
      productImages[0] = "/Woolen Beanie Cap1.jpg"
      productImages[1] = "/Woolen Beanie Cap2.webp"
      productImages[2] = "/Woolen Beanie Cap 3.jpg"
      productImages[3] = "/Woolen Beanie Cap 4.webp"
    } else if (product.name === "Canvas Laptop Sleeve") {
      productImages[0] = "/Canvas Laptop Sleeve 1.webp"
      productImages[1] = "/Canvas Laptop Sleeve 2.avif"
      productImages[2] = "/Canvas Laptop Sleeve3.webp"
      productImages[3] = "/Canvas Laptop Sleeve 4.webp"
    } else if (product.name === "Beaded Keychain") {
      productImages[0] = "/Beaded Keychain 1.webp"
      productImages[1] = "/Beaded Keychain 2.webp"
      productImages[2] = "/Beaded Keychain 3.jpg"
      productImages[3] = "/Beaded Keychain 4.webp"
    } else if (product.name === "Silk Eye Mask") {
      productImages[0] = "/Silk Eye Mask1.webp"
      productImages[1] = "/Silk Eye Mask 2.webp"
      productImages[2] = "/Silk Eye Mask 3.avif"
      productImages[3] = "/Silk Eye Mask4.webp"
    } else if (product.name === "Fabric Hair Accessories Set") {
      productImages[0] = "/Fabric Hair Accessories Set1.jpg"
      productImages[1] = "/Fabric Hair Accessories Set 2.webp"
      productImages[2] = "/Fabric Hair Accessories Set 3.webp"
      productImages[3] = "/Fabric Hair Accessories Set 4.jpeg"
    } else if (product.name === "Artisanal Soap Box") {
      productImages[0] = "/Artisanal Soap Box.webp"
      productImages[1] = "/Artisanal Soap Box 1.webp"
      productImages[2] = "/Artisanal Soap Box 3.webp"
      productImages[3] = "/Artisanal Soap Box 4.webp"
    } else if (product.name === "Scented Candle Set") {
      productImages[0] = "/Scented Candle Set 1.jpg"
      productImages[1] = "/Scented Candle Set 2.jpg"
      productImages[2] = "/Scented Candle Set 3.jpg"
      productImages[3] = "/Scented Candle Set 4.jpg"
    } else if (product.name === "Gourmet Tea Sampler") {
      productImages[0] = "/Gourmet Tea Sampler 1.jpg"
      productImages[1] = "/Gourmet Tea Sampler 2.webp"
      productImages[2] = "/Gourmet Tea Sampler 3.webp"
      productImages[3] = "/Gourmet Tea Sampler4.webp"
    } else if (product.name === "Personalized Leather Journal") {
      productImages[0] = "/Personalized Leather Journal 1.webp"
      productImages[1] = "/Personalized Leather Journal 2.webp"
      productImages[2] = "/Personalized Leather Journal3.webp"
      productImages[3] = "/Personalized Leather Journal 4.webp"
    } else if (product.name === "Hand-painted Mug Set") {
      productImages[0] = "/Hand-painted Mug Set 1.jpg"
      productImages[1] = "/Hand-painted Mug Set2.webp"
      productImages[2] = "/Hand-painted Mug Set 3.webp"
      productImages[3] = "/Hand-painted Mug Set4.webp"
    } else if (product.name === "Chocolate Truffle Box") {
      productImages[0] = "/Chocolate Truffle Box1.webp"
      productImages[1] = "/Chocolate Truffle Box2.webp"
      productImages[2] = "/Chocolate Truffle Box 3.webp"
      productImages[3] = "/Chocolate Truffle Box4.webp"
    } else if (product.name === "Hand-woven Basket Hamper") {
      productImages[0] = "/Hand-woven Basket Hamper1.avif"
      productImages[1] = "/Hand-woven Basket Hamper 2.webp"
      productImages[2] = "/Hand-woven Basket Hamper 3.webp"
      productImages[3] = "/Hand-woven Basket Hamper 4.jpg"
    } else if (product.name === "Aromatic Oil Diffuser") {
      productImages[0] = "/Aromatic Oil Diffuser 1.webp"
      productImages[1] = "/Aromatic Oil Diffuser 2.webp"
      productImages[2] = "/Aromatic Oil Diffuser 3.webp"
      productImages[3] = "/Aromatic Oil Diffuser 4.avif"
    } else if (product.name === "Succulent Plant Gift") {
      productImages[0] = "/Succulent Plant Gift1.webp"
      productImages[1] = "/Succulent Plant Gift2.avif"
      productImages[2] = "/Succulent Plant Gift3.jpg"
      productImages[3] = "/Succulent Plant Gift 4.jpg"
    } else if (product.name === "Designer Stationery Kit") {
      productImages[0] = "/Designer Stationery Kit 1.jpg"
      productImages[1] = "/Designer Stationery Kit 2.webp"
      productImages[2] = "/Designer Stationery Kit 3.webp"
      productImages[3] = "/Designer Stationery Kit 4.jpg"
    } else if (product.name === "Linen Casual Shirt") {
      productImages[0] = "/Linen Casual Shirt 1.avif"
      productImages[1] = "/Linen Casual Shirt2.webp"
      productImages[2] = "/Linen Casual Shirt 3.jpg"
      productImages[3] = "/Linen Casual Shirt 4.jpg"
    } else if (product.name === "Cotton Chino Trousers") {
      productImages[0] = "/Cotton Chino Trousers1.webp"
      productImages[1] = "/Cotton Chino Trousers2.webp"
      productImages[2] = "/Cotton Chino Trousers 3.webp"
      productImages[3] = "/Cotton Chino Trousers4.webp"
    } else if (product.name === "Polo T-shirt") {
      productImages[0] = "/Polo T-shirt1.webp"
      productImages[1] = "/Polo T-shirt 2.jpg"
      productImages[2] = "/Polo T-shirt 3.jpg"
      productImages[3] = "/Polo T-shirt 4.webp"
    } else if (product.name === "Denim Jacket") {
      productImages[0] = "/Denim Jacket1.webp"
      productImages[1] = "/Denim Jacket2.webp"
      productImages[2] = "/Denim Jacket3.webp"
      productImages[3] = "/Denim Jacket 4.jpeg"
    } else if (product.name === "Leather Boots") {
      productImages[0] = "/Leather Boots1.webp"
      productImages[1] = "/Leather Boots2.webp"
      productImages[2] = "/Leather Boots 3.webp"
      productImages[3] = "/Leather Boots 4.webp"
    } else if (product.name === "Casual Canvas Shoes") {
      productImages[0] = "/Casual Canvas Shoes1.jpg"
      productImages[1] = "/Casual Canvas Shoes 2.jpg"
      productImages[2] = "/Casual Canvas Shoes 3.jpg"
      productImages[3] = "/Casual Canvas Shoes4.webp"
    } else if (product.name === "Graphic Print Tee") {
      productImages[0] = "/Graphic Print Tee1.jpg"
      productImages[1] = "/Graphic Print Tee2.jpg"
      productImages[2] = "/Graphic Print Tee3.webp"
      productImages[3] = "/Graphic Print Tee4.avif"
    } else if (product.name === "Slim Fit Suit") {
      productImages[0] = "/Slim Fit Suit 1.jpg"
      productImages[1] = "/Slim Fit Suit2.webp"
      productImages[2] = "/Slim Fit Suit3.webp"
      productImages[3] = "/Slim Fit Suit 4.avif"
    } else if (product.name === "Knitted Sweater") {
      productImages[0] = "/Knitted Sweater1.jpg"
      productImages[1] = "/Knitted Sweater2.webp"
      productImages[2] = "/Knitted Sweater 3.jpg"
      productImages[3] = "/Knitted Sweater 4.jpg"
    } else if (product.name === "Mens Leather Belt") {
      productImages[0] = "/Mens Leather Belt1.webp"
      productImages[1] = "/Mens Leather Belt2.webp"
      productImages[2] = "/Mens Leather Belt 3.jpg"
      productImages[3] = "/Mens Leather Belt 4.webp"
    } else if (product.name === "Leather Tote Bag") {
      productImages[0] = "/Leather Tote Bag1.webp"
      productImages[1] = "/Leather Tote Bag 2.webp"
      productImages[2] = "/Leather Tote Bag3.webp"
      productImages[3] = "/Leather Tote Bag 4.webp"
    } else if (product.name === "Canvas Backpack") {
      productImages[0] = "/Canvas Backpack 1.webp"
      productImages[1] = "/Canvas Backpack 2.jpg"
      productImages[2] = "/Canvas Backpack 3.webp"
      productImages[3] = "/Canvas Backpack4.webp"
    } else if (product.name === "Crossbody Sling Bag") {
      productImages[0] = "/Crossbody Sling Bag 1.webp"
      productImages[1] = "/Crossbody Sling Bag2.webp"
      productImages[2] = "/Crossbody Sling Bag3.webp"
      productImages[3] = "/Crossbody Sling Bag 4.jpg"
    } else if (product.name === "Designer Clutch") {
      productImages[0] = "/Designer Clutch 1.webp"
      productImages[1] = "/Designer Clutch 2.jpg"
      productImages[2] = "/Designer Clutch3.webp"
      productImages[3] = "/Designer Clutch4.webp"
    } else if (product.name === "Laptop Messenger Bag") {
      productImages[0] = "/Laptop Messenger Bag1.webp"
      productImages[1] = "/Laptop Messenger Bag 2.webp"
      productImages[2] = "/Laptop Messenger Bag 3.jpg"
      productImages[3] = "/Laptop Messenger Bag 4.webp"
    } else if (product.name === "Travel Duffel Bag") {
      productImages[0] = "/Travel Duffel Bag1.webp"
      productImages[1] = "/Travel Duffel Bag 2.jpg"
      productImages[2] = "/Travel Duffel Bag3.webp"
      productImages[3] = "/Travel Duffel Bag 4.webp"
    } else if (product.name === "Embroidered Potli Bag") {
      productImages[0] = "/Embroidered Potli Bag 1.jpg"
      productImages[1] = "/Embroidered Potli Bag2.jpg"
      productImages[2] = "/Embroidered Potli Bag 3.jpg"
      productImages[3] = "/Embroidered Potli Bag 4.jpg"
    } else if (product.name === "Mens Leather Wallet") {
      productImages[0] = "/Mens Leather Wallet 1.webp"
      productImages[1] = "/Mens Leather Wallet 2.webp"
      productImages[2] = "/Mens Leather Wallet 3.webp"
      productImages[3] = "/Mens Leather Wallet 4.webp"
    } else if (product.name === "Small Coin Purse") {
      productImages[0] = "/Small Coin Purse 1.jpg"
      productImages[1] = "/Small Coin Purse 2.webp"
      productImages[2] = "/Small Coin Purse3.jpg"
      productImages[3] = "/Small Coin Purse 4.jpg"
    } else if (product.name === "Eco-friendly Jute Bag") {
      productImages[0] = "/Eco-friendly Jute Bag 1.webp"
      productImages[1] = "/Eco-friendly Jute Bag2.webp"
      productImages[2] = "/Eco-friendly Jute Bag 3.webp"
      productImages[3] = "/Eco-friendly Jute Bag 4.jpg"
    }

  const handleAddToCart = () => {
    setIsAdding(true)
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: productImages[0],
      category: product.category,
    })

    setTimeout(() => {
      setIsAdding(false)
      toast.success(`${product.name} added to cart!`, {
        description: "Your item is ready for checkout.",
        action: {
          label: "View Cart",
          onClick: () => (window.location.href = "/cart"),
        },
      })
    }, 400)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="relative aspect-square overflow-hidden rounded-3xl bg-muted group">
          <Image
            src={productImages[currentImageIndex] || "/placeholder.svg"}
            alt={`${product.name} - View ${currentImageIndex + 1}`}
            fill
            className={`object-contain transition-transform duration-500 ${isZoomed ? "scale-150" : "scale-100"}`}
            priority
          />

          {/* Navigation Arrows */}
          <Button
            variant="ghost"
            size="icon"
            onClick={prevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 dark:bg-black/90 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 dark:bg-black/90 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          {/* Zoom Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsZoomed(!isZoomed)}
            className="absolute bottom-2 right-2 h-10 w-10 rounded-full bg-white/90 dark:bg-black/90 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
          >
            <ZoomIn className="h-5 w-5" />
          </Button>

          {/* Image Counter */}
          <div className="absolute bottom-2 left-2 rounded-full bg-black/60 px-3 py-1 text-xs text-white font-medium">
            {currentImageIndex + 1} / {productImages.length}
          </div>
        </div>

        {/* Thumbnail Gallery */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {productImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImageIndex(idx)}
              className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                idx === currentImageIndex
                  ? "border-primary scale-105 shadow-lg"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <Image src={img || "/placeholder.svg"} alt={`Thumbnail ${idx + 1}`} fill className="object-contain" />
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <Button
          size="lg"
          onClick={handleAddToCart}
          disabled={isAdding}
          className="h-14 flex-1 gap-2 rounded-2xl text-base font-semibold active:scale-95 transition-all"
        >
          {isAdding ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Adding...
            </span>
          ) : (
            <>
              <ShoppingCart className="h-5 w-5" />
              Add to Cart
            </>
          )}
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={() => (window.location.href = "/checkout")}
          className="h-14 flex-1 rounded-2xl text-base font-semibold bg-transparent hover:bg-neutral-100"
        >
          Buy Now
        </Button>
      </div>
    </div>
  )
}
