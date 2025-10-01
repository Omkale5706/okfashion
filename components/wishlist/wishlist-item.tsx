"use client"

import { Share2, ShoppingBag, Trash2, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface WishlistItemProps {
  item: any
  viewMode: "grid" | "list"
  onRemove: (itemId: number) => void
  onShare: (item: any) => void
}

export function WishlistItem({ item, viewMode, onRemove, onShare }: WishlistItemProps) {
  if (viewMode === "list") {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-20 h-24 object-cover rounded" />
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  {item.brand && <p className="text-sm text-muted-foreground">{item.brand}</p>}
                </div>
                <Badge variant={item.type === "outfit" ? "default" : "secondary"}>{item.type}</Badge>
              </div>

              {item.items && (
                <div className="mb-2">
                  <p className="text-sm text-muted-foreground">
                    {item.items.slice(0, 2).join(", ")}
                    {item.items.length > 2 && ` +${item.items.length - 2} more`}
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="font-semibold">${item.price}</span>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {new Date(item.dateAdded).toLocaleDateString()}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => onShare(item)}>
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <ShoppingBag className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => onRemove(item.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-64 object-cover" />
        <div className="absolute top-2 right-2 flex gap-1">
          <Button size="sm" variant="secondary" onClick={() => onShare(item)}>
            <Share2 className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="destructive" onClick={() => onRemove(item.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        <Badge className="absolute bottom-2 left-2">{item.type}</Badge>
      </div>

      <CardHeader>
        <CardTitle className="text-lg">{item.name}</CardTitle>
        {item.brand && <p className="text-sm text-muted-foreground">{item.brand}</p>}
      </CardHeader>

      <CardContent className="space-y-4">
        {item.items && (
          <div>
            <h4 className="font-medium mb-2">Items:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              {item.items.slice(0, 3).map((subItem: string, index: number) => (
                <li key={index}>• {subItem}</li>
              ))}
              {item.items.length > 3 && <li className="text-xs">+{item.items.length - 3} more items</li>}
            </ul>
          </div>
        )}

        {item.colors && (
          <div>
            <h4 className="font-medium mb-2">Colors:</h4>
            <div className="flex gap-2">
              {item.colors.map((color: string, index: number) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {color}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold">${item.price}</span>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            {new Date(item.dateAdded).toLocaleDateString()}
          </div>
        </div>

        <Button className="w-full">
          <ShoppingBag className="h-4 w-4 mr-2" />
          Shop Now
        </Button>
      </CardContent>
    </Card>
  )
}
