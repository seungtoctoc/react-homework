homework-frontend


**계획 및 목표**


0. 깃허브 레포지토리 생성
    * 좋은 커밋 메시지로 자주 커밋
    * 계획 등 변경 시, 본 문서 수정

<br>

1. mongoose 모델 스키마 구성 - Campaign, Comment
    * data-collect folder
    * Comment가 Campaign을 참조
    * Comment의 대댓글, 대댓글 깊이 속성
        * 일반 댓글의 경우, 대댓글 - 자기 자신, 대댓글 깊이 - 1 로,
        * 해당 댓글의 대댓글의 경우, 대댓글 - 대댓글이 달린 댓글, 대댓글 깊이 2로 하자.

<br>

2. 와디즈 데이터 수집 (JS)
    * data-collect folder
    * 데이터를 수집하고 스키마에 저장
    * env 환경변수 사용

<br>

3. REST API 구성 (Express)
    * 가독성 좋은 코드 작성

<br>

4. 캠페인 리스트 (React)
    * 가독성 좋고 효율적인 컴포넌트 구성
