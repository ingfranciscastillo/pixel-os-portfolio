import resume from "../content/resume.json";

export function MobileShell() {
  return (
    <div className="min-h-screen bg-w95-desktop p-3 text-[14px]">
      <header className="w95-raised bg-w95-bg p-4 mb-3">
        <div className="text-[24px] font-bold">{resume.basics.name}</div>
        <div className="opacity-80">{resume.basics.label}</div>
        <div className="text-[12px] mt-2">📧 {resume.basics.email}</div>
      </header>

      <Section title="Lo_que_aporto.txt">
        <p className="whitespace-pre-line">{resume.basics.summary}</p>
      </Section>

      <Section title="Projects">
        <ul className="space-y-2">
          {resume.projects.map((p) => (
            <li key={p.name} className="w95-sunken bg-white p-2">
              <div className="font-bold">
                {p.name}{" "}
                <span className="opacity-60 text-[11px]">{p.year}</span>
              </div>
              <div>{p.description}</div>
              <div className="flex flex-wrap gap-1 mt-1">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="w95-raised bg-w95-bg px-1 text-[10px]"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex gap-2 mt-1">
                {p.live && (
                  <a className="w95-btn inline-block!" href={p.live}>
                    Live
                  </a>
                )}
                {p.repo && (
                  <a className="w95-btn inline-block!" href={p.repo}>
                    Repo
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Skills">
        {resume.skills.map((s) => (
          <div key={s.name} className="mb-2">
            <div className="font-bold">{s.name}</div>
            {(s.keywords as { name: string; level: number }[]).map((k) => (
              <div key={k.name} className="mb-1">
                <div className="flex justify-between text-[11px]">
                  <span>{k.name}</span>
                  <span>{k.level}%</span>
                </div>
                <div className="w95-sunken bg-white h-2 p-px">
                  <div
                    className="h-full bg-w95-title"
                    style={{ width: `${k.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      </Section>

      <Section title="Resume">
        {resume.work.map((w, i) => (
          <div key={i} className="mb-2">
            <div className="font-bold">
              {w.position} — {w.name}
            </div>
            <div className="text-[11px] italic">
              {w.startDate.slice(0, 7)} →{" "}
              {w.endDate ? w.endDate.slice(0, 7) : "Present"}
            </div>
            <div>{w.summary}</div>
          </div>
        ))}
      </Section>

      <Section title="Contact">
        <div>
          📧{" "}
          <a href={`mailto:${resume.basics.email}`} className="underline">
            {resume.basics.email}
          </a>
        </div>
        {resume.basics.profiles.map((p) => (
          <div key={p.network}>
            🔗{" "}
            <a href={p.url} className="underline">
              {p.network}
            </a>
          </div>
        ))}
      </Section>

      <p className="text-center text-[10px] opacity-70 mt-4 text-white">
        For the full Windows 95 desktop experience, view on a larger screen.
      </p>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w95-raised bg-w95-bg mb-3">
      <div className="w95-titlebar px-2 py-[2px] font-bold text-[12px]">
        {title}
      </div>
      <div className="p-3">{children}</div>
    </div>
  );
}
