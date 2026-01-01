"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, MapPin, Clock, ArrowRight, Heart, Zap, Globe, Sparkles } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function CareersPage() {
  const openings = [
    {
      title: "Senior Product Designer",
      department: "Design",
      location: "Remote / Bengaluru",
      type: "Full-time",
      salary: "Competitive"
    },
    {
      title: "Full Stack Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      salary: "Competitive"
    },
    {
      title: "Content Marketing Manager",
      department: "Marketing",
      location: "Mumbai",
      type: "Full-time",
      salary: "Competitive"
    },
    {
      title: "Customer Experience Specialist",
      department: "Operations",
      location: "Remote",
      type: "Full-time",
      salary: "Competitive"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <motion.div 
          initial="initial"
          animate="animate"
          variants={stagger}
          className="max-w-6xl mx-auto"
        >
          {/* Hero Section */}
          <motion.div variants={fadeIn} className="text-center mb-24 space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
              <Sparkles className="h-4 w-4" />
              <span>We're Hiring</span>
            </div>
            <h1 className="text-6xl font-black tracking-tight mb-6">Build the Future of <span className="text-primary italic">Ethical Commerce</span></h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
              Join a team dedicated to preserving traditional craftsmanship through technology and sustainable design. Work with purpose, autonomy, and global impact.
            </p>
          </motion.div>

          {/* Values Section */}
          <motion.div variants={stagger} className="grid md:grid-cols-3 gap-8 mb-32">
            {[
              {
                icon: Heart,
                title: "Purpose Driven",
                desc: "Every line of code and every design choice we make supports real artisans and sustainable practices."
              },
              {
                icon: Zap,
                title: "High Autonomy",
                desc: "We trust our team to own their work. We're a remote-first company that values results over hours."
              },
              {
                icon: Globe,
                title: "Global Impact",
                desc: "Work on a platform that connects traditional heritage with a global audience of conscious consumers."
              }
            ].map((value, i) => (
              <motion.div 
                key={i}
                variants={fadeIn}
                whileHover={{ y: -10 }}
                className="group relative overflow-hidden rounded-[2.5rem] border bg-muted/30 p-10 transition-all duration-500 hover:bg-primary/5 hover:border-primary/20"
              >
                <div className="h-16 w-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Openings Section */}
          <div className="max-w-4xl mx-auto space-y-12">
            <motion.div variants={fadeIn} className="flex items-center gap-6">
              <h2 className="text-4xl font-black tracking-tight">Open Positions</h2>
              <div className="h-px flex-1 bg-muted" />
              <Badge variant="outline" className="rounded-full px-4 py-1 font-bold text-primary border-primary/20">
                {openings.length} Roles
              </Badge>
            </motion.div>
            
            <motion.div variants={stagger} className="grid gap-6">
              {openings.map((job, index) => (
                <motion.div 
                  key={index} 
                  variants={fadeIn}
                  whileHover={{ x: 10 }}
                  className="group flex flex-wrap items-center justify-between p-8 bg-background border rounded-4xl hover:border-primary/50 transition-all cursor-pointer hover:shadow-2xl hover:shadow-primary/5"
                >
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">{job.title}</h3>
                    <div className="flex flex-wrap gap-6 text-sm font-bold uppercase tracking-widest text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-primary" />
                        {job.department}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        {job.type}
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-14 w-14 rounded-2xl group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <ArrowRight className="h-6 w-6" />
                  </Button>
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              variants={fadeIn}
              className="mt-24 p-12 bg-neutral-900 text-white rounded-[3rem] text-center relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -mr-32 -mt-32" />
              
              <div className="relative z-10 space-y-6">
                <h3 className="text-3xl font-bold">Don't see a role for you?</h3>
                <p className="text-neutral-400 text-lg max-w-xl mx-auto">
                  We're always looking for talented individuals who are passionate about our mission. Send us a spontaneous application.
                </p>
                <div className="pt-4">
                  <Button variant="outline" className="h-14 rounded-2xl px-10 text-lg font-bold bg-transparent border-white/20 hover:bg-white/10 text-white transition-all">
                    Send Spontaneous Application
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
