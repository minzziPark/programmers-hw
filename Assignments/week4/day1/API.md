# API 설계(URL, method)

1. **전체 유튜버 ‘조회’ GET /youtubers**
   - req : X
   - res : map을 전체 조회
2. **GET /youtuber/:id : id로 map에서 객체를 찾아서, 그 객체의 정보를 뿌려줌**
   - req : url → [params.id](http://params.id) ← map에 저장된 key 값을 전달
   - res : map에서 id로 객체를 조회해서 전달
3. **유튜버 “등록” → POST /youtuber**
   - req : body ← channelTitle, sub = 0, videoNum = 0 신규 유튜버 정보를 전달
   - res : “channelTitle님, 유튜브 생활을 응원합니다!”
4. **개별 유튜버 ‘삭제’ ⇒ DELETE /youtubers/:id**
   - req : [params.id](http://params.id)
   - res : “channelTitle님, 아쉽지만 다음에 또 뵙겠습니다.”
5. **전체 유튜버 “삭제” ⇒ DELETE /youtubers**
   - req : X
   - res : “전체 유튜버가 삭제되었습니다.”
6. 개별 유튜버 “수정” ⇒ PUT /youtuber/:id
   - req : [params.id](http://params.id), body ← channelTitle
   - res : “(이전)channelTitle님, 채널명이 (새로운)channelTitle로 변경되었습니다.”
