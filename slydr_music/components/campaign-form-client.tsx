"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export function CampaignFormClient() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    goalAmount: 1000,
    royaltyPercentage: 15,
    durationDays: 30,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: Number(value) }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In a real implementation, this would call the Solana program to create a campaign
      // For demo purposes, we'll simulate a successful campaign creation
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Campaign created",
        description: "Your funding campaign has been created successfully",
      })

      // Redirect to the artist dashboard
      router.push("/dashboard/artist")
    } catch (error) {
      console.error("Error creating campaign:", error)
      toast({
        title: "Error creating campaign",
        description: "There was an error creating your campaign. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Campaign Title</Label>
        <Input
          id="title"
          placeholder="e.g., New Album: Cosmic Drift"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Campaign Description</Label>
        <Textarea
          id="description"
          placeholder="Describe your project, goals, and how the funds will be used..."
          rows={5}
          value={formData.description}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="goalAmount">Funding Goal (SOL)</Label>
        <Input
          id="goalAmount"
          type="number"
          min="100"
          step="100"
          value={formData.goalAmount}
          onChange={handleNumberInputChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="royaltyPercentage">Royalty Percentage (%)</Label>
        <Input
          id="royaltyPercentage"
          type="number"
          min="1"
          max="50"
          value={formData.royaltyPercentage}
          onChange={handleNumberInputChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="durationDays">Duration (Days)</Label>
        <Input
          id="durationDays"
          type="number"
          min="7"
          max="90"
          value={formData.durationDays}
          onChange={handleNumberInputChange}
          required
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Creating Campaign..." : "Create Campaign"}
      </Button>
    </form>
  )
}
