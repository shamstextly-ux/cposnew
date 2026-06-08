# Course Production OS

Course Production OS (CPOS) is a Next.js 15 internal application for course task management, team visibility, automatic reporting, notifications, and user administration.

## What is included

- Next.js 15 app router with TypeScript and Tailwind CSS
- shadcn-style reusable UI primitives
- Role-aware dashboards for Super Admin, Admin, and User
- Course task table with start/complete workflow actions
- Course detail panel with module status, activity timeline, and upload drop zone
- Automatic reporting calculations generated from course/module/activity data
- Recharts dashboard charts
- Global search and report filters
- Supabase PostgreSQL schema, RLS policies, reporting views, file metadata table, and seed data

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Supabase setup

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the SQL editor.
3. Create a private Storage bucket named `course-files`.
4. Copy `.env.example` to `.env.local` and fill in the Supabase URL and anon key.
5. Optionally run `supabase/seed.sql` in a local Supabase environment.

## Reporting architecture

Reporting is not stored as manual duplicate data. Daily, weekly, and monthly reports are generated from:

- `courses`
- `modules`
- `activity_logs`

The SQL views in `supabase/schema.sql` provide the first reporting layer. For production, add RPC functions with date/team/member/category/status filters so dashboards can fetch server-filtered aggregates.

## DOCX word count automation

Use Supabase Storage for uploaded DOCX/PDF files and store metadata in `course_files`. A server route or Edge Function should:

1. Receive the uploaded DOCX path.
2. Extract text from the DOCX.
3. Count words.
4. Update `course_files.extracted_word_count`.
5. Update `courses.actual_word_count`.
6. Insert `activity_logs` rows for `File Uploaded` and `Word Count Extracted`.

If extraction fails, set `extraction_status = 'failed'` and allow `manual_word_count_override`.

## Deploy to Vercel

1. Push this app to a Git repository.
2. Import the repository in Vercel.
3. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
4. Run the Supabase schema before deploying.
5. Deploy.

## Phase 2-ready modules

Future modules should live behind feature folders and consume the same typed service layer:

- Leave Management
- Attendance
- Performance Reviews
- Payroll Tracking
- Capacity Planning
- AI Productivity Insights
