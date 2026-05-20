import { useState } from 'react'

const CAMP_INFO = {
  title: '2026 여름 캠프',
  subtitle: '청담에이프릴 마포상암캠퍼스 Summer Camp',
  campus: '청담에이프릴 마포상암캠퍼스',
  tagline: '2주 몰입 영어, 알찬 여름의 시작',
  dates: '2026년 8월 3일(월) ~ 8월 14일(금) · 총 10회',
  hours: '평일 09:00 ~ 14:30 (총 55시간)',
  arrival: '등원 08:00부터 가능',
  transport: '등원 — 개인 / 하원 — 차량 배정',
  target: '초등 학생 (레벨테스트 후 반 배정)',
  capacity: '레벨별 소수 정예반',
  applyDeadline: '2026년 7월 24일(금)까지 (최종 마감)',
  earlyBirdDeadline: '2026년 6월 26일(금)까지 (1차 마감)',
  phone: '02-333-5620',
  email: 'sangam@april.creverse.com',
  address: '서울시 마포구 상암동 DMC 인근',
  blogUrl: 'https://blog.naver.com/aprilsangam/224119991638',
  includes: '수업비 · 식비 · 간식비 · 교재비 · 활동비 · 재료비 · 하원 차량비',
}

const LEVELS = [
  {
    badge: 'Sprout',
    name: '새싹반',
    icon: '🌱',
    internal: 'Seedbed · Seed',
    target: '영어 입문 ~ 기초',
    color: 'from-april-lime-soft to-april-cream',
    accent: 'bg-april-lime',
    accentText: 'text-white',
    points: [
      'Phonics 집중 — 알파벳·음가 완성',
      '핵심 단어 200+ 노래·챈트로 익히기',
      '원어민 1:1 발음 코칭',
    ],
  },
  {
    badge: 'Bloom',
    name: '개화반',
    icon: '🌿',
    internal: 'Seed · Sprout',
    target: '문장 만들기 가능',
    color: 'from-yellow-50 to-april-cream',
    accent: 'bg-april-sun',
    accentText: 'text-april-navy',
    points: [
      'Listening & Speaking 집중 향상',
      'Storybook 8권 완독 + 독후 활동',
      'Project: My Summer Diary 작성',
    ],
  },
  {
    badge: 'Harvest',
    name: '열매반',
    icon: '🌳',
    internal: 'Sprout · Sap',
    target: '챕터북 독해 가능',
    color: 'from-april-lime-soft to-yellow-50',
    accent: 'bg-april-navy',
    accentText: 'text-white',
    points: [
      'Reading Comprehension + Writing',
      'AR 4.0 이상 챕터북 정독',
      'TED-Style Presentation 2회 발표',
    ],
  },
]

const SCHEDULE = [
  { time: '08:00 — 09:00', activity: '등원 (개인 등원) · 자유 독서' },
  { time: '09:00 — 10:30', activity: 'Core Class — 원어민 메인 수업' },
  { time: '10:30 — 11:30', activity: 'Project Activity — 주제별 프로젝트' },
  { time: '11:30 — 12:30', activity: '점심 식사' },
  { time: '12:30 — 13:30', activity: 'Reading Lab — 영어 독서 클리닉' },
  { time: '13:30 — 14:20', activity: 'Fun Activity · 발표' },
  { time: '14:30 ~', activity: '하원 (셔틀 차량 배정)' },
]

const BASE_FEE = 1100000
const DISCOUNT_TIERS = [
  { off: 10, price: 990000, label: '1개 할인 적용', subtitle: '아래 조건 중 1가지' },
  { off: 20, price: 880000, label: '2개 할인 적용', subtitle: '아래 조건 중 2가지' },
  { off: 30, price: 770000, label: '3개 할인 적용', subtitle: '최대 혜택', highlight: true },
]
const DISCOUNT_CONDITIONS = [
  { name: '재원생', detail: '청담에이프릴 재원 중' },
  { name: '형제·자매', detail: '함께 등록 시' },
  { name: '기존 캠프 등록자', detail: '이전 캠프 참여 경험' },
  { name: '친구 소개 (비재원생)', detail: '소개로 신규 등록' },
  { name: '얼리버드', detail: '6/1 ~ 7/10' },
]

const ACTIVITIES = [
  {
    icon: '🎨',
    title: 'Describe to Create',
    subtitle: '본 대로 그려라, 단 영어로',
    desc: '선생님이 보여준 그림을 형용사·전치사·위치 표현을 총동원해 영어로 묘사하고, AI가 그 묘사대로 이미지를 재창조합니다. 표현이 정확할수록 똑같은 그림이 나오는 영어 실력 게임.',
    skills: ['형용사', '전치사', '위치·순서 표현'],
  },
  {
    icon: '🛒',
    title: 'Market Activity',
    subtitle: '아이들이 직접 운영하는 영어 마켓',
    desc: '가게 주인과 손님이 되어 메뉴를 정하고, 홍보 멘트를 영어로 작성합니다. 캠프 전용 화폐로 흥정하고 판매하는 전 과정이 영어로 진행 — 얻은 간식·상품은 진짜로 가져갑니다.',
    skills: ['"How much is this?"', '"I want to buy…"', '"Can you give me a discount?"'],
  },
  {
    icon: '💌',
    title: 'Letter to Parents',
    subtitle: '부모님께 영어로 마음 전하기',
    desc: '부모님께 감사하는 마음을 영어로 영작합니다. 다음날 Script Creation의 준비 시간이기도 해요. 원어민 선생님과 함께 영작하며 쓰기 → 말하기 → 발표로 이어지는 연계 수업.',
    skills: ['Writing', '감정 표현', '문장 구성'],
  },
  {
    icon: '✍️',
    title: 'Script Creation',
    subtitle: '내가 쓴 영어로 유튜브 촬영',
    desc: '어제 작성한 편지를 바탕으로 영어 발표를 한 뒤 유튜브 영상으로 촬영합니다. 영상 공개를 동의하지 않으셔도, 잘 편집된 영상을 부모님께 따로 전달드려요.',
    skills: ['Speaking', 'Presentation', '발음 코칭'],
  },
  {
    icon: '🧟',
    title: 'Blindfold Zombie Game',
    subtitle: '눈 가리고 영어로만 움직여라',
    desc: '눈을 가린 친구를 오직 영어로만 안내해 다른 친구를 잡는 액티비티. 안전을 위해 핸드폰 카메라 안에 들어가면 아웃되는 방식으로 운영 — 아이들이 가장 많이 웃고, 가장 많이 말하는 시간입니다.',
    skills: ['"Go straight"', '"Turn left"', '"3 steps forward!"'],
  },
]

const REFUND_POLICY = [
  { date: '~ 6/26 (1차 마감)', rate: '전액 환불', tone: 'good' },
  { date: '6/27 ~ 7/3', rate: '10% 차감 후 환불', tone: 'mid' },
  { date: '7/4 ~ 7/10', rate: '20% 차감 후 환불', tone: 'mid' },
  { date: '7/11 ~', rate: '환불 불가', tone: 'bad' },
]

const FAQS = [
  {
    q: '비재원생도 신청 가능한가요?',
    a: '네! 외부생도 환영합니다. 신청 시 무료 레벨테스트를 진행한 뒤 가장 잘 맞는 반에 배정해 드립니다. 친구 소개로 등록 시 30% 할인 혜택도 적용돼요.',
  },
  {
    q: '등·하원 차량은 어떻게 운영되나요?',
    a: '등원은 개인 등원이며 오전 8:00부터 입실 가능합니다. 하원은 캠퍼스 차량으로 배정해 드리며, 차량 노선은 등록 후 별도 안내드립니다.',
  },
  {
    q: '비용에 무엇이 포함되나요?',
    a: '수업비, 식비, 간식비, 교재비, 활동비, 재료비, 하원 차량비까지 모두 정가에 포함됩니다. 별도 추가 비용이 없습니다.',
  },
  {
    q: '할인 혜택은 어떻게 되나요?',
    a: '재원생 / 형제·자매 / 기존 캠프 등록자 / 친구 소개(비재원생) / 얼리버드(6/1~7/10) 각 10%이며, 최대 3가지까지 중복 적용 가능합니다. 비재원생 소개 30% 할인은 단독 적용입니다.',
  },
  {
    q: '환불 정책이 어떻게 되나요?',
    a: '6/26까지는 전액 환불, 6/27~7/3은 10% 차감, 7/4~7/10은 20% 차감 후 환불됩니다. 7/11 이후로는 환불이 불가하니 신청 전 일정을 꼭 확인해주세요.',
  },
  {
    q: '캠프 기간 중 정규반과 병행 가능한가요?',
    a: '가능합니다. 캠프와 정규반을 병행하실 경우 해당 기간(2주) 정규반 비용을 반값(약 18만원) 차감해 드립니다.',
  },
]

function AprilLogo({ className = '', size = 'md' }) {
  const markSize = size === 'lg' ? 'h-11 w-11' : 'h-9 w-9'
  const labelSize = size === 'lg' ? 'text-2xl' : 'text-xl'
  const subSize = size === 'lg' ? 'text-sm' : 'text-xs'
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className={`relative inline-flex ${markSize} shrink-0 items-center justify-center`}>
        <svg viewBox="0 0 64 64" className="absolute inset-0 h-full w-full">
          <path
            d="M52 8C32 8 16 22 12 40c-2 10 2 18 8 20 2-18 14-32 32-36 0-8 0-16 0-16z"
            fill="#9DCD3B"
          />
        </svg>
        <span className="relative z-10 text-[10px] font-bold text-white -translate-y-0.5">
          April
        </span>
      </span>
      <div className="flex min-w-0 flex-col leading-tight">
        <span className={`${labelSize} font-bold tracking-tight text-april-navy`}>
          April <span className="font-semibold">어학원</span>
        </span>
        <span className={`${subSize} font-semibold text-april-lime-dark`}>
          마포상암캠퍼스
        </span>
      </div>
    </div>
  )
}

function SectionTitle({ eyebrow, title, description }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow && (
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-april-lime-soft px-3 py-1 text-xs font-semibold uppercase tracking-wider text-april-lime-dark">
          <span className="h-1.5 w-1.5 rounded-full bg-april-lime" />
          {eyebrow}
        </div>
      )}
      <h2 className="text-3xl font-bold text-april-navy sm:text-4xl">{title}</h2>
      {description && (
        <p className="mt-4 text-base text-april-navy-soft sm:text-lg">{description}</p>
      )}
    </div>
  )
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-leaf-pattern pt-24 pb-20 sm:pt-32 sm:pb-28">
      <div className="absolute -top-20 -right-10 h-72 w-72 rounded-full bg-april-lime/10 blur-3xl" />
      <div className="absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-april-sun/20 blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border-2 border-april-lime/50 bg-white/80 px-6 py-3 text-lg font-bold text-april-lime-dark shadow-soft backdrop-blur sm:text-xl">
              <span className="h-3 w-3 rounded-full bg-april-lime" />
              마포상암캠퍼스
              <span className="text-april-navy-soft/40">·</span>
              <span className="text-april-navy">2026 여름</span>
            </div>
            <h1 className="text-4xl font-extrabold leading-tight text-april-navy sm:text-5xl lg:text-6xl">
              한 여름,<br />
              <span className="text-april-lime-dark">영어로 자라는</span><br />
              2주의 기적
            </h1>
            <p className="mt-6 text-lg text-april-navy-soft sm:text-xl">
              {CAMP_INFO.tagline}.
              <br />
              원어민 몰입 수업과 프로젝트 학습으로 영어가 자연스러워집니다.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#apply"
                className="inline-flex items-center justify-center rounded-full bg-april-lime px-7 py-3.5 text-base font-bold text-white shadow-soft transition hover:bg-april-lime-dark"
              >
                지금 신청하기
                <span aria-hidden className="ml-2">→</span>
              </a>
              <a
                href="#program"
                className="inline-flex items-center justify-center rounded-full border-2 border-april-navy/10 bg-white px-7 py-3.5 text-base font-semibold text-april-navy transition hover:border-april-lime hover:text-april-lime-dark"
              >
                프로그램 살펴보기
              </a>
            </div>
            <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-april-navy/10 pt-6">
              <div>
                <dt className="text-xs text-april-navy-soft">캠프 기간</dt>
                <dd className="mt-1 text-sm font-bold text-april-navy">2주 · 10회</dd>
              </div>
              <div>
                <dt className="text-xs text-april-navy-soft">총 수업시간</dt>
                <dd className="mt-1 text-sm font-bold text-april-navy">55시간</dd>
              </div>
              <div>
                <dt className="text-xs text-april-navy-soft">최대 할인</dt>
                <dd className="mt-1 text-sm font-bold text-april-lime-dark">30% OFF</dd>
              </div>
            </dl>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-gradient-to-br from-april-lime to-april-lime-dark shadow-soft">
              <div className="absolute inset-0 opacity-30">
                <svg viewBox="0 0 400 500" className="h-full w-full">
                  <circle cx="80" cy="80" r="40" fill="white" />
                  <circle cx="320" cy="180" r="60" fill="white" />
                  <circle cx="120" cy="350" r="50" fill="white" />
                  <circle cx="300" cy="420" r="35" fill="white" />
                </svg>
              </div>
              <div className="relative flex h-full flex-col justify-between p-10 text-white">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur">
                    SUMMER 2026
                  </div>
                  <p className="mt-6 text-2xl font-bold leading-snug">
                    “Speak. Think.<br />Create — in English.”
                  </p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span>📅</span>
                    <span>8.3 (월) – 8.14 (금) · 10회</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🕘</span>
                    <span>09:00 – 14:30 (등원 08:00~)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🚌</span>
                    <span>등원 개인 · 하원 차량</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 rounded-2xl bg-white px-5 py-4 shadow-soft">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-april-sun text-lg">
                  ⏰
                </div>
                <div>
                  <p className="text-xs text-april-navy-soft">1차 신청 마감</p>
                  <p className="text-sm font-bold text-april-navy">6/26 (금)까지</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Why() {
  const items = [
    {
      icon: '🌎',
      title: '원어민 몰입 수업',
      desc: '하루 6시간 중 5시간을 원어민이 직접 가르칩니다. 한국어 사용은 점심시간에만!',
    },
    {
      icon: '🧪',
      title: '프로젝트형 영어',
      desc: '주제별 프로젝트로 “쓰고-말하고-발표”까지. 영어가 도구가 되는 경험을 합니다.',
    },
    {
      icon: '📚',
      title: '레벨별 맞춤 커리큘럼',
      desc: '입문/기본/심화 3단계 · 무료 레벨테스트 후 가장 잘 맞는 반에 배정해 드려요.',
    },
    {
      icon: '🎒',
      title: '소수 정예 12명',
      desc: '반당 12명 정원으로 모든 아이가 발화할 기회를 충분히 갖습니다.',
    },
  ]
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle
          eyebrow="Why April Camp"
          title="에이프릴 여름캠프만의 4가지"
          description="단순한 영어 수업이 아닌, 한 여름의 변화를 만드는 4주를 만듭니다."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.title}
              className="group rounded-2xl border border-april-navy/5 bg-white p-6 transition hover:-translate-y-1 hover:border-april-lime/30 hover:shadow-soft"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-april-lime-soft text-2xl">
                {item.icon}
              </div>
              <h3 className="mt-5 text-lg font-bold text-april-navy">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-april-navy-soft">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Program() {
  return (
    <section id="program" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle
          eyebrow="Program"
          title="레벨별 프로그램"
          description="아이의 영어 수준에 가장 잘 맞는 반에서 시작합니다."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {LEVELS.map((lvl, i) => (
            <div
              key={lvl.badge}
              className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${lvl.color} p-8 shadow-soft`}
            >
              <div className="absolute right-4 top-4 text-5xl opacity-30">{lvl.icon}</div>
              <div className="relative">
                <span
                  className={`inline-flex items-center rounded-full ${lvl.accent} ${lvl.accentText} px-3 py-1 text-xs font-bold`}
                >
                  Lv. {i + 1} · {lvl.badge}
                </span>
                <h3 className="mt-4 flex items-baseline gap-2 text-2xl font-bold text-april-navy">
                  {lvl.name}
                  <span className="text-sm font-semibold text-april-navy-soft">
                    {lvl.target}
                  </span>
                </h3>
                <p className="mt-1 text-xs font-medium text-april-lime-dark">
                  내부 레벨: {lvl.internal}
                </p>
                <ul className="mt-6 space-y-3">
                  {lvl.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm text-april-navy">
                      <span className="mt-1 text-april-lime-dark">✓</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-april-navy-soft">
          ※ 비재원생은 신청 후 <strong className="text-april-navy">무료 레벨테스트</strong>를 통해 반이 배정됩니다.
        </p>

        <div className="mt-16 grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="text-2xl font-bold text-april-navy">하루 일과</h3>
            <p className="mt-2 text-sm text-april-navy-soft">
              매일 같은 리듬으로 영어에 자연스럽게 익숙해집니다.
            </p>
            <div className="mt-6 overflow-hidden rounded-2xl border border-april-navy/10">
              {SCHEDULE.map((row, i) => (
                <div
                  key={row.time}
                  className={`flex items-center gap-4 px-5 py-4 ${
                    i % 2 === 0 ? 'bg-april-cream' : 'bg-white'
                  }`}
                >
                  <span className="w-32 shrink-0 font-mono text-xs font-semibold text-april-lime-dark">
                    {row.time}
                  </span>
                  <span className="text-sm text-april-navy">{row.activity}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-april-navy">캠프 정보</h3>
            <p className="mt-2 text-sm text-april-navy-soft">한 눈에 확인하세요.</p>
            <dl className="mt-6 space-y-4 rounded-2xl bg-april-cream p-6">
              {[
                ['📅 기간', CAMP_INFO.dates],
                ['🕘 시간', CAMP_INFO.hours],
                ['🚪 입실', CAMP_INFO.arrival],
                ['🚌 차량', CAMP_INFO.transport],
                ['🎯 대상', CAMP_INFO.target],
                ['💝 포함', CAMP_INFO.includes],
                ['📝 신청 마감', CAMP_INFO.applyDeadline],
                ['🐤 1차 마감', CAMP_INFO.earlyBirdDeadline],
              ].map(([k, v]) => (
                <div key={k} className="flex items-start gap-4 border-b border-april-navy/5 pb-3 last:border-none last:pb-0">
                  <dt className="w-24 shrink-0 text-sm font-semibold text-april-navy-soft">{k}</dt>
                  <dd className="flex-1 text-sm font-medium text-april-navy">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}

function formatWon(n) {
  return n.toLocaleString('ko-KR') + '원'
}

function Activities() {
  return (
    <section id="activities" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle
          eyebrow="Interactive Activities"
          title="이렇게 영어를 씁니다"
          description="문제만 푸는 영어가 아닌, 실제로 써보는 영어. 캠프에서 진행하는 대표 액티비티를 소개합니다."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {ACTIVITIES.map((act, i) => (
            <div
              key={act.title}
              className={`group relative overflow-hidden rounded-3xl border border-april-navy/10 p-7 transition hover:-translate-y-1 hover:border-april-lime/40 hover:shadow-soft ${
                i === 4 ? 'md:col-span-2' : ''
              }`}
            >
              <div className="absolute -right-4 -top-4 text-7xl opacity-10 transition group-hover:scale-110 group-hover:opacity-20">
                {act.icon}
              </div>
              <div className="relative">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-april-lime-soft text-2xl">
                    {act.icon}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-april-navy">{act.title}</h3>
                    <p className="text-xs font-medium text-april-lime-dark">{act.subtitle}</p>
                  </div>
                </div>
                <p className="mt-5 text-sm leading-relaxed text-april-navy-soft">{act.desc}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {act.skills.map((s) => (
                    <span
                      key={s}
                      className="rounded-full bg-april-cream px-3 py-1 text-xs font-semibold text-april-navy"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-center gap-3 rounded-2xl bg-april-lime-soft/40 p-6 text-center">
          <p className="text-sm font-semibold text-april-navy">
            📘 캠프의 핵심은 <strong className="text-april-lime-dark">즐겁게, 그러나 제대로</strong>
          </p>
          <p className="max-w-xl text-sm text-april-navy-soft">
            그냥 즐겁기만 한 체험도, 문제만 푸는 수업도 아닙니다. 2주라는 짧은 시간 동안 아이들이
            <strong className="text-april-navy"> 영어를 도구로 쓰는 경험</strong>을 합니다.
          </p>
          <a
            href={CAMP_INFO.blogUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-2 text-xs font-bold text-april-lime-dark hover:underline"
          >
            네이버 블로그에서 더 많은 액티비티 사례 보기 →
          </a>
        </div>
      </div>
    </section>
  )
}

function Fees() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle
          eyebrow="Tuition"
          title="수강료 안내"
          description="할인 조건을 최대 3가지까지 중복 적용하실 수 있어요."
        />

        {/* 정가 */}
        <div className="mt-14 overflow-hidden rounded-3xl bg-gradient-to-br from-april-navy to-[#1A2533] p-10 text-white sm:p-14">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-april-lime">
                정가 (All Inclusive)
              </p>
              <p className="mt-3 text-5xl font-extrabold sm:text-6xl">
                {formatWon(BASE_FEE)}
              </p>
              <p className="mt-3 text-sm text-white/70">
                {CAMP_INFO.includes}
              </p>
            </div>
            <div className="rounded-2xl bg-white/10 px-5 py-3 text-sm backdrop-blur">
              <p className="text-white/60">최대 할인 적용 시</p>
              <p className="mt-1 text-2xl font-extrabold text-april-lime">
                {formatWon(770000)}
              </p>
            </div>
          </div>
        </div>

        {/* 할인 티어 */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {DISCOUNT_TIERS.map((tier) => (
            <div
              key={tier.off}
              className={`rounded-2xl border-2 p-6 transition ${
                tier.highlight
                  ? 'border-april-lime bg-april-lime-soft shadow-soft'
                  : 'border-april-navy/10 bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${
                    tier.highlight
                      ? 'bg-april-lime text-white'
                      : 'bg-april-lime-soft text-april-lime-dark'
                  }`}
                >
                  {tier.off}% OFF
                </span>
                {tier.highlight && (
                  <span className="text-xs font-bold text-april-lime-dark">BEST</span>
                )}
              </div>
              <p className="mt-4 text-sm font-semibold text-april-navy-soft">{tier.label}</p>
              <p className="mt-1 text-3xl font-extrabold text-april-navy">
                {formatWon(tier.price)}
              </p>
              <p className="mt-2 text-xs text-april-navy-soft">{tier.subtitle}</p>
            </div>
          ))}
        </div>

        {/* 할인 조건 */}
        <div className="mt-12 rounded-3xl border border-april-navy/10 bg-white p-8 sm:p-10">
          <div className="flex items-start gap-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-april-lime-soft text-xl">
              🎁
            </span>
            <div>
              <h3 className="text-xl font-bold text-april-navy">할인 조건 (각 10%)</h3>
              <p className="mt-1 text-sm text-april-navy-soft">
                아래 조건 중 해당하시는 항목이 많을수록 더 큰 혜택을 받으실 수 있어요. 최대 3가지 중복 가능.
              </p>
            </div>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {DISCOUNT_CONDITIONS.map((c) => (
              <div
                key={c.name}
                className="flex items-start gap-3 rounded-xl bg-april-cream p-4"
              >
                <span className="mt-0.5 text-april-lime-dark">✓</span>
                <div>
                  <p className="text-sm font-bold text-april-navy">{c.name}</p>
                  <p className="mt-0.5 text-xs text-april-navy-soft">{c.detail}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 flex items-start gap-3 rounded-xl border border-april-lime/30 bg-april-lime-soft/40 p-4">
            <span className="text-lg">⭐</span>
            <p className="text-sm text-april-navy">
              <strong className="text-april-lime-dark">친구 소개(비재원생)</strong> 등록 시 별도로{' '}
              <strong>30% 할인</strong>이 단독 적용됩니다.
            </p>
          </div>
        </div>

        {/* 환불 정책 */}
        <div className="mt-12">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-april-navy">환불 정책</h3>
            <span className="text-xs text-april-navy-soft">기준일: 입금일</span>
          </div>
          <div className="mt-6 overflow-hidden rounded-2xl border border-april-navy/10">
            {REFUND_POLICY.map((r, i) => (
              <div
                key={r.date}
                className={`flex items-center gap-4 px-6 py-4 ${
                  i % 2 === 0 ? 'bg-white' : 'bg-april-cream'
                }`}
              >
                <span className="w-40 shrink-0 text-sm font-semibold text-april-navy">
                  {r.date}
                </span>
                <span
                  className={`text-sm font-bold ${
                    r.tone === 'good'
                      ? 'text-april-lime-dark'
                      : r.tone === 'bad'
                        ? 'text-red-500'
                        : 'text-april-navy-soft'
                  }`}
                >
                  {r.rate}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 블로그 링크 */}
        <a
          href={CAMP_INFO.blogUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-12 flex items-center justify-between gap-4 rounded-2xl border border-april-navy/10 bg-white p-6 transition hover:border-april-lime/40 hover:shadow-soft"
        >
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#03C75A] text-xl text-white">
              N
            </span>
            <div>
              <p className="text-sm font-semibold text-april-navy-soft">자세한 액티비티 안내</p>
              <p className="text-base font-bold text-april-navy">
                네이버 블로그에서 더 보기
              </p>
            </div>
          </div>
          <span className="text-lg text-april-navy-soft transition group-hover:translate-x-1 group-hover:text-april-lime-dark">
            →
          </span>
        </a>
      </div>
    </section>
  )
}

function Apply() {
  const [form, setForm] = useState({
    studentName: '',
    grade: '',
    parentName: '',
    phone: '',
    email: '',
    studentType: '비재원생',
    level: '레벨테스트 후 결정',
    note: '',
    consent: false,
  })
  const [error, setError] = useState('')

  const update = (k) => (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm((f) => ({ ...f, [k]: val }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.studentName.trim() || !form.parentName.trim() || !form.phone.trim()) {
      setError('학생 이름, 보호자 이름, 연락처는 필수입니다.')
      return
    }
    if (!form.consent) {
      setError('개인정보 수집·이용에 동의해주세요.')
      return
    }
    setError('')

    const subject = encodeURIComponent(
      `[여름캠프 신청] ${form.studentName} (${form.grade || '학년 미입력'})`,
    )
    const body = encodeURIComponent(
      [
        '※ 2026 여름캠프 신청서 ※',
        '',
        `학생 이름: ${form.studentName}`,
        `학년: ${form.grade}`,
        `재원 여부: ${form.studentType}`,
        `보호자 이름: ${form.parentName}`,
        `연락처: ${form.phone}`,
        `이메일: ${form.email}`,
        `희망 레벨: ${form.level}`,
        '',
        '— 요청 사항 / 알레르기 —',
        form.note || '(없음)',
        '',
        '— 개인정보 수집·이용 동의: 동의함 —',
      ].join('\n'),
    )

    window.location.href = `mailto:${CAMP_INFO.email}?subject=${subject}&body=${body}`
  }

  const inputCls =
    'w-full rounded-xl border border-april-navy/15 bg-white px-4 py-3 text-sm text-april-navy placeholder:text-april-navy-soft/60 focus:border-april-lime focus:outline-none focus:ring-2 focus:ring-april-lime/30'

  return (
    <section id="apply" className="bg-april-navy py-20 text-white sm:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
            <span className="h-1.5 w-1.5 rounded-full bg-april-lime" />
            Apply Now
          </div>
          <h2 className="text-3xl font-bold sm:text-4xl">캠프 신청하기</h2>
          <p className="mt-4 text-base text-white/70 sm:text-lg">
            아래 정보를 입력하시면 담당 선생님이 1영업일 내 연락드립니다.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-12 rounded-3xl bg-white p-8 text-april-navy shadow-soft sm:p-10"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold">
                학생 이름 <span className="text-april-lime-dark">*</span>
              </label>
              <input
                type="text"
                value={form.studentName}
                onChange={update('studentName')}
                placeholder="홍길동"
                className={inputCls}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold">학년</label>
              <select value={form.grade} onChange={update('grade')} className={inputCls}>
                <option value="">선택해주세요</option>
                <option>예비 초1</option>
                <option>초1</option>
                <option>초2</option>
                <option>초3</option>
                <option>초4</option>
                <option>초5</option>
                <option>초6</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold">
                보호자 이름 <span className="text-april-lime-dark">*</span>
              </label>
              <input
                type="text"
                value={form.parentName}
                onChange={update('parentName')}
                placeholder="홍부모"
                className={inputCls}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold">
                연락처 <span className="text-april-lime-dark">*</span>
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={update('phone')}
                placeholder="010-0000-0000"
                className={inputCls}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-semibold">이메일</label>
              <input
                type="email"
                value={form.email}
                onChange={update('email')}
                placeholder="parent@example.com"
                className={inputCls}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold">재원 여부</label>
              <select value={form.studentType} onChange={update('studentType')} className={inputCls}>
                <option>비재원생</option>
                <option>재원생</option>
                <option>형제·자매 동반</option>
                <option>친구 소개로 등록</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold">희망 레벨</label>
              <select value={form.level} onChange={update('level')} className={inputCls}>
                <option>레벨테스트 후 결정</option>
                <option>Sprout (새싹반 · 입문~기초)</option>
                <option>Bloom (개화반 · 중급)</option>
                <option>Harvest (열매반 · 심화)</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-semibold">
                요청 사항 / 알레르기 등
              </label>
              <textarea
                value={form.note}
                onChange={update('note')}
                rows={4}
                placeholder="식품 알레르기, 컨디션 관련 참고 사항, 상담 희망 시간 등을 자유롭게 적어주세요."
                className={inputCls}
              />
            </div>
          </div>

          <label className="mt-6 flex items-start gap-3 rounded-xl bg-april-cream p-4 text-sm">
            <input
              type="checkbox"
              checked={form.consent}
              onChange={update('consent')}
              className="mt-1 h-4 w-4 accent-april-lime"
            />
            <span className="text-april-navy-soft">
              <strong className="text-april-navy">개인정보 수집·이용에 동의합니다.</strong>
              <br />
              수집 항목: 이름, 학년, 연락처, 이메일 / 이용 목적: 캠프 신청 상담 / 보관 기간: 캠프 종료 후 30일까지.
            </span>
          </label>

          {error && (
            <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm font-medium text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="mt-6 w-full rounded-full bg-april-lime py-4 text-base font-bold text-white shadow-soft transition hover:bg-april-lime-dark"
          >
            신청서 전송하기 →
          </button>
          <p className="mt-3 text-center text-xs text-april-navy-soft">
            전송 버튼을 누르면 이메일 작성 창이 열립니다. 그대로 보내주시면 접수돼요.
          </p>
        </form>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <a
            href={`tel:${CAMP_INFO.phone}`}
            className="rounded-2xl bg-white/5 p-5 text-center transition hover:bg-white/10"
          >
            <p className="text-xs text-white/60">전화 상담</p>
            <p className="mt-1 font-bold">{CAMP_INFO.phone}</p>
          </a>
          <a
            href={`mailto:${CAMP_INFO.email}`}
            className="rounded-2xl bg-white/5 p-5 text-center transition hover:bg-white/10"
          >
            <p className="text-xs text-white/60">이메일</p>
            <p className="mt-1 break-all font-bold">{CAMP_INFO.email}</p>
          </a>
          <div className="rounded-2xl bg-white/5 p-5 text-center">
            <p className="text-xs text-white/60">위치</p>
            <p className="mt-1 font-bold">{CAMP_INFO.address}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  return (
    <section className="bg-april-cream py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <SectionTitle eyebrow="FAQ" title="자주 묻는 질문" />
        <div className="mt-12 space-y-3">
          {FAQS.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-april-navy/10 bg-white p-5 open:border-april-lime/30"
            >
              <summary className="flex cursor-pointer items-center justify-between text-sm font-bold text-april-navy">
                <span>Q. {item.q}</span>
                <span className="text-april-lime-dark transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-april-navy-soft">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-april-navy/5 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <AprilLogo />
        <nav className="hidden items-center gap-7 text-sm font-semibold text-april-navy md:flex">
          <a href="#program" className="transition hover:text-april-lime-dark">프로그램</a>
          <a href="#activities" className="transition hover:text-april-lime-dark">액티비티</a>
          <a href="#apply" className="transition hover:text-april-lime-dark">신청하기</a>
          <a
            href={`tel:${CAMP_INFO.phone}`}
            className="rounded-full bg-april-lime px-4 py-2 text-white shadow-soft transition hover:bg-april-lime-dark"
          >
            전화 상담
          </a>
        </nav>
        <a
          href="#apply"
          className="rounded-full bg-april-lime px-4 py-2 text-sm font-semibold text-white md:hidden"
        >
          신청
        </a>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="border-t border-april-navy/10 bg-white py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-center md:flex-row md:text-left">
        <AprilLogo />
        <div className="text-xs text-april-navy-soft">
          © 2026 April어학원 마포상암캠퍼스 · 본 페이지는 캠프 신청 안내용 페이지입니다.
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Why />
        <Program />
        <Activities />
        <Fees />
        <Apply />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}
