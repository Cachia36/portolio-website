"use client"

import React, { useMemo, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Menu,
  X,
  Palette,
  Smartphone,
  Search,
  Settings,
  HeadphonesIcon,
  ExternalLink,
  Mail,
  Phone,
  Star,
  ArrowRight,
  MousePointer,
  Sparkles,
  CheckCircle,
  MessageCircle,
  Linkedin,
  Computer,
  GithubIcon,
} from "lucide-react"
import { Montserrat, Orbitron } from "next/font/google"
const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "600", "700"] })
const orbitron = Orbitron({ subsets: ["latin"], weight: ["600", "700"] })

import Image from "next/image"
import Logo from "@/components/logo"

export default function KylePortfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
  const [visibleSections, setVisibleSections] = useState<string[]>([])
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [bouncing, setBouncing] = useState(true)

  // Stop bouncing after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => setBouncing(false), 3000)
    return () => clearTimeout(timer)
  }, [])
  // Mouse tracking for interactive elements
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Scroll tracking for parallax effects
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => [...prev, entry.target.id])
          }
        })
      },
      { threshold: 0.1 },
    )

    const sections = document.querySelectorAll("section[id]")
    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error("Failed to send email")

      setIsSubmitted(true)
      setFormData({ name: "", email: "", message: "" })

      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("Failed to send message. Please try again later.")
    }
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">

      {/* Animated background gradient */}
      <div
        className="fixed inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(220, 38, 38, 0.3) 0%, transparent 50%)`,
          transition: "background 0.3s ease",
        }}
      />

      {/* Sticky Navigation with glassmorphism */}
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-lg border-b border-red-500/20 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Logo className="animate-pulse" />

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {["home", "services", "personal projects", "Bachelor's Degree", "contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="text-white/80 hover:text-red-400 transition-all duration-300 hover:scale-110 capitalize relative group"
                >
                  {section}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-400 transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-red-400 transition-all duration-300 hover:rotate-180"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden bg-black/90 backdrop-blur-lg border-t border-red-500/20 animate-in slide-in-from-top duration-300">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {["home", "services", "personal projects", "Bachelor's Degree", "contact"].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className="block px-3 py-2 text-white/80 hover:text-red-400 transition-all duration-300 hover:translate-x-2 capitalize"
                  >
                    {section}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section with parallax */}
      <section id="home" className="pt-16 min-h-screen flex items-center relative">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        >
          <div className="absolute top-20 left-10 w-72 h-72 bg-red-500 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
          <div className="absolute top-40 right-10 w-72 h-72 bg-red-600 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-red-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div
              className={`space-y-8 ${visibleSections.includes("home") ? "animate-in slide-in-from-left duration-1000" : "opacity-0"}`}
            >
              <div className="space-y-6">
                <Badge
                  className={`bg-red-500/20 text-red-300 border-red-400/30 hover:bg-red-500/30 transition-all duration-300 hover:scale-105 ${bouncing ? "animate-bounce" : ""
                    }`}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Freelance Web Developer
                </Badge>
                <h1
                  className={`${montserrat.className} text-white leading-tight text-5xl font-semibold`}
                >
                  Web Developer, Video Editor & Technician in Malta – Kyle’s Digital Services.{" "}
                  <span
                    className={`${orbitron.className} text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-500 to-red-600 animate-gradient-x`}
                  >
                    No Limits.
                  </span>
                </h1>

                <p className="text-xl text-gray-300 leading-relaxed">
                  I build responsive, SEO-friendly websites — plus video editing, PC repairs, and custom software solutions for businesses and individuals.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => scrollToSection("contact")}
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-4 text-lg group transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25"
                >
                  Let's Build Your Site
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => scrollToSection("Bachelor's Degree")}
                  className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-red-400"
                >
                  View My Work
                </Button>
              </div>
            </div>
            <div
              className={`relative ${visibleSections.includes("home") ? "animate-in slide-in-from-right duration-1000" : "opacity-0"}`}
            >
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt" />
                <div className="relative bg-black/80 backdrop-blur-xl rounded-2xl p-8 border border-red-500/20">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse" />
                      <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse animation-delay-200" />
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse animation-delay-400" />
                    </div>
                    <div className="space-y-3">
                      <div className="h-4 bg-gradient-to-r from-red-400 to-red-500 rounded w-3/4 animate-pulse" />
                      <div className="h-4 bg-gradient-to-r from-red-500 to-red-600 rounded w-1/2 animate-pulse animation-delay-300" />
                      <div className="h-8 bg-gradient-to-r from-red-500 to-red-600 rounded w-full animate-pulse animation-delay-600" />
                      <div className="grid grid-cols-2 gap-2">
                        <div className="h-16 bg-gradient-to-br from-red-400/20 to-red-500/20 rounded animate-pulse animation-delay-900" />
                        <div className="h-16 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded animate-pulse animation-delay-1200" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section with hover animations */}
      <section id="services" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center space-y-4 mb-16 ${visibleSections.includes("services") ? "animate-in fade-in-50 slide-in-from-bottom duration-1000" : "opacity-0"}`}
          >
            <Badge className="bg-red-500/20 text-red-300 border-red-400/30 hover:bg-red-500/30 transition-all duration-300 hover:scale-105">
              Services
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-bold text-white">Services</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Comprehensive web development services tailored for entrepreneurs, professionals, and businesses
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Palette,
                title: "Custom Design",
                desc: "Tailored to your brand identity",
                color: "red",
              },
              {
                icon: Smartphone,
                title: "Mobile-First",
                desc: "Looks great on any device",
                color: "green",
              },
              {
                icon: HeadphonesIcon,
                title: "Ongoing Support",
                desc: "For updates and maintenance",
                color: "blue",
              },
              {
                icon: Settings,
                title: "Video Editing",
                desc: "Entire video editing solutions",
                color: "blue",
              },
              {
                icon: Search,
                title: "SEO-Optimized",
                desc: "Helps you get found online",
                color: "yellow",
              },
              {
                icon: Computer,
                title: "PC repairs & upgrades",
                desc: "Repair PCs & upgrade existing systems",
                color: "red",
              },
            ].map((service, index) => (
              <Card
                key={index}
                className={`border-0 bg-black/40 backdrop-blur-lg border border-white/10 hover:bg-black/60 transition-all duration-500 transform hover:-translate-y-4 hover:rotate-1 group cursor-pointer ${visibleSections.includes("services") ? "animate-in slide-in-from-bottom duration-1000" : "opacity-0"}`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <CardContent className="p-8 text-center space-y-4">
                  <div
                    className={`w-16 h-16 bg-${service.color}-500/20 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}
                  >
                    <service.icon
                      className={`w-8 h-8 text-${service.color}-400 group-hover:text-${service.color}-300`}
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-white group-hover:text-red-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors">{service.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Personal Projects Section */}
      <section id="personal projects" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center space-y-4 mb-16 ${visibleSections.includes("personal projects")
              ? "animate-in fade-in-50 slide-in-from-bottom duration-1000"
              : "opacity-0"
              }`}
          >
            <Badge className="bg-red-500/20 text-red-300 border-red-400/30 hover:bg-red-500/30 transition-all duration-300 hover:scale-105">
              Coming Soon
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-bold text-white">Personal Projects</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Personal projects I’m currently building to push my skills further. These where created with the intent of
              gaining experience using popular technologies and to learn.<br /><br />
              Independently learning{" "}
              <span className="text-red-400 font-semibold">React.js</span> and{" "}
              <span className="text-red-400 font-semibold">TypeScript</span>, as well as learning <br />
              <span className="text-red-400 font-semibold">JWT-Authentication</span>.
            </p>
          </div>

          {/* Two cards: BetWise + Dummy Project */}
          <div
            className={`grid gap-8 md:grid-cols-2 justify-center ${visibleSections.includes("personal projects")
              ? "animate-in slide-in-from-bottom duration-1000"
              : "opacity-0"
              }`}
          >
            {/* NEW Next.js auth Card */}
            <Card
              className="max-w-xl mx-auto border bg-black/40 backdrop-blur-lg border-white/10 overflow-hidden group cursor-pointer transition-all duration-500 hover:scale-105 hover:-rotate-1"
            >
              {/* Dummy image */}
              <div className="relative h-48 bg-gradient-to-br from-indigo-400 to-pink-600 group-hover:scale-110 transition-transform duration-500">
                <Image
                  src="/nextjs-auth-boilerplate.png?height=200&width=400"
                  alt="Next.js Auth Boilerplate Preview"
                  fill
                  className="object-cover group-hover:opacity-100 transition-transform duration-500"
                />
              </div>

              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl font-semibold text-white group-hover:text-red-300 transition-colors">
                  Next.js Full-Stack Auth Boilerplate
                </h3>
                <p className="text-gray-300">
                  A production-ready full-stack boilerplate built with{" "}
                  <span className="text-red-400 font-semibold">Next.js 14</span> and{" "}
                  <span className="text-red-400 font-semibold">TypeScript</span>, featuring secure authentication, JWT-based sessions, role-based access control, email verification, password resets, and a modular architecture for rapid project startup. Includes a fully set up{" "}
                  <span className="text-red-400 font-semibold">CI workflow, Vitest</span>test suite, and clean folder structure following industry best practices.
                </p>

                <div className="flex flex-wrap gap-2">
                  {["React", "TypeScript", "JWT", "REST API"].map((tag, idx) => (
                    <Badge
                      key={idx}
                      variant="secondary"
                      className="bg-white/10 text-gray-300 hover:bg-white/20 transition-all duration-300 hover:scale-105"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Dummy link button */}
                <a
                  href="https://next-js-authentication-boilerplate.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button
                    variant="outline"
                    className="w-full group/btn border-white/30 text-white hover:bg-white/10 transition-all duration-300 hover:scale-105"
                  >
                    View Project
                    <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                  </Button>
                </a>
              </CardContent>
            </Card>

            {/* BetWise Card */}
            <Card
              className="max-w-xl mx-auto border-0 bg-black/40 backdrop-blur-lg border border-white/10 overflow-hidden group cursor-pointer transition-all duration-500 hover:scale-105 hover:-rotate-1"
            >
              <div className="relative h-48 bg-gradient-to-br from-purple-400 to-purple-600 group-hover:scale-110 transition-transform duration-500">
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  alt="BetWise Preview"
                  fill
                  className="object-cover group-hover:opacity-100 transition-transform duration-500"
                />
              </div>

              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl font-semibold text-white group-hover:text-red-300 transition-colors">
                  BetWise (Work in Progress)
                </h3>
                <p className="text-gray-300">
                  A football betting platform where users can place bets on games. Built with a{" "}
                  <span className="text-red-400 font-semibold">.NET backend</span> and{" "}
                  <span className="text-red-400 font-semibold">microservices architecture</span>. Features include{" "}
                  <span className="text-red-400 font-semibold">3 APIs, a Gateway API, and 3 workers</span>{" "}
                  connected through an <span className="text-red-400 font-semibold">event-driven architecture with RabbitMQ</span>.
                </p>

                <p className="text-gray-400">
                  The <span className="text-green-400 font-medium">frontend will be built in React.js</span>,
                  showcasing my frontend development and UI/UX skills.
                </p>

                <div className="flex flex-wrap gap-2">
                  {[".NET", "Microservices", "RabbitMQ", "Gateway API", "Workers", "React.js"].map((tag, idx) => (
                    <Badge
                      key={idx}
                      variant="secondary"
                      className="bg-white/10 text-gray-300 hover:bg-white/20 transition-all duration-300 hover:scale-105"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Disabled button */}
                <Button
                  variant="outline"
                  disabled
                  className="w-full border-white/30 text-gray-400 cursor-not-allowed"
                >
                  In Development
                </Button>
              </CardContent>
            </Card>

            {/* Portfolio Website Card (CENTERED) */}
            <Card className="md:col-span-2 max-w-xl mx-auto border-0 bg-black/40 backdrop-blur-lg border border-white/10 overflow-hidden group cursor-pointer transition-all duration-500 hover:scale-105 hover:-rotate-1">
              <div className="relative h-48 bg-gradient-to-br from-red-400 to-red-600 group-hover:scale-110 transition-transform duration-500">
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  alt="Kyle Portfolio Website Preview"
                  fill
                  className="object-cover group-hover:opacity-100 transition-transform duration-500"
                />
              </div>

              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl font-semibold text-white group-hover:text-red-300 transition-colors">
                  Portfolio Website (Next.js)
                </h3>

                <p className="text-gray-300">
                  My personal portfolio website built with{" "}
                  <span className="text-red-400 font-semibold">Next.js</span> to showcase my projects, services, and contact
                  flow — focused on performance, SEO, and a clean UI.
                </p>

                <div className="flex flex-wrap gap-2">
                  {["Next.js", "TypeScript", "Tailwind CSS", "SEO"].map((tag, idx) => (
                    <Badge
                      key={idx}
                      variant="secondary"
                      className="bg-white/10 text-gray-300 hover:bg-white/20 transition-all duration-300 hover:scale-105"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Button variant="outline" disabled className="w-full border-white/30 text-gray-400 cursor-not-allowed">
                  In Development
                </Button>
              </CardContent>
            </Card>

          </div>

          {/* More to come message */}
          <p className="text-center text-gray-400 mt-8 italic">More to come...</p>
        </div>
      </section>

      {/* Bachelor's Projects Section with 3D hover effects */}
      <section id="Bachelor's Degree" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center space-y-4 mb-16 ${visibleSections.includes("Bachelor's Degree") ? "animate-in fade-in-50 slide-in-from-bottom duration-1000" : "opacity-0"}`}
          >
            <Badge className="bg-red-500/20 text-red-300 border-red-400/30 hover:bg-red-500/30 transition-all duration-300 hover:scale-105">
              Projects
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-bold text-white">Bachelor's Projects</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Take a look at some of the projects I've built for my Bachelor's degree in software development
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {[
              {
                title: "Carrozza App",
                desc: "Car management platform with manufacturer database, car listings, and salesperson assignments.",
                result: "Increased car management efficiency by 70%",
                tags: ["Laravel", "PostgreSQL", "Bootstrap"],
                gradient: "from-red-400 to-red-600",
                grade: "66/66 (100%)(A*)",
                module_grade: "83/100 (A*)"
              },
              {
                title: "Cloud Ticket App",
                desc: "Cloud helpdesk where users submit tickets with file uploads, and technicians can manage. Built on GCP with serverless processing and secure storage",
                result: "Automated attachment handling and notifications to technicians when a ticket is submitted",
                tags: [".NET MVC", "Cloud Functions", "Cloud Storage (Buckets)", "Redis"],
                gradient: "from-orange-400 to-orange-600",
                grade: "56/56 (100%) (A*)",
                module_grade: "86/100 (A*)"
              },
              {
                title: "CabGo - Microservices Cab Booking",
                desc: "A distributed, event-driven cab booking system built with Microservices Architecture in .NET. Includes location-based fare calculation, real-time weather integration, and discounts on every 3rd booking. Deployed on Microsoft Azure with a Gateway API, RabbitMQ messaging, and multiple microservices for customers, bookings, payments, fares, and locations.",
                result: "Scalable booking platform with event-driven notifications and integrated external APIs",
                tags: [".NET 6/7", "Microservices", "GatewayAPI", "RabbitMQ", "MongoDB Atlas", "Azure", "External APIs"],
                gradient: "from-yellow-400 to-yellow-600",
                grade: "55/61 (90.16%) (A*)",
                module_grade: "79/100 (A*)"
              },
            ].map((project, index, arr) => (
              <Card
                key={index}
                className={`
        border-0 bg-black/40 backdrop-blur-lg border border-white/10 overflow-hidden group cursor-pointer
        transition-all duration-500 hover:scale-105 hover:-rotate-1
        ${visibleSections.includes("Bachelor's Degree") ? "animate-in slide-in-from-bottom duration-1000" : "opacity-0"}
        ${index === arr.length - 1 ? "md:col-span-2 lg:col-span-2 mx-auto max-w-xl" : ""}
      `}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* MEDIA AREA: make Carrozza identical to others */}
                <div className={`relative h-48 bg-gradient-to-br ${project.gradient} group-hover:scale-110 transition-transform duration-500`}>
                  <Image
                    src={project.title === "Carrozza App"
                      ? "/carrozza_app_preview.png"
                      : project.title === "Cloud Ticket App"
                        ? "/cloud_ticket_app_preview.png"
                        : project.title === "CabGo - Microservices Cab Booking"
                          ? "/CabGo_preview.png"
                          : "/placeholder.svg?height=200&width=400"}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:opacity-100 transition-transform duration-500"
                  />
                </div>

                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-semibold text-white group-hover:text-red-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-300">{project.desc}</p>

                  <div className="flex items-center space-x-2 text-red-400">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">{project.result}</span>
                  </div>

                  <div className="space-y-1">
                    <p className="text-green-400 font-medium">Project Grade: {project.grade}</p>
                    <p className="text-gray-400 text-sm">Module Grade: {project.module_grade}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge
                        key={tagIndex}
                        variant="secondary"
                        className="bg-white/10 text-gray-300 hover:bg-white/20 transition-all duration-300 hover:scale-105"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* BUTTON: keep Carrozza linked, others plain */}
                  {project.title === "Carrozza App" ? (
                    <a href="https://carrozzaapp.koyeb.app/" target="_blank" rel="noopener noreferrer" className="block">
                      <Button variant="outline" className="w-full group/btn border-white/30 text-white hover:bg-white/10 transition-all duration-300 hover:scale-105">
                        View Project
                        <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                      </Button>
                    </a>
                  ) : project.title === "Cloud Ticket App" ? (
                    <a href="https://maintenance-page-gray-mu.vercel.app/" target="_blank" rel="noopener noreferrer" className="block">
                      <Button variant="outline" className="w-full group/btn border-white/30 text-white hover:bg-white/10 transition-all duration-300 hover:scale-105">
                        View Project
                        <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                      </Button>
                    </a>
                  ) : project.title === "CabGo - Microservices Cab Booking" ? (
                    <a href="https://cabbookingfrontendkc.azurewebsites.net/" target="_blank" rel="noopener noreferrer" className="block">
                      <Button variant="outline" className="w-full group/btn border-white/30 text-white hover:bg-white/10 transition-all duration-300 hover:scale-105">
                        View Project
                        <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                      </Button>
                    </a>
                  ) : (
                    <Button variant="outline" className="w-full group/btn border-white/30 text-white hover:bg-white/10 transition-all duration-300 hover:scale-105">
                      View Project
                      <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                    </Button>
                  )}

                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section with interactive form */}
      <section id="contact" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center space-y-4 mb-16 ${visibleSections.includes("contact") ? "animate-in fade-in-50 slide-in-from-bottom duration-1000" : "opacity-0"}`}
          >
            <Badge className="bg-red-500/20 text-red-300 border-red-400/30 hover:bg-red-500/30 transition-all duration-300 hover:scale-105">
              Contact
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-bold text-white">Let's Create Something Great Together</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Ready to take your business online? Get in touch and let's discuss your project.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div
              className={`order-2 lg:order-1 space-y-8 ${visibleSections.includes("contact") ? "animate-in slide-in-from-left duration-1000" : "opacity-0"}`}
            >
              <div className="grid grid-cols-2 gap-6 lg:grid-cols-1">
                {[
                  {
                    icon: Mail,
                    title: "Email",
                    value: "kyle@webdev.com",
                    color: "red",
                    href: "mailto:kyle@webdev.com",
                  },
                  {
                    icon: Phone,
                    title: "Phone",
                    value: "+356 79264233",
                    color: "orange",
                    href: "tel:+35679264233"
                  },
                  {
                    icon: MessageCircle,
                    title: "Messenger",
                    value: "Chat on Messenger",
                    color: "blue",
                    href: "https://m.me/@Kyle.Cachia",
                  },
                  {
                    icon: MessageCircle,
                    title: "WhatsApp",
                    value: "Message on WhatsApp",
                    color: "green",
                    href: "https://wa.me/35679264233",
                  },
                  {
                    icon: Linkedin,
                    title: "LinkedIn",
                    value: "Connect on LinkedIn",
                    color: "blue",
                    href: "https://www.linkedin.com/in/kyle-cachia-41bbb8252/",
                  },
                  {
                    icon: GithubIcon,
                    title: "GitHub",
                    value: "GitHub",
                    color: "gray",
                    href: "https://www.github.com/Cachia36",
                  },
                ].map((contact, index) => (
                  <div key={index} className="flex items-center space-x-4 group cursor-pointer">
                    <div className={`w-12 h-12 bg-${contact.color}-500/20 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
                      <contact.icon className={`w-6 h-6 text-${contact.color}-400`} />
                    </div>
                    <div>
                      <p className="font-semibold text-white group-hover:text-red-300 transition-colors">
                        {contact.title}
                      </p>
                      {contact.href ? (
                        <a
                          href={contact.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-300 group-hover:text-gray-200 transition-colors hover:underline"
                        >
                          {contact.value}
                        </a>
                      ) : (
                        <p className="text-gray-300 group-hover:text-gray-200 transition-colors">
                          {contact.value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Card
              className={`order-1 lg:order-2 border-0 bg-black/40 backdrop-blur-lg border border-white/10 ${visibleSections.includes("contact") ? "animate-in slide-in-from-right duration-1000" : "opacity-0"}`}
            >
              <CardContent className="p-8">
                {isSubmitted ? (
                  <div className="text-center space-y-4 py-8">
                    <CheckCircle className="w-16 h-16 text-green-400 mx-auto animate-bounce" />
                    <h3 className="text-2xl font-semibold text-white">Thanks, I'll be in touch soon!</h3>
                    <p className="text-gray-300">Your message has been sent successfully.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        Name
                      </label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your name"
                        required
                        className="bg-black/20 border-white/20 text-white placeholder:text-gray-400 focus:border-red-400 focus:ring-red-400/20 transition-all duration-300 hover:bg-black/30"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                        required
                        className="bg-black/20 border-white/20 text-white placeholder:text-gray-400 focus:border-red-400 focus:ring-red-400/20 transition-all duration-300 hover:bg-black/30"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell me about your project..."
                        rows={4}
                        required
                        className="bg-black/20 border-white/20 text-white placeholder:text-gray-400 focus:border-red-400 focus:ring-red-400/20 transition-all duration-300 hover:bg-black/30"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-3 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25 group"
                    >
                      Send Message
                      <MousePointer className="w-4 h-4 ml-2 group-hover:rotate-12 transition-transform" />
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer with animated elements */}
      <footer className="bg-black/80 backdrop-blur-lg border-t border-red-500/20 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <Logo size="lg" />
            <p className="text-gray-400">
              Freelance Web Developer specializing in custom websites for entrepreneurs, professionals, and businesses
            </p>

            {/* Social Media Links */}
            <div className="flex justify-center space-x-6">
              <a
                href="https://m.me/@Kyle.Cachia"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center hover:bg-blue-500/30 transition-all duration-300 hover:scale-110 group"
                title="Message on Messenger"
              >
                <MessageCircle className="w-5 h-5 text-blue-400 group-hover:text-blue-300" />
              </a>
              <a
                href="https://wa.me/35679264233"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center hover:bg-green-500/30 transition-all duration-300 hover:scale-110 group"
                title="Message on WhatsApp"
              >
                <Phone className="w-5 h-5 text-green-400 group-hover:text-green-300" />
              </a>
              <a
                href="https://www.linkedin.com/in/kyle-cachia-41bbb8252/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-blue-600/20 rounded-full flex items-center justify-center hover:bg-blue-600/30 transition-all duration-300 hover:scale-110 group"
                title="Connect on LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-blue-500 group-hover:text-blue-400" />
              </a>
            </div>

            <div className="border-t border-red-500/20 pt-8">
              <p className="text-gray-500">© {new Date().getFullYear()} Kyle. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
