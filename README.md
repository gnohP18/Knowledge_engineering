# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

## GIT Flow

1. Nhánh `develop` được tạo từ `main`
2. Developer chỉ checkout từ nhánh `develop`, tạo 1 nhánh mới dựa theo task mình làm
3. Các type của branch như sau feature/fixed/refactor/… 
4. Example branch: 
    1.  git checkout develop // checkout về nhánh develop
    2.  git pull // pull code mới nhất
    3.  git checkout -b feature/login-build-basic-ui // branch template sẽ là {type}/{screen_name}-{action/api/do_something}
5. Example commit:
    1. git commit -m “[Feature] - Login: Build basic UI” // template sẽ là [{type}] - {screen_name}: {action/api/do something}
6. Đồng bộ code với nhánh chính(develop)
	// Muốn rebase nhánh develop (nhánh develop đã latest)
	1. git rebase develop
	2. fix conflict nếu có
	3. git add .
	4. git rebase --continue
	5. quay lại step2 nếu có conflict
	.....
	6. git push origin branh_name -f

### có thể rebase từ remote repo: git pull --rebase origin develop

### Update github repo to deploy

```sh
# add one time use
git remote add gitlab git@gitlab.com:tpham1467/ke_frontend.git
```

```sh
# update code
git fetch gitlab
git rebase gitlab/develop
git push 
```

### https, remember create folder `https` before run command
```code
openssl req -x509 -newkey rsa:4096 -keyout localhost_key.pem -out localhost_cert.pem -sha256 -days 365 -nodes
```