/**
 * 2026 여름 캠프 신청 → 구글 시트 자동 입력
 * ────────────────────────────────────────────────
 * 신청 페이지에서 제출된 내용을 「2026 여름 캠프 등록 (신청홈페이지)」 탭에
 * 한 줄씩 채웁니다. (기존 데이터는 덮어쓰지 않고, 이름이 비어 있는 줄부터 채웁니다.)
 *
 * 배포 방법은 README.md 를 참고하세요.
 */

// ▼▼▼ 설정 (필요할 때만 수정) ▼▼▼ ─────────────────────────────
var SHEET_NAME = '2026 여름 캠프 등록 (신청홈페이지)';

// 헤더(열 제목)가 있는 행 번호.  ← 이 탭은 4행이 헤더입니다.
var HEADER_ROW = 4;

// 폼 항목(왼쪽) → 시트 헤더에 들어있는 키워드(오른쪽).
// 헤더 텍스트에 키워드가 하나라도 포함되면 그 열에 값을 넣습니다.
var FIELD_TO_HEADER = {
  '이름': ['이름', '성명', '학생'],
  '알러지': ['알러지', '알레르기'],
  '초상권동의': ['초상권'],
  '나이': ['Age', '나이'],
  '레벨': ['Level'],
  '부모님연락처': ['연락처', '전화', '핸드폰'],
  '하원장소(월수금)': ['월수금', '월·수·금'],
  '하원장소(화목)': ['화목', '화·목'],
  '정규클래스수강여부': ['8월 정규', '8월'],
  '특이사항': ['특이', '비고', '메모', '요청']
  // 부모님성함 · 재원여부 · 신청일시 등 매칭 열이 없는 항목은
  // 자동으로 '특이사항' 열(없으면 맨 오른쪽 새 칸)에 라벨과 함께 기록됩니다.
};
// ▲▲▲ 설정 끝 ▲▲▲ ──────────────────────────────────────────


function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) throw new Error('시트를 찾을 수 없습니다: ' + SHEET_NAME);

    var lastCol = Math.max(sheet.getLastColumn(), 1);
    var headers = sheet
      .getRange(HEADER_ROW, 1, 1, lastCol)
      .getValues()[0]
      .map(function (h) { return String(h).trim(); });

    function findCol(keywords) {
      for (var c = 0; c < headers.length; c++) {
        if (!headers[c]) continue;
        for (var k = 0; k < keywords.length; k++) {
          if (headers[c].indexOf(keywords[k]) !== -1) return c;
        }
      }
      return -1;
    }

    var nameCol = findCol(FIELD_TO_HEADER['이름']);
    var noteCol = findCol(FIELD_TO_HEADER['특이사항']);

    // 들어갈 한 줄(row) 구성
    var width = lastCol;
    var leftovers = [];
    var values = {}; // colIndex -> value

    Object.keys(data).forEach(function (key) {
      var val = data[key];
      if (val === '' || val == null) return;
      var keywords = FIELD_TO_HEADER[key] || [key];
      var col = findCol(keywords);
      if (col !== -1) {
        values[col] = values[col] ? values[col] + '\n' + val : val;
      } else {
        leftovers.push(key + ': ' + val);
      }
    });

    // 매칭 안 된 항목 처리
    if (leftovers.length) {
      var extra = leftovers.join(' / ');
      if (noteCol !== -1) {
        values[noteCol] = values[noteCol] ? values[noteCol] + '\n' + extra : extra;
      } else {
        // 특이사항 열이 없으면 맨 오른쪽에 새 칸으로 덧붙임
        width = lastCol + 1;
        values[lastCol] = extra; // 0-based index == 기존 마지막 열 다음
      }
    }

    // 쓸 위치: 헤더 아래에서 '이름'이 비어 있는 첫 줄, 없으면 맨 아래 다음 줄
    var targetRow = sheet.getLastRow() + 1;
    if (nameCol !== -1) {
      var firstData = HEADER_ROW + 1;
      var lastRow = sheet.getLastRow();
      if (lastRow >= firstData) {
        var nameVals = sheet
          .getRange(firstData, nameCol + 1, lastRow - firstData + 1, 1)
          .getValues();
        for (var r = 0; r < nameVals.length; r++) {
          if (String(nameVals[r][0]).trim() === '') { targetRow = firstData + r; break; }
        }
      } else {
        targetRow = firstData;
      }
    }

    // 값이 있는 칸만 기록 (No 번호 등 기존 셀은 건드리지 않음)
    Object.keys(values).forEach(function (colIdxStr) {
      var c = parseInt(colIdxStr, 10);
      sheet.getRange(targetRow, c + 1).setValue(values[c]);
    });

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success', row: targetRow }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return ContentService.createTextOutput(
    'OK — 2026 여름 캠프 신청 수신 엔드포인트가 정상 동작 중입니다.'
  );
}
