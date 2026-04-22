Build a production-ready website using Next.js (App Router) for a personal brand called "Moha Styling".

IMPORTANT:
- Use the frontend-design skill.
- Avoid generic AI aesthetics completely.
- The final UI MUST be written in Korean.

---

## 🎯 Project Goal
This is a portfolio + SEO website for a professional food stylist.
The site must feel:
- Stylish
- Artistic
- Cinematic
- High-end editorial

The design must NOT look like a typical AI-generated website.

---

## 🎨 Core Design Direction (VERY IMPORTANT)

Create a unique aesthetic based on:

1. Fluid / Wave Motion
- Water-like distortion effects
- Ripple interactions on hover and click
- Smooth organic transitions

⚠️ Ripple implementation requirement:
- Use the library: https://github.com/sirxemic/jquery.ripples/
- Apply ripple effect on the landing page background
- Mouse move → subtle ripple distortion
- Click → strong ripple expansion effect
- Integrate it properly within Next.js (client-side only, dynamic import if needed)

2. Liquid Glass (iPhone-style)
- Frosted glass layers
- Semi-transparent blur backgrounds
- Light refraction 느낌
- Depth using backdrop-filter

3. Strong Visual Identity
- Avoid Inter, Roboto, system fonts
- Use expressive typography (editorial or modern serif + contrasting sans-serif)
- Dramatic font scale (very large hero text)

4. Color Strategy
- Neutral base (white / soft gray / black)
- With bold accent colors (NOT purple gradient cliché)
- Use CSS variables

5. Motion
- Page load animation with staggered reveal
- High-impact transitions instead of many small ones
- Use Framer Motion

---

## 🧱 Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- shadcn/ui (for base components)
- Responsive design (mobile-first)

---

## 📄 Pages to Implement

### 1. Landing (Entry) Page
- Fullscreen white translucent overlay
- Center text: "Moha Styling" (soft, elegant, subtle glow)
- Background uses ripple effect (jquery.ripples)
- Mouse movement → ripple distortion
- Click → ripple expands and transitions to Home

---

### 2. Home Page
- Hero carousel (auto sliding images)
- White overlay filter
- Centered Korean text:
  "스튜디오 모하는 고객만을 위한, 그리고 제품의 탄생을 위한 사진으로 진심으로 작업을 진행합니다."
- Below:
  - 소개 섹션 (푸드 스타일리스트 설명)
  - 대표 프로젝트 하이라이트

---

### 3. Portfolio Page
- Top: layered overlapping images (artistic collage)
- Tabs:
  - 푸드 / 뷰티 / 제품 / 영상
- Grid layout (3~4 columns)
- Infinite scroll

Interaction:
- Click image → modal
- Modal contains:
  - 대표 이미지
  - 묶음 이미지 슬라이드
  - 프로젝트 제목 / 날짜 / 설명

Video tab:
- Instagram video embeds

---

### 4. About Page (개인 이력)
- 자기 소개
- 프로필 사진
- 프로젝트 이력
- 모하 스타일링의 강점

---

### 5. Admin Page
- Hidden login via footer
- Modal login (ID/PW from env)

Features:
- Portfolio CRUD (image/video)
- Upload multiple assets (grouped)
- Set:
  - 대표 이미지
  - 제목
  - 설명

---

## 🧩 Layout System

Global layout must include:

### Header
- Left: 로고 (Moha Styling)
- Right:
  - 홈
  - 포트폴리오
  - 개인 이력

### Footer
Include:
- 로고
- 주소: 서울 동대문구 전농로 195 2층
- 전화번호: 0507-1375-2919
- Instagram 버튼
- 이메일 버튼
- Hidden admin login button (text style, subtle)

---

## ⚙️ Functional Requirements

1. Portfolio CRUD (admin only)
2. Admin login (env-based credentials)
3. Email sending (contact form, env config)
4. File upload via MinIO API
5. Responsive layout (mobile/tablet/desktop)

---

## 📩 Contact System

Floating button:
- Scroll to top
- Contact button

Contact popup:
- 이름
- 이메일 or 전화번호
- 메시지 입력
- Send email

---

## 🧠 Architecture Requirements

- Clean folder structure (feature-based or app router structure)
- Reusable components clearly separated
- SEO optimized (meta tags, semantic HTML)
- Environment variables must be injectable (k3s deployment ready)

---

## 🚫 Strictly Avoid

- Generic landing page layout
- Default fonts (Inter, Roboto, system)
- Purple gradient on white
- Boring flat UI
- Repetitive card layouts

---

## 💡 Output Format

- Provide full project structure
- Include key components code
- Include example pages
- Focus on design + UX + structure