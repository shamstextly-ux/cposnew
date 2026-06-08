"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import {
  Bell,
  CheckCircle2,
  ClipboardList,
  FileUp,
  LayoutDashboard,
  Search,
  Shield,
  Timer,
  Upload,
  Users2
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { activityLogs, courses, modules, notifications, users } from "@/lib/data";
import { canAssignCourses, canManageUsers, roleCapabilities } from "@/lib/permissions";
import { categoryBreakdown, delayedCourses, filterCourses, reportForRange, teamBreakdown, trendData } from "@/lib/reports";
import type { Course, CourseStatus, Role } from "@/lib/types";
import { formatDate, formatNumber } from "@/lib/utils";

const currentUser = users[0];
const currentRange = { from: "2026-06-01", to: "2026-06-08" };
const statusColors: Record<CourseStatus, "blue" | "green" | "amber" | "red" | "slate"> = {
  Assigned: "blue",
  "In Progress": "amber",
  Review: "blue",
  Completed: "green",
  "On Hold": "slate",
  Cancelled: "red"
};
const navItems: { label: string; icon: LucideIcon }[] = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Courses", icon: ClipboardList },
  { label: "Reports", icon: Timer },
  { label: "Users", icon: Users2 },
  { label: "Notifications", icon: Bell }
];

export function AppShell() {
  const [activeView, setActiveView] = useState("Dashboard");
  const [role, setRole] = useState<Role>(currentUser.role);
  const [query, setQuery] = useState("");
  const [team, setTeam] = useState("All");
  const [member, setMember] = useState("All");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");

  const visibleCourses = useMemo(() => {
    return filterCourses(currentRange, team, member, category, status).filter((course) => {
      const assignee = users.find((user) => user.id === course.assignedTo)?.name ?? "";
      const value = `${course.courseTitle} ${course.category} ${assignee} ${course.status}`.toLowerCase();
      return value.includes(query.toLowerCase());
    });
  }, [category, member, query, status, team]);

  const report = reportForRange(currentRange);
  const teams = ["All", ...new Set(users.map((user) => user.teamName))];
  const categories = ["All", ...new Set(courses.map((course) => course.category))];
  const statuses = ["All", "Assigned", "In Progress", "Review", "Completed", "On Hold", "Cancelled"];
  const teamMembers = ["All", ...users.filter((user) => user.role === "User").map((user) => user.id)];

  return (
    <div className="min-h-screen bg-slate-50">
      <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r border-slate-200 bg-white px-4 py-5 lg:block">
        <div className="flex items-center gap-3">
          <div className="grid size-10 place-items-center rounded-md bg-blue-600 text-sm font-bold text-white">CP</div>
          <div>
            <h1 className="text-base font-semibold text-slate-950">Course Production OS</h1>
            <p className="text-xs text-slate-500">Internal production control</p>
          </div>
        </div>
        <nav className="mt-8 grid gap-1">
          {navItems.map(({ label, icon: Icon }) => (
            <button
              key={label}
              onClick={() => setActiveView(label)}
              className={`flex h-10 items-center gap-3 rounded-md px-3 text-left text-sm ${
                activeView === label ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Icon className="size-4" />
              {label}
            </button>
          ))}
        </nav>
        <div className="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            <Shield className="size-4 text-blue-600" />
            Role preview
          </div>
          <Select className="mt-3 w-full" value={role} onChange={(event) => setRole(event.target.value as Role)}>
            {Object.keys(roleCapabilities).map((item) => (
              <option key={item}>{item}</option>
            ))}
          </Select>
        </div>
      </aside>

      <main className="lg:pl-64">
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur lg:px-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-medium uppercase text-blue-600">Phase 1 workspace</p>
              <h2 className="text-xl font-semibold text-slate-950">{activeView}</h2>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-3 size-4 text-slate-400" />
                <Input value={query} onChange={(event) => setQuery(event.target.value)} className="pl-9" placeholder="Search courses, users, status" />
              </div>
              <Button variant="secondary" size="icon" title="Notifications">
                <Bell className="size-4" />
              </Button>
              <Button size="sm">
                <ClipboardList className="size-4" />
                New Course
              </Button>
            </div>
          </div>
        </header>

        <div className="space-y-5 p-4 lg:p-6">
          <FilterBar team={team} setTeam={setTeam} member={member} setMember={setMember} category={category} setCategory={setCategory} status={status} setStatus={setStatus} teams={teams} teamMembers={teamMembers} categories={categories} statuses={statuses} />
          {activeView === "Dashboard" && <Dashboard role={role} report={report} visibleCourses={visibleCourses} />}
          {activeView === "Courses" && <CoursesView courses={visibleCourses} role={role} />}
          {activeView === "Reports" && <ReportsView report={report} />}
          {activeView === "Users" && <UsersView role={role} />}
          {activeView === "Notifications" && <NotificationsView />}
        </div>
      </main>
    </div>
  );
}

function FilterBar(props: {
  team: string;
  setTeam: (value: string) => void;
  member: string;
  setMember: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  status: string;
  setStatus: (value: string) => void;
  teams: string[];
  teamMembers: string[];
  categories: string[];
  statuses: string[];
}) {
  return (
    <div className="grid gap-2 rounded-lg border border-slate-200 bg-white p-3 md:grid-cols-5">
      <Input type="date" defaultValue="2026-06-01" />
      <Input type="date" defaultValue="2026-06-08" />
      <Select value={props.team} onChange={(event) => props.setTeam(event.target.value)}>
        {props.teams.map((item) => <option key={item}>{item}</option>)}
      </Select>
      <Select value={props.member} onChange={(event) => props.setMember(event.target.value)}>
        {props.teamMembers.map((id) => <option key={id} value={id}>{id === "All" ? "All members" : users.find((user) => user.id === id)?.name}</option>)}
      </Select>
      <Select value={props.status} onChange={(event) => props.setStatus(event.target.value)}>
        {props.statuses.map((item) => <option key={item}>{item}</option>)}
      </Select>
      <Select className="md:col-start-5" value={props.category} onChange={(event) => props.setCategory(event.target.value)}>
        {props.categories.map((item) => <option key={item}>{item}</option>)}
      </Select>
    </div>
  );
}

function Dashboard({ role, report, visibleCourses }: { role: Role; report: ReturnType<typeof reportForRange>; visibleCourses: Course[] }) {
  const delayed = delayedCourses();
  const cards: { label: string; value: string | number; icon: LucideIcon }[] = [
    { label: "Active Courses", value: visibleCourses.filter((course) => course.status === "In Progress" || course.status === "Review").length, icon: ClipboardList },
    { label: "Completed Today", value: report.coursesCompleted, icon: CheckCircle2 },
    { label: "Total Word Count", value: formatNumber(report.totalWordCount), icon: FileUp },
    { label: "Delayed Courses", value: delayed.length, icon: Timer }
  ];

  return (
    <div className="space-y-5">
      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ label, value, icon: Icon }) => (
          <Card key={label}>
            <CardContent className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">{label}</p>
                <p className="mt-1 text-2xl font-semibold text-slate-950">{value}</p>
              </div>
              <div className="grid size-10 place-items-center rounded-md bg-blue-50 text-blue-600">
                <Icon className="size-5" />
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader><CardTitle>{role === "User" ? "My Output Trend" : "Production Trend"}</CardTitle></CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="words" stroke="#2563eb" fill="#dbeafe" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Course Status Distribution</CardTitle></CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={statusDistribution()} dataKey="value" nameKey="name" innerRadius={50} outerRadius={88}>
                  {statusDistribution().map((_, index) => <Cell key={index} fill={["#2563eb", "#f59e0b", "#10b981", "#64748b"][index % 4]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-5 xl:grid-cols-2">
        <RankingTable />
        <DelayedTable />
      </section>
    </div>
  );
}

function CoursesView({ courses: courseList, role }: { courses: Course[]; role: Role }) {
  const selected = courseList[0] ?? courses[0];
  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Course Tasks</CardTitle>
          {canAssignCourses(role) && <Button size="sm"><ClipboardList className="size-4" /> Assign</Button>}
        </CardHeader>
        <CardContent className="overflow-x-auto p-0">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="border-b border-slate-100 bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">Course</th>
                <th className="px-4 py-3">Assignee</th>
                <th className="px-4 py-3">Due</th>
                <th className="px-4 py-3">Progress</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courseList.map((course) => {
                const courseModules = modules.filter((item) => item.courseId === course.id);
                const done = courseModules.filter((item) => item.status === "Completed").length;
                return (
                  <tr key={course.id} className="border-b border-slate-100">
                    <td className="px-4 py-3">
                      <p className="font-medium text-slate-950">{course.courseTitle}</p>
                      <p className="text-xs text-slate-500">{course.category} / {course.subcategory}</p>
                    </td>
                    <td className="px-4 py-3">{users.find((user) => user.id === course.assignedTo)?.name}</td>
                    <td className="px-4 py-3">{formatDate(course.dueDate)}</td>
                    <td className="px-4 py-3">{done}/{courseModules.length} modules</td>
                    <td className="px-4 py-3"><Badge label={course.status} tone={statusColors[course.status]} /></td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        {course.status === "Assigned" && <Button variant="secondary" size="sm">Start</Button>}
                        <Button size="sm">Complete</Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>
      <CourseDetail course={selected} />
    </div>
  );
}

function CourseDetail({ course }: { course: Course }) {
  const courseModules = modules.filter((item) => item.courseId === course.id);
  const timeline = activityLogs.filter((log) => log.courseId === course.id);
  return (
    <Card>
      <CardHeader><CardTitle>{course.courseTitle}</CardTitle></CardHeader>
      <CardContent className="space-y-5">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <Info label="Assigned" value={users.find((user) => user.id === course.assignedTo)?.name ?? ""} />
          <Info label="Due date" value={formatDate(course.dueDate)} />
          <Info label="Target words" value={formatNumber(course.targetWordCount)} />
          <Info label="Actual words" value={formatNumber(course.actualWordCount)} />
        </div>
        <div>
          <div className="mb-2 flex items-center justify-between">
            <h4 className="text-sm font-semibold text-slate-950">Modules</h4>
            <Button variant="secondary" size="sm"><CheckCircle2 className="size-4" /> Complete Module</Button>
          </div>
          <div className="space-y-2">
            {courseModules.map((item) => (
              <div key={item.id} className="flex items-center justify-between rounded-md border border-slate-200 px-3 py-2 text-sm">
                <span>{item.moduleNumber}. {item.moduleTitle}</span>
                <Badge label={item.status} tone={item.status === "Completed" ? "green" : item.status === "In Progress" ? "amber" : "slate"} />
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="mb-2 text-sm font-semibold text-slate-950">Activity Timeline</h4>
          <div className="space-y-3 border-l border-slate-200 pl-4">
            {timeline.map((item) => (
              <div key={item.id} className="relative text-sm">
                <span className="absolute -left-[21px] top-1 size-2 rounded-full bg-blue-600" />
                <p className="font-medium text-slate-900">{item.action}</p>
                <p className="text-xs text-slate-500">{formatDate(item.createdAt)}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-dashed border-slate-300 p-4 text-center">
          <Upload className="mx-auto size-5 text-blue-600" />
          <p className="mt-2 text-sm font-medium text-slate-900">Upload DOCX or PDF</p>
          <p className="text-xs text-slate-500">DOCX word count is extracted and saved automatically.</p>
        </div>
      </CardContent>
    </Card>
  );
}

function ReportsView({ report }: { report: ReturnType<typeof reportForRange> }) {
  return (
    <div className="space-y-5">
      <section className="grid gap-3 md:grid-cols-5">
        <Metric label="Courses Completed" value={report.coursesCompleted} />
        <Metric label="Modules Completed" value={report.modulesCompleted} />
        <Metric label="Total Word Count" value={formatNumber(report.totalWordCount)} />
        <Metric label="Avg Words/Course" value={formatNumber(report.averageWordCount)} />
        <Metric label="Top Performer" value={report.topPerformer} />
      </section>
      <section className="grid gap-5 xl:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Team-wise Breakdown</CardTitle></CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={teamBreakdown()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip />
                <Bar dataKey="words" fill="#2563eb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Category Breakdown</CardTitle></CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryBreakdown()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip />
                <Bar dataKey="courses" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function UsersView({ role }: { role: Role }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>User Management</CardTitle>
        {canManageUsers(role) && <Button size="sm"><Users2 className="size-4" /> Create User</Button>}
      </CardHeader>
      <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {users.map((user) => (
          <div key={user.id} className="rounded-lg border border-slate-200 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium text-slate-950">{user.name}</p>
                <p className="text-sm text-slate-500">{user.email}</p>
              </div>
              <Badge label={user.role} tone={user.role === "Super Admin" ? "blue" : "slate"} />
            </div>
            <p className="mt-3 text-sm text-slate-600">{user.teamName}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function NotificationsView() {
  return (
    <Card>
      <CardHeader><CardTitle>Notification Bell</CardTitle></CardHeader>
      <CardContent className="space-y-3">
        {notifications.map((item) => (
          <div key={item.id} className="flex items-start justify-between gap-3 rounded-lg border border-slate-200 p-4">
            <div>
              <p className="font-medium text-slate-950">{item.title}</p>
              <p className="text-sm text-slate-500">{item.body}</p>
            </div>
            <Badge label={item.read ? "Read" : "New"} tone={item.read ? "slate" : "blue"} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function RankingTable() {
  return (
    <Card>
      <CardHeader><CardTitle>Productivity Ranking</CardTitle></CardHeader>
      <CardContent className="space-y-2">
        {teamBreakdown().sort((a, b) => b.words - a.words).map((item, index) => (
          <div key={item.name} className="flex items-center justify-between rounded-md border border-slate-100 px-3 py-2 text-sm">
            <span>{index + 1}. {item.name}</span>
            <span className="font-medium text-slate-950">{formatNumber(item.words)} words</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function DelayedTable() {
  return (
    <Card>
      <CardHeader><CardTitle>Delayed Courses</CardTitle></CardHeader>
      <CardContent className="space-y-2">
        {delayedCourses().map((course) => (
          <div key={course.id} className="flex items-center justify-between rounded-md border border-slate-100 px-3 py-2 text-sm">
            <span>{course.courseTitle}</span>
            <Badge label={formatDate(course.dueDate)} tone="red" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <Card>
      <CardContent>
        <p className="text-sm text-slate-500">{label}</p>
        <p className="mt-1 text-xl font-semibold text-slate-950">{value}</p>
      </CardContent>
    </Card>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-slate-50 p-3">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-1 font-medium text-slate-950">{value}</p>
    </div>
  );
}

function statusDistribution() {
  return statusesFromCourses().map(([name, value]) => ({ name, value }));
}

function statusesFromCourses(): [CourseStatus, number][] {
  return (["Assigned", "In Progress", "Review", "Completed", "On Hold", "Cancelled"] as CourseStatus[])
    .map((status) => [status, courses.filter((course) => course.status === status).length])
    .filter(([, value]) => value > 0);
}
