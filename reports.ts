import { courses, modules, users } from "./data";
import type { Course, DateRange } from "./types";
import { daysBetween } from "./utils";

function inRange(date: string | undefined, range: DateRange) {
  if (!date) return false;
  const value = new Date(date).getTime();
  return value >= new Date(range.from).getTime() && value <= new Date(range.to).getTime();
}

export function filterCourses(range: DateRange, team = "All", member = "All", category = "All", status = "All") {
  return courses.filter((course) => {
    const user = users.find((item) => item.id === course.assignedTo);
    return (
      (team === "All" || user?.teamName === team) &&
      (member === "All" || course.assignedTo === member) &&
      (category === "All" || course.category === category) &&
      (status === "All" || course.status === status) &&
      (inRange(course.completionDate, range) || inRange(course.assignedDate, range) || inRange(course.updatedAt, range))
    );
  });
}

export function dailyReport(date: string) {
  const range = { from: date, to: date };
  return reportForRange(range);
}

export function reportForRange(range: DateRange) {
  const completedCourses = courses.filter((course) => inRange(course.completionDate, range));
  const completedModules = modules.filter((module) => inRange(module.completedDate, range));
  const wordCount = completedModules.reduce((sum, module) => sum + module.wordCount, 0);
  const averageWordCount = completedCourses.length ? wordCount / completedCourses.length : 0;
  const completionTimes = completedCourses.map((course) => daysBetween(course.assignedDate, course.completionDate ?? course.assignedDate));
  const averageCompletionTime = completionTimes.length
    ? completionTimes.reduce((sum, item) => sum + item, 0) / completionTimes.length
    : 0;
  const performers = users
    .map((user) => ({
      name: user.name,
      team: user.teamName,
      courses: completedCourses.filter((course) => course.assignedTo === user.id).length,
      modules: completedModules.filter((module) => courseFor(module.courseId)?.assignedTo === user.id).length,
      words: completedModules
        .filter((module) => courseFor(module.courseId)?.assignedTo === user.id)
        .reduce((sum, module) => sum + module.wordCount, 0)
    }))
    .filter((item) => item.courses || item.modules || item.words)
    .sort((a, b) => b.words - a.words);

  return {
    coursesCompleted: completedCourses.length,
    modulesCompleted: completedModules.length,
    totalWordCount: wordCount,
    averageWordCount,
    averageCompletionTime,
    topPerformer: performers[0]?.name ?? "No activity",
    performers
  };
}

export function teamBreakdown() {
  return users
    .filter((user) => user.role === "User")
    .map((user) => {
      const assigned = courses.filter((course) => course.assignedTo === user.id);
      return {
        name: user.name,
        team: user.teamName,
        active: assigned.filter((course) => course.status === "In Progress" || course.status === "Review").length,
        completed: assigned.filter((course) => course.status === "Completed").length,
        words: assigned.reduce((sum, course) => sum + course.actualWordCount, 0)
      };
    });
}

export function categoryBreakdown() {
  const grouped = new Map<string, Course[]>();
  courses.forEach((course) => grouped.set(course.category, [...(grouped.get(course.category) ?? []), course]));
  return [...grouped.entries()].map(([name, items]) => ({
    name,
    courses: items.length,
    words: items.reduce((sum, course) => sum + course.actualWordCount, 0)
  }));
}

export function trendData() {
  return ["Jun 2", "Jun 3", "Jun 4", "Jun 5", "Jun 6", "Jun 7", "Jun 8"].map((label, index) => ({
    date: label,
    courses: [0, 0, 1, 0, 1, 0, 0][index],
    modules: [1, 1, 2, 1, 2, 1, 2][index],
    words: [3200, 4600, 7600, 3010, 6170, 3500, 6450][index]
  }));
}

export function delayedCourses() {
  const today = new Date("2026-06-08").getTime();
  return courses.filter((course) => course.status !== "Completed" && new Date(course.dueDate).getTime() < today);
}

function courseFor(courseId: string) {
  return courses.find((course) => course.id === courseId);
}
