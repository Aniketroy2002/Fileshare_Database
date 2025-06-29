"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Upload, File, ImageIcon, FileText, Music, Video, Presentation, Eye, Sparkles, Shield, Zap } from "lucide-react"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const [files, setFiles] = useState<File[]>([])
  const [folder, setFolder] = useState<string>("")
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const router = useRouter()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files))
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    if (e.dataTransfer.files) {
      setFiles(Array.from(e.dataTransfer.files))
    }
  }

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase()
    switch (extension) {
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return <ImageIcon className="h-6 w-6 text-blue-500" />
      case "pdf":
        return <FileText className="h-6 w-6 text-red-500" />
      case "doc":
      case "docx":
        return <FileText className="h-6 w-6 text-blue-600" />
      case "xls":
      case "xlsx":
        return <FileText className="h-6 w-6 text-green-600" />
      case "mp3":
      case "wav":
      case "flac":
        return <Music className="h-6 w-6 text-purple-500" />
      case "mp4":
      case "avi":
      case "mov":
        return <Video className="h-6 w-6 text-orange-500" />
      case "ppt":
      case "pptx":
        return <Presentation className="h-6 w-6 text-orange-600" />
      default:
        return <File className="h-6 w-6 text-gray-500" />
    }
  }

  const handleUpload = async () => {
    if (files.length === 0 || !folder) {
      alert("Please select files and folder")
      return
    }

    setUploading(true)
    setUploadProgress(0)

    const formData = new FormData()
    files.forEach((file) => {
      formData.append("files", file)
    })
    formData.append("folder", folder)

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        alert("Files uploaded successfully!")
        setFiles([])
        setFolder("")
        setUploadProgress(100)
      } else {
        alert("Upload failed")
      }
    } catch (error) {
      console.error("Upload error:", error)
      alert("Upload failed")
    } finally {
      setUploading(false)
      setTimeout(() => setUploadProgress(0), 2000)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 p-4">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-6 pt-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <Sparkles className="h-5 w-5 text-yellow-400" />
              <span className="text-white/90 text-sm font-medium">Advanced File Storage</span>
            </div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              Anikrypt Pro
            </h1>
            <p className="text-white/70 text-xl max-w-2xl mx-auto leading-relaxed">
              Upload, organize, and manage your files with military-grade security and lightning-fast performance
            </p>
            <Button
              onClick={() => router.push("/auth")}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
            >
              <Eye className="mr-2 h-5 w-5" />
              Access Vault
            </Button>
          </div>

          {/* Upload Card */}
          <Card className="shadow-2xl border-0 bg-white/10 backdrop-blur-xl border border-white/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10"></div>
            <CardHeader className="relative">
              <CardTitle className="flex items-center gap-3 text-white text-2xl">
                <div className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg">
                  <Upload className="h-6 w-6 text-white" />
                </div>
                Upload Files
              </CardTitle>
              <CardDescription className="text-white/70 text-lg">
                Drag & drop or select multiple files to upload to your secure vault
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 relative">
              {/* Drag & Drop Zone */}
              <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className="border-2 border-dashed border-white/30 rounded-xl p-8 text-center hover:border-purple-400 transition-colors duration-300 bg-white/5"
              >
                <Upload className="h-12 w-12 text-white/60 mx-auto mb-4" />
                <p className="text-white/80 mb-2">Drag & drop files here</p>
                <p className="text-white/60 text-sm mb-4">or</p>
                <Input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                  accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx,.xls,.xlsx,.mp3,.wav,.flac,.mp4,.avi,.mov,.ppt,.pptx"
                />
                <Label
                  htmlFor="file-upload"
                  className="cursor-pointer bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 inline-block"
                >
                  Choose Files
                </Label>
              </div>

              {/* Folder Selection */}
              <div className="space-y-2">
                <Label className="text-white font-medium">Destination Vault</Label>
                <Select value={folder} onValueChange={setFolder}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Select vault location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="shared">🌐 Shared Vault</SelectItem>
                    <SelectItem value="personal">🔒 Personal Vault</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* File Preview */}
              {files.length > 0 && (
                <div className="space-y-3">
                  <Label className="text-white font-medium">Selected Files ({files.length})</Label>
                  <div className="max-h-48 overflow-y-auto space-y-2 p-4 bg-black/20 rounded-xl border border-white/10">
                    {files.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-white/10 rounded-lg border border-white/10"
                      >
                        {getFileIcon(file.name)}
                        <span className="text-white text-sm truncate flex-1">{file.name}</span>
                        <span className="text-white/60 text-xs bg-white/10 px-2 py-1 rounded">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Upload Progress */}
              {uploading && (
                <div className="space-y-3">
                  <Label className="text-white font-medium">Upload Progress</Label>
                  <Progress value={uploadProgress} className="w-full h-2" />
                  <p className="text-white/70 text-sm text-center">Uploading files to secure vault...</p>
                </div>
              )}

              {/* Upload Button */}
              <Button
                onClick={handleUpload}
                disabled={uploading || files.length === 0 || !folder}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-xl font-semibold text-lg shadow-xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Uploading to Vault...
                  </>
                ) : (
                  <>
                    <Zap className="mr-2 h-5 w-5" />
                    Upload to Vault
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full w-fit mx-auto mb-4">
                  <Upload className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-white text-lg mb-2">Multi-Format Support</h3>
                <p className="text-white/70 text-sm">
                  Upload images, documents, videos, audio files, and presentations
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full w-fit mx-auto mb-4">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-white text-lg mb-2">Smart Organization</h3>
                <p className="text-white/70 text-sm">Automatic categorization and intelligent file management</p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="p-3 bg-gradient-to-r from-pink-600 to-red-600 rounded-full w-fit mx-auto mb-4">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-white text-lg mb-2">Military-Grade Security</h3>
                <p className="text-white/70 text-sm">Advanced encryption and multi-layer password protection</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
