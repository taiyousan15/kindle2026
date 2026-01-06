# TAISUN v2

**Unified Development & Marketing Platform** - AIエージェント、MCPツール、マーケティングスキルを統合した次世代開発プラットフォーム

[![CI](https://github.com/taiyousan15/taisun_agent/actions/workflows/ci.yml/badge.svg)](https://github.com/taiyousan15/taisun_agent/actions/workflows/ci.yml)
[![Security Scan](https://github.com/taiyousan15/taisun_agent/actions/workflows/security.yml/badge.svg)](https://github.com/taiyousan15/taisun_agent/actions/workflows/security.yml)
[![Node.js](https://img.shields.io/badge/Node.js-18.x%20%7C%2020.x-green)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3+-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Tests](https://img.shields.io/badge/Tests-524%20passing-brightgreen)](https://github.com/taiyousan15/taisun_agent/actions)

---

## はじめての方へ

> **重要**: TAISUN v2は **Claude Code の拡張機能** です。
> インストール後、このディレクトリで Claude Code を起動すると、81のエージェントと59のスキルが自動的に使えるようになります。

### 1. インストール（5分）

```bash
git clone https://github.com/taiyousan15/taisun_agent.git
cd taisun_agent
npm install
npm test  # 556テストがパスすればOK
```

### 2. 使い方（超簡単）

```bash
cd taisun_agent
claude  # Claude Code を起動
```

**あとは普通に会話するだけ:**

```
あなた: 「セールスレターを書いて」
Claude: /sales-letter スキルで作成します...

あなた: 「このコードをレビューして」
Claude: code-reviewer エージェントで分析します...
```

### 3. 詳細ガイド

| ドキュメント | 内容 |
|-------------|------|
| [QUICK_START.md](docs/QUICK_START.md) | 詳細セットアップ手順 |
| [TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md) | エラー解決 |
| [CONFIG.md](docs/CONFIG.md) | 設定カスタマイズ |
| [CONTRIBUTING.md](docs/CONTRIBUTING.md) | 開発参加方法 |

---

## Overview

TAISUN v2は、Claude Codeと連携し、設計から実装、テスト、デプロイ、マーケティングまでを一貫して支援する**統合開発・マーケティングプラットフォーム**です。

```
┌─────────────────────────────────────────────────────────────┐
│                    TAISUN v2 Architecture                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐       │
│  │   Claude    │◄──│  Proxy MCP  │──►│  32 External │       │
│  │    Code     │   │   Server    │   │  MCP Servers │       │
│  └─────────────┘   └──────┬──────┘   └─────────────┘       │
│                           │                                 │
│         ┌─────────────────┼─────────────────┐              │
│         ▼                 ▼                 ▼              │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐       │
│  │ 81 Agents   │   │  59 Skills  │   │ 76 Commands │       │
│  └─────────────┘   └─────────────┘   └─────────────┘       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### System Statistics

| Component | Count | Description |
|-----------|-------|-------------|
| **AI Agents** | 81 | 専門家エージェント (AIT42 + Miyabi + Diagnostics) |
| **Skills** | 67 | マーケティング・インフラ自動化スキル |
| **Commands** | 74 | ショートカットコマンド |
| **MCP Servers** | 32 | 外部サービス連携 |
| **MCP Tools** | 227 | 統合ツール群 |
| **Source Lines** | 11,167 | TypeScript (proxy-mcp) |
| **Tests** | 524 | ユニット・統合テスト |

## Key Features

### 1. Single MCP Entrypoint (Proxy MCP)

5つのツールで32+の外部MCPサーバーを統合管理:

```typescript
// 5 Public Tools
system_health   // ヘルスチェック
skill_search    // スキル検索
skill_run       // スキル実行
memory_add      // コンテンツ保存
memory_search   // コンテンツ検索
```

### 2. Hybrid Router

- **ルールベース安全性**: 危険操作の自動検出・ブロック
- **セマンティック検索**: 類似度ベースのMCP選択
- **人間承認フロー**: 高リスク操作のエスカレーション

### 3. Multi-Agent System (81 Agents)

| Category | Count | Examples |
|----------|-------|----------|
| **Coordinators** | 5 | ait42-coordinator, omega-aware-coordinator, initialization-orchestrator |
| **Diagnostics & Recovery** | 5 | system-diagnostician, error-recovery-planner, environment-doctor 🆕 |
| **Architecture** | 6 | system-architect, api-designer, security-architect |
| **Development** | 6 | backend-developer, frontend-developer, api-developer |
| **Quality Assurance** | 8 | code-reviewer, test-generator, security-tester |
| **Operations** | 8 | devops-engineer, incident-responder, cicd-manager |
| **Documentation** | 3 | tech-writer, doc-reviewer, knowledge-manager |
| **Analysis** | 4 | complexity-analyzer, feedback-analyzer |
| **Specialized** | 5 | bug-fixer, refactor-specialist, feature-builder |
| **Multi-Agent** | 4 | competition, debate, ensemble, reflection |
| **Process** | 5 | workflow-coordinator, requirements-elicitation |
| **Miyabi** | 6 | miyabi-codegen-agent, miyabi-pr-agent |

### 4. Skill Library (67 Skills)

#### Marketing & Sales (15)
- `copywriting-helper` - コピーライティング支援
- `sales-letter` - セールスレター作成
- `step-mail` - ステップメール作成
- `vsl` - ビデオセールスレター
- `launch-video` - ローンチ動画スクリプト
- `lp-generator` / `lp-analysis` / `mendan-lp` - LP作成・分析
- `funnel-builder` - ファネル構築
- `customer-support` - カスタマーサポート
- `taiyo-style` - 太陽スタイル適用

#### Content Creation (10)
- `kindle-publishing` - Kindle本出版
- `youtube-content` / `youtube-thumbnail` - YouTube企画・サムネイル
- `manga-production` / `anime-production` - 漫画・アニメ制作
- `diagram-illustration` - 図解作成
- `sns-marketing` - SNSマーケティング

#### AI Image & Video (5)
- `gemini-image-generator` - Gemini画像生成
- `nanobanana-pro` / `nanobanana-prompts` - NanoBanana統合
- `omnihuman1-video` - AIアバター動画
- `japanese-tts-reading` - 日本語TTS

#### Infrastructure (11)
- `workflow-automation-n8n` - n8nワークフロー
- `docker-mcp-ops` - Docker操作
- `security-scan-trivy` - セキュリティスキャン
- `pdf-automation-gotenberg` - PDF自動化
- `doc-convert-pandoc` - ドキュメント変換
- `postgres-mcp-analyst` - PostgreSQL分析
- `notion-knowledge-mcp` - Notionナレッジ
- `unified-notifications-apprise` - 通知統合

### 5. Production-Grade Operations

- **Circuit Breaker**: 障害耐性・自動復旧
- **Incident Lifecycle (P17)**: インシデント相関・ノイズ削減・週次ダイジェスト
- **Scheduled Jobs (P18)**: 日次/週次レポート自動生成
- **Observability**: Prometheus/Grafana/Loki統合

## Quick Start

> **日本語ユーザー向け**: 詳細なセットアップガイドは [docs/getting-started-ja.md](docs/getting-started-ja.md) をご覧ください。

### Prerequisites

- Node.js 18.x+
- npm 9.x+
- Claude Code CLI
- Docker (optional, for monitoring stack)

### Installation

```bash
# Clone repository
git clone https://github.com/taiyousan15/taisun_agent.git
cd taisun_agent

# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env with your API keys
```

### Verification

```bash
# Run tests (524 tests)
npm test

# Type check
npm run typecheck

# Lint
npm run lint

# Build
npm run build:all
```

## Usage

### Using Agents

```javascript
// Architecture design
Task(subagent_type="system-architect", prompt="ECサイトのアーキテクチャを設計して")

// Backend implementation
Task(subagent_type="backend-developer", prompt="ユーザー認証APIを実装して")

// Code review (0-100 scoring)
Task(subagent_type="code-reviewer", prompt="このPRをレビューして")

// Auto-select optimal agent
Task(subagent_type="ait42-coordinator", prompt="ユーザー認証機能を設計・実装して")
```

### Using Skills

```bash
# Sales letter
/sales-letter --product "オンライン講座"

# LP analysis
/lp-analysis https://example.com

# Security scan
/security-scan-trivy

# Daily observability report
npm run obs:report:daily
```

### Monitoring Stack

```bash
# Start monitoring (Prometheus, Grafana, Loki)
make monitoring-up

# Start ops tools (Gotenberg, PDF)
make tools-up

# Start scheduled jobs daemon
docker compose -f docker-compose.ops.yml --profile ops-scheduler up -d
```

## Project Structure

```
taisun_agent/
├── src/
│   └── proxy-mcp/              # Proxy MCP Server (11.2K LOC)
│       ├── server.ts           # MCP server entry
│       ├── tools/              # Public tools (system, skill, memory)
│       ├── memory/             # Memory service & storage
│       ├── router/             # Hybrid router engine
│       ├── internal/           # Circuit breaker, resilience
│       ├── browser/            # Chrome/CDP integration
│       ├── skillize/           # URL→Skill generation
│       ├── supervisor/         # GitHub workflow integration
│       ├── ops/                # Schedule, incidents, digest
│       └── observability/      # Event tracking & metrics
│
├── .claude/                    # Agent system
│   ├── agents/                 # 77 agent definitions
│   ├── skills/                 # 59 skill definitions
│   ├── commands/               # 76 command shortcuts
│   ├── mcp-servers/            # 4 custom MCP servers
│   ├── mcp-tools/              # 227 MCP tools
│   └── memory/                 # Learning & statistics
│
├── config/
│   └── proxy-mcp/              # MCP configuration
│       ├── internal-mcps.json  # MCP registry
│       ├── ops-schedule.json   # Scheduled jobs
│       └── incidents.json      # Incident tracking
│
├── docs/                       # Documentation (30+ files)
│   ├── ARCHITECTURE.md
│   ├── DEVELOPER_GUIDE.md
│   ├── API_REFERENCE.md
│   ├── OPERATIONS.md
│   └── third-agent/            # Advanced docs
│
├── tests/
│   ├── unit/                   # 22 unit test files
│   └── integration/            # 5 integration suites
│
├── docker-compose.monitoring.yml  # Prometheus/Grafana/Loki
├── docker-compose.tools.yml       # Document processing
└── docker-compose.ops.yml         # Operations environment
```

## Quality Gates

| Metric | Requirement | Current |
|--------|-------------|---------|
| Test Coverage | 80%+ | 80%+ |
| Code Review Score | 80+ | 80+ |
| Security Scan | Zero Critical/High | Zero |
| P0/P1 Bugs | Zero | Zero |

## NPM Scripts

```bash
# Development
npm run dev                    # Watch mode
npm test                       # Run all tests
npm run lint                   # ESLint
npm run typecheck              # TypeScript check

# Building
npm run proxy:build           # Build proxy MCP
npm run scripts:build         # Build scripts
npm run build:all             # Full build

# Operations
npm run obs:report:daily      # Daily observability report
npm run obs:report:weekly     # Weekly report
npm run ops:schedule:status   # Check scheduled jobs

# Utilities
npm run agents:list           # List available agents
npm run skills:list           # List available skills
npm run proxy:smoke           # MCP smoke test
```

## Documentation

### Getting Started

| Document | Description |
|----------|-------------|
| [QUICK_START.md](docs/QUICK_START.md) | 5分クイックスタート |
| [BEGINNERS_PROMPT_GUIDE.md](docs/BEGINNERS_PROMPT_GUIDE.md) | 初心者向けフレーズ集 ⭐ |
| [CONFIG.md](docs/CONFIG.md) | 設定ガイド |
| [TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md) | トラブルシューティング |
| [getting-started-ja.md](docs/getting-started-ja.md) | 日本語セットアップガイド |

### Development

| Document | Description |
|----------|-------------|
| [CONTRIBUTING.md](docs/CONTRIBUTING.md) | コントリビューションガイド |
| [DEVELOPER_GUIDE.md](docs/DEVELOPER_GUIDE.md) | 開発者ガイド |
| [ARCHITECTURE.md](docs/ARCHITECTURE.md) | システムアーキテクチャ |
| [API_REFERENCE.md](docs/API_REFERENCE.md) | API リファレンス |

### Operations

| Document | Description |
|----------|-------------|
| [OPERATIONS.md](docs/OPERATIONS.md) | 運用ガイド |
| [RUNBOOK.md](docs/RUNBOOK.md) | ランブック |
| [SECURITY.md](docs/SECURITY.md) | セキュリティポリシー |
| [CHANGELOG.md](docs/CHANGELOG.md) | 変更履歴 |

## Technology Stack

| Category | Technologies |
|----------|--------------|
| **Runtime** | Node.js 18+, TypeScript 5.3+ |
| **Testing** | Jest 29.7 |
| **MCP** | @modelcontextprotocol/sdk 1.0 |
| **AI** | Anthropic SDK, LangChain |
| **Browser** | Playwright Core 1.57 |
| **Monitoring** | Prometheus, Grafana, Loki |
| **Infrastructure** | Docker, n8n |

## Contributing

詳細は [CONTRIBUTING.md](docs/CONTRIBUTING.md) を参照してください。

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - See [LICENSE](LICENSE) for details.

## Support

- Issues: [GitHub Issues](https://github.com/taiyousan15/taisun_agent/issues)
- Documentation: [docs/](docs/)

---

Built with [Claude Code](https://claude.ai/code)
