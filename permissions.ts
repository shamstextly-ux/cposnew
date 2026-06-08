import type { Role } from "./types";

export const roleCapabilities: Record<Role, string[]> = {
  "Super Admin": [
    "Manage everything",
    "Create and edit users",
    "Assign admins",
    "View all reports"
  ],
  Admin: [
    "Create courses",
    "Assign and reassign courses",
    "View all teams",
    "View reports"
  ],
  User: [
    "View assigned tasks",
    "Update progress",
    "Complete modules",
    "Complete courses"
  ]
};

export function canManageUsers(role: Role) {
  return role === "Super Admin";
}

export function canAssignCourses(role: Role) {
  return role === "Super Admin" || role === "Admin";
}

export function canViewAllTeams(role: Role) {
  return role === "Super Admin" || role === "Admin";
}
