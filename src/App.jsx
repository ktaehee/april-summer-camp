import { useState, useEffect } from 'react'

// ─────────────────────────────────────────────────────────────
// 📸 사진 갤러리 설정
// 갤러리 비밀번호 — 원하는 값으로 바꾸세요. (학부모님께 이 비밀번호를 안내)
const GALLERY_PASSWORD = 'april2026'
// src/gallery/day1, day2 ... 폴더에 넣은 사진들을 날짜별로 자동으로 불러옵니다.
// (day 폴더에 사진 파일만 추가하면 해당 날짜 탭에 나타남)
const galleryModules = import.meta.glob(
  './gallery/**/*.{jpg,jpeg,png,webp,gif,JPG,JPEG,PNG,WEBP}',
  { eager: true },
)
// day 폴더에 mp4/webm을 넣으면 해당 날짜 탭 사진 위에 영상 플레이어로 나타남.
// ⚠️ 원본이 HEVC(H.265)면 브라우저가 재생 못 함 — ffmpeg로 H.264 변환 후 넣을 것.
const videoModules = import.meta.glob(
  './gallery/**/*.{mp4,webm,MP4,WEBM}',
  { eager: true },
)
const GALLERY_VIDEOS = (() => {
  const byDay = {}
  Object.keys(videoModules)
    .sort()
    .forEach((k) => {
      const m = k.match(/\.\/gallery\/([^/]+)\//)
      const day = m ? m[1] : '기타'
      if (!byDay[day]) byDay[day] = []
      byDay[day].push({ src: videoModules[k].default, name: k.split('/').pop() })
    })
  return byDay
})()
const GALLERY_DAYS = (() => {
  const byDay = {}
  Object.keys(galleryModules)
    .sort()
    .forEach((k) => {
      const m = k.match(/\.\/gallery\/([^/]+)\//)
      const day = m ? m[1] : '기타'
      if (!byDay[day]) byDay[day] = []
      byDay[day].push({ src: galleryModules[k].default, name: k.split('/').pop() })
    })
  return Object.keys(byDay)
    .sort((a, b) => {
      const na = parseInt(a.replace(/\D/g, ''), 10)
      const nb = parseInt(b.replace(/\D/g, ''), 10)
      if (!isNaN(na) && !isNaN(nb)) return na - nb
      return a.localeCompare(b)
    })
    .map((d) => ({
      key: d,
      label: /^day\d+$/i.test(d) ? 'Day ' + d.replace(/\D/g, '') : d,
      photos: byDay[d],
    }))
})()

// 📝 하루 활동 리포트 — 갤러리에서 해당 날짜 사진 위에 함께 보여준다.
// 새 날짜는 아래에 day2, day3 ... 형태로 추가하면 자동으로 붙는다.
const DAY_REPORTS = {
  day1: {
    icon: '🏰',
    theme: 'Sorting Day',
    title: 'Opening & Sorting Hat',
    date: '2026년 8월 3일 (월) · 캠프 첫날',
    intro:
      '캠프의 문을 여는 첫날, 아이들은 2주를 함께할 원어민 선생님들과 인사를 나눈 뒤 Sorting Ceremony(기숙사 배정식)로 하루를 시작했어요. 선생님이 이름을 부르면 아이가 앞자리에 앉고, 화면에 그 친구의 영어 이름이 크게 떠올라요. 그리고 Sorting Hat을 씌워주는 순간 — 웃음을 참지 못하는 친구, 눈을 꼭 감고 진지하게 기다리는 친구. 아이들에겐 "이제 진짜 시작이구나" 하는 신호였어요.',
    houses: ['🦁 Gryffindor', '🐍 Slytherin', '🦅 Ravenclaw', '🦡 Hufflepuff'],
    housesNote:
      '네 하우스에 배정된 아이들은 앞으로 2주 동안 한 팀으로 움직여요. 하우스마다 회장과 부회장도 직접 정했어요. 활동마다 쌓이는 House Point는 마지막 날 시상식에서 챔피언을 가리게 돼요.',
    takeaways: [
      { label: '영어 이름', text: '오늘부터 서로를 영어 이름으로 불러요. 한국어 이름을 잠시 내려놓는 것만으로 영어를 쓰는 마음의 문턱이 낮아져요.' },
      { label: '소속감', text: '"나는 그리핀도르야" 한마디가 낯선 첫날의 어색함을 빠르게 녹여줬어요.' },
      { label: '동기', text: 'Stamp & House Point 제도를 안내받으며, 작은 도전 하나하나가 우리 팀의 점수가 된다는 걸 알게 됐어요.' },
    ],
    tomorrow: '📰 Day 2 · Media Day — Breaking News · 직접 취재하고 리포트를 쓰고 카메라 앞에서 발표해요.',
  },
  day2: {
    icon: '📰',
    theme: 'Media Day',
    title: 'Breaking News',
    date: '2026년 8월 4일 (화) · 캠프 둘째 날',
    intro:
      '레벨별로 나뉘어 직접 취재하고, 리포트를 쓰고, 카메라 앞에서 뉴스를 전하는 하루였어요. 어제 하우스가 정해지며 서로 이름을 익힌 아이들이라, 오늘은 팀으로 머리를 맞대는 모습이 훨씬 자연스러웠어요.',
    takeaways: [
      {
        label: '기자가 되어 본 하루',
        text: '레벨별로 나뉘어 직접 취재하고, 영어로 기사를 쓰고, 카메라 앞에서 뉴스로 전했어요. 읽고 쓰는 영어와 말하는 영어가 하나로 이어지는 하루였어요.',
      },
      {
        label: '쉬는 시간도 영어로',
        text: '간식 시간 팻말도 "Snack Time", 점심 배식대에는 "Food"와 "Bon appétit". 수업이 끝나도 눈에 들어오는 글자가 계속 영어라, 아이들이 자연스럽게 영어 환경 안에 머물러요.',
      },
      {
        label: '스스로 하는 정리',
        text: '배식대 옆에 "food waste"와 "disposable waste" 안내를 영어로 붙여두고, 다 먹은 뒤 아이들이 직접 분리해서 버렸어요. 생활 속 단어를 몸으로 익히는 시간이에요.',
      },
    ],
    tomorrow: '🎲 Day 3 · Game Day — Board Game Cafe · 영어로만 진행되는 보드게임 토너먼트가 열려요. (House 포인트 반영)',
  },
  day3: {
    icon: '🎲',
    theme: 'Game Day',
    title: 'Board Game Cafe',
    date: '2026년 8월 5일 (수) · 캠프 셋째 날',
    intro:
      '학원이 하루 동안 보드게임 카페로 변신했어요. 교실마다 다른 게임이 열렸어요 — 젠가 탑을 사이에 두고 숨죽인 테이블, 종을 먼저 치려고 손을 겨누는 카드 게임 테이블, 원어민 선생님과 주사위를 굴리는 모노폴리 테이블, 그리고 체스판 앞에서 턱을 괴고 다음 수를 고민하는 얼굴까지. 규칙 설명도, 순서 다툼도, 승리의 환호도 전부 영어로 오갔어요.',
    takeaways: [
      {
        label: '게임의 언어는 영어',
        text: '"It\'s my turn", "We won!" — 게임에 몰입하다 보면 이기고 싶어서라도 영어가 먼저 튀어나와요. 교실 벽에 붙은 표현 카드들이 그대로 게임 테이블의 말이 됐어요.',
      },
      {
        label: '차례와 규칙',
        text: '젠가도 체스도 모노폴리도 결국 차례를 기다리는 게임이에요. 상대의 수를 지켜보며 기다리는 법, 규칙 안에서 이기는 법을 함께 연습했어요.',
      },
      {
        label: '우리 하우스를 위해',
        text: '그냥 노는 게임이 아니라 토너먼트였어요. 이긴 만큼 우리 하우스 점수가 올라가니, 응원도 아쉬움도 자연스럽게 영어로 터져 나왔어요.',
      },
      {
        label: '점심도 함께',
        text: '"Food" 팻말 아래 줄 서서 점심을 받았어요. 사흘째가 되니 배식 줄이 제법 익숙하고 의젓해요.',
      },
    ],
    tomorrow: '🦈 Day 4 · Maker Day — T-shirt + Shark Tank · 나만의 티셔츠를 만들고 브랜드 피칭에 도전해요.',
  },
  day4: {
    icon: '🦈',
    theme: 'Maker Day',
    title: 'T-shirt + Shark Tank',
    date: '2026년 8월 6일 (목) · 캠프 넷째 날',
    intro:
      '오늘은 아이들이 디자이너이자 사업가가 된 날이에요. 새하얀 티셔츠와 패브릭 마커 16색을 받아 들고, 각자 세상에 하나뿐인 티셔츠를 만들었어요. 마인크래프트, 상어, 무지개와 하트 — 그려 넣은 그림도 아이들 수만큼 제각각이에요. 그리고 이어진 Shark Tank. 만드는 것으로 끝이 아니라, 자기 티셔츠를 하나의 브랜드로 소개하고 투자자 앞에서 파는 자리예요. 조명과 카메라가 세팅되고 심사위원 선생님들이 앉은 앞으로, 아이들이 한 명씩 나가 준비한 피칭을 했어요. 원고를 두 손에 꼭 쥐고 선 아이, 발표를 마치고 악수를 나누며 활짝 웃는 아이 — 긴장과 뿌듯함이 같이 담긴 시간이었어요.',
    takeaways: [
      {
        label: '파는 말은 다르다',
        text: '"이건 제가 그렸어요"에서 멈추지 않고, 왜 좋은지, 누가 사면 좋을지까지 말해야 하는 자리였어요. 설명하는 영어와 설득하는 영어가 어떻게 다른지 몸으로 겪었어요.',
      },
      {
        label: '심사위원 앞에 서기',
        text: '조명과 카메라까지 갖춘 진짜 피칭 무대였어요. 자기 차례를 기다렸다가 앞에 나가 발표하고, 끝나면 악수를 나눴어요. 그 악수 한 번에 아이들 표정이 확 펴졌어요.',
      },
      {
        label: '내가 만든 걸 입는 경험',
        text: '그림을 그리는 데서 끝나지 않고, 완성한 티셔츠를 바로 입고 카메라 앞에 섰어요. 내 손으로 만든 것을 자랑스러워하는 표정들이 사진에 그대로 담겼어요.',
      },
      {
        label: '아이디어를 설명하는 힘',
        text: '무엇을 그릴지, 왜 그렸는지 — 만드는 과정 내내 자기 디자인을 영어로 이야기했어요. 만들기가 곧 말하기 연습이 되는 하루였어요.',
      },
      {
        label: '남는 것',
        text: '오늘의 티셔츠는 캠프가 끝나도 옷장에 남아요. 입을 때마다 이번 여름이 생각날 거예요.',
      },
    ],
    tomorrow: '✉️ Day 5 · Postcard Day — Postcard Art + Letter · 엽서를 만들고 가족에게 영어 편지를 써요.',
  },
  day5: {
    icon: '✉️',
    theme: 'Postcard Day',
    title: 'Postcard Art + Letter',
    date: '2026년 8월 7일 (금) · 캠프 다섯째 날',
    intro:
      '1주차 마지막 날은 손으로 꾹꾹 눌러쓰는 하루였어요. 아이들은 각자 여름 감성의 엽서를 꾸미고 그 위에 영어로 편지를 썼어요. 반짝이는 하트와 별, 색색의 보석 스티커로 테두리를 채우고, 남은 자리에는 한 줄 한 줄 자기 문장을 적어 넣었어요. 편지의 수신인은 레벨에 따라 달랐어요. 부모님께 쓴 아이도, 미래의 자기 자신에게 쓴 아이도 있어요. 미래의 나에게 보낸 편지는 타임캡슐로 봉해 두었어요.',
    takeaways: [
      {
        label: '읽는 사람이 있는 영어',
        text: '문제집의 빈칸이 아니라 받는 사람이 있는 글이에요. 누구에게 무엇을 전할지 정하고 나면, 쓰고 싶은 문장이 먼저 떠올라요.',
      },
      {
        label: '미래의 나에게',
        text: '타임캡슐에 넣을 편지를 쓰려면 지금의 나를 한 번 돌아봐야 해요. 영어로 쓰는 김에 마음도 한 번 정리하고 가는 시간이었어요.',
      },
      {
        label: '꾸미는 시간도 수업',
        text: '스티커를 어디에 붙일지 고르는 동안에도 아이들은 계속 영어로 이야기를 나눴어요. 손이 바쁜 활동일수록 말은 오히려 편하게 나와요.',
      },
      {
        label: '집으로 가는 작품',
        text: '완성한 엽서는 아이가 직접 전해드릴 거예요. 캠프에서 무엇을 했는지 아이의 글씨로 확인하실 수 있어요.',
      },
    ],
    tomorrow: '🏃 Day 6 · Adventure Day — Amazing Race · 주말을 쉬고, 월요일에는 학원 전체를 무대로 영어 미션 투어를 해요. (House 포인트 반영)',
  },
  day7: {
    icon: '🎤',
    theme: 'Talent Day',
    title: "April's Got Talent",
    date: '2026년 8월 11일 (화) · 캠프 일곱째 날',
    intro:
      "April's Got Talent가 열린 날이에요. 노래, 댄스 — 저마다 준비한 장기를 무대에서 보여줬어요. 아이들 손에는 순서가 빼곡히 적힌 프로그램지가 들려 있었고, 객석에서는 하우스 응원 피켓이 올라갔어요. \"GO SLYTHERIN\", \"Ravenclaw\" — 아이들이 직접 만들어 든 피켓이에요. 무대가 끝난 뒤에는 바닥 가득 흩어진 색종이 사이에서, 선생님들까지 다 같이 모여 사진을 찍었어요.",
    takeaways: [
      {
        label: '앞에 나서는 용기',
        text: '사람들 앞에서 영어로 무언가를 보여주는 건 어른에게도 쉽지 않아요. 2주 가까이 같이 지낸 친구들 앞이라 아이들이 한 걸음 더 나갈 수 있었어요.',
      },
      {
        label: '응원하는 쪽도 주인공',
        text: '피켓을 만들고 하우스 이름을 외치는 것도 오늘의 활동이었어요. 무대에 서지 않는 순간에도 아이들은 계속 영어 안에 머물러 있었어요.',
      },
      {
        label: '2주가 만든 사이',
        text: '첫날엔 서로 이름도 몰랐던 아이들이, 이제 팀 이름을 목청껏 외쳐요. 간식 시간에 카메라를 보고 다 같이 브이를 하는 모습에서도 그동안 쌓인 시간이 보여요.',
      },
    ],
    tomorrow: '🌍 Day 8 · World Citizen Day — Mini UN · 세계 시민이 되어 글로벌 이슈를 놓고 영어로 토론하고 발표해요.',
  },
}
// ─────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────
// 📌 신청 폼 → 구글 시트 자동 입력 설정
// 「2026 여름 캠프 등록(직원)」 탭에 자동으로 들어오게 하려면,
// Google Apps Script 웹앱을 배포한 뒤 발급된 URL을 아래 따옴표 안에 붙여넣으세요.
// (배포 방법은 apps-script/README.md 참고)
// 비워두면('') 제출 시 이메일 작성 창이 열리는 방식으로 동작합니다.
const SHEET_ENDPOINT = 'https://script.google.com/macros/s/AKfycbwhGykzCpdbd_MQ_wZvcVAqbAjpyBgDIAMSCHeWyP7Brw2HeHcC7nahMJlKci8ILeUrGA/exec'
// 재원생 레벨 선택 옵션
const ENROLLED_LEVELS = [
  'Seedbed Alpha', 'Seed 1', 'Seed 2',
  'Sprout 1', 'Sprout 2', 'Sprout 3',
  'Sapling 1', 'Sapling 2', 'JM1', 'JM2',
]

// 신청 접수 마감 스위치.
// true면 신청 CTA·D-DAY 배지·신청폼이 전부 마감 안내로 바뀐다.
// 다음 기수를 열 때는 이 값을 false로 되돌리고 CAMP_INFO의 날짜만 갈아끼우면 된다.
const APPLICATIONS_CLOSED = true

const CAMP_INFO = {
  title: '2026 여름 캠프',
  subtitle: '청담에이프릴 마포상암캠퍼스 Summer Camp',
  campus: '청담에이프릴 마포상암캠퍼스',
  tagline: '2주 몰입 영어, 알찬 여름의 시작',
  dates: '2026년 8월 3일(월) ~ 8월 14일(금) · 총 10회',
  hours: '평일 09:00 ~ 14:20 (총 55시간)',
  arrival: '등원 08:00부터 가능',
  transport: '등원 — 개인 등원만 / 하원 — 차량 배정',
  target: '유아 ~ 초등 (레벨테스트 후 반 배정)',
  capacity: '반별 정원 12명 (소수 정예)',
  earlyBirdDeadline: '2026년 6월 30일(화)까지 (1차 마감 · 얼리버드 할인 마감)',
  applyDeadline: '2026년 7월 15일(수)까지 (2차 마감 / 7월 11일부터 환불 불가 · 환불 정책 참고)',
  shuttleArea:
    '성산동 · 중동 · 서교동 · 동교동 · 망원동 · 연남동 · 상암동 · 덕은동 · 증산동 · 수색동 · 남가좌동 · 북가좌동 · 가재울 · 합정동',
  phone: '02-333-5620',
  email: 'sangam@april.creverse.com',
  address: '서울시 마포구 월드컵북로 99, 3F',
  mapUrl: 'https://map.naver.com/p/search/' + encodeURIComponent('에이프릴어학원 마포상암캠퍼스'),
  blogUrl: 'https://blog.naver.com/aprilsangam/224291533846',
  includes: '수업비 · 식비 · 간식비 · 교재비 · 활동비 · 재료비 · 하원 차량비',
}

// 캠프는 영어 레벨에 따라 7단계로 나뉘며, 4개 그룹으로 묶어 운영합니다.
const LEVEL_GROUPS = [
  {
    group: 'Group 1',
    name: '입문',
    icon: '🌱',
    target: '파닉스 ~ 영어 입문',
    color: 'from-april-lime-soft to-april-cream',
    accent: 'bg-april-lime',
    accentText: 'text-white',
    levels: [
      { name: 'Rookie', internal: 'Phonics Starter' },
      { name: 'Basic', internal: 'Seedbed Alpha' },
    ],
  },
  {
    group: 'Group 2',
    name: '중급',
    icon: '🌿',
    target: '문장 읽기 · 쓰기 가능',
    color: 'from-yellow-50 to-april-cream',
    accent: 'bg-april-sun',
    accentText: 'text-april-navy',
    levels: [
      { name: 'Intermediate A', internal: 'Seed 1' },
      { name: 'Intermediate B', internal: 'Seed 2' },
    ],
  },
  {
    group: 'Group 3',
    name: '심화',
    icon: '🌳',
    target: '챕터북 독해 · 토론 가능',
    color: 'from-april-lime-soft to-yellow-50',
    accent: 'bg-april-navy',
    accentText: 'text-white',
    levels: [
      { name: 'Advance', internal: 'Sprout 1~2' },
      { name: 'Master', internal: 'Sprout 3 ~ Sapling 1' },
    ],
  },
  {
    group: 'Group 4',
    name: '최상위',
    icon: '🌲',
    target: '원서 · 에세이 · 심화 토론',
    color: 'from-april-cream to-april-lime-soft',
    accent: 'bg-april-lime-dark',
    accentText: 'text-white',
    levels: [
      { name: 'Ivy', internal: 'Sapling 2 ~ JM2' },
    ],
  },
]

// 10일 데일리 테마 프로그램 (2026 최종 확정안)
// tags: '전체 통합' · '레벨별 진행' · 'House 포인트' · '전체 관람'
const PROGRAM_DAYS = [
  { day: 1, date: '8/3 월', theme: 'Sorting Day', icon: '🏰', title: 'Opening + Sorting Hat', desc: '원어민 선생님 소개 · 하우스 배정(회장/부회장) · Stamp&House 제도 소개 · 기념 사진', tags: ['전체 통합'] },
  { day: 2, date: '8/4 화', theme: 'Media Day', icon: '📰', title: 'Breaking News', desc: '취재 · 리포트 · 발표', tags: ['레벨별 진행'] },
  { day: 3, date: '8/5 수', theme: 'Game Day', icon: '🎲', title: 'Board Game Cafe', desc: '영어 전용 토너먼트', tags: ['전체 통합', 'House 포인트'] },
  { day: 4, date: '8/6 목', theme: 'Maker Day', icon: '🦈', title: 'T-shirt + Shark Tank', desc: '제작 → 브랜드 피칭', tags: ['레벨별 진행', 'House 포인트', '전체 통합'] },
  { day: 5, date: '8/7 금', theme: 'Postcard Day', icon: '✉️', title: 'Postcard Art + Letter', desc: '엽서 · 가족 편지 · 타임캡슐', tags: ['레벨별 진행'] },
  { day: 6, date: '8/10 월', theme: 'Adventure Day', icon: '🏃', title: 'Amazing Race', desc: '학원 전체 영어 미션 투어', tags: ['전체 통합', 'House 포인트'] },
  { day: 7, date: '8/11 화', theme: 'Talent Day', icon: '🎤', title: "April's Got Talent", desc: '노래 · 댄스 등 장기자랑 무대', tags: ['전체 통합', 'House 포인트'] },
  { day: 8, date: '8/12 수', theme: 'World Citizen Day', icon: '🌍', title: 'Mini UN', desc: '글로벌 이슈 · 토론 · 발표', tags: ['레벨별 진행'] },
  { day: 9, date: '8/13 목', theme: 'Speaker Day', icon: '🎙️', title: 'TED-Style Talk', desc: '구조화 발표 · 논리적 설득', tags: ['레벨별 진행', '전체 관람'] },
  { day: 10, date: '8/14 금', theme: 'Finale Day', icon: '🏆', title: 'Highlight Movie + 시상식 + Market Day', desc: 'House 챔피언 시상 · Market Day', tags: ['전체 통합'] },
]

// Activity (SEL Therapy) — Theme 외에 진행되는 마음·신체 활동 (Activity 30분)
const ACTIVITY_THERAPY = [
  {
    icon: '🕊️',
    name: 'Peace Corner 꾸미기',
    theme: '우리만의 공간',
    desc: "화나거나 힘들 때 혼자 마음을 가라앉히고 조용히 앉을 수 있는 '우리만의 안정 공간'을 함께 꾸밉니다. 테라피 음악 속에서 코너를 만들고 한 명씩 앉아 소감을 나눠요.",
  },
  {
    icon: '🧰',
    name: 'Calm Down Toolkit',
    theme: '마음 진정 도구',
    desc: "영화 'Sound of Music'의 My Favorite Things를 감상한 뒤, 나를 행복하게 하는 10가지를 적어보며 마음을 진정시키는 나만의 도구를 만듭니다.",
  },
  {
    icon: '🕺',
    name: 'Freeze Dance + Cup Stacking',
    theme: '신체 활동',
    desc: '음악이 멈추면 그 자리에서 얼음! Freeze Dance로 몸을 풀고, 영어로만 지시하며 컵을 높이 쌓는 Cup Stacking 협동 게임으로 에너지를 발산합니다.',
  },
  {
    icon: '🎵',
    name: 'My Emotion Playlist',
    theme: '기분과 음악',
    desc: '음악과 감정의 관계를 이야기하고, 각자 좋아하는 영어 노래를 영어로 소개하고 함께 들으며 마음에 드는 가사를 필사하고 따라 불러봅니다.',
  },
  {
    icon: '💛',
    name: 'Compliment Bomb',
    theme: '친구 칭찬',
    desc: '친구에게 칭찬 포스트잇을 써서 전하고, 나 자신에게도 셀프 칭찬 카드를 적어요. 칭찬의 힘과 자기 사랑을 함께 배우는 따뜻한 마무리 활동입니다.',
  },
  {
    icon: '✉️',
    name: 'Postcard Art + Letter',
    theme: '엽서 아트 + 편지',
    desc: '여름 감성의 엽서를 직접 꾸미고, 레벨별로 부모님에게 혹은 미래의 나에게 영어 편지를 씁니다.',
  },
  {
    icon: '🎨',
    name: '컬러링 (Coloring)',
    theme: '감정 표현 · 힐링',
    desc: '테라피 음악을 배경으로 꽃·엽서·동화 삽화 밑그림을 자유롭게 색칠하며 마음을 힐링하는 시간입니다.',
  },
]

// 하루 시간표
const TIMETABLE = [
  { period: '등원', time: '08:00 ~ 08:50', activity: '등원 (개인 등원 / 자유 독서)' },
  { period: 'Core Class', time: '09:00 ~ 09:50', activity: 'Reading' },
  { period: 'Break Time', time: '09:50 ~ 10:00', activity: 'Break Time' },
  { period: 'Core Class', time: '10:00 ~ 10:50', activity: 'Speaking / Listening' },
  { period: 'Break Time', time: '10:50 ~ 11:00', activity: 'Break Time' },
  { period: 'Core Class', time: '11:00 ~ 11:50', activity: 'Writing / Project' },
  { period: 'Lunch Time', time: '11:50 ~ 12:50', activity: 'Lunch Time' },
  { period: 'Theme Class', time: '12:50 ~ 13:30', activity: 'Theme Class (40분)', highlight: true },
  { period: 'Activity', time: '13:30 ~ 14:00', activity: 'Activity (30분)', highlight: true },
  { period: 'Wrap Up', time: '14:00 ~ 14:20', activity: 'Wrap Up' },
  { period: '하원', time: '14:20 ~ 14:30', activity: '하원 준비 + 차량 안내' },
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
  { name: '얼리버드', detail: '6/1 ~ 6/30 등록' },
]

const ACTIVITIES = [
  {
    icon: '🪄',
    title: 'Sorting Hat — Harry Potter 테마',
    subtitle: 'Sorting Day · 캠프 첫날 오프닝',
    desc: 'HBO 드라마 리뉴얼 기념 및 다가오는 할로윈 파티에서도 유행할 Harry Potter 테마를 미리 여름 캠프에서 경험합니다! 첫날 하우스를 배정받고, 리더와 부리더를 정하고, 단합하여 팀 포인트를 쌓아가며, 캠프 2주 내내 하우스별로 협동심을 높입니다.',
    skills: ['Role Play', 'Teamwork', 'House System'],
  },
  {
    icon: '📰',
    title: 'Breaking News',
    subtitle: 'Media Day · 우리가 기자다',
    desc: '직접 기자가 되어 취재하고, 영어로 기사를 작성해 뉴스 리포트로 발표합니다. 레벨별로 나눠 취재부터 보도까지 한 흐름으로 진행해요.',
    skills: ['Writing', 'Video', 'Presentation'],
  },
  {
    icon: '🦈',
    title: 'T-shirt + Shark Tank',
    subtitle: 'Maker Day · 제작 → 브랜드 피칭',
    desc: '나만의 티셔츠·굿즈를 디자인해 브랜드로 만들고, 투자자(Shark) 앞에서 영어로 피칭합니다. 만들기와 발표, 설득이 한 번에 이뤄지는 인기 액티비티.',
    skills: ['Making', 'Creative', 'Presentation'],
  },
  {
    icon: '🌍',
    title: 'Mini UN',
    subtitle: 'World Citizen Day · 모의 국제 의회',
    desc: 'Mini UN은 글로벌 이슈에 대해 영어로 발언하는 모의 UN 회의입니다. 글로벌 시민의식과 의견 말하기 표현을 함께 배워 봅니다.',
    skills: ['Debate', 'Role Play', 'Global'],
  },
  {
    icon: '🎙️',
    title: 'TED-Style Talk',
    subtitle: 'Speaker Day · 파이널 프로젝트',
    desc: '자유롭게 하나의 주제를 정해 Outline(서론/본론/결론)을 구성해 Article(글)을 쓰고, TED처럼 스피치(영상 촬영)를 해보는 여름 캠프의 핵심 능력(Writing/Speaking/Reading/Listening)이 유기적으로 하나로 연결되는 파이널 프로젝트입니다. 영상 촬영 결과물은 부모님께 전달됩니다.',
    skills: ['Writing', 'Speaking', 'Reading', 'Listening'],
  },
  {
    icon: '💌',
    title: 'Letter to Parents',
    subtitle: '부모님께 영어로 마음 전하기',
    desc: '레벨별로 부모님에게 감사의 편지를 쓰거나 미래의 나에게 영어 편지를 씁니다.',
    skills: ['Writing', '감정 표현', '문장 구성'],
  },
  {
    icon: '🏆',
    title: 'Finale — Highlight & Market Day',
    subtitle: 'Finale Day · 시상식 + 마켓',
    desc: '2주간의 하이라이트 영상 상영과 하우스 챔피언 시상식, 그리고 영어로 사고파는 Market Day로 캠프를 마무리합니다. 가장 신나는 축제의 날!',
    skills: ['Teamwork', 'Speaking', 'Celebration'],
  },
]

const REFUND_POLICY = [
  { date: '~ 6/30 (1차 마감)', rate: '전액 환불', tone: 'good' },
  { date: '7/1 ~ 7/5', rate: '10% 차감 후 환불', tone: 'mid' },
  { date: '7/6 ~ 7/10', rate: '20% 차감 후 환불', tone: 'mid' },
  { date: '7/11 ~', rate: '환불 불가', tone: 'bad' },
]

// 등록 일정
const APPLY_SCHEDULE = [
  { date: '~ 6/30', label: '1차 신청 마감', detail: '얼리버드 할인 · 캠프 비용 전액 환불 가능', tone: 'good' },
  { date: '~ 7/15', label: '2차 신청 마감', detail: '7/11 이후 환불 불가 (환불 정책 참고)', tone: 'mid' },
]

const FAQS = [
  {
    q: '비재원생도 신청 가능한가요?',
    a: '네! 비재원생도 환영합니다. 신청 시 무료 레벨테스트를 진행한 뒤 가장 잘 맞는 반에 배정해 드립니다.(전화 신청 문의 바람) 친구 소개로 등록 시 10% 할인 혜택 적용돼요.',
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
    a: '재원생 / 형제·자매 / 기존 캠프 등록자 / 친구 소개로 등록(비재원생) / 얼리버드(6/1~6/30) 각 10%이며, 최대 3가지까지 중복 적용 가능합니다(최대 30%). 다른 비재원생 친구를 소개할 시 30% 할인은 단독 적용입니다.',
  },
  {
    q: '환불 정책이 어떻게 되나요?',
    a: '6/30까지는 전액 환불, 7/1~7/5는 10% 차감, 7/6~7/10은 20% 차감 후 환불됩니다. 7/11 이후로는 환불이 불가하니 신청 전 환불 정책을 반드시 확인해주세요.',
  },
  {
    q: '캠프 기간 중 8월 정규반도 함께 들을 수 있나요?',
    a: '가능합니다. 8월 April 정규 Class를 함께 등록하시면 8월 학기 수강료를 50%(반값)로 할인해 드립니다. 자세한 내용은 신청 시 함께 문의해주세요.',
  },
  {
    q: '하원 차량은 어느 지역까지 운행하나요?',
    a: '성산동·중동·서교동·동교동·망원동·연남동·상암동·덕은동·증산동·수색동·남가좌동·북가좌동·가재울·합정동 지역으로 하원 차량을 배정해 드립니다. 등원은 개인 등원만 가능하며, 구체적인 차량 노선은 7월 중 별도 안내드립니다.',
  },
]

function AprilLogo({ className = '', size = 'md' }) {
  const markSize = size === 'lg' ? 'h-11 w-11' : 'h-9 w-9'
  const labelSize = size === 'lg' ? 'text-2xl' : 'text-xl'
  const subSize = size === 'lg' ? 'text-sm' : 'text-xs'
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* 청담에이프릴 로고 — 초록 잎사귀 + 흰색 April */}
      <svg viewBox="0 0 100 100" className={`${markSize} shrink-0`} role="img" aria-label="청담에이프릴 로고">
        <path
          d="M0,42 A42,42 0 0 1 42,0 L58,0 A42,42 0 0 1 100,42 L100,89 A11,11 0 0 1 89,100 L42,100 A42,42 0 0 1 0,58 Z"
          fill="#84BD00"
        />
        <text
          x="50"
          y="55"
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily="'Pretendard','Noto Sans KR',system-ui,sans-serif"
          fontSize="29"
          fontWeight="800"
          letterSpacing="-1.5"
          fill="#ffffff"
        >
          April
        </text>
      </svg>
      <div className="flex min-w-0 flex-col leading-tight">
        <span className={`${labelSize} font-extrabold tracking-tight text-april-navy`}>
          청담에이프릴
        </span>
        <span className={`${subSize} font-semibold text-april-navy-soft`}>
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
        {/* 캠프가 시작되면 학부모의 첫 목적은 사진 확인 — 페이지 최상단에 크게 둔다 */}
        {APPLICATIONS_CLOSED && (
          <a
            href="#gallery"
            className="group mb-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-april-lime px-6 py-5 text-white shadow-soft transition hover:bg-april-lime-dark"
          >
            <span className="flex items-center gap-4">
              <span className="text-3xl">📸</span>
              <span>
                <span className="block text-base font-bold sm:text-lg">캠프 사진이 올라왔어요</span>
                <span className="block text-sm text-white/85">
                  안내받으신 비밀번호를 넣으시면 바로 보실 수 있어요
                </span>
              </span>
            </span>
            <span className="shrink-0 rounded-full bg-white/20 px-5 py-2.5 text-sm font-bold backdrop-blur">
              사진 보기{' '}
              <span aria-hidden className="inline-block transition group-hover:translate-x-0.5">→</span>
            </span>
          </a>
        )}
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
                className={
                  APPLICATIONS_CLOSED
                    ? 'inline-flex items-center justify-center rounded-full bg-april-navy/70 px-7 py-3.5 text-base font-bold text-white shadow-soft transition hover:bg-april-navy'
                    : 'inline-flex items-center justify-center rounded-full bg-april-lime px-7 py-3.5 text-base font-bold text-white shadow-soft transition hover:bg-april-lime-dark'
                }
              >
                {APPLICATIONS_CLOSED ? '신청 마감 안내' : '지금 신청하기'}
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
                  <p className="mt-6 text-xl font-bold leading-snug sm:text-2xl">
                    10 Days.<br />Countless Memories.<br />Lifelong Confidence.
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-white/85">
                    A Summer of Growth, Confidence, Creativity, and Critical Thinking.
                  </p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span>📅</span>
                    <span>8.3 (월) – 8.14 (금) · 10회</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🕘</span>
                    <span>09:00 – 14:20 (등원 08:00~)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🚌</span>
                    <span>등원 개인 · 하원 차량</span>
                  </div>
                </div>
              </div>
            </div>
            <a
              href="#apply"
              className="group absolute -bottom-6 -right-6 rounded-2xl bg-white px-5 py-4 shadow-soft transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-april-sun text-lg">
                  {APPLICATIONS_CLOSED ? '🎒' : '⏰'}
                </div>
                {APPLICATIONS_CLOSED ? (
                  <div>
                    <p className="text-xs text-april-navy-soft">2026 여름캠프</p>
                    <p className="text-sm font-bold text-april-navy">신청 마감되었습니다</p>
                    <p className="mt-0.5 text-xs font-bold text-april-navy-soft">
                      다음 캠프 안내받기 <span className="transition group-hover:translate-x-0.5 inline-block">→</span>
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-xs text-april-navy-soft">1차 신청 마감</p>
                    <p className="text-sm font-bold text-april-navy">6/30 (화)까지</p>
                    <p className="mt-0.5 text-xs font-bold text-april-lime-dark">
                      지금 신청하기 <span className="transition group-hover:translate-x-0.5 inline-block">→</span>
                    </p>
                  </div>
                )}
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Why() {
  const items = [
    {
      icon: '🗣️',
      title: 'Speak with Confidence',
      subtitle: '영어로 말하는 자신감',
      desc: '실수를 두려워하지 않고 원어민 선생님들과 5시간 내내 영어로 표현하는 습관과 자신감을 기릅니다.',
    },
    {
      icon: '🧪',
      title: 'Learn Through Project',
      subtitle: '창의적 프로젝트 기반 학습',
      desc: '단순 암기가 아닌 만들기, 토론, 발표, 협동 활동 등의 프로젝트를 통해 영어를 “경험”합니다.',
    },
    {
      icon: '🤝',
      title: 'Build Friendships & Leadership',
      subtitle: '협동과 리더십 성장',
      desc: '하우스 시스템과 팀 활동을 통해 협력하는 방법을 배우고 리더십과 커뮤니케이션을 경험합니다.',
    },
    {
      icon: '🏅',
      title: 'Celebrate Every Achievement',
      subtitle: '노력과 성장을 인정하는 시스템',
      desc: 'Stamp & Harry Potter House Point System을 통해\n작은 도전과 성취도 의미 있게 보상합니다.',
    },
  ]
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle
          eyebrow="Why April Camp"
          title="에이프릴 여름캠프만의 4가지"
          description={
            <>
              단순한 영어 수업이 아닙니다.
              <br />
              아이들이 영어로 말하고, 창의적·논리적으로 생각하고,
              <br />
              협력하며 성장하는 특별한 2주입니다.
            </>
          }
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <div
              key={item.title}
              className="group rounded-2xl border border-april-navy/5 bg-white p-6 transition hover:-translate-y-1 hover:border-april-lime/30 hover:shadow-soft"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-april-lime-soft text-2xl">
                  {item.icon}
                </div>
                <span className="text-2xl font-extrabold text-april-lime/40">{`0${i + 1}`}</span>
              </div>
              <h3 className="mt-5 text-base font-bold text-april-navy">{item.title}</h3>
              <p className="mt-1 text-sm font-semibold text-april-lime-dark">{item.subtitle}</p>
              <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-april-navy-soft">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* 5. 레벨별 맞춤 커리큘럼 */}
        <div className="mt-6 flex flex-col items-start gap-4 rounded-2xl border border-april-lime/30 bg-april-lime-soft/40 p-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-2xl">
              📚
            </div>
            <span className="text-2xl font-extrabold text-april-lime/50">05</span>
          </div>
          <div>
            <h3 className="text-base font-bold text-april-navy">레벨별 맞춤 커리큘럼</h3>
            <p className="mt-1 text-sm leading-relaxed text-april-navy-soft">
              Rookie부터 Ivy까지 7단계 레벨 · 무료 레벨테스트 후 가장 잘 맞는 반에 배정해 드려요.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Program() {
  return (
    <section id="program" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        {/* 1. 캠프 정보 */}
        <SectionTitle eyebrow="Camp Info" title="캠프 정보" />
        <dl className="mx-auto mt-12 grid max-w-4xl gap-x-10 rounded-2xl bg-april-cream p-6 sm:grid-cols-2 sm:p-8">
          {[
            ['📅 기간', CAMP_INFO.dates],
            ['🕘 시간', CAMP_INFO.hours],
            ['🚪 입실', CAMP_INFO.arrival],
            ['🚌 차량', CAMP_INFO.transport],
            ['🎯 대상', CAMP_INFO.target],
            ['👥 정원', CAMP_INFO.capacity],
            ['💝 포함', CAMP_INFO.includes],
          ].map(([k, v]) => (
            <div key={k} className="flex items-start gap-4 border-b border-april-navy/5 py-3 first:pt-0 sm:[&:nth-child(2)]:pt-0">
              <dt className="w-24 shrink-0 text-sm font-semibold text-april-navy-soft">{k}</dt>
              <dd className="flex-1 text-sm font-medium text-april-navy">{v}</dd>
            </div>
          ))}
        </dl>
        {/* 마감 — 1차·2차 같은 줄 */}
        <div className="mx-auto mt-4 grid max-w-4xl gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border-2 border-april-lime bg-april-lime-soft/50 p-5">
            <p className="text-sm font-bold text-april-lime-dark">🐤 1차 마감</p>
            <p className="mt-1 text-sm font-medium text-april-navy">{CAMP_INFO.earlyBirdDeadline}</p>
          </div>
          <div className="rounded-2xl border-2 border-april-navy/10 bg-white p-5">
            <p className="text-sm font-bold text-april-navy-soft">📝 2차 마감</p>
            <p className="mt-1 text-sm font-medium text-april-navy">{CAMP_INFO.applyDeadline}</p>
          </div>
        </div>

        {/* 2. 레벨별 반 편성 */}
        <div className="mt-24">
          <SectionTitle
            eyebrow="Levels"
            title="레벨별 반 편성"
            description={
              <>
                Rookie부터 Ivy까지 7단계 레벨을 4개 그룹으로 운영합니다.
                <br />
                무료 레벨테스트 후 가장 잘 맞는 반에 배정됩니다.
              </>
            }
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {LEVEL_GROUPS.map((g) => (
              <div
                key={g.group}
                className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${g.color} p-8 shadow-soft`}
              >
                <div className="absolute right-4 top-4 text-5xl opacity-30">{g.icon}</div>
                <div className="relative">
                  <span
                    className={`inline-flex items-center rounded-full ${g.accent} ${g.accentText} px-3 py-1 text-xs font-bold`}
                  >
                    {g.group} · {g.name}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-april-navy-soft">
                    {g.target}
                  </h3>
                  <ul className="mt-6 space-y-3">
                    {g.levels.map((lv) => (
                      <li key={lv.name} className="flex items-baseline justify-between gap-2 border-b border-april-navy/5 pb-3 last:border-none last:pb-0">
                        <span className="text-base font-bold text-april-navy">{lv.name}</span>
                        <span className="text-xs font-medium text-april-lime-dark">{lv.internal}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-april-navy-soft">
            ※ 비재원생은 신청 후 <strong className="text-april-navy">무료 레벨테스트</strong>를 통해 반이 배정됩니다. 정원에 따라 반 편성은 조정될 수 있습니다.
          </p>
        </div>

        {/* 3. 하루 시간표 */}
        <div className="mt-24">
          <div className="text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-april-lime-soft px-3 py-1 text-xs font-semibold uppercase tracking-wider text-april-lime-dark">
              <span className="h-1.5 w-1.5 rounded-full bg-april-lime" />
              Daily Timetable
            </div>
            <h3 className="text-3xl font-bold text-april-navy sm:text-4xl">하루 시간표</h3>
            <p className="mx-auto mt-4 max-w-2xl text-base text-april-navy-soft sm:text-lg">
              매일 같은 리듬으로, 오전 Core Class와 오후 Theme·Activity가 균형 있게 이어집니다.
            </p>
          </div>
          <div className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-2xl border border-april-navy/10">
            <div className="flex items-center gap-4 bg-april-navy px-5 py-3 text-xs font-bold uppercase tracking-wider text-white/80">
              <span className="w-44 shrink-0">교시 (시간)</span>
              <span>활동</span>
            </div>
            {TIMETABLE.map((row, i) => (
              <div
                key={`${row.period}-${row.time}`}
                className={`flex items-center gap-4 px-5 py-3.5 ${
                  row.highlight ? 'bg-april-lime-soft/60' : i % 2 === 0 ? 'bg-white' : 'bg-april-cream'
                }`}
              >
                <span className="w-44 shrink-0">
                  <span className={`block text-sm font-bold ${row.highlight ? 'text-april-lime-dark' : 'text-april-navy'}`}>
                    {row.period}
                  </span>
                  <span className="block font-mono text-xs text-april-navy-soft">{row.time}</span>
                </span>
                <span className="text-sm font-medium text-april-navy">{row.activity}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function DailyTheme() {
  const week1 = PROGRAM_DAYS.slice(0, 5)
  const week2 = PROGRAM_DAYS.slice(5, 10)
  return (
    <section className="bg-white pb-20 sm:pb-28">
      <div className="mx-auto max-w-6xl px-6">
        {/* Daily Theme Class */}
        <div className="text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-april-lime-soft px-3 py-1 text-xs font-semibold uppercase tracking-wider text-april-lime-dark">
            <span className="h-1.5 w-1.5 rounded-full bg-april-lime" />
            Daily Theme Class
          </div>
          <h3 className="text-3xl font-bold text-april-navy sm:text-4xl">10일, 매일 새로운 테마</h3>
          <p className="mx-auto mt-4 max-w-2xl text-base text-april-navy-soft sm:text-lg">
            매일 다른 테마와 액티비티로 영어로 어우러지는 경험을 합니다.
            <br />
            하루 <strong className="text-april-navy">Theme 40분</strong>을 중심으로,
            <br className="sm:hidden" /> 일부 날에는 <strong className="text-april-navy">Activity 30분</strong>이 더해집니다.
          </p>
        </div>

        {[{ label: 'Week 1 · 8/3 – 8/7', days: week1 }, { label: 'Week 2 · 8/10 – 8/14', days: week2 }].map((wk) => (
          <div key={wk.label} className="mt-10">
            <p className="mb-4 text-sm font-bold uppercase tracking-wider text-april-lime-dark">{wk.label}</p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {wk.days.map((d) => (
                <div
                  key={d.day}
                  className="flex flex-col rounded-2xl border border-april-navy/10 bg-white p-5 transition hover:-translate-y-1 hover:border-april-lime/40 hover:shadow-soft"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-april-navy-soft">DAY {d.day}</span>
                    <span className="text-xs font-medium text-april-navy-soft">{d.date}</span>
                  </div>
                  <div className="mt-3 text-3xl">{d.icon}</div>
                  <p className="mt-2 text-xs font-bold uppercase tracking-wide text-april-lime-dark">{d.theme}</p>
                  <h4 className="mt-1 text-base font-bold leading-snug text-april-navy">{d.title}</h4>
                  <p className="mt-1 flex-1 text-xs text-april-navy-soft">{d.desc}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {d.tags.map((t) => (
                      <span
                        key={t}
                        className={`inline-flex w-fit items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                          t === 'House 포인트'
                            ? 'bg-april-sun/30 text-april-navy'
                            : t === '전체 통합'
                              ? 'bg-april-lime-soft text-april-lime-dark'
                              : 'bg-april-navy/5 text-april-navy-soft'
                        }`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Activity (SEL Therapy) */}
        <div className="mt-16">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-april-lime-soft text-2xl">
              🧘
            </span>
            <div>
              <h3 className="text-2xl font-bold text-april-navy">Activity (SEL Therapy &amp; Physical Activity)</h3>
              <p className="mt-2 text-sm leading-relaxed text-april-navy-soft">
                미국 학교에서 널리 활용되는 SEL(Social-Emotional Learning) 프로그램을 바탕으로, 학생들이 감정을 이해하고 표현하며 건강한 관계를 형성할 수 있도록 돕습니다. 또한 다양한 신체 활동과 팀 게임을 통해 협동심, 자신감, 리더십을 기르고 즐겁게 에너지를 발산할 수 있는 시간을 제공합니다.
              </p>
            </div>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ACTIVITY_THERAPY.map((a) => (
              <div
                key={a.name}
                className="rounded-2xl border border-april-navy/10 bg-april-cream p-5 transition hover:-translate-y-1 hover:border-april-lime/40 hover:shadow-soft"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-xl">
                    {a.icon}
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-april-navy">{a.name}</h4>
                    <p className="text-xs font-medium text-april-lime-dark">{a.theme}</p>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-april-navy-soft">{a.desc}</p>
              </div>
            ))}
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
          title="이렇게 영어를 경험합니다"
          description="캠프에서 진행하는 핵심 액티비티를 소개합니다."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {ACTIVITIES.map((act, i) => (
            <div
              key={act.title}
              className={`group relative overflow-hidden rounded-3xl border border-april-navy/10 p-7 transition hover:-translate-y-1 hover:border-april-lime/40 hover:shadow-soft ${
                i === ACTIVITIES.length - 1 && ACTIVITIES.length % 2 === 1 ? 'md:col-span-2' : ''
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
          <p className="text-base font-bold text-april-navy">
            📘 캠프의 핵심은 <strong className="text-april-lime-dark">즐겁게, 그러나 제대로 ! !</strong>
          </p>
          <p className="max-w-xl whitespace-pre-line text-sm text-april-navy-soft">
            {'그냥 즐겁기만 한 체험도, 문제만 푸는 수업도 아닙니다.\n2주라는 짧은 시간 동안 아이들이 영어를 도구로 쓰는 경험을 합니다.'}
          </p>
        </div>

        {/* 네이버 블로그 — 별도 카드 */}
        <a
          href={CAMP_INFO.blogUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-6 flex items-center justify-between gap-4 rounded-2xl border border-april-navy/10 bg-white p-6 transition hover:border-april-lime/40 hover:shadow-soft"
        >
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#03C75A] text-xl font-bold text-white">
              N
            </span>
            <div>
              <p className="text-sm font-semibold text-april-navy-soft">2026 여름 캠프</p>
              <p className="text-base font-bold text-april-navy">네이버 블로그에서 더 보기</p>
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

function Fees() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle
          eyebrow="Tuition"
          title="수강료 안내"
          description="할인 조건을 최대 3가지까지 중복 적용하실 수 있습니다."
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
              <h3 className="text-xl font-bold text-april-navy">할인 조건 (각 10% / 최대 3개까지 중복 적용 가능)</h3>
              <p className="mt-1 text-sm text-april-navy-soft">
                아래 조건 중 해당하시는 항목이 많을수록 더 큰 혜택을 받으실 수 있습니다.
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
          <p className="mt-4 text-xs text-april-navy-soft">
            ※ 1주만 참여하실 경우 정가의 <strong className="text-april-navy">반값</strong>으로 등록 가능합니다.
          </p>
          <div className="mt-3 flex items-start gap-3 rounded-xl border border-april-navy/10 bg-april-cream p-4">
            <span className="text-lg">📅</span>
            <p className="text-sm text-april-navy">
              <strong className="text-april-navy">8월 April 정규 Class 병행 시</strong> 수업료를{' '}
              <strong className="text-april-lime-dark">50% 할인</strong>해 드립니다 (8월 학기 수강료 반값 할인 !).
            </p>
          </div>
        </div>

        {/* 할인 조건 30% (단독 적용) */}
        <div className="mt-6 rounded-3xl border-2 border-april-lime bg-april-lime-soft/40 p-8 sm:p-10">
          <div className="flex items-start gap-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-april-lime text-xl text-white">
              ⭐
            </span>
            <div>
              <h3 className="text-xl font-bold text-april-navy">할인 조건 30% (단독 적용)</h3>
              <p className="mt-1 text-sm text-april-navy">
                <strong className="text-april-lime-dark">친구 소개(비재원생)</strong> 시 30% 할인이 단독 적용됩니다 (중복 할인 불가). 😊 많은 소개 부탁드립니다!
              </p>
            </div>
          </div>
        </div>

        {/* 등록 일정 */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-april-navy">등록 일정</h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {APPLY_SCHEDULE.map((s) => (
              <div
                key={s.label}
                className={`rounded-2xl border-2 p-6 ${
                  s.tone === 'good'
                    ? 'border-april-lime bg-april-lime-soft/50'
                    : 'border-april-navy/10 bg-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-april-lime-dark">{s.date}</span>
                  <span className="text-sm font-bold text-april-navy">· {s.label}</span>
                </div>
                <p className="mt-2 text-sm text-april-navy-soft">{s.detail}</p>
              </div>
            ))}
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
          <div className="mt-4 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
            <span className="text-lg">⚠️</span>
            <p className="text-sm font-semibold text-red-600">
              신청 전 환불 정책을 <strong>반드시</strong> 확인해주세요! 7/11 이후로는 환불이 불가합니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Apply() {
  const [form, setForm] = useState({
    studentName: '',
    age: '',
    studentType: '재원생',
    level: '',
    allergy: '',
    regularClass: '',
    parentName: '',
    phone: '',
    portraitConsent: '',
    shuttleMWF: '',
    shuttleTT: '',
    note: '',
    consent: false,
  })
  const [error, setError] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | done

  const update = (k) => (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm((f) => ({ ...f, [k]: val }))
  }
  const setField = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const levelValue =
    form.studentType === '재원생' ? form.level : '레벨테스트 희망 (전화 드릴 예정)'

  const buildPayload = () => ({
    신청일시: new Date().toLocaleString('ko-KR'),
    이름: form.studentName,
    나이: form.age,
    재원여부: form.studentType,
    레벨: levelValue,
    알러지: form.allergy || '없음',
    초상권동의: form.portraitConsent,
    정규클래스수강여부: form.regularClass,
    부모님성함: form.parentName,
    부모님연락처: form.phone,
    '하원장소(월수금)': form.shuttleMWF,
    '하원장소(화목)': form.shuttleTT,
    특이사항: form.note,
  })

  const sendMail = () => {
    const p = buildPayload()
    const subject = encodeURIComponent(`[여름캠프 신청] ${form.studentName} (${form.age || '나이 미입력'})`)
    const body = encodeURIComponent(
      ['※ 2026 여름캠프 신청서 ※', '', ...Object.entries(p).map(([k, v]) => `${k}: ${v || '-'}`), '', '— 개인정보·초상권 동의: 동의함 —'].join('\n'),
    )
    window.location.href = `mailto:${CAMP_INFO.email}?subject=${subject}&body=${body}`
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.studentName.trim() || !form.age.trim() || !form.parentName.trim() || !form.phone.trim()) {
      setError('학생 이름, 나이, 부모님 성함, 연락처는 필수입니다.')
      return
    }
    if (!form.allergy.trim()) {
      setError("알러지 항목은 필수입니다. 없으면 '없음' 버튼을 눌러주세요.")
      return
    }
    if (form.studentType === '재원생' && !form.level) {
      setError('재원생은 현재 레벨을 선택해주세요.')
      return
    }
    if (!form.regularClass) {
      setError('정규 클래스 수강 여부를 선택해주세요.')
      return
    }
    if (!form.portraitConsent) {
      setError('초상권 동의 여부를 선택해주세요.')
      return
    }
    if (!form.consent) {
      setError('개인정보 수집·이용에 동의해주세요.')
      return
    }
    setError('')

    if (SHEET_ENDPOINT) {
      setStatus('sending')
      try {
        // Apps Script 웹앱은 CORS 응답을 주지 않으므로 no-cors로 전송한다.
        // (요청은 정상 도달해 시트에 기록되며, 응답 본문은 읽지 않는다.)
        await fetch(SHEET_ENDPOINT, {
          method: 'POST',
          mode: 'no-cors',
          body: JSON.stringify(buildPayload()),
        })
        setStatus('done')
        return
      } catch {
        // 네트워크 실패 시 이메일 방식으로 대체
        setStatus('idle')
        sendMail()
        return
      }
    }
    // 시트 연동 미설정 시 이메일 방식
    sendMail()
  }

  const inputCls =
    'w-full rounded-xl border border-april-navy/15 bg-white px-4 py-3 text-sm text-april-navy placeholder:text-april-navy-soft/60 focus:border-april-lime focus:outline-none focus:ring-2 focus:ring-april-lime/30'
  const labelCls = 'mb-2 block text-sm font-semibold'
  const req = <span className="text-april-lime-dark">*</span>

  if (status === 'done') {
    return (
      <section id="apply" className="bg-april-navy py-20 text-white sm:py-28">
        <div className="mx-auto max-w-xl px-6 text-center">
          <div className="rounded-3xl bg-white p-10 text-april-navy shadow-soft">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-april-lime-soft text-3xl">
              ✅
            </div>
            <h2 className="mt-6 text-2xl font-bold">신청이 접수되었습니다!</h2>
            <p className="mt-3 text-sm leading-relaxed text-april-navy-soft">
              {form.studentName} 학생의 신청서가 정상적으로 전송되었습니다.
              <br />
              담당 선생님이 확인 후 <strong className="text-april-navy">1영업일 내</strong> 연락드릴게요.
            </p>
            <a
              href={`tel:${CAMP_INFO.phone}`}
              className="mt-6 inline-flex items-center justify-center rounded-full bg-april-lime px-6 py-3 text-sm font-bold text-white transition hover:bg-april-lime-dark"
            >
              전화 문의 {CAMP_INFO.phone}
            </a>
          </div>
        </div>
      </section>
    )
  }

  // 접수 마감 — 신청폼 대신 안내와 연락처만 보여준다.
  if (APPLICATIONS_CLOSED) {
    return (
      <section id="apply" className="bg-april-navy py-20 text-white sm:py-28">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
            <span className="h-1.5 w-1.5 rounded-full bg-april-sun" />
            Applications Closed
          </div>
          <h2 className="text-3xl font-bold sm:text-4xl">신청이 마감되었습니다</h2>
          <p className="mt-4 text-base text-white/70 sm:text-lg">
            2026 여름캠프 접수가 종료되어 신청서를 받지 않고 있어요.
            <br />
            관심 가져주셔서 감사합니다.
          </p>

          <div className="mt-10 rounded-3xl bg-white p-8 text-left text-april-navy shadow-soft sm:p-10">
            <p className="text-sm font-bold text-april-lime-dark">진행 중인 캠프</p>
            <p className="mt-2 text-lg font-bold">{CAMP_INFO.dates}</p>
            <p className="mt-1 text-sm text-april-navy-soft">{CAMP_INFO.hours}</p>

            <hr className="my-6 border-april-navy/10" />

            <p className="text-sm font-bold text-april-navy">캠프 사진 보기</p>
            <p className="mt-2 text-sm text-april-navy-soft">
              참여 학부모님께 안내드린 비밀번호를 넣으시면 사진을 보실 수 있어요.
            </p>
            <a
              href="#gallery"
              className="mt-4 inline-flex items-center justify-center rounded-full bg-april-navy px-6 py-3 text-sm font-bold text-white transition hover:bg-april-navy/80"
            >
              📸 사진 보러 가기
            </a>

            <hr className="my-6 border-april-navy/10" />

            <p className="text-sm font-bold text-april-navy">
              다음 캠프 소식이나 정규 과정이 궁금하세요?
            </p>
            <p className="mt-2 text-sm text-april-navy-soft">
              편하게 연락 주시면 상담 도와드릴게요. 레벨테스트도 상시 가능합니다.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`tel:${CAMP_INFO.phone.replace(/-/g, '')}`}
                className="inline-flex items-center justify-center rounded-full bg-april-lime px-6 py-3 text-sm font-bold text-white transition hover:bg-april-lime-dark"
              >
                📞 {CAMP_INFO.phone}
              </a>
              <a
                href={`mailto:${CAMP_INFO.email}`}
                className="inline-flex items-center justify-center rounded-full border-2 border-april-navy/10 bg-white px-6 py-3 text-sm font-semibold text-april-navy transition hover:border-april-lime hover:text-april-lime-dark"
              >
                ✉️ 이메일 문의
              </a>
              <a
                href={CAMP_INFO.blogUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border-2 border-april-navy/10 bg-white px-6 py-3 text-sm font-semibold text-april-navy transition hover:border-april-lime hover:text-april-lime-dark"
              >
                📝 블로그 보기
              </a>
            </div>
          </div>
        </div>
      </section>
    )
  }

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
            {/* 이름 / 나이 */}
            <div>
              <label className={labelCls}>학생 이름 {req}</label>
              <input type="text" value={form.studentName} onChange={update('studentName')} placeholder="홍길동" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>나이 {req}</label>
              <input type="text" value={form.age} onChange={update('age')} placeholder="예: 8세 / 초2" className={inputCls} />
            </div>

            {/* 재원 여부 / 레벨 */}
            <div>
              <label className={labelCls}>재원 여부 {req}</label>
              <select value={form.studentType} onChange={update('studentType')} className={inputCls}>
                <option>재원생</option>
                <option>비재원생</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>레벨 {form.studentType === '재원생' && req}</label>
              {form.studentType === '재원생' ? (
                <select value={form.level} onChange={update('level')} className={inputCls}>
                  <option value="">현재 레벨 선택</option>
                  {ENROLLED_LEVELS.map((lv) => (
                    <option key={lv}>{lv}</option>
                  ))}
                </select>
              ) : (
                <div className="flex h-[46px] items-center rounded-xl border border-dashed border-april-navy/20 bg-april-cream px-4 text-sm font-medium text-april-navy-soft">
                  레벨테스트 희망 — 전화 드릴 예정 📞
                </div>
              )}
            </div>

            {/* 부모님 성함 / 연락처 */}
            <div>
              <label className={labelCls}>부모님 성함 {req}</label>
              <input type="text" value={form.parentName} onChange={update('parentName')} placeholder="홍부모" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>부모님 연락처 {req}</label>
              <input type="tel" value={form.phone} onChange={update('phone')} placeholder="010-0000-0000" className={inputCls} />
            </div>

            {/* 알러지 (필수) */}
            <div className="sm:col-span-2">
              <label className={labelCls}>알러지 {req}</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={form.allergy}
                  onChange={update('allergy')}
                  disabled={form.allergy === '없음'}
                  placeholder="식품 알러지 등을 적어주세요"
                  className={`${inputCls} flex-1 disabled:bg-april-cream disabled:text-april-navy-soft`}
                />
                <button
                  type="button"
                  onClick={() => setField('allergy', form.allergy === '없음' ? '' : '없음')}
                  className={`shrink-0 rounded-xl border px-5 text-sm font-bold transition ${
                    form.allergy === '없음'
                      ? 'border-april-lime bg-april-lime-soft text-april-lime-dark'
                      : 'border-april-navy/15 bg-white text-april-navy-soft hover:border-april-lime/40'
                  }`}
                >
                  없음
                </button>
              </div>
            </div>

            {/* 정규 클래스 수강 여부 (박스) */}
            <div className="rounded-2xl border border-april-navy/10 bg-april-cream/50 p-4">
              <label className={labelCls}>8월 정규 클래스 수강 여부 {req}</label>
              <div className="flex gap-2">
                {['O', 'X'].map((v) => (
                  <button
                    type="button"
                    key={v}
                    onClick={() => setField('regularClass', v)}
                    className={`flex-1 rounded-xl border px-4 py-3 text-sm font-bold transition ${
                      form.regularClass === v
                        ? 'border-april-lime bg-april-lime-soft text-april-lime-dark'
                        : 'border-april-navy/15 bg-white text-april-navy-soft hover:border-april-lime/40'
                    }`}
                  >
                    {v === 'O' ? 'O · 수강' : 'X · 미수강'}
                  </button>
                ))}
              </div>
            </div>
            {/* 초상권 동의 (박스) */}
            <div className="rounded-2xl border border-april-navy/10 bg-april-cream/50 p-4">
              <label className={labelCls}>초상권(사진·영상) 동의 {req}</label>
              <div className="flex gap-2">
                {['동의', '비동의'].map((v) => (
                  <button
                    type="button"
                    key={v}
                    onClick={() => setField('portraitConsent', v)}
                    className={`flex-1 rounded-xl border px-4 py-3 text-sm font-bold transition ${
                      form.portraitConsent === v
                        ? 'border-april-lime bg-april-lime-soft text-april-lime-dark'
                        : 'border-april-navy/15 bg-white text-april-navy-soft hover:border-april-lime/40'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* 차량 하원 희망 장소 */}
            <div className="sm:col-span-2">
              <label className={labelCls}>차량 하원 희망 장소</label>
              <p className="mb-2 text-xs text-april-navy-soft">
                요일별 하원 장소를 입력해주세요. 주소 또는 네이버 지도 링크를 붙여넣으셔도 됩니다.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <input type="text" value={form.shuttleMWF} onChange={update('shuttleMWF')} placeholder="월·수·금 하원 장소 / 주소 / 네이버 지도 링크" className={inputCls} />
                <input type="text" value={form.shuttleTT} onChange={update('shuttleTT')} placeholder="화·목 하원 장소 / 주소 / 네이버 지도 링크" className={inputCls} />
              </div>
            </div>

            {/* 특이사항 */}
            <div className="sm:col-span-2">
              <label className={labelCls}>기타 요청 사항</label>
              <textarea
                value={form.note}
                onChange={update('note')}
                rows={3}
                placeholder="상담 희망 시간, 컨디션 관련 참고 사항 등을 자유롭게 적어주세요."
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
              수집 항목: 학생 이름·나이·레벨·알러지, 보호자 성함·연락처, 하원 장소 / 이용 목적: 캠프 신청·반 배정·차량 안내 / 보관 기간: 캠프 종료 후 30일까지.
            </span>
          </label>

          {error && (
            <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm font-medium text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={status === 'sending'}
            className="mt-6 w-full rounded-full bg-april-lime py-4 text-base font-bold text-white shadow-soft transition hover:bg-april-lime-dark disabled:opacity-60"
          >
            {status === 'sending' ? '전송 중…' : '신청서 제출하기 →'}
          </button>
          <p className="mt-3 text-center text-xs text-april-navy-soft">
            제출하시면 신청 내용이 캠퍼스로 바로 접수됩니다.
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
          <a
            href={CAMP_INFO.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl bg-white/5 p-5 text-center transition hover:bg-white/10"
          >
            <p className="text-xs text-white/60">위치 (네이버 지도 →)</p>
            <p className="mt-1 font-bold">{CAMP_INFO.address}</p>
          </a>
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
          <a href="#gallery" className="transition hover:text-april-lime-dark">사진 갤러리</a>
          <a href="#apply" className="transition hover:text-april-lime-dark">신청하기</a>
          <a
            href={`tel:${CAMP_INFO.phone}`}
            className="rounded-full bg-april-lime px-4 py-2 text-white shadow-soft transition hover:bg-april-lime-dark"
          >
            전화 상담
          </a>
        </nav>
        <div className="flex items-center gap-2 md:hidden">
          <a href="#gallery" className="rounded-full border border-april-navy/15 px-3 py-2 text-sm font-semibold text-april-navy">
            갤러리
          </a>
          <a href="#apply" className="rounded-full bg-april-lime px-4 py-2 text-sm font-semibold text-white">
            신청
          </a>
        </div>
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

function DayReport({ report }) {
  if (!report) return null
  return (
    <article className="mt-8 overflow-hidden rounded-3xl bg-white shadow-soft">
      <div className="border-b border-april-navy/10 bg-april-lime-soft/50 px-6 py-5 sm:px-8">
        <div className="flex items-start gap-4">
          <span className="text-4xl leading-none">{report.icon}</span>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-april-lime-dark">
              {report.theme}
            </p>
            <h2 className="mt-0.5 text-xl font-bold text-april-navy sm:text-2xl">{report.title}</h2>
            <p className="mt-1 text-xs text-april-navy-soft">{report.date}</p>
          </div>
        </div>
      </div>

      <div className="space-y-6 px-6 py-6 sm:px-8 sm:py-8">
        <p className="text-sm leading-relaxed text-april-navy-soft sm:text-base">{report.intro}</p>

        {report.houses && (
          <div className="rounded-2xl bg-april-cream px-5 py-5">
            <p className="text-sm font-bold text-april-navy">우리 하우스가 정해졌어요</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {report.houses.map((h) => (
                <span
                  key={h}
                  className="rounded-full bg-white px-3.5 py-1.5 text-sm font-semibold text-april-navy shadow-soft"
                >
                  {h}
                </span>
              ))}
            </div>
            {report.housesNote && (
              <p className="mt-3 text-xs leading-relaxed text-april-navy-soft">{report.housesNote}</p>
            )}
          </div>
        )}

        {report.takeaways && (
          <div>
            <p className="text-sm font-bold text-april-navy">오늘 아이들이 가져간 것</p>
            <ul className="mt-3 space-y-3">
              {report.takeaways.map((t) => (
                <li key={t.label} className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-april-lime" />
                  <p className="text-sm leading-relaxed text-april-navy-soft">
                    <strong className="font-bold text-april-navy">{t.label}</strong> — {t.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {report.tomorrow && (
          <div className="rounded-2xl border border-dashed border-april-navy/20 px-5 py-4">
            <p className="text-xs font-bold uppercase tracking-wider text-april-navy-soft">내일은</p>
            <p className="mt-1 text-sm font-semibold text-april-navy">{report.tomorrow}</p>
          </div>
        )}
      </div>
    </article>
  )
}

function GalleryPage() {
  const [unlocked, setUnlocked] = useState(
    () => typeof sessionStorage !== 'undefined' && sessionStorage.getItem('galleryUnlocked') === '1',
  )
  const [pw, setPw] = useState('')
  const [err, setErr] = useState('')
  const [dayIdx, setDayIdx] = useState(Math.max(GALLERY_DAYS.length - 1, 0)) // 기본: 최근 날짜
  const [lightbox, setLightbox] = useState(null) // 열린 사진 index

  const photos = GALLERY_DAYS[dayIdx]?.photos || []

  const submit = (e) => {
    e.preventDefault()
    if (pw === GALLERY_PASSWORD) {
      sessionStorage.setItem('galleryUnlocked', '1')
      setUnlocked(true)
      setErr('')
    } else {
      setErr('비밀번호가 올바르지 않습니다. 다시 확인해주세요.')
    }
  }

  // 라이트박스 키보드 조작 (ESC 닫기 / ← → 이동)
  useEffect(() => {
    if (lightbox === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(null)
      else if (e.key === 'ArrowRight') setLightbox((i) => (i + 1) % photos.length)
      else if (e.key === 'ArrowLeft') setLightbox((i) => (i - 1 + photos.length) % photos.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox, photos.length])

  return (
    <div className="min-h-screen bg-april-cream">
      <header className="sticky top-0 z-40 border-b border-april-navy/5 bg-white/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#" className="transition hover:opacity-80"><AprilLogo /></a>
          <a
            href="#"
            className="rounded-full border-2 border-april-navy/10 bg-white px-4 py-2 text-sm font-semibold text-april-navy transition hover:border-april-lime hover:text-april-lime-dark"
          >
            ← 홈으로
          </a>
        </div>
      </header>

      {!unlocked ? (
        // 🔒 비밀번호 잠금 화면
        <div className="mx-auto flex max-w-md flex-col items-center px-6 py-24 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-april-lime-soft text-3xl">
            🔒
          </div>
          <h1 className="mt-6 text-2xl font-bold text-april-navy">사진 갤러리</h1>
          <p className="mt-3 text-sm leading-relaxed text-april-navy-soft">
            캠프 사진은 학부모님만 보실 수 있어요.
            <br />
            안내받으신 <strong className="text-april-navy">비밀번호</strong>를 입력해주세요.
          </p>
          <form onSubmit={submit} className="mt-8 w-full">
            <input
              type="password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              placeholder="비밀번호"
              className="w-full rounded-xl border border-april-navy/15 bg-white px-4 py-3 text-center text-base text-april-navy focus:border-april-lime focus:outline-none focus:ring-2 focus:ring-april-lime/30"
            />
            {err && <p className="mt-3 text-sm font-medium text-red-500">{err}</p>}
            <button
              type="submit"
              className="mt-4 w-full rounded-full bg-april-lime py-3.5 text-base font-bold text-white shadow-soft transition hover:bg-april-lime-dark"
            >
              사진 보기 →
            </button>
          </form>
          <p className="mt-6 text-xs text-april-navy-soft">
            비밀번호는 캠프 담당 선생님께 문의해주세요. ☎ {CAMP_INFO.phone}
          </p>
        </div>
      ) : (
        // 🖼️ 사진 그리드
        <section className="mx-auto max-w-6xl px-6 py-14">
          <div className="text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-april-lime-soft px-3 py-1 text-xs font-semibold uppercase tracking-wider text-april-lime-dark">
              <span className="h-1.5 w-1.5 rounded-full bg-april-lime" />
              Gallery
            </div>
            <h1 className="text-3xl font-bold text-april-navy sm:text-4xl">캠프 사진 갤러리</h1>
            <p className="mt-3 text-sm text-april-navy-soft">2026 여름 캠프의 즐거운 순간들 📸</p>
          </div>

          {GALLERY_DAYS.length === 0 ? (
            <div className="mt-14 rounded-3xl border border-dashed border-april-navy/20 bg-white p-16 text-center">
              <div className="text-4xl">📷</div>
              <p className="mt-4 text-base font-semibold text-april-navy">아직 준비 중이에요</p>
              <p className="mt-2 text-sm text-april-navy-soft">캠프가 시작되면 사진이 이곳에 올라옵니다.</p>
            </div>
          ) : (
            <>
              {/* 날짜 탭 */}
              <div className="mt-10 flex flex-wrap justify-center gap-2">
                {GALLERY_DAYS.map((d, i) => (
                  <button
                    key={d.key}
                    onClick={() => { setDayIdx(i); setLightbox(null) }}
                    className={`rounded-full px-5 py-2 text-sm font-bold transition ${
                      i === dayIdx
                        ? 'bg-april-lime text-white shadow-soft'
                        : 'border border-april-navy/15 bg-white text-april-navy-soft hover:border-april-lime/40'
                    }`}
                  >
                    {d.label}
                    <span className={`ml-1.5 text-xs font-semibold ${i === dayIdx ? 'text-white/80' : 'text-april-navy-soft/70'}`}>
                      {d.photos.length}
                    </span>
                  </button>
                ))}
              </div>

              <p className="mt-4 text-center text-xs text-april-navy-soft">
                {GALLERY_DAYS[dayIdx]?.label} · 사진 {photos.length}장
              </p>

              {/* 업로드 지연 안내 — 모든 날짜 탭 공통 */}
              <div className="mx-auto mt-5 max-w-2xl rounded-2xl bg-april-lime-soft px-5 py-4 text-center">
                <p className="text-sm leading-relaxed text-april-navy">
                  📷 각 날짜의 사진이 실제로는 훨씬 많아요! 정리 작업이 조금 늦어지고 있어요 — 곧 더
                  올려드릴게요. 조금만 기다려주세요 🙏
                </p>
              </div>

              {/* 그날의 활동 리포트 — 사진만 보는 것보다 맥락이 함께 전달된다 */}
              <DayReport report={DAY_REPORTS[GALLERY_DAYS[dayIdx]?.key]} />

              {/* 🎬 활동 영상 — 해당 날짜 폴더에 mp4가 있으면 표시 */}
              {(GALLERY_VIDEOS[GALLERY_DAYS[dayIdx]?.key] || []).length > 0 && (
                <div className="mt-6 space-y-4">
                  {GALLERY_VIDEOS[GALLERY_DAYS[dayIdx].key].map((v) => (
                    <video
                      key={v.name}
                      src={v.src}
                      controls
                      playsInline
                      preload="metadata"
                      className="w-full rounded-3xl bg-black shadow-soft"
                    />
                  ))}
                  <p className="text-center text-xs text-april-navy-soft">
                    🎬 활동 영상 맛보기예요 · 영상 원본은 정리해서 곧 전달드릴 예정이에요
                  </p>
                </div>
              )}

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {photos.map((photo, i) => (
                  <button
                    key={photo.name}
                    onClick={() => setLightbox(i)}
                    className="group relative aspect-square overflow-hidden rounded-2xl bg-white shadow-soft"
                  >
                    <img
                      src={photo.src}
                      alt={`캠프 사진 ${i + 1}`}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                  </button>
                ))}
              </div>
            </>
          )}
        </section>
      )}

      {/* 라이트박스 */}
      {lightbox !== null && photos[lightbox] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-2xl text-white transition hover:bg-white/25"
            onClick={() => setLightbox(null)}
            aria-label="닫기"
          >
            ✕
          </button>
          <button
            className="absolute left-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-2xl text-white transition hover:bg-white/25 sm:left-6"
            onClick={(e) => { e.stopPropagation(); setLightbox((i) => (i - 1 + photos.length) % photos.length) }}
            aria-label="이전"
          >
            ‹
          </button>
          <img
            src={photos[lightbox].src}
            alt={`캠프 사진 ${lightbox + 1}`}
            className="max-h-[85vh] max-w-full rounded-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute right-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-2xl text-white transition hover:bg-white/25 sm:right-6"
            onClick={(e) => { e.stopPropagation(); setLightbox((i) => (i + 1) % photos.length) }}
            aria-label="다음"
          >
            ›
          </button>
          <span className="absolute bottom-5 text-sm font-medium text-white/80">
            {lightbox + 1} / {photos.length}
          </span>
        </div>
      )}
    </div>
  )
}

export default function App() {
  const [route, setRoute] = useState(
    () => (typeof window !== 'undefined' ? window.location.hash : ''),
  )
  useEffect(() => {
    const onHash = () => setRoute(window.location.hash)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  if (route.startsWith('#gallery')) {
    return <GalleryPage />
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Why />
        <Program />
        <Activities />
        <DailyTheme />
        <Fees />
        <Apply />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}
