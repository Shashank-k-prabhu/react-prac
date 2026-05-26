import React, { useState, useEffect } from 'react';
import GroupChatChallenge from './GroupChatChallenge';
import '../Workspace.css';

const categories = [
  {
    name: "Core React Rendering",
    challenges: [
      { id: 1, name: "Group chat messages by date" },
      { id: 2, name: "Render nested comments UI" },
      { id: 3, name: "Todo app with filters (all/active/completed)" },
      { id: 4, name: "Accordion component" },
      { id: 5, name: "Tabs component" },
      { id: 6, name: "Search + filter list" },
      { id: 7, name: "Debounced search input" },
      { id: 8, name: "Infinite scroll list" },
      { id: 9, name: "Pagination component" },
      { id: 10, name: "Modal open/close system" }
    ]
  },
  {
    name: "Forms & State Management",
    challenges: [
      { id: 11, name: "Multi-step form" },
      { id: 12, name: "Dynamic form fields" },
      { id: 13, name: "Expand/collapse cards" },
      { id: 14, name: "Notification/toast system" },
      { id: 15, name: "File upload preview UI" }
    ]
  },
  {
    name: "UI Components",
    challenges: [
      { id: 16, name: "Image carousel" },
      { id: 17, name: "Drag-and-drop list reorder" },
      { id: 18, name: "Kanban board basics" },
      { id: 19, name: "Chat application UI" },
      { id: 20, name: "Sidebar with active navigation" },
      { id: 21, name: "Theme toggle (dark/light)" },
      { id: 22, name: "Shopping cart quantity manager" },
      { id: 23, name: "Product filtering + sorting" },
      { id: 24, name: "Table with sorting + searching" },
      { id: 25, name: "Dropdown with keyboard navigation" }
    ]
  },
  {
    name: "Utility Components",
    challenges: [
      { id: 26, name: "OTP input component" },
      { id: 27, name: "Stopwatch/timer" },
      { id: 28, name: "Countdown timer" },
      { id: 29, name: "Poll/voting component" },
      { id: 30, name: "Progress bar animation" },
      { id: 31, name: "Skeleton loading UI" }
    ]
  },
  {
    name: "Async & API Practice",
    challenges: [
      { id: 32, name: "API data fetching with loading/error states" },
      { id: 33, name: "Retry failed API requests" },
      { id: 34, name: "Auto-complete suggestions" },
      { id: 35, name: "Nested folder/file explorer" },
      { id: 36, name: "Recursive comments tree" },
      { id: 37, name: "Dynamic breadcrumbs" },
      { id: 38, name: "Calendar/date grouping UI" },
      { id: 39, name: "Expandable FAQ section" },
      { id: 40, name: "Like/dislike toggle system" }
    ]
  },
  {
    name: "Advanced Rendering Practice",
    challenges: [
      { id: 41, name: "Bookmark/favorite state handling" },
      { id: 42, name: "Read-more/read-less component" },
      { id: 43, name: "Lazy-loaded image gallery" },
      { id: 44, name: "Virtualized long list" },
      { id: 45, name: "Context menu on right click" },
      { id: 46, name: "Command palette UI" },
      { id: 47, name: "Chat typing indicator simulation" },
      { id: 48, name: "Streaming message rendering simulation" },
      { id: 49, name: "Optimistic UI updates" },
      { id: 50, name: "Editable table cells" }
    ]
  }
];

export default function PracticeWorkspace() {
  const [activeChallengeId, setActiveChallengeId] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  // Simple Hash-based Router
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith("#challenge-")) {
        const id = parseInt(hash.replace("#challenge-", ""), 10);
        if (!isNaN(id) && id >= 1 && id <= 50) {
          setActiveChallengeId(id);
        }
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    // Parse initial hash on mount
    handleHashChange();

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleSelectChallenge = (id) => {
    window.location.hash = `#challenge-${id}`;
    setActiveChallengeId(id);
  };

  // Find active challenge details
  let activeChallenge = null;
  let activeCategory = "";
  for (const cat of categories) {
    const found = cat.challenges.find(c => c.id === activeChallengeId);
    if (found) {
      activeChallenge = found;
      activeCategory = cat.name;
      break;
    }
  }

  // Filter challenges based on search
  const filteredCategories = categories.map(cat => {
    const filtered = cat.challenges.filter(c =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.id.toString().includes(searchQuery)
    );
    return { ...cat, challenges: filtered };
  }).filter(cat => cat.challenges.length > 0);

  return (
    <div className="practice-container">
      {/* Sidebar navigation */}
      <aside className="practice-sidebar">
        <div className="sidebar-header">
          <h1 className="sidebar-title">
            <span>⚡</span> DevPlayground
          </h1>
          <p className="sidebar-subtitle">Frontend Practice List</p>
        </div>

        <div className="sidebar-search-box">
          <input
            type="text"
            className="sidebar-search-input"
            placeholder="Search challenges..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <nav className="sidebar-challenges-list">
          {filteredCategories.map((cat, idx) => (
            <div key={idx} className="category-group">
              <h3 className="category-title">{cat.name}</h3>
              {cat.challenges.map(ch => (
                <div
                  key={ch.id}
                  onClick={() => handleSelectChallenge(ch.id)}
                  className={`challenge-item ${activeChallengeId === ch.id ? 'active' : ''}`}
                >
                  <span className="challenge-number">{ch.id}.</span>
                  <span className="challenge-name">{ch.name}</span>
                </div>
              ))}
            </div>
          ))}
          {filteredCategories.length === 0 && (
            <div style={{ padding: '20px', textAlign: 'center', opacity: 0.6, fontSize: '14px' }}>
              No challenges match your search.
            </div>
          )}
        </nav>
      </aside>

      {/* Main content workspace area */}
      <main className="practice-workspace">
        <header className="workspace-header">
          <div className="workspace-title-area">
            <h1>{activeChallenge ? activeChallenge.name : "Challenge Workspace"}</h1>
            <div className="workspace-meta">
              <span className="meta-tag" style={{ color: 'var(--accent)', background: 'var(--accent-bg)' }}>
                {activeCategory}
              </span>
              <span className="meta-tag">
                ID: #{activeChallengeId}
              </span>
              <span className="meta-tag" style={{
                color: activeChallengeId === 1 ? '#10b981' : '#f59e0b',
                background: activeChallengeId === 1 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)'
              }}>
                {activeChallengeId === 1 ? 'Ready for Grouping' : 'Setup / Empty Page'}
              </span>
            </div>
          </div>
        </header>

        <div className="workspace-content">
          {activeChallengeId === 1 ? (
            <GroupChatChallenge />
          ) : (
            <div className="placeholder-card">
              <span className="placeholder-icon">🛠️</span>
              <h2>Challenge #{activeChallengeId}</h2>
              <p>
                This is an empty page workspace set up for <strong>{activeChallenge?.name}</strong>.
              </p>
              <div style={{
                background: 'var(--code-bg)',
                padding: '16px',
                borderRadius: '8px',
                fontFamily: 'var(--mono)',
                fontSize: '13px',
                textAlign: 'left',
                border: '1px solid var(--border)',
                marginBottom: '24px',
                color: 'var(--text-h)'
              }}>
                <div style={{ color: 'var(--accent)', marginBottom: '8px', fontWeight: 'bold' }}>// How to implement:</div>
                <div>1. Create a component file under <span style={{ opacity: 0.8 }}>src/components/</span></div>
                <div>2. Import it inside <span style={{ opacity: 0.8 }}>src/components/PracticeWorkspace.jsx</span></div>
                <div>3. Update the conditional switch in <span style={{ opacity: 0.8 }}>WorkspaceContent</span> to render your new component.</div>
              </div>
              <button
                className="action-btn"
                onClick={() => alert("Ready for you to code! Open the editor and start writing React.")}
              >
                Start Coding Challenge
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
