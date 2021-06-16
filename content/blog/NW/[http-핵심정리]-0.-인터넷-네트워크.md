---
title: [HTTP 핵심정리] 0. 인터넷 네트워크
date: 2021-06-16 12:06:53
category: NW
thumbnail: { thumbnailSrc }
draft: false
---

## HTTP를 공부하는 이유

이전까지 나는 개발자의 자유를 보장한다는 점에 매력을 느껴 NodeJS와 Express로 백엔드 개발을 해왔다.

하지만 다른 사람들과 팀 프로젝트를 하면서 이런 자유로움에 피로를 느끼게 되었는데, 각자 프로젝트를 구성하는 방식이나 코드를 작성하는 방식이 다르다 보니까 팀 프로젝트를 하면서 이를 통일하는 과정이 수반되게 되었다.

협업에 있어서 개발자의 자유를 보장하는 것보다는 오히려 규칙을 강제하는 것이 더 낫다는 생각을 가지게 되었고 개발자에게 프로그램 작성 방식과 프로젝트를 구성하는 방식을 강제하는 NestJS나 Java의 Spring을 공부하기로 마음먹게 되었다. 

Spring입문을 위한 마땅한 강의들을 찾다가 우연히 김영한님의 강의들을 알게 되었는데, 강의도 최근에 찍은 것들이고 커리큘럼도 되게 마음에 들어서 [김영한님의 로드맵](https://www.inflearn.com/roadmaps/373)을 따라가기로 결정했다.

특이하게도 로드맵에는 HTTP에 대한 강의가 포함되었는데, 이 강의의 소개 영상을 보고 Spring을 공부하기에 앞서서 HTTP 개념을 확실하게 잡고 가야겠다는 생각이 들었다.

Express든 Spring이든 모든 백엔드 웹 프레임워크들은 HTTP를 기반으로 만들어졌고 실제로 HTTP의 울타리 안에서 작동한다.

앞으로 내 인생에 있어서 평생 하나의 프레임워크만 사용한다는 보장이 없고, 점점 기술 발전이 빨라지고 있는 상황에서 웹개발에 있어서 기초공사에 해당하는 HTTP 학습이 필수적이라는 생각이 들었다.

이 강의를 통해서 HTTP를 이전보다 더 확실하게 이해할 수 있겠다는 확신이 들었고 이 강의를 듣고 공부한 내용을 포스팅하기로 했다.

포스팅은 챕터별로 나누어서 할 생각이다. 포스팅 목차는 아래와 같이 예정되어 있다.

목차별 자세한 내용은 [김영한님의 강의](https://www.inflearn.com/course/http-%EC%9B%B9-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC)를 참고하면 된다.

0. 인터넷 네트워크

1. URI와 웹 브라우저 요청 흐름

2. HTTP 기본

3. HTTP 메서드

4. HTTP 메서드 활용

5. HTTP 상태코드

6. HTTP 헤더1 - 일반 헤더

7. HTTP 헤더2 - 캐시와 조건부 요청

강의 내용이 길어지게 되면 포스팅도 쪼개서 할 생각이라 포스팅이 더 길어질 수도 있을 것 같다.



## 인터넷 통신

![1 internet-network_pages-to-jpg-0007](https://user-images.githubusercontent.com/35721370/122154055-1f965580-ce9f-11eb-915e-56241dbf4a86.jpg)

가까이 인접해 있는 컴퓨터들끼리는 단순한 케이블 연결을 통해 응답을 주고 받을 수 있지만, 요청을 받고 응답을 해야하는 컴퓨터가 멀리 떨어져 있는 경우에는 인터넷 망을 이용해 통신해야 한다.

인터넷에서 내가 보낸 요청은 해저 광케이블이나 인공위성, 서버등 수많은 중간노드들을 거쳐 서버로 전달된다.

클라이언트가 보낸 요청은 대체 어떤 규칙을 통해 수많은 노드들을 거쳐 목적지까지 무사히 도착할 수 있는 걸까?



## IP(인터넷 프로토콜)

![1 internet-network_pages-to-jpg-0010](https://user-images.githubusercontent.com/35721370/122154102-32a92580-ce9f-11eb-8bba-d0d311e618ce.jpg)

인터넷에서는 IP(인터넷 프로토콜)라는  규칙을 통해 데이터가 전달되게 된다.

먼거리에 있는 서버에 요청을 보내기 위해서는 우선 IP주소를 부여받아야 하는데 인터넷 프로토콜은 지정한 IP주소에 데이터를 전달해준다.

![1 internet-network_pages-to-jpg-0012](https://user-images.githubusercontent.com/35721370/122154109-35a41600-ce9f-11eb-9b19-7d1bce2e6195.jpg)

IP에서는 데이터를 패킷이라는 통신 단위로 쪼개어 전달한다.

패킷에는 출발지와 목적지의 IP주소와 전송 데이터가 첨부되어 있는데

![1 internet-network_pages-to-jpg-0013](https://user-images.githubusercontent.com/35721370/122154115-389f0680-ce9f-11eb-9ebe-9a44579b3c15.jpg)

인터넷 망에 위의 형식의 패킷을 던지게 되면 인터넷 프로토콜 규약에 의해 목적지 IP로 갈 수 있는 중간 노드들을 찾아 패킷을 전송하여 목적지에 도착할 수 있다.

![1 internet-network_pages-to-jpg-0014](https://user-images.githubusercontent.com/35721370/122154120-3a68ca00-ce9f-11eb-8a72-ca8ef71c224c.jpg)

목적지에 도착하면 동일한 방식으로 응답 패킷을 출발지로 전송하게 된다.

이 때에도 IP규약에 의한 방식으로 패킷이 전달된다.

복잡한 인터넷망의 특성상 패킷이 거쳐가는 중간노드들이 달라질 수 있어서 요청과 응답이 거치는 중간노드들이 달라질 수 있다.



IP 방식대로 데이터를 전송한다면 무사히 목적지로 데이터를 전송할 수 있을 것 같지만 아래와 같은 문제점을 안고 있기 때문에 IP방식만으로 데이터를 전송하는데에는 한계가 있다.

![1 internet-network_pages-to-jpg-0016](https://user-images.githubusercontent.com/35721370/122154136-405eab00-ce9f-11eb-976e-3610943a05a2.jpg)



![1 internet-network_pages-to-jpg-0017](https://user-images.githubusercontent.com/35721370/122154138-418fd800-ce9f-11eb-8d59-9767ab2e73fc.jpg)

- 비연결성: 패킷을 받을 대상이 없거나 서비스 불능 항태여도 패킷을 전송한다.

IP에서는 목적지에 해당하는 컴퓨터(서버)가 패킷을 받을 수 있는 상태인지 알 수 없다. 

![1 internet-network_pages-to-jpg-0018](https://user-images.githubusercontent.com/35721370/122154139-42286e80-ce9f-11eb-814c-b131e862fc1d.jpg)

- 비신뢰성: 중간에 패킷이 사라지거나 패킷이 순서대로 목적지 IP에 전달되었는지 알 수 없다.

중간노드에 문제가 생기는 경우 패킷이 소실될 수 있는데 이 경우에도 패킷이 제대로 전송되었는지 알 수 없다.

![1 internet-network_pages-to-jpg-0019](https://user-images.githubusercontent.com/35721370/122154140-42c10500-ce9f-11eb-9f6e-899ae963bb90.jpg)

데이터의 크기가 큰 경우 약 1500바이트를 기준으로 여러 패킷으로 쪼개서 전송하게 되는데

복잡한 인터넷 망의 특성상 패킷들이 다른 경로로 전송될 수 있어 전송 순서대로 목적지에 도착하지 않을 수 있다.

목적지에 해당하는 컴퓨터에서는 패킷의 순서가 바뀌었는지를 판별할 수 없다.



- 프로그램 구분

같은 IP를 사용하는 서버에서 통신하는 애플리케이션이 둘 이상일 경우 전송할 패킷들이 어떤 서버가 받아야 하는 패킷인지 구별할 수 없다.

IP방식만으로는 위에서 소개한 문제점들을 해결할 수 없기 때문에 IP는 TCP방식과 함께 사용된다.



## TCP와 UDP

![1 internet-network_pages-to-jpg-0021](https://user-images.githubusercontent.com/35721370/122166037-021fb680-ceb4-11eb-9c88-3df60c75be07.jpg)

IP는 인터넷 계층, TCP와 UDP는 전송계층에 해당한다.

전송계층의 TCP는 인터넷 계층의 IP를 보완하는 역할을 한다.

![1 internet-network_pages-to-jpg-0023](https://user-images.githubusercontent.com/35721370/122166039-02b84d00-ceb4-11eb-881f-c1cf89447a10.jpg)

채팅프로그램에서 채팅을 보내는 상황이라고 가정하고 전송계층을 포함한 데이터 전송과정을 정리해보자.

우선 전송하고자 하는 데이터를 생성한 후 SOCKET라이브러리를 통해 OS에 전달한다.

OS에서는 TCP정보를 생성하여 메시지 데이터를 포함시킨다.

그 다음 IP 패킷을 생성하여 그 안에 TCP 데이터를 포함시킨다.

마지막으로 IP패킷을 이더넷 프레임으로 감싸 인터넷 망으로 전송시킨다.

이더넷 프레임에는 LAN카드에 포함된 MAC주소 같은 물리적 정보가 포함된다.

![1 internet-network_pages-to-jpg-0025](https://user-images.githubusercontent.com/35721370/122166042-0350e380-ceb4-11eb-8841-e687528443be.jpg)

TCP정보로 출발지 PORT와 목적지 PORT, 전송제어, 순서, 검증정보가 포함된다.

PORT에 대한 정보를 포함하면서 동일한 IP를 사용하는 프로그램들을 구별할 수 없다는 문제를 해결하게 되었다.

![1 internet-network_pages-to-jpg-0026](https://user-images.githubusercontent.com/35721370/122166046-0350e380-ceb4-11eb-911a-58ccb716f7df.jpg)

TCP는 일단 데이터를 전송이 가능한지 여부를 확인한 후에 데이터 전송을 하는 연결지향 프로토콜이다.

데이터 전송에 앞서서 3-way handshake라는 가상 연결을 시도하여 데이터 전송이 가능한지 여부를 판단한다.

 3-way handshake는 실제 물리적 연결이 아닌 논리적 연결이며 성공했어도 중간노드들에 해당하는 서버들에 대한 구체적인 연결여부는 알 수 없다.

TCP는 데이터 전달을 보증하여 데이터가 누락되었는지 여부를 알 수 있게 한다.

또한 순서를 보장하여 IP가 안고 있던 대부분의 문제들을 해결해준다.

TCP는 신뢰할 수 있는 프로토콜로써 대부분 TCP를 채택하여 사용하고 있다.

![1 internet-network_pages-to-jpg-0027](https://user-images.githubusercontent.com/35721370/122166049-03e97a00-ceb4-11eb-9639-0888b8ae57d5.jpg)

 3-way handshake는 위의 그림처럼 총 3번의 신호를 주고 받으면서 이루어지는데, 양쪽 모두 SYN와 ACK신호를 주고 받게 된다.

 3-way handshake가 성공했을 때 데이터 전송을 시작하게 되며 실패시 데이터 전송이 이루어지지 않는다.

![1 internet-network_pages-to-jpg-0028](https://user-images.githubusercontent.com/35721370/122166029-ffbd5c80-ceb3-11eb-9bc0-ecadd03bd99a.jpg)

TCP에서는 서버에서 데이터를 잘 받았음을 알려주는 패킷을 전송하게 한다.

만약 응답 패킷이 오지 않는다면 문제가 발생했음을 알 수 있게 된다.

![1 internet-network_pages-to-jpg-0029](https://user-images.githubusercontent.com/35721370/122166034-00ee8980-ceb4-11eb-8b16-e11b7f5e41f4.jpg)

전달 받은 패킷의 순서에 문제가 발생했을 경우 내부 최적화에 따라 다소 차이가 있을 수 있겠지만 대부분 문제가 발생한 패킷부터 재전송하도록 요청하게 된다.

이는 TCP패킷에 순서 정보가 포함되어 있기에 가능하다.

![1 internet-network_pages-to-jpg-0030](https://user-images.githubusercontent.com/35721370/122166036-01872000-ceb4-11eb-8f72-7b68726375a2.jpg)

UDP는 TCP와는 다르게 IP와 거의 차이가 없는 백지상태의 프로토콜이다.

TCP와 비교하였을 때 데이터 전송 시간이 빠른 편인데 TCP는 3-way handshake에 시간을 소모하게 되고 패킷에 TCP 정보 같은 추가 정보들이 포함되어 데이터의 양이 늘어나 전송속도가 느려지게 된다.

UDP는 IP에 PORT에 대한 정보와 전송된 데이터가 변형이 되지 않았는지 확인할 수 있게 해주는 체크섬 값이 더해진 프로토콜이다.

예전에는 신뢰할 수 없는 정보들이나 영상 스트리밍에 UDP가 사용된다고 알려졌으나 최근에는 영상 스트리밍 같은 경우에도 대부분 TCP를 채택하여 사용한다고 한다.

이렇게 보면 거의 대부분을 TCP가 점유하고 있는 상황에서 UDP가 거의 사용되지 않을 것 같지만, 프로토콜을 자체적으로 최적화해야 하는 경우에는 TCP가 아닌 UDP를 사용하게 된다. TCP의 경우 이미 대부분의 기능이 구현되어 있고 이미 대부분의 시스템들이 TCP를 기반으로 구축되어 있기에 전송속도를 빠르게 하기 위해 더 최적화하기가 힘들다고 한다.

UDP는 백지상태의 프로토콜이라서 애플리케이션 단계에서 최적화가 가능하다.

실제로 최근 HTTP3에서는 UDP를 채택하였는데 3-way handshake 같은 과정처럼 기존 TCP에 수반되는 과정들의 성능을 더 최적화하기 위함이라고 한다.

위와 같은 이유로 최근 각광받고 있으며 앞으로의 활용 가능성도 무궁무진하기에 공부해둬서 손해보지는 않을 것 같다.



## PORT

![1 internet-network_pages-to-jpg-0035](https://user-images.githubusercontent.com/35721370/122191798-00fb8300-cece-11eb-8300-21e4c9849fb7.jpg)

한번에 여러 프로세스가 다른 서버와 통신해야 하는 경우에는 PORT번호로 프로세스를 구분하여 각각 필요한 서버에 패킷을 구별하여 보낼 수 있게 한다. 패킷에는 출발지와 목적지의 IP주소와 PORT번호가 포함되게 되는데 IP주소로 목적지를 탐색하고 PORT번호로 목적지의 어떤 프로그램으로 전송할지 결정하게 된다.

또한 패킷의 출발지 PORT정보를 통해 데이터 전송에 대한 응답을 출발지로 문제없이 전송할 수 있다.

![1 internet-network_pages-to-jpg-0036](https://user-images.githubusercontent.com/35721370/122191802-01941980-cece-11eb-875d-fdfc65e0be5e.jpg)

HTTP와 HTTPS와 같은 기본 포트번호들은 정해져 있어 다른 프로그램에 할당할 수 없지만, HTTP에 8080번 포트를 할당하는 등 다른 포트번호를 사용할 수도 있다. 아무 설정도 하지 않는다면 기본 포트 번호인 80번이나 443번으로 자동 할당되게 된다.



## DNS

![1 internet-network_pages-to-jpg-0038](https://user-images.githubusercontent.com/35721370/122191780-fd67fc00-cecd-11eb-9287-65816ba48c6e.jpg)
![1 internet-network_pages-to-jpg-0040](https://user-images.githubusercontent.com/35721370/122191788-ff31bf80-cecd-11eb-8c59-f48a8e68aca6.jpg)



![1 internet-network_pages-to-jpg-0041](https://user-images.githubusercontent.com/35721370/122191790-ffca5600-cecd-11eb-953f-2fbad9b43e13.jpg)

기억하기 힘든 긴 길이의 IP주소를 도메인에 할당하여 사용하는데, 도메인 네임과 IP주소 간의 변환과 IP주소 변경을 처리하기 위해 도메인 네임 서버를 이용한다.

![1 internet-network_pages-to-jpg-0042](https://user-images.githubusercontent.com/35721370/122191794-0062ec80-cece-11eb-81cb-c96ce49dcedd.jpg)

DNS 서버에 해당 도메인이 없는 경우 상위 DNS서버에 해당 도메인 네임을 요청하게 되는데 상위 서버와 하위 서버를 방문하여 해당 도메인 네임의 IP주소를 찾아 반환해준다.

DNS 서버를 통해 해당 도메인의 IP주소에 요청을 보낼 수 있다. 



## 보충 자료

[TCP와 UCP의 차이점](https://mangkyu.tistory.com/15)

[컴퓨터 네트워크 개념정리](https://brunch.co.kr/@toughrogrammer/16)

[UDP 정리](https://heegyukim.medium.com/computer-network-7-udp-86d45323d5c7)

이 강의는 HTTP 강의인 만큼 네트워크에 대해 깊이 있게 다루지는 않았다.

아직 컴퓨터 네트워크에 대해 모르는 부분이 많은 것 같아서 따로 공부해야 할 것 같다.

그래도 IP와 TCP, UDP의 기본 개념을 알 수 있었고, 내가 보내는 요청이 어떻게 서버로 전송되고 어떻게 서버의 응답이 돌아오는지 큰 그림을 볼 수 있어서 되게 유익했던 강의였다.

컴퓨터 네트워크 전공과목을 듣고 싶지만 내가 아직 2학년인 상태라 당장 수강하기가 어려워서 정말 아쉽다는 생각이 들었다.
이해하기 힘들 것 같아서 살짝 걱정했었는데 강의가 어렵고 지루하지 않고 되게 재밌었다는 느낌을 받았다. 그리고 내가 목표로 하는 직무에 도움이 많이 될 것 같다는 생각이 들었다.



## 출처

김영한님께서 출처를 제대로 밝힌다면 강의자료를 활용하여 블로그에 포스팅해도 된다고 하셔서 마지막으로 출처를 남깁니다.

이 포스팅은 김영한님의 [모든 개발자를 위한 HTTP 웹 기본 지식](https://www.inflearn.com/course/http-%EC%9B%B9-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC/) 강의를 기반으로 작성되었습니다.