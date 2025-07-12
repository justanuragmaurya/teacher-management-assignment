"use client"
import {
  School,
  Users,
  Calendar,
  BookOpen,
  Star,
  ChevronRight,
  CheckCircle,
} from "lucide-react";
import { Button } from "./ui/button"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import MaxWidthContainer from "./maxwidthcontainer"
import { Badge } from "./ui/badge";

export default function LandingPage({session}:{session:any}){
    return(<div className="min-h-screen">
      <section className="py-20 bg-gradient-to-br from-primary/10 via-secondary/5 to-background">
        <MaxWidthContainer>
          <div className="text-center space-y-8">
            <Badge variant="outline" className="mb-4">
              <Star className="w-4 h-4 mr-2" />
              Modern Teacher Management
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Streamline Your
              <span className="text-primary block">Educational Institution</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Efficiently manage teachers, schedules, and qualifications with our
              comprehensive teacher management system. Built for modern
              educational institutions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              {session ? (
                <Link href="/teachers">
                  <Button size="lg" className="min-w-40">
                    Go to Dashboard
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              ) : (
                <Button size="lg" className="min-w-40">
                  Get Started
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              )}
              <Button
                variant="outline"
                size="lg"
                className="min-w-40"
                onClick={() =>
                  window.open(
                    "https://www.example.com/learn-more",
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
              >
                Learn More
              </Button>
            </div>
          </div>
        </MaxWidthContainer>
      </section>

      <section className="py-20">
        <MaxWidthContainer>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Manage Teachers
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform provides all the tools you need to efficiently manage
              your teaching staff and their information in one centralized
              location.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Teacher Profiles</CardTitle>
                <CardDescription>
                  Comprehensive teacher profiles with personal information,
                  qualifications, and contact details.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Availability Tracking</CardTitle>
                <CardDescription>
                  Track teacher availability and schedule management with
                  real-time updates and notifications.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Qualifications</CardTitle>
                <CardDescription>
                  Manage and track teacher qualifications, certifications, and
                  professional development.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <School className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Admin Dashboard</CardTitle>
                <CardDescription>
                  Powerful admin interface for managing all aspects of your
                  teaching staff efficiently.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Role Management</CardTitle>
                <CardDescription>
                  Secure role-based access control ensuring appropriate permissions
                  for different users.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Modern Interface</CardTitle>
                <CardDescription>
                  Clean, intuitive interface with dark mode support and responsive
                  design for all devices.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </MaxWidthContainer>
      </section>

      <section className="py-20 bg-muted/30">
        <MaxWidthContainer>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                100+
              </div>
              <div className="text-muted-foreground">Teachers Managed</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                50+
              </div>
              <div className="text-muted-foreground">Institutions</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                99%
              </div>
              <div className="text-muted-foreground">Uptime</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                24/7
              </div>
              <div className="text-muted-foreground">Support</div>
            </div>
          </div>
        </MaxWidthContainer>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <MaxWidthContainer>
          <div className="text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join hundreds of educational institutions already using our teacher
              management system to streamline their operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {session ? (
                <Link href="/teachers">
                  <Button size="lg" className="min-w-40">
                    Access Dashboard
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              ) : (
                <Button size="lg" className="min-w-40">
                  Start Free Trial
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              )}
              <Button
                variant="outline"
                size="lg"
                className="min-w-40"
                onClick={() =>
                  window.open(
                    "https://www.example.com/contact-sales",
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
              >
                Contact Sales
              </Button>
            </div>
          </div>
        </MaxWidthContainer>
      </section>
    </div>)
}