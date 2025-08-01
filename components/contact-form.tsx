"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, MessageCircle, Send, Github, Twitter, Instagram } from "lucide-react"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<"success" | "error" | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmissionStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmissionStatus("error");
      }
    } catch (error) {
      setSubmissionStatus("error");
    }

    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <Card className="backdrop-blur-md bg-white/5 border border-white/10">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Send us a message</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Your Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400 resize-none"
                  placeholder="Tell us about your cosmic questions, discoveries, or feedback..."
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-pink-600 text-white border-0 py-3 text-lg rounded-xl transition-all duration-300"
              >
                <Send className="mr-2 h-5 w-5" />
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>

              {submissionStatus === "success" && (
                <p className="text-green-400 text-center">Message sent successfully!</p>
              )}
              {submissionStatus === "error" && (
                <p className="text-red-400 text-center">Failed to send message. Please try again later.</p>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <div className="space-y-8">
          <Card className="backdrop-blur-md bg-white/5 border border-white/10">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-teal-600 flex items-center justify-center">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Get in Touch</h2>
              </div>

              <div className="space-y-4 text-gray-300">
                <p className="leading-relaxed">
                  Have questions about the cosmos? Want to share your own astronomical discoveries? We'd love to hear
                  from you and help fuel your curiosity about the universe.
                </p>
                <p className="leading-relaxed">
                  Email us at:{" "}
                  <a href="mailto:pranay@kmrb.tech" className="text-blue-400 hover:underline">
                    pranay@kmrb.tech
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Social Links */}
          <Card className="backdrop-blur-md bg-white/5 border border-white/10">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-white mb-6">Connect With Us</h3>
              <div className="flex gap-4">
                <a
                  href="https://twitter.com/Mystery0527"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-110"
                >
                  <Twitter className="h-6 w-6 text-white" />
                </a>
                <a
                  href="https://github.com/jack00527"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-gradient-to-r from-gray-700 to-gray-800 flex items-center justify-center hover:from-gray-800 hover:to-gray-900 transition-all duration-300 transform hover:scale-110"
                >
                  <Github className="h-6 w-6 text-white" />
                </a>
                <a
                  href="https://instagram.com/Mystery_005"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center hover:from-purple-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-110"
                >
                  <Instagram className="h-6 w-6 text-white" />
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
