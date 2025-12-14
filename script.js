let currentSeason = 'rest'; // 기본값: 휴식기 ('rest' 또는 'comeback')

const MBTI_TYPES = [
    "ISTJ", "ISFJ", "INFJ", "INTJ", 
    "ISTP", "ISFP", "INFP", "INTP", 
    "ESTP", "ESFP", "ENFP", "ENTP", 
    "ESTJ", "ESFJ", "ENFJ", "ENTJ"
];

const compatibilityData = {
    "INFP": { "ENFJ": 5, "ENTJ": 5, "INFP": 4, "ENFP": 4, "INFJ": 4, "INTJ": 4, "INTP": 4, "ENTP": 4, "ISFP": 1, "ESFP": 1, "ISTP": 1, "ESTP": 1, "ISFJ": 1, "ESFJ": 1, "ISTJ": 1, "ESTJ": 1 },
    "ENFP": { "INFJ": 5, "INTJ": 5, "INFP": 4, "ENFP": 4, "ENFJ": 4, "ENTJ": 4, "INTP": 4, "ENTP": 4, "ISFP": 1, "ESFP": 1, "ISTP": 1, "ESTP": 1, "ISFJ": 1, "ESFJ": 1, "ISTJ": 1, "ESTJ": 1 },
    "INFJ": { "ENFP": 5, "ENTP": 5, "INFP": 4, "INFJ": 4, "ENFJ": 4, "INTJ": 4, "INTP": 4, "ENTJ": 4, "ISFP": 1, "ESFP": 1, "ISTP": 1, "ESTP": 1, "ISFJ": 1, "ESFJ": 1, "ISTJ": 1, "ESTJ": 1 },
    "ENFJ": { "INFP": 5, "ISFP": 5, "ENFP": 4, "INFJ": 4, "ENFJ": 4, "INTJ": 4, "INTP": 4, "ENTP": 4, "ENTJ": 4, "ESFP": 1, "ISTP": 1, "ESTP": 1, "ISFJ": 1, "ESFJ": 1, "ISTJ": 1, "ESTJ": 1 },
    
    "INTJ": { "ENFP": 5, "ENTP": 5, "INFP": 4, "INFJ": 4, "ENFJ": 4, "INTJ": 4, "INTP": 4, "ENTJ": 4, "ISFP": 3, "ESFP": 3, "ISTP": 3, "ESTP": 3, "ISFJ": 2, "ESFJ": 2, "ISTJ": 3, "ESTJ": 3 },
    "ENTJ": { "INFP": 5, "INTP": 5, "ENFP": 4, "INFJ": 4, "ENFJ": 4, "INTJ": 4, "ENTP": 4, "ENTJ": 4, "ISFP": 3, "ESFP": 3, "ISTP": 3, "ESTP": 3, "ISFJ": 2, "ESFJ": 2, "ISTJ": 3, "ESTJ": 3 },
    "INTP": { "ENTJ": 5, "ESTJ": 5, "INFP": 4, "ENFP": 4, "INFJ": 4, "INTJ": 4, "INTP": 4, "ENTP": 4, "ISFP": 3, "ESFP": 3, "ISTP": 3, "ESTP": 3, "ISFJ": 2, "ESFJ": 2, "ISTJ": 2, "ENFJ": 2 },
    "ENTP": { "INFJ": 5, "INTJ": 5, "INFP": 4, "ENFP": 4, "ENFJ": 4, "INTP": 4, "ENTP": 4, "ENTJ": 4, "ISFP": 3, "ESFP": 3, "ISTP": 3, "ESTP": 3, "ISFJ": 2, "ESFJ": 2, "ISTJ": 2, "ESTJ": 2 },

    "ISFP": { "ESFJ": 5, "ESTJ": 5, "ENFJ": 5, "ISFP": 3, "ESFP": 3, "ISTP": 3, "ESTP": 3, "ISFJ": 3, "ISTJ": 3, "INFP": 1, "ENFP": 1, "INFJ": 1, "INTJ": 2, "ENTJ": 2, "INTP": 2, "ENTP": 2 },
    "ESFP": { "ISFJ": 5, "ISTJ": 5, "ISFP": 3, "ESFP": 3, "ISTP": 3, "ESTP": 3, "ESFJ": 3, "ESTJ": 3, "INFP": 1, "ENFP": 1, "INFJ": 1, "ENFJ": 1, "INTJ": 2, "ENTJ": 2, "INTP": 2, "ENTP": 2 },
    "ISTP": { "ESFJ": 5, "ESTJ": 5, "ISFP": 3, "ESFP": 3, "ISTP": 3, "ESTP": 3, "ISFJ": 3, "ISTJ": 3, "INFP": 1, "ENFP": 1, "INFJ": 1, "ENFJ": 1, "INTJ": 2, "ENTJ": 2, "INTP": 2, "ENTP": 2 },
    "ESTP": { "ISFJ": 5, "ISTJ": 5, "ISFP": 3, "ESFP": 3, "ISTP": 3, "ESTP": 3, "ESFJ": 3, "ESTJ": 3, "INFP": 1, "ENFP": 1, "INFJ": 1, "ENFJ": 1, "INTJ": 2, "ENTJ": 2, "INTP": 2, "ENTP": 2 },

    "ISFJ": { "ESFP": 5, "ESTP": 5, "ISFJ": 4, "ESFJ": 4, "ISTJ": 4, "ESTJ": 4, "ISFP": 3, "ISTP": 3, "INFP": 1, "ENFP": 1, "INFJ": 1, "ENFJ": 1, "INTJ": 2, "ENTJ": 2, "INTP": 2, "ENTP": 2 },
    "ESFJ": { "ISFP": 5, "ISTP": 5, "ISFJ": 4, "ESFJ": 4, "ISTJ": 4, "ESTJ": 4, "ESFP": 3, "ESTP": 3, "INFP": 1, "ENFP": 1, "INFJ": 1, "ENFJ": 1, "INTJ": 2, "ENTJ": 2, "INTP": 2, "ENTP": 2 },
    "ISTJ": { "ESFP": 5, "ESTP": 5, "ISFJ": 4, "ESFJ": 4, "ISTJ": 4, "ESTJ": 4, "ISFP": 3, "ISTP": 3, "INFP": 1, "ENFP": 1, "INFJ": 1, "ENFJ": 1, "INTJ": 2, "ENTJ": 2, "INTP": 2, "ENTP": 2 },
    "ESTJ": { "ISFP": 5, "ISTP": 5, "INTP": 5, "ISFJ": 4, "ESFJ": 4, "ISTJ": 4, "ESTJ": 4, "ESFP": 3, "ESTP": 3, "INFP": 1, "ENFP": 1, "INFJ": 1, "ENFJ": 1, "INTJ": 2, "ENTJ": 2, "ENTP": 2 }
};


// 1. 장소: 일터 + 힐링 스팟 + 생활 공간
const PLACES = [
    // [Work]
    { id: 'practice', name: '연습실', type: 'out' },
    { id: 'studio', name: '작업실', type: 'out' },
    { id: 'broadcast', name: '방송국', type: 'out' },
    
    // [Daily Life]
    { id: 'apt', name: '숙소 거실', type: 'home' },
    { id: 'kitchen', name: '숙소 주방', type: 'home' }, // 요리 담당들의 성지
    { id: 'room', name: '침대 위', type: 'home' }, // 집돌이들의 성지
    
    // [Hobby & Play]
    { id: 'pc_bang', name: 'PC방', type: 'out' }, // 게이머들의 성지
    { id: 'hangang', name: '한강 공원', type: 'out' }, // 드라이브/산책
    { id: 'cinema', name: '영화관', type: 'out' },
    { id: 'dept_store', name: '백화점', type: 'out' }, // 쇼핑
    
    // [Vacation]
    { id: 'camping', name: '글램핑장', type: 'travel' },
    { id: 'hotel', name: '호텔 수영장', type: 'travel' },
    { id: 'travel', name: '해외 여행지', type: 'travel' }
];

// 2. 단어 세트: 취미와 음식 대폭 추가
const WORD_SETS = {
    // 음식
    food: ['마라탕', '평양냉면', '삼겹살', '스테이크', '치킨', '한강 라면', '직접 구운 쿠키', '김치찜', '단백질 쉐이크'],
    // 취미/놀이
    game: ['LOL', '오버워치', '배그', '카트라이더', '공포 게임', '리듬 게임'],
    movie: ['천만 관객 영화', '지루한 예술 영화', 'B급 공포 영화', '슬픈 로맨스 영화', '마블 영화'],
    // 쇼핑
    item: ['신상 운동화', '명품 향수', '한정판 피규어', '세일하는 티셔츠', '고양이 간식', '최신형 키보드'],
    // 활동
    hobby: ['레고 조립', '독서', '명상', '홈트레이닝', '유튜브 편집', '작사', '반야심경 외우기'],
    // 여행지
    spot: ['제주도', '부산 해운대', '강릉 바다', '가평 펜션', '도쿄', '하와이']
};

// 3. 행동 패턴: 캐릭터성을 살린 디테일한 로그
const ACTIONS = [
    // [집안일 & 휴식]
    { id: 'sleep', name: '수면', place: 'room', text: ['이불 밖은 위험하다며 나오지 않았다', '밀린 잠을 12시간 잤다', '꿈속에서 콘서트를 했다'] },
    { id: 'pet', name: '육아', place: 'apt', text: ['고양이(나나) 털을 빗겨주었다', '강아지(식빵, 잼) 산책을 시켰다', '반려동물에게 하소연을 했다'] },
    { id: 'cooking', name: '요리', place: 'kitchen', text: ['{food}을(를) 직접 요리했다', '냉장고를 털어 야식을 만들었다', '설거지 내기를 했다', '쿠키를 태워먹었다'] },
    { id: 'delivery', name: '배달', place: 'apt', text: ['배달 앱으로 {food}을(를) 시켰다', '배달비가 비싸서 고민했다', '치킨 닭다리를 양보했다'] },
    
    // [취미 생활]
    { id: 'gaming', name: '게임', place: 'pc_bang', text: ['{game} 랭크 게임을 돌렸다', '키보드를 샷건 쳤다', '{game} 버스를 탔다', '밤샘 게임을 했다'] },
    { id: 'movie', name: '문화', place: 'cinema', text: ['{movie}을(를) 보며 팝콘을 먹었다', '{movie}을(를) 보다 잠들었다', '심야 영화를 즐겼다'] },
    { id: 'drive', name: '운전', place: 'hangang', text: ['오픈카를 타고 드라이브를 했다', '자전거를 탔다', '차 안에서 노래를 크게 불렀다'] },
    { id: 'picnic', name: '산책', place: 'hangang', text: ['돗자리 펴고 {food}을(를) 먹었다', '물멍을 때렸다', '버스킹 구경을 했다'] },
    
    // [소비 & 관리]
    { id: 'shop', name: '쇼핑', place: 'dept_store', text: ['{item}을(를) 플렉스(FLEX) 했다', '아이쇼핑만 하고 왔다', '엄마 선물을 샀다'] },
    { id: 'beauty', name: '관리', place: 'dept_store', text: ['피부과를 예약했다', '퍼스널 컬러 진단을 받았다', '비싼 영양제를 샀다'] },
    
    // [본업]
    { id: 'work', name: '연습', place: 'practice', text: ['신곡 안무를 짰다', '거울 셀카만 찍다 왔다', '땀 흘리며 춤을 췄다'] },
    { id: 'music', name: '작업', place: 'studio', text: ['비트를 찍었다', '가사를 썼다 지웠다 했다', '저작권료를 확인했다'] },
    
    // [휴가]
    { id: 'vacation', name: '휴가', place: 'camping', text: ['불멍을 때렸다', '고기를 구워 먹었다', '모기에 뜯겼다', '무서운 이야기를 했다'] },
    { id: 'swim', name: '호캉스', place: 'hotel', text: ['수영장에서 인생샷을 찍었다', '룸서비스를 시켜 먹었다', '조식을 먹으러 일찍 일어났다'] }
];

/* ================= 이벤트 데이터 업데이트: 아이돌 시트콤 버전 ================= */

const EVENTS = [
    // ----------------------------------------------------------------
    // [Positive: 우정 & 유대감] (점수 상승)
    // ----------------------------------------------------------------
    { type: 'friend', name: '수다', change: 5, text: '와(과) 밤새도록 시간 가는 줄 모르고 수다를 떨었다' },
    { type: 'praise', name: '칭찬', change: 10, text: '의 바뀐 헤어스타일과 코디를 칭찬해주었다' },
    { type: 'console', name: '위로', change: 15, text: '이(가) 우울해 보여 조용히 다가가 따뜻하게 안아주었다' },
    { type: 'gift', name: '선물', change: 10, text: '에게 "오다가 주웠다"며 작은 선물을 줬다' },
    { type: 'treat', name: '한턱', change: 15, text: '에게 맛있는 밥을 사주며 "형(언니)이 쏜다!"라고 했다' },
    { type: 'help', name: '도움', change: 10, text: '의 어려운 안무 연습을 1:1로 도와주었다' },
    { type: 'monitor', name: '모니터', change: 5, text: '의 직캠을 같이 보며 "너 진짜 잘한다"고 추켜세웠다' },
    { type: 'reconcile', name: '화해', change: 20, text: '와(과) 술 한 잔 하며 묵은 감정을 털어내고 화해했다' },

    // ----------------------------------------------------------------
    // [Negative: 갈등 & 투정] (점수 하락)
    // ※ 운명(Soulmate) 관계는 이 이벤트가 발생해도 점수가 깎이지 않음!
    // ----------------------------------------------------------------
    { type: 'fight', name: '싸움', change: -15, text: '와(과) 사소한 말실수 때문에 크게 다퉜다' },
    { type: 'nag', name: '잔소리', change: -5, text: '에게 "양말 좀 뒤집어 놓지 마!"라고 잔소리를 퍼부었다' },
    { type: 'steal_food', name: '서리', change: -10, text: '이(가) 아껴둔 간식을 몰래 훔쳐 먹다가 걸렸다' },
    { type: 'ignore', name: '무시', change: -10, text: '의 인사를 못 본 척하고 지나갔다' },
    { type: 'diss', name: '디스', change: -15, text: '의 흑역사 사진을 단톡방에 올려 놀렸다' },
    { type: 'envy', name: '질투', change: -5, text: '이(가) 다른 멤버랑 친하게 지내는 걸 보고 묘한 질투를 느꼈다' },
    { type: 'cut', name: '절교', change: -30, text: '와(과) 더 이상 말을 섞지 않겠다며 냉전을 선포했다' },

    // ----------------------------------------------------------------
    // [Romance: 설렘 & 썸] (높은 점수 상승 + 연인 발전 가능성)
    // ----------------------------------------------------------------
    { type: 'flirt', name: '플러팅', change: 10, text: '에게 은근슬쩍 윙크를 하며 장난을 쳤다' },
    { type: 'skinship', name: '스킨십', change: 15, text: '의 어깨에 자연스럽게 기대어 잠들었다' },
    { type: 'gaze', name: '눈맞춤', change: 10, text: '와(과) 우연히 눈이 마주치자 묘한 기류가 흘렀다' },
    { type: 'confess', name: '고백', change: 0, text: '에게 용기를 내어 "나 너 좋아하는 것 같아"라고 고백했다' }, // 시스템에서 성공/실패 판정
    { type: 'breakup', name: '이별', change: 0, text: '에게 "우리 그만하자"며 이별을 통보했다' }, // 시스템에서 판정

    // ----------------------------------------------------------------
    // [Funny: 개그 & 일상] (소폭 변동)
    // ----------------------------------------------------------------
    { type: 'drunk', name: '주사', change: 5, text: '에게 술에 취해 혀 짧은 소리로 애교를 부렸다' },
    { type: 'game_bet', name: '내기', change: -5, text: '와(과) 게임 내기를 하다가 져서 딱밤을 맞았다' },
    { type: 'tmi', name: 'TMI', change: 5, text: '에게 안 궁금한 TMI를 1시간 동안 떠들었다' },
    { type: 'photo', name: '엽사', change: 5, text: '의 자는 얼굴을 몰래 찍어 "귀엽네"라고 혼잣말했다' },

    // [Hierarchy: 서열 이벤트]
    { type: 'bow', name: '인사', change: 5, text: '에게 90도로 깍듯하게 폴더 인사를 했다' },
    { type: 'treat_senior', name: '내리사랑', change: 15, text: '에게 "먹고 싶은 거 다 골라"라며 법카를 긁었다' },
    { type: 'scold', name: '훈계', change: -5, text: '를 불러 "라떼는 말이야"라며 1시간 동안 설교했다' },
    { type: 'praise_senior', name: '칭찬', change: 10, text: '에게 "역시 선배님(대표님) 최고십니다"라며 사회생활을 했다' },

    
];

/* ================= 비밀 행동 데이터 ================= */
const SECRET_EVENTS = [
    // [Soulmate 전용: 시안&재림, 윤&제헌 등]
    { type: 'escape', text: '와(과) 매니저 몰래 새벽 탈주를 감행했다', target: 'soulmate' },
    { type: 'secret_date', text: '와(과) 비상구 계단에서 몰래 만나 속삭였다', target: 'soulmate' },
    { type: 'signal', text: '와(과) 방송 카메라 뒤에서 손을 잡았다 놓았다', target: 'soulmate' },
    
    // [일반 멤버 공통]
    { type: 'night_snack', text: '와(과) 모두가 잠든 사이 라면을 끓여 먹었다', target: 'all' },
    { type: 'gossip', text: '와(과) 이불 속에 숨어 회사 뒷담화를 했다', target: 'all' },
    { type: 'game_night', text: '와(과) 방문을 잠그고 밤샘 게임을 했다', target: 'all' },
    { type: 'secret_item', text: '와(과) 서로의 애장품을 몰래 교환했다', target: 'all' }
];

// 비밀 목격담 (SNS 반응 대체)
const SECRET_REACTIONS = [
    'ㄴ...방금 뭐 지나갔냐?',
    'ㄴ저 둘 수상한데 나만 느꼈음?',
    'ㄴ(관리자 요청에 의해 삭제된 댓글입니다)',
    'ㄴ새벽에 편의점에서 봤다는 게 쟤네였어?',
    'ㄴ쉿 지켜주자...'
];


/* ================= SNS 팬 반응 데이터 ================= */
const FAN_REACTIONS = {
    // [설렘/연애]
    lover: ['ㄴ미친 쟤네 진짜 사귀나봐;;', '목격담 떴다.. 이 주식 떡상각', '눈빛 뭐야? 멜로 영화 찍네', '망붕 렌즈 장착합니다 ㅠㅠ'],
    flirt: ['ㄴ와.. 방금 플러팅 미쳤다', '유죄 인간이다 진짜..', '심장 터질 뻔;;', '끼 부리는 거 봐 ㅋㅋㅋ'],
    
    // [갈등]
    fight: ['ㄴ헐 분위기 살벌해.. 싸웠나?', '비즈니스 관계였네 ㅋㅋ', '기싸움 오진다;;', '숙소 공기 얼어붙었을 듯'],
    nag: ['ㄴ잔소리 킹받네 ㅋㅋㅋ', '엄마냐고 ㅋㅋㅋㅋ', '표정 봐 진짜 싫은가봐'],
    
    // [일상/개그]
    food: ['ㄴ맛있겠다.. 한 입만', '키니가 또 요리했네 ㅋㅋㅋ', '저거 어디 맛집임? 정보 좀', '먹방 라이브 켜줘 제발'],
    game: ['ㄴ겜돌이들 또 PC방 갔네', '샷건 치는 거 상상됨 ㅋㅋㅋ', '그래서 티어가 어디라고요?', '버스 태워달라고 하고 싶다'],
    sleep: ['ㄴ잠자는 숲속의 왕자님임?', '얼굴 붓기도 귀엽다', '이불 밖은 위험하지 암암'],
    
    // [비주얼/활동]
    visual: ['ㄴ와 얼굴이 복지다..', '비주얼 합 미쳤음 ㅠㅠ', '오늘 착장 박제 시급', '나라 구한 얼굴이다'],
    work: ['ㄴ연습 벌레들 ㅠㅠ', '컴백 스포 아님?', '얼마나 명반을 들고 오려고..', '갓생 산다 진짜']
};

function getFanReaction(type, names) {
    if (!FAN_REACTIONS[type]) return null;
    // 50% 확률로 반응이 뜸
    if (Math.random() < 0.5) {
        const msg = FAN_REACTIONS[type][Math.floor(Math.random() * FAN_REACTIONS[type].length)];
        return `<span class="text-blue-400 dark:text-blue-300 font-bold text-xs ml-2">@IDOL_Lover</span> <span class="text-slate-500 dark:text-slate-400 text-xs">${msg}</span>`;
    }
    return null;
}

/* ================= 스타게이즈 멤버 데이터 및 운명 시스템 ================= */

// 1. 멤버 데이터
const STARGAZE_MEMBERS = [
    // [4-EVER] - 이사 대우
    { name: "부여 윤", mbti: "INTJ", room: "501", role: "Director" },
    { name: "백제헌", mbti: "ISTP", room: "501", role: "Director" },
    
    // [N.ILL]
    { name: "김재원", mbti: "INFJ", room: "401", role: "Leader" },
    { name: "백시안", mbti: "ENTJ", room: "401", role: "Artist" },
    { name: "한주원", mbti: "INFP", room: "401", role: "Artist" },
    { name: "차민규", mbti: "ESTP", room: "402", role: "Artist" },
    
    // [ASTRA NOVA]
    { name: "천재림", mbti: "INFJ", room: "301", role: "Leader" },
    { name: "금현준(키니)", mbti: "ENFP", room: "301", role: "Artist" },
    { name: "신예준", mbti: "INTP", room: "301", role: "Artist" },
    { name: "견기매", mbti: "ESFP", room: "302", role: "Artist" },
    { name: "오태영", mbti: "ESTJ", room: "302", role: "Artist" },
    { name: "빙하수", mbti: "ISTJ", room: "302", role: "Artist" },
    
    // [Staff & Others]
    { name: "현갑수", mbti: "ESFP", room: "101", role: "CEO" },
    { name: "유채민(JAM-IN)", mbti: "ENTP", room: "201", role: "Guest" }
];

// 2. 절대 깨지지 않는 운명의 단짝 설정 (이름으로 매칭)
const SOULMATES = [
    ["부여 윤", "백제헌"], // 30년 지기
    ["백시안", "천재림"]  // 쌍방 구원 서사
];

function loadStargazeCharacters() {
    if(!confirm("현재 명단을 지우고 '스타게이즈' 멤버들을 소환하시겠습니까?")) return;
    characters = [];
    
    STARGAZE_MEMBERS.forEach(member => {
        characters.push({
            id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
            name: member.name,
            mbti: member.mbti,
            room: member.room,
            role: member.role, // [추가됨] 직급 저장
            hp: 100,    // [추가] 초기 체력
            stress: 0,  // [추가] 초기 스트레스
            currentLocation: 'apt',
            currentAction: '-',
            relationships: {},
            specialRelations: {},
            isSoulmateWith: null
        });
    });

    // 소울메이트 ID 연결 및 초기 호감도 MAX 설정
    SOULMATES.forEach(pair => {
        const char1 = characters.find(c => c.name === pair[0]);
        const char2 = characters.find(c => c.name === pair[1]);
        
        if (char1 && char2) {
            // 서로의 ID를 기록해둠 (운명 각인)
            char1.isSoulmateWith = char2.id;
            char2.isSoulmateWith = char1.id;

            // 초기 호감도 100점 시작
            char1.relationships[char2.id] = 100;
            char2.relationships[char1.id] = 100;
            
            // 특별 관계 표시
            char1.specialRelations[char2.id] = 'soulmate';
            char2.specialRelations[char1.id] = 'soulmate';
        }
    });
    
    renderCharacterList();
    renderLocations();
    renderStatusTable();
    clearLogs();
    document.getElementById('total-count').textContent = characters.length;
    alert("✨ 계급장이 부여된 입주민들이 도착했습니다! ✨");
    
    // 로그 메시지
    const logContainer = document.getElementById('log-container');
    logContainer.innerHTML = `
        <div class="mb-6 animate-[fadeIn_0.5s_ease-out]">
            <div class="text-center text-brand-600 dark:text-brand-400 font-bold p-4 bg-brand-50 dark:bg-slate-800 rounded-lg border border-brand-200 dark:border-brand-900">
                ✨ SG HOUSE 입주 완료 ✨<br>
                <span class="text-xs font-normal text-slate-500 mt-2 block">
                    "운명적인 관계는 붉은 실로 연결되었습니다."
                </span>
            </div>
        </div>
    `;
}

let characters = [];
let day = 1;
let logs = [];
let affectionMode = false;
let isDarkMode = false;

window.onload = () => {
    initMbtiSelect();
    initRoomSelect();
    renderCharacterList();
    renderLocations();
    updateUI();
    
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        isDarkMode = true;
    }
};

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

function hasJongseong(char) {
    if (!char) return false;
    const code = char.charCodeAt(0);
    return (code - 0xAC00) % 28 > 0;
}

function getJosa(word, type) {
    const lastChar = word.charAt(word.length - 1);
    const has = hasJongseong(lastChar);
    
    if (type === '은/는') return has ? '은' : '는';
    if (type === '이/가') return has ? '이' : '가';
    if (type === '을/를') return has ? '을' : '를';
    if (type === '와/과') return has ? '과' : '와';
    return '';
}

function fillTemplate(text) {
    let replaced = text.replace(/{(\w+)}/g, (match, key) => {
        const words = WORD_SETS[key];
        return words ? getRandom(words) : match;
    });

    replaced = replaced.replace(/(\S+)\((은\/는|이\/가|을\/를|와\/과)\)/g, (match, word, josa) => {
        return word + getJosa(word, josa);
    });

    return replaced;
}

function calculateChemistry(mbti1, mbti2) {
    if (!compatibilityData[mbti1] || !compatibilityData[mbti1][mbti2]) return 3;
    return compatibilityData[mbti1][mbti2];
}

function getRelationshipLabel(score, specialStatus) {
    if (specialStatus === 'lover') return "💖 연인";
    if (score <= -80) return "원수";
    if (score <= -60) return "혐오";
    if (score <= -40) return "적대";
    if (score <= -20) return "불편";
    if (score < 0) return "서먹";
    if (score === 0) return "얼굴만 아는 사람";
    if (score < 10) return "아는 사람";
    if (score < 20) return "지인";
    if (score < 40) return "친구";
    if (score < 60) return "절친";
    if (score < 80) return "신뢰";
    return "소울메이트"; 
}

function getHeartHTML(score, specialStatus) {
    if (specialStatus === 'lover') {
        let html = '';
        for(let i=0; i<5; i++) html += `<i class="fa-solid fa-heart heart-lover"></i>`;
        return html;
    }
    if (score === 0) return `<i class="fa-regular fa-heart heart-empty"></i>`;
    
    let html = '';
    if (score > 0) {
        const count = Math.floor(score / 20);
        const remainder = score % 20;
        for(let i=0; i<count; i++) html += `<i class="fa-solid fa-heart heart-full"></i>`;
        if(count < 5 && remainder > 10) html += `<i class="fa-solid fa-heart heart-light"></i>`;
        else if (count === 0 && remainder > 0) html += `<i class="fa-regular fa-heart heart-light"></i>`;
    } else {
        const count = Math.floor(Math.abs(score) / 20);
        for(let i=0; i<count; i++) html += `<i class="fa-solid fa-heart-crack heart-broken"></i>`;
        if (count === 0) html += `<i class="fa-solid fa-heart-crack text-slate-300"></i>`;
    }
    return html || `<i class="fa-regular fa-heart heart-empty"></i>`;
}

/* ================= 관계 업데이트 로직 수정 (운명 보정) ================= */

function updateRelationship(charId1, charId2, amount) {
    const char1 = characters.find(c => c.id === charId1);
    const char2 = characters.find(c => c.id === charId2); // 상대방 정보 찾기
    
    if (!char1.relationships[charId2]) char1.relationships[charId2] = 0;

    // [운명 보정 로직]
    // 만약 상대방이 나의 '소울메이트'라면?
    if (char1.isSoulmateWith === charId2) {
        if (amount > 0) {
            // 좋은 일이 있으면 2배로 좋아짐
            amount = amount * 2; 
        } else {
            // 나쁜 일이 생기면(싸움 등) 무효화하거나 오히려 애틋해짐(+2)
            // 즉, 절대 싸우지 않음
            amount = 2; 
        }
    }

    // 점수 적용
    char1.relationships[charId2] += amount;

    // 최대/최소 제한
    if (char1.relationships[charId2] > 100) char1.relationships[charId2] = 100;
    if (char1.relationships[charId2] < -100) char1.relationships[charId2] = -100;
}

// (참고) 관계 라벨 표시 함수도 살짝 수정해주면 좋습니다.
function getRelationshipLabel(score, specialStatus) {
    if (specialStatus === 'soulmate') return "♾️ 운명"; // 소울메이트 전용 라벨
    if (specialStatus === 'lover') return "💖 연인";
    if (score <= -80) return "원수";
    if (score <= -60) return "혐오";
    if (score <= -40) return "적대";
    if (score <= -20) return "불편";
    if (score < 0) return "서먹";
    if (score === 0) return "초면";
    if (score < 10) return "지인";
    if (score < 20) return "아는 사이";
    if (score < 40) return "친구";
    if (score < 60) return "절친";
    if (score < 80) return "신뢰";
    return "영혼의 단짝"; 
}

function setSpecialStatus(charId1, charId2, status) {
    const char1 = characters.find(c => c.id === charId1);
    if (!char1.specialRelations) char1.specialRelations = {};
    if (status === null) delete char1.specialRelations[charId2];
    else char1.specialRelations[charId2] = status;
}

function getProbabilisticChange(score) {
    const rand = Math.random() * 100;
    
    if (score === 5) {
        if (rand < 50) return 10;
        if (rand < 75) return 5;
        if (rand < 90) return 0;
        return -5;
    } else if (score === 4) {
        if (rand < 25) return 10;
        if (rand < 55) return 5;
        if (rand < 80) return 0;
        if (rand < 90) return -5;
        return -10;
    } else if (score === 3) {
        if (rand < 20) return 10;
        if (rand < 45) return 5;
        if (rand < 70) return 0;
        if (rand < 95) return -5;
        return -10;
    } else if (score === 2) {
        if (rand < 10) return 10;
        if (rand < 20) return 5;
        if (rand < 45) return 0;
        if (rand < 75) return -5;
        return -10;
    } else {
        if (rand < 10) return 10;
        if (rand < 25) return 5;
        if (rand < 50) return 0;
        return -5;
    }
}

/* ================= nextDay 업데이트: 시즌 + 비밀 이벤트 ================= */
function nextDay() {
    if (characters.length === 0) { alert("최소 1명의 캐릭터가 필요합니다."); return; }
    day++;
    const dailyLogs = [];
    characters.forEach(c => c.interactionGroup = null);

    // 1. 시즌에 따른 장소 확률 조정
    const isComeback = currentSeason === 'comeback';

    characters.forEach(char => {
        if (!char.hp) char.hp = 100;
        
        // 체력 고갈 시 강제 휴식
        if (char.hp < 10) {
            char.currentLocation = 'room';
            return;
        }

        // 시즌별 외출 확률
        let goOutChance = isComeback ? 0.9 : 0.4; // 컴백 때는 90% 외출
        if (char.mbti[0] === 'I') goOutChance -= 0.1;

        if (Math.random() < goOutChance) {
            // 시즌별 선호 장소
            let targetPlaces = [];
            if (isComeback) {
                // 일터 위주
                targetPlaces = PLACES.filter(p => ['practice', 'studio', 'broadcast', 'shop', 'gym'].includes(p.id));
            } else {
                // 놀기 위주
                targetPlaces = PLACES.filter(p => ['pc_bang', 'hangang', 'cinema', 'dept_store', 'travel', 'camping'].includes(p.id));
            }
            // 장소가 마땅치 않으면 전체 외출 장소 중 선택
            if(targetPlaces.length === 0) targetPlaces = PLACES.filter(p => p.type === 'out');
            
            char.currentLocation = getRandom(targetPlaces).id;
        } else {
            char.currentLocation = getRandom(['apt', 'kitchen', 'room']);
        }
    });

    // ... (그룹핑 로직은 동일) ...
    const locationMap = {};
    characters.forEach(char => {
        if (!locationMap[char.currentLocation]) locationMap[char.currentLocation] = [];
        locationMap[char.currentLocation].push(char);
    });

    for (const locId in locationMap) {
        const people = locationMap[locId];
        people.sort(() => Math.random() - 0.5);

        while (people.length > 0) {
            let groupSize = 1;
            if (people.length >= 2) groupSize = 2;
            const group = [];
            for(let i=0; i<groupSize; i++) { if(people.length > 0) group.push(people.pop()); }
            const hasKinney = group.some(c => c.name.includes("키니")); // 키니 버프

            // [솔로 행동]
            if (group.length === 1) {
                const actor = group[0];
                let actionPool = ACTIONS.filter(a => a.place === locId);
                if (actionPool.length === 0) actionPool = ACTIONS.filter(a => a.id === 'rest');
                const action = getRandom(actionPool);
                const processedText = fillTemplate(getRandom(action.text));
                actor.currentAction = action.name;
                
                // 시즌별 스트레스 보정
                const statusResult = updateStats(actor, action.id, false);
                if(isComeback) actor.stress += 5; // 활동기는 기본 스트레스 추가

                let reactType = 'visual';
                if (action.id === 'cooking') reactType = 'food';
                if (action.id === 'gaming') reactType = 'game';
                if (action.id === 'work') reactType = 'work';

                dailyLogs.push({ text: `${actor.name}${getJosa(actor.name, '은/는')} ${getLocationName(locId)}에서 ${processedText}.`, type: 'solo', reaction: getFanReaction(reactType, actor.name) });
            } 
            // [그룹 행동]
            else if (group.length === 2) {
                const actor = group[0];
                const target = group[1];
                const isSoulmate = actor.isSoulmateWith === target.id;
                
                // ★★★ 비밀 이벤트 발생 로직 (10% 확률) ★★★
                if (Math.random() < 0.1) {
                    let secretPool = SECRET_EVENTS.filter(e => e.target === 'all');
                    
                    // 소울메이트라면 전용 비밀 이벤트 추가 (시안&재림 등)
                    if (isSoulmate) {
                        secretPool = [...secretPool, ...SECRET_EVENTS.filter(e => e.target === 'soulmate')];
                    }
                    
                    const secret = getRandom(secretPool);
                    
                    // 비밀은 관계도 대폭 상승
                    updateRelationship(actor.id, target.id, 10);
                    updateRelationship(target.id, actor.id, 10);
                    
                    // 비밀 로그 스타일
                    const secretText = `🤫 [비밀] ${actor.name}${getJosa(actor.name, '와/과')} ${target.name}${getJosa(target.name, '은/는')} ${secret.text}.`;
                    const secretReaction = getRandom(SECRET_REACTIONS); // 목격담
                    
                    dailyLogs.push({ 
                        text: secretText, 
                        type: 'secret', // 새로운 타입
                        reaction: `<span class="text-purple-400 font-bold text-xs ml-2">👁️ 목격담</span> <span class="text-slate-500 text-xs">${secretReaction}</span>` 
                    });
                    
                    actor.currentAction = "비밀 행동";
                    target.currentAction = "비밀 행동";
                    
                    // 비밀 행동은 스트레스 해소됨
                    actor.stress -= 10; target.stress -= 10;
                }
                // [일반 이벤트]
                else if (Math.random() < 0.3) {
                    const evt = getRandom(EVENTS);
                    // 서열/운명 보정
                    if ((evt.type === 'fight' || evt.type === 'cut') && isSoulmate) {
                        dailyLogs.push({ text: `[투정] ${actor.name}${getJosa(actor.name, '은/는')} ${target.name}에게 투정을 부렸지만, 금방 풀렸다.`, type: 'event', reaction: getFanReaction('visual') });
                    } else {
                        updateRelationship(actor.id, target.id, evt.change);
                        updateRelationship(target.id, actor.id, evt.change);
                        dailyLogs.push({ text: `[${evt.name}] ${actor.name}${getJosa(actor.name, '은/는')} ${target.name}${evt.text}.`, type: 'event', reaction: getFanReaction('visual') });
                    }
                    actor.currentAction = evt.name; target.currentAction = evt.name;
                    updateStats(actor, 'rest', hasKinney); updateStats(target, 'rest', hasKinney);
                } 
                // [일상 대화]
                else {
                    let actionPool = ACTIONS.filter(a => a.place === locId);
                    if (actionPool.length === 0) actionPool = ACTIONS.filter(a => a.id === 'rest');
                    const action = getRandom(actionPool);
                    const processedText = fillTemplate(getRandom(action.text));
                    const chem = calculateChemistry(actor.mbti, target.mbti);
                    updateRelationship(actor.id, target.id, getProbabilisticChange(chem));
                    updateRelationship(target.id, actor.id, getProbabilisticChange(chem));
                    actor.currentAction = "함께 " + action.name; target.currentAction = "함께 " + action.name;
                    
                    dailyLogs.push({ text: `${actor.name}${getJosa(actor.name, '와/과')} ${target.name}${getJosa(target.name, '은/는')} ${getLocationName(locId)}에서 함께 ${processedText}.`, type: 'social', reaction: getFanReaction('visual') });
                    updateStats(actor, action.id, hasKinney); updateStats(target, action.id, hasKinney);
                }
            }
        }
    }

    logs = [...dailyLogs, ...logs];
    renderLogs(dailyLogs);
    renderStatusTable();
    renderLocations();
    updateUI();
    saveGameData(); 
}

function getLocationName(id) {
    const p = PLACES.find(x => x.id === id);
    return p ? p.name : id;
}

function addCharacter() {
    if (characters.length >= 30) return alert("최대 30명까지만 가능합니다.");
    const nameInput = document.getElementById('input-name');
    const mbtiInput = document.getElementById('input-mbti');
    const roomInput = document.getElementById('input-room');
    const name = nameInput.value.trim();
    if (!name) return alert("이름을 입력해주세요.");
    if (characters.some(c => c.name === name)) return alert("이미 존재하는 이름입니다.");
    let room = roomInput.value;
    if (room === 'auto') {
        room = findEmptyRoom();
        if (!room) return alert("빈 방이 없습니다.");
    } else if (getRoomCount(room) >= 4) return alert("해당 방은 정원 초과입니다.");

    characters.push({
        id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
        name: name, mbti: mbtiInput.value, room: room,
        currentLocation: 'apt', currentAction: '-', relationships: {}, specialRelations: {}
    });
    nameInput.value = '';
    renderCharacterList(); renderLocations(); updateUI();
}

function removeCharacter(id) {
    if (!confirm("삭제하시겠습니까?")) return;
    characters = characters.filter(c => c.id !== id);
    characters.forEach(c => {
        delete c.relationships[id];
        if(c.specialRelations) delete c.specialRelations[id];
    });
    renderCharacterList(); renderLocations(); updateUI();
}

function findEmptyRoom() {
    const counts = {};
    for (let f=1; f<=5; f++) for (let r=1; r<=6; r++) counts[`${f}0${r}`] = 0;
    characters.forEach(c => { if (counts[c.room] !== undefined) counts[c.room]++; });
    const sorted = Object.keys(counts).sort((a,b) => counts[a] - counts[b]);
    return counts[sorted[0]] >= 4 ? null : sorted[0];
}

function getRoomCount(roomNum) { return characters.filter(c => c.room === roomNum).length; }

function initMbtiSelect() {
    const sel = document.getElementById('input-mbti');
    MBTI_TYPES.forEach(t => { const opt = document.createElement('option'); opt.value = t; opt.text = t; sel.appendChild(opt); });
}
function initRoomSelect() {
    const sel = document.getElementById('input-room');
    for (let f=1; f<=5; f++) for (let r=1; r<=6; r++) { const opt = document.createElement('option'); opt.value = `${f}0${r}`; opt.text = `${f}0${r}호`; sel.appendChild(opt); }
}

/* ================= UI 수정: 직급 배지 표시 기능 ================= */

// 1. 직급별 배지 HTML 생성 함수 (새로 추가됨)
function getRoleBadge(role) {
    switch(role) {
        case 'CEO': return '<span class="text-[10px] bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800 px-1.5 py-0.5 rounded font-bold ml-2">대표</span>';
        case 'Director': return '<span class="text-[10px] bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 px-1.5 py-0.5 rounded font-bold ml-2">이사</span>';
        case 'Leader': return '<span class="text-[10px] bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 px-1.5 py-0.5 rounded font-bold ml-2">리더</span>';
        case 'Guest': return '<span class="text-[10px] bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800 px-1.5 py-0.5 rounded font-bold ml-2">손님</span>';
        default: return ''; // 일반 아티스트는 배지 없음
    }
}

// 2. 캐릭터 리스트 렌더링 함수 (수정됨)
function renderCharacterList() {
    const container = document.getElementById('character-list');
    const emptyState = document.getElementById('empty-state');
    container.innerHTML = '';
    
    if (characters.length === 0) { 
        container.classList.add('hidden'); 
        emptyState.classList.remove('hidden'); 
        return; 
    }
    container.classList.remove('hidden'); 
    emptyState.classList.add('hidden');

    characters.forEach(char => {
        const div = document.createElement('div');
        // 카드 디자인: 그라데이션 테두리 효과 + 부드러운 그림자
        div.className = "relative bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-lg border border-slate-100 dark:border-slate-700 hover:-translate-y-1 transition-transform duration-300 group overflow-hidden";
        
        // 배경 데코레이션 (희미한 원)
        div.innerHTML = `<div class="absolute -top-6 -right-6 w-24 h-24 bg-brand-100 dark:bg-brand-900/30 rounded-full blur-xl opacity-50 pointer-events-none"></div>`;

        // 직급별 스타일링
        let badgeStyle = "bg-slate-100 text-slate-600";
        if (char.role === 'CEO') badgeStyle = "bg-red-50 text-red-600 border border-red-100";
        if (char.role === 'Director') badgeStyle = "bg-purple-50 text-purple-600 border border-purple-100";
        if (char.role === 'Leader') badgeStyle = "bg-blue-50 text-blue-600 border border-blue-100";
        if (char.role === 'Artist') badgeStyle = "bg-brand-50 text-brand-600 border border-brand-100";

        // 내부 컨텐츠
        const content = document.createElement('div');
        content.className = "relative z-10";
        
        if (affectionMode) {
            div.onclick = () => showAffectionModal(char.id);
            div.className += " cursor-pointer ring-2 ring-transparent hover:ring-brand-400";
            content.innerHTML = `
                <div class="flex justify-between items-center mb-3">
                    <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${badgeStyle}">${char.role || 'Artist'}</span>
                    <span class="text-xs text-slate-400">${char.mbti}</span>
                </div>
                <div class="text-center py-2">
                    <h3 class="font-bold text-lg text-slate-800 dark:text-white mb-1">${char.name}</h3>
                    <div class="text-xs text-slate-500 dark:text-slate-400 flex justify-center items-center gap-1">
                        <i class="fa-solid fa-heart text-brand-400 heart-pulse"></i> 관계 보기
                    </div>
                </div>
            `;
        } else {
            content.innerHTML = `
                <button onclick="removeCharacter('${char.id}')" class="absolute -top-1 -right-1 text-slate-300 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 transition-opacity"><i class="fa-solid fa-circle-minus"></i></button>
                <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-full bg-gradient-to-br from-brand-100 to-white dark:from-slate-700 dark:to-slate-600 border-2 border-white dark:border-slate-500 shadow-sm flex items-center justify-center text-xl text-brand-400 dark:text-brand-300">
                        <i class="fa-solid fa-user"></i>
                    </div>
                    <div>
                        <div class="flex items-center gap-2 mb-0.5">
                            <h3 class="font-bold text-slate-900 dark:text-white">${char.name}</h3>
                            <span class="text-[10px] font-bold px-1.5 py-0.5 rounded ${badgeStyle}">${char.role || 'Artist'}</span>
                        </div>
                        <div class="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
                            <span><i class="fa-solid fa-door-open mr-1 opacity-70"></i>${char.room}</span>
                            <span class="w-0.5 h-2 bg-slate-300 rounded-full"></span>
                            <span>${char.mbti}</span>
                        </div>
                    </div>
                </div>
            `;
        }
        div.appendChild(content);
        container.appendChild(div);
    });
    document.getElementById('total-count').textContent = characters.length;
}


function renderLocations() {
    const aptGrid = document.getElementById('apartment-grid');
    aptGrid.innerHTML = '';
    const renderedIds = new Set();
    
    const getGroupMembers = (char) => {
        if (!char.interactionGroup) return [char];
        return characters.filter(c => c.interactionGroup === char.interactionGroup && c.currentLocation === char.currentLocation);
    };

    for (let f=5; f>=1; f--) { 
        for (let r=1; r<=6; r++) {
            const roomNum = `${f}0${r}`;
            const occupants = characters.filter(c => c.room === roomNum && c.currentLocation === 'apt');
            const cell = document.createElement('div');
            cell.className = "bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg p-2 min-h-[80px] flex flex-col relative";
            cell.innerHTML = `<div class="text-xs font-mono text-slate-400 mb-1 absolute top-1 right-2">${roomNum}</div>`;
            const occDiv = document.createElement('div');
            occDiv.className = "flex flex-wrap gap-1 mt-4";
            
            occupants.forEach(occ => {
                if (renderedIds.has(occ.id)) return;
                const groupMembers = getGroupMembers(occ);
                const allInApt = groupMembers.every(m => m.currentLocation === 'apt');
                
                if (groupMembers.length > 1 && allInApt) {
                     const groupSpan = document.createElement('span');
                     groupSpan.className = "inline-flex items-center gap-0.5 bg-white dark:bg-slate-600 border border-brand-200 dark:border-slate-500 rounded px-1 shadow-sm max-w-full flex-wrap";
                     let html = ``;
                     groupMembers.forEach((m, idx) => {
                         html += `<span class="text-[10px] text-brand-700 dark:text-brand-300 font-bold whitespace-nowrap">${m.name}</span>`;
                         if (idx < groupMembers.length - 1) html += `<i class="fa-solid fa-link text-[8px] text-slate-400 mx-0.5"></i>`;
                         renderedIds.add(m.id);
                     });
                     groupSpan.innerHTML = html;
                     occDiv.appendChild(groupSpan);
                } else {
                     const badge = document.createElement('span');
                     badge.className = "text-[10px] bg-brand-100 dark:bg-brand-900 text-brand-700 dark:text-brand-300 px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap overflow-hidden text-ellipsis max-w-full";
                     badge.textContent = occ.name;
                     occDiv.appendChild(badge);
                     renderedIds.add(occ.id);
                }
            });
            cell.appendChild(occDiv);
            aptGrid.appendChild(cell);
        }
    }

    const extList = document.getElementById('external-places-list');
    extList.innerHTML = '';
    const placesToRender = PLACES.filter(p => p.type === 'out' || p.type === 'travel');

    placesToRender.forEach(place => {
        const occupants = characters.filter(c => c.currentLocation === place.id);
        const row = document.createElement('div');
        row.className = `p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-100 dark:border-slate-600 flex items-start gap-3 ${place.id === 'travel' ? 'border-l-4 border-l-purple-400' : ''}`;
        
        let icon = 'fa-building';
        if (place.id === 'mart') icon = 'fa-cart-shopping';
        if (place.id === 'cafe') icon = 'fa-mug-hot';
        if (place.id === 'school') icon = 'fa-graduation-cap';
        if (place.id === 'restaurant') icon = 'fa-utensils';
        if (place.id === 'travel') icon = 'fa-plane-departure text-purple-500';
        
        let html = `
            <div class="w-10 h-10 rounded-full bg-white dark:bg-slate-600 flex items-center justify-center text-slate-400 shadow-sm flex-none">
                <i class="fa-solid ${icon}"></i>
            </div>
            <div class="flex-1">
                <div class="font-medium text-sm mb-1">${place.name}</div>
                <div class="flex flex-wrap gap-1">
        `;
        
        if (occupants.length === 0) {
            html += `<span class="text-xs text-slate-400">-</span>`;
        } else {
            const extRenderedIds = new Set();
            occupants.forEach(occ => {
                 if (extRenderedIds.has(occ.id)) return;
                 const groupMembers = getGroupMembers(occ);

                 if (groupMembers.length > 1) {
                     html += `<span class="inline-flex items-center gap-0.5 bg-white dark:bg-slate-600 border border-yellow-300 dark:border-yellow-700 rounded px-1 shadow-sm flex-wrap">`;
                     groupMembers.forEach((m, idx) => {
                         html += `<span class="text-[10px] text-yellow-800 dark:text-yellow-200 font-bold whitespace-nowrap">${m.name}</span>`;
                         if (idx < groupMembers.length - 1) html += `<i class="fa-solid fa-link text-[8px] text-slate-400 mx-0.5"></i>`;
                         extRenderedIds.add(m.id);
                     });
                     html += `</span>`;
                 } else {
                     html += `<span class="text-xs bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200 px-2 py-0.5 rounded-full">${occ.name}</span>`;
                     extRenderedIds.add(occ.id);
                 }
            });
        }
        html += `</div></div>`;
        row.innerHTML = html;
        extList.appendChild(row);
    });
}

/* ================= UI 수정: HP & 스트레스 바 표시 ================= */
function renderStatusTable() {
    const tbody = document.getElementById('status-table-body');
    tbody.innerHTML = '';
    
    characters.forEach(char => {
        // 데이터가 없는 경우 초기화
        if (typeof char.hp === 'undefined') char.hp = 100;
        if (typeof char.stress === 'undefined') char.stress = 0;

        const tr = document.createElement('tr');
        const locName = getLocationName(char.currentLocation);
        
        // HP 색상 (낮으면 빨강)
        let hpColor = "bg-green-500";
        if (char.hp < 30) hpColor = "bg-red-500";
        else if (char.hp < 70) hpColor = "bg-yellow-500";

        // 스트레스 색상 (높으면 빨강)
        let stressColor = "bg-blue-400";
        if (char.stress > 80) stressColor = "bg-red-600";
        else if (char.stress > 50) stressColor = "bg-orange-400";

        tr.innerHTML = `
            <td class="px-4 py-3">
                <div class="font-medium text-slate-900 dark:text-white flex items-center">
                    ${char.name} ${getRoleBadge(char.role)}
                </div>
            </td>
            <td class="px-4 py-3">
                <div class="text-xs text-slate-500 mb-1">체력 ${Math.round(char.hp)}%</div>
                <div class="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-1.5 mb-2">
                    <div class="${hpColor} h-1.5 rounded-full transition-all duration-500" style="width: ${char.hp}%"></div>
                </div>
                <div class="text-xs text-slate-500 mb-1">스트레스 ${Math.round(char.stress)}%</div>
                <div class="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-1.5">
                    <div class="${stressColor} h-1.5 rounded-full transition-all duration-500" style="width: ${char.stress}%"></div>
                </div>
            </td>
            <td class="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">
                <span class="font-bold text-xs bg-slate-100 dark:bg-slate-600 px-2 py-1 rounded mr-1">${locName}</span>
                ${char.currentAction || '-'}
            </td>
        `;
        tbody.appendChild(tr);
    });
    document.getElementById('day-badge').textContent = `${day}일차`;
}

/* ================= 로그 렌더링 (디자인 + 텍스트 강조) ================= */

// 텍스트 강조 헬퍼 함수
function highlightKeywords(text) {
    let highlighted = text;

    // 1. 캐릭터 이름 강조 (진하게 + 색상)
    characters.forEach(char => {
        // 이름이 겹칠 수 있으므로(예: 김철수, 김철) 긴 이름부터 처리하거나 주의해야 함. 
        // 여기서는 단순 치환
        const regex = new RegExp(`(${char.name})`, 'g');
        highlighted = highlighted.replace(regex, `<span class="font-bold text-slate-900 dark:text-white">$1</span>`);
    });

    // 2. 장소 이름 강조 (색상)
    PLACES.forEach(place => {
        const regex = new RegExp(`(${place.name})`, 'g');
        highlighted = highlighted.replace(regex, `<span class="font-semibold text-brand-600 dark:text-brand-400">$1</span>`);
    });

    return highlighted;
}

function renderLogs(newLogs) {
    const container = document.getElementById('log-container');
    
    // 초기화 문구 제거
    if (container.querySelector('.italic')) container.innerHTML = '';
    
    // 날짜 구분선 (더 예쁘게)
    const dayDiv = document.createElement('div');
    dayDiv.className = "mb-8 animate-fade-in-up";
    dayDiv.innerHTML = `
        <div class="flex items-center justify-center mb-4">
            <div class="bg-brand-100 dark:bg-brand-900/50 text-brand-700 dark:text-brand-300 px-4 py-1 rounded-full text-xs font-bold tracking-wider shadow-sm border border-brand-200 dark:border-brand-700">
                DAY ${day}
            </div>
        </div>
    `;
    
    newLogs.forEach(log => {
        // 로그 박스
        const wrapper = document.createElement('div');
        wrapper.className = "mb-3 group relative pl-4"; // 왼쪽에 라인 들어갈 공간 확보

        // 왼쪽 장식 라인
        const line = document.createElement('div');
        
        let bgColor = "bg-white dark:bg-slate-800";
        let borderColor = "border-slate-200 dark:border-slate-700";
        let textColor = "text-slate-600 dark:text-slate-300";
        let icon = "";

        // 타입별 스타일 설정
        if (log.type === 'event') {
            line.className = "absolute left-0 top-1 bottom-1 w-1 bg-brand-400 rounded-full";
            bgColor = "bg-brand-50/50 dark:bg-brand-900/10";
            icon = `<i class="fa-solid fa-star text-brand-400 mr-2 text-xs"></i>`;
        } else if (log.type === 'secret') {
            line.className = "absolute left-0 top-1 bottom-1 w-1 bg-purple-500 rounded-full";
            bgColor = "bg-purple-50/50 dark:bg-purple-900/10";
            icon = `<i class="fa-solid fa-lock text-purple-500 mr-2 text-xs"></i>`;
        } else if (log.type === 'social') {
            line.className = "absolute left-0 top-1 bottom-1 w-1 bg-yellow-400 rounded-full";
            icon = `<i class="fa-solid fa-comment-dots text-yellow-500 mr-2 text-xs"></i>`;
        } else { // solo
            line.className = "absolute left-0 top-1 bottom-1 w-1 bg-slate-300 dark:bg-slate-600 rounded-full";
        }

        // 메인 로그 텍스트
        const p = document.createElement('div');
        p.className = `p-3 rounded-lg border ${borderColor} ${bgColor} shadow-sm text-sm leading-relaxed ${textColor}`;
        
        // ★ 여기서 텍스트 강조 함수 실행 ★
        p.innerHTML = icon + highlightKeywords(log.text);
        
        wrapper.appendChild(line);
        wrapper.appendChild(p);

        // SNS 반응 (트위터 스타일 말풍선)
        if (log.reaction) {
            const snsDiv = document.createElement('div');
            snsDiv.className = "mt-2 ml-4 flex items-start gap-2 animate-pulse";
            snsDiv.innerHTML = `
                <div class="w-6 h-6 rounded-full bg-blue-400 flex items-center justify-center text-white text-[10px] flex-none mt-0.5">
                    <i class="fa-brands fa-twitter"></i>
                </div>
                <div class="bg-slate-100 dark:bg-slate-700/80 px-3 py-2 rounded-r-xl rounded-bl-xl text-xs text-slate-600 dark:text-slate-300 shadow-sm border border-slate-200 dark:border-slate-600">
                    ${log.reaction.replace('ㄴ', '')} <!-- 'ㄴ' 제거하고 깔끔하게 -->
                </div>
            `;
            wrapper.appendChild(snsDiv);
        }

        dayDiv.appendChild(wrapper);
    });
    
    container.insertBefore(dayDiv, container.firstChild);
}


function clearLogs() { document.getElementById('log-container').innerHTML = `<div class="text-center text-slate-400 italic py-10">로그가 초기화되었습니다.</div>`; logs = []; }

function toggleExportMenu(event) { event.stopPropagation(); document.getElementById('export-menu').classList.toggle('hidden'); }
function closeMenus(event) { const menu = document.getElementById('export-menu'); if (!menu.classList.contains('hidden')) menu.classList.add('hidden'); }
function toggleAffectionMode() {
    affectionMode = !affectionMode;
    const btn = document.getElementById('btn-affection-mode');
    if (affectionMode) btn.className = "bg-brand-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-brand-700 transition-colors shadow-inner";
    else btn.className = "border border-brand-200 dark:border-brand-800 text-brand-600 dark:text-brand-400 px-3 py-2 rounded-lg text-sm font-medium hover:bg-brand-50 dark:hover:bg-slate-800 transition-colors";
    renderCharacterList();
}
function showAffectionModal(charId) {
    const char = characters.find(c => c.id === charId);
    const content = document.getElementById('modal-content');
    document.getElementById('modal-char-name').textContent = char.name;
    content.innerHTML = '';
    const list = document.createElement('div');
    list.className = "divide-y divide-slate-100 dark:divide-slate-700";
    const rels = Object.entries(char.relationships).map(([id, score]) => ({ id, score, name: characters.find(c=>c.id===id)?.name, specialStatus: char.specialRelations?.[id] })).filter(x => x.name).sort((a,b) => b.score - a.score);
    if (rels.length === 0) content.innerHTML = '<div class="p-8 text-center text-slate-400">아직 관계가 형성되지 않았습니다.</div>';
    else {
        rels.forEach(rel => {
            const row = document.createElement('div');
            row.className = "p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors";
            row.innerHTML = `<div class="flex items-center gap-3"><span class="font-medium dark:text-slate-200">${rel.name}</span><span class="text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-600 text-slate-600 dark:text-slate-300">${getRelationshipLabel(rel.score, rel.specialStatus)}</span></div><div class="flex flex-col items-end"><div class="text-sm gap-1 flex">${getHeartHTML(rel.score, rel.specialStatus)}</div><span class="text-xs text-slate-400 font-mono mt-1">${rel.score}</span></div>`;
            list.appendChild(row);
        });
        content.appendChild(list);
    }
    document.getElementById('affection-modal').classList.remove('hidden');
}
function closeModal() { document.getElementById('affection-modal').classList.add('hidden'); }

function exportData(includeRelationships) {
    if (characters.length === 0) return alert("저장할 데이터가 없습니다.");
    const exportData = characters.map(c => {
        const base = { name: c.name, mbti: c.mbti, room: c.room };
        if (includeRelationships) {
            base.id = c.id; base.relationships = c.relationships; base.specialRelations = c.specialRelations; base.currentLocation = c.currentLocation; base.currentAction = c.currentAction;
        }
        return base;
    });
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ version: 1.5, type: includeRelationships ? 'full' : 'basic', day: includeRelationships ? day : 1, data: exportData }));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `housing_simul_${includeRelationships ? 'full' : 'basic'}_${Date.now()}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

function importData(input) {
    const file = input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const json = JSON.parse(e.target.result);
            if (!json.data || !Array.isArray(json.data)) throw new Error("잘못된 파일 형식");
            if (confirm("현재 명단이 덮어씌워집니다. 진행하시겠습니까?")) {
                day = json.day || 1;
                characters = json.data.map(d => ({
                    id: d.id || Date.now().toString() + Math.random().toString(36).substr(2, 5),
                    name: d.name, mbti: d.mbti, room: d.room,
                    currentLocation: d.currentLocation || 'apt', currentAction: d.currentAction || '-',
                    relationships: d.relationships || {}, specialRelations: d.specialRelations || {}
                }));
                renderCharacterList(); renderLocations(); renderStatusTable(); clearLogs();
                document.getElementById('total-count').textContent = characters.length;
                alert("성공적으로 불러왔습니다.");
            }
        } catch (err) { alert("파일 불러오기 실패: " + err.message); }
    };
    reader.readAsText(file); input.value = '';
}

function resetAll() {
    if(confirm("모든 데이터를 초기화하시겠습니까?")) {
        characters = []; day = 1; logs = [];
        renderCharacterList(); renderLocations(); renderStatusTable(); clearLogs();
        document.getElementById('total-count').textContent = 0;
    }
}

function switchTab(tabId) {
    document.getElementById('roster-view').classList.add('hidden');
    document.getElementById('location-view').classList.add('hidden');
    document.getElementById('execution-view').classList.add('hidden');
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('bg-white', 'dark:bg-slate-600', 'shadow-sm', 'text-brand-600', 'dark:text-brand-300');
        btn.classList.add('text-slate-600', 'dark:text-slate-300');
    });
    document.getElementById(`${tabId}-view`).classList.remove('hidden');
    const btn = document.getElementById(`btn-${tabId}`);
    btn.classList.remove('text-slate-600', 'dark:text-slate-300', 'hover:bg-slate-200');
    btn.classList.add('bg-white', 'dark:bg-slate-600', 'shadow-sm', 'text-brand-600', 'dark:text-brand-300');
    if (tabId === 'execution') renderStatusTable();
    if (tabId === 'location') renderLocations();
}

function updateUI() { renderCharacterList(); renderStatusTable(); }

function toggleTheme() {
    isDarkMode = !isDarkMode;
    if (isDarkMode) { document.documentElement.classList.add('dark'); localStorage.setItem('theme', 'dark'); }
    else { document.documentElement.classList.remove('dark'); localStorage.setItem('theme', 'light'); }
}

function openRelationshipMap() {
    const modal = document.getElementById('relationship-map-modal');
    modal.classList.remove('hidden');
    drawRelationshipMap();
    
    window.addEventListener('resize', drawRelationshipMap);
}

function closeRelationshipMap() {
    const modal = document.getElementById('relationship-map-modal');
    modal.classList.add('hidden');
    window.removeEventListener('resize', drawRelationshipMap);
}

function drawRelationshipMap() {
    const canvas = document.getElementById('relationship-canvas');
    const ctx = canvas.getContext('2d');
    const container = canvas.parentElement;
    
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (characters.length === 0) {
        ctx.font = "14px Noto Sans KR";
        ctx.fillStyle = isDarkMode ? "#94a3b8" : "#64748b";
        ctx.textAlign = "center";
        ctx.fillText("표시할 캐릭터가 없습니다.", canvas.width/2, canvas.height/2);
        return;
    }

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) * 0.8;
    
    const angleStep = (2 * Math.PI) / characters.length;
    const nodes = characters.map((char, index) => {
        const angle = angleStep * index - Math.PI / 2;
        return {
            x: centerX + Math.cos(angle) * radius,
            y: centerY + Math.sin(angle) * radius,
            char: char,
            angle: angle
        };
    });

    ctx.lineWidth = 1;
    
    nodes.forEach(source => {
        nodes.forEach(target => {
            if (source === target) return;
            
            const relScore = source.char.relationships[target.char.id] || 0;
            const special = source.char.specialRelations?.[target.char.id];
            
            if (relScore === 0 && !special) return;

            let color = isDarkMode ? "#475569" : "#cbd5e1";
            if (special === 'lover') color = "#db2777";
            else if (relScore >= 60) color = "#2563eb";
            else if (relScore >= 20) color = "#16a34a";
            else if (relScore <= -60) color = "#dc2626";
            else if (relScore <= -20) color = "#ea580c";
            
            ctx.beginPath();
            ctx.strokeStyle = color;
            ctx.lineWidth = special === 'lover' ? 2 : 1;
            
            const midX = (source.x + target.x) / 2;
            const midY = (source.y + target.y) / 2;
            
            const dx = midX - centerX;
            const dy = midY - centerY;
            
            ctx.moveTo(source.x, source.y);
            ctx.quadraticCurveTo(centerX, centerY, target.x, target.y);
            ctx.stroke();
        });
    });

    nodes.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI);
        ctx.fillStyle = isDarkMode ? "#1e293b" : "#ffffff";
        ctx.fill();
        ctx.strokeStyle = isDarkMode ? "#475569" : "#cbd5e1";
        ctx.lineWidth = 2;
        ctx.stroke();
        
        ctx.font = "bold 12px Noto Sans KR";
        ctx.fillStyle = isDarkMode ? "#e2e8f0" : "#1e293b";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(node.char.name, node.x, node.y);
    });
}


/* ================= 데이터 자동 저장 및 불러오기 ================= */

// 데이터 저장 함수
function saveGameData() {
    const gameData = {
        day: day,
        characters: characters,
        logs: logs.slice(0, 50) // 로그는 너무 많으면 느려지니 최근 50개만 저장
    };
    localStorage.setItem('sg_house_data', JSON.stringify(gameData));
}

// 데이터 불러오기 (페이지 로드 시 자동 실행)
function loadGameData() {
    const savedData = localStorage.getItem('sg_house_data');
    if (savedData) {
        const parsed = JSON.parse(savedData);
        day = parsed.day;
        characters = parsed.characters;
        logs = parsed.logs || [];
        
        // UI 복구
        renderCharacterList();
        renderLocations();
        renderStatusTable();
        // 로그 복구 (역순으로 쌓이므로 뒤집어서 렌더링 필요하나, 간단히 최근 로그만 표시)
        if (logs.length > 0) {
            renderLogs(logs); 
        } else {
            document.getElementById('log-container').innerHTML = `<div class="text-center text-slate-400 italic py-10">저장된 기록을 불러왔습니다.</div>`;
        }
        document.getElementById('total-count').textContent = characters.length;
        console.log("데이터 로드 완료");
    }
}

// 페이지가 켜질 때 저장된 데이터가 있으면 불러오기
window.addEventListener('DOMContentLoaded', () => {
    // 테마 설정
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        isDarkMode = true;
    }
    
    // 기존 window.onload 대신 여기서 데이터 로드 시도
    initMbtiSelect();
    initRoomSelect();
    
    // 저장된 데이터가 있는지 확인
    if (localStorage.getItem('sg_house_data')) {
        loadGameData();
    } else {
        renderCharacterList();
        renderLocations();
    }
});

// 초기화 버튼에 저장 데이터 삭제 기능 추가
function resetAll() {
    if(confirm("정말 초기화하시겠습니까? 저장된 모든 기록이 사라집니다.")) {
        localStorage.removeItem('sg_house_data'); // 저장 데이터 삭제
        location.reload(); // 새로고침
    }
}

// 서열 점수 반환 (높을수록 높음)
function getRank(role) {
    if (role === 'CEO') return 99;
    if (role === 'Director') return 10; // 4-EVER (이사급)
    if (role === 'Leader') return 5;    // 리더
    if (role === 'Artist') return 1;    // 일반 멤버
    return 0; // Guest
}

/* ================= 스탯 관리 시스템 ================= */

function updateStats(char, actionId, isGroupWithKinney) {
    // 1. 기본 변동치 설정
    let hpChange = 0;
    let stressChange = 0;

    // 행동별 로직
    switch(actionId) {
        case 'rest': case 'sleep': // 휴식, 수면
            hpChange = +20; stressChange = -15; break;
        case 'practice': case 'work': case 'schedule': // 일, 연습
            hpChange = -15; stressChange = +15; break;
        case 'recording': case 'music': // 작업 (정신적 스트레스 큼)
            hpChange = -10; stressChange = +20; break;
        case 'workout': // 운동 (체력 감소, 스트레스 해소)
            hpChange = -20; stressChange = -10; break;
        case 'gaming': case 'movie': // 취미
            hpChange = -5; stressChange = -20; break;
        case 'cooking': // 요리 (힘듦, 뿌듯함)
            hpChange = -10; stressChange = -5; break;
        case 'eat': case 'delivery': case 'picnic': // 식사
            hpChange = +10; stressChange = -15; break;
        case 'travel': case 'camping': case 'swim': // 여행
            hpChange = +30; stressChange = -50; break;
        case 'scolded': // 혼남
            hpChange = -5; stressChange = +30; break;
        default: // 그 외 (쇼핑, 수다 등)
            hpChange = -5; stressChange = -5; break;
    }

    // 2. 키니(금현준)의 요리 버프 (키니와 함께 있을 때)
    if (isGroupWithKinney) {
        hpChange += 10; // 더 회복됨
        stressChange -= 20; // 힐링됨
    }

    // 3. 값 적용
    char.hp += hpChange;
    char.stress += stressChange;

    // 4. 한계치 고정 (0~100)
    if (char.hp > 100) char.hp = 100;
    if (char.hp < 0) char.hp = 0;
    if (char.stress > 100) char.stress = 100;
    if (char.stress < 0) char.stress = 0;

    // 5. 위기 상태 이벤트 리턴
    if (char.hp === 0) return 'faint'; // 기절
    if (char.stress === 100) return 'explosion'; // 폭발
    return null;
}

function toggleSeason() {
    const btn = document.getElementById('season-btn');
    if (currentSeason === 'rest') {
        currentSeason = 'comeback';
        btn.textContent = "🔥 컴백 활동기";
        btn.className = "text-xs px-2 py-1 rounded border transition-colors bg-red-100 text-red-700 border-red-200 animate-pulse";
        alert("📢 컴백 활동기가 시작되었습니다! 스케줄이 늘어나고 예민해집니다.");
    } else {
        currentSeason = 'rest';
        btn.textContent = "🌱 휴식기";
        btn.className = "text-xs px-2 py-1 rounded border transition-colors bg-green-100 text-green-700 border-green-200";
        alert("☕ 활동이 종료되고 휴식기에 들어갑니다. 자유시간이 늘어납니다.");
    }
}
