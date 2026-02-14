/**
 * Regression Test: Success True On Error
 *
 * Date: 2026-01-07
 * Location: `src/proxy-mcp/ops/schedule/runner.ts`
 * Root Cause: エラーハンドリングの設計ミス。失敗を成功として報告
 *
 * This test ensures the mistake does not recur.
 */

import * as fs from 'fs';
import * as path from 'path';

const SOURCE_PATH = path.join(__dirname, '../../src/proxy-mcp/ops/schedule/runner.ts');
const source = fs.readFileSync(SOURCE_PATH, 'utf-8');

describe('Regression: Success True On Error', () => {
  /**
   * Symptom: オプショナル依存エラー時に `success: true` を返していた
   * Fix: `success: false, skipped: true` に変更
   */
  it('should not exhibit the original symptom', () => {
    // catch ブロック内に success: true が存在しないことを検証
    // catch ブロックの中身を抽出して確認
    const catchBlockRegex = /catch\s*(\([^)]*\))?\s*\{([\s\S]*?)\n\s{4}\}/g;
    let match: RegExpExecArray | null;
    const catchBodies: string[] = [];

    while ((match = catchBlockRegex.exec(source)) !== null) {
      catchBodies.push(match[2]);
    }

    expect(catchBodies.length).toBeGreaterThan(0);

    for (const body of catchBodies) {
      // catch ブロック内で success: true を返していないことを検証
      expect(body).not.toMatch(/success:\s*true/);
    }
  });

  it('should follow the prevention guidelines', () => {
    // skipped: true パターンが存在することを検証（オプショナル依存のエラー区別）
    expect(source).toMatch(/skipped:\s*true/);

    // success: false が全てのエラーパスで使われていることを検証
    // catch ブロック内およびエラー系 return で success: false があること
    expect(source).toMatch(/success:\s*false/);

    // エラー系の return 文で success: false が使われている箇所が複数あることを検証
    const successFalseMatches = source.match(/success:\s*false/g);
    expect(successFalseMatches).not.toBeNull();
    expect(successFalseMatches!.length).toBeGreaterThanOrEqual(2);
  });
});
