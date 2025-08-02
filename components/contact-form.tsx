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
      const response = await fetch("https://formspree.io/f/mblkaykl", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
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
    });
  };

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
                disabled={isSubmitting}
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

        {/* Contact Info and Socials */}
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
                <a
                  href="https://in.linkedin.com/in/pranay-talukdar-043a40370"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-700 to-blue-900 flex items-center justify-center hover:from-blue-800 hover:to-blue-950 transition-all duration-300 transform hover:scale-110"
                >
                  <svg
                    className="h-6 w-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11.47 20h-3v-10h3v10zm-1.5-11.26c-.97 0-1.76-.79-1.76-1.76 0-.97.79-1.76 1.76-1.76s1.76.79 1.76 1.76c0 .97-.79 1.76-1.76 1.76zm13.97 11.26h-3v-5.6c0-1.34-.03-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.96v5.7h-3v-10h2.88v1.37h.04c.4-.75 1.36-1.54 2.8-1.54 3 0 3.56 1.98 3.56 4.56v5.61z" />
                  </svg>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
