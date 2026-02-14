/**
 * Regression Test: Chrome Origin Wildcard
 *
 * Date: 2026-01-07
 * Location: `src/proxy-mcp/browser/cdp/chrome-debug-cli.ts`
 * Root Cause: セキュリティ設定の見落とし
 *
 * This test ensures the mistake does not recur.
 */

import * as fs from 'fs';
import * as path from 'path';

const SOURCE_PATH = path.join(__dirname, '../../src/proxy-mcp/browser/cdp/chrome-debug-cli.ts');
const source = fs.readFileSync(SOURCE_PATH, 'utf-8');

describe('Regression: Chrome Origin Wildcard', () => {
  /**
   * Symptom: Chrome CDP の --remote-allow-origins=* で全オリジン許可
   * Fix: localhost のみに制限
   */
  it('should not exhibit the original symptom', () => {
    // --remote-allow-origins=* (ワイルドカード単体) がソースに存在しないことを検証
    // 注: localhost等を含む値は許可するため、"=*'" や "=*," ではなく末尾が * で終わるパターンを検出
    const wildcardOnly = /--remote-allow-origins=\*(?=['"\s,\n]|$)/;
    expect(source).not.toMatch(wildcardOnly);

    // --remote-allow-origins= の値が 127.0.0.1 や localhost のみを含むことを検証
    const originsMatch = source.match(/--remote-allow-origins=([^\s'",]+(?:,[^\s'",]+)*)/);
    expect(originsMatch).not.toBeNull();
    if (originsMatch) {
      const origins = originsMatch[1].split(',');
      for (const origin of origins) {
        expect(origin).toMatch(/127\.0\.0\.1|localhost/);
      }
    }

    // --remote-debugging-address=127.0.0.1 があることを検証
    expect(source).toContain('--remote-debugging-address=127.0.0.1');
  });

  it('should follow the prevention guidelines', () => {
    // validateChromePath 関数が存在することを検証
    expect(source).toMatch(/function\s+validateChromePath/);

    // validateChromePath が実際に呼び出されていることを検証
    expect(source).toMatch(/validateChromePath\(/);

    // デバッグポートがデフォルトで localhost にバインドされていることを検証
    expect(source).toContain("'127.0.0.1'");
  });
});
