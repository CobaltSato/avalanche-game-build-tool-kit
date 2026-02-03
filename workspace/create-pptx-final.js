const pptxgen = require('pptxgenjs');

async function createPresentation() {
    const pptx = new pptxgen();
    pptx.layout = 'LAYOUT_16x9';
    pptx.author = 'Avalanche Game Build Tool Kit';
    pptx.title = 'Avalanche + AI Development Hands-on Demo';
    pptx.subject = 'Gemini CLI + Claude Code を使った Avalanche ゲーム開発';

    // Colors
    const BG_DARK = '1A1A2E';
    const ACCENT_RED = 'E84142';
    const ACCENT_TEAL = '16A085';
    const ACCENT_YELLOW = 'F1C40F';
    const ACCENT_BLUE = '3498DB';
    const ACCENT_ORANGE = 'E67E22';
    const TEXT_WHITE = 'FFFFFF';
    const TEXT_GRAY = 'CCCCCC';
    const BOX_BG = '252540';
    const TIP_BG = '2D4A3E';
    const NEW_BADGE = '9B59B6';
    const CLAUDE_ORANGE = 'DA7756';

    let slide;

    // ========================================
    // Slide 1: Title
    // ========================================
    slide = pptx.addSlide();
    slide.background = { color: BG_DARK };
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 0.12, fill: { color: ACCENT_RED } });
    slide.addText('Avalanche + AI Development', { x: 0.5, y: 1.8, w: 9, h: 0.8, fontSize: 42, color: TEXT_WHITE, bold: true, align: 'center' });
    slide.addText('Hands-on Demo', { x: 0.5, y: 2.6, w: 9, h: 0.5, fontSize: 24, color: ACCENT_RED, align: 'center' });
    slide.addText('Gemini CLI を使って、Avalanche ブロックチェーン上で動く\nシンプルな 2D グリッドゲームを作成します', { x: 1, y: 3.3, w: 8, h: 0.8, fontSize: 16, color: TEXT_GRAY, align: 'center' });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 3.2, y: 4.3, w: 3.6, h: 0.5, fill: { color: ACCENT_TEAL }, rectRadius: 0.25 });
    slide.addText('初心者向け + Claude Code 付録', { x: 3.2, y: 4.3, w: 3.6, h: 0.5, fontSize: 12, color: TEXT_WHITE, bold: true, align: 'center', valign: 'middle' });
    slide.addText('Avalanche Game Build Tool Kit', { x: 0.5, y: 5, w: 9, h: 0.3, fontSize: 12, color: '666666', align: 'center' });

    // ========================================
    // Slide 2: What We'll Build
    // ========================================
    slide = pptx.addSlide();
    slide.background = { color: BG_DARK };
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 0.8, fill: { color: ACCENT_RED } });
    slide.addText('今日作るもの', { x: 0.5, y: 0.2, w: 9, h: 0.5, fontSize: 28, color: TEXT_WHITE, bold: true });

    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.5, y: 1.1, w: 4.5, h: 3.5, fill: { color: BOX_BG }, rectRadius: 0.15 });
    slide.addText('10x10 グリッドゲーム', { x: 0.5, y: 1.2, w: 4.5, h: 0.4, fontSize: 14, color: TEXT_WHITE, bold: true, align: 'center' });

    for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
            const x = 1.4 + col * 0.45;
            const y = 1.8 + row * 0.45;
            const isPlayer = row === 2 && col === 2;
            slide.addShape(pptx.shapes.RECTANGLE, { x, y, w: 0.4, h: 0.4, fill: { color: isPlayer ? ACCENT_RED : '333355' }, line: { color: '444466', width: 0.5 } });
        }
    }
    slide.addText('← → ↑ ↓ で移動', { x: 0.5, y: 4.1, w: 4.5, h: 0.3, fontSize: 12, color: TEXT_GRAY, align: 'center' });

    slide.addShape(pptx.shapes.RIGHT_ARROW, { x: 5.2, y: 2.5, w: 0.8, h: 0.5, fill: { color: ACCENT_TEAL } });

    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 6.2, y: 1.1, w: 3.4, h: 3.5, fill: { color: BOX_BG }, rectRadius: 0.15 });
    slide.addText('Avalanche Blockchain', { x: 6.2, y: 1.2, w: 3.4, h: 0.4, fontSize: 14, color: TEXT_WHITE, bold: true, align: 'center' });

    for (let i = 0; i < 3; i++) {
        const y = 1.8 + i * 0.7;
        slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 6.7, y, w: 2.4, h: 0.55, fill: { color: ACCENT_RED }, rectRadius: 0.08 });
        slide.addText(i === 0 ? 'Block #123' : i === 1 ? 'x: 5, y: 3' : 'Tx: 0x...', { x: 6.7, y, w: 2.4, h: 0.55, fontSize: 11, color: TEXT_WHITE, align: 'center', valign: 'middle' });
        if (i < 2) slide.addShape(pptx.shapes.DOWN_ARROW, { x: 7.7, y: y + 0.5, w: 0.2, h: 0.2, fill: { color: TEXT_GRAY } });
    }
    slide.addText('座標をブロックチェーンに保存！', { x: 6.2, y: 4.1, w: 3.4, h: 0.3, fontSize: 11, color: ACCENT_TEAL, align: 'center' });

    // ========================================
    // Slide 3: What is Gemini CLI?
    // ========================================
    slide = pptx.addSlide();
    slide.background = { color: BG_DARK };
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 0.8, fill: { color: ACCENT_TEAL } });
    slide.addText('Gemini CLI とは？', { x: 0.5, y: 0.2, w: 9, h: 0.5, fontSize: 28, color: TEXT_WHITE, bold: true });

    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 1.0, w: 9.2, h: 1.0, fill: { color: BOX_BG }, rectRadius: 0.1 });
    slide.addText('Google の Gemini AI をターミナルから直接操作できるコマンドラインツール', { x: 0.5, y: 1.1, w: 9, h: 0.4, fontSize: 15, color: TEXT_WHITE, bold: true, align: 'center' });
    slide.addText('ファイル編集、シェルコマンド実行、Web アクセスなどの機能を備えた AI コーディングアシスタント', { x: 0.5, y: 1.55, w: 9, h: 0.35, fontSize: 12, color: TEXT_GRAY, align: 'center' });

    const features = [
        { icon: '📁', title: 'ファイル操作', desc: 'read/write/edit\nで自動編集' },
        { icon: '⚡', title: 'シェル実行', desc: 'run_shell_command\nでコマンド実行' },
        { icon: '🌐', title: 'Web アクセス', desc: 'web_fetch で\nドキュメント取得' },
        { icon: '🎯', title: 'スキル機能', desc: '専門知識を\nオンデマンド追加' }
    ];

    features.forEach((f, i) => {
        const x = 0.4 + i * 2.4;
        slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x, y: 2.2, w: 2.2, h: 2.0, fill: { color: BOX_BG }, rectRadius: 0.12 });
        slide.addText(f.icon, { x, y: 2.3, w: 2.2, h: 0.45, fontSize: 26, align: 'center' });
        slide.addText(f.title, { x, y: 2.75, w: 2.2, h: 0.3, fontSize: 12, color: ACCENT_TEAL, bold: true, align: 'center' });
        slide.addText(f.desc, { x, y: 3.1, w: 2.2, h: 0.8, fontSize: 10, color: TEXT_GRAY, align: 'center' });
    });

    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 4.4, w: 9.2, h: 0.9, fill: { color: TIP_BG }, rectRadius: 0.08 });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.5, y: 4.5, w: 0.8, h: 0.3, fill: { color: NEW_BADGE }, rectRadius: 0.15 });
    slide.addText('NEW', { x: 0.5, y: 4.5, w: 0.8, h: 0.3, fontSize: 10, color: TEXT_WHITE, bold: true, align: 'center', valign: 'middle' });
    slide.addText('Gemini 3 Pro/Flash 対応、MCP サーバー連携、サンドボックス実行', { x: 1.4, y: 4.5, w: 8, h: 0.3, fontSize: 11, color: TEXT_WHITE });
    slide.addText('💡 Claude Code や Cursor と同じ「AIコーディングアシスタント」の仲間', { x: 0.5, y: 4.85, w: 9, h: 0.35, fontSize: 11, color: TEXT_GRAY, align: 'center' });

    // ========================================
    // Slide 4: What is Avalanche?
    // ========================================
    slide = pptx.addSlide();
    slide.background = { color: BG_DARK };
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 0.8, fill: { color: ACCENT_RED } });
    slide.addText('Avalanche とは？', { x: 0.5, y: 0.2, w: 9, h: 0.5, fontSize: 28, color: TEXT_WHITE, bold: true });

    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 1.0, w: 9.2, h: 1.0, fill: { color: BOX_BG }, rectRadius: 0.1 });
    slide.addText('高速・低コスト・エコな次世代ブロックチェーン', { x: 0.5, y: 1.1, w: 9, h: 0.4, fontSize: 18, color: TEXT_WHITE, bold: true, align: 'center' });
    slide.addText('Ethereum と互換性があり、同じツール（Solidity, ethers.js）が使えます', { x: 0.5, y: 1.5, w: 9, h: 0.35, fontSize: 12, color: TEXT_GRAY, align: 'center' });

    slide.addText('vs Ethereum', { x: 0.5, y: 2.2, w: 9, h: 0.4, fontSize: 14, color: ACCENT_TEAL, bold: true });

    const comparisons = [
        { label: '処理速度', eth: '12-15 秒', avax: '< 1 秒', winner: 'avax' },
        { label: 'ガス代', eth: '高い ($5-50+)', avax: '安い ($0.01-0.1)', winner: 'avax' },
        { label: '開発ツール', eth: 'Solidity, ethers.js', avax: '同じ！', winner: 'both' }
    ];

    comparisons.forEach((c, i) => {
        const y = 2.7 + i * 0.55;
        slide.addText(c.label, { x: 0.5, y, w: 2.0, h: 0.45, fontSize: 12, color: TEXT_WHITE, valign: 'middle' });
        slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 2.6, y, w: 3.0, h: 0.45, fill: { color: '333355' }, rectRadius: 0.05 });
        slide.addText(c.eth, { x: 2.6, y, w: 3.0, h: 0.45, fontSize: 11, color: TEXT_GRAY, align: 'center', valign: 'middle' });
        slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 5.8, y, w: 3.0, h: 0.45, fill: { color: c.winner === 'avax' || c.winner === 'both' ? ACCENT_RED : '333355' }, rectRadius: 0.05 });
        slide.addText(c.avax, { x: 5.8, y, w: 3.0, h: 0.45, fontSize: 11, color: TEXT_WHITE, align: 'center', valign: 'middle' });
    });

    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 4.4, w: 9.2, h: 0.8, fill: { color: TIP_BG }, rectRadius: 0.08 });
    slide.addText('💡 Fuji テストネット = 無料の練習環境', { x: 0.5, y: 4.5, w: 9, h: 0.35, fontSize: 13, color: ACCENT_YELLOW, bold: true, align: 'center' });
    slide.addText('本番と同じ仕組みで、テスト用 AVAX（無料）を使って開発できます', { x: 0.5, y: 4.85, w: 9, h: 0.3, fontSize: 11, color: TEXT_GRAY, align: 'center' });

    // ========================================
    // Slide 5: Demo Flow
    // ========================================
    slide = pptx.addSlide();
    slide.background = { color: BG_DARK };
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 0.8, fill: { color: ACCENT_RED } });
    slide.addText('デモの流れ（約30分）', { x: 0.5, y: 0.2, w: 9, h: 0.5, fontSize: 28, color: TEXT_WHITE, bold: true });

    const phases = [
        { num: '0', title: '準備', desc: 'Codespaces\nWallet\nGemini CLI', time: '5分', color: ACCENT_TEAL },
        { num: '1', title: 'スキル導入', desc: 'AIに専門知識\nを追加', time: '2分', color: ACCENT_TEAL },
        { num: '2', title: 'コントラクト', desc: 'AIが Solidity\nコードを生成', time: '5分', color: ACCENT_RED },
        { num: '3', title: 'デプロイ', desc: 'Fuji テストネット\nに公開', time: '5分', color: ACCENT_RED },
        { num: '4', title: 'アプリ作成', desc: 'React ゲーム\nをAIが生成', time: '10分', color: ACCENT_YELLOW }
    ];

    phases.forEach((p, i) => {
        const x = 0.3 + i * 1.95;
        slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x, y: 1.1, w: 1.85, h: 3.8, fill: { color: BOX_BG }, rectRadius: 0.15 });
        slide.addShape(pptx.shapes.OVAL, { x: x + 0.55, y: 1.3, w: 0.75, h: 0.75, fill: { color: p.color } });
        slide.addText(p.num, { x: x + 0.55, y: 1.3, w: 0.75, h: 0.75, fontSize: 24, color: TEXT_WHITE, bold: true, align: 'center', valign: 'middle' });
        slide.addText(p.title, { x, y: 2.2, w: 1.85, h: 0.4, fontSize: 14, color: TEXT_WHITE, bold: true, align: 'center' });
        slide.addText(p.desc, { x, y: 2.7, w: 1.85, h: 1.2, fontSize: 11, color: TEXT_GRAY, align: 'center' });
        slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: x + 0.35, y: 4.3, w: 1.15, h: 0.4, fill: { color: '333355' }, rectRadius: 0.2 });
        slide.addText(p.time, { x: x + 0.35, y: 4.3, w: 1.15, h: 0.4, fontSize: 11, color: ACCENT_TEAL, align: 'center', valign: 'middle' });
        if (i < 4) slide.addShape(pptx.shapes.RIGHT_ARROW, { x: x + 1.85, y: 2.7, w: 0.15, h: 0.3, fill: { color: '666666' } });
    });

    // ========================================
    // Slide 6: Phase 0 - Codespaces
    // ========================================
    slide = pptx.addSlide();
    slide.background = { color: BG_DARK };
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 0.8, fill: { color: ACCENT_TEAL } });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 0.18, w: 1.2, h: 0.45, fill: { color: TEXT_WHITE }, rectRadius: 0.22 });
    slide.addText('Phase 0', { x: 0.4, y: 0.18, w: 1.2, h: 0.45, fontSize: 14, color: ACCENT_TEAL, bold: true, align: 'center', valign: 'middle' });
    slide.addText('GitHub Codespaces', { x: 1.8, y: 0.2, w: 7, h: 0.5, fontSize: 26, color: TEXT_WHITE, bold: true });

    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 1.0, w: 9.2, h: 1.2, fill: { color: TIP_BG }, rectRadius: 0.1 });
    slide.addText('💡 Codespaces とは？', { x: 0.5, y: 1.05, w: 9, h: 0.3, fontSize: 14, color: ACCENT_YELLOW, bold: true });
    slide.addText('GitHub が提供するクラウド開発環境。ブラウザ上で VS Code が動作し、ローカル環境構築が不要！', { x: 0.5, y: 1.35, w: 9, h: 0.35, fontSize: 11, color: TEXT_WHITE });
    slide.addText('🔗 github.com/CobaltSato/avalanche-build-games-tool-kit', { x: 0.5, y: 1.75, w: 9, h: 0.35, fontSize: 11, color: ACCENT_TEAL, bold: true, align: 'center' });

    slide.addText('手順', { x: 0.4, y: 2.35, w: 9, h: 0.4, fontSize: 16, color: ACCENT_TEAL, bold: true });

    const codespacesSteps = [
        { num: '1', text: '上記 URL にアクセス → 「Code」ボタンをクリック' },
        { num: '2', text: '「Codespaces」タブを選択' },
        { num: '3', text: '「Create codespace on main」をクリック' },
        { num: '4', text: 'ブラウザで VS Code が起動するまで待つ（1-2分）' }
    ];

    codespacesSteps.forEach((s, i) => {
        const y = 2.85 + i * 0.55;
        slide.addShape(pptx.shapes.OVAL, { x: 0.5, y, w: 0.4, h: 0.4, fill: { color: ACCENT_RED } });
        slide.addText(s.num, { x: 0.5, y, w: 0.4, h: 0.4, fontSize: 14, color: TEXT_WHITE, bold: true, align: 'center', valign: 'middle' });
        slide.addText(s.text, { x: 1.0, y, w: 8.5, h: 0.4, fontSize: 12, color: TEXT_GRAY, valign: 'middle' });
    });

    // ========================================
    // Slide 7: Phase 0 - Core Wallet
    // ========================================
    slide = pptx.addSlide();
    slide.background = { color: BG_DARK };
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 0.8, fill: { color: ACCENT_TEAL } });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 0.18, w: 1.2, h: 0.45, fill: { color: TEXT_WHITE }, rectRadius: 0.22 });
    slide.addText('Phase 0', { x: 0.4, y: 0.18, w: 1.2, h: 0.45, fontSize: 14, color: ACCENT_TEAL, bold: true, align: 'center', valign: 'middle' });
    slide.addText('Core Wallet インストール', { x: 1.8, y: 0.2, w: 7, h: 0.5, fontSize: 26, color: TEXT_WHITE, bold: true });

    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 1.0, w: 9.2, h: 1.1, fill: { color: TIP_BG }, rectRadius: 0.1 });
    slide.addText('💡 Core Wallet とは？', { x: 0.5, y: 1.1, w: 9, h: 0.35, fontSize: 14, color: ACCENT_YELLOW, bold: true });
    slide.addText('Avalanche 公式ウォレット。MetaMask より Avalanche に最適化。', { x: 0.5, y: 1.45, w: 9, h: 0.3, fontSize: 12, color: TEXT_WHITE });
    slide.addText('C-Chain（EVM互換）と X-Chain/P-Chain の両方に対応！', { x: 0.5, y: 1.75, w: 9, h: 0.25, fontSize: 11, color: TEXT_GRAY });

    slide.addText('インストール手順', { x: 0.4, y: 2.3, w: 4.5, h: 0.4, fontSize: 14, color: ACCENT_TEAL, bold: true });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 2.7, w: 4.5, h: 1.8, fill: { color: BOX_BG }, rectRadius: 0.1 });
    const walletSteps = ['1. Chrome ブラウザを開く', '2. core.app/download にアクセス', '3. 「Chrome」を選択', '4. 拡張機能をインストール', '5. ウォレットを作成/復元'];
    walletSteps.forEach((s, i) => {
        slide.addText(s, { x: 0.5, y: 2.8 + i * 0.32, w: 4.3, h: 0.3, fontSize: 11, color: TEXT_GRAY });
    });

    slide.addText('MetaMask じゃダメ？', { x: 5.1, y: 2.3, w: 4.5, h: 0.4, fontSize: 14, color: ACCENT_TEAL, bold: true });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 5.1, y: 2.7, w: 4.5, h: 1.8, fill: { color: BOX_BG }, rectRadius: 0.1 });
    slide.addText('MetaMask でも OK！\n\nでも Core Wallet は：', { x: 5.2, y: 2.8, w: 4.3, h: 0.8, fontSize: 11, color: TEXT_GRAY });
    slide.addText('✓ Avalanche 専用設計\n✓ ネットワーク設定不要\n✓ Subnet 対応', { x: 5.2, y: 3.5, w: 4.3, h: 0.8, fontSize: 11, color: ACCENT_TEAL });

    // ========================================
    // Slide 8: Gemini CLI Authentication
    // ========================================
    slide = pptx.addSlide();
    slide.background = { color: BG_DARK };
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 0.8, fill: { color: ACCENT_TEAL } });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 0.18, w: 1.2, h: 0.45, fill: { color: TEXT_WHITE }, rectRadius: 0.22 });
    slide.addText('Phase 0', { x: 0.4, y: 0.18, w: 1.2, h: 0.45, fontSize: 14, color: ACCENT_TEAL, bold: true, align: 'center', valign: 'middle' });
    slide.addText('Gemini CLI 認証', { x: 1.8, y: 0.2, w: 7, h: 0.5, fontSize: 26, color: TEXT_WHITE, bold: true });

    slide.addText('認証方法は3つ（今回は Google OAuth を使用）', { x: 0.4, y: 1.0, w: 9, h: 0.35, fontSize: 13, color: TEXT_WHITE, bold: true });

    const authMethods = [
        { method: 'Google OAuth', desc: '無料枠あり、最も簡単', cmd: 'gemini → "Login with Google"', recommended: true },
        { method: 'Gemini API Key', desc: 'モデル選択可能、有料枠', cmd: 'export GEMINI_API_KEY="..."', recommended: false },
        { method: 'Vertex AI', desc: 'エンタープライズ向け', cmd: 'export GOOGLE_GENAI_USE_VERTEXAI=true', recommended: false }
    ];

    authMethods.forEach((a, i) => {
        const y = 1.45 + i * 0.65;
        slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y, w: 9.2, h: 0.55, fill: { color: a.recommended ? ACCENT_RED : BOX_BG }, rectRadius: 0.08 });
        if (a.recommended) {
            slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 8.5, y: y + 0.08, w: 1.0, h: 0.4, fill: { color: ACCENT_YELLOW }, rectRadius: 0.2 });
            slide.addText('推奨', { x: 8.5, y: y + 0.08, w: 1.0, h: 0.4, fontSize: 10, color: BG_DARK, bold: true, align: 'center', valign: 'middle' });
        }
        slide.addText(a.method, { x: 0.5, y, w: 2.0, h: 0.55, fontSize: 11, color: TEXT_WHITE, bold: true, valign: 'middle' });
        slide.addText(a.desc, { x: 2.5, y, w: 2.5, h: 0.55, fontSize: 10, color: a.recommended ? TEXT_WHITE : TEXT_GRAY, valign: 'middle' });
        slide.addText(a.cmd, { x: 5.0, y, w: 3.4, h: 0.55, fontSize: 8, color: '88FF88', fontFace: 'Courier New', valign: 'middle' });
    });

    slide.addText('Google OAuth の手順（公式ドキュメントより）', { x: 0.4, y: 3.5, w: 9, h: 0.35, fontSize: 13, color: ACCENT_TEAL, bold: true });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 3.9, w: 9.2, h: 1.4, fill: { color: '0D0D1A' }, rectRadius: 0.1 });
    slide.addText('$ gemini                           # ターミナルで実行\n\n# 1. "Login with Google" を選択\n# 2. ブラウザで Google アカウント認証\n# 3. 認証完了 → CLI に自動で戻る', { x: 0.5, y: 3.95, w: 9, h: 1.3, fontSize: 9, color: '88FF88', fontFace: 'Courier New' });

    // ========================================
    // Slide 9: Gemini CLI Options
    // ========================================
    slide = pptx.addSlide();
    slide.background = { color: BG_DARK };
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 0.8, fill: { color: ACCENT_TEAL } });
    slide.addText('Gemini CLI 起動オプション', { x: 0.5, y: 0.2, w: 9, h: 0.5, fontSize: 24, color: TEXT_WHITE, bold: true });

    const options = [
        { cmd: 'gemini', desc: '対話モードで起動', detail: '基本の起動方法', isNew: false },
        { cmd: 'gemini -m gemini-2.5-flash', desc: 'モデル指定', detail: '高速モデルを使用', isNew: false },
        { cmd: 'gemini --resume [index/UUID]', desc: 'セッション再開', detail: '前回の続きから', isNew: true },
        { cmd: 'gemini --sandbox / -s', desc: 'サンドボックス', detail: 'Docker で安全に実行', isNew: true },
        { cmd: 'gemini --yolo', desc: '全ツール自動承認', detail: '確認なしで実行', isNew: false },
        { cmd: 'gemini --allowed-tools "ShellTool(git)"', desc: '特定ツールのみ許可', detail: '指定したツールの確認をスキップ', isNew: true }
    ];

    options.forEach((o, i) => {
        const y = 1.0 + i * 0.62;
        slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y, w: 9.2, h: 0.55, fill: { color: BOX_BG }, rectRadius: 0.08 });
        if (o.isNew) {
            slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.45, y: y + 0.12, w: 0.5, h: 0.3, fill: { color: NEW_BADGE }, rectRadius: 0.15 });
            slide.addText('NEW', { x: 0.45, y: y + 0.12, w: 0.5, h: 0.3, fontSize: 7, color: TEXT_WHITE, bold: true, align: 'center', valign: 'middle' });
        }
        const cmdX = o.isNew ? 1.0 : 0.5;
        slide.addText(o.cmd, { x: cmdX, y: y + 0.02, w: 5.0, h: 0.25, fontSize: 10, color: '88FF88', fontFace: 'Courier New' });
        slide.addText(o.desc, { x: 5.6, y: y + 0.02, w: 2.2, h: 0.25, fontSize: 10, color: ACCENT_TEAL, bold: true });
        slide.addText(o.detail, { x: cmdX, y: y + 0.28, w: 8.5, h: 0.22, fontSize: 9, color: TEXT_GRAY });
    });

    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 4.8, w: 9.2, h: 0.55, fill: { color: '4A2D2D' }, rectRadius: 0.08 });
    slide.addText('⚠️ --yolo は自動でサンドボックスが有効になります。意図しないファイル変更に注意', { x: 0.5, y: 4.85, w: 9, h: 0.45, fontSize: 10, color: ACCENT_YELLOW, align: 'center', valign: 'middle' });

    // ========================================
    // Slide 10: Slash Commands
    // ========================================
    slide = pptx.addSlide();
    slide.background = { color: BG_DARK };
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 0.8, fill: { color: ACCENT_BLUE } });
    slide.addText('スラッシュコマンド一覧', { x: 0.5, y: 0.2, w: 9, h: 0.5, fontSize: 24, color: TEXT_WHITE, bold: true });

    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 0.95, w: 9.2, h: 0.5, fill: { color: TIP_BG }, rectRadius: 0.08 });
    slide.addText('💡 対話モード内で / から始まるコマンドで様々な操作が可能', { x: 0.5, y: 1.0, w: 9, h: 0.4, fontSize: 11, color: TEXT_WHITE, align: 'center', valign: 'middle' });

    const cmdGroups = [
        {
            title: '基本', cmds: [
                { cmd: '/help', desc: 'ヘルプ表示' },
                { cmd: '/tools', desc: '利用可能ツール一覧' },
                { cmd: '/model', desc: 'モデル選択' },
                { cmd: '/settings', desc: '設定エディタ' },
                { cmd: '/theme', desc: 'テーマ変更' },
                { cmd: '/clear', desc: '画面クリア' }
            ]
        },
        {
            title: 'セッション管理', cmds: [
                { cmd: '/resume', desc: 'セッション再開' },
                { cmd: '/chat save', desc: '保存' },
                { cmd: '/chat resume', desc: '復元' },
                { cmd: '/chat share', desc: 'エクスポート' },
                { cmd: '/compress', desc: 'トークン節約' },
                { cmd: '/rewind', desc: '巻き戻し' }
            ]
        },
        {
            title: 'スキル・拡張', cmds: [
                { cmd: '/skills list', desc: 'スキル一覧' },
                { cmd: '/skills reload', desc: '再読み込み' },
                { cmd: '/memory show', desc: 'コンテキスト表示' },
                { cmd: '/mcp', desc: 'MCP サーバー' },
                { cmd: '/extensions', desc: '拡張機能' },
                { cmd: '/restore', desc: 'ファイル復元' }
            ]
        }
    ];

    cmdGroups.forEach((group, gi) => {
        const x = 0.4 + gi * 3.2;
        slide.addText(group.title, { x, y: 1.55, w: 3.0, h: 0.35, fontSize: 12, color: ACCENT_TEAL, bold: true });
        slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x, y: 1.9, w: 3.0, h: 3.3, fill: { color: BOX_BG }, rectRadius: 0.1 });
        group.cmds.forEach((c, ci) => {
            const y = 2.0 + ci * 0.5;
            slide.addText(c.cmd, { x: x + 0.1, y, w: 1.5, h: 0.25, fontSize: 9, color: '88FF88', fontFace: 'Courier New' });
            slide.addText(c.desc, { x: x + 0.1, y: y + 0.22, w: 2.8, h: 0.22, fontSize: 9, color: TEXT_GRAY });
        });
    });

    // ========================================
    // Slide 11: GEMINI.md Context Files
    // ========================================
    slide = pptx.addSlide();
    slide.background = { color: BG_DARK };
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 0.8, fill: { color: ACCENT_BLUE } });
    slide.addText('GEMINI.md コンテキストファイル', { x: 0.5, y: 0.2, w: 9, h: 0.5, fontSize: 22, color: TEXT_WHITE, bold: true });

    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 1.0, w: 9.2, h: 0.7, fill: { color: TIP_BG }, rectRadius: 0.1 });
    slide.addText('💡 プロジェクト固有の指示を AI に伝える仕組み（Claude の CLAUDE.md と同様）', { x: 0.5, y: 1.1, w: 9, h: 0.25, fontSize: 11, color: ACCENT_YELLOW, bold: true, align: 'center' });
    slide.addText('コーディングスタイル、API ガイドライン、依存関係ルールなどを設定可能', { x: 0.5, y: 1.4, w: 9, h: 0.25, fontSize: 10, color: TEXT_WHITE, align: 'center' });

    slide.addText('読み込み優先順位（階層構造）', { x: 0.4, y: 1.85, w: 4.5, h: 0.35, fontSize: 13, color: ACCENT_TEAL, bold: true });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 2.25, w: 4.5, h: 2.5, fill: { color: BOX_BG }, rectRadius: 0.1 });

    const hierarchy = [
        { num: '1', path: '~/.gemini/GEMINI.md', scope: 'グローバル（全プロジェクト共通）' },
        { num: '2', path: '.gemini/GEMINI.md', scope: 'プロジェクトルート' },
        { num: '3', path: 'src/GEMINI.md', scope: 'サブディレクトリ（モジュール固有）' }
    ];

    hierarchy.forEach((h, i) => {
        const y = 2.4 + i * 0.75;
        slide.addShape(pptx.shapes.OVAL, { x: 0.5, y, w: 0.35, h: 0.35, fill: { color: ACCENT_RED } });
        slide.addText(h.num, { x: 0.5, y, w: 0.35, h: 0.35, fontSize: 12, color: TEXT_WHITE, bold: true, align: 'center', valign: 'middle' });
        slide.addText(h.path, { x: 0.95, y, w: 3.8, h: 0.25, fontSize: 10, color: '88FF88', fontFace: 'Courier New' });
        slide.addText(h.scope, { x: 0.95, y: y + 0.28, w: 3.8, h: 0.25, fontSize: 9, color: TEXT_GRAY });
    });

    slide.addText('記述例', { x: 5.1, y: 1.85, w: 4.5, h: 0.35, fontSize: 13, color: ACCENT_TEAL, bold: true });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 5.1, y: 2.25, w: 4.5, h: 2.5, fill: { color: '0D0D1A' }, rectRadius: 0.1 });
    slide.addText('# Project: My App\n\n## General Instructions\n- Follow existing coding style\n- Add JSDoc comments\n- Use TypeScript 5.0+\n\n## Coding Style\n- 2 spaces for indentation\n- Interface names with `I` prefix\n- Always use strict equality', { x: 5.2, y: 2.3, w: 4.3, h: 2.4, fontSize: 8, color: '88FF88', fontFace: 'Courier New' });

    // ========================================
    // Slide 12: Phase 1 - Skills
    // ========================================
    slide = pptx.addSlide();
    slide.background = { color: BG_DARK };
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 0.8, fill: { color: ACCENT_RED } });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 0.18, w: 1.2, h: 0.45, fill: { color: TEXT_WHITE }, rectRadius: 0.22 });
    slide.addText('Phase 1', { x: 0.4, y: 0.18, w: 1.2, h: 0.45, fontSize: 14, color: ACCENT_RED, bold: true, align: 'center', valign: 'middle' });
    slide.addText('スキル（Skills）とは？', { x: 1.8, y: 0.2, w: 7, h: 0.5, fontSize: 26, color: TEXT_WHITE, bold: true });

    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 1.0, w: 9.2, h: 1.0, fill: { color: TIP_BG }, rectRadius: 0.1 });
    slide.addText('💡 スキル = AI に「専門知識」をオンデマンドで追加する仕組み', { x: 0.5, y: 1.1, w: 9, h: 0.4, fontSize: 14, color: ACCENT_YELLOW, bold: true, align: 'center' });
    slide.addText('ゲーム開発、API 設計など特定タスクに最適化された振る舞いを与えられます', { x: 0.5, y: 1.5, w: 9, h: 0.35, fontSize: 11, color: TEXT_WHITE, align: 'center' });

    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 2.2, w: 3.8, h: 1.8, fill: { color: BOX_BG }, rectRadius: 0.1 });
    slide.addText('スキルなし', { x: 0.4, y: 2.3, w: 3.8, h: 0.3, fontSize: 11, color: TEXT_GRAY, align: 'center' });
    slide.addText('🤖', { x: 0.4, y: 2.6, w: 3.8, h: 0.5, fontSize: 32, align: 'center' });
    slide.addText('「グリッドゲーム？\nえーと、どう作るかな...」', { x: 0.5, y: 3.1, w: 3.6, h: 0.6, fontSize: 10, color: TEXT_GRAY, align: 'center' });

    slide.addShape(pptx.shapes.RIGHT_ARROW, { x: 4.4, y: 2.9, w: 0.6, h: 0.4, fill: { color: ACCENT_TEAL } });
    slide.addText('+スキル', { x: 4.3, y: 3.35, w: 0.8, h: 0.25, fontSize: 9, color: ACCENT_TEAL, align: 'center' });

    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 5.3, y: 2.2, w: 4.3, h: 1.8, fill: { color: ACCENT_RED }, rectRadius: 0.1 });
    slide.addText('スキルあり', { x: 5.3, y: 2.3, w: 4.3, h: 0.3, fontSize: 11, color: TEXT_WHITE, align: 'center' });
    slide.addText('🎮🤖', { x: 5.3, y: 2.6, w: 4.3, h: 0.5, fontSize: 32, align: 'center' });
    slide.addText('「CSS Grid で10x10作って、\nキーボードイベントで移動...」', { x: 5.4, y: 3.1, w: 4.1, h: 0.6, fontSize: 10, color: TEXT_WHITE, align: 'center' });

    slide.addText('今日使うスキル', { x: 0.4, y: 4.2, w: 9, h: 0.35, fontSize: 12, color: TEXT_WHITE, bold: true });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 4.55, w: 9.2, h: 0.7, fill: { color: BOX_BG }, rectRadius: 0.08 });
    slide.addText('• react-css-grid-game-rendering  →  グリッドゲーム開発の専門知識\n• avax-like-frontend-design  →  Avalanche 風デザインの知識', { x: 0.5, y: 4.6, w: 9, h: 0.6, fontSize: 10, color: TEXT_GRAY });

    // ========================================
    // Slide 13: Community Skills Repositories (NEW)
    // ========================================
    slide = pptx.addSlide();
    slide.background = { color: BG_DARK };
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 0.8, fill: { color: NEW_BADGE } });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 0.18, w: 0.8, h: 0.45, fill: { color: ACCENT_YELLOW }, rectRadius: 0.22 });
    slide.addText('NEW', { x: 0.4, y: 0.18, w: 0.8, h: 0.45, fontSize: 12, color: BG_DARK, bold: true, align: 'center', valign: 'middle' });
    slide.addText('スキルの入手先', { x: 1.4, y: 0.2, w: 8, h: 0.5, fontSize: 24, color: TEXT_WHITE, bold: true });

    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 1.0, w: 9.2, h: 0.7, fill: { color: TIP_BG }, rectRadius: 0.1 });
    slide.addText('💡 Agent Skills オープンスタンダード：Claude Code / Gemini CLI / Cursor 間で互換性あり', { x: 0.5, y: 1.1, w: 9, h: 0.25, fontSize: 11, color: ACCENT_YELLOW, bold: true, align: 'center' });
    slide.addText('どのツール向けのスキルでも、他のツールで使用可能！', { x: 0.5, y: 1.4, w: 9, h: 0.25, fontSize: 10, color: TEXT_WHITE, align: 'center' });

    slide.addText('コミュニティリポジトリ', { x: 0.4, y: 1.85, w: 9, h: 0.35, fontSize: 14, color: ACCENT_TEAL, bold: true });

    const skillRepos = [
        { name: 'VoltAgent/awesome-agent-skills', count: '200+', desc: 'AI コーディングアシスタント向け公式キュレーション' },
        { name: 'sickn33/antigravity-awesome-skills', count: '626+', desc: '最大のコミュニティコレクション' },
        { name: 'anthropic-agent-skills', count: '-', desc: 'Anthropic 公式（Claude Code プラグイン内蔵）' },
        { name: 'buildatscale-tv/gemini-skills', count: '-', desc: 'Gemini CLI 向けスキルテンプレート' }
    ];

    skillRepos.forEach((r, i) => {
        const y = 2.3 + i * 0.7;
        slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y, w: 9.2, h: 0.6, fill: { color: BOX_BG }, rectRadius: 0.08 });
        slide.addText(r.name, { x: 0.5, y, w: 5.0, h: 0.3, fontSize: 11, color: ACCENT_TEAL, fontFace: 'Courier New', bold: true });
        if (r.count !== '-') {
            slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 5.6, y: y + 0.05, w: 0.8, h: 0.25, fill: { color: ACCENT_RED }, rectRadius: 0.12 });
            slide.addText(r.count, { x: 5.6, y: y + 0.05, w: 0.8, h: 0.25, fontSize: 9, color: TEXT_WHITE, bold: true, align: 'center', valign: 'middle' });
        }
        slide.addText(r.desc, { x: 0.5, y: y + 0.3, w: 9, h: 0.25, fontSize: 9, color: TEXT_GRAY });
    });

    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 5.15, w: 9.2, h: 0.25, fill: { color: '333355' }, rectRadius: 0.08 });
    slide.addText('🔍 GitHub で "agent skills" または "gemini skills" で検索', { x: 0.5, y: 5.15, w: 9, h: 0.25, fontSize: 9, color: TEXT_GRAY, align: 'center', valign: 'middle' });

    // ========================================
    // Slide 14: Skill Installation
    // ========================================
    slide = pptx.addSlide();
    slide.background = { color: BG_DARK };
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 0.8, fill: { color: ACCENT_RED } });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 0.18, w: 1.2, h: 0.45, fill: { color: TEXT_WHITE }, rectRadius: 0.22 });
    slide.addText('Phase 1', { x: 0.4, y: 0.18, w: 1.2, h: 0.45, fontSize: 14, color: ACCENT_RED, bold: true, align: 'center', valign: 'middle' });
    slide.addText('スキルのインストール', { x: 1.8, y: 0.2, w: 7, h: 0.5, fontSize: 26, color: TEXT_WHITE, bold: true });

    slide.addText('Step 1: ターミナルで実行（Gemini CLI の外で）', { x: 0.4, y: 1.0, w: 9, h: 0.3, fontSize: 12, color: ACCENT_TEAL, bold: true });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 1.35, w: 9.2, h: 1.3, fill: { color: '0D0D1A' }, rectRadius: 0.1 });
    slide.addText('# Git リポジトリ、ローカルディレクトリ、.skill ファイルからインストール可能\n\n# グリッドゲームスキル\ngemini skills install https://github.com/CobaltSato/react-grid-game-rendering-skill/blob/main/react-css-grid-game-rendering.skill --scope workspace\n\n# Avalanche デザインスキル\ngemini skills install https://github.com/CobaltSato/react-grid-game-rendering-skill/blob/main/avax-like-frontend-design.skill --scope workspace', { x: 0.5, y: 1.4, w: 9, h: 1.2, fontSize: 8, color: '88FF88', fontFace: 'Courier New' });

    slide.addText('Step 2: Gemini CLI 内でリロード', { x: 0.4, y: 2.8, w: 5, h: 0.3, fontSize: 12, color: ACCENT_TEAL, bold: true });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 3.15, w: 4.4, h: 0.7, fill: { color: '0D0D1A' }, rectRadius: 0.1 });
    slide.addText('/skills reload    # スキルを再読み込み\n/skills list      # インストール確認', { x: 0.5, y: 3.2, w: 4.2, h: 0.6, fontSize: 10, color: '88FF88', fontFace: 'Courier New' });

    slide.addText('スコープ（保存場所）', { x: 5.0, y: 2.8, w: 4.6, h: 0.3, fontSize: 12, color: ACCENT_TEAL, bold: true });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 5.0, y: 3.15, w: 4.6, h: 1.5, fill: { color: BOX_BG }, rectRadius: 0.1 });
    slide.addText('--scope workspace\n  → .gemini/skills/ に保存\n  → このプロジェクトのみ\n\n--scope user (デフォルト)\n  → ~/.gemini/skills/ に保存\n  → 全プロジェクト共通', { x: 5.1, y: 3.2, w: 4.4, h: 1.4, fontSize: 9, color: TEXT_GRAY });

    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 4.0, w: 4.4, h: 1.25, fill: { color: BOX_BG }, rectRadius: 0.1 });
    slide.addText('その他のスキル管理コマンド', { x: 0.5, y: 4.05, w: 4.2, h: 0.25, fontSize: 10, color: ACCENT_TEAL, bold: true });
    slide.addText('gemini skills list          # 一覧\ngemini skills uninstall     # 削除\ngemini skills enable/disable # 有効/無効', { x: 0.5, y: 4.3, w: 4.2, h: 0.9, fontSize: 9, color: TEXT_GRAY, fontFace: 'Courier New' });

    // ========================================
    // Slide 15-18: Phase 2-5 (Contract, Deploy, App, Test) - Condensed
    // ========================================

    // Slide 15: Phase 2 - Smart Contract
    slide = pptx.addSlide();
    slide.background = { color: BG_DARK };
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 0.8, fill: { color: ACCENT_RED } });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 0.18, w: 1.2, h: 0.45, fill: { color: TEXT_WHITE }, rectRadius: 0.22 });
    slide.addText('Phase 2', { x: 0.4, y: 0.18, w: 1.2, h: 0.45, fontSize: 14, color: ACCENT_RED, bold: true, align: 'center', valign: 'middle' });
    slide.addText('スマートコントラクト作成', { x: 1.8, y: 0.2, w: 7, h: 0.5, fontSize: 26, color: TEXT_WHITE, bold: true });

    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 1.0, w: 9.2, h: 0.7, fill: { color: TIP_BG }, rectRadius: 0.1 });
    slide.addText('💡 スマートコントラクト = ブロックチェーン上で動く「自動実行プログラム」', { x: 0.5, y: 1.1, w: 9, h: 0.25, fontSize: 11, color: ACCENT_YELLOW, bold: true, align: 'center' });
    slide.addText('データの保存・取得ルールを定義。一度デプロイすると改ざん不可能！', { x: 0.5, y: 1.4, w: 9, h: 0.25, fontSize: 10, color: TEXT_WHITE, align: 'center' });

    slide.addText('Gemini に依頼するプロンプト', { x: 0.4, y: 1.85, w: 5.5, h: 0.35, fontSize: 13, color: ACCENT_TEAL, bold: true });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 2.25, w: 5.5, h: 2.5, fill: { color: BOX_BG }, rectRadius: 0.1 });
    slide.addText('プレイヤーの 10x10 座標を保存・取得\nできるコントラクトを作成して。\n\n要件:\n- 位置を初期化する関数\n- 1歩移動する関数（上下左右）\n- 座標は 0-9 の範囲に制限\n\n出力先:\n- Solidity: contracts/PositionTracker.sol\n- ABI: .env.local.example に追記', { x: 0.5, y: 2.35, w: 5.3, h: 2.3, fontSize: 10, color: TEXT_GRAY });

    slide.addText('Gemini がやること', { x: 6.1, y: 1.85, w: 3.5, h: 0.35, fontSize: 13, color: ACCENT_TEAL, bold: true });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 6.1, y: 2.25, w: 3.5, h: 2.5, fill: { color: BOX_BG }, rectRadius: 0.1 });
    const geminiDoes = [
        { icon: '📄', text: 'Solidity コード生成' },
        { icon: '💾', text: 'ファイルに保存' },
        { icon: '📋', text: 'ABI を抽出' },
        { icon: '✅', text: '動作確認' }
    ];
    geminiDoes.forEach((g, i) => {
        slide.addText(g.icon + ' ' + g.text, { x: 6.2, y: 2.45 + i * 0.5, w: 3.3, h: 0.4, fontSize: 11, color: TEXT_WHITE, valign: 'middle' });
    });

    // Slide 16: Phase 3 - Deploy
    slide = pptx.addSlide();
    slide.background = { color: BG_DARK };
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 0.8, fill: { color: ACCENT_RED } });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 0.18, w: 1.2, h: 0.45, fill: { color: TEXT_WHITE }, rectRadius: 0.22 });
    slide.addText('Phase 3', { x: 0.4, y: 0.18, w: 1.2, h: 0.45, fontSize: 14, color: ACCENT_RED, bold: true, align: 'center', valign: 'middle' });
    slide.addText('コントラクトをデプロイ', { x: 1.8, y: 0.2, w: 7, h: 0.5, fontSize: 26, color: TEXT_WHITE, bold: true });

    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 1.0, w: 9.2, h: 0.8, fill: { color: TIP_BG }, rectRadius: 0.1 });
    slide.addText('💡 Fuji テストネット = Avalanche の「練習場」', { x: 0.5, y: 1.1, w: 9, h: 0.3, fontSize: 12, color: ACCENT_YELLOW, bold: true, align: 'center' });
    slide.addText('本番（Mainnet）と同じ仕組み。無料のテスト AVAX を使って開発・テストできます', { x: 0.5, y: 1.45, w: 9, h: 0.3, fontSize: 10, color: TEXT_WHITE, align: 'center' });

    const deploySteps = [
        { num: '1', title: 'テスト AVAX 取得', desc: 'Faucet から無料で入手\nbuild.avax.network/\nconsole/primary-network/faucet' },
        { num: '2', title: 'Remix でデプロイ', desc: 'remix.ethereum.org\nで Solidity をコンパイル\n→ Fuji にデプロイ' },
        { num: '3', title: '環境変数設定', desc: 'cp .env.local.example .env.local\nアドレスを設定' }
    ];

    deploySteps.forEach((d, i) => {
        const x = 0.5 + i * 3.2;
        slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x, y: 2.0, w: 2.9, h: 2.6, fill: { color: BOX_BG }, rectRadius: 0.12 });
        slide.addShape(pptx.shapes.OVAL, { x: x + 1.05, y: 2.15, w: 0.8, h: 0.8, fill: { color: ACCENT_RED } });
        slide.addText(d.num, { x: x + 1.05, y: 2.15, w: 0.8, h: 0.8, fontSize: 24, color: TEXT_WHITE, bold: true, align: 'center', valign: 'middle' });
        slide.addText(d.title, { x, y: 3.1, w: 2.9, h: 0.35, fontSize: 12, color: TEXT_WHITE, bold: true, align: 'center' });
        slide.addText(d.desc, { x, y: 3.5, w: 2.9, h: 1.0, fontSize: 9, color: TEXT_GRAY, align: 'center' });
    });

    // Slide 17: Phase 4 - App Creation
    slide = pptx.addSlide();
    slide.background = { color: BG_DARK };
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 0.8, fill: { color: ACCENT_YELLOW } });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 0.18, w: 1.2, h: 0.45, fill: { color: BG_DARK }, rectRadius: 0.22 });
    slide.addText('Phase 4', { x: 0.4, y: 0.18, w: 1.2, h: 0.45, fontSize: 14, color: ACCENT_YELLOW, bold: true, align: 'center', valign: 'middle' });
    slide.addText('アプリ作成（メイン！）', { x: 1.8, y: 0.2, w: 7, h: 0.5, fontSize: 26, color: BG_DARK, bold: true });

    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 1.0, w: 9.2, h: 0.7, fill: { color: TIP_BG }, rectRadius: 0.1 });
    slide.addText('💡 タスク管理を AI にさせる', { x: 0.5, y: 1.1, w: 9, h: 0.3, fontSize: 12, color: ACCENT_YELLOW, bold: true, align: 'center' });
    slide.addText('Gemini にフェーズ分割でタスクを管理させ、段階的に検収しながら進められます', { x: 0.5, y: 1.4, w: 9, h: 0.25, fontSize: 10, color: TEXT_WHITE, align: 'center' });

    slide.addText('Gemini に依頼するプロンプト', { x: 0.4, y: 1.85, w: 9, h: 0.35, fontSize: 13, color: ACCENT_TEAL, bold: true });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 2.25, w: 9.2, h: 2.6, fill: { color: BOX_BG }, rectRadius: 0.1 });
    slide.addText('10x10 の 2D グリッドゲームを作成して。\n\n要件:\n- react-css-grid-game-rendering スキルを使用\n- 日本語で docs/task.md にタスクリストを生成（5フェーズ）\n- タスク完了ごとに task.md にチェックを入れる\n- フェーズごとにユーザー検収を促す\n- キーボード（↑↓←→）でプレイヤーを移動\n- 移動時にコントラクトに座標を書き込む\n\n参照ファイル:\n- contracts/PositionTracker.sol\n- .env.local（コントラクトアドレス・ABI）', { x: 0.5, y: 2.35, w: 9, h: 2.4, fontSize: 10, color: TEXT_GRAY });

    // Slide 18: Phase 5 - Testing
    slide = pptx.addSlide();
    slide.background = { color: BG_DARK };
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 0.8, fill: { color: ACCENT_TEAL } });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 0.18, w: 1.2, h: 0.45, fill: { color: TEXT_WHITE }, rectRadius: 0.22 });
    slide.addText('Phase 5', { x: 0.4, y: 0.18, w: 1.2, h: 0.45, fontSize: 14, color: ACCENT_TEAL, bold: true, align: 'center', valign: 'middle' });
    slide.addText('動作確認', { x: 1.8, y: 0.2, w: 7, h: 0.5, fontSize: 26, color: TEXT_WHITE, bold: true });

    const testSteps = [
        { num: '1', title: 'サーバー起動', cmd: 'npm run dev', desc: 'ターミナルで実行' },
        { num: '2', title: 'ブラウザ', cmd: 'localhost:3000', desc: 'Wallet 接続' },
        { num: '3', title: 'ゲーム', cmd: '← → ↑ ↓', desc: '矢印キーで移動' },
        { num: '4', title: '確認', cmd: 'Approve', desc: 'Tx を承認' }
    ];

    testSteps.forEach((s, i) => {
        const x = 0.3 + i * 2.4;
        slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x, y: 1.1, w: 2.2, h: 2.6, fill: { color: BOX_BG }, rectRadius: 0.12 });
        slide.addShape(pptx.shapes.OVAL, { x: x + 0.7, y: 1.3, w: 0.8, h: 0.8, fill: { color: ACCENT_RED } });
        slide.addText(s.num, { x: x + 0.7, y: 1.3, w: 0.8, h: 0.8, fontSize: 24, color: TEXT_WHITE, bold: true, align: 'center', valign: 'middle' });
        slide.addText(s.title, { x, y: 2.25, w: 2.2, h: 0.35, fontSize: 11, color: TEXT_WHITE, bold: true, align: 'center' });
        slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: x + 0.2, y: 2.7, w: 1.8, h: 0.4, fill: { color: '0D0D1A' }, rectRadius: 0.05 });
        slide.addText(s.cmd, { x: x + 0.2, y: 2.7, w: 1.8, h: 0.4, fontSize: 10, color: '88FF88', fontFace: 'Courier New', align: 'center', valign: 'middle' });
        slide.addText(s.desc, { x, y: 3.2, w: 2.2, h: 0.4, fontSize: 10, color: TEXT_GRAY, align: 'center' });
    });

    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 3.9, w: 9.2, h: 0.9, fill: { color: TIP_BG }, rectRadius: 0.1 });
    slide.addText('🎉 座標がブロックチェーンに保存されることを確認！', { x: 0.5, y: 4.0, w: 9, h: 0.35, fontSize: 13, color: ACCENT_YELLOW, bold: true, align: 'center' });
    slide.addText('リロードしても位置が保持されていれば成功です', { x: 0.5, y: 4.35, w: 9, h: 0.35, fontSize: 11, color: TEXT_WHITE, align: 'center' });

    // ========================================
    // Slide 19: Summary
    // ========================================
    slide = pptx.addSlide();
    slide.background = { color: BG_DARK };
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 0.8, fill: { color: ACCENT_TEAL } });
    slide.addText('🎉 デモ完了！', { x: 0.5, y: 0.2, w: 9, h: 0.5, fontSize: 28, color: TEXT_WHITE, bold: true });

    slide.addText('作ったもの', { x: 0.4, y: 1.0, w: 4.5, h: 0.35, fontSize: 15, color: ACCENT_RED, bold: true });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 1.4, w: 4.5, h: 1.8, fill: { color: BOX_BG }, rectRadius: 0.1 });

    const built = [
        { name: 'PositionTracker.sol', desc: '座標保存コントラクト' },
        { name: 'Grid Game UI', desc: 'React + CSS Grid' },
        { name: 'Wallet Integration', desc: 'Core Wallet + ethers.js' }
    ];
    built.forEach((b, i) => {
        const y = 1.5 + i * 0.55;
        slide.addText(b.name, { x: 0.5, y, w: 4.3, h: 0.25, fontSize: 11, color: ACCENT_TEAL, bold: true });
        slide.addText(b.desc, { x: 0.5, y: y + 0.25, w: 4.3, h: 0.25, fontSize: 10, color: TEXT_GRAY });
    });

    slide.addText('学んだこと', { x: 5.1, y: 1.0, w: 4.5, h: 0.35, fontSize: 15, color: ACCENT_RED, bold: true });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 5.1, y: 1.4, w: 4.5, h: 1.8, fill: { color: BOX_BG }, rectRadius: 0.1 });

    const learned = ['Gemini CLI で AI 駆動開発', 'スキルで専門知識を追加', 'Avalanche Fuji でデプロイ', 'フェーズ分割でタスク管理'];
    learned.forEach((l, i) => {
        const y = 1.5 + i * 0.42;
        slide.addShape(pptx.shapes.OVAL, { x: 5.2, y, w: 0.3, h: 0.3, fill: { color: ACCENT_RED } });
        slide.addText(String(i + 1), { x: 5.2, y, w: 0.3, h: 0.3, fontSize: 10, color: TEXT_WHITE, align: 'center', valign: 'middle' });
        slide.addText(l, { x: 5.6, y, w: 3.9, h: 0.3, fontSize: 10, color: TEXT_WHITE, valign: 'middle' });
    });

    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 3.4, w: 9.2, h: 1.1, fill: { color: TIP_BG }, rectRadius: 0.1 });
    slide.addText('💡 ポイント', { x: 0.5, y: 3.5, w: 9, h: 0.3, fontSize: 13, color: ACCENT_YELLOW, bold: true, align: 'center' });
    slide.addText('AI（Gemini CLI）+ 専門知識（Skills）+ ブロックチェーン（Avalanche）\n= 短時間で本格的な dApp が作れる！', { x: 0.5, y: 3.85, w: 9, h: 0.55, fontSize: 12, color: TEXT_WHITE, align: 'center' });

    // ========================================
    // Slide 20: Quick Reference
    // ========================================
    slide = pptx.addSlide();
    slide.background = { color: BG_DARK };
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 0.8, fill: { color: ACCENT_RED } });
    slide.addText('📚 クイックリファレンス', { x: 0.5, y: 0.2, w: 9, h: 0.5, fontSize: 22, color: TEXT_WHITE, bold: true });

    slide.addText('Gemini CLI コマンド', { x: 0.4, y: 0.95, w: 4.5, h: 0.3, fontSize: 12, color: ACCENT_TEAL, bold: true });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 1.3, w: 4.5, h: 3.5, fill: { color: '0D0D1A' }, rectRadius: 0.1 });
    slide.addText('# 起動オプション\ngemini\ngemini -m gemini-2.5-flash\ngemini --resume [index/UUID]\ngemini --sandbox\ngemini --yolo\n\n# スラッシュコマンド\n/help /tools /model /settings\n/skills list|reload\n/memory show|refresh|add\n/chat save|resume|share\n/compress /rewind /restore\n/mcp /extensions\n\n# スキル管理\ngemini skills install <url>\ngemini skills uninstall <name>\ngemini skills enable|disable', { x: 0.5, y: 1.35, w: 4.3, h: 3.4, fontSize: 8, color: '88FF88', fontFace: 'Courier New' });

    slide.addText('参考リンク', { x: 5.1, y: 0.95, w: 4.5, h: 0.3, fontSize: 12, color: ACCENT_TEAL, bold: true });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 5.1, y: 1.3, w: 4.5, h: 2.3, fill: { color: BOX_BG }, rectRadius: 0.1 });

    const links = [
        { name: 'Core Wallet', url: 'core.app/download' },
        { name: 'Fuji Faucet', url: 'build.avax.network/console/primary-network/faucet' },
        { name: 'Remix IDE', url: 'remix.ethereum.org' },
        { name: 'Gemini CLI Docs', url: 'github.com/google-gemini/gemini-cli' },
        { name: 'Skills Repo', url: 'github.com/CobaltSato/react-grid-game-rendering-skill' }
    ];
    links.forEach((l, i) => {
        const y = 1.4 + i * 0.42;
        slide.addText(l.name, { x: 5.2, y, w: 1.8, h: 0.2, fontSize: 9, color: ACCENT_RED, bold: true });
        slide.addText(l.url, { x: 5.2, y: y + 0.18, w: 4.3, h: 0.2, fontSize: 7, color: TEXT_GRAY });
    });

    // PR Link Section - For Claude Code users
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 5.1, y: 3.7, w: 4.5, h: 1.1, fill: { color: CLAUDE_ORANGE }, rectRadius: 0.1 });
    slide.addText('🔗 Claude Code を使いたい方へ', { x: 5.2, y: 3.75, w: 4.3, h: 0.3, fontSize: 10, color: TEXT_WHITE, bold: true });
    slide.addText('Claude Code 用の設定が入った PR:', { x: 5.2, y: 4.0, w: 4.3, h: 0.25, fontSize: 9, color: TEXT_WHITE });
    slide.addText('github.com/CobaltSato/\navalanche-build-games-tool-kit/pull/1', { x: 5.2, y: 4.25, w: 4.3, h: 0.5, fontSize: 8, color: TEXT_WHITE });

    // ========================================
    // APPENDIX: Claude Code Slides
    // ========================================

    // Slide 21: Appendix Title - Claude Code
    slide = pptx.addSlide();
    slide.background = { color: BG_DARK };
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: '100%', fill: { color: CLAUDE_ORANGE } });
    slide.addText('APPENDIX', { x: 0.5, y: 1.5, w: 9, h: 0.6, fontSize: 24, color: TEXT_WHITE, align: 'center' });
    slide.addText('Claude Code', { x: 0.5, y: 2.2, w: 9, h: 1.0, fontSize: 48, color: TEXT_WHITE, bold: true, align: 'center' });
    slide.addText('Anthropic の AI コーディングアシスタント', { x: 0.5, y: 3.2, w: 9, h: 0.5, fontSize: 20, color: TEXT_WHITE, align: 'center' });
    slide.addText('Gemini CLI との比較 & 実践ガイド', { x: 0.5, y: 3.8, w: 9, h: 0.4, fontSize: 14, color: TEXT_WHITE, align: 'center' });

    // Slide 22: What is Claude Code?
    slide = pptx.addSlide();
    slide.background = { color: BG_DARK };
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 0.8, fill: { color: CLAUDE_ORANGE } });
    slide.addText('Claude Code とは？', { x: 0.5, y: 0.2, w: 9, h: 0.5, fontSize: 26, color: TEXT_WHITE, bold: true });

    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 1.0, w: 9.2, h: 0.9, fill: { color: BOX_BG }, rectRadius: 0.1 });
    slide.addText('Anthropic の Claude AI をターミナルから操作できる CLI ツール', { x: 0.5, y: 1.1, w: 9, h: 0.35, fontSize: 14, color: TEXT_WHITE, bold: true, align: 'center' });
    slide.addText('Gemini CLI と同じ「AI コーディングアシスタント」カテゴリ。スキルも互換性あり！', { x: 0.5, y: 1.5, w: 9, h: 0.3, fontSize: 11, color: TEXT_GRAY, align: 'center' });

    const claudeFeatures = [
        { icon: '📝', title: 'CLAUDE.md', desc: 'プロジェクト指示\nコンテキストファイル' },
        { icon: '🎣', title: 'Hooks', desc: 'PreToolUse\nPostToolUse' },
        { icon: '🎯', title: 'Skills', desc: 'SKILL.md\n(Gemini互換)' },
        { icon: '🔌', title: 'MCP', desc: 'Playwright\nContext7 等' }
    ];

    claudeFeatures.forEach((f, i) => {
        const x = 0.4 + i * 2.4;
        slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x, y: 2.1, w: 2.2, h: 1.8, fill: { color: BOX_BG }, rectRadius: 0.12 });
        slide.addText(f.icon, { x, y: 2.2, w: 2.2, h: 0.45, fontSize: 26, align: 'center' });
        slide.addText(f.title, { x, y: 2.65, w: 2.2, h: 0.3, fontSize: 12, color: CLAUDE_ORANGE, bold: true, align: 'center' });
        slide.addText(f.desc, { x, y: 3.0, w: 2.2, h: 0.7, fontSize: 10, color: TEXT_GRAY, align: 'center' });
    });

    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 4.1, w: 9.2, h: 1.1, fill: { color: TIP_BG }, rectRadius: 0.1 });
    slide.addText('💡 everything-claude-code', { x: 0.5, y: 4.2, w: 9, h: 0.3, fontSize: 12, color: ACCENT_YELLOW, bold: true, align: 'center' });
    slide.addText('Anthropic x Forum Ventures ハッカソン優勝者の設定集\n実戦的な agents, skills, rules, hooks の構成例を提供', { x: 0.5, y: 4.55, w: 9, h: 0.55, fontSize: 10, color: TEXT_WHITE, align: 'center' });

    // Slide 23: Gemini CLI vs Claude Code Comparison
    slide = pptx.addSlide();
    slide.background = { color: BG_DARK };
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 0.8, fill: { color: CLAUDE_ORANGE } });
    slide.addText('Gemini CLI vs Claude Code 比較', { x: 0.5, y: 0.2, w: 9, h: 0.5, fontSize: 24, color: TEXT_WHITE, bold: true });

    const comparisonItems = [
        { feature: 'コンテキストファイル', gemini: 'GEMINI.md', claude: 'CLAUDE.md', notes: '同じ仕組み' },
        { feature: 'スキル', gemini: 'SKILL.md', claude: 'SKILL.md', notes: '互換性あり ✓' },
        { feature: 'フック', gemini: '(なし)', claude: 'PreToolUse / PostToolUse', notes: 'Claude のみ' },
        { feature: 'MCP サポート', gemini: '✓', claude: '✓', notes: '同じ' },
        { feature: 'スラッシュコマンド', gemini: '/skills, /memory 等', claude: '/plan, /tdd 等', notes: '異なるコマンド' },
        { feature: 'エージェント', gemini: '(スキルで実現)', claude: '.claude/agents/', notes: 'Claude は専用機能' },
        { feature: 'ルール', gemini: '(GEMINI.md)', claude: '.claude/rules/', notes: 'Claude は専用機能' }
    ];

    // Header
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 1.0, w: 9.2, h: 0.45, fill: { color: '333355' }, rectRadius: 0.05 });
    slide.addText('機能', { x: 0.5, y: 1.0, w: 2.0, h: 0.45, fontSize: 10, color: ACCENT_TEAL, bold: true, valign: 'middle' });
    slide.addText('Gemini CLI', { x: 2.6, y: 1.0, w: 2.5, h: 0.45, fontSize: 10, color: ACCENT_TEAL, bold: true, align: 'center', valign: 'middle' });
    slide.addText('Claude Code', { x: 5.2, y: 1.0, w: 2.5, h: 0.45, fontSize: 10, color: CLAUDE_ORANGE, bold: true, align: 'center', valign: 'middle' });
    slide.addText('備考', { x: 7.8, y: 1.0, w: 1.8, h: 0.45, fontSize: 10, color: TEXT_GRAY, bold: true, align: 'center', valign: 'middle' });

    comparisonItems.forEach((c, i) => {
        const y = 1.55 + i * 0.48;
        slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y, w: 9.2, h: 0.42, fill: { color: i % 2 === 0 ? BOX_BG : '1E1E3A' }, rectRadius: 0.05 });
        slide.addText(c.feature, { x: 0.5, y, w: 2.0, h: 0.42, fontSize: 9, color: TEXT_WHITE, valign: 'middle' });
        slide.addText(c.gemini, { x: 2.6, y, w: 2.5, h: 0.42, fontSize: 9, color: '88FF88', fontFace: 'Courier New', align: 'center', valign: 'middle' });
        slide.addText(c.claude, { x: 5.2, y, w: 2.5, h: 0.42, fontSize: 9, color: CLAUDE_ORANGE, fontFace: 'Courier New', align: 'center', valign: 'middle' });
        slide.addText(c.notes, { x: 7.8, y, w: 1.8, h: 0.42, fontSize: 8, color: TEXT_GRAY, align: 'center', valign: 'middle' });
    });

    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 5.0, w: 9.2, h: 0.4, fill: { color: TIP_BG }, rectRadius: 0.08 });
    slide.addText('💡 スキル（SKILL.md）は Agent Skills オープンスタンダードに準拠、ツール間で共有可能！', { x: 0.5, y: 5.0, w: 9, h: 0.4, fontSize: 10, color: TEXT_WHITE, align: 'center', valign: 'middle' });

    // Slide 24: Claude Code Hooks System
    slide = pptx.addSlide();
    slide.background = { color: BG_DARK };
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 0.8, fill: { color: CLAUDE_ORANGE } });
    slide.addText('Claude Code Hooks システム', { x: 0.5, y: 0.2, w: 9, h: 0.5, fontSize: 24, color: TEXT_WHITE, bold: true });

    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 1.0, w: 9.2, h: 0.7, fill: { color: TIP_BG }, rectRadius: 0.1 });
    slide.addText('💡 Hooks = ツール実行の前後に自動実行されるイベント駆動スクリプト', { x: 0.5, y: 1.1, w: 9, h: 0.25, fontSize: 11, color: ACCENT_YELLOW, bold: true, align: 'center' });
    slide.addText('セキュリティチェック、フォーマット、ログ記録などを自動化', { x: 0.5, y: 1.4, w: 9, h: 0.25, fontSize: 10, color: TEXT_WHITE, align: 'center' });

    const hookTypes = [
        { name: 'PreToolUse', desc: 'ツール実行前', example: 'ファイル書き込み前に\nセキュリティチェック', color: ACCENT_TEAL },
        { name: 'PostToolUse', desc: 'ツール実行後', example: '編集後に Prettier で\n自動フォーマット', color: ACCENT_BLUE },
        { name: 'Stop', desc: 'セッション終了時', example: 'console.log の\n残留チェック', color: ACCENT_YELLOW },
        { name: 'SessionStart', desc: 'セッション開始時', example: 'プロジェクト\nコンテキスト読み込み', color: ACCENT_RED }
    ];

    hookTypes.forEach((h, i) => {
        const x = 0.4 + i * 2.4;
        slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x, y: 1.9, w: 2.2, h: 1.8, fill: { color: BOX_BG }, rectRadius: 0.1 });
        slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: x + 0.3, y: 2.0, w: 1.6, h: 0.35, fill: { color: h.color }, rectRadius: 0.17 });
        slide.addText(h.name, { x: x + 0.3, y: 2.0, w: 1.6, h: 0.35, fontSize: 10, color: TEXT_WHITE, bold: true, align: 'center', valign: 'middle' });
        slide.addText(h.desc, { x, y: 2.45, w: 2.2, h: 0.3, fontSize: 10, color: TEXT_WHITE, align: 'center' });
        slide.addText(h.example, { x, y: 2.8, w: 2.2, h: 0.7, fontSize: 9, color: TEXT_GRAY, align: 'center' });
    });

    // Code example
    slide.addText('PreToolUse フック例（JSON）', { x: 0.4, y: 3.9, w: 9, h: 0.3, fontSize: 12, color: ACCENT_TEAL, bold: true });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 4.25, w: 9.2, h: 1.1, fill: { color: '0D0D1A' }, rectRadius: 0.1 });
    slide.addText('{\n  "PreToolUse": [{\n    "matcher": "Write|Edit",\n    "hooks": [{ "type": "prompt", "prompt": "Validate file write safety. Check: system paths, credentials. Return approve or deny." }]\n  }]\n}', { x: 0.5, y: 4.3, w: 9, h: 1.0, fontSize: 8, color: '88FF88', fontFace: 'Courier New' });

    // Slide 25: Claude Code Slash Commands
    slide = pptx.addSlide();
    slide.background = { color: BG_DARK };
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 0.8, fill: { color: CLAUDE_ORANGE } });
    slide.addText('Claude Code スラッシュコマンド', { x: 0.5, y: 0.2, w: 9, h: 0.5, fontSize: 24, color: TEXT_WHITE, bold: true });

    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 0.95, w: 9.2, h: 0.5, fill: { color: TIP_BG }, rectRadius: 0.08 });
    slide.addText('💡 .claude/commands/ にカスタムコマンドを定義可能', { x: 0.5, y: 1.0, w: 9, h: 0.4, fontSize: 11, color: TEXT_WHITE, align: 'center', valign: 'middle' });

    const claudeCmdGroups = [
        {
            title: '開発ワークフロー', cmds: [
                { cmd: '/plan', desc: '実装計画を作成' },
                { cmd: '/tdd', desc: 'テスト駆動開発' },
                { cmd: '/code-review', desc: 'コードレビュー' },
                { cmd: '/build-fix', desc: 'ビルドエラー修正' },
                { cmd: '/e2e', desc: 'E2E テスト生成' },
                { cmd: '/verify', desc: '検証ループ' }
            ]
        },
        {
            title: 'コード品質', cmds: [
                { cmd: '/test-coverage', desc: 'カバレッジ分析' },
                { cmd: '/refactor-clean', desc: '不要コード削除' },
                { cmd: '/security-review', desc: 'セキュリティチェック' },
                { cmd: '/update-docs', desc: 'ドキュメント更新' },
                { cmd: '/update-codemaps', desc: 'コードマップ更新' },
                { cmd: '/checkpoint', desc: '状態保存' }
            ]
        },
        {
            title: 'システム', cmds: [
                { cmd: '/help', desc: 'ヘルプ表示' },
                { cmd: '/mcp', desc: 'MCP サーバー管理' },
                { cmd: '/context', desc: 'コンテキスト管理' },
                { cmd: '/clear', desc: 'コンテキストクリア' },
                { cmd: '/skill-create', desc: 'スキル作成' },
                { cmd: '/orchestrate', desc: 'マルチエージェント' }
            ]
        }
    ];

    claudeCmdGroups.forEach((group, gi) => {
        const x = 0.4 + gi * 3.2;
        slide.addText(group.title, { x, y: 1.55, w: 3.0, h: 0.35, fontSize: 12, color: CLAUDE_ORANGE, bold: true });
        slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x, y: 1.9, w: 3.0, h: 3.3, fill: { color: BOX_BG }, rectRadius: 0.1 });
        group.cmds.forEach((c, ci) => {
            const y = 2.0 + ci * 0.5;
            slide.addText(c.cmd, { x: x + 0.1, y, w: 1.5, h: 0.25, fontSize: 9, color: '88FF88', fontFace: 'Courier New' });
            slide.addText(c.desc, { x: x + 0.1, y: y + 0.22, w: 2.8, h: 0.22, fontSize: 9, color: TEXT_GRAY });
        });
    });

    // Slide 26: Claude Code Agents
    slide = pptx.addSlide();
    slide.background = { color: BG_DARK };
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 0.8, fill: { color: CLAUDE_ORANGE } });
    slide.addText('Claude Code エージェント', { x: 0.5, y: 0.2, w: 9, h: 0.5, fontSize: 24, color: TEXT_WHITE, bold: true });

    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 1.0, w: 9.2, h: 0.7, fill: { color: TIP_BG }, rectRadius: 0.1 });
    slide.addText('💡 各エージェントは必要最小限のツールだけを持つ = 高速で正確', { x: 0.5, y: 1.1, w: 9, h: 0.25, fontSize: 11, color: ACCENT_YELLOW, bold: true, align: 'center' });
    slide.addText('.claude/agents/ にカスタムエージェントを定義可能', { x: 0.5, y: 1.4, w: 9, h: 0.25, fontSize: 10, color: TEXT_WHITE, align: 'center' });

    const agents = [
        { name: 'planner', desc: '実装計画・要件分析' },
        { name: 'architect', desc: 'システム設計・アーキテクチャ' },
        { name: 'tdd-guide', desc: 'テスト駆動開発ガイダンス' },
        { name: 'code-reviewer', desc: 'コード品質・セキュリティ' },
        { name: 'security-reviewer', desc: '脆弱性分析' },
        { name: 'build-error-resolver', desc: 'ビルドエラー診断・修正' },
        { name: 'e2e-runner', desc: 'Playwright E2E テスト' },
        { name: 'refactor-cleaner', desc: 'デッドコード削除' },
        { name: 'doc-updater', desc: 'ドキュメント更新' }
    ];

    agents.forEach((a, i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        const x = 0.4 + col * 3.2;
        const y = 1.9 + row * 0.8;
        slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x, y, w: 3.0, h: 0.7, fill: { color: BOX_BG }, rectRadius: 0.08 });
        slide.addText(a.name, { x: x + 0.1, y, w: 2.8, h: 0.35, fontSize: 10, color: CLAUDE_ORANGE, bold: true, fontFace: 'Courier New' });
        slide.addText(a.desc, { x: x + 0.1, y: y + 0.35, w: 2.8, h: 0.3, fontSize: 9, color: TEXT_GRAY });
    });

    slide.addText('使用例', { x: 0.4, y: 4.4, w: 9, h: 0.3, fontSize: 12, color: ACCENT_TEAL, bold: true });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 4.75, w: 9.2, h: 0.6, fill: { color: '0D0D1A' }, rectRadius: 0.1 });
    slide.addText('# エージェントを明示的に呼び出す\nsecurity-reviewer エージェントで packages/avalanche-wallet のセキュリティをチェックして', { x: 0.5, y: 4.8, w: 9, h: 0.5, fontSize: 9, color: '88FF88', fontFace: 'Courier New' });

    // Slide 27: Claude Code Practical Works
    slide = pptx.addSlide();
    slide.background = { color: BG_DARK };
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 0.8, fill: { color: CLAUDE_ORANGE } });
    slide.addText('Claude Code 実践ワーク', { x: 0.5, y: 0.2, w: 9, h: 0.5, fontSize: 24, color: TEXT_WHITE, bold: true });

    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 1.0, w: 9.2, h: 0.6, fill: { color: TIP_BG }, rectRadius: 0.1 });
    slide.addText('💡 このリポジトリに実践ワークが含まれています → docs/work.md', { x: 0.5, y: 1.1, w: 9, h: 0.4, fontSize: 12, color: TEXT_WHITE, align: 'center', valign: 'middle' });

    const works = [
        { num: '1', title: '/plan コマンド', desc: '実装計画を作成し、承認後に実装' },
        { num: '2', title: '/tdd コマンド', desc: 'RED→GREEN→REFACTOR サイクル' },
        { num: '3', title: '/code-review', desc: 'CRITICAL/HIGH/MEDIUM/LOW で評価' },
        { num: '4', title: 'Playwright + TDD', desc: 'E2E テスト駆動で UI 実装' },
        { num: '5', title: 'Playwright MCP', desc: 'ブラウザ自動操作でデバッグ' },
        { num: '6', title: 'Context7 MCP', desc: '最新ドキュメントをリアルタイム取得' }
    ];

    works.forEach((w, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const x = 0.4 + col * 4.8;
        const y = 1.8 + row * 1.0;
        slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x, y, w: 4.5, h: 0.9, fill: { color: BOX_BG }, rectRadius: 0.1 });
        slide.addShape(pptx.shapes.OVAL, { x: x + 0.1, y: y + 0.2, w: 0.5, h: 0.5, fill: { color: CLAUDE_ORANGE } });
        slide.addText(w.num, { x: x + 0.1, y: y + 0.2, w: 0.5, h: 0.5, fontSize: 14, color: TEXT_WHITE, bold: true, align: 'center', valign: 'middle' });
        slide.addText(w.title, { x: x + 0.7, y: y + 0.15, w: 3.7, h: 0.35, fontSize: 11, color: TEXT_WHITE, bold: true });
        slide.addText(w.desc, { x: x + 0.7, y: y + 0.5, w: 3.7, h: 0.3, fontSize: 10, color: TEXT_GRAY });
    });

    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 4.9, w: 9.2, h: 0.5, fill: { color: '333355' }, rectRadius: 0.08 });
    slide.addText('📚 詳細: docs/Guide.md（Claude Code 機能ガイド）, docs/work.md（実践ワーク）', { x: 0.5, y: 4.95, w: 9, h: 0.4, fontSize: 10, color: TEXT_GRAY, align: 'center', valign: 'middle' });

    // ========================================
    // Slide 28: Additional Resources (Phaser.js, PixiJS, Claude Code)
    // ========================================
    slide = pptx.addSlide();
    slide.background = { color: BG_DARK };
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 0.8, fill: { color: ACCENT_BLUE } });
    slide.addText('📚 参考リソース', { x: 0.5, y: 0.2, w: 9, h: 0.5, fontSize: 24, color: TEXT_WHITE, bold: true });

    // Phaser.js Section
    slide.addText('🎮 Phaser.js ゲーム実装例', { x: 0.4, y: 1.0, w: 9, h: 0.35, fontSize: 14, color: ACCENT_TEAL, bold: true });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 1.4, w: 9.2, h: 1.1, fill: { color: BOX_BG }, rectRadius: 0.1 });
    slide.addText('📺 YouTube チュートリアル', { x: 0.5, y: 1.5, w: 4.4, h: 0.25, fontSize: 10, color: ACCENT_RED, bold: true });
    slide.addText('youtube.com/watch?v=QPZCMd5REP8', { x: 0.5, y: 1.75, w: 4.4, h: 0.25, fontSize: 9, color: TEXT_GRAY });
    slide.addText('📁 Oakwoods サンプルゲーム', { x: 5.0, y: 1.5, w: 4.5, h: 0.25, fontSize: 10, color: ACCENT_RED, bold: true });
    slide.addText('github.com/chongdashu/phaserjs-oakwoods', { x: 5.0, y: 1.75, w: 4.5, h: 0.25, fontSize: 9, color: TEXT_GRAY });
    slide.addText('Phaser.js = HTML5 ゲームフレームワーク。2D ゲーム開発に最適', { x: 0.5, y: 2.1, w: 9, h: 0.3, fontSize: 10, color: TEXT_WHITE, align: 'center' });

    // PixiJS Section
    slide.addText('🖼️ PixiJS ゲーム実装例', { x: 0.4, y: 2.7, w: 9, h: 0.35, fontSize: 14, color: ACCENT_TEAL, bold: true });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 3.1, w: 9.2, h: 0.8, fill: { color: BOX_BG }, rectRadius: 0.1 });
    slide.addText('📁 Avalanche + PixiJS ウォークスルー', { x: 0.5, y: 3.2, w: 9, h: 0.25, fontSize: 10, color: ACCENT_RED, bold: true });
    slide.addText('github.com/CobaltSato/avalanche-build-games-tool-kit/tree/walkthrough-pixi', { x: 0.5, y: 3.45, w: 9, h: 0.25, fontSize: 9, color: TEXT_GRAY });
    slide.addText('PixiJS = 高速 2D WebGL レンダリングエンジン', { x: 0.5, y: 3.7, w: 9, h: 0.2, fontSize: 9, color: TEXT_WHITE, align: 'center' });

    // Claude Code Section
    slide.addText('🏆 Claude Code ハッカソン優勝者の設定集', { x: 0.4, y: 4.1, w: 9, h: 0.35, fontSize: 14, color: CLAUDE_ORANGE, bold: true });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 4.5, w: 9.2, h: 0.9, fill: { color: BOX_BG }, rectRadius: 0.1 });
    slide.addText('📁 everything-claude-code', { x: 0.5, y: 4.6, w: 9, h: 0.25, fontSize: 10, color: CLAUDE_ORANGE, bold: true });
    slide.addText('github.com/affaan-m/everything-claude-code', { x: 0.5, y: 4.85, w: 9, h: 0.25, fontSize: 9, color: TEXT_GRAY });
    slide.addText('Anthropic x Forum Ventures ハッカソン優勝者が10ヶ月以上実戦で使い込んだベストプラクティス', { x: 0.5, y: 5.1, w: 9, h: 0.25, fontSize: 9, color: TEXT_WHITE, align: 'center' });

    // ========================================
    // Slide 29: Thank You (Final)
    // ========================================
    slide = pptx.addSlide();
    slide.background = { color: BG_DARK };
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 5.44, w: '100%', h: 0.12, fill: { color: ACCENT_RED } });
    slide.addText('Thank You!', { x: 0.5, y: 1.4, w: 9, h: 1.0, fontSize: 48, color: TEXT_WHITE, bold: true, align: 'center' });
    slide.addText('Avalanche + AI Development Hands-on', { x: 0.5, y: 2.4, w: 9, h: 0.5, fontSize: 20, color: ACCENT_TEAL, align: 'center' });

    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 2.0, y: 3.1, w: 6, h: 1.6, fill: { color: BOX_BG }, rectRadius: 0.15 });
    slide.addText('Questions?', { x: 2.0, y: 3.2, w: 6, h: 0.4, fontSize: 18, color: TEXT_WHITE, align: 'center' });
    slide.addText('Avalanche Game Build Tool Kit', { x: 2.0, y: 3.6, w: 6, h: 0.3, fontSize: 11, color: ACCENT_RED, align: 'center' });
    slide.addText('#AvalancheAI #GeminiCLI #ClaudeCode', { x: 2.0, y: 3.9, w: 6, h: 0.25, fontSize: 10, color: TEXT_GRAY, align: 'center' });
    slide.addText('Claude Code を使いたい方 → PR #1 をチェック！', { x: 2.0, y: 4.2, w: 6, h: 0.2, fontSize: 9, color: CLAUDE_ORANGE, align: 'center' });
    slide.addText('github.com/CobaltSato/avalanche-build-games-tool-kit/pull/1', { x: 2.0, y: 4.4, w: 6, h: 0.25, fontSize: 8, color: ACCENT_BLUE, align: 'center' });

    // Save
    const outputPath = '/Users/user/avalanche/avalanche-game-build-tool-kit/docs/hands-on/avalanche-ai-handson-demo.pptx';
    await pptx.writeFile({ fileName: outputPath });
    console.log(`Presentation saved to: ${outputPath}`);
    console.log('Total slides: 29');
    console.log('Added: Community Skills, Claude Code appendix, Additional Resources (Phaser.js, PixiJS, everything-claude-code)');
    console.log('Updated with Context7 data');
}

createPresentation().catch(err => {
    console.error('Failed to create presentation:', err);
    process.exit(1);
});
