# DAILY MULTI GYM — PUNCH YOUR DAY

데일리 멀티짐(PUNCH DAILY)의 브랜드·가맹 소개용 반응형 웹사이트입니다.

## 웹사이트

**[공개 사이트 바로가기](https://daily-multigym-2026.amplesong17.chatgpt.site)**

## 구성

이 GitHub 저장소에는 웹사이트에 필요한 정적 파일이 **저장소 최상위 폴더**에 있습니다.

- `index.html` — 브랜드 소개, 트레이닝 프로그램, 운영 실적, 가맹 안내, 사회적 가치, 자료 갤러리
- `styles.css` — 데스크톱·모바일 반응형 디자인
- `script.js` — 모바일 메뉴, 스크롤 효과, 이미지 확대/넘김
- `favicon.svg` — 파비콘
- `assets/` — 브랜드 소개 이미지 11장, 인계본점의 개인정보 없는 실적 화면 1장

## 로컬에서 실행

별도 빌드나 패키지 설치 없이 실행할 수 있습니다.

```bash
python3 -m http.server 8000
```

브라우저에서 `http://localhost:8000`을 열어 확인하세요.

## 최신 반영 사항

- 데일리멀티짐 인계본점 오픈 3개월 누적 매출 **1억 500만 원**, 월평균 **3,500만 원**, 예약 **144건**, 일평균 매출 **약 117만 원**을 제공 자료에 근거해 표시합니다.
- 자료의 번호가 보이는 사진은 **01 브랜드 아이덴티티 → 02 매장 사례 → 03 투자 모델 → 04 브랜드 차별성 → 05 확장 계획 → 06 가맹과 엑시트 → 07 비전 → 08 사회적 가치** 순으로 정렬했습니다.
- 예약관리 화면의 실명·개인 연락처·예약번호 원본은 업로드하지 않았습니다. 공개 사이트의 전화번호도 제거했으며, 전화번호가 인쇄된 제휴 포스터는 이번 공개 버전에서 제외했습니다.

## 확인 및 유의사항

- 매출 및 가맹 수익 수치는 제공된 자료의 사례·목표치로, 실제 수익을 보장하지 않습니다.
- 추가 인계본점 집계와 기존 홍보물 매출 수치는 기간·집계 기준이 다를 수 있어 직접 비교하지 않았습니다.
- 향후 공식 문의 채널, 사업자 정보, 개인정보처리방침 등 운영 정보와 이미지 사용 권한을 확인해 보완해야 합니다.

## Netlify 자동 배포와 문의 접수

홈페이지 문의 폼은 **창업·가맹 상담 전용**입니다. SaaS 이용 문의, 오류 및 불편사항은 별도 SaaS 서비스 안에서 접수하도록 구분합니다.

1. Netlify의 **Add new project → Import an existing project**에서 GitHub 저장소 `1115sinb-ai/daily-multigym`을 선택합니다.
2. 브랜치는 `main`, **Build command는 비워두고**, **Publish directory는 `.`**(저장소 루트)로 설정합니다. `netlify.toml`에도 설정되어 있습니다.
3. Netlify 프로젝트의 **Forms → Enable form detection**을 활성화하고 최신 커밋을 배포합니다.
4. 사이트의 `#contact` 섹션에 있는 `daily-multigym-inquiry` 폼이 **Forms** 목록에 나타나는지 확인합니다.
5. **Forms → Submission notifications → Add notification → Email notification**에서 `service@dailymultigym.com`을 수신자로 지정합니다.
6. 실제 문의를 테스트해서 **Netlify Forms 목록과 Gmail 모두에서 확인**합니다.
7. Mailplug DNS로 커스텀 도메인을 연결할 때 웹용 A/CNAME만 Netlify 권장값으로 변경하고, **Google Workspace MX/SPF/DKIM/TXT는 유지**합니다.

참고: 문의 폼의 개인정보 안내/보유기간은 운영 전 실제 정책과 맞추고, Netlify 제출 기록 및 알림 이메일도 해당 기간에 맞춰 삭제 관리해야 합니다. Netlify가 아닌 사이트 호스트에서는 Netlify Forms 접수가 작동하지 않습니다.
