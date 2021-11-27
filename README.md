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
### frontend
- Global state management
![privacy-policy-frontend](https://user-images.githubusercontent.com/41932978/143682388-efe37aae-b578-427d-b397-e278f6d50a61.png)
