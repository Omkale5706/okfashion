"use client"

import { useState } from "react"
import { X, Copy, Facebook, Twitter, Instagram, MessageCircle, Mail, Link } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  item: any
}

export function ShareModal({ isOpen, onClose, item }: ShareModalProps) {
  const [customMessage, setCustomMessage] = useState("")
  const [shareUrl] = useState(`${window.location.origin}/shared/${item.id}`)
  const { toast } = useToast()

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast({
        title: "Copied to clipboard",
        description: "Link has been copied to your clipboard",
      })
    } catch (error) {
      console.error("Failed to copy:", error)
    }
  }

  const shareToSocial = (platform: string) => {
    const message = customMessage || `Check out this amazing ${item.name} I found on OK Fashion!`
    const url = shareUrl

    let shareLink = ""

    switch (platform) {
      case "facebook":
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(message)}`
        break
      case "twitter":
        shareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(url)}`
        break
      case "instagram":
        // Instagram doesn't support direct URL sharing, so we'll copy to clipboard
        copyToClipboard(`${message} ${url}`)
        toast({
          title: "Ready for Instagram",
          description: "Message copied! Paste it in your Instagram story or post",
        })
        return
      case "whatsapp":
        shareLink = `https://wa.me/?text=${encodeURIComponent(`${message} ${url}`)}`
        break
      case "email":
        shareLink = `mailto:?subject=${encodeURIComponent(`Check out this ${item.name}`)}&body=${encodeURIComponent(`${message}\n\n${url}`)}`
        break
    }

    if (shareLink) {
      window.open(shareLink, "_blank", "width=600,height=400")
    }
  }

  const nativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${item.name} - OK Fashion`,
          text: customMessage || `Check out this amazing ${item.name} I found on OK Fashion!`,
          url: shareUrl,
        })
      } catch (error) {
        console.error("Error sharing:", error)
      }
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Share {item.name}
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Item Preview */}
          <Card>
            <CardContent className="p-4">
              <div className="flex gap-3">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-16 h-20 object-cover rounded"
                />
                <div>
                  <h4 className="font-medium">{item.name}</h4>
                  {item.brand && <p className="text-sm text-muted-foreground">{item.brand}</p>}
                  <p className="text-sm font-semibold">${item.price}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Custom Message */}
          <div>
            <label className="text-sm font-medium mb-2 block">Add a personal message (optional)</label>
            <Textarea
              placeholder={`Check out this amazing ${item.name} I found on OK Fashion!`}
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              rows={3}
            />
          </div>

          {/* Share URL */}
          <div>
            <label className="text-sm font-medium mb-2 block">Share Link</label>
            <div className="flex gap-2">
              <Input value={shareUrl} readOnly />
              <Button variant="outline" size="sm" onClick={() => copyToClipboard(shareUrl)}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Social Media Buttons */}
          <div>
            <label className="text-sm font-medium mb-3 block">Share on social media</label>
            <div className="grid grid-cols-3 gap-3">
              <Button
                variant="outline"
                onClick={() => shareToSocial("facebook")}
                className="flex flex-col gap-1 h-auto py-3"
              >
                <Facebook className="h-5 w-5 text-blue-600" />
                <span className="text-xs">Facebook</span>
              </Button>

              <Button
                variant="outline"
                onClick={() => shareToSocial("twitter")}
                className="flex flex-col gap-1 h-auto py-3"
              >
                <Twitter className="h-5 w-5 text-blue-400" />
                <span className="text-xs">Twitter</span>
              </Button>

              <Button
                variant="outline"
                onClick={() => shareToSocial("instagram")}
                className="flex flex-col gap-1 h-auto py-3"
              >
                <Instagram className="h-5 w-5 text-pink-600" />
                <span className="text-xs">Instagram</span>
              </Button>

              <Button
                variant="outline"
                onClick={() => shareToSocial("whatsapp")}
                className="flex flex-col gap-1 h-auto py-3"
              >
                <MessageCircle className="h-5 w-5 text-green-600" />
                <span className="text-xs">WhatsApp</span>
              </Button>

              <Button
                variant="outline"
                onClick={() => shareToSocial("email")}
                className="flex flex-col gap-1 h-auto py-3"
              >
                <Mail className="h-5 w-5 text-gray-600" />
                <span className="text-xs">Email</span>
              </Button>

              <Button
                variant="outline"
                onClick={() => copyToClipboard(shareUrl)}
                className="flex flex-col gap-1 h-auto py-3"
              >
                <Link className="h-5 w-5 text-gray-600" />
                <span className="text-xs">Copy Link</span>
              </Button>
            </div>
          </div>

          {/* Native Share (if supported) */}
          {navigator.share && (
            <Button onClick={nativeShare} className="w-full">
              Share via Device
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
