# Privacy-Policy-App
## 목차
1. [Key Summary](#key-summary)
2. [Tech Stacks](#tech-stacks)
3. [Directory structure](#directory-structure)
4. [Architecture](#architecture)

## Key Summary
- 딥러닝 학습 데이터 수급처에서 사용 목적의 개인정보동의서 수집 web-application입니다. 기존에는 해당 내용이 서면으로 이루어졌지만 database화의 필요를 느끼고 진행한 프로젝트입니다.
- 프로젝트 특성상 동의서를 제공할 사용자와 관리자가 사용할 페이지가 분리되어 구현되어 있으며 PSD file 및 서명을 할 수 있는 기능이 포함되어 있습니다.
- React는 global state를 활용하기 위해 MobX를 사용하였으며

***

## Tech Stacks
해당 프로젝트를 진행함에 있어서 중요하게 사용된 기술들을 나열합니다. 비교적 작은 부분을 차지하는 라이브러리는 생략했습니다.

### Frontend
- Language: **Javascript**
- code formatter: **ESLint, prettier**
- Framework: **React**
- State management: **MobX**
- UI-framework: **material-ui**
- HTTP client: **axios**
- web server: **nginx**

### Backend
- Language: **Python**
- code formatter: **black**
- Framework: **Django**
- Toolkit: **DRF(django rest framwork)**

### Deploy
- AWS ec2(ubuntu)
- docker

***

## Directory structure
```bash
├── backend
│   ├── Dockerfile
│   ├── account
│   ├── core
│   ├── manage.py
│   ├── media
│   ├── requirements.txt
│   ├── settings
│   ├── urls.py
├── frontend
│   ├── Dockerfile
│   ├── node_modules
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   └── src
│       ├── App.js
│       ├── api
│       ├── assets
│       ├── components
│       ├── index.css
│       ├── index.js
│       ├── pages
│       ├── setupProxy.js
│       └── stores
├── docker-compose.yml
└── nginx.conf
```
***

## Architecture
### frontend(Global state management)
![privacy-policy-frontend](https://user-images.githubusercontent.com/41932978/143682388-efe37aae-b578-427d-b397-e278f6d50a61.png)
- Components Tree 및 state management에 대략적인 개괄도입니다.
- 전역적으로 관리하지 않아도 되는 states는 각 컴포넌트에서 관리하고있으며 최대 1 depth의 종속관계를 유지하고 있습니다. 

### backend(API endpoints)
### GET - api/account/[option]
| Option | Required | Parameter | Type | Description |
| --- | --- | --- | --- | --- |
| `login` | required | { email: "", password: ""} | string | Database 조회 후 일치하는 값이 있는 경우 Token 발행 |
| `profile` | required | header: { Authorization: `Token [token]`}  | string | 해당 Token이 유효한지 검증 |

### GET - api/forms/[option]
| Option | Required | Parameter | Type | Description |
| --- | --- | --- | --- | --- |
| `default` | required | |  | 개인정보제공 동의서 list 조회  |
| `id` | optional | | number | 특정 개인정보제공동의서 id값으로 조회  |

### POST - api/forms/
| Option | Required | Parameter | Type | Description |
| --- | --- | --- | --- | --- |
| `default` | required | formData | object | agreement의 form데이터를 parameter로하여 요청 시 개인정보제공동의서 생성(id - auto increment)  |

### GET - api/image/[option]
| Option | Required | Parameter | Type | Description |
| --- | --- | --- | --- | --- |
| `id` | required | | number | 특정 PSD image 다운로드  |

### DELETE - api/image/[option]
| Option | Required | Parameter | Type | Description |
| --- | --- | --- | --- | --- |
| `id` | required | | number | 특정 PSD image 삭제 |

### POST - api/image/
| Option | Required | Parameter | Type | Description |
| --- | --- | --- | --- | --- |
| `default` | required | `agreement id, PSD file` | object |  이미 수급한 개인정보제공동의서에 PSD image file 업로드 |

### deploy
![privacy-policy-deploy](https://user-images.githubusercontent.com/41932978/143686769-a5491cdd-6862-4079-95e0-a3e9e89aa455.png)
- https letsencrypt 인증기관을 이용했습니다.
- :80 port로 접근할 시 자동으로 :443 port로 redirecting 됩니다.
- WAS의 static 및 media file은 docker volume에 바인딩되어 있습니다.
- Database에 저장된 데이터는 일정 시간마다 EC2에 dump됩니다.
