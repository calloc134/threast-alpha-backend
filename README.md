# threast-ALpha-backend

このリポジトリは、threast-ALphaのバックエンドのソースコードを管理するリポジトリである。
このプログラムの詳しい設計は、[threast-ALpha-document](https://github.com/calloc134/threast-ALpha-document)を参照すること。

## 利用技術
| 役割 | 選定技術 |
| --- | --- |
| 言語 | TypeScript |
| フレームワーク | NestJS |
| バックエンド | fastify |
| データベース | PostgreSQL |
| ORM | Prisma |
| バリデーション | class-validator |
| シリアライズ | class-transformer |
| パスワードハッシュ技術 | argon2 |
| ドキュメント生成 | Swagger |
| セッション管理 | fastify-secure-session |


## 機能

実装したものについてはチェック
 - [x] ユーザ作成
 - [x] ログイン処理
 - [x] マイユーザのプロフィールチェック
 - [x] マイユーザプロフィール変更
 - [x] マイユーザ削除
 - [x] パスワード変更
 - [ ] アイコン変更
 - [x] マイユーザのフォローチェック
 - [x] 他ユーザをフォロー
 - [x] 他ユーザのプロフィールチェック
 - [x] 他ユーザのフォローチェック
 - [x] ハッシュタグの作成
 - [x] 投稿を作成
 - [x] 投稿を編集
 - [x] 投稿を削除
 - [x] 投稿にいいね作成
 - [x] 投稿にいいね削除
 - [x] 投稿にコメント作成
 - [x] 投稿のコメント編集
 - [x] 投稿のコメント削除

## ディレクトリ構成

```
.
├── README.md
├── prisma
│   ├── migrations
│   └── schema.prisma // データベースのスキーマ
├── src
│   ├── dto // データベースのスキーマに対応するDTO
│   |   ├── req // リクエスト時のDTO
│   |   ├── res // レスポンス時のDTO
│   |   ├── types // 呼び出される型定義  
│   |   └── wrapper // ラッパーとなる型定義
│   ├── exceptions // 例外オブジェクトのクラス定義
│   ├── filters // 例外フィルタ
│   ├── guards // コントローラ内で利用するガード
│   ├── submodules // モジュールから呼び出されるモジュール
│   ├── modules // コントローラとサービスの存在するモジュール。APIのロジック実装はここ
│   ├── app.module.ts // ルートモジュール
│   └── main.ts // エントリーポイント
├── webpack-hmr.config.js // webpackの設定ファイル
...
```

## 将来的な見通し
 - [ ] テストコードの実装(単体)
  - APIテストは別リポで管理することを考える
 - [ ] バックエンドをサービスに切り分ける
  - 現時点ではモジュラーモノリス形式になっている
 - IaCの導入
  - 別リポになるはず

