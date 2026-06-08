export type Role = "Super Admin" | "Admin" | "User";

export type CourseStatus =
  | "Assigned"
  | "In Progress"
  | "Review"
  | "Completed"
  | "On Hold"
  | "Cancelled";

export type ModuleStatus = "Pending" | "In Progress" | "Completed";

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  teamName: string;
  createdAt: string;
};

export type Course = {
  id: string;
  courseTitle: string;
  category: string;
  subcategory: string;
  assignedTo: string;
  assignedBy: string;
  assignedDate: string;
  dueDate: string;
  status: CourseStatus;
  targetWordCount: number;
  actualWordCount: number;
  resourceCount: number;
  completionDate?: string;
  createdAt: string;
  updatedAt: string;
};

export type CourseModule = {
  id: string;
  courseId: string;
  moduleNumber: number;
  moduleTitle: string;
  wordCount: number;
  status: ModuleStatus;
  completedDate?: string;
  createdAt: string;
};

export type ActivityLog = {
  id: string;
  userId: string;
  courseId: string;
  action:
    | "Course Assigned"
    | "Course Started"
    | "Module Completed"
    | "Course Completed"
    | "Course Reassigned"
    | "File Uploaded"
    | "Word Count Extracted";
  details: Record<string, string | number | boolean>;
  createdAt: string;
};

export type Notification = {
  id: string;
  userId: string;
  title: string;
  body: string;
  type: "assignment" | "due" | "overdue" | "completed";
  read: boolean;
  createdAt: string;
};

export type DateRange = {
  from: string;
  to: string;
};
