const courses = [
  ["Workplace Communication", "Hasan Ali", "Completed", "8,580"],
  ["Excel for Analysts", "Lima Akter", "In Progress", "6,400"],
  ["Cybersecurity Basics", "Rafi Ahmed", "Review", "10,150"],
  ["Data Privacy Fundamentals", "Rafi Ahmed", "Overdue", "3,200"]
];

const roleCards = [
  ["Super Admin", "Full system access, users, reports, and settings"],
  ["Admin", "Manage courses, assignments, dashboards, and reports"],
  ["User", "View assigned tasks and update course/module progress"]
];

export default function Home() {
  return (
    <main className="page">
      <aside className="sidebar">
        <div className="brand">
          <div className="logo">CP</div>
          <div>
            <h1>Course Production OS</h1>
            <p>Internal production control</p>
          </div>
        </div>
        <nav>
          <a className="active">Dashboard</a>
          <a>Courses</a>
          <a>Reports</a>
          <a>Users</a>
          <a>Notifications</a>
        </nav>
      </aside>
      <section className="workspace">
        <header>
          <div>
            <p className="eyebrow">Phase 1 live preview</p>
            <h2>Dashboard</h2>
          </div>
          <button>New Course</button>
        </header>

        <div className="filters">
          <input type="date" defaultValue="2026-06-01" />
          <input type="date" defaultValue="2026-06-08" />
          <select><option>All teams</option></select>
          <select><option>All members</option></select>
          <select><option>All status</option></select>
        </div>

        <div className="metrics">
          <Card label="Active Courses" value="3" />
          <Card label="Completed Today" value="2" />
          <Card label="Total Word Count" value="28,330" />
          <Card label="Delayed Courses" value="1" />
        </div>

        <div className="grid">
          <section className="panel">
            <h3>Course Tasks</h3>
            <table>
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Assignee</th>
                  <th>Status</th>
                  <th>Words</th>
                </tr>
              </thead>
              <tbody>
                {courses.map(([course, assignee, status, words]) => (
                  <tr key={course}>
                    <td>{course}</td>
                    <td>{assignee}</td>
                    <td><span className={status === "Completed" ? "badge green" : status === "Overdue" ? "badge red" : "badge"}>{status}</span></td>
                    <td>{words}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="panel">
            <h3>Access Levels</h3>
            <div className="roles">
              {roleCards.map(([role, text]) => (
                <div className="role" key={role}>
                  <strong>{role}</strong>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

function Card({ label, value }: { label: string; value: string }) {
  return (
    <section className="card">
      <p>{label}</p>
      <strong>{value}</strong>
    </section>
  );
}
