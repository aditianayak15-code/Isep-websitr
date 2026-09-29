# ISEP Batch 1 Archive — Digital Monograph & Real-Time Exhibition (2026)

An official archival exhibition and digital monograph commemorating the scholars, research breakthroughs, certificates, milestones, and memories of the inaugural **ISEP Batch 1** residency (2026).

Reconstructed directly from Stitch project `11606814950829122029` and backed by a live **Supabase** backend.

---

## 🏛️ System Features & Objectives

### 1. Monograph Home (`#home`)
- **3D Parallax Memory Deck**: Layered archival photo stack responding to cursor movement with depth perspective.
- **Dynamic Pedestal Statistics**: Real-time counters directly reflecting live Supabase rows for Curated Photos, Certifications, Milestones, and Public Approved Thoughts.
- **Archival Directorate Overview**: Mission monograph outlining the permanent record of learning, innovation, and community.
- **Pavilion Gateways**: Direct portals into Pavilion I (Gallery), Pavilion II (Certifications), Pavilion III (Milestones), and Pavilion IV (Thoughts Wall).

### 2. Pavilion I: The Gallery Hall (`#gallery` / `gallery.html`)
- **Organized Albums**: Filter by *All*, *Events*, *Sessions*, *Team Activities*, or search dynamically by title and caption.
- **Full-Screen Lightbox**: High-fidelity view-only inspection modal.
- **View-Only Protection**: Context menu, right-click, image dragging, and hotkey downloads (`Ctrl+S`, `Ctrl+P`) disabled to preserve archival integrity.

### 3. Pavilion II: Hall of Certifications (`#certificates` / `certificates.html`)
- **Searchable Credentials Registry**: Filter by Category (*Completion*, *Excellence*, *Leadership*, *Special Recognition*) or search recipient name.
- **Cryptographic Certificate Dossier**: Inspection modal featuring verification ledger hashes, academic council dual-verification, and formatted view.

### 4. Pavilion III: The 180-Day Chronology (`#achievements` / `achievements.html`)
- **Chronological Milestones Spine**: Visual timeline of batch milestones, hackathons, and symposiums sorted by date.

### 5. Pavilion IV: The Living Thoughts Wall (`#thoughts-wall` / `thoughts-wall.html`)
- **Community Thoughts Wall**: Displays approved reflections and 5-star ratings left by fellows, mentors, and visitors.
- **Pin a Thought Modal**: Visitors can submit their name, message, and rating. Submissions default to `pending` status awaiting coordinator moderation.

### 6. Archival Directorate Control Room (`#admin-portal` / `admin-portal.html`)
- **Supabase Authentication**: Secure coordinator sign-in (`admin@isep.org` / `admin123`) backed by Supabase Auth with session persistence.
- **Real-Time Moderation**: Review pending visitor thoughts with one-click **Approve**, **Hide**, or **Delete**.
- **Content Administration**: Upload new photos with album assignment, issue certificates, and log new milestones directly to Supabase.

---

## ⚡ Supabase Backend Details

- **Supabase Project URL**: `https://qilreacksziadajadkji.supabase.co`
- **Tables**:
  - `public.photos`: id, title, caption, album, image_url, uploaded_at
  - `public.certificates`: id, title, recipient_name, issue_date, category, file_url
  - `public.achievements`: id, title, description, date, image_url
  - `public.thoughts`: id, name, message, rating, status (`pending`, `approved`, `hidden`), created_at
- **Security & RLS**:
  - Public `SELECT` allowed on photos, certificates, achievements, and approved thoughts.
  - Public `INSERT` allowed on thoughts with `status = 'pending'`.
  - Admin `ALL` (insert, update, delete, moderate) authenticated via Supabase Auth (`admin@isep.org`).

---

## 🚀 Running the Website

The local development server is currently serving at:
```
http://localhost:5173/
```

To run manually:
```powershell
python -m http.server 5173
```
Or open [index.html](file:///c:/Users/Admin/Downloads/ISEP%20PROJECT/index.html) directly in any browser.

---

## 🔑 Coordinator Credentials
- **Email**: `admin@isep.org`
- **Password**: `admin123`
