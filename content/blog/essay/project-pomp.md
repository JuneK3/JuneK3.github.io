---
title: Project POMP
date: 2021-03-07 17:03:81
category: essay
thumbnail: { thumbnailSrc }
draft: false
---

# Project POMP 정리

## 프로젝트를 시작하게 된 이유

ICPC Sinchon 운영진 활동중에 캠프 참가자 분들께 문자를 발송해야 하는 일이 많았는데

일일이 손으로 보내는 불편함을 해소하고자 다수에게 특정 문자를 일괄적으로 보낼 수 있는 자체 서비스를 제작하게 되었다.

문자 서비스 제작을 마치고 팀원들과 다른 프로젝트를 진행하게 되었는데 내가 제출한 구글 폼을 확인 할 수 있으면 좋겠다는 팀원의 아이디어를 시작으로 POMP 프로젝트를 시작하게 되었다.

ICPC Sinchon 운영진 활동중에 개발에 관심이 있는 분들을 만나서 같이 프로젝트를 하게 될 줄은 상상도 하지 못했는데 정말 좋은 팀원들을 만나서 즐겁게 개발 할 수 있었던 것 같다.

지금까지는 튜토리얼 강의나 클론 코딩 강의를 보고 혼자서 개발 공부를 해왔고 POMP처럼 여러명이 협업해서 프로젝트를 해본 적이 없었다. 

처음 경험해 본 협업 프로젝트인만큼 프로젝트를 진행하면서 겪었던 경험들을 정리해볼 생각이다.


## POMP?

POMP는 자신이 작성하고 제출한 구글 폼을 폼이 닫힌 후에도 확인 할 수 있게 해주는 서비스이다.

폼을 제출하고 나서 폼 배포자가 폼을 닫아버리면 제출 후 수정가능한 폼이라도 내가 제출한 폼을 확인 할 수 없게 된다.

구글 폼 기능중에 내가 제출한 폼의 사본을 메일 주소로 보낼 수 있는 기능이 있지만 폼을 배포한 사람이 그 기능을 넣지 않으면 내가 제출한 폼의 내용을 확인 할 수 있는 방법이 없다.

폼을 어떻게 하면 저장할 수 있을까 고민하다가 구글 익스텐션을 도입하기로 했고, 익스텐션에서 제출한 폼의 html문서를 서버로 보내 서버에서 데이터를 가공 후 DB에 저장하는 방식으로 구현하기로 했다.

로그인 기능으로 유저에 따라 폼을 저장하게 해야 한다고 생각했고, POMP 구글 익스텐션에서 로그인 후에 폼 저장 기능을 켜고 폼을 제출하면 POMP 홈페이지에서 DB에 저장된 데이터를 렌더링해서 확인 할 수 있도록 했다.

![pomp_project](https://user-images.githubusercontent.com/35721370/110233356-c9904880-7f66-11eb-961b-cb0cdd27bc05.png)


## 역할 분담

처음에는 역할 분담을 3분류로 나누어서 하기로 했는데

- 프론트 (1명) : 로그인 페이지, 메인 페이지 구현, 백엔드에서 받은 데이터 렌더링
- 백엔드 (1명) : 로그인 및 회원가입 구현, API 라우터 구현
- 크롬 익스텐션 개발 (1명) : 크롬 익스텐션 제작 및 크롤링(데이터 가공) 서버 부분 담당

각자 잘하는 분야도 다르고 도중에 막힌 경우 서로 도우면서 진행하다 보니 맡은 역할을 정확하게 분리하지는 못할 것 같다.

프론트 부분은 React를 이용해서 구현했고 팀원들이 hooks를 모르는 상황이었기 때문에 class형 컴포넌트로 코드를 작성했다. 반응형 디자인을 적용하기 위한 작업도 포함되었고, 페이지 설계를 위한 디자인 작업도 병행했다.

백엔드는 팀원들 모두 express를 알고 있어서 express로 구현하기로 했고, 로그인과 회원가입에는 passport를 도입했다.

데이터베이스는 팀원들이 그나마 익숙하게 사용하고 있던 MySQL을 이용하기로 했고, 내가 SQL문에 익숙하지 않은 상태여서 라우터 부분은 sequelize ORM을 이용하여 작성했다.

익스텐션은 크롤링 서버에 html 문서를 string으로 전달했는데

크롤링 서버에서는 cheerio 라이브러리를 이용해서 html 문서에서 데이터를 추출했다.

크롤링 부분은 처음부터 참여한게 아니라 중간부터 참여했고 추출한 데이터를 DB에 어떤 형식으로 저장할것인가를 함께 고민했다.


## 폼 데이터를 어떻게 저장했는가

데이터를 어떻게 저장하는지는 직접 폼을 제출해보면서 확인해보면 될 것 같다.

일단 저장할 폼을 준비해봤다.

<img width="949" alt="kakao-form" src="https://user-images.githubusercontent.com/35721370/110233354-c8f7b200-7f66-11eb-9d8f-adb4da5ceca0.png">

[pomp.leed.at](https://pomp.leed.at/)에서 회원가입을 한 후에

[크롬 익스텐션](https://chrome.google.com/webstore/detail/pomp/gmajhmdbmhadglgnommlpinilbaenalb?hl=ko)을 설치하고 나서 로그인을 해야 한다.

크롬 익스텐션에서 로그인을 마치고 나서

<img width="909" alt="exlogin" src="https://user-images.githubusercontent.com/35721370/110233351-c7c68500-7f66-11eb-91f6-06363c358087.png">

<img width="889" alt="exlogined" src="https://user-images.githubusercontent.com/35721370/110233352-c85f1b80-7f66-11eb-88e9-5f13c543a8a3.png">

저장 기능을 ON한 상태로 제출하기만 하면 된다.

<img width="887" alt="submit" src="https://user-images.githubusercontent.com/35721370/110233357-c9904880-7f66-11eb-858a-63505d4c1835.png">

<img width="885" alt="complete" src="https://user-images.githubusercontent.com/35721370/110233346-c5fcc180-7f66-11eb-8a96-35a81f7511dc.png">

pomp.leed.at과 pomp 익스텐션의 로그인 상태를 동기화 시켰기 때문에

pomp 페이지에서 따로 로그인 하지 않아도 로그인이 반영되어 있다.

반대로 익스텐션이나 pomp페이지에서 로그아웃을 하면 모두 로그아웃 상태가 반영된다.

pomp.leed.at에 접속하게 되면 바로 메인 페이지로 redirect되게 되는데,

메인 페이지에서 내가 제출한 폼을 확인해 볼 수 있다.

<img width="948" alt="main-page" src="https://user-images.githubusercontent.com/35721370/110233355-c8f7b200-7f66-11eb-833a-1393528db910.png">

폼을 클릭하게 되면 디테일 페이지로 넘어가서 렌더링 된 데이터를 확인할 수 있다.

<img width="948" alt="detail1" src="https://user-images.githubusercontent.com/35721370/110233348-c72dee80-7f66-11eb-8eed-536aa54b3604.png">

<img width="948" alt="detail2" src="https://user-images.githubusercontent.com/35721370/110233350-c7c68500-7f66-11eb-9c71-4eb86e7839e0.png">

이제 데이터가 어떻게 저장되었는지 확인해 보자.

```json
[
  {
    "desc": "본 설문은 2/28(일) 대회 이후 진행되는 스트리밍 중 kakao 기업 소개 및 Q&A 파트에서 다뤄질 질문에 대한 사전 조사입니다.이 설문을 제출해주신 분들 중 5명을 추첨하여 만원 상당의 기프티콘을 발송해 드릴 예정이니 많은 참여 부탁드립니다.2월 17일 23시 59분까지 제출 가능하며, 응답 수정이 가능하니 참고하시기 바랍니다. ",
    "type": -1,
    "title": "kakao 후원 세션 질문 사전조사",
    "formUrl": "https://docs.google.com/forms/d/e/1FAIpQLScFVi0IAiWeRtywJaM1pM6duIIrDV2U5uEcWpspZk2zL-Kfbg/viewform?fbzx=4113599779061987264"
  },
  {
    "ans": "홍익대학교",
    "desc": "",
    "list": [
      "서강대학교",
      "숙명여자대학교",
      "연세대학교",
      "이화여자대학교",
      "홍익대학교"
    ],
    "type": 2,
    "title": "학교 *"
  },
  {
    "ans": "김경근",
    "desc": "",
    "list": "",
    "type": 0,
    "title": "이름 *"
  },
  {
    "ans": "01012345678",
    "desc": "연락처는 기프티콘 발송을 위해 수집합니다.",
    "list": "",
    "type": 0,
    "title": "연락처 *"
  },
  {
    "ans": "카카오 추천팀에서는 어떤일을 하나요?",
    "desc": "자유롭게 작성해주시되, 질문이 여러개인 경우 번호로 구분하여 작성해 주세요. 감사합니다.",
    "list": "",
    "type": 1,
    "title": "질문 *"
  }
]
```

폼의 각 섹션을 기준으로 제목과 설명, 선택지와 유저가 제출한 답, 섹션이 단답형인지 객관식인지, 어떤 형태인지를 나타내는 타입까지 포함되어 있는 것을 확인 할 수 있다.

폼 데이터는 각 섹션들의 배열로 저장했고, 어떤 유저가 제출했는지 구별할 수 있도록 로그인 동기화를 위해 사용했던 uuid값을 따로 저장하게 했다.

위에서 제출했던 폼에는 단답형과 장문형, 객관식 선택으로만 구성되어 있었는데, 이외에도 구글 폼에서 지원하는 다양한 포맷들도 데이터 추출후 DB에 저장할 수 있게 했다.


## 배포는 어떻게 했는가

프로젝트가 어느정도 완성 되고 나서 배포에 대한 부분을 고민하게 되었는데

나는 배포쪽 지식이 거의 전무해서 다른 팀원에게 의지할 수 밖에 없었다.

배포는 docker와 nginx를 이용해서 클라우드 서버에 배포했다.

처음에는 아니었지만 현재는 DB와 백엔드 부분을 분리한 상태다.

로그인 세션과 폼 데이터를 같은 DB서버에 저장하는 방식인데,

로그인과 로그아웃을 할 때마다 DB서버에서 세션을 저장하고 지우기 때문에 DB서버에 무리를

주는 방식이라는 점을 뒤늦게 깨달았다.

팀원들과 논의해봐야 하겠지만 개인적으로 로그인 세션을 폼 데이터를 저장하는 DB서버와 분리하여 메모리 DB에 따로 저장하는 방식을 고민중이다.


## 나는 어떤 역할을 맡았는가

일단 나는 백엔드 부분을 메인 역할로 맡았고 프론트 부분 특히 React 부분을 많이 도왔던 것 같다.

백엔드 부분도 나 혼자 한게 아니라 팀원들과 함께 작업했다.

위에서 설명했던 폼 데이터 모델뿐만 아니라 유저 모델을 팀원들과 같이 설계했다.

passport를 도입해서 로그인과 회원가입을 구현했는데 kakao와 google계정으로도 로그인 할 수 있게 했다.

passport 도입 부분은 제로초님의 노드교과서를 많이 참고했던 것 같다.

로그인의 경우 세션쿠키를 브라우저에 전달하고 세션을 MySQL 서버에 저장하는 방식으로 구현했다.

팀원들이 이전까지는 ejs나 pug같은 템플릿엔진을 이용해서 프론트를 구현해왔기 때문에 리액트의 프론트 서버와 백엔드의 API서버와 통신하는 방식에 대해 구체적으로 알지 못하는 상태였고, 이 부분은 이전에 내가 따로 튜토리얼 강좌를 보고 보일러플레이트를 제작해본 경험을 바탕으로 구현할 수 있었다.

폼의 내용이 되는 섹션별 컴포넌트를 팀원들과 같이 작업했고, 이외에 로그인 페이지나 메인 페이지 부분도 팀원들과 함께 작업했다.

프론트 서버와 백엔드 서버의 포트번호가 다르기 때문에 React에서 proxy설정을 따로 해줌으로써 데이터를 원활하게 주고 받을 수 있도록 했다.

배포단계에서는 리액트 proxy부분을 걷어내고 nginx에서 proxy처리를 하는 방식으로 바꿨다.

익스텐션도 처음부터 개발에 참여하지는 못했지만 pomp 페이지와 익스텐션간의 로그인 동기화 부분을 팀원들과 같이 구현했다.

익스텐션 개발 경험이 없어서 프로젝트 초반에 다같이 헤멨던 것 같다.

결국 익스텐션 부분은 익스텐션을 담당했던 팀원이 대부분 해결해줘서 도중에 프로젝트가 막히지 않고 계속 진행될 수 있었다.


## 직면했던 어려움들과 해결한 방법들

제작하면서 정말 많은 어려움이 있었지만 내가 직면했던 문제들을 정리해보고자 한다.

### 로그인 세션 저장 문제

프로젝트 초반에 인증 시스템의 대부분을 구현하고 나서 session을 MySQL서버에 저장하는 과정을 진행하다가 발생했던 오류이다.

프론트 부분에 React를 연결하기 전에는 로그인 테스트를 위해 템플릿 엔진을 이용하고 있었다. 

로그인하고 나서 로그인이 반영된 페이지로 전환이 일어나지 않는 문제가 발생했고, 이상하게 새로고침을 해야 로그인이 반영되는 상황이 발생했다.

정말 당혹스러웠던 점은 로그인 이후에 정상적으로 반영될 때도 있었고 새로고침을 해야 반영되는 상황이 번갈아서 발생한다는 점이었다.

처음에는 passport상의 문제로 생각하고 접근했지만 오랜 고민 끝에 DB에 세션이 저장되기 전에 redirect과정을 실행해서 로그인이 제대로 반영되지 않았다는 것을 알게되었다.

이 부분은 로그인 코드에 세션이 DB에 저장되고 나서 redirect를 하게끔 콜백함수를 넣어줌으로써 해결할 수 있었다.

```js
// Before
return req.login(user, loginError => {
  if (loginError) {
    console.error(loginError)
    return next(loginError)
  }
  // 세션 쿠키를 브라우저로 보낸다.
  return res.redirect('http://localhost:8001', 301)
})

// After
return req.login(user, loginError => {
  if (loginError) {
    console.error(loginError)
    return next(loginError)
  } else {
    // 세션 쿠키를 브라우저로 보낸다.
    req.session.save(err => {
      if (err) {
        console.log(err)
      }
      res.redirect('/')
    })
  }
})
```

### 익스텐션 개발

익스텐션 개발 과정 이야기하기

추후 보충 설명

### 익스텐션과 서버, 익스텐션과 클라이언트의 통신

웹페이지와 익스텐션에서 로그인 상태 동기화 하기

uuid를 도입하여 해결함

추후 보충설명

### 폼이 여러 페이지인 경우

익스텐셩의 백그라운드에서 따로 처리해서 크롤링서버로 전달

추후 보충설명

### validation error: 동일한 이메일 존재 오류 해결

각종 테스트를 해보면서 미처 생각하지 못했던 부분에서 오류가 발생하고 있었는데

local로 만든 계정과 동일한 이메일로 kakao나 google로 로그인하는 경우 혹은 그 반대의 경우를 막아야 한다는 점을 놓치고 있었고 이 부분 때문에 passport에서 validation error가 발생하고 있었다.

보안문제를 고려했을 때 회원가입한 정보대로 로그인을 강제해야 한다는 생각을 하게 되었고,

실제로 tistory에서 동일한 오류를 잡아주는 것을 보았기 때문에 POMP에서도 비슷하게 해결하고자 했다.

![tistory](https://user-images.githubusercontent.com/35721370/110233358-ca28df00-7f66-11eb-8a87-8b7dd45938d3.png)

같은 이메일이지만 회원가입한 정보와 다른 경우는 각 Strategy에 아래와 같은 코드를 통해 쉽게 걸러낼수 있었다.

```js
const sameEmailUser = await User.findOne({
  where: { email: profile._json.kakao_account.email },
})
if (sameEmailUser) {
  // 카카오로 가입하진 않았지만 local or 구글 계정이 동일한 이메일로 존재하는 경우 처리
  sameEmailUser.setDataValue('duplicate', 'yes')
  // console.log(sameEmailUser)
  return done(null, sameEmailUser, {
    loginError: true,
    message: "Please Login with Method you've joined Pomp",
  })
}
```

passport.authenticate 함수에 done 콜백함수를 전달하고 나서 이메일 중복 문제가 발생했을 경우 authenticate 함수내에서 프론트에 오류 상황에 대한 응답을 하고 싶었다.

```jsx
router.get(
  '/kakao/callback',
  passport.authenticate('kakao', {
    failureRedirect: '/',
  }),
  (req, res) => {
    return res.send(
      '<script>window.location.href="http://pomp.leed.at/forms";</script>'
    )
  }
)
```

여기서 1차적으로 막히게 되었는데 authenticate 함수내에서 express의 res객체에 접근하지 못했기 때문이다.

가능한 방법을 찾다가 가까스로 제로초님의 노드교과서에서 배웠던 미들웨어 확장패턴이 기억을 해내서 미들웨어 안에서 passport의 authenticate 함수를 호출할 수 있도록 미들웨어를 확장하여 문제를 해결할 수 있었다.

하지만 2차적으로 문제가 발생했는데 미들웨어 확장 이후에 로그인이 되지 않는 문제였다.

미들웨어 확장패턴외에 res객체를 사용할 수 있는 방법이 생각나지 않아 확장패턴을 고수할 수 밖에 없었는데 마땅한 방법이 생각이 안나서 해결방법을 오랜시간 동안 고민했던 것 같다.

해결방법은 local Strategy의 authenticate방식에서 얻을 수 있었는데 req.login으로 Serialize user하는 코드를 추가함으로써 해결할 수 있었다.

지금까지 kakao나 google 로그인의 경우 passport.authenticate 함수내에서 req.login 함수를 호출하지 않는 방식으로 코드를 작성했는데 생각해보면 따로 콜백함수를 달아주지 않았기 때문에 자동으로 Serialize user를 해줬던 것 같다.

이메일 중복상황을 체크하고 미들웨어를 확장하면서 콜백함수가 생겼기 때문에 local방식과 마찬가지로 req.login을 호출해야 했던 것이다. 

```js
router.get('/kakao/callback', function(req, res, next) {
  passport.authenticate('kakao', function(authError, user, info) {
    if (authError) {
      console.error(authError)
      next(authError)
    }
    if (user.dataValues.duplicate) {
      return res.json(info)
    }
    return req.login(user, loginError => {
      if (loginError) {
        console.error(loginError)
        return next(loginError)
      } else {
        // 세션 쿠키를 브라우저로 보낸다.
        req.session.save(err => {
          if (err) {
            console.error(err)
          }
          return res.send(
            '<script>window.location.href="http://pomp.leed.at/forms";</script>'
          )
        })
      }
    })
  })(req, res, next)
})
```

여기서 passport에 대한 이해도가 많이 부족하다는 점을 깨달았다. 또한 무턱대고 passport를 도입한 것 때문에 다른 팀원들도 힘들게 했던 것 같다는 생각이 들었다.

프론트 부분에도 tistory와 비슷하게 동일한 계정이 이미 존재한다는 사실을 알려주는 컴포넌트를 보여주게 해서 validation error 처리를 마무리 할 수 있었다.

![validation-error](https://user-images.githubusercontent.com/35721370/110233359-ca28df00-7f66-11eb-9f63-be7fcc1ac095.png)


이외에도 더 있지만 제때 정리하지 못해서 잊혀진 것들이 많은 것 같아서 아쉽다.

해결여부와 관계없이 직면했던 문제들을 정리하는 습관을 들여야 겠다는 생각이 들었다.


## POMP에서 느꼈던 점

### 배포에 대한 공부 필요

일단 내가 배포에 대해 거의 알고 있는게 없어서 모든 배포를 팀원 한명이 담당해야 했는데

팀원에게 배포비용을 모두 부담하게 하고 있어서 이 점에 대해서는 미안함을 느끼고 있다.

인프라와 클라우드 공부가 필요하다고 느끼게 되었고, 간단한 토이프로젝트라도 스스로 배포과정까지 경험해보려고 노력하고 있다.

### 프로젝트에 대한 이해 부족

프로젝트를 협업을 통해 진행했기 때문에 POMP에 대한 내용을 질문받게 되었을 때 크롬 익스텐션 부분과 크롤링부분은 내가 기여한 부분이 적기 때문에 제대로 대답하지 못 할 것 같다

내가 작성하지 않았던 코드들도 살펴볼 생각이다.

### 커뮤니케이션의 중요성

이 프로젝트를 협업하면서 나름대로 느꼈던 점은 팀프로젝트에서 가장 중요한 것은 커뮤니케이션이라는 점이다.

프로젝트 초반에 개인프로젝트 하듯이 접근을 하게 되었던 것 같은데 무턱대고 인증과정에 passport를 도입했고, sequelize를 이용해서 마음대로 코드를 작성기도 해서 다른 팀원들로 하여금 백엔드 작업을 할 때 적지 않은 피로감을 느끼게 만들었던 것 같다.

내가 알고 있는 기술을 무턱대고 도입하는게 아니라 다른 팀원들을 설득시키면서 프로젝트를 진행해야 한다는 것을 깨달았고 팀프로젝트인 만큼 나에게 맞추기보다는 최대한 다른 팀원들에게 맞추는 것이 맞는 방식이라는 생각을 하게 되었다.

프론트 부분을 작업할 당시에도 나를 제외한 팀원들이 hooks에 익숙한 상태가 아니었기 때문에

이 때만큼은 내 의견을 고집하지 않고 최대한 팀원들에게 맞추려고 노력했다.

때문에 POMP의 프론트 부분은 class형 컴포넌트로 작성되어 있고 팀원들이 차츰 hooks에 적응하고 나서 부분적으로 hooks를 이용하여 코드를 작성했다. 

### 협업 방식

POMP 프로젝트를 진행하면서 원래 나누었던 역할대로 작업하는게 아니라 프로젝트 진행을 위해 막힌 부분을 함께 고민하고 같이 작업하게 되다 보니까 어떤 팀원의 경우 배포를 담당하면서 익스텐션, 크롤링 코드를 작성했고 백엔드 부분과 프론트 작업까지 같이 하게 되는 말그대로 전체 과정에 관여하게 되는 상황이 발생했다.

물론 이런 방식이 무조건  나쁘다는 것은 아니다. 하지만 나는 하나의 분야도 잘하기 어렵다고 생각하고 있고 개인적으로 풀스택 개발에는 회의적인 입장이어서 이런 방식대로 개발하는 것은 팀원 모두에게 피로감 느끼게 만든 것은 아닌가라는 생각이 들었다.

물론 인원 부족으로 인해 어쩔수 없는 상황이었지만 프로젝트 이후에 좀 더 확실하게 분업화 된 협업에 대한 갈증이 생기게 되었고 더 나은 협업방식에 대해 많이 고민하게 된 것 같다.

### 리팩토링

최대한 정상적으로 작동하는 것을 우선적으로 고려해서 코드를 작성하다 보니까 반복되는 코드들도 많고 개인적으로 코드들에 리팩토링 과정이 필요하다고 느끼고 있다. 

 JWT를 이용한 인증을 도입하는 것처럼 POMP에 사용했던 기술들 중에서 더 나은 방식으로 바꾸는 것도 고려중이어서 POMP 프로젝트는 아마 계속 진행 될 것 같다.

팀원들도 POMP 이후에 서로 다른 프로젝트들을 작업하고 있어서 나를 포함한 팀원들이 성장하는 만큼 POMP이 코드들도 계속 발전하게 될 것 같다.

## 마치며..

개인적으로 내가 부족했던 점이 많았다고 생각해서 함께 해준 팀원들에게 감사함을 느끼고 있다. POMP팀 모두 지금보다 성장해서 다음에도 같이 모여서 작업할 수 있으면 좋겠다.

프로젝트 때문에 같이 고생했던 팀원들 블로그를 홍보차 올려본다.

[https://cocosy.tistory.com/](https://cocosy.tistory.com/)

[https://blog.soga.ng/storyline](https://blog.soga.ng/storyline)

(Last updated: 2021.03.07)