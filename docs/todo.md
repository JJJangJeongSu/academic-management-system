# 프론트엔드 기능 구현 Todo List

---

## 1. 로그인/인증 기능
- [x] 타입 정의
  - [x] User 타입 (학생/교수/관리자)
  - [x] Token 타입
- [x] Mock 데이터 구조
  - [x] 사용자 데이터
  - [x] 토큰 데이터
- [x] API 핸들러 구현
  - [x] 로그인 API (`POST /login`)
  - [ ] 사용자 정보 조회 API (`GET /me`)
  - [x] 로그아웃 처리
- [x] 인증 상태 관리
  - [x] 토큰 저장/관리
  - [ ] 권한별 접근 제어
  - [ ] 토큰 만료 처리

## 2. 과목 관리 기능
- [ ] 타입 정의
  - [ ] Subject 타입
  - [ ] UserSubject 타입
- [ ] Mock 데이터 구조
  - [ ] 과목 데이터
  - [ ] 수강신청 데이터
- [ ] API 핸들러 구현
  - [ ] 과목 목록 조회 (`GET /subjects`)
  - [ ] 과목 상세 조회 (`GET /subjects/:id`)
  - [ ] 수강신청 (`POST /subjects/:id/enroll`)
  - [ ] 수강신청 취소 (`DELETE /subjects/:id/enroll`)

## 3. 게시판 기능
- [ ] 타입 정의
  - [ ] Post 타입
  - [ ] PostList 타입
  - [ ] Comment 타입
- [ ] Mock 데이터 구조
  - [ ] 게시글 데이터
  - [ ] 댓글 데이터
- [ ] API 핸들러 구현
  - [ ] 게시글 목록 조회 (`GET /posts`)
  - [ ] 게시글 상세 조회 (`GET /posts/:id`)
  - [ ] 게시글 작성 (`POST /posts`)
  - [ ] 게시글 수정 (`PUT /posts/:id`)
  - [ ] 게시글 삭제 (`DELETE /posts/:id`)
  - [ ] 댓글 작성/수정/삭제

## 4. 성적 관리 기능
- [ ] 타입 정의
  - [ ] Grade 타입
  - [ ] SubjectGrade 타입
- [ ] Mock 데이터 구조
  - [ ] 성적 데이터
- [ ] API 핸들러 구현
  - [ ] 성적 조회 (`GET /grades`)
  - [ ] 성적 입력 (교수용) (`POST /grades`)
  - [ ] 성적 수정 (교수용) (`PUT /grades/:id`)

## 5. 출석 관리 기능
- [ ] 타입 정의
  - [ ] Attendance 타입
  - [ ] AttendanceRecord 타입
- [ ] Mock 데이터 구조
  - [ ] 출석 데이터
- [ ] API 핸들러 구현
  - [ ] 출석 체크 (`POST /attendance`)
  - [ ] 출석 현황 조회 (`GET /attendance`)
  - [ ] 출석 수정 (교수용) (`PUT /attendance/:id`)

## 6. 시간표 관리 기능
- [ ] 타입 정의
  - [ ] Schedule 타입
  - [ ] TimeSlot 타입
- [ ] Mock 데이터 구조
  - [ ] 시간표 데이터
- [ ] API 핸들러 구현
  - [ ] 시간표 조회 (`GET /schedule`)
  - [ ] 시간표 생성 (`POST /schedule`)
  - [ ] 시간표 수정 (`PUT /schedule/:id`)

## 7. 파일 관리 기능
- [ ] 타입 정의
  - [ ] File 타입
  - [ ] UploadResponse 타입
- [ ] Mock 데이터 구조
  - [ ] 파일 데이터
- [ ] API 핸들러 구현
  - [ ] 파일 업로드 (`POST /files`)
  - [ ] 파일 다운로드 (`GET /files/:id`)
  - [ ] 파일 삭제 (`DELETE /files/:id`)

## 8. 공통 기능
- [ ] 에러 처리
  - [ ] API 에러 처리
  - [ ] 네트워크 에러 처리
  - [ ] 권한 에러 처리
- [ ] 로딩 상태 관리
  - [ ] 로딩 스피너
  - [ ] 스켈레톤 UI
- [ ] 테스트
  - [ ] 단위 테스트
  - [ ] 통합 테스트
  - [ ] E2E 테스트

---

각 기능은 다음 순서로 구현됩니다:
1. 타입 정의
2. Mock 데이터 구조
3. API 핸들러 구현
4. 에러 처리
5. 테스트

현재 진행 상황:
- [x] 로그인/인증 기능: 타입 정의, Mock 데이터 구조, API 핸들러 구현, 로그아웃, 토큰 저장/관리 완료
- [ ] 권한별 접근 제어 구현 중
- 다음 단계: 권한별 접근 제어 구현 및 테스트

---
