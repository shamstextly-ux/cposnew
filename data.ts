import type { ActivityLog, Course, CourseModule, Notification, User } from "./types";

export const users: User[] = [
  { id: "u-1", name: "Nadia Rahman", email: "nadia@cpos.local", role: "Super Admin", teamName: "Operations", createdAt: "2026-05-01T08:00:00Z" },
  { id: "u-2", name: "Arif Khan", email: "arif@cpos.local", role: "Admin", teamName: "Course Ops", createdAt: "2026-05-01T08:00:00Z" },
  { id: "u-3", name: "Maya Das", email: "maya@cpos.local", role: "Admin", teamName: "Team Alpha", createdAt: "2026-05-02T08:00:00Z" },
  { id: "u-4", name: "Hasan Ali", email: "hasan@cpos.local", role: "User", teamName: "Team Alpha", createdAt: "2026-05-02T08:00:00Z" },
  { id: "u-5", name: "Lima Akter", email: "lima@cpos.local", role: "User", teamName: "Team Alpha", createdAt: "2026-05-02T08:00:00Z" },
  { id: "u-6", name: "Samira Noor", email: "samira@cpos.local", role: "Admin", teamName: "Team Beta", createdAt: "2026-05-03T08:00:00Z" },
  { id: "u-7", name: "Rafi Ahmed", email: "rafi@cpos.local", role: "User", teamName: "Team Beta", createdAt: "2026-05-03T08:00:00Z" }
];

export const courses: Course[] = [
  { id: "c-1", courseTitle: "Workplace Communication", category: "Business", subcategory: "Soft Skills", assignedTo: "u-4", assignedBy: "u-2", assignedDate: "2026-06-01", dueDate: "2026-06-07", status: "Completed", targetWordCount: 8200, actualWordCount: 8580, resourceCount: 9, completionDate: "2026-06-06", createdAt: "2026-06-01T09:00:00Z", updatedAt: "2026-06-06T15:20:00Z" },
  { id: "c-2", courseTitle: "Excel for Analysts", category: "Software", subcategory: "Productivity", assignedTo: "u-5", assignedBy: "u-3", assignedDate: "2026-06-02", dueDate: "2026-06-09", status: "In Progress", targetWordCount: 11000, actualWordCount: 6400, resourceCount: 14, createdAt: "2026-06-02T09:30:00Z", updatedAt: "2026-06-08T10:30:00Z" },
  { id: "c-3", courseTitle: "Cybersecurity Basics", category: "Technology", subcategory: "Security", assignedTo: "u-7", assignedBy: "u-2", assignedDate: "2026-06-03", dueDate: "2026-06-10", status: "Review", targetWordCount: 9800, actualWordCount: 10150, resourceCount: 11, createdAt: "2026-06-03T11:00:00Z", updatedAt: "2026-06-08T08:30:00Z" },
  { id: "c-4", courseTitle: "Leadership Essentials", category: "Business", subcategory: "Leadership", assignedTo: "u-4", assignedBy: "u-3", assignedDate: "2026-06-05", dueDate: "2026-06-12", status: "Assigned", targetWordCount: 7600, actualWordCount: 0, resourceCount: 6, createdAt: "2026-06-05T13:00:00Z", updatedAt: "2026-06-05T13:00:00Z" },
  { id: "c-5", courseTitle: "Remote Team Management", category: "Business", subcategory: "Management", assignedTo: "u-5", assignedBy: "u-2", assignedDate: "2026-05-29", dueDate: "2026-06-04", status: "Completed", targetWordCount: 9000, actualWordCount: 9340, resourceCount: 8, completionDate: "2026-06-04", createdAt: "2026-05-29T08:00:00Z", updatedAt: "2026-06-04T16:00:00Z" },
  { id: "c-6", courseTitle: "Data Privacy Fundamentals", category: "Compliance", subcategory: "Privacy", assignedTo: "u-7", assignedBy: "u-6", assignedDate: "2026-05-30", dueDate: "2026-06-03", status: "In Progress", targetWordCount: 7000, actualWordCount: 3200, resourceCount: 5, createdAt: "2026-05-30T08:00:00Z", updatedAt: "2026-06-08T11:00:00Z" }
];

export const modules: CourseModule[] = [
  { id: "m-1", courseId: "c-1", moduleNumber: 1, moduleTitle: "Communication Foundations", wordCount: 2860, status: "Completed", completedDate: "2026-06-04", createdAt: "2026-06-01T09:10:00Z" },
  { id: "m-2", courseId: "c-1", moduleNumber: 2, moduleTitle: "Writing Clearly", wordCount: 3010, status: "Completed", completedDate: "2026-06-05", createdAt: "2026-06-01T09:10:00Z" },
  { id: "m-3", courseId: "c-1", moduleNumber: 3, moduleTitle: "Presentation Habits", wordCount: 2670, status: "Completed", completedDate: "2026-06-06", createdAt: "2026-06-01T09:10:00Z" },
  { id: "m-4", courseId: "c-2", moduleNumber: 1, moduleTitle: "Workbook Setup", wordCount: 2200, status: "Completed", completedDate: "2026-06-06", createdAt: "2026-06-02T09:40:00Z" },
  { id: "m-5", courseId: "c-2", moduleNumber: 2, moduleTitle: "Formulas and Logic", wordCount: 3100, status: "Completed", completedDate: "2026-06-08", createdAt: "2026-06-02T09:40:00Z" },
  { id: "m-6", courseId: "c-2", moduleNumber: 3, moduleTitle: "Dashboards", wordCount: 2100, status: "In Progress", createdAt: "2026-06-02T09:40:00Z" },
  { id: "m-7", courseId: "c-3", moduleNumber: 1, moduleTitle: "Security Mindset", wordCount: 3300, status: "Completed", completedDate: "2026-06-06", createdAt: "2026-06-03T11:20:00Z" },
  { id: "m-8", courseId: "c-3", moduleNumber: 2, moduleTitle: "Passwords and Access", wordCount: 3500, status: "Completed", completedDate: "2026-06-07", createdAt: "2026-06-03T11:20:00Z" },
  { id: "m-9", courseId: "c-3", moduleNumber: 3, moduleTitle: "Incident Basics", wordCount: 3350, status: "Completed", completedDate: "2026-06-08", createdAt: "2026-06-03T11:20:00Z" },
  { id: "m-10", courseId: "c-5", moduleNumber: 1, moduleTitle: "Remote Rituals", wordCount: 4600, status: "Completed", completedDate: "2026-06-03", createdAt: "2026-05-29T08:10:00Z" },
  { id: "m-11", courseId: "c-5", moduleNumber: 2, moduleTitle: "Async Management", wordCount: 4740, status: "Completed", completedDate: "2026-06-04", createdAt: "2026-05-29T08:10:00Z" },
  { id: "m-12", courseId: "c-6", moduleNumber: 1, moduleTitle: "Privacy Basics", wordCount: 3200, status: "Completed", completedDate: "2026-06-02", createdAt: "2026-05-30T08:20:00Z" },
  { id: "m-13", courseId: "c-6", moduleNumber: 2, moduleTitle: "Handling Requests", wordCount: 0, status: "In Progress", createdAt: "2026-05-30T08:20:00Z" }
];

export const activityLogs: ActivityLog[] = [
  { id: "a-1", userId: "u-2", courseId: "c-1", action: "Course Assigned", details: { assignee: "u-4" }, createdAt: "2026-06-01T09:00:00Z" },
  { id: "a-2", userId: "u-4", courseId: "c-1", action: "Course Started", details: {}, createdAt: "2026-06-02T09:00:00Z" },
  { id: "a-3", userId: "u-4", courseId: "c-1", action: "Module Completed", details: { moduleId: "m-1", wordCount: 2860 }, createdAt: "2026-06-04T12:00:00Z" },
  { id: "a-4", userId: "u-4", courseId: "c-1", action: "Course Completed", details: { wordCount: 8580 }, createdAt: "2026-06-06T15:20:00Z" },
  { id: "a-5", userId: "u-5", courseId: "c-5", action: "Course Completed", details: { wordCount: 9340 }, createdAt: "2026-06-04T16:00:00Z" },
  { id: "a-6", userId: "u-5", courseId: "c-2", action: "Module Completed", details: { moduleId: "m-5", wordCount: 3100 }, createdAt: "2026-06-08T10:30:00Z" },
  { id: "a-7", userId: "u-7", courseId: "c-3", action: "Module Completed", details: { moduleId: "m-9", wordCount: 3350 }, createdAt: "2026-06-08T08:30:00Z" },
  { id: "a-8", userId: "u-7", courseId: "c-6", action: "Course Started", details: {}, createdAt: "2026-06-01T09:00:00Z" }
];

export const notifications: Notification[] = [
  { id: "n-1", userId: "u-5", title: "Course due tomorrow", body: "Excel for Analysts is due on Jun 9.", type: "due", read: false, createdAt: "2026-06-08T09:00:00Z" },
  { id: "n-2", userId: "u-7", title: "Course overdue", body: "Data Privacy Fundamentals passed its due date.", type: "overdue", read: false, createdAt: "2026-06-08T09:10:00Z" },
  { id: "n-3", userId: "u-2", title: "Course completed", body: "Workplace Communication was completed.", type: "completed", read: true, createdAt: "2026-06-06T15:20:00Z" }
];
