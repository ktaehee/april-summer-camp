# 🌿 청담April어학원 마포상암캠퍼스 — 2026 여름캠프 신청 페이지

> **인수인계 문서 (Handoff)**
> 작성일: 2026-05-19
> 작성자: Claude (Home7800 의뢰)

---

## 📍 한눈에 보기

| 항목 | 값 |
|---|---|
| 🌐 라이브 URL | **https://april-summer-camp.vercel.app** |
| 📂 로컬 경로 | `C:\Users\Home7800\Projects\april-summer-camp` |
| 🐙 GitHub | (push 후 채워질 예정) `https://github.com/ktaehee/april-summer-camp` |
| ☁️ 호스팅 | Vercel (계정: `ktaehee2-2159`) |
| 🛠 스택 | Vite 6 + React 18 + Tailwind 3 |
| 💾 DB | **없음** — 신청은 `mailto:` 링크로 이메일 발송 |
| ✉️ 신청 수신 이메일 | `sangam@april.creverse.com` |

---

## 🎯 페이지가 하는 일

청담April어학원 마포상암캠퍼스에서 진행하는 2026 여름 캠프 안내 + 신청 접수.

**섹션 구성 (위에서 아래)**
1. **Header** — 잎사귀 로고 + "April 어학원 / 마포상암캠퍼스" (fixed top)
2. **Hero** — 슬로건 + 신청 CTA + 캠프 카드 + 1차 마감 D-DAY 배지
3. **Why April Camp** — 차별점 4가지 (원어민 몰입 / 프로젝트형 / 레벨별 / 소수정예)
4. **Program** — 레벨 3단계 카드 + 하루 일과 + 캠프 정보 박스
5. **Interactive Activities** — 대표 액티비티 5개 카드
6. **Tuition** — 정가 / 할인 3티어 / 할인 조건 / 환불 정책 / 블로그 링크
7. **Apply** — 신청폼 (mailto: 발송)
8. **FAQ** — 6개 자주 묻는 질문
9. **Footer**

---

## 📚 캠프 실제 운영 정보

(코드의 `src/App.jsx` 상단 상수에 모두 모여 있음)

### 일정
- **기간**: 2026년 8월 3일(월) ~ 8월 14일(금) · 총 10회 · 2주
- **시간**: 09:00 ~ 14:30 (총 55시간), 등원은 08:00부터 가능
- **차량**: 등원 — 개인 / 하원 — 차량 배정
- **장소**: 서울시 마포구 상암동 DMC 인근
- **1차 신청 마감**: 6/26(금) — 얼리버드 + 전액 환불 마감
- **최종 신청 마감**: 7/24(금)

### 비용
- **정가**: 1,100,000원 (수업비·식비·간식비·교재비·활동비·재료비·하원 차량비 **All Inclusive**)
- **할인 조건** (각 10%, 최대 3중복 가능)
  - 재원생
  - 형제·자매
  - 기존 캠프 등록자
  - 친구 소개 (비재원생)
  - 얼리버드 (6/1 ~ 7/10)
- **비재원생 소개 등록**: 단독 30% 할인 (중복 불가)
- **할인 적용 가격**
  - 10% — 990,000원
  - 20% — 880,000원
  - 30% — 770,000원

### 환불 정책 (기준: 입금일)
| 기간 | 환불율 |
|---|---|
| ~ 6/26 (1차 마감) | 전액 환불 |
| 6/27 ~ 7/3 | 10% 차감 |
| 7/4 ~ 7/10 | 20% 차감 |
| 7/11 ~ | 환불 불가 |

### 레벨 (3단계 · 식물 성장 메타포)
| Lv | 배지 | 한글 | 대상 | 내부 매핑 |
|---|---|---|---|---|
| 1 | 🌱 **Sprout** | 새싹반 | 영어 입문 ~ 기초 | Seedbed · Seed |
| 2 | 🌿 **Bloom** | 개화반 | 문장 만들기 가능 | Seed · Sprout |
| 3 | 🌳 **Harvest** | 열매반 | 챕터북 독해 가능 | Sprout · Sap |

비재원생은 신청 후 **무료 레벨테스트**로 반 배정.

### 대표 액티비티 (블로그 참고: https://blog.naver.com/aprilsangam/224119991638)
- 🎨 **Describe to Create** — 그림을 영어로 묘사 → AI가 재생성
- 🛒 **Market Activity** — 영어 마켓 역할극 (흥정 포함)
- 💌 **Letter to Parents** — 부모님께 영어 편지 영작
- ✍️ **Script Creation** — 편지 기반 영어 발표 + 유튜브 촬영
- 🧟 **Blindfold Zombie Game** — 영어로만 안내해 술래잡기

### 연락처
- 📞 02-333-5620
- ✉️ sangam@april.creverse.com

---

## 🗂 코드 구조

```
april-summer-camp/
├─ index.html                  ← 메타태그, Pretendard 폰트 CDN 로드
├─ package.json                ← deps + scripts (dev/build/preview)
├─ vite.config.js              ← Vite 설정 (allowedHosts: 터널 서비스 화이트리스트)
├─ tailwind.config.js          ← 브랜드 색상 + 폰트 정의
├─ postcss.config.js
├─ vercel.json                 ← SPA rewrite + 보안 헤더
├─ dev.cmd                     ← Windows용 dev 서버 실행 스크립트 (Node 경로 고정)
├─ .gitignore
├─ public/
│  └─ leaf.svg                 ← 잎사귀 favicon
└─ src/
   ├─ main.jsx                 ← React 진입점
   ├─ index.css                ← Tailwind + 글로벌 스타일 + bg-leaf-pattern 유틸
   └─ App.jsx                  ← ⭐ 메인 — 모든 컴포넌트와 데이터가 한 파일에
```

### App.jsx 안 데이터 상수 (수정 포인트)
| 상수 | 무엇 |
|---|---|
| `CAMP_INFO` | 캠프 일정·시간·차량·이메일·전화·블로그 URL 등 |
| `LEVELS` | 레벨 3단계 카드 데이터 |
| `SCHEDULE` | 하루 일과 타임테이블 |
| `BASE_FEE` | 정가 (정수) |
| `DISCOUNT_TIERS` | 10/20/30% 할인 티어 가격 |
| `DISCOUNT_CONDITIONS` | 할인 조건 5개 |
| `ACTIVITIES` | 액티비티 5개 카드 |
| `REFUND_POLICY` | 환불 정책 4개 행 |
| `FAQS` | FAQ 6개 |

데이터를 수정하고 싶다면 **App.jsx 파일 상단의 상수만 바꾸면 끝**입니다. UI 코드는 건드릴 필요 없음.

---

## 🚀 운영 가이드

### 1. 로컬 개발 서버 띄우기
```bash
cd C:\Users\Home7800\Projects\april-summer-camp
npm install         # 첫 1회만
npm run dev         # http://localhost:5173
```
또는 더블클릭으로 `dev.cmd` 실행.

### 2. 코드 수정 → 라이브 반영
1. `src/App.jsx` 수정
2. 브라우저에서 잘 보이는지 확인 (HMR로 즉시 반영)
3. 라이브에 올리기:
   ```bash
   vercel --prod
   ```
   → 자동 빌드 + 배포 → 같은 URL에 새 버전 반영 (보통 30초 ~ 1분)

### 3. 신청 데이터는 어디로?
신청자가 폼 작성 후 **"신청서 전송하기"** 누르면:
1. 브라우저가 사용자의 기본 이메일 앱을 열어줌
2. 받는 사람: `sangam@april.creverse.com`
3. 제목: `[여름캠프 신청] 홍길동 (초3)`
4. 본문: 모든 입력 내용이 자동으로 채워져 있음
5. 사용자가 "보내기" 누름 → 캠퍼스 이메일로 도착

📌 **DB 사용 안 함.** 데이터는 받는 이메일 함에만 누적됩니다.

### 4. 자주 묻는 변경 요청 처리

| 요청 | 어디를 고치나 |
|---|---|
| 마감일 변경 | `CAMP_INFO.applyDeadline`, `CAMP_INFO.earlyBirdDeadline` |
| 비용 변경 | `BASE_FEE`, `DISCOUNT_TIERS` |
| 새 할인 조건 추가 | `DISCOUNT_CONDITIONS` 배열에 객체 추가 |
| FAQ 추가/수정 | `FAQS` 배열 |
| 연락처 변경 | `CAMP_INFO.phone`, `CAMP_INFO.email` |
| 블로그 링크 | `CAMP_INFO.blogUrl` |
| 새 액티비티 | `ACTIVITIES` 배열에 객체 추가 |

---

## 🎨 디자인 시스템 (재사용 가능)

### 색상 (tailwind.config.js)
```js
april: {
  lime:        '#9DCD3B',  // 메인 — 로고 잎사귀 색
  'lime-dark': '#7DB025',  // hover, 강조 텍스트
  'lime-soft': '#EAF6D3',  // 배경, 배지
  navy:        '#293849',  // 메인 텍스트
  'navy-soft': '#4A5A6E',  // 부가 텍스트
  cream:       '#FFFDF6',  // 페이지 배경
  sun:         '#FFD84D',  // 포인트 (이번 캠프엔 거의 미사용)
}
```

### 폰트
- **Pretendard Variable** (CDN 로드, index.html)
- 폴백: Noto Sans KR → system-ui

### 디자인 원칙
- 둥근 모서리: `rounded-2xl` / `rounded-3xl` / `rounded-full`
- 그림자: `shadow-soft` (custom, navy 15% alpha)
- 카드 hover 미세 인터랙션: `hover:-translate-y-1`
- 섹션 패턴: **eyebrow (작은 라벨) → 큰 타이틀 → 설명 → 콘텐츠**
- 식물 / 자연 메타포 (잎사귀, 새싹, 개화, 열매)

### 다른 프로젝트에 이 톤 적용하고 싶다면
> 새 채팅에서: "에이프릴 캠프 페이지(april-summer-camp.vercel.app) 같은 톤·디자인 시스템으로 만들어줘"

---

## 🔧 향후 개선 가능 (TODO 후보)

신청자가 적을 동안은 굳이 안 해도 되지만, 늘어나면 고려해볼 것:

- [ ] **Supabase 연동** — 신청 데이터 DB 저장 + 관리자 페이지
- [ ] **이메일 자동 발송** — 신청 접수 확인 메일 자동 송신 (EmailJS, Resend 등)
- [ ] **결제 연동** — 토스페이먼츠로 신청 + 결제 한 번에
- [ ] **레벨테스트 일정 캘린더** — 신청자별 슬롯 자동 배정
- [ ] **사진 추가** — 현재 SVG 일러스트만 사용 중. 실제 캠프 사진 넣으면 신뢰감 ↑
- [ ] **카카오톡 채널 연동** — "톡으로 문의" 버튼
- [ ] **자체 도메인 연결** — 예: `summercamp.april-sangam.com`

---

## 🆘 트러블슈팅

### 빌드 실패
```bash
rm -rf node_modules dist
npm install
npm run build
```

### Vercel 배포 실패
- `vercel login` → `vercel link` → `vercel --prod` 순서로 재시도
- 빌드 로그는 https://vercel.com/ktaehee2-2159s-projects/april-summer-camp 에서 확인

### 로컬 서버 안 뜸 (Windows)
- Node 24 LTS가 `C:\Program Files\nodejs`에 있어야 함
- `npm` 말고 `npm.cmd` 사용 (PATH 문제)
- 또는 `dev.cmd` 더블클릭 (PATH 자동 설정됨)

### 폼 제출 후 이메일이 안 열림
- 사용자 PC에 기본 이메일 앱이 설정 안 되어있는 경우 발생
- 대안: Apply 컴포넌트의 `handleSubmit`을 EmailJS로 교체 (별도 작업 필요)

---

## 📦 의존성 버전 (2026-05-19 기준)

```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "vite": "^6.0.7",
  "@vitejs/plugin-react": "^4.3.4",
  "tailwindcss": "^3.4.17",
  "autoprefixer": "^10.4.20",
  "postcss": "^8.5.1"
}
```

업그레이드 시 React 19 + Tailwind 4가 나온 상태일 수 있음. 기능 변경 없이 보안 패치만 받으려면 `npm update`로 충분.

---

## 🙋 문의 / 작업 의뢰

추가 작업이 필요할 때 새 Claude 세션에서 이렇게 시작하시면 됩니다:

> *"`C:\Users\Home7800\Projects\april-summer-camp`에 있는 에이프릴 여름캠프 페이지에 [요청 내용] 추가해줘. HANDOFF.md 먼저 읽고 시작해."*

이 문서를 같이 첨부하면 컨텍스트 전달이 빠릅니다.

---

*Generated by Claude during a single working session — 2026-05-19*
