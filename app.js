// 衝突檢查：同會議室同日、時段重疊；編輯時排除自身
// 以一般 script 載入；執行時使用 index.html 內定義的全域 bookingStore
function findConflict(b, ignoreId) {
  return bookingStore.list(b.date).find(x =>
    x.id !== ignoreId && x.room === b.room && x.start < b.end && b.start < x.end) || null;
}
