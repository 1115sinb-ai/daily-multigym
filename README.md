# DAILY MULTI GYM — PUNCH YOUR DAY

데일리 멀티짐(PUNCH DAILY)의 브랜드·지점·가맹·채용 안내용 반응형 웹사이트입니다.

## 웹사이트

**[공개 사이트 바로가기](https://dailymultigym.com)**

## 구성

이 GitHub 저장소에는 웹사이트에 필요한 정적 파일이 **저장소 최상위 폴더**에 있습니다.

- `index.html` — 브랜드 소개, 트레이닝 프로그램, 운영 실적, 가맹 안내, 사회적 가치, 자료 갤러리
- `styles.css` — 데스크톱·모바일 반응형 디자인
- `script.js` — 모바일 메뉴, 스크롤 효과, 이미지 확대/넘김
- `inquiries.css`, `inquiries.js` — 창업·회원·채용 문의 폼의 반응형 레이아웃과 접근 가능한 유형 탭
- `thank-you.html` — Netlify 정상 접수 후 표시하는 공통 안내 페이지
- `favicon.svg` — 파비콘
- `assets/` — 브랜드 소개·프로그램·제휴 이미지와 개인정보를 제외한 운영 자료

## 로컬에서 실행

별도 빌드나 패키지 설치 없이 실행할 수 있습니다.

```bash
python3 -m http.server 8000
```

브라우저에서 `http://localhost:8000`을 열어 확인하세요.

## 최신 반영 사항

- 데일리멀티짐 인계본점 오픈 3개월 누적 매출 **1억 500만 원**, 월평균 **3,500만 원**, 예약 **144건**, 일평균 매출 **약 117만 원**을 제공 자료에 근거해 표시합니다.
- 자료의 번호가 보이는 사진은 **01 브랜드 아이덴티티 → 02 매장 사례 → 03 투자 모델 → 04 브랜드 차별성 → 05 확장 계획 → 06 가맹과 엑시트 → 07 비전 → 08 사회적 가치** 순으로 정렬했습니다.
- 예약관리 화면의 실명·개인 연락처·예약번호 원본은 공개하지 않습니다. 공개 창업·가맹 대표번호는 제공된 홍보물의 **1688-5707**을 사용하며, 개인 연락처와 구분합니다.

## 확인 및 유의사항

- 매출 및 가맹 수익 수치는 제공된 자료의 사례·목표치로, 실제 수익을 보장하지 않습니다.
- 추가 인계본점 집계와 기존 홍보물 매출 수치는 기간·집계 기준이 다를 수 있어 직접 비교하지 않았습니다.
- 향후 공식 문의 채널, 사업자 정보, 개인정보처리방침 등 운영 정보와 이미지 사용 권한을 확인해 보완해야 합니다.

## Netlify 자동 배포와 문의 접수

홈페이지에는 **창업·가맹 / 회원 상담 / 채용 지원**의 세 가지 정적 폼이 있습니다. SaaS 이용 문의, 오류 및 불편사항은 별도 SaaS 서비스 안에서 접수합니다. 각각 별개의 Netlify Forms 목록에 저장되며, 기존 창업 폼 이름은 유지합니다.

| 구분 | Netlify 폼 이름 | 페이지 앵커 |
| --- | --- | --- |
| 창업·가맹 | `daily-multigym-inquiry` | `#franchise-inquiry` |
| 회원 상담 | `daily-multigym-member` | `#member-inquiry` |
| 채용 지원 | `daily-multigym-recruitment` | `#recruitment-inquiry` |

1. Netlify의 **Add new project → Import an existing project**에서 GitHub 저장소 `1115sinb-ai/daily-multigym`을 선택합니다.
2. 브랜치는 `main`, **Build command는 비워두고**, **Publish directory는 `.`**(저장소 루트)로 설정합니다. `netlify.toml`에도 설정되어 있습니다.
3. Netlify 프로젝트의 **Forms → Enable form detection**을 활성화하고 최신 커밋을 배포합니다.
4. 사이트의 `#contact` 섹션에 있는 위 **세 가지 폼**이 모두 **Forms** 목록에 나타나는지 확인합니다. 모두 정적 HTML에 `data-netlify`, `form-name`, `subject`, `category` 및 `bot-field` 허니팟을 포함합니다.
5. **Forms → Submission notifications → Add notification → Email notification**에서 `service@dailymultigym.com`을 수신자로 지정하고, 알림 범위에 세 가지 폼을 모두 포함하거나 폼별 알림을 추가합니다. 소스 코드만 변경해서 이메일 알림이 자동 설정되는 것은 아닙니다.
6. 배포 후 담당자가 승인한 테스트 데이터를 각 유형으로 한 번씩 제출하여 **Netlify Forms의 해당 목록과 Gmail 알림**을 확인합니다. 이 코드 변경 과정에서는 실제 문의를 전송하지 않았습니다.
7. Mailplug DNS로 커스텀 도메인을 연결할 때 웹용 A/CNAME만 Netlify 권장값으로 변경하고, **Google Workspace MX/SPF/DKIM/TXT는 유지**합니다.

세 폼 모두 `POST /thank-you.html`로 정상 제출합니다. 제출 이벤트를 가로채거나 가짜 성공 상태를 만들지 않으며, 브라우저 필수 항목·이메일 검증과 Netlify의 실제 응답을 사용합니다. Netlify가 아닌 로컬 정적 서버에서는 접수가 작동하지 않습니다. 공통 완료 페이지는 접수 안내이며 체험 예약, 채용 확정 또는 이메일 발송 완료를 의미하지 않습니다.

### 문의 링크와 접근성

- JavaScript가 없어도 세 폼이 모두 보이고 일반 HTML 폼으로 제출할 수 있습니다. JS가 켜지면 문의 유형별 탭으로 바뀝니다.
- 탭은 `role="tablist"`, `aria-selected`, `aria-controls`를 사용하고 좌우 방향키·Home·End·Enter·Space로 조작할 수 있습니다. 탭 간 전환 시 작성한 내용은 지우지 않습니다.
- 회원 CTA 예시: `href="#member-inquiry" data-inquiry-kind="member" data-inquiry-branch="수원인계점" data-inquiry-interest="무료 체험"`.
- 채용 CTA 예시: `href="#recruitment-inquiry" data-inquiry-kind="recruitment" data-inquiry-role="코치"`.
- 지점 선택값: `수원인계점`, `분당야탑점`, `용인수지점`, `수원역점`, `강서마곡점`. 뒤의 세 곳은 입점 예정이며 상담 신청을 예약 또는 오픈 확정으로 표현하지 않습니다.
- 회원 관심 항목: `무료 체험`, `회원권`, `이벤트·프리세일`. 지원 직무: `지점장`, `코치`, `운영직`. 이력서 업로드는 요청하지 않습니다.
- CTA의 명시적인 선택값만 변경합니다. 성함·연락처·이메일·문의 내용 등을 자동으로 초기화하지 않습니다. 직접 앵커로 접근해도 맞는 폼을 열며, 동작 줄이기 설정을 존중합니다.

### 개인정보 운영 확인

문의 목적에 필요한 항목만 수집하며 성함·이메일은 필수, 연락처는 선택입니다. 각 폼에 이용 목적·수집 항목·보유기간·동의 거부에 관한 안내가 있습니다. **문의 처리 완료 후 3개월**이라는 기존 보유기간은 실제 운영 정책과 일치하는지 배포 전 확인해야 합니다. Netlify 제출 기록, 알림 이메일, 별도로 내려받은 자료의 삭제 관리는 운영자가 수행해야 하며 코드가 자동으로 삭제하지 않습니다. 운영 주체 및 개인정보 처리방침, 처리 위탁·국외 이전 등 필요한 추가 안내도 실제 운영에 맞춰 검토해야 합니다.
