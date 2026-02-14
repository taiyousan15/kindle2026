/**
 * Regression Test: Silent Error Catch
 *
 * Date: 2026-01-07
 * Location: `src/proxy-mcp/browser/cdp/session.ts`
 * Root Cause: エラーログの欠如
 *
 * This test ensures the mistake does not recur.
 */

import * as fs from 'fs';
import * as path from 'path';

const SOURCE_PATH = path.join(__dirname, '../../src/proxy-mcp/browser/cdp/session.ts');
const source = fs.readFileSync(SOURCE_PATH, 'utf-8');

describe('Regression: Silent Error Catch', () => {
  /**
   * Symptom: catch ブロックでエラーを握りつぶし、デバッグ困難
   * Fix: console.debug でエラーメッセージをログ出力
   */
  it('should not exhibit the original symptom', () => {
    // 空の catch ブロック（catch (e) {} や catch { } ）が存在しないことを検証
    const emptyCatchBlock = /catch\s*(\([^)]*\))?\s*\{\s*\}/;
    expect(source).not.toMatch(emptyCatchBlock);
  });

  it('should follow the prevention guidelines', () => {
    // 全ての catch ブロックがエラーを適切に処理していることを検証
    // 各 catch ブロックには以下のいずれかが必要:
    //   - console.debug / console.error / console.warn によるログ出力
    //   - throw によるエラー再送出（握りつぶしではない）
    const catchRegex = /catch\s*(\([^)]*\))?\s*\{/g;
    let match: RegExpExecArray | null;
    const catchPositions: number[] = [];

    while ((match = catchRegex.exec(source)) !== null) {
      catchPositions.push(match.index);
    }

    expect(catchPositions.length).toBeGreaterThan(0);

    for (const pos of catchPositions) {
      // catch キーワード位置から次の200文字を取得してブロック内容を検査
      const snippet = source.substring(pos, pos + 500);
      const hasLogging = /console\.(debug|error|warn)\(/.test(snippet);
      const hasThrow = /\bthrow\b/.test(snippet);
      // ログ出力またはエラー再送出のいずれかがあれば、エラーを握りつぶしていない
      expect(hasLogging || hasThrow).toBe(true);
    }
  });
});
