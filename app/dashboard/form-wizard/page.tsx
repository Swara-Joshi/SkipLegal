"use client"

import type React from "react"

import { useState } from "react"
import { ChevronRight, ChevronLeft, Check, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

// Form steps
const steps = [
  {
    id: "personal-info",
    name: "Personal Information",
    fields: ["firstName", "lastName", "dateOfBirth", "gender", "countryOfBirth"],
  },
  {
    id: "contact-info",
    name: "Contact Information",
    fields: ["email", "phone", "address", "city", "state", "zipCode", "country"],
  },
  {
    id: "immigration-info",
    name: "Immigration Information",
    fields: ["immigrationStatus", "entryDate", "visaType", "petitionerRelationship"],
  },
  {
    id: "additional-info",
    name: "Additional Information",
    fields: ["hasEverBeenDeported", "criminalHistory", "additionalNotes"],
  },
]

export default function FormWizardPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    countryOfBirth: "",

    // Contact Information
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",

    // Immigration Information
    immigrationStatus: "",
    entryDate: "",
    visaType: "",
    petitionerRelationship: "",

    // Additional Information
    hasEverBeenDeported: "",
    criminalHistory: "",
    additionalNotes: "",
  })
  const [isSaving, setIsSaving] = useState(false)

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle select and radio changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Navigate to next step
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    }
  }

  // Navigate to previous step
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  // Submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSaving(false)
      alert("Form submitted successfully! In a real application, this would be sent to a backend server.")
      console.log("Form data:", formData)
    }, 1500)
  }

  // Check if current step is complete
  const isStepComplete = () => {
    const currentFields = steps[currentStep].fields
    return currentFields.every((field) => formData[field as keyof typeof formData])
  }

  // Render form fields based on current step
  const renderFormFields = () => {
    switch (currentStep) {
      case 0: // Personal Information
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Gender</Label>
              <RadioGroup value={formData.gender} onValueChange={(value) => handleSelectChange("gender", value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other">Other</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="countryOfBirth">Country of Birth</Label>
              <Select
                value={formData.countryOfBirth}
                onValueChange={(value) => handleSelectChange("countryOfBirth", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  <SelectItem value="mx">Mexico</SelectItem>
                  <SelectItem value="in">India</SelectItem>
                  <SelectItem value="cn">China</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )
      case 1: // Contact Information
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Street Address</Label>
              <Input id="address" name="address" value={formData.address} onChange={handleChange} required />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" name="city" value={formData.city} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State/Province</Label>
                <Input id="state" name="state" value={formData.state} onChange={handleChange} required />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="zipCode">ZIP/Postal Code</Label>
                <Input id="zipCode" name="zipCode" value={formData.zipCode} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select value={formData.country} onValueChange={(value) => handleSelectChange("country", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="mx">Mexico</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )
      case 2: // Immigration Information
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="immigrationStatus">Current Immigration Status</Label>
              <Select
                value={formData.immigrationStatus}
                onValueChange={(value) => handleSelectChange("immigrationStatus", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="citizen">U.S. Citizen</SelectItem>
                  <SelectItem value="permanent-resident">Permanent Resident</SelectItem>
                  <SelectItem value="visa-holder">Visa Holder</SelectItem>
                  <SelectItem value="asylum">Asylum/Refugee</SelectItem>
                  <SelectItem value="undocumented">Undocumented</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="entryDate">Date of Entry to U.S.</Label>
              <Input
                id="entryDate"
                name="entryDate"
                type="date"
                value={formData.entryDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="visaType">Current Visa Type (if applicable)</Label>
              <Select value={formData.visaType} onValueChange={(value) => handleSelectChange("visaType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select visa type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="b1-b2">B1/B2 (Visitor)</SelectItem>
                  <SelectItem value="f1">F-1 (Student)</SelectItem>
                  <SelectItem value="h1b">H-1B (Work)</SelectItem>
                  <SelectItem value="j1">J-1 (Exchange)</SelectItem>
                  <SelectItem value="l1">L-1 (Transfer)</SelectItem>
                  <SelectItem value="o1">O-1 (Extraordinary Ability)</SelectItem>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="petitionerRelationship">Relationship to Petitioner</Label>
              <Select
                value={formData.petitionerRelationship}
                onValueChange={(value) => handleSelectChange("petitionerRelationship", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select relationship" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="spouse">Spouse</SelectItem>
                  <SelectItem value="parent">Parent</SelectItem>
                  <SelectItem value="child">Child</SelectItem>
                  <SelectItem value="sibling">Sibling</SelectItem>
                  <SelectItem value="employer">Employer</SelectItem>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )
      case 3: // Additional Information
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Have you ever been deported or removed from the U.S.?</Label>
              <RadioGroup
                value={formData.hasEverBeenDeported}
                onValueChange={(value) => handleSelectChange("hasEverBeenDeported", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="deported-yes" />
                  <Label htmlFor="deported-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="deported-no" />
                  <Label htmlFor="deported-no">No</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label>Do you have any criminal history?</Label>
              <RadioGroup
                value={formData.criminalHistory}
                onValueChange={(value) => handleSelectChange("criminalHistory", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="criminal-yes" />
                  <Label htmlFor="criminal-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="criminal-no" />
                  <Label htmlFor="criminal-no">No</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="additionalNotes">Additional Notes or Information</Label>
              <Textarea
                id="additionalNotes"
                name="additionalNotes"
                value={formData.additionalNotes}
                onChange={handleChange}
                placeholder="Please provide any additional information that may be relevant to your case"
                className="h-32"
              />
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto max-w-4xl">
      <Card className="border shadow-sm">
        <CardHeader>
          <CardTitle>Family-Based Green Card Application</CardTitle>
          <CardDescription>Complete the form step by step to prepare your application</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Progress steps */}
          <div className="mb-8">
            <div className="flex justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex flex-col items-center" style={{ width: `${100 / steps.length}%` }}>
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                      index < currentStep
                        ? "border-primary bg-primary text-primary-foreground"
                        : index === currentStep
                          ? "border-primary text-primary"
                          : "border-muted-foreground/30 text-muted-foreground/30"
                    }`}
                  >
                    {index < currentStep ? <Check className="h-5 w-5" /> : <span>{index + 1}</span>}
                  </div>
                  <span
                    className={`mt-2 text-center text-xs ${
                      index <= currentStep ? "text-foreground" : "text-muted-foreground/30"
                    }`}
                  >
                    {step.name}
                  </span>
                </div>
              ))}
            </div>
            <div className="relative mt-2">
              <div className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-muted-foreground/30" />
              <div
                className="absolute left-0 top-1/2 h-0.5 -translate-y-1/2 bg-primary transition-all duration-300 ease-in-out"
                style={{
                  width: `${(currentStep / (steps.length - 1)) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Form fields */}
          <form onSubmit={handleSubmit}>{renderFormFields()}</form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={handlePrevious} disabled={currentStep === 0}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          {currentStep < steps.length - 1 ? (
            <Button type="button" onClick={handleNext} disabled={!isStepComplete()}>
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button type="submit" onClick={handleSubmit} disabled={!isStepComplete() || isSaving}>
              {isSaving ? (
                <>Saving...</>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Submit Application
                </>
              )}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
