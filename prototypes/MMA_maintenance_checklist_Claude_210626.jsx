import { useState } from "react";

// Tab grouping rationale (spec §: merge >7 sections to ≤7):
// §1 Objective is short prose — merged into header/subtitle, no dedicated tab
// §2 Daily Baseline → Tab 1 (core daily routine, standalone)
// §3 Wrists & Hands → Tab 2 (single body area, two sub-tables: daily + 2-3x/week)
// §4 Feet & Toes → Tab 3 (single body area, two sub-tables: daily + dynamic)
// §5 Pre-MMA + §6 Post-MMA → Tab 4 (both session-adjacent protocols, sub-tabs)
// §7 Strength Maintenance → Tab 5 (Session A + Session B sub-tabs)
// §8 Readiness + §9 Minimum Version → Tab 6 (both override/decision modes, sub-tabs)
// Result: 6 tabs — within 3–7 spec range

export default function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [subTab, setSubTab] = useState({});
  const [checked, setChecked] = useState({});

  const setTabSub = (tabIdx, subIdx) => {
    setSubTab(prev => ({ ...prev, [tabIdx]: subIdx }));
  };

  const getSubTab = (tabIdx) => subTab[tabIdx] ?? 0;

  const toggleCheck = (key) => {
    setChecked(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const resetTab = (prefix) => {
    setChecked(prev => {
      const next = { ...prev };
      Object.keys(next).forEach(k => { if (k.startsWith(prefix)) delete next[k]; });
      return next;
    });
  };

  const countChecked = (prefix, total) => {
    return Object.keys(checked).filter(k => k.startsWith(prefix) && checked[k]).length;
  };

  // ── Design tokens (spec §Design System) ──
  const T = {
    bg: "#0c0c14",
    textPrimary: "#c0c0d0",
    textSecondary: "#8a8a9a",
    textHeading: "#d0d0e0",
    textTitle: "#e0e0f0",
    textMuted: "#6a6a7a",
    textDim: "#5a5a6a",
    accent: "#5082dc",
    borderPrimary: "#2a2a35",
    borderSubtle: "#1e1e28",
    surfaceSunken: "rgba(20,20,30,0.6)",
    surfaceMeta: "rgba(20,20,30,0.5)",
  };

  const Badge = ({ children, color }) => {
    const palettes = {
      neutral: { bg: "rgba(140,140,160,0.12)", text: "#8a8a9a" },
      blue:    { bg: "rgba(80,130,220,0.1)",   text: "#5082dc" },
      amber:   { bg: "rgba(200,160,60,0.12)",  text: "#b8952e" },
      green:   { bg: "rgba(80,180,120,0.1)",   text: "#3da065" },
      red:     { bg: "rgba(200,80,80,0.1)",    text: "#c05050" },
      purple:  { bg: "rgba(140,90,200,0.1)",   text: "#8a5ac8" },
    };
    const p = palettes[color] || palettes.neutral;
    return (
      <span style={{
        display: "inline-block",
        background: p.bg,
        color: p.text,
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "11px",
        fontWeight: 600,
        letterSpacing: "0.03em",
        padding: "2px 7px",
        borderRadius: "4px",
      }}>{children}</span>
    );
  };

  const SubHead = ({ children }) => (
    <h3 style={{
      fontFamily: "'DM Sans', sans-serif",
      fontSize: "16px",
      fontWeight: 700,
      color: T.textHeading,
      letterSpacing: "-0.01em",
      margin: "24px 0 12px",
    }}>{children}</h3>
  );

  const Para = ({ children }) => (
    <p style={{
      fontFamily: "'DM Sans', sans-serif",
      fontSize: "14px",
      fontWeight: 400,
      color: T.textSecondary,
      lineHeight: 1.65,
      margin: "0 0 12px",
    }}>{children}</p>
  );

  const Takeaway = ({ children }) => (
    <div style={{
      borderLeft: `3px solid ${T.accent}`,
      background: T.surfaceSunken,
      padding: "14px 16px",
      borderRadius: "0 6px 6px 0",
      margin: "16px 0",
    }}>
      <div style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "10px",
        fontWeight: 700,
        color: T.accent,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        marginBottom: "6px",
      }}>KEY TAKEAWAY</div>
      <div style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "14px",
        color: "#b0b0c0",
        lineHeight: 1.65,
      }}>{children}</div>
    </div>
  );

  // Progress pill
  const Progress = ({ done, total, prefix }) => {
    const pct = total === 0 ? 0 : Math.round((done / total) * 100);
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
        <div style={{
          flex: 1, height: "4px", background: T.borderSubtle, borderRadius: "2px", overflow: "hidden",
        }}>
          <div style={{
            width: `${pct}%`, height: "100%",
            background: pct === 100 ? "#3da065" : T.accent,
            borderRadius: "2px",
            transition: "width 0.2s ease",
          }} />
        </div>
        <span style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "11px",
          color: pct === 100 ? "#3da065" : T.textMuted,
          fontWeight: 600,
          minWidth: "52px",
          textAlign: "right",
        }}>{done}/{total} done</span>
        {done > 0 && (
          <button onClick={() => resetTab(prefix)} style={{
            background: "none", border: "none", cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "11px", color: T.textDim, padding: 0,
          }}>reset</button>
        )}
      </div>
    );
  };

  // Checklist row — each exercise row becomes a checkable item
  const CheckRow = ({ id, area, exercise, dose }) => {
    const isChecked = !!checked[id];
    return (
      <div
        onClick={() => toggleCheck(id)}
        style={{
          display: "grid",
          gridTemplateColumns: "20px 1fr 1fr auto",
          gap: "10px",
          alignItems: "center",
          padding: "9px 10px",
          borderBottom: `1px solid ${T.borderSubtle}`,
          cursor: "pointer",
          borderRadius: "4px",
          background: isChecked ? "rgba(80,130,220,0.04)" : "transparent",
          transition: "background 0.15s ease",
          userSelect: "none",
        }}
      >
        {/* Checkbox */}
        <div style={{
          width: "16px", height: "16px", borderRadius: "4px",
          border: isChecked ? `2px solid ${T.accent}` : `2px solid ${T.borderPrimary}`,
          background: isChecked ? T.accent : "transparent",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
          transition: "all 0.15s ease",
        }}>
          {isChecked && (
            <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
              <path d="M1 3.5L3.5 6L8 1" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </div>
        {/* Area */}
        <span style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "13px",
          fontWeight: 600,
          color: isChecked ? T.textDim : T.textPrimary,
          textDecoration: isChecked ? "line-through" : "none",
          transition: "color 0.15s, text-decoration 0.15s",
        }}>{exercise}</span>
        {/* Dose */}
        <span style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "12px",
          color: isChecked ? T.textDim : T.textSecondary,
          transition: "color 0.15s",
        }}>{dose}</span>
        {/* Area badge */}
        {area && <Badge color="neutral">{area}</Badge>}
      </div>
    );
  };

  // Table header row (non-interactive, for section headers)
  const TableHead = ({ cols }) => (
    <div style={{
      display: "grid",
      gridTemplateColumns: "20px 1fr 1fr auto",
      gap: "10px",
      padding: "6px 10px",
      borderBottom: `1px solid ${T.borderPrimary}`,
      marginBottom: "2px",
    }}>
      <div />
      {cols.map((c, i) => (
        <div key={i} style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "11px", fontWeight: 700,
          color: T.textSecondary,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
        }}>{c}</div>
      ))}
    </div>
  );

  // Sub-tab pill row
  const SubTabs = ({ tabIdx, labels }) => (
    <div style={{
      display: "flex", gap: "6px", flexWrap: "wrap",
      marginBottom: "20px",
    }}>
      {labels.map((l, i) => {
        const active = getSubTab(tabIdx) === i;
        return (
          <button key={i} onClick={() => setTabSub(tabIdx, i)} style={{
            background: active ? "rgba(80,130,220,0.12)" : "transparent",
            color: active ? T.accent : T.textMuted,
            border: `1px solid ${active ? T.accent : T.borderSubtle}`,
            borderRadius: "20px",
            padding: "5px 14px",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "12px",
            fontWeight: active ? 600 : 400,
            cursor: "pointer",
            transition: "all 0.15s ease",
          }}>{l}</button>
        );
      })}
    </div>
  );

  // ── Tab content definitions ──

  // TAB 0 — Daily Baseline (§2)
  const dailyItems = [
    { id: "d01", area: "Neck",           exercise: "Rotations",                       dose: "3–5 each direction" },
    { id: "d02", area: "Neck",           exercise: "Side bends",                      dose: "3–5 each side" },
    { id: "d03", area: "Shoulders",      exercise: "Shoulder circles",                dose: "10 forward / 10 backward" },
    { id: "d04", area: "Shoulders",      exercise: "Arm swings",                      dose: "10–20 total" },
    { id: "d05", area: "Thoracic",       exercise: "Cat-cow",                         dose: "6–10 reps" },
    { id: "d06", area: "Thoracic",       exercise: "Open book rotations",             dose: "5 each side" },
    { id: "d07", area: "Wrists",         exercise: "Wrist circles",                   dose: "10 each direction" },
    { id: "d08", area: "Wrists",         exercise: "Palm-down wrist rocks",           dose: "10–15 reps" },
    { id: "d09", area: "Wrists",         exercise: "Palm-up wrist rocks",             dose: "10–15 reps" },
    { id: "d10", area: "Hands",          exercise: "Finger spreads / extensions",     dose: "10–20 reps" },
    { id: "d11", area: "Hips",           exercise: "Hip circles",                     dose: "5 each direction / each side" },
    { id: "d12", area: "Hips",           exercise: "90/90 switches",                  dose: "6–10 total" },
    { id: "d13", area: "Hips",           exercise: "Leg swings front/back",           dose: "10 each leg" },
    { id: "d14", area: "Hips",           exercise: "Leg swings side/side",            dose: "10 each leg" },
    { id: "d15", area: "Knees",          exercise: "Knee circles",                    dose: "5 each direction" },
    { id: "d16", area: "Ankles",         exercise: "Knee-over-toe rocks",             dose: "10 each side" },
    { id: "d17", area: "Feet / toes",    exercise: "Toe spreads",                     dose: "10–20 reps" },
    { id: "d18", area: "Feet / toes",    exercise: "Big-toe lift",                    dose: "10 each foot" },
    { id: "d19", area: "Feet / toes",    exercise: "Other-toes lift",                 dose: "10 each foot" },
    { id: "d20", area: "Feet",           exercise: "Short-foot / arch activation",    dose: "5–10 × 3-sec holds each foot" },
    { id: "d21", area: "Squat",          exercise: "Relaxed squat hold",              dose: "30–60 sec" },
    { id: "d22", area: "Adductors",      exercise: "Side-to-side adductor shift",     dose: "5–8 each side" },
    { id: "d23", area: "Dynamic",        exercise: "Bounce / stance switch / footwork", dose: "60–90 sec" },
  ];

  // TAB 1 — Wrists & Hands (§3)
  // Sub-tab grouping: §3 has two frequency bands — daily and 2-3x/week strength
  const wristDailyItems = [
    { id: "wd01", area: "Wrists",   exercise: "Wrist circles",                   dose: "10 each direction" },
    { id: "wd02", area: "Wrists",   exercise: "Palm-down wrist rocks",           dose: "10–15 reps" },
    { id: "wd03", area: "Wrists",   exercise: "Palm-up wrist rocks",             dose: "10–15 reps" },
    { id: "wd04", area: "Wrists",   exercise: "Fist rocks",                      dose: "5–10 reps" },
    { id: "wd05", area: "Fingers",  exercise: "Finger spreads",                  dose: "10–20 reps" },
    { id: "wd06", area: "Fingers",  exercise: "Finger extensions",               dose: "10–20 reps" },
    { id: "wd07", area: "Hands",    exercise: "Light fist / knuckle plank",      dose: "10–20 sec, optional" },
  ];

  const wristStrengthItems = [
    { id: "ws01", area: "Grip",     exercise: "Farmer carries",                  dose: "2–4 × 20–40 sec" },
    { id: "ws02", area: "Grip",     exercise: "Towel hangs / towel rows",        dose: "2–3 × 10–30 sec or 6–10 reps" },
    { id: "ws03", area: "Flexors",  exercise: "Wrist curls",                     dose: "2 × 10–15" },
    { id: "ws04", area: "Extensors",exercise: "Reverse wrist curls",             dose: "2 × 10–15" },
    { id: "ws05", area: "Rotation", exercise: "Pronation / supination",          dose: "2 × 8–12 each side" },
    { id: "ws06", area: "Grip",     exercise: "Grip squeezes",                   dose: "2 sets, not to failure" },
  ];

  // TAB 2 — Feet & Toes (§4)
  // Sub-tab grouping: §4 has two sub-blocks — daily/before MMA and dynamic
  const feetDailyItems = [
    { id: "fd01", area: "Toes",     exercise: "Toe spreads",                     dose: "10–20 reps" },
    { id: "fd02", area: "Toes",     exercise: "Big-toe lift",                    dose: "10 each foot" },
    { id: "fd03", area: "Toes",     exercise: "Other-toes lift",                 dose: "10 each foot" },
    { id: "fd04", area: "Arch",     exercise: "Short-foot / arch activation",    dose: "5–10 × 3-sec holds each foot" },
    { id: "fd05", area: "Ankles",   exercise: "Knee-over-toe ankle rocks",       dose: "10 each side" },
    { id: "fd06", area: "Calves",   exercise: "Slow calf raises",                dose: "10–15 reps" },
    { id: "fd07", area: "Tibialis", exercise: "Tibialis raises",                 dose: "10–15 reps" },
    { id: "fd08", area: "Balance",  exercise: "Barefoot balance",                dose: "20–40 sec each foot" },
    { id: "fd09", area: "Dynamic",  exercise: "Light pogo hops",                 dose: "10–20 reps, optional" },
  ];

  const feetDynamicItems = [
    { id: "fdy01", area: "Footwork", exercise: "Bounce in stance",              dose: "30–60 sec" },
    { id: "fdy02", area: "Footwork", exercise: "Forward / back step",           dose: "10 each direction" },
    { id: "fdy03", area: "Footwork", exercise: "Lateral step",                  dose: "10 each side" },
    { id: "fdy04", area: "Footwork", exercise: "Pivot on ball of foot",         dose: "5–10 each side" },
    { id: "fdy05", area: "Footwork", exercise: "Switch stance",                 dose: "10–20 total" },
    { id: "fdy06", area: "Footwork", exercise: "Check step",                    dose: "5–10 each side" },
  ];

  // TAB 3 — Pre & Post MMA (§5 + §6)
  // Sub-tab grouping: §5 Pre-MMA and §6 Post-MMA are paired session protocols — natural sub-tab pair
  const preMMAItems = [
    { id: "pre01", area: "Cardio",    exercise: "Light bounce / skipping / shadow footwork", dose: "2 min" },
    { id: "pre02", area: "Wrists",    exercise: "Wrist / hand prep",                         dose: "1–2 min" },
    { id: "pre03", area: "Feet",      exercise: "Foot / ankle prep",                         dose: "1–2 min" },
    { id: "pre04", area: "Hips",      exercise: "Hip openers",                               dose: "5 each side" },
    { id: "pre05", area: "Hips",      exercise: "Leg swings front/back",                     dose: "10 each leg" },
    { id: "pre06", area: "Hips",      exercise: "Leg swings side/side",                      dose: "10 each leg" },
    { id: "pre07", area: "Glutes",    exercise: "Glute bridges",                             dose: "10–15 reps" },
    { id: "pre08", area: "Core",      exercise: "Dead bug / plank",                          dose: "30–45 sec" },
    { id: "pre09", area: "Shoulders", exercise: "Scap push-ups / band pull-aparts",          dose: "10–15 reps" },
    { id: "pre10", area: "Technical", exercise: "Shadowboxing, sprawls, checks, pivots",     dose: "2–3 min" },
  ];

  const postMMAItems = [
    { id: "post01", area: "Breath",    exercise: "Slow nasal breathing",          dose: "2 min" },
    { id: "post02", area: "Hips",      exercise: "Hip flexor stretch",            dose: "30–60 sec each side" },
    { id: "post03", area: "Legs",      exercise: "Hamstring stretch",             dose: "30–60 sec each side" },
    { id: "post04", area: "Adductors", exercise: "Adductor stretch",              dose: "30–60 sec each side" },
    { id: "post05", area: "Calves",    exercise: "Calf stretch",                  dose: "30–60 sec each side" },
    { id: "post06", area: "Feet",      exercise: "Foot release",                  dose: "30–60 sec each foot" },
    { id: "post07", area: "Wrists",    exercise: "Wrist / forearm release",       dose: "30–60 sec each side" },
    { id: "post08", area: "Thoracic",  exercise: "Thoracic rotation",             dose: "5 each side" },
    { id: "post09", area: "Chest",     exercise: "Pec / shoulder stretch",        dose: "30–60 sec each side" },
  ];

  // TAB 4 — Strength (§7)
  // Sub-tab grouping: §7 has two sessions — A and B, both same frequency (2-3x/week)
  const strengthAItems = [
    { id: "sa01", area: "Squat",  exercise: "Goblet squat / split squat",     dose: "2–3 × 6–10" },
    { id: "sa02", area: "Push",   exercise: "Push-ups / dumbbell press",       dose: "2–3 × 6–12" },
    { id: "sa03", area: "Pull",   exercise: "Row / pull-up",                   dose: "2–3 × 6–12" },
    { id: "sa04", area: "Hinge",  exercise: "RDL / kettlebell deadlift",       dose: "2–3 × 6–10" },
    { id: "sa05", area: "Carry",  exercise: "Farmer carry",                    dose: "2–4 × 20–40 sec" },
    { id: "sa06", area: "Core",   exercise: "Plank / dead bug",                dose: "2–3 × 30–45 sec" },
  ];

  const strengthBItems = [
    { id: "sb01", area: "Lunge",    exercise: "Reverse lunge / walking lunge",  dose: "2–3 × 6–10 each side" },
    { id: "sb02", area: "Push",     exercise: "Overhead / incline push",        dose: "2–3 × 6–10" },
    { id: "sb03", area: "Pull",     exercise: "Row / pull-up",                  dose: "2–3 × 6–12" },
    { id: "sb04", area: "Hip",      exercise: "Bridge / hip thrust",            dose: "2–3 × 8–12" },
    { id: "sb05", area: "Rotation", exercise: "Pallof press / controlled twist",dose: "2–3 × 8–12 each side" },
    { id: "sb06", area: "Grip",     exercise: "Carries / towel work",           dose: "2–3 sets" },
    { id: "sb07", area: "Lower leg",exercise: "Calf / tibialis work",           dose: "2 × 10–15" },
  ];

  // TAB 5 — Readiness & Minimum (§8 + §9)
  // Sub-tab grouping: §8 Readiness is a decision gate, §9 is the minimum-dose fallback — complementary override tools
  const readinessStates = [
    { state: "Green", action: "Train normally", color: "green" },
    { state: "Amber", action: "Technical only / reduce intensity", color: "amber" },
    { state: "Red",   action: "Recovery only", color: "red" },
  ];

  const redSigns = [
    "Sharp pain",
    "Unstable joint",
    "Worsening pain during warm-up",
    "Unusual fatigue",
  ];

  const minItems = [
    { id: "min01", area: "Breath",  exercise: "Breathing",                       dose: "1 min" },
    { id: "min02", area: "Upper",   exercise: "Neck / shoulders",                dose: "1 min" },
    { id: "min03", area: "Hands",   exercise: "Wrists / hands",                  dose: "1 min" },
    { id: "min04", area: "Hips",    exercise: "Hips",                            dose: "2 min" },
    { id: "min05", area: "Feet",    exercise: "Ankles / feet / toes",            dose: "2 min" },
    { id: "min06", area: "Legs",    exercise: "Squat / hamstring / adductor",    dose: "1 min" },
    { id: "min07", area: "Dynamic", exercise: "Bounce / shadow movement",        dose: "2 min" },
  ];

  // ── Tab definitions ──
  const tabs = [
    { icon: "◈", label: "Daily Baseline",  badge: null },
    { icon: "◇", label: "Wrists & Hands",  badge: null },
    { icon: "⬡", label: "Feet & Toes",     badge: null },
    { icon: "△", label: "Pre & Post MMA",  badge: null },
    { icon: "▽", label: "Strength",        badge: null },
    { icon: "◉", label: "Readiness",       badge: null },
  ];

  // Helper: render a checklist block with progress
  const CheckList = ({ items, prefix }) => {
    const done = countChecked(prefix, items.length);
    return (
      <div>
        <Progress done={done} total={items.length} prefix={prefix} />
        <TableHead cols={["Exercise", "Dose", ""]} />
        {items.map(item => (
          <CheckRow key={item.id} {...item} />
        ))}
      </div>
    );
  };

  // ── Tab render functions ──
  const renderTab = () => {
    switch (activeTab) {
      case 0:
        return (
          <div>
            <Para>12–15 min. Run every day — this is the base layer everything else builds on.</Para>
            <CheckList items={dailyItems} prefix="d" />
          </div>
        );

      case 1:
        return (
          <div>
            <SubTabs tabIdx={1} labels={["Daily / Before MMA", "2–3× / Week"]} />
            {getSubTab(1) === 0 ? (
              <div>
                <Para>Run daily or before MMA. Prepare, do not inflame.</Para>
                <CheckList items={wristDailyItems} prefix="wd" />
              </div>
            ) : (
              <div>
                <Para>Strength loading 2–3× per week. Not to failure. Prepare, do not inflame.</Para>
                <CheckList items={wristStrengthItems} prefix="ws" />
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div>
            <SubTabs tabIdx={2} labels={["Daily / Before MMA", "Dynamic Footwork"]} />
            {getSubTab(2) === 0 ? (
              <div>
                <Para>Run daily or before MMA. Goal: responsive, not tired.</Para>
                <CheckList items={feetDailyItems} prefix="fd" />
              </div>
            ) : (
              <div>
                <Para>Movement quality work. Finish sharp, not fatigued. Rule: responsive, not tired.</Para>
                <CheckList items={feetDynamicItems} prefix="fdy" />
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div>
            <SubTabs tabIdx={3} labels={["Pre-MMA Activation", "Post-MMA Reset"]} />
            {getSubTab(3) === 0 ? (
              <div>
                <Para>8–12 min before training. Finish warm and sharp, not tired.</Para>
                <CheckList items={preMMAItems} prefix="pre" />
              </div>
            ) : (
              <div>
                <Para>8–15 min after training. Reset only. Not another workout.</Para>
                <CheckList items={postMMAItems} prefix="post" />
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div>
            <Para>2–3× per week. Moderate effort — leave reps in reserve.</Para>
            <SubTabs tabIdx={4} labels={["Session A", "Session B"]} />
            {getSubTab(4) === 0 ? (
              <CheckList items={strengthAItems} prefix="sa" />
            ) : (
              <CheckList items={strengthBItems} prefix="sb" />
            )}
          </div>
        );

      case 5:
        return (
          <div>
            <SubTabs tabIdx={5} labels={["Readiness Check", "Minimum Version"]} />
            {getSubTab(5) === 0 ? (
              <div>
                {/* Readiness traffic-light info cards */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "20px" }}>
                  {readinessStates.map(r => {
                    const borderColors = { green: "#3da065", amber: "#b8952e", red: "#c05050" };
                    return (
                      <div key={r.state} style={{
                        borderLeft: `3px solid ${borderColors[r.color]}`,
                        background: T.surfaceSunken,
                        padding: "12px 14px",
                        borderRadius: "0 6px 6px 0",
                        display: "flex", alignItems: "center", gap: "14px",
                      }}>
                        <Badge color={r.color}>{r.state}</Badge>
                        <span style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "14px", color: T.textSecondary,
                        }}>{r.action}</span>
                      </div>
                    );
                  })}
                </div>
                <SubHead>Red signs — stop and reassess</SubHead>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                  {redSigns.map((s, i) => (
                    <div key={i} style={{
                      borderLeft: `3px solid #c05050`,
                      background: T.surfaceSunken,
                      padding: "10px 12px",
                      borderRadius: "0 6px 6px 0",
                    }}>
                      <span style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "13px", color: T.textSecondary,
                      }}>{s}</span>
                    </div>
                  ))}
                </div>
                <Takeaway>
                  If any red sign is present: recovery only. Readiness gates everything else — no protocol overrides a red state.
                </Takeaway>
              </div>
            ) : (
              <div>
                <Para>10 min. Use when overloaded. Hits every area with minimum dose.</Para>
                <CheckList items={minItems} prefix="min" />
                <Takeaway>
                  Daily mobility + wrists/hands + feet/toes + pre-MMA activation + post-MMA reset + strength maintenance + readiness check.
                </Takeaway>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700&family=JetBrains+Mono:wght@400&display=swap"
        rel="stylesheet"
      />
      <div style={{
        background: T.bg,
        minHeight: "100vh",
        fontFamily: "'DM Sans', sans-serif",
        color: T.textPrimary,
      }}>
        <div style={{
          maxWidth: "820px",
          margin: "0 auto",
          padding: "40px 24px 60px",
        }}>
          {/* Header */}
          <div style={{ marginBottom: "28px" }}>
            <div style={{
              fontSize: "10px", fontWeight: 700,
              color: T.accent,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              marginBottom: "8px",
            }}>Training Protocol</div>
            <h1 style={{
              fontSize: "28px", fontWeight: 700,
              color: T.textTitle,
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              margin: "0 0 6px",
            }}>MMA Maintenance Regime</h1>
            <div style={{
              fontSize: "12px", fontWeight: 400,
              color: T.textDim,
            }}>Dynamic Baseline — mobile, flexible, strong, resilient</div>
          </div>

          {/* Tab nav */}
          <div style={{
            display: "flex", flexWrap: "wrap", gap: "2px",
            borderBottom: `1px solid ${T.borderSubtle}`,
            marginBottom: "28px",
            paddingBottom: "1px",
          }}>
            {tabs.map((tab, i) => {
              const active = activeTab === i;
              return (
                <button key={i} onClick={() => setActiveTab(i)} style={{
                  background: active ? "rgba(80,130,220,0.08)" : "transparent",
                  color: active ? T.accent : T.textMuted,
                  border: "none",
                  borderBottom: active ? `2px solid ${T.accent}` : "2px solid transparent",
                  padding: "8px 14px",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "13px",
                  fontWeight: active ? 600 : 400,
                  cursor: "pointer",
                  display: "flex", alignItems: "center", gap: "6px",
                  transition: "all 0.15s ease",
                  marginBottom: "-1px",
                }}>
                  <span style={{ fontSize: "14px" }}>{tab.icon}</span>
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab content */}
          <div>{renderTab()}</div>
        </div>
      </div>
    </>
  );
}
