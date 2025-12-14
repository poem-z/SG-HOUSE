/* ================= 1. 설정 및 데이터 ================= */

// 아이돌 스케줄 장소
const PLACES = [
    { id: 'apt', name: '숙소 거실', type: 'home' },
    { id: 'kitchen', name: '숙소 주방', type: 'home' },
    { id: 'room', name: '침대 위', type: 'home' },
    { id: 'practice', name: '연습실', type: 'out' },
    { id: 'studio', name: '작업실', type: 'out' },
    { id: 'broadcast', name: '방송국', type: 'out' },
    { id: 'shop', name: '헤어샵', type: 'out' },
    { id: 'pc_bang', name: 'PC방', type: 'out' },
    { id: 'hangang', name: '한강 공원', type: 'out' },
    { id: 'dept_store', name: '백화점', type: 'out' },
    { id: 'travel', name: '해외 투어', type: 'travel' }
];

// 단어 세트
const WORD_SETS = {
    food: ['마라탕', '평양냉면', '삼겹살', '스테이크', '치킨', '한강 라면', '직접 구운 쿠키', '김치찜', '단백질 쉐이크'],
    game: ['LOL', '오버워치', '배그', '카트라이더', '공포 게임', '리듬 게임'],
    movie: ['천만 관객 영화', '지루한 예술 영화', 'B급 공포 영화', '슬픈 로맨스 영화', '마블 영화'],
    item: ['신상 운동화', '명품 향수', '한정판 피규어', '세일하는 티셔츠', '고양이 간식', '최신형 키보드'],
    hobby: ['레고 조립', '독서', '명상', '홈트레이닝', '유튜브 편집', '작사', '반야심경 외우기'],
    destination: ['도쿄', 'LA', '파리', '방콕', '런던', '뉴욕', '오사카']
};

// 행동 패턴
const ACTIONS = [
    { id: 'rest', name: '휴식', place: 'apt', text: ['소파에 널브러져 있었다', '밀린 잠을 잤다', '고양이랑 놀아주었다', '배달 앱을 구경만 했다'] },
    { id: 'sleep', name: '수면', place: 'room', text: ['이불 밖은 위험하다며 나오지 않았다', '밀린 잠을 12시간 잤다', '꿈속에서 콘서트를 했다'] },
    { id: 'cooking', name: '요리', place: 'kitchen', text: ['{food}을(를) 직접 요리했다', '냉장고를 털어 야식을 만들었다', '설거지 내기를 했다', '쿠키를 태워먹었다'] },
    { id: 'practice', name: '연습', place: 'practice', text: ['칼군무를 맞췄다', '거울을 보며 표정 연기를 했다', '새로운 안무를 짰다', '땀을 뻘뻘 흘리며 춤췄다'] },
    { id: 'music', name: '작업', place: 'studio', text: ['가사를 썼다', '디렉팅을 받았다', '고음을 질렀다', '비트를 찍었다'] },
    { id: 'makeup', name: '꽃단장', place: 'shop', text: ['헤어 컬러를 바꿨다', '메이크업을 받으며 졸았다', '부기를 뺐다'] },
    { id: 'schedule', name: '스케줄', place: 'broadcast', text: ['엔딩 요정 포즈를 연습했다', '선배님께 CD를 돌렸다', '대기실 도시락을 먹었다'] },
    { id: 'gaming', name: '게임', place: 'pc_bang', text: ['{game} 랭크 게임을 돌렸다', '키보드를 샷건 쳤다', '{game} 버스를 탔다'] },
    { id: 'drive', name: '드라이브', place: 'hangang', text: ['오픈카를 타고 드라이브를 했다', '자전거를 탔다', '차 안에서 노래를 크게 불렀다'] },
    { id: 'shop', name: '쇼핑', place: 'dept_store', text: ['{item}을(를) 플렉스(FLEX) 했다', '아이쇼핑만 하고 왔다', '엄마 선물을 샀다'] },
    { id: 'tour', name: '투어', place: 'travel', text: ['{destination} 팬들을 만났다', '{destination} 맛집을 갔다', '호텔에서 룸서비스를 시켰다'] }
];

// 이벤트 (일반)
const EVENTS = [
    { type: 'friend', name: '수다', change: 5, text: '와(과) 밤새도록 시간 가는 줄 모르고 수다를 떨었다' },
    { type: 'praise', name: '칭찬', change: 10, text: '의 바뀐 헤어스타일과 코디를 칭찬해주었다' },
    { type: 'gift', name: '선물', change: 10, text: '에게 "오다가 주웠다"며 작은 선물을 줬다' },
    { type: 'treat', name: '한턱', change: 15, text: '에게 맛있는 밥을 사주며 "형(언니)이 쏜다!"라고 했다' },
    { type: 'reconcile', name: '화해', change: 20, text: '와(과) 술 한 잔 하며 묵은 감정을 털어내고 화해했다' },
    { type: 'fight', name: '싸움', change: -15, text: '와(과) 사소한 말실수 때문에 크게 다퉜다' },
    { type: 'nag', name: '잔소리', change: -5, text: '에게 "양말 좀 뒤집어 놓지 마!"라고 잔소리를 퍼부었다' },
    { type: 'steal_food', name: '서리', change: -10, text: '이(가) 아껴둔 간식을 몰래 훔쳐 먹다가 걸렸다' },
    { type: 'flirt', name: '플러팅', change: 10, text: '에게 은근슬쩍 윙크를 하며 장난을 쳤다' },
    { type: 'skinship', name: '스킨십', change: 15, text: '의 어깨에 자연스럽게 기대어 잠들었다' },
    { type: 'bow', name: '인사', change: 5, text: '에게 90도로 깍듯하게 폴더 인사를 했다' },
    { type: 'scold', name: '훈계', change: -5, text: '를 불러 "라떼는 말이야"라며 1시간 동안 설교했다' }
];

// 비밀 이벤트
const SECRET_EVENTS = [
    { type: 'escape', text: '와(과) 매니저 몰래 새벽 탈주를 감행했다', target: 'soulmate' },
    { type: 'secret_date', text: '와(과) 비상구 계단에서 몰래 만나 속삭였다', target: 'soulmate' },
    { type: 'night_snack', text: '와(과) 모두가 잠든 사이 라면을 끓여 먹었다', target: 'all' },
    { type: 'gossip', text: '와(과) 이불 속에 숨어 회사 뒷담화를 했다', target: 'all' },
    { type: 'game_night', text: '와(과) 방문을 잠그고 밤샘 게임을 했다', target: 'all' }
];

// SNS 반응
const FAN_REACTIONS = {
    lover: ['ㄴ미친 쟤네 진짜 사귀나봐;;', '목격담 떴다.. 이 주식 떡상각', '눈빛 뭐야? 멜로 영화 찍네'],
    flirt: ['ㄴ와.. 방금 플러팅 미쳤다', '유죄 인간이다 진짜..', '심장 터질 뻔;;'],
    fight: ['ㄴ헐 분위기 살벌해.. 싸웠나?', '비즈니스 관계였네 ㅋㅋ', '기싸움 오진다;;'],
    nag: ['ㄴ잔소리 킹받네 ㅋㅋㅋ', '엄마냐고 ㅋㅋㅋㅋ', '표정 봐 진짜 싫은가봐'],
    food: ['ㄴ맛있겠다.. 한 입만', '키니가 또 요리했네 ㅋㅋㅋ', '저거 어디 맛집임? 정보 좀'],
    game: ['ㄴ겜돌이들 또 PC방 갔네', '샷건 치는 거 상상됨 ㅋㅋㅋ', '버스 태워달라고 하고 싶다'],
    visual: ['ㄴ와 얼굴이 복지다..', '비주얼 합 미쳤음 ㅠㅠ', '오늘 착장 박제 시급', '나라 구한 얼굴이다'],
    work: ['ㄴ연습 벌레들 ㅠㅠ', '컴백 스포 아님?', '갓생 산다 진짜']
};

const SECRET_REACTIONS = ['ㄴ...방금 뭐 지나갔냐?', 'ㄴ저 둘 수상한데 나만 느꼈음?', 'ㄴ(관리자 요청에 의해 삭제된 댓글입니다)', 'ㄴ쉿 지켜주자...'];

// 스타게이즈 멤버 데이터
const STARGAZE_MEMBERS = [
    { name: "부여 윤", mbti: "INTJ", room: "501", role: "Director" },
    { name: "백제헌", mbti: "ISTP", room: "501", role: "Director" },
    { name: "김재원", mbti: "INFJ", room: "401", role: "Leader" },
    { name: "백시안", mbti: "ENTJ", room: "401", role: "Artist" },
    { name: "한주원", mbti: "INFP", room: "401", role: "Artist" },
    { name: "차민규", mbti: "ESTP", room: "402", role: "Artist" },
    { name: "천재림", mbti: "INFJ", room: "301", role: "Leader" },
    { name: "금현준(키니)", mbti: "ENFP", room: "301", role: "Artist" },
    { name: "신예준", mbti: "INTP", room: "301", role: "Artist" },
    { name: "견기매", mbti: "ESFP", room: "302", role: "Artist" },
    { name: "오태영", mbti: "ESTJ", room: "302", role: "Artist" },
    { name: "빙하수", mbti: "ISTJ", room: "302", role: "Artist" },
    { name: "현갑수", mbti: "ESFP", room: "101", role: "CEO" },
    { name: "유채민(JAM-IN)", mbti: "ENTP", room: "201", role: "Guest" }
];

const SOULMATES = [["부여 윤", "백제헌"], ["백시안", "천재림"]];

/* ================= 2. 전역 변수 ================= */
let characters = [];
let day = 1;
let logs = [];
let affectionMode = false;
let isDarkMode = false;
let currentSeason = 'rest';
let isProcessing = false; // [중요] 버튼 중복 클릭 방지

// MBTI 궁합표
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

/* ================= 3. 초기화 및 유틸리티 ================= */

window.addEventListener('DOMContentLoaded', () => {
    // 테마 복구
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        isDarkMode = true;
    }
    
    // Select 박스 초기화 (추가 기능용)
    initMbtiSelect();
    initRoomSelect();
    
    // 데이터 불러오기 (없으면 새로 시작)
    loadGameData();
});

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

/* ================= 4. 핵심 로직: 다음날 진행 ================= */

/* ================= [수정됨] 안전장치가 추가된 nextDay 함수 ================= */
function nextDay() {
    // 1. 캐릭터 확인
    if (!characters || characters.length === 0) {
        alert("캐릭터가 없습니다. [멤버 소환] 버튼을 먼저 눌러주세요!");
        return;
    }

    // 2. 중복 클릭 방지 (이미 진행 중이면 무시)
    if (isProcessing) {
        console.log("🚫 아직 처리 중입니다. 잠시만 기다려주세요.");
        return; 
    }
    
    // 3. 진행 상태 잠금
    isProcessing = true;
    const nextBtn = document.querySelector('button[onclick="nextDay()"]') || document.getElementById('btn-execution');
    const originalBtnText = nextBtn ? nextBtn.innerHTML : '다음날 진행';
    
    if (nextBtn) {
        nextBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> 계산 중...';
        nextBtn.classList.add('opacity-50', 'cursor-not-allowed'); // 버튼 흐리게
    }

    // 4. 로직 실행 (안전하게 try-catch 사용)
    // 약간의 딜레이(10ms)를 주어 버튼 UI가 바뀌는 시간을 확보합니다.
    setTimeout(() => {
        try {
            console.log(`=== Day ${day + 1} 시작 ===`);
            
            day++;
            const dailyLogs = [];
            characters.forEach(c => c.interactionGroup = null);

            const isComeback = currentSeason === 'comeback';

            // [1] 외출 및 장소 결정
            characters.forEach(char => {
                // 데이터 안전장치
                if (typeof char.hp === 'undefined') char.hp = 100;
                if (typeof char.stress === 'undefined') char.stress = 0;
                if (!char.role) char.role = 'Artist';

                if (char.hp < 10) {
                    char.currentLocation = 'room'; // 강제 휴식
                    return;
                }

                let goOutChance = isComeback ? 0.9 : 0.4;
                if (char.mbti && char.mbti[0] === 'I') goOutChance -= 0.1;

                if (Math.random() < goOutChance) {
                    let targetPlaces = [];
                    if (isComeback) {
                        targetPlaces = PLACES.filter(p => ['practice', 'studio', 'broadcast', 'shop', 'gym'].includes(p.id));
                    } else {
                        targetPlaces = PLACES.filter(p => ['pc_bang', 'hangang', 'cinema', 'dept_store', 'travel', 'camping'].includes(p.id));
                    }
                    if (targetPlaces.length === 0) targetPlaces = PLACES.filter(p => p.type === 'out');
                    
                    char.currentLocation = getRandom(targetPlaces).id;
                } else {
                    char.currentLocation = getRandom(['apt', 'kitchen', 'room']);
                }
            });

            // [2] 장소별 그룹핑
            const locationMap = {};
            characters.forEach(char => {
                if (!locationMap[char.currentLocation]) locationMap[char.currentLocation] = [];
                locationMap[char.currentLocation].push(char);
            });

            // [3] 상호작용
            for (const locId in locationMap) {
                const people = locationMap[locId];
                // 랜덤 섞기
                for (let i = people.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [people[i], people[j]] = [people[j], people[i]];
                }

                while (people.length > 0) {
                    let groupSize = 1;
                    if (people.length >= 2) groupSize = 2;
                    
                    const group = [];
                    for(let i=0; i<groupSize; i++) { if(people.length > 0) group.push(people.pop()); }
                    const hasKinney = group.some(c => c.name.includes("키니"));

                    // --- 솔로 행동 ---
                    if (group.length === 1) {
                        const actor = group[0];
                        let actionPool = ACTIONS.filter(a => a.place === locId);
                        if (actionPool.length === 0) actionPool = ACTIONS.filter(a => a.id === 'rest');
                        
                        const action = getRandom(actionPool);
                        const processedText = fillTemplate(getRandom(action.text));
                        actor.currentAction = action.name;
                        
                        // 스탯 업데이트
                        const statusResult = updateStats(actor, action.id, false);
                        if(isComeback) actor.stress += 5;

                        // 반응 타입 설정
                        let reactType = 'visual';
                        if (action.id === 'cooking') reactType = 'food';
                        if (action.id === 'gaming') reactType = 'game';
                        if (action.id === 'work' || action.id === 'music') reactType = 'work';

                        dailyLogs.push({ 
                            text: `${actor.name}${getJosa(actor.name, '은/는')} ${getLocationName(locId)}에서 ${processedText}.`, 
                            type: 'solo', 
                            reaction: getFanReaction(reactType, actor.name) 
                        });

                        if (statusResult === 'faint') dailyLogs.push({ text: `🚨 [응급] ${actor.name}${getJosa(actor.name, '이/가')} 과로로 쓰러져 링거를 맞았다!`, type: 'event' });
                        if (statusResult === 'explosion') dailyLogs.push({ text: `🔥 [폭발] ${actor.name}${getJosa(actor.name, '이/가')} 스트레스를 못 이기고 숙소를 뛰쳐나갔다!`, type: 'event' });
                    } 
                    // --- 2인 행동 ---
                    else if (group.length === 2) {
                        const actor = group[0];
                        const target = group[1];
                        const isSoulmate = actor.isSoulmateWith === target.id;
                        const rank1 = getRank(actor.role);
                        const rank2 = getRank(target.role);

                        // 1) 서열 (20%)
                        if (Math.random() < 0.2 && rank1 !== rank2) {
                            if (rank1 > rank2) {
                                if (actor.role === 'CEO') {
                                    dailyLogs.push({ text: `[면담] ${actor.name}${getJosa(actor.name, '은/는')} ${target.name}에게 "요즘 활동은 할 만하냐?"며 격려했다.`, type: 'event' });
                                    updateRelationship(actor.id, target.id, 5);
                                } else {
                                    if (Math.random() > 0.3) {
                                        dailyLogs.push({ text: `[내리사랑] ${actor.name}${getJosa(actor.name, '은/는')} ${target.name}에게 법카로 밥을 사줬다.`, type: 'event', reaction: getFanReaction('visual') });
                                        updateRelationship(target.id, actor.id, 15);
                                    } else {
                                        dailyLogs.push({ text: `[훈계] ${actor.name}${getJosa(actor.name, '은/는')} ${target.name}를 불러 "라떼는 말이야"를 시전했다.`, type: 'event', reaction: getFanReaction('nag') });
                                        updateRelationship(target.id, actor.id, -5);
                                    }
                                }
                                actor.currentAction = "선배 노릇"; target.currentAction = "사회생활";
                            } else {
                                dailyLogs.push({ text: `[인사] ${actor.name}${getJosa(actor.name, '은/는')} ${target.name}을(를) 보자마자 90도로 인사했다.`, type: 'social' });
                                updateRelationship(target.id, actor.id, 5);
                                actor.currentAction = "폴더 인사"; target.currentAction = "받아줌";
                            }
                        }
                        // 2) 비밀 (10%)
                        else if (Math.random() < 0.1) {
                            let secretPool = SECRET_EVENTS.filter(e => e.target === 'all');
                            if (isSoulmate) secretPool = [...secretPool, ...SECRET_EVENTS.filter(e => e.target === 'soulmate')];
                            const secret = getRandom(secretPool);
                            
                            updateRelationship(actor.id, target.id, 10);
                            updateRelationship(target.id, actor.id, 10);
                            actor.stress -= 10; target.stress -= 10;

                            dailyLogs.push({ 
                                text: `🤫 [비밀] ${actor.name}${getJosa(actor.name, '와/과')} ${target.name}${getJosa(target.name, '은/는')} ${secret.text}.`, 
                                type: 'secret', 
                                reaction: `<span class="text-purple-400 font-bold text-xs ml-2">👁️ 목격담</span> <span class="text-slate-500 text-xs">${getRandom(SECRET_REACTIONS)}</span>` 
                            });
                            actor.currentAction = "비밀 행동"; target.currentAction = "비밀 행동";
                        }
                        // 3) 일반 이벤트 (30%)
                        else if (Math.random() < 0.3) {
                            const evt = getRandom(EVENTS);
                            if ((evt.type === 'fight' || evt.type === 'cut') && isSoulmate) {
                                dailyLogs.push({ text: `[투정] ${actor.name}${getJosa(actor.name, '은/는')} ${target.name}에게 투정을 부렸지만, 금방 풀렸다.`, type: 'event', reaction: getFanReaction('visual') });
                            } else {
                                updateRelationship(actor.id, target.id, evt.change);
                                updateRelationship(target.id, actor.id, evt.change);
                                
                                let reactType = 'visual';
                                if (evt.type === 'fight') reactType = 'fight';
                                if (evt.type === 'flirt') reactType = 'flirt';
                                
                                dailyLogs.push({ text: `[${evt.name}] ${actor.name}${getJosa(actor.name, '은/는')} ${target.name}${evt.text}.`, type: 'event', reaction: getFanReaction(reactType) });
                            }
                            actor.currentAction = evt.name; target.currentAction = evt.name;
                        } 
                        // 4) 일상 (나머지)
                        else {
                            let actionPool = ACTIONS.filter(a => a.place === locId);
                            if (actionPool.length === 0) actionPool = ACTIONS.filter(a => a.id === 'rest');
                            const action = getRandom(actionPool);
                            const processedText = fillTemplate(getRandom(action.text));
                            const chem = calculateChemistry(actor.mbti, target.mbti);
                            
                            updateRelationship(actor.id, target.id, getProbabilisticChange(chem));
                            updateRelationship(target.id, actor.id, getProbabilisticChange(chem));

                            actor.currentAction = "함께 " + action.name;
                            target.currentAction = "함께 " + action.name;

                            dailyLogs.push({ text: `${actor.name}${getJosa(actor.name, '와/과')} ${target.name}${getJosa(target.name, '은/는')} ${getLocationName(locId)}에서 함께 ${processedText}.`, type: 'social', reaction: getFanReaction('visual') });
                        }
                        updateStats(actor, 'rest', hasKinney); updateStats(target, 'rest', hasKinney);
                    }
                }
            }

            // [4] 결과 저장 및 렌더링
            logs = [...dailyLogs, ...logs];
            renderLogs(dailyLogs);
            renderStatusTable();
            renderLocations();
            updateUI();
            saveGameData();
            
            console.log("✅ 완료");

        } catch (error) {
            console.error("❌ 시뮬레이션 중 오류 발생:", error);
            alert("오류가 발생했습니다! (F12 콘솔 확인 필요)\n" + error.message);
        } finally {
            // [중요] 에러가 나든 성공하든 버튼 잠금 해제
            isProcessing = false;
            if (nextBtn) {
                nextBtn.innerHTML = originalBtnText;
                nextBtn.classList.remove('opacity-50', 'cursor-not-allowed');
            }
        }
    }, 10); // UI 렌더링을 위해 아주 짧은 지연
}

        // 로그 및 데이터 저장
        logs = [...dailyLogs, ...logs];
        renderLogs(dailyLogs);
        renderStatusTable();
        renderLocations();
        updateUI();
        saveGameData();

        // 처리 완료 후 버튼 복구
        isProcessing = false;
        if (nextBtn) nextBtn.innerHTML = '다음날 진행 <i class="fa-solid fa-arrow-right ml-2"></i>';

    }, 50); // 50ms 지연으로 UI 렌더링 확보
}

/* ================= 5. UI 렌더링 및 유틸리티 ================= */

function updateStats(char, actionId, isGroupWithKinney) {
    let hpChange = 0, stressChange = 0;
    switch(actionId) {
        case 'rest': case 'sleep': hpChange = +20; stressChange = -15; break;
        case 'practice': case 'work': case 'schedule': hpChange = -15; stressChange = +15; break;
        case 'recording': case 'music': hpChange = -10; stressChange = +20; break;
        case 'workout': hpChange = -20; stressChange = -10; break;
        case 'gaming': case 'movie': hpChange = -5; stressChange = -20; break;
        case 'cooking': hpChange = -10; stressChange = -5; break;
        case 'eat': case 'delivery': case 'picnic': hpChange = +10; stressChange = -15; break;
        case 'travel': case 'camping': case 'swim': hpChange = +30; stressChange = -50; break;
        case 'scolded': hpChange = -5; stressChange = +30; break;
        default: hpChange = -5; stressChange = -5; break;
    }
    if (isGroupWithKinney) { hpChange += 10; stressChange -= 20; }
    char.hp = Math.min(100, Math.max(0, char.hp + hpChange));
    char.stress = Math.min(100, Math.max(0, char.stress + stressChange));
    if (char.hp === 0) return 'faint';
    if (char.stress === 100) return 'explosion';
    return null;
}

function getRank(role) {
    if (role === 'CEO') return 99;
    if (role === 'Director') return 10;
    if (role === 'Leader') return 5;
    if (role === 'Artist') return 1;
    return 0;
}

function getRoleBadge(role) {
    switch(role) {
        case 'CEO': return '<span class="text-[10px] bg-red-100 text-red-700 border border-red-200 px-1.5 py-0.5 rounded font-bold">대표</span>';
        case 'Director': return '<span class="text-[10px] bg-purple-100 text-purple-700 border border-purple-200 px-1.5 py-0.5 rounded font-bold">이사</span>';
        case 'Leader': return '<span class="text-[10px] bg-blue-100 text-blue-700 border border-blue-200 px-1.5 py-0.5 rounded font-bold">리더</span>';
        case 'Guest': return '<span class="text-[10px] bg-green-100 text-green-700 border border-green-200 px-1.5 py-0.5 rounded font-bold">손님</span>';
        default: return '';
    }
}

function getFanReaction(type, names) {
    if (!FAN_REACTIONS[type]) return null;
    if (Math.random() < 0.5) {
        const msg = FAN_REACTIONS[type][Math.floor(Math.random() * FAN_REACTIONS[type].length)];
        return `<span class="text-blue-400 dark:text-blue-300 font-bold text-xs ml-2">@IDOL_Lover</span> <span class="text-slate-500 dark:text-slate-400 text-xs">${msg}</span>`;
    }
    return null;
}

function highlightKeywords(text) {
    let highlighted = text;
    characters.forEach(char => {
        const regex = new RegExp(`(${char.name})`, 'g');
        highlighted = highlighted.replace(regex, `<span class="font-bold text-slate-900 dark:text-white">$1</span>`);
    });
    PLACES.forEach(place => {
        const regex = new RegExp(`(${place.name})`, 'g');
        highlighted = highlighted.replace(regex, `<span class="font-semibold text-brand-600 dark:text-brand-400">$1</span>`);
    });
    return highlighted;
}

function renderLogs(newLogs) {
    const container = document.getElementById('log-container');
    if (container.querySelector('.italic')) container.innerHTML = '';
    
    // 로그 DOM 개수 제한 (100개 까지만 유지)
    while (container.children.length > 100) {
        container.removeChild(container.lastChild);
    }

    const dayDiv = document.createElement('div');
    dayDiv.className = "mb-8 animate-fade-in-up";
    dayDiv.innerHTML = `<div class="flex items-center justify-center mb-4"><div class="bg-brand-100 dark:bg-brand-900/50 text-brand-700 dark:text-brand-300 px-4 py-1 rounded-full text-xs font-bold tracking-wider shadow-sm border border-brand-200 dark:border-brand-700">DAY ${day}</div></div>`;
    
    newLogs.forEach(log => {
        const wrapper = document.createElement('div');
        wrapper.className = "mb-3 group relative pl-4"; 
        const line = document.createElement('div');
        let bgColor = "bg-white dark:bg-slate-800", borderColor = "border-slate-200 dark:border-slate-700", textColor = "text-slate-600 dark:text-slate-300", icon = "";

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
        } else {
            line.className = "absolute left-0 top-1 bottom-1 w-1 bg-slate-300 dark:bg-slate-600 rounded-full";
        }

        const p = document.createElement('div');
        p.className = `p-3 rounded-lg border ${borderColor} ${bgColor} shadow-sm text-sm leading-relaxed ${textColor}`;
        p.innerHTML = icon + highlightKeywords(log.text);
        
        wrapper.appendChild(line);
        wrapper.appendChild(p);

        if (log.reaction) {
            const snsDiv = document.createElement('div');
            snsDiv.className = "mt-2 ml-4 flex items-start gap-2 animate-pulse";
            snsDiv.innerHTML = `<div class="w-6 h-6 rounded-full bg-blue-400 flex items-center justify-center text-white text-[10px] flex-none mt-0.5"><i class="fa-brands fa-twitter"></i></div><div class="bg-slate-100 dark:bg-slate-700/80 px-3 py-2 rounded-r-xl rounded-bl-xl text-xs text-slate-600 dark:text-slate-300 shadow-sm border border-slate-200 dark:border-slate-600">${log.reaction.replace('ㄴ', '')}</div>`;
            wrapper.appendChild(snsDiv);
        }
        dayDiv.appendChild(wrapper);
    });
    container.insertBefore(dayDiv, container.firstChild);
}

function updateRelationship(charId1, charId2, amount) {
    const char1 = characters.find(c => c.id === charId1);
    if (!char1.relationships[charId2]) char1.relationships[charId2] = 0;
    if (char1.isSoulmateWith === charId2) {
        if (amount > 0) amount = amount * 2;
        else amount = 2;
    }
    char1.relationships[charId2] += amount;
    if (char1.relationships[charId2] > 100) char1.relationships[charId2] = 100;
    if (char1.relationships[charId2] < -100) char1.relationships[charId2] = -100;
}

function getRelationshipLabel(score, specialStatus) {
    if (specialStatus === 'soulmate') return "♾️ 운명";
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

// 저장 기능 (핵심)
function saveGameData() {
    const gameData = {
        day: day,
        characters: characters,
        // 로그 전체를 저장하면 터지므로 최근 50개만 저장
        logs: logs.slice(0, 50) 
    };
    localStorage.setItem('sg_house_data', JSON.stringify(gameData));
}

function loadGameData() {
    const savedData = localStorage.getItem('sg_house_data');
    if (savedData) {
        try {
            const parsed = JSON.parse(savedData);
            day = parsed.day;
            characters = parsed.characters;
            logs = parsed.logs || [];
            
            // 데이터 무결성 검사 (함수 복구 등은 불가능하므로 값만 복구)
            characters.forEach(c => {
                if(typeof c.hp === 'undefined') c.hp = 100;
                if(typeof c.stress === 'undefined') c.stress = 0;
            });

            renderCharacterList();
            renderLocations();
            renderStatusTable();
            if (logs.length > 0) renderLogs(logs);
            else document.getElementById('log-container').innerHTML = `<div class="text-center text-slate-400 italic py-10">저장된 기록을 불러왔습니다.</div>`;
            document.getElementById('total-count').textContent = characters.length;
        } catch(e) {
            console.error("데이터 로드 실패", e);
            localStorage.removeItem('sg_house_data'); // 깨진 데이터 삭제
        }
    } else {
        // 데이터가 없으면 환영 메시지
        document.getElementById('log-container').innerHTML = `<div class="text-center text-slate-400 italic py-10">멤버를 소환하여 시뮬레이션을 시작하세요.</div>`;
    }
}

// 기타 필수 함수들 (기존 유지)
function getLocationName(id) { const p = PLACES.find(x => x.id === id); return p ? p.name : id; }
function findEmptyRoom() {
    const counts = {};
    for (let f=1; f<=5; f++) for (let r=1; r<=6; r++) counts[`${f}0${r}`] = 0;
    characters.forEach(c => { if (counts[c.room] !== undefined) counts[c.room]++; });
    const sorted = Object.keys(counts).sort((a,b) => counts[a] - counts[b]);
    return counts[sorted[0]] >= 4 ? null : sorted[0];
}
function getRoomCount(roomNum) { return characters.filter(c => c.room === roomNum).length; }
function initMbtiSelect() { const sel = document.getElementById('input-mbti'); MBTI_TYPES.forEach(t => { const opt = document.createElement('option'); opt.value = t; opt.text = t; sel.appendChild(opt); }); }
function initRoomSelect() { const sel = document.getElementById('input-room'); for (let f=1; f<=5; f++) for (let r=1; r<=6; r++) { const opt = document.createElement('option'); opt.value = `${f}0${r}`; opt.text = `${f}0${r}호`; sel.appendChild(opt); } }
function addCharacter() {
    if (characters.length >= 30) return alert("최대 30명까지만 가능합니다.");
    const name = document.getElementById('input-name').value.trim();
    if (!name) return alert("이름을 입력해주세요.");
    let room = document.getElementById('input-room').value;
    if (room === 'auto') room = findEmptyRoom();
    characters.push({ id: Date.now().toString(), name: name, mbti: document.getElementById('input-mbti').value, room: room, role: 'Artist', hp: 100, stress: 0, relationships: {}, specialRelations: {}, currentLocation: 'apt' });
    renderCharacterList(); renderLocations(); renderStatusTable(); saveGameData();
}
function removeCharacter(id) {
    if (!confirm("삭제하시겠습니까?")) return;
    characters = characters.filter(c => c.id !== id);
    renderCharacterList(); renderLocations(); renderStatusTable(); saveGameData();
}
function loadStargazeCharacters() {
    if(!confirm("현재 명단을 지우고 '스타게이즈' 멤버들을 소환하시겠습니까?")) return;
    characters = [];
    STARGAZE_MEMBERS.forEach(member => {
        characters.push({
            id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
            name: member.name, mbti: member.mbti, room: member.room, role: member.role,
            hp: 100, stress: 0, currentLocation: 'apt', currentAction: '-', relationships: {}, specialRelations: {}, isSoulmateWith: null
        });
    });
    SOULMATES.forEach(pair => {
        const c1 = characters.find(c => c.name === pair[0]);
        const c2 = characters.find(c => c.name === pair[1]);
        if(c1 && c2) { c1.isSoulmateWith = c2.id; c2.isSoulmateWith = c1.id; c1.relationships[c2.id]=100; c2.relationships[c1.id]=100; c1.specialRelations[c2.id]='soulmate'; c2.specialRelations[c1.id]='soulmate'; }
    });
    renderCharacterList(); renderLocations(); renderStatusTable(); clearLogs(); saveGameData();
    document.getElementById('log-container').innerHTML = `<div class="mb-6"><div class="text-center text-brand-600 font-bold p-4 bg-brand-50 rounded-lg">✨ SG HOUSE 입주 완료 ✨</div></div>`;
}
function resetAll() { if(confirm("초기화하시겠습니까?")) { localStorage.removeItem('sg_house_data'); location.reload(); } }
function clearLogs() { document.getElementById('log-container').innerHTML = ''; logs = []; saveGameData(); }
function toggleTheme() { isDarkMode = !isDarkMode; document.documentElement.classList.toggle('dark'); localStorage.setItem('theme', isDarkMode ? 'dark' : 'light'); }
function switchTab(tabId) {
    ['roster', 'location', 'execution'].forEach(id => document.getElementById(`${id}-view`).classList.add('hidden'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.className = "tab-btn px-4 py-1.5 rounded-md text-sm font-medium transition-all text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600");
    document.getElementById(`${tabId}-view`).classList.remove('hidden');
    document.getElementById(`btn-${tabId}`).className = "tab-btn px-4 py-1.5 rounded-md text-sm font-medium transition-all bg-white dark:bg-slate-600 shadow-sm text-brand-600 dark:text-brand-300";
    if (tabId === 'execution') renderStatusTable();
    if (tabId === 'location') renderLocations();
}
function toggleSeason() {
    const btn = document.getElementById('season-btn');
    currentSeason = currentSeason === 'rest' ? 'comeback' : 'rest';
    if(currentSeason === 'comeback') { btn.textContent = "🔥 컴백 활동기"; btn.className = "text-xs px-2 py-1 rounded border transition-colors bg-red-100 text-red-700 border-red-200 animate-pulse"; alert("활동기 시작! 예민하고 바빠집니다."); }
    else { btn.textContent = "🌱 휴식기"; btn.className = "text-xs px-2 py-1 rounded border transition-colors bg-green-100 text-green-700 border-green-200"; alert("휴식기 시작! 놀러 다닙니다."); }
}
function renderCharacterList() {
    const container = document.getElementById('character-list');
    container.innerHTML = '';
    if (characters.length === 0) { container.classList.add('hidden'); document.getElementById('empty-state').classList.remove('hidden'); return; }
    container.classList.remove('hidden'); document.getElementById('empty-state').classList.add('hidden');
    characters.forEach(char => {
        const div = document.createElement('div');
        div.className = "relative bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-lg border border-slate-100 dark:border-slate-700 hover:-translate-y-1 transition-transform duration-300 group overflow-hidden";
        div.innerHTML = `<div class="absolute -top-6 -right-6 w-24 h-24 bg-brand-100 dark:bg-brand-900/30 rounded-full blur-xl opacity-50 pointer-events-none"></div>`;
        const badgeStyle = char.role === 'CEO' ? "bg-red-50 text-red-600 border-red-100" : (char.role === 'Director' ? "bg-purple-50 text-purple-600 border-purple-100" : (char.role === 'Leader' ? "bg-blue-50 text-blue-600 border-blue-100" : "bg-brand-50 text-brand-600 border-brand-100"));
        const content = document.createElement('div');
        content.className = "relative z-10";
        if (affectionMode) {
            div.onclick = () => showAffectionModal(char.id);
            div.className += " cursor-pointer ring-2 ring-transparent hover:ring-brand-400";
            content.innerHTML = `<div class="flex justify-between items-center mb-3"><span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${badgeStyle}">${char.role||'Artist'}</span><span class="text-xs text-slate-400">${char.mbti}</span></div><div class="text-center py-2"><h3 class="font-bold text-lg text-slate-800 dark:text-white mb-1">${char.name}</h3><div class="text-xs text-slate-500 flex justify-center items-center gap-1"><i class="fa-solid fa-heart text-brand-400 heart-pulse"></i> 관계 보기</div></div>`;
        } else {
            content.innerHTML = `<button onclick="removeCharacter('${char.id}')" class="absolute -top-1 -right-1 text-slate-300 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100"><i class="fa-solid fa-circle-minus"></i></button><div class="flex items-center gap-4"><div class="w-12 h-12 rounded-full bg-gradient-to-br from-brand-100 to-white border-2 border-white shadow-sm flex items-center justify-center text-xl text-brand-400"><i class="fa-solid fa-user"></i></div><div><div class="flex items-center gap-2 mb-0.5"><h3 class="font-bold text-slate-900 dark:text-white">${char.name}</h3><span class="text-[10px] font-bold px-1.5 py-0.5 rounded ${badgeStyle}">${char.role||'Artist'}</span></div><div class="text-xs text-slate-500 flex items-center gap-2"><span>${char.room}호</span><span class="w-0.5 h-2 bg-slate-300 rounded-full"></span><span>${char.mbti}</span></div></div></div>`;
        }
        div.appendChild(content); container.appendChild(div);
    });
    document.getElementById('total-count').textContent = characters.length;
}
function renderStatusTable() {
    const tbody = document.getElementById('status-table-body');
    tbody.innerHTML = '';
    characters.forEach(char => {
        if (typeof char.hp === 'undefined') char.hp = 100;
        if (typeof char.stress === 'undefined') char.stress = 0;
        const hpColor = char.hp < 30 ? "bg-red-500" : (char.hp < 70 ? "bg-yellow-500" : "bg-green-500");
        const stressColor = char.stress > 80 ? "bg-red-600" : (char.stress > 50 ? "bg-orange-400" : "bg-blue-400");
        const tr = document.createElement('tr');
        tr.innerHTML = `<td class="px-4 py-3"><div class="font-medium text-slate-900 dark:text-white flex items-center">${char.name} ${getRoleBadge(char.role)}</div></td><td class="px-4 py-3"><div class="text-xs text-slate-500 mb-1">체력 ${Math.round(char.hp)}%</div><div class="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-1.5 mb-2"><div class="${hpColor} h-1.5 rounded-full transition-all" style="width:${char.hp}%"></div></div><div class="text-xs text-slate-500 mb-1">스트레스 ${Math.round(char.stress)}%</div><div class="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-1.5"><div class="${stressColor} h-1.5 rounded-full transition-all" style="width:${char.stress}%"></div></div></td><td class="px-4 py-3 text-sm text-slate-600 dark:text-slate-300"><span class="font-bold text-xs bg-slate-100 dark:bg-slate-600 px-2 py-1 rounded mr-1">${getLocationName(char.currentLocation)}</span>${char.currentAction||'-'}</td>`;
        tbody.appendChild(tr);
    });
    document.getElementById('day-badge').textContent = `${day}일차`;
}
// 나머지 필요한 함수들 (renderLocations, openRelationshipMap 등)은 기존 코드에 있는 것을 그대로 사용하거나, 필요시 여기에 포함시켜야 함. 
// (이전 답변의 시각화 함수들은 그대로 둡니다.)
