"use client"

import { useState } from "react"
import { Users, Crown, Sparkles, Calendar, Target, Shield, ChevronDown, ChevronUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const communityGroups = [
  {
    title: "WE Acharya",
    subtitle: "Women Empowerment",
    description: "Dedicated to empowering women through education, skill development, and community support. Building strong, independent women leaders.",
    leaders: ["Smt. Padmavathi", "Smt. Lakshmi Devi"],
    icon: Sparkles,
    color: "from-pink-500/20 to-primary/20",
  },
  {
    title: "Acharya Parampara",
    subtitle: "50+ Legacy",
    description: "Honoring our elders and their wisdom. A platform for senior members to share experiences and guide the younger generation.",
    leaders: ["Sri Venkateshwara Rao", "Sri Krishna Murthy"],
    icon: Crown,
    color: "from-primary/30 to-amber-500/20",
  },
  {
    title: "Young Leaders",
    subtitle: "18-50 Youth",
    description: "Nurturing the next generation of community leaders through mentorship, networking, and skill development programs.",
    leaders: ["Sri Aditya Kumar", "Smt. Priya Sharma"],
    icon: Users,
    color: "from-emerald-500/20 to-primary/20",
  },
]

const membershipTypes = [
  {
    type: "Ordinary Membership",
    individual: "₹1,000/year",
    family: "₹2,500/year",
    votingRights: true,
    features: ["Community access", "Event participation", "Newsletter subscription"],
  },
  {
    type: "Life Membership",
    individual: "₹10,000",
    family: "₹25,000",
    votingRights: true,
    features: ["All ordinary benefits", "Lifetime access", "Priority seating", "Recognition on website"],
  },
]

const governanceSchedule = [
  { week: "1st Saturday", meeting: "Core Committee Meeting", description: "Strategic planning and governance" },
  { week: "2nd Saturday", meeting: "WE Acharya Meet", description: "Women empowerment initiatives" },
  { week: "3rd Saturday", meeting: "Parampara Session", description: "Elder guidance and heritage preservation" },
  { week: "4th Saturday", meeting: "Young Leaders Forum", description: "Youth development and innovation" },
]

const programs = [
  { name: "Women Mela", category: "Empowerment", status: "Quarterly" },
  { name: "Digital Sessions", category: "Education", status: "Weekly" },
  { name: "Hanuman Chalisa", category: "Spiritual", status: "Monthly" },
]

interface ExpandableSectionProps {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
  defaultOpen?: boolean
}

function ExpandableSection({ title, icon, children, defaultOpen = false }: ExpandableSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="bg-card border border-secondary/10 rounded-xl overflow-hidden shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="text-primary">{icon}</div>
          <span className="font-serif text-lg text-foreground">{title}</span>
        </div>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-primary" />
        ) : (
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        )}
      </button>
      <div
        className={cn(
          "transition-all duration-300 overflow-hidden",
          isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-6 pb-6">{children}</div>
      </div>
    </div>
  )
}

export function CircularSection() {
  return (
    <section id="circular" className="py-24 bg-muted/30 relative">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-primary/50 text-primary bg-primary/5">
            Official Circular
          </Badge>
          <h2 className="font-serif text-4xl md:text-5xl text-secondary mb-4 text-balance">
            ACHARYA Community
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Strengthening Community | Structured Engagement | Inclusive Growth
          </p>
          <div className="h-1 w-24 mx-auto mt-6 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full" />
        </div>

        {/* Community Groups */}
        <ExpandableSection
          title="Exclusive Community Groups"
          icon={<Users className="h-5 w-5" />}
          defaultOpen={true}
        >
          <div className="grid md:grid-cols-3 gap-6">
            {communityGroups.map((group) => (
              <Card
                key={group.title}
                className="bg-background border-secondary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-md group"
              >
                <CardHeader>
                  <div className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center mb-4 bg-gradient-to-br",
                    group.color
                  )}>
                    <group.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="font-serif text-xl text-secondary group-hover:text-primary transition-colors">
                    {group.title}
                  </CardTitle>
                  <CardDescription className="text-primary/80">{group.subtitle}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4">{group.description}</p>
                  <div className="pt-4 border-t border-secondary/10">
                    <p className="text-xs text-muted-foreground/70 mb-2">Leadership</p>
                    <div className="flex flex-wrap gap-2">
                      {group.leaders.map((leader) => (
                        <Badge key={leader} variant="secondary" className="bg-secondary/10 text-secondary text-xs">
                          {leader}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ExpandableSection>

        {/* Participation & Growth Path */}
        <div className="mt-8">
          <ExpandableSection
            title="Participation & Growth Path"
            icon={<Target className="h-5 w-5" />}
          >
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-serif shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-medium text-secondary">Register as Member</h4>
                  <p className="text-sm text-muted-foreground">Join the community by completing membership registration</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-serif shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-medium text-secondary">Join a Community Group</h4>
                  <p className="text-sm text-muted-foreground">Select a group based on your interests and demographics</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-serif shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-medium text-secondary">Participate in Events</h4>
                  <p className="text-sm text-muted-foreground">Attend meetings, workshops, and cultural programs</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-serif shrink-0">
                  4
                </div>
                <div>
                  <h4 className="font-medium text-secondary">Take Leadership Roles</h4>
                  <p className="text-sm text-muted-foreground">Progress to organizing events and guiding initiatives</p>
                </div>
              </div>
            </div>
          </ExpandableSection>
        </div>

        {/* Membership Structure */}
        <div className="mt-8">
          <ExpandableSection
            title="Membership Structure"
            icon={<Shield className="h-5 w-5" />}
          >
            <div className="grid md:grid-cols-2 gap-6">
              {membershipTypes.map((membership) => (
                <Card
                  key={membership.type}
                  className="bg-background border-secondary/10 hover:border-primary/30 transition-all duration-300"
                >
                  <CardHeader>
                    <CardTitle className="font-serif text-xl text-secondary">{membership.type}</CardTitle>
                    <div className="flex gap-4 mt-2">
                      <div>
                        <p className="text-xs text-muted-foreground">Individual</p>
                        <p className="text-lg font-semibold text-primary">{membership.individual}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Family</p>
                        <p className="text-lg font-semibold text-primary">{membership.family}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {membership.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    {membership.votingRights && (
                      <Badge variant="outline" className="mt-4 border-primary/50 text-primary bg-primary/5">
                        Voting Rights Included
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Patron Membership */}
            <div className="mt-6">
              <Card className="bg-gradient-to-br from-primary/10 to-amber-500/10 border-primary/30 saffron-glow-sm">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Crown className="h-6 w-6 text-primary" />
                    <CardTitle className="font-serif text-2xl text-primary">Patron Membership</CardTitle>
                  </div>
                  <CardDescription className="text-secondary/80">
                    Premium tier for dedicated supporters committed to infrastructure development
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Patron members contribute significantly to the construction and maintenance of community
                    infrastructure, including the cultural centre, educational facilities, and community halls.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <div className="px-4 py-2 rounded-lg bg-primary/10 border border-primary/20">
                      <p className="text-xs text-muted-foreground">Starting from</p>
                      <p className="text-xl font-serif text-primary">₹1,00,000</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      Named recognition on infrastructure
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      VIP access to all events
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </ExpandableSection>
        </div>

        {/* Governance Framework */}
        <div className="mt-8">
          <ExpandableSection
            title="Governance Framework"
            icon={<Calendar className="h-5 w-5" />}
          >
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {governanceSchedule.map((item, index) => (
                <div
                  key={item.week}
                  className="p-4 rounded-lg bg-background border border-secondary/10 hover:border-primary/30 transition-all duration-300"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-semibold">
                      {index + 1}
                    </div>
                    <span className="text-xs text-primary">{item.week}</span>
                  </div>
                  <h4 className="font-medium text-secondary text-sm mb-1">{item.meeting}</h4>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </ExpandableSection>
        </div>

        {/* Program Execution */}
        <div className="mt-8">
          <ExpandableSection
            title="Program Execution"
            icon={<Sparkles className="h-5 w-5" />}
          >
            <div className="space-y-6">
              <div className="grid sm:grid-cols-3 gap-4">
                {programs.map((program) => (
                  <div
                    key={program.name}
                    className="p-4 rounded-lg bg-background border border-secondary/10 hover:border-primary/30 transition-all duration-300 flex items-center justify-between"
                  >
                    <div>
                      <h4 className="font-medium text-secondary">{program.name}</h4>
                      <p className="text-xs text-muted-foreground">{program.category}</p>
                    </div>
                    <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                      {program.status}
                    </Badge>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-lg bg-background border border-secondary/10">
                <p className="text-sm text-muted-foreground mb-3">Reporting Structure for Each Program:</p>
                <div className="flex flex-wrap gap-3">
                  {["Budget", "Spend", "Outcomes", "Learnings"].map((item) => (
                    <div key={item} className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ExpandableSection>
        </div>

        {/* Core Objective & Principle */}
        <div className="mt-16 text-center">
          <div className="bg-card border border-secondary/10 rounded-2xl p-8 md:p-12 max-w-3xl mx-auto shadow-lg">
            <Target className="h-8 w-8 text-primary mx-auto mb-4" />
            <h3 className="font-serif text-2xl text-secondary mb-4">Core Objective</h3>
            <p className="text-muted-foreground leading-relaxed">
              To foster a unified community where every member, regardless of age or gender, 
              contributes to collective growth through structured participation, 
              transparent governance, and values-driven initiatives.
            </p>
          </div>

          <div className="mt-8 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 bg-radial-saffron opacity-50" />
            </div>
            <blockquote className="relative font-serif text-xl md:text-2xl text-primary italic max-w-2xl mx-auto">
              &ldquo;Inclusiveness with Purpose | Participation with Responsibility | Growth with Values&rdquo;
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  )
}
