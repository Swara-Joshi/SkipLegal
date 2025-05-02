"use client"

import type React from "react"

import { useState } from "react"
import { Upload, File, X, Check, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"

// Mock data for uploaded documents
const initialDocuments = [
  {
    id: 1,
    name: "Birth_Certificate.pdf",
    size: "1.2 MB",
    uploadDate: "2025-04-28",
    status: "verified",
  },
  {
    id: 2,
    name: "Passport_Copy.pdf",
    size: "3.5 MB",
    uploadDate: "2025-04-27",
    status: "verified",
  },
]

type Document = {
  id: number
  name: string
  size: string
  uploadDate: string
  status: "uploading" | "uploaded" | "verified" | "rejected"
  progress?: number
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>(initialDocuments)
  const [dragActive, setDragActive] = useState(false)

  // Handle file drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files)
    }
  }

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files)
    }
  }

  // Process uploaded files
  const handleFiles = (files: FileList) => {
    Array.from(files).forEach((file) => {
      // Create a new document with uploading status
      const newDoc: Document = {
        id: Date.now() + Math.random(),
        name: file.name,
        size: formatFileSize(file.size),
        uploadDate: new Date().toISOString().split("T")[0],
        status: "uploading",
        progress: 0,
      }

      setDocuments((prev) => [...prev, newDoc])

      // Simulate upload progress
      let progress = 0
      const interval = setInterval(() => {
        progress += Math.random() * 20
        if (progress >= 100) {
          progress = 100
          clearInterval(interval)

          // Update document status after "upload" completes
          setTimeout(() => {
            setDocuments((prev) =>
              prev.map((doc) => (doc.id === newDoc.id ? { ...doc, status: "uploaded", progress: undefined } : doc)),
            )
          }, 500)
        }

        // Update progress
        setDocuments((prev) => prev.map((doc) => (doc.id === newDoc.id ? { ...doc, progress } : doc)))
      }, 500)
    })
  }

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i]
  }

  // Remove document
  const removeDocument = (id: number) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id))
  }

  return (
    <div className="container mx-auto max-w-4xl">
      <Card className="border shadow-sm">
        <CardHeader>
          <CardTitle>Document Upload</CardTitle>
          <CardDescription>Upload your Request for Evidence (RFE) documents</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Upload area */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center ${
              dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/20"
            }`}
            onDragOver={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setDragActive(true)
            }}
            onDragLeave={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setDragActive(false)
            }}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Drag and drop your files</h3>
                <p className="text-sm text-muted-foreground">or click to browse from your computer</p>
              </div>
              <input type="file" id="file-upload" className="hidden" multiple onChange={handleFileChange} />
              <Button variant="outline" onClick={() => document.getElementById("file-upload")?.click()}>
                Select Files
              </Button>
            </div>
          </div>

          {/* Document list */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Uploaded Documents</h3>

            {documents.length === 0 ? (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>No documents</AlertTitle>
                <AlertDescription>You haven't uploaded any documents yet.</AlertDescription>
              </Alert>
            ) : (
              <div className="space-y-3">
                {documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center space-x-3">
                      <div className="rounded-md bg-muted p-2">
                        <File className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {doc.size} • Uploaded on {doc.uploadDate}
                        </p>
                        {doc.status === "uploading" && doc.progress !== undefined && (
                          <Progress value={doc.progress} className="h-1 w-24 mt-1" />
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {doc.status === "verified" && (
                        <span className="flex items-center text-xs text-green-600">
                          <Check className="mr-1 h-3 w-3" /> Verified
                        </span>
                      )}
                      {doc.status === "rejected" && (
                        <span className="flex items-center text-xs text-red-600">
                          <AlertCircle className="mr-1 h-3 w-3" /> Rejected
                        </span>
                      )}
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeDocument(doc.id)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
