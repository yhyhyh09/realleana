import { useState, useEffect, useRef } from "react";

const IMG = {
  kael:          "https://i.imgur.com/6t0PSbP.jpeg",
  lucian:        "https://i.imgur.com/N5EnYpN.jpeg",
  arien:         "https://i.imgur.com/pWooogc.jpeg",
  dorian:        "https://i.imgur.com/XmvUdKP.jpeg",
  leana:         "https://i.imgur.com/1zHkFot.jpeg",
  leanaResolve:  "https://i.imgur.com/H24Zk0L.jpeg",
  leanaCrisis:   "https://i.imgur.com/UOdeXiE.jpeg",
  bgGarden:      "https://i.imgur.com/5KkP02I.png",
  bgBallroom:    "https://i.imgur.com/ZEAVXlN.jpeg",
  bgStudy:       "https://i.imgur.com/2wAexrc.png",
  bgLucian:      "https://i.imgur.com/ccbE6Fw.png",
  bgTower:       "https://i.imgur.com/TEOFmdM.jpeg",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Noto+Serif+KR:wght@300;400;600&display=swap');
  .gr { width:100%; max-width:390px; min-height:700px; background:#06040f; position:relative; overflow:hidden; font-family:'Noto Serif KR','Cormorant Garamond',serif; color:#f0e6d3; margin:0 auto; border:1px solid rgba(201,149,106,0.3); }
  @keyframes floatPetal { 0%{transform:translateY(0) rotate(0deg);opacity:0} 10%{opacity:.55} 85%{opacity:.25} 100%{transform:translateY(-680px) rotate(420deg) translateX(30px);opacity:0} }
  @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
  @keyframes fadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeIn { from{opacity:0} to{opacity:1} }
  @keyframes slideR { from{opacity:0;transform:translateX(-24px)} to{opacity:1;transform:translateX(0)} }
  @keyframes slideUp { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
  @keyframes charIn { 0%{opacity:0;transform:scale(.96) translateX(-18px);filter:blur(6px) brightness(.4)} 100%{opacity:1;transform:scale(1) translateX(0);filter:blur(0) brightness(1)} }
  @keyframes glowP { 0%,100%{opacity:.45} 50%{opacity:.9} }
  @keyframes hbeat { 0%,100%{transform:scale(1)} 50%{transform:scale(1.28)} }
  @keyframes crownF { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
  @keyframes titleR { 0%{opacity:0;letter-spacing:.45em} 100%{opacity:1;letter-spacing:.08em} }
  @keyframes orbFloat { 0%,100%{transform:translateY(0) translateX(0)} 33%{transform:translateY(-12px) translateX(6px)} 66%{transform:translateY(6px) translateX(-4px)} }
  @keyframes flagPop { 0%{opacity:0;transform:scale(.8) translateY(10px)} 60%{transform:scale(1.05) translateY(-2px)} 100%{opacity:1;transform:scale(1) translateY(0)} }
  @keyframes pulse { 0%,100%{opacity:.7} 50%{opacity:1} }
  .gold-line { height:1px; background:linear-gradient(90deg,transparent,#c9956a,#f0d9b5,#c9956a,transparent); background-size:200% auto; animation:shimmer 3s linear infinite; }
  .btn-choice { position:relative; overflow:hidden; background:linear-gradient(135deg,rgba(139,26,58,.82) 0%,rgba(55,7,20,.95) 100%); border:1px solid rgba(201,149,106,.5); color:#f0e6d3; font-family:'Noto Serif KR',serif; font-size:13.5px; padding:13px 18px; border-radius:2px; cursor:pointer; transition:all .3s; text-align:left; width:100%; margin-bottom:8px; }
  .btn-choice::before { content:''; position:absolute; inset:0; background:linear-gradient(135deg,rgba(201,149,106,.12),transparent); opacity:0; transition:opacity .3s; }
  .btn-choice:hover::before { opacity:1; }
  .btn-choice:hover { border-color:rgba(201,149,106,.9); transform:translateX(5px); box-shadow:0 4px 20px rgba(139,26,58,.4); }
  .btn-next { background:transparent; border:none; color:#c9956a; font-family:'Cinzel',serif; font-size:11px; cursor:pointer; letter-spacing:.12em; padding:6px 10px; transition:all .2s; }
  .btn-next:hover { color:#f0d9b5; text-shadow:0 0 12px rgba(201,149,106,.8); }
  .btn-start { background:linear-gradient(135deg,rgba(139,26,58,.85),rgba(60,8,22,.95)); border:1px solid rgba(201,149,106,.65); color:#f0d9b5; font-family:'Cinzel',serif; font-size:13px; letter-spacing:.22em; padding:15px 46px; border-radius:2px; cursor:pointer; box-shadow:0 4px 24px rgba(139,26,58,.4); transition:all .3s; }
  .btn-start:hover { box-shadow:0 6px 32px rgba(201,149,106,.35); transform:translateY(-1px); }
  .btn-restart { background:transparent; border:1px solid rgba(201,149,106,.6); color:#c9956a; font-family:'Cinzel',serif; font-size:11px; letter-spacing:.2em; padding:11px 34px; border-radius:2px; cursor:pointer; transition:all .3s; }
  .btn-restart:hover { border-color:#c9956a; color:#f0d9b5; }
  .wcard { border:1px solid rgba(201,149,106,.28); border-radius:4px; background:linear-gradient(135deg,rgba(201,149,106,.04),rgba(139,26,58,.07)); padding:16px 18px; cursor:pointer; transition:all .3s; margin-bottom:13px; }
  .wcard:hover { border-color:rgba(201,149,106,.8); background:linear-gradient(135deg,rgba(201,149,106,.1),rgba(139,26,58,.14)); transform:translateY(-2px); box-shadow:0 8px 24px rgba(139,26,58,.28); }
  .corner { position:absolute; width:22px; height:22px; border-color:rgba(201,149,106,.42); border-style:solid; }
  .ctl { top:8px; left:8px; border-width:1px 0 0 1px; }
  .ctr { top:8px; right:8px; border-width:1px 1px 0 0; }
  .cbl { bottom:8px; left:8px; border-width:0 0 1px 1px; }
  .cbr { bottom:8px; right:8px; border-width:0 1px 1px 0; }
  .sbar { height:3px; background:rgba(255,255,255,.08); border-radius:2px; overflow:hidden; flex:1; }
  .sfill { height:100%; border-radius:2px; transition:width .6s cubic-bezier(.4,0,.2,1); }
  .dbox { position:absolute; bottom:0; left:0; right:0; background:linear-gradient(180deg,rgba(6,4,15,.8) 0%,rgba(8,4,18,.97) 100%); backdrop-filter:blur(14px); border-top:1px solid rgba(201,149,106,.32); padding:18px 20px 28px; z-index:50; animation:slideUp .38s ease-out; }
  .flag-badge { display:inline-block; font-family:'Cinzel',serif; font-size:8px; letter-spacing:.1em; padding:3px 8px; border-radius:2px; margin-right:4px; margin-bottom:4px; animation:flagPop .5s ease-out forwards; }
  .char-img { display:block; width:auto; height:380px; object-fit:contain; object-position:center top; z-index:2; animation:charIn .65s cubic-bezier(.4,0,.2,1) forwards; filter:drop-shadow(0 0 20px var(--char-glow,rgba(200,150,100,.4))); }
`;

const CHARS = {
  kael:   { name:'카엘',   title:'황태자',      tag:'냉철·도도', color:'#7ab8d4', glow:'rgba(122,184,212,.42)' },
  lucian: { name:'루시안', title:'황제의 서자',  tag:'위험·집착', color:'#c44060', glow:'rgba(196,64,96,.42)'   },
  arien:  { name:'아리엔', title:'궁정 마법사',  tag:'무심·신비', color:'#a070d8', glow:'rgba(160,112,216,.42)' },
  dorian: { name:'도리안', title:'근위기사단장', tag:'다정·흑막', color:'#6ab88a', glow:'rgba(106,184,138,.42)' },
};
const STAT_CFG = [
  { key:'elegance', label:'우아함', color:'#c9956a' },
  { key:'intel',    label:'지성',   color:'#7ab8d4' },
  { key:'magic',    label:'마력',   color:'#a070d8' },
  { key:'courage',  label:'담력',   color:'#6ab88a' },
  { key:'charm',    label:'매력',   color:'#d4a0c0' },
  { key:'infamy',   label:'악명',   color:'#c44060' },
];

const CHAPTER_BG = {
  0: null,
  1: 'bgBallroom',
  2: 'bgTower',
  3: 'bgGarden',
  4: 'bgStudy',
  5: 'bgStudy',
  6: null,
};
const ROUTE_BG = {
  kael:   'bgStudy',
  lucian: 'bgLucian',
  arien:  'bgTower',
  dorian: 'bgGarden',
};

const SCENARIO = [
  { title:'Chapter I  ·  악녀로 눈을 뜨다', scenes:[
    { text:'눈을 뜨니 낯선 황금빛 천장이 보였다. 욱신거리는 머리를 부여잡고 거울 앞에 섰을 때, 나는 경악했다.', char:null },
    { text:'거울 속의 화려한 여인은... 내가 읽던 피폐 로판 소설의 악녀, ‘레아나 드 발로아’였다. 사교계에서 악명이 높고, 황태자에게 집착하다 처형당하는 그 캐릭터.', char:null },
    { text:'원작 기억을 하나하나 더듬었다. 지금 레아나의 집안은 황실과 밀약을 맺고 있고, 황궁 내부엔 두 개의 파벌이 암투 중이다. 내가 아는 지식이 유일한 무기다.', char:null },
    { text:'또 하나의 문제. 레아나의 몸에는 제어되지 않은 마력이 잠들어 있다. 원작에서 이게 폭주해 황궁 일부를 박살낸다. 최우선 처리 사안.', char:null },
    { text:'똑똑. "아가씨, 황궁 무도회 준비를 하셔야 합니다." 원작에서 레아나가 첫 사고를 치는 바로 그 무도회다. 어떻게 임할 것인가.', char:null,
      choices:[
        { text:'조용히 다녀온다. 존재감을 지운다.  ✦ 지성+10',
          acts:[{type:'stat',k:'intel',v:10},{type:'stat',k:'courage',v:-5},{type:'screen',v:'wardrobe'}] },
        { text:'화려하게 꾸며 기선을 제압한다.  ✦ 매력+10  담력+10  악명+5',
          acts:[{type:'stat',k:'charm',v:10},{type:'stat',k:'courage',v:10},{type:'stat',k:'infamy',v:5},{type:'screen',v:'wardrobe'}] },
      ]},
  ]},

  { title:'Chapter II  ·  얼음과 불의 왈츠', scenes:[
    { text:'샹들리에 불빛 아래, 귀족들의 시선이 칼날처럼 꽂혀온다. 잡담 사이로 "발로아 가문이 황실 정보부와 내통한다더라"는 말이 흘러들었다. 첫 번째 단서.', char:null },
    { text:'연회장 입구가 소란스러워지더니, 냉기를 두른 남자가 천천히 걸어온다. 카엘 황태자. 원작에서 레아나에게 가장 잔인했던 사람.', char:'kael' },
    { text:'"레아나. 또 무슨 꿍꿍이지? 얌전히 처박혀 있으라고 했을 텐데." 주변 귀족들이 숨을 죽였다.', char:'kael',
      choices:[
        { text:'"약혼녀로서 의무를 다하러 왔을 뿐입니다, 전하."  ✦ 우아함+15  카엘♥+8',
          acts:[{type:'stat',k:'elegance',v:15},{type:'aff',k:'kael',v:8},{type:'flag',k:'kaelFirstMeet',v:'graceful'},{type:'toast',msg:'카엘이 당신의 태도를 기억할 것이다.',color:'#7ab8d4'},{type:'next'}] },
        { text:'"전하 허락이 필요한가요? 제 발로 온 자리인데."  ✦ 담력+15  카엘♥-5  악명+5',
          acts:[{type:'stat',k:'courage',v:15},{type:'aff',k:'kael',v:-5},{type:'stat',k:'infamy',v:5},{type:'flag',k:'kaelFirstMeet',v:'defiant'},{type:'toast',msg:'카엘의 눈이 좁혀졌다.',color:'#7ab8d4'},{type:'next'}] },
      ]},
    { text:'카엘이 서늘하게 지나치자, 등 뒤에서 위험한 웃음소리가 들렸다.', char:'lucian' },
    { text:'"저런, 형님이 또 쌀쌀맞게 구셨나 보군요." 와인 잔을 기울이며 그가 다가왔다. "도망쳐봐, 더 재밌어지니까."', char:'lucian' },
    { text:'"어때요? 재미없는 황태자 대신 저랑 춤 한 곡 추시겠습니까? 대신 비밀 하나씩 교환하죠."', char:'lucian',
      choices:[
        { text:'정중히 거절한다.  ✦ 지성+10  루시안♥-5',
          acts:[{type:'stat',k:'intel',v:10},{type:'aff',k:'lucian',v:-5},{type:'flag',k:'lucianDance',v:'refused'},{type:'toast',msg:'루시안이 비밀을 공유하지 않을 것이다.',color:'#c44060'},{type:'next'}] },
        { text:'받아들이며 그의 정보를 캐낸다.  ✦ 매력+15  루시안♥+10  지성+5',
          acts:[{type:'stat',k:'charm',v:15},{type:'aff',k:'lucian',v:10},{type:'stat',k:'intel',v:5},{type:'flag',k:'lucianDance',v:'danced'},{type:'toast',msg:'루시안에게서 황실 파벌 정보를 얻었다.',color:'#c44060'},{type:'next'}] },
      ]},
    { text:(f)=>f.lucianDance==='danced'
        ? '"정보부가 발로아 가문을 노리고 있어요. 누군가가 당신을 제물로 만들려 한다는 거죠." 그가 웃음을 거두며 낮게 말했다.'
        : '멀어지는 루시안의 뒷모습을 보며 생각했다. 그가 오늘 비밀을 팔았더라면 — 하지만 이미 지나간 기회다.',
      char:'lucian' },
    { text:'첫 번째 무도회가 끝났다. 하지만 이건 서막에 불과하다. 황궁의 파벌 다툼이 점점 빨리 돌아가고 있었다.', char:null },
  ]},

  { title:'Chapter III  ·  보랏빛 탑의 주인', scenes:[
    { text:'마탑. 마력 폭주를 막기 위해 직접 찾아왔다. 계단을 오를수록 공기가 달라진다. 마도서들이 공중에 떠다니며 페이지를 넘겼다.', char:null },
    { text:'"발로아 공녀. 귀찮게 하지 말고 돌아가." 아리엔이 책 더미 사이에서 고개도 들지 않고 말했다.', char:'arien' },
    { text:'"…흐음." 그가 처음으로 시선을 올렸다. "마력 회로가 엉망이군. 이대로 두면 6개월 안에 폭주한다." 무심하게, 마치 날씨 얘기하듯.', char:'arien' },
    { text:'"왜 내가 당신을 도와야 하지? 그 이유를 납득시켜봐."', char:'arien',
      choices:[
        { text:'마법 이론으로 설득한다.  ✦ 지성+20  아리엔♥+10',
          acts:[{type:'stat',k:'intel',v:20},{type:'aff',k:'arien',v:10},{type:'flag',k:'arienProof',v:'knowledge'},{type:'toast',msg:'아리엔이 지적 호기심을 느꼈다.',color:'#a070d8'},{type:'next'}] },
        { text:'마력을 일부 개방해 그를 놀라게 한다.  ✦ 마력+25  아리엔♥+15  악명+5',
          acts:[{type:'stat',k:'magic',v:25},{type:'aff',k:'arien',v:15},{type:'stat',k:'infamy',v:5},{type:'flag',k:'arienProof',v:'power'},{type:'toast',msg:'아리엔의 눈이 처음으로 빛났다.',color:'#a070d8'},{type:'next'}] },
      ]},
    { text:(f)=>f.arienProof==='power'
        ? '"이 정도 마력이 아직 잠들어 있었군." 그가 지팡이를 내려놓으며 말했다. "알겠어. 흥미롭다." 미미한 미소. 예상치 못한 조력자를 얻었다.'
        : '"논리는 맞다." 아리엔이 마침내 고개를 끄덕였다. "쓸모가 있을 것 같으니, 한 번은 봐주지." 차갑지만 진심 어린 동의.',
      char:'arien' },
    { text:'마탑을 나서며 새로운 사실을 알았다. 아리엔은 레아나의 마력이 폭주하면 황궁 전체가 위험하다는 걸 오래전부터 알고 있었다.', char:null },
  ]},

  { title:'Chapter IV  ·  상냥한 가면의 이면', scenes:[
    { text:'황궁 정원. 도리안 카페이로가 마치 기다린 것처럼 서 있었다. 항상 부드러운 웃음. 항상 완벽한 태도. 그래서 더 무섭다.', char:'dorian' },
    { text:'"레아나 영애, 요즘 마탑을 자주 오가신다 들었습니다." 그의 정보망은 제국 최고 수준이다. "불편하신 일이라도?"', char:'dorian' },
    { text:(f)=>f.kaelFirstMeet==='defiant'
        ? '"아, 그리고 — 무도회에서 황태자 전하께 하신 말씀이 화제였습니다. 담대하시더군요." 눈은 웃지 않았다.'
        : '"무도회에서 품위 있게 대처하셨다 들었습니다. 역시 발로아 가문답습니다." 칭찬인지 경계인지 알 수 없는 어조.',
      char:'dorian' },
    { text:'"영애 주변에서 묘한 소문이 돌고 있습니다. 제가 뭔가 도움이 될 수 있다면—" 그가 한 발짝 가까이 왔다.', char:'dorian',
      choices:[
        { text:'순진한 척 연기하며 경계를 푼다.  ✦ 매력+20  도리안♥+5',
          acts:[{type:'stat',k:'charm',v:20},{type:'aff',k:'dorian',v:5},{type:'flag',k:'dorianGuard',v:'submissive'},{type:'toast',msg:'도리안이 당신을 쉬운 패로 보기 시작했다.',color:'#6ab88a'},{type:'next'}] },
        { text:'당당하게 맞서며 의중을 묻는다.  ✦ 담력+20  도리안♥+15',
          acts:[{type:'stat',k:'courage',v:20},{type:'aff',k:'dorian',v:15},{type:'flag',k:'dorianGuard',v:'confronted'},{type:'toast',msg:'도리안의 눈에 진짜 흥미가 스쳤다.',color:'#6ab88a'},{type:'next'}] },
      ]},
    { text:(f)=>f.dorianGuard==='confronted'
        ? '"하하." 그가 처음으로 진짜 웃음을 보였다. "역시 소문과 다르시군요. 좋습니다. 솔직한 분을 저도 좋아합니다."'
        : '"하하, 역시 영애는 다정하시군요." 부드러운 미소 뒤에서 등골이 서늘해졌다.',
      char:'dorian' },
  ]},

  { title:'Chapter V  ·  독은 독으로', scenes:[
    { text:'황궁 내부 파벌전이 격화됐다. 제2황자파가 황태자를 압박하기 시작했고, 발로아 가문은 그 사이에서 위태롭게 균형을 잡고 있다.', char:null },
    { text:'황궁 도서관. 고문서 사이에서 발로아 가문과 황실 밀약서의 사본을 발견했다. 이걸 이용하면 협상 카드가 생긴다. 하지만 위험하다.', char:null,
      choices:[
        { text:'밀약서를 확보하고 증거로 보관한다.  ✦ 지성+15  담력+10  악명+5',
          acts:[{type:'stat',k:'intel',v:15},{type:'stat',k:'courage',v:10},{type:'stat',k:'infamy',v:5},{type:'flag',k:'rumorSource',v:'document'},{type:'toast',msg:'황실 밀약서 사본을 확보했다.',color:'#c9956a'},{type:'next'}] },
        { text:'위험하다. 모른 척하고 돌아간다.  ✦ 우아함+5',
          acts:[{type:'stat',k:'elegance',v:5},{type:'next'}] },
      ]},
    { text:'황궁 내 레아나를 음해하는 소문이 퍼지기 시작했다. "발로아 공녀가 마탑과 결탁해 황태자를 폐위시키려 한다."', char:null },
    { text:'"소문의 출처를 알고 있어요. 황귀비 측근 중 한 명이죠." 루시안이 낮게 말했다. "도와줄 수는 있어. 대가가 있지만."', char:'lucian',
      choices:[
        { text:(f)=>f.lucianDance==='danced' ? '(이전에 정보를 교환한 사이다) "전에 나눈 정보, 이제 갚을 차례군요."  ✦ 루시안♥+15' : '"대가가 뭔가요?"  ✦ 지성+5',
          acts:[{type:'cond_aff',flagKey:'lucianDance',flagVal:'danced',k:'lucian',v:15,elseStatK:'intel',elseStatV:5},{type:'next'}] },
        { text:'거절한다. 혼자 해결한다.  ✦ 담력+10  루시안♥-10',
          acts:[{type:'stat',k:'courage',v:10},{type:'aff',k:'lucian',v:-10},{type:'flag',k:'betrayed',v:true},{type:'next'}] },
      ]},
    { text:'밤이 깊어지면서 황궁은 조용해졌다. 하지만 그 고요함이 오히려 불길했다.', char:null },
  ]},

  { title:'Chapter VI  ·  무너지는 균형', scenes:[
    { text:'새벽. 황궁 경비가 발로아 별궁을 포위했다는 보고가 들어왔다. 예상보다 빠르게 움직였다.', char:null },
    { text:'"레아나 드 발로아가 황녀 시해를 공모했다!" 터무니없는 누명. 원작보다 3개월 일찍 터졌다.', char:null },
    { text:(f)=>f.rumorSource==='document'
        ? '하지만 — 밀약서가 있다. 이 문서가 있으면 최소한 협상 테이블에 앉을 수 있다.'
        : '증거도 없고, 협상 카드도 없다. 지금 당장 누군가에게 손을 내밀어야 한다.',
      char:null },
    { text:'지금 바로 도움을 청해야 한다. 누구에게 가느냐에 따라 모든 것이 달라질 것이다.', char:null,
      choices:[
        { text:'황태자 카엘을 찾아간다 — 냉철한 권력',
          acts:[{type:'aff',k:'kael',v:20},{type:'goto',ch:6,si:0,char:'kael'}] },
        { text:'루시안 황자에게 손을 내민다 — 위험한 도박',
          acts:[{type:'aff',k:'lucian',v:20},{type:'goto',ch:6,si:4,char:'lucian'}] },
        { text:'마법사 아리엔을 믿는다 — 초월적인 힘',
          acts:[{type:'aff',k:'arien',v:20},{type:'goto',ch:6,si:8,char:'arien'}] },
        { text:'기사단장 도리안과 거래한다 — 숨겨진 칼날',
          acts:[{type:'aff',k:'dorian',v:20},{type:'goto',ch:6,si:12,char:'dorian'}] },
      ]},
  ]},

  { title:'Chapter VII  ·  최후의 선택', scenes:[
    { text:(f)=>f.kaelFirstMeet==='graceful'
        ? '황태자궁. 카엘은 서류를 내려다보다 고개를 들었다. 무도회에서 품위 있게 대처했던 그 여자가 이제 도움을 청하러 왔다.'
        : '황태자궁. 카엘은 서류를 내려다보다 고개를 들었다. 전하 허락이 필요하냐고 따박거리던 여자가 이제 도움을 청하러 왔다.',
      char:'kael' },
    { text:'"살려주세요, 전하. 누명이라는 걸 아시잖습니까."', char:'kael' },
    { text:(f)=>f.rumorSource==='document'
        ? '"…황실 밀약서." 카엘이 서류를 받아들며 눈을 가늘게 떴다. "이걸 가지고 있었군." 긴 침묵. "흥미롭다. 당신은 생각보다 위험한 사람이야."'
        : '"증거도 없이 나를 이용하려 하나." 카엘이 차갑게 시선을 돌렸다.',
      char:'kael' },
    { text:'"한 가지 조건이 있어." 카엘이 자리에서 일어나며 말했다. "내 편이 돼라. 완전하게."', char:'kael',
      choices:[{ text:'그의 손을 잡는다…', acts:[{type:'ending',char:'kael',statKey1:'elegance',statKey2:'intel',threshold:150}] }] },
    { text:'별궁. 루시안이 와인을 마시며 기다리고 있었다.', char:'lucian' },
    { text:'"호오, 결국 제게 오셨군요. 도망쳐봐, 더 재밌어지니까." 하지만 눈빛은 다른 말을 하고 있었다.', char:'lucian' },
    { text:(f)=>f.lucianDance==='danced'
        ? '"우리가 나눴던 정보들 — 이제 전부 써야 할 때가 됐군요." 그가 잔을 내려놓으며 일어섰다. "황귀비 측근의 이름과 증거, 준비해뒀습니다."'
        : '"처음부터 저를 믿었더라면 더 쉬웠을 텐데." 루시안이 씁쓸하게 웃었다. "그래도, 이 정도는 도와드릴 수 있어요."',
      char:'lucian' },
    { text:'"그래, 한 번 믿어볼까요?" 위험한 미소가 가까워졌다.', char:'lucian',
      choices:[{ text:'그의 손을 잡는다…', acts:[{type:'ending',char:'lucian',statKey1:'charm',statKey2:'infamy',threshold:140}] }] },
    { text:'마탑 꼭대기. 아리엔은 모든 것을 알고 있다는 듯 무심하게 서 있었다.', char:'arien' },
    { text:'"네가 범인이 아니라는 건 마력의 흔적이 말해주고 있어. 진짜 마력 조작을 한 사람은 따로 있다."', char:'arien' },
    { text:(f)=>f.arienProof==='power'
        ? '"네 마력의 고유한 파동은 내가 기억하고 있다. 증거가 될 수 있어." 그가 지팡이를 들어올렸다. "착각하지 마, 그냥 데이터가 필요했을 뿐이야."'
        : '"마법학 이론을 이해하는 사람이라면 알 수 있어. 마력 흔적은 지워지지 않으니까." 아리엔이 자료를 펼쳤다.',
      char:'arien' },
    { text:'"같이 가서 밝혀주지. 대신 — 이후에도 네 마력 데이터를 제공해야 해."', char:'arien',
      choices:[{ text:'그의 마법을 믿는다…', acts:[{type:'ending',char:'arien',statKey1:'magic',statKey2:'intel',threshold:160}] }] },
    { text:'기사단장실. 도리안이 기다렸다는 듯 부드럽게 웃었다.', char:'dorian' },
    { text:'"레아나 님의 무고함을 밝혀드리겠습니다. 저는 언제나 당신 편이니까요."', char:'dorian' },
    { text:(f)=>f.dorianGuard==='confronted'
        ? '"솔직한 분이라는 걸 알고 있어요. 그래서 제가 먼저 솔직하게 말씀드리죠." 그가 서류를 내밀었다. "황귀비 측근의 자필 서신입니다."'
        : '"단, 조건이 있습니다." 다정한 미소 뒤로 싸늘한 눈빛이 스쳤다. "이후엔 저를 통해서만 움직이셔야 합니다."',
      char:'dorian' },
    { text:'진심인지 연기인지. 그 판단을 내려야 하는 순간이 왔다.', char:'dorian',
      choices:[{ text:'그에게 모든 것을 건다…', acts:[{type:'ending',char:'dorian',statKey1:'courage',statKey2:'charm',threshold:150}] }] },
  ]},
];

const Petals = () => {
  const ps = Array.from({length:9},(_,i)=>({
    id:i, left:`${12+Math.random()*76}%`,
    delay:`${Math.random()*10}s`, dur:`${7+Math.random()*9}s`,
    size:`${6+Math.random()*5}px`,
    hue:`rgba(${160+(Math.random()*50)|0},${30+(Math.random()*20)|0},${50+(Math.random()*20)|0},.55)`,
  }));
  return <>{ps.map(p=>(
    <div key={p.id} style={{position:'absolute',bottom:'-15px',left:p.left,width:p.size,height:p.size,zIndex:3,pointerEvents:'none',background:`radial-gradient(ellipse,${p.hue},transparent)`,borderRadius:'50% 0 50% 0',animation:`floatPetal ${p.dur} ${p.delay} linear infinite`}}/>
  ))}</>;
};
const Corners = () => (<><div className="corner ctl"/><div className="corner ctr"/><div className="corner cbl"/><div className="corner cbr"/></>);
const HeartGauge = ({ val, color, name }) => (
  <div style={{display:'flex',alignItems:'center',gap:5}}>
    <span style={{fontSize:8,color:'rgba(240,230,211,.4)',fontFamily:'Cinzel',width:26}}>{name}</span>
    <span style={{color,fontSize:10,display:'inline-block',animation:val>60?'hbeat 1s ease infinite':'none'}}>♥</span>
    <div className="sbar"><div className="sfill" style={{width:`${val}%`,background:`linear-gradient(90deg,${color}66,${color})`}}/></div>
    <span style={{fontSize:8,color,width:18,textAlign:'right',fontFamily:'Cinzel'}}>{val}</span>
  </div>
);
const FlagBadge = ({ label, color }) => (
  <span className="flag-badge" style={{background:`${color}18`,border:`1px solid ${color}44`,color}}>{label}</span>
);

const CharDisplay = ({ charKey, visible }) => {
  const ch = CHARS[charKey];
  if (!ch) return null;
  return (
    <div style={{position:'absolute',top:44,left:0,right:0,height:420,zIndex:10,display:'flex',alignItems:'flex-end',justifyContent:'center',animation:visible?'charIn .65s cubic-bezier(.4,0,.2,1) forwards':'none',opacity:visible?1:0,'--char-glow':ch.glow}}>
      <div style={{position:'absolute',bottom:30,left:'50%',transform:'translateX(-50%)',width:220,height:300,background:`radial-gradient(ellipse at center bottom,${ch.glow} 0%,transparent 70%)`,animation:'glowP 3s ease-in-out infinite',pointerEvents:'none'}}/>
      <div style={{position:'absolute',bottom:8,left:'50%',transform:'translateX(-50%)',width:160,height:12,background:`radial-gradient(ellipse,${ch.color}33 0%,transparent 70%)`,borderRadius:'50%'}}/>
      <div style={{position:'absolute',bottom:0,left:0,right:0,display:'flex',justifyContent:'center',alignItems:'flex-end',zIndex:2,pointerEvents:'none'}}>
        <img src={IMG[charKey]} alt={ch.name} className="char-img" style={{'--char-glow':ch.glow}}/>
      </div>
      <div style={{position:'absolute',top:14,left:18,background:'rgba(6,4,15,.9)',border:`1px solid ${ch.color}44`,borderRadius:2,padding:'5px 13px',animation:'slideR .5s ease-out',zIndex:5}}>
        <div style={{fontFamily:'Cinzel',fontSize:9,color:ch.color,letterSpacing:'.15em',marginBottom:1}}>{ch.title}</div>
        <div style={{fontFamily:'Noto Serif KR',fontSize:18,fontWeight:600,color:'#f0e6d3'}}>{ch.name}</div>
        <div style={{fontFamily:'Cinzel',fontSize:8,color:`${ch.color}77`,letterSpacing:'.2em',marginTop:1}}>{ch.tag}</div>
      </div>
    </div>
  );
};

export default function App() {
  const [screen,    setScreen]    = useState('title');
  const [chapter,  setChapter]   = useState(0);
  const [sceneIdx, setSceneIdx]  = useState(0);
  const [stats,    setStats]     = useState({elegance:30,intel:30,magic:20,courage:20,charm:30,infamy:10});
  const [affinity, setAffinity]  = useState({kael:10,lucian:10,arien:10,dorian:10});
  const [flags,    setFlags]     = useState({kaelFirstMeet:'none',lucianDance:'none',arienProof:'none',dorianGuard:'none',rumorSource:'none',betrayed:false});
  const [activeChar,   setActiveChar]   = useState(null);
  const [endingType,   setEndingType]   = useState(null);
  const [charVisible,  setCharVisible]  = useState(false);
  const [textKey,      setTextKey]      = useState(0);
  const [titleAnim,    setTitleAnim]    = useState(false);
  const [toast,        setToast]        = useState(null);
  const prevChar = useRef(null);

  const statsRef    = useRef(stats);
  const affinityRef = useRef(affinity);
  const flagsRef    = useRef(flags);
  const chapterRef  = useRef(chapter);
  const sceneIdxRef = useRef(sceneIdx);
  statsRef.current    = stats;
  affinityRef.current = affinity;
  flagsRef.current    = flags;
  chapterRef.current  = chapter;
  sceneIdxRef.current = sceneIdx;

  useEffect(()=>{ setTimeout(()=>setTitleAnim(true),350); },[]);
  useEffect(()=>{
    if(activeChar !== prevChar.current){
      setCharVisible(false);
      setTimeout(()=>setCharVisible(true),160);
      prevChar.current = activeChar;
    }
  },[activeChar]);

  const showToast = (msg, color) => {
    setToast({msg,color});
    setTimeout(()=>setToast(null),2200);
  };

  const runActs = (acts) => {
    let pendingNext = false;
    let pendingGoto = null;
    let pendingEnding = null;

    for(const a of acts){
      if(a.type==='stat')   setStats(p=>({...p,[a.k]:Math.max(0,Math.min(100,p[a.k]+a.v))}));
      if(a.type==='aff')    setAffinity(p=>({...p,[a.k]:Math.max(0,Math.min(100,p[a.k]+a.v))}));
      if(a.type==='flag')   setFlags(p=>({...p,[a.k]:a.v}));
      if(a.type==='toast')  showToast(a.msg, a.color);
      if(a.type==='screen') setScreen(a.v);
      if(a.type==='next')   pendingNext = true;
      if(a.type==='goto')   pendingGoto = a;
      if(a.type==='ending') pendingEnding = a;
      if(a.type==='cond_aff'){
        const fv = flagsRef.current[a.flagKey];
        if(fv===a.flagVal) setAffinity(p=>({...p,[a.k]:Math.max(0,Math.min(100,p[a.k]+a.v))}));
        else               setStats(p=>({...p,[a.elseStatK]:Math.max(0,Math.min(100,p[a.elseStatK]+a.elseStatV))}));
      }
    }

    if(pendingGoto){
      setChapter(pendingGoto.ch);
      setSceneIdx(pendingGoto.si);
      setActiveChar(pendingGoto.char);
      setTextKey(k=>k+1);
    } else if(pendingEnding){
      const a = pendingEnding;
      const st = statsRef.current;
      const af = affinityRef.current;
      const fl = flagsRef.current;
      const afOk = af[a.char] >= 65;
      const statOk = st[a.statKey1] + st[a.statKey2] > a.threshold;
      const allHigh = Object.values(af).every(v=>v>=50);
      const hidOk = allHigh && st.infamy<30 && st.intel>80 && !fl.betrayed;
      const trueOk = fl.rumorSource==='document' && !fl.betrayed && afOk;
      let type = hidOk?'hidden': trueOk?'true': (statOk||afOk)?'happy':'bad';
      setEndingType(type);
      setScreen('ending');
    } else if(pendingNext){
      const ch  = chapterRef.current;
      const si  = sceneIdxRef.current;
      const scenes = SCENARIO[ch]?.scenes ?? [];
      setTextKey(k=>k+1);
      if(si < scenes.length - 1){
        const n = si + 1;
        setSceneIdx(n);
        setActiveChar(scenes[n].char ?? null);
      } else {
        const nc = ch + 1;
        if(nc < SCENARIO.length){
          setChapter(nc);
          setSceneIdx(0);
          setActiveChar(SCENARIO[nc].scenes[0].char ?? null);
        }
      }
    }
  };

  const nextScene = () => {
    const ch  = chapterRef.current;
    const si  = sceneIdxRef.current;
    const scenes = SCENARIO[ch]?.scenes ?? [];
    setTextKey(k=>k+1);
    if(si < scenes.length - 1){
      const n = si + 1;
      setSceneIdx(n);
      setActiveChar(scenes[n].char ?? null);
    } else {
      const nc = ch + 1;
      if(nc < SCENARIO.length){
        setChapter(nc);
        setSceneIdx(0);
        setActiveChar(SCENARIO[nc].scenes[0].char ?? null);
      }
    }
  };

  const goNextChapter = () => {
    const nc = chapterRef.current + 1;
    if(nc < SCENARIO.length){
      setChapter(nc);
      setSceneIdx(0);
      setActiveChar(SCENARIO[nc].scenes[0].char ?? null);
    }
  };

  const INIT = {
    screen:'title',chapter:0,sceneIdx:0,
    stats:{elegance:30,intel:30,magic:20,courage:20,charm:30,infamy:10},
    affinity:{kael:10,lucian:10,arien:10,dorian:10},
    flags:{kaelFirstMeet:'none',lucianDance:'none',arienProof:'none',dorianGuard:'none',rumorSource:'none',betrayed:false},
  };
  const reset = () => {
    setScreen(INIT.screen); setChapter(INIT.chapter); setSceneIdx(INIT.sceneIdx);
    setStats(INIT.stats); setAffinity(INIT.affinity); setFlags(INIT.flags);
    setActiveChar(null); setTitleAnim(false);
    setTimeout(()=>setTitleAnim(true),350);
  };

  const resolveText = (scene) => {
    if(!scene) return '';
    if(typeof scene.text === 'function') return scene.text(flags);
    return scene.text;
  };

  if(screen==='title') return (
    <div className="gr" style={{minHeight:700}}>
      <style>{css}</style>
      <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 20% 30%,rgba(139,26,58,.2) 0%,transparent 50%),radial-gradient(ellipse at 80% 70%,rgba(90,30,120,.18) 0%,transparent 50%),#06040f'}}/>
      <Petals/><Corners/>
      <div style={{position:'absolute',left:36,top:0,bottom:0,width:1,background:'linear-gradient(180deg,transparent,rgba(201,149,106,.25) 30%,rgba(201,149,106,.25) 70%,transparent)',zIndex:3}}/>
      <div style={{position:'absolute',right:36,top:0,bottom:0,width:1,background:'linear-gradient(180deg,transparent,rgba(201,149,106,.25) 30%,rgba(201,149,106,.25) 70%,transparent)',zIndex:3}}/>
      <svg style={{position:'absolute',top:'8%',left:'50%',transform:'translateX(-50%)',opacity:.07,zIndex:2}} width="300" height="300" viewBox="0 0 300 300">
        <circle cx="150" cy="150" r="140" fill="none" stroke="#c9956a" strokeWidth="1" strokeDasharray="4 8"/>
        <circle cx="150" cy="150" r="110" fill="none" stroke="#c9956a" strokeWidth=".5"/>
        <circle cx="150" cy="150" r="80"  fill="none" stroke="#c9956a" strokeWidth="1" strokeDasharray="2 6"/>
        {[0,45,90,135,180,225,270,315].map((a,i)=>(
          <text key={i} x={150+125*Math.cos(a*Math.PI/180)-6} y={150+125*Math.sin(a*Math.PI/180)+6} fontSize="10" fill="#c9956a">✦</text>
        ))}
      </svg>
      <div style={{position:'absolute',bottom:0,left:'50%',transform:'translateX(-50%)',width:280,zIndex:5,opacity:.22,pointerEvents:'none',maskImage:'linear-gradient(180deg,black 30%,transparent 100%)',WebkitMaskImage:'linear-gradient(180deg,black 30%,transparent 100%)'}}>
        <img src={IMG.leana} alt="" style={{width:'100%',display:'block'}}/>
      </div>
      <div style={{position:'relative',zIndex:10,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:700,padding:'40px 50px',textAlign:'center'}}>
        <div style={{fontSize:36,marginBottom:18,animation:'crownF 3s ease-in-out infinite',filter:'drop-shadow(0 0 18px rgba(201,149,106,.85))'}}>♛</div>
        <div className="gold-line" style={{width:110,marginBottom:22}}/>
        <h1 style={{fontFamily:'Cinzel',fontWeight:700,fontSize:30,lineHeight:1.38,color:'#f0d9b5',letterSpacing:'.08em',textShadow:'0 0 40px rgba(201,149,106,.5)',animation:titleAnim?'titleR 1.2s ease-out forwards':'none',opacity:0,marginBottom:8}}>레아나의<br/>생존 법칙</h1>
        <p style={{fontFamily:'Cormorant Garamond',fontStyle:'italic',fontSize:13,color:'rgba(201,149,106,.62)',letterSpacing:'.05em',marginBottom:6,animation:titleAnim?'fadeUp 1.2s .4s ease-out forwards':'none',opacity:0}}>Lex Survivalis Leana</p>
        <div className="gold-line" style={{width:110,marginBottom:34}}/>
        <p style={{fontSize:13,lineHeight:1.9,color:'rgba(240,230,211,.52)',marginBottom:46,animation:titleAnim?'fadeUp 1s .6s ease-out forwards':'none',opacity:0}}>악녀에 빙의했다.<br/>모든 선택이 기억된다.<br/>목표는 오직 하나 — 생존.</p>
        <button className="btn-start" onClick={()=>setScreen('play')} style={{animation:titleAnim?'fadeUp 1s .9s ease-out forwards':'none',opacity:0}}>운명을 시작하다</button>
      </div>
    </div>
  );

  if(screen==='wardrobe'){
    const dresses=[
      {name:'로즈골드 야회복',    desc:'사교계를 장악할 우아함. 차갑게, 하지만 완벽하게.', stat:'elegance',val:20,color:'#c9956a',icon:'✦',detail:'우아함 +20'},
      {name:'크림슨 벨벳 드레스', desc:'시선을 사로잡는 치명적 매혹. 악녀다운 선택.',       stat:'charm',   val:20,color:'#c44060',icon:'♥',detail:'매력 +20'},
      {name:'미드나잇 새틴 드레스',desc:'냉철한 귀족의 지적 아름다움.',                      stat:'intel',   val:20,color:'#7ab8d4',icon:'◆',detail:'지성 +20'},
    ];
    return (
      <div className="gr" style={{minHeight:700}}>
        <style>{css}</style>
        <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 20% 30%,rgba(139,26,58,.2) 0%,transparent 50%),#06040f'}}/>
        <Petals/><Corners/>
        <div style={{position:'relative',zIndex:10,padding:'48px 26px 26px',minHeight:700,display:'flex',flexDirection:'column'}}>
          <div style={{textAlign:'center',marginBottom:26,animation:'fadeUp .6s ease-out'}}>
            <p style={{fontFamily:'Cinzel',fontSize:9,letterSpacing:'.3em',color:'rgba(201,149,106,.52)',marginBottom:10}}>DRESS ROOM</p>
            <h2 style={{fontFamily:'Cormorant Garamond',fontSize:25,fontWeight:300,color:'#f0d9b5',letterSpacing:'.05em',marginBottom:10}}>무도회를 위한 선택</h2>
            <div className="gold-line" style={{width:88,margin:'0 auto'}}/>
            <p style={{fontSize:11,color:'rgba(240,230,211,.38)',marginTop:10}}>이 선택은 이후 대화에 영향을 줍니다</p>
          </div>
          <div style={{flex:1}}>
            {dresses.map((d,i)=>(
              <div key={d.name} className="wcard" onClick={()=>{ setStats(p=>({...p,[d.stat]:Math.min(100,p[d.stat]+d.val)})); goNextChapter(); setScreen('play'); }} style={{animation:`fadeUp .5s ${i*.1}s ease-out both`}}>
                <div style={{display:'flex',alignItems:'center',gap:13}}>
                  <div style={{width:42,height:42,borderRadius:'50%',background:`radial-gradient(circle,${d.color}22,${d.color}08)`,border:`1px solid ${d.color}40`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:17,color:d.color,flexShrink:0}}>{d.icon}</div>
                  <div style={{flex:1}}>
                    <div style={{fontFamily:'Noto Serif KR',fontSize:15,fontWeight:600,color:'#f0d9b5',marginBottom:3}}>{d.name}</div>
                    <div style={{fontSize:11,color:'rgba(240,230,211,.42)',marginBottom:5}}>{d.desc}</div>
                    <div style={{fontFamily:'Cinzel',fontSize:10,color:d.color,letterSpacing:'.05em'}}>{d.detail}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if(screen==='ending'){
    const ES={
      true:  {title:'TRUE ENDING',  sub:'진실의 황관',       text:'누명의 실체를 스스로 밝혀냈다. 황실 밀약서와 확보한 증거로 음모의 뿌리를 자르고, 제국에서 가장 영리한 여인으로 거듭났다.',color:'#f0d9b5',icon:'♛'},
      hidden:{title:'HIDDEN ENDING', sub:'모든 것을 가진 자', text:'제국의 네 남자 모두를 당신의 편으로 만들었다. 황실의 권력, 마탑의 마력, 기사단의 칼날, 황자의 야망까지. 당신은 진정한 여왕이다.',color:'#a070d8',icon:'◈'},
      happy: {title:'HAPPY ENDING',  sub:'새로운 운명의 주인', text:'뛰어난 기지와 매력으로 처형 엔딩을 피하고, 당신만의 세력을 만들어 제국의 실세로 거듭났다.',color:'#c9956a',icon:'✦'},
      bad:   {title:'BAD ENDING',    sub:'예정된 파멸',       text:'원작의 거대한 흐름을 거스를 수 없었다. 누명을 벗지 못한 채, 차가운 감옥에서 단두대에 오를 날만을 기다리게 되었다…',color:'#c44060',icon:'†'},
    };
    const e = ES[endingType] || ES.bad;
    return (
      <div className="gr" style={{minHeight:700}}>
        <style>{css}</style>
        <div style={{position:'absolute',inset:0,background:`radial-gradient(ellipse at center,${e.color}18 0%,#06040f 62%)`}}/>
        <Petals/><Corners/>
        <div style={{position:'relative',zIndex:10,minHeight:700,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'40px 32px',textAlign:'center',animation:'fadeIn 1s ease-out'}}>
          <div style={{fontSize:46,color:e.color,marginBottom:20,filter:`drop-shadow(0 0 18px ${e.color})`,animation:'glowP 2s ease-in-out infinite'}}>{e.icon}</div>
          <p style={{fontFamily:'Cinzel',fontSize:8,letterSpacing:'.4em',color:`${e.color}88`,marginBottom:8}}>{e.title}</p>
          <h2 style={{fontFamily:'Cormorant Garamond',fontSize:24,fontWeight:300,color:e.color,marginBottom:16,letterSpacing:'.05em'}}>{e.sub}</h2>
          <div className="gold-line" style={{width:108,marginBottom:22}}/>
          <p style={{fontSize:14,lineHeight:2,color:'rgba(240,230,211,.78)',marginBottom:30,fontWeight:300}}>{e.text}</p>
          <div style={{background:'rgba(6,4,15,.72)',border:`1px solid ${e.color}22`,borderRadius:4,padding:'12px 16px',marginBottom:16,width:'100%'}}>
            <p style={{fontFamily:'Cinzel',fontSize:7,color:`${e.color}66`,letterSpacing:'.2em',marginBottom:8}}>YOUR CHOICES</p>
            <div style={{display:'flex',flexWrap:'wrap',gap:4}}>
              {flags.kaelFirstMeet==='graceful'   && <FlagBadge label="우아한 대처"    color={CHARS.kael.color}/>}
              {flags.kaelFirstMeet==='defiant'    && <FlagBadge label="강단 있는 반박" color={CHARS.kael.color}/>}
              {flags.lucianDance==='danced'       && <FlagBadge label="루시안과 왈츠"  color={CHARS.lucian.color}/>}
              {flags.arienProof==='power'         && <FlagBadge label="마력으로 증명"  color={CHARS.arien.color}/>}
              {flags.arienProof==='knowledge'     && <FlagBadge label="지식으로 설득"  color={CHARS.arien.color}/>}
              {flags.dorianGuard==='confronted'   && <FlagBadge label="도리안에게 맞섬" color={CHARS.dorian.color}/>}
              {flags.rumorSource==='document'     && <FlagBadge label="밀약서 확보"    color="#c9956a"/>}
              {flags.betrayed                     && <FlagBadge label="배신의 상처"    color="#c44060"/>}
            </div>
          </div>
          <button className="btn-restart" onClick={reset}>다시 시작하다</button>
        </div>
      </div>
    );
  }

  const currentScene = SCENARIO[chapter]?.scenes[sceneIdx];
  if(!currentScene) return null;
  const ch = activeChar ? CHARS[activeChar] : null;
  const displayText = resolveText(currentScene);
  const bgKey = chapter === 6 ? (activeChar ? ROUTE_BG[activeChar] : null) : CHAPTER_BG[chapter];
  const bgSrc = bgKey ? IMG[bgKey] : null;
  const leanaImg = chapter >= 5 ? (flags.rumorSource === 'document' ? IMG.leanaResolve : IMG.leanaCrisis) : IMG.leana;

  return (
    <div className="gr" style={{minHeight:700}}>
      <style>{css}</style>
      {bgSrc ? (
        <div style={{position:'absolute',inset:0,zIndex:0,overflow:'hidden'}}>
          <img src={bgSrc} alt="" style={{width:'100%',height:'100%',objectFit:'cover',opacity:.55,filter:'brightness(.7)'}}/>
          <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,rgba(6,4,15,.45) 0%,rgba(6,4,15,.25) 40%,rgba(6,4,15,.7) 100%)'}}/>
        </div>
      ) : (
        <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 20% 30%,rgba(139,26,58,.16) 0%,transparent 50%),#06040f'}}/>
      )}
      <Petals/>
      {!activeChar && (
        <div style={{position:'absolute',bottom:160,left:-30,width:220,zIndex:5,opacity:.22,maskImage:'linear-gradient(90deg,transparent 0%,black 40%,black 70%,transparent 100%)',WebkitMaskImage:'linear-gradient(90deg,transparent 0%,black 40%,black 70%,transparent 100%)'}}>
          <img src={leanaImg} alt="" style={{width:'100%',display:'block'}}/>
        </div>
      )}
      <div className="dbox">
        {ch && <div style={{marginBottom:9,display:'flex',alignItems:'center',gap:7}}><div style={{width:3,height:14,background:ch.color,borderRadius:2}}/><span style={{fontFamily:'Cinzel',fontSize:11,color:ch.color}}>{ch.name}</span></div>}
        <p key={textKey} style={{fontSize:14.5,lineHeight:1.9,marginBottom:currentScene.choices?16:12,animation:'fadeIn .5s ease-out',color:'#ede0cc'}}>{displayText}</p>
        {currentScene.choices ? (
          <div>{currentScene.choices.map((c,i)=><button key={i} className="btn-choice" onClick={()=>runActs(c.acts)}>{typeof c.text==='function'?c.text(flags):c.text}</button>)}</div>
        ):(
          <div style={{display:'flex',justifyContent:'flex-end'}}><button className="btn-next" onClick={nextScene}>계속 읽기 ›</button></div>
        )}
      </div>
    </div>
  );
}
