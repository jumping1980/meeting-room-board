# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 現況

MVP 已實作於 `index.html`（衝突檢查邏輯在 `app.js`）（需求見 `spec.md`），無建置工具、測試或 lint 設定。

驗證方式：以本機靜態伺服器開啟（`file://` 或 `data:` 預覽下 localStorage 可能被禁用），例如：

```bash
python -m http.server 8765 --directory .
```

再開 `http://127.0.0.1:8765/index.html`，依 `spec.md` 第 6 節驗收標準手動檢查。

介面設計：三間會議室各有識別色（欄頭、預約區塊、空格 hover 共用）；過去時段以斜紋表示不可預約；今天會顯示現在時間線。取消預約使用 `confirm()` 二次確認，編輯不需確認。

## 專案概要

會議室預約看板：純前端（`index.html` + `app.js` + `test.html`）原型，3 間會議室 × 30 分鐘一格的日程格狀圖，支援建立／編輯／取消預約與衝突檢查。無登入、無後端。

## 架構約束（來自 spec.md）

- **資料層抽象化**：所有預約資料存取必須經由獨立封裝的 `bookingStore`（底層為 localStorage），UI 程式碼不得直接碰 localStorage，以便日後替換為後端。
- **衝突檢查**：同一會議室同一時段不可重複；建立與編輯都要檢查。編輯被拒絕時原預約必須保持不變。
- **時間規則**：固定 30 分鐘一格、不可自由輸入起訖、不可跨日；營業時段 09:00–18:00 須放在可調整的設定常數；過去時段唯讀（不可新增或修改）。
- **必填欄位**：姓名、會議主題、會議室、時段；缺漏不可送出。不收集預計人數。
- 版面需適用桌機瀏覽器並可容納手機寬度。

## 開發規範

- 本專案為 `index.html` + `app.js` + `test.html` 三檔，禁止再拆分其他檔案、禁止引入外部框架；`app.js` 以一般 `<script src>` 載入，不使用 ES module（頁面直接雙擊開啟）。
- 所有介面文字與程式註解使用繁體中文。
- 每次修改後，用一句話說明改了什麼。
- commit 訊息一律採用 Conventional Commits 格式，以 `feat:`／`fix:`／`docs:`／`refactor:` 開頭，冒號後以繁體中文描述這次改了什麼（例如 `feat: 新增深色模式切換`）。

## 明確不做（勿擅自加入）

登入／SSO／權限控管、後端／資料庫／部署、多裝置同步、週期性預約、設備與容量管理、門口大螢幕模式、通知與行事曆串接。

## 待確認

營業時段是否確為 09:00–18:00；取消／編輯是否需二次確認對話框（見 `spec.md` 末段）。
