"use client"

import { useState, useEffect } from "react"
import { Heart, Filter, Grid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navigation } from "@/components/ui/navigation"
import { Footer } from "@/components/ui/footer"
import { useAuth } from "@/contexts/auth-context"
import { WishlistItem } from "@/components/wishlist/wishlist-item"
import { ShareModal } from "@/components/social/share-modal"

export default function WishlistPage() {
  const { user } = useAuth()
  const [wishlistItems, setWishlistItems] = useState<any[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [filter, setFilter] = useState<"all" | "outfits" | "items">("all")
  const [shareModalOpen, setShareModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)

  useEffect(() => {
    if (user) {
      loadWishlist()
    }
  }, [user])

  const loadWishlist = () => {
    // Mock wishlist data - in production, this would come from your database
    const mockWishlist = [
      {
        id: 1,
        type: "outfit",
        name: "Casual Chic Ensemble",
        image: "/casual-chic-outfit.jpg",
        items: ["High-waisted jeans", "Silk blouse", "Blazer", "Ankle boots"],
        colors: ["Navy", "Cream", "Camel"],
        price: 299,
        dateAdded: "2024-01-15",
        category: "Work/Casual",
      },
      {
        id: 2,
        type: "item",
        name: "Emerald Silk Blouse",
        image: "/placeholder.svg?height=300&width=200&text=Emerald+Blouse",
        brand: "Elegant Essentials",
        price: 89,
        dateAdded: "2024-01-12",
        category: "Tops",
      },
      {
        id: 3,
        type: "outfit",
        name: "Weekend Comfort",
        image: "/weekend-casual-dress.jpg",
        items: ["Midi dress", "Denim jacket", "White sneakers", "Crossbody bag"],
        colors: ["Sage green", "Light denim", "White"],
        price: 189,
        dateAdded: "2024-01-10",
        category: "Weekend/Casual",
      },
      {
        id: 4,
        type: "item",
        name: "Statement Gold Earrings",
        image: "/placeholder.svg?height=300&width=200&text=Gold+Earrings",
        brand: "Luxe Accessories",
        price: 45,
        dateAdded: "2024-01-08",
        category: "Accessories",
      },
    ]
    setWishlistItems(mockWishlist)
  }

  const removeFromWishlist = (itemId: number) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== itemId))
  }

  const handleShare = (item: any) => {
    setSelectedItem(item)
    setShareModalOpen(true)
  }

  const filteredItems = wishlistItems.filter((item) => {
    if (filter === "all") return true
    if (filter === "outfits") return item.type === "outfit"
    if (filter === "items") return item.type === "item"
    return true
  })

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Please Sign In</h1>
          <p className="text-muted-foreground mb-8">You need to be signed in to view your wishlist.</p>
          <Button asChild>
            <a href="/login">Sign In</a>
          </Button>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
            <p className="text-muted-foreground">
              {filteredItems.length} {filteredItems.length === 1 ? "item" : "items"} saved
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Filter */}
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="bg-background border border-border rounded px-3 py-1 text-sm"
              >
                <option value="all">All Items</option>
                <option value="outfits">Outfits</option>
                <option value="items">Individual Items</option>
              </select>
            </div>

            {/* View Mode */}
            <div className="flex border border-border rounded">
              <Button variant={viewMode === "grid" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("grid")}>
                <Grid className="h-4 w-4" />
              </Button>
              <Button variant={viewMode === "list" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("list")}>
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {filteredItems.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Your wishlist is empty</h3>
              <p className="text-muted-foreground mb-6">Start adding items you love to keep track of them</p>
              <Button asChild>
                <a href="/ai-stylist">Discover Outfits</a>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
            {filteredItems.map((item) => (
              <WishlistItem
                key={item.id}
                item={item}
                viewMode={viewMode}
                onRemove={removeFromWishlist}
                onShare={handleShare}
              />
            ))}
          </div>
        )}

        {/* Share Modal */}
        {selectedItem && (
          <ShareModal
            isOpen={shareModalOpen}
            onClose={() => {
              setShareModalOpen(false)
              setSelectedItem(null)
            }}
            item={selectedItem}
          />
        )}
      </main>

      <Footer />
    </div>
  )
}
