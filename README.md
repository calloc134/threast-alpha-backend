## threast-ALpha-backend

このリポジトリは、threast-ALphaのバックエンドのソースコードを管理するリポジトリである。
このプログラムの詳しい設計は、[threast-ALpha-document](https://github.com/calloc134/threast-ALpha-document)を参照すること。

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

