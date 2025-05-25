## 環境構築でやること
https://dev.classmethod.jp/articles/flutter-environment-mac/ \
この辺を見て、頑張って環境構築してください🙇


### 1. flutterのインストール
普通にインストール：http://flutter.ctrnost.com/install/ \
fvmで管理：https://zenn.dev/altiveinc/articles/flutter-version-management

動けばなんでも良いです。↓で動作確認済み。\
```
hironutsucho@hironutsuchonoMacBook-Air client % flutter --version
Flutter 3.29.3 • channel stable • https://github.com/flutter/flutter.git
Framework • revision ea121f8859 (3 weeks ago) • 2025-04-11 19:10:07 +0000
Engine • revision cf56914b32
Tools • Dart 3.7.2 • DevTools 2.42.3
```
### 2. Xcode、Android Studio、VScodeのインストール
chromeでビルドできることを確認したので、ここは任意かも。スマホでやりたい人はインストールする必要があります。

**Xcode** \
最新版 Apple store：https://apps.apple.com/jp/app/xcode/id497799835?mt=12 \
過去バージョン(ADP登録が必要)：https://developer.apple.com/download/all/

**Android Studio** \
最新版：https://developer.android.com/studio?hl=ja \
過去バージョン：https://developer.android.com/studio/archive \
※右上から言語設定を英語にすること

動けばなんでも良いと思います。一旦動作した環境を共有しておきます。\
Xcode：Version 14.2 (14C18) \
Android Studio：最新版

下記コマンドで、問題点があれば解消していくこと。\
`flutter doctor`

**VScode**\
多分なんでも大丈夫です。\
拡張機能のDartとFlutterを入れておいてください。

### 3. build
VScodeの実行とデバッグにてDart & Flutterから端末・エミュレータを指定して実行。\
もしくは下記コマンドで実行。\
`flutter run`