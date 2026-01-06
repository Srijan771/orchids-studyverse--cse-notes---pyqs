"use client"

import { GraduationCap, Instagram, Linkedin, Mail } from "lucide-react"
import Link from "next/link"

export function Footer() {
  const socialLinks = [
    {
      name: "Srijan (Instagram)",
      href: "https://www.instagram.com/srijan.sendry_",
      icon: Instagram,
    },
    {
      name: "Prathvish (Instagram)",
      href: "https://www.instagram.com/__prathvish__",
      icon: Instagram,
    },
    {
      name: "Srijan (LinkedIn)",
      href: "https://www.linkedin.com/in/srijan-sendry-06751921b",
      icon: Linkedin,
    },
    {
      name: "Prathvish (LinkedIn)",
      href: "https://www.linkedin.com/in/prathvish-singh-yadav-788960317",
      icon: Linkedin,
    },
  ]

  const emails = [
    "princesrijan77@gmail.com",
    "prathvishsinghyadavgwl@gmail.com",
  ]

  return (
    <footer className="border-t border-white/10 bg-black py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <GraduationCap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">StudyVerse</span>
            </Link>
            <p className="text-sm text-zinc-400">
              Your one-stop destination for BTech CSE resources. Free notes, smart preparation, and affordable PYQs.
            </p>
          </div>

          {/* Connect */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Connect With Us</h3>
            <div className="flex flex-col gap-2">
              {emails.map((email) => (
                <a
                  key={email}
                  href={`mailto:${email}`}
                  className="flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4" />
                  {email}
                </a>
              ))}
            </div>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-white/5 p-2 text-zinc-400 transition-all hover:bg-white/10 hover:text-white"
                  title={link.name}
                >
                  <link.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Quick Links</h3>
            <div className="grid grid-cols-2 gap-2">
              <Link href="/" className="text-sm text-zinc-400 hover:text-white">Home</Link>
              <Link href="/notes" className="text-sm text-zinc-400 hover:text-white">Free Notes</Link>
              <Link href="/pyqs" className="text-sm text-zinc-400 hover:text-white">PYQ Solutions</Link>
              <Link href="/admin" className="text-sm text-zinc-400 hover:text-white">Admin Panel</Link>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/5 pt-8 text-center">
          <p className="text-xs text-zinc-500">
            © {new Date().getFullYear()} StudyVerse. All rights reserved. Built for BTech CSE Students.
          </p>
        </div>
      </div>
    </footer>
  )
}
