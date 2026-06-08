export default function Home() {
  return (
    <main style={{ padding: 40, fontFamily: "Arial, sans-serif" }}>
      <h1>Course Production OS</h1>
      <p>CPOS is live.</p>

      <section style={{ marginTop: 24 }}>
        <h2>Access Levels</h2>
        <ul>
          <li>Super Admin: full access</li>
          <li>Admin: manage courses and reports</li>
          <li>User: view and update assigned tasks</li>
        </ul>
      </section>
    </main>
  );
}
