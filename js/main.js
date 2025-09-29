// 新しい副業データベース
const jobDatabase = {
    fx: {
        title: "FX・暗号通貨投資",
        description: "為替やゴールド等の現物資産にレバレッジを掛けてトレードを行う。さるちゃんの方法では、24時間のトレードが可能。(難易度:中級～上級)<br>暗号資産運用については、2年間がチャンスタイム！投資したら放っておくだけなので、難易度は低。銘柄が気になる方はurlから応募してね。",
        income: "月1-100万円",
        timeRequired: "週5-15時間",
        difficulty: "初級～上級",
        category: "investment",
        url: "https://docs.google.com/forms/d/1_FyifOwLfQ3n-PHzRACPnAD-2jcszC3WIzEADsNJuGQ/edit",
        hasLineGuide: false,
        lineKeyword: "投資"
    },
    dropshipping: {
        title: "無在庫物販",
        description: "在庫を持たずに商品を販売。注文が入ってから仕入れて発送するビジネスモデル。",
        income: "月5-50万円",
        timeRequired: "週10-25時間",
        difficulty: "初級～中級",
        category: "business",
        url: "https://docs.google.com/forms/d/1Zc521Sz-o2xQ-Vy7jGXFWb9N_E5VB4BGo4A3PF4YSl0/edit",
        hasLineGuide: false,
        lineKeyword: "無在庫物販"
    },
    lifePlanning: {
        title: "ライフプランニング",
        description: "まずはあなたの稼ぐ力を養い0→1の稼げるのだという成功体験を積んで頂きます。それを通過点とし、その先の人生の充実を目指す。AIを用いて、さるちゃんが直接伴走して、稼ぐ～人生充実を目指します。1人1人と対話して手がけるあなただけけのオーダーメイド戦略。さるちゃんが直接設計しています。",
        income: "月10万円〜",
        timeRequired: "週8-20時間",
        difficulty: "中級～上級",
        category: "business",
        url: "https://example.com/life-planning-info",
        hasLineGuide: true,
        lineKeyword: "ライフプランニング"
    },
    ai: {
        title: "AI活用サービス",
        description: "AIを活用した商品/コンテンツ販売サービス。",
        income: "月5-60万円",
        timeRequired: "週10-30時間",
        difficulty: "中級～上級",
        category: "tech",
        url: "https://jv-ad-asp.com/lp/214z/85up",
        hasLineGuide: false,
        lineKeyword: "AI"
    },
    snsManagement: {
        title: "SNS",
        description: "個人での情報発信力を養うことはもちろん、企業のSNS運用代行やコンテンツ企画をサポートする力を養うことができる。",
        income: "月5-40万円",
        timeRequired: "週8-25時間",
        difficulty: "初級～中級",
        category: "lifestyle",
        url: "https://kaito-ss.com/882v/",
        hasLineGuide: false,
        lineKeyword: "SNS運用",
        hasSNSGuide: true,
        insta_url: "https://kaito-ss.com/882v/",
        x_url: "https://kaito-ss.com/882v/",
        hasLineGuide: false,
    },
    beauty: {
        title: "美容サービス",
        description: "美容商品の購入や代理店販売を通して、質の高い商品を使いながら代理店としてビジネスも行える。QOLの向上を目指せる。",
        income: "月3-30万円",
        timeRequired: "週5-20時間",
        difficulty: "初級～中級",
        category: "lifestyle",
        url: "https://example.com/beauty-service-info",
        hasLineGuide: true,
        lineKeyword: "美容"
    },
    mnp: {
        title: "MNPサービス",
        description: "スマホの乗換えを通して収益を得るビジネスモデル。コンサル料は収益から支払うので、手出しが全くないバグ副業。興味があればその先の手配師や半年ごとに再び実施できる再現性が極めて高い。",
        income: "月5-25万円",
        timeRequired: "週10-20時間",
        difficulty: "初級",
        category: "business",
        url: "https://forms.gle/1xda9sRMKu8Mc2Lt7",
        hasLineGuide: false,
        lineKeyword: "MNP"
    },
    programming: {
        title: "プログラミング開発",
        description: "Webサイト制作、アプリ開発、システム構築など。技術力を活かした高収入が期待できる。",
        income: "月10-100万円",
        timeRequired: "週15-40時間",
        difficulty: "中級～上級",
        category: "tech",
        url: "https://example.com/programming-info",
        hasLineGuide: true,
        lineKeyword: "プログラミング"
    },
    pointActivity: {
    title: "ポイ活",
    description: "",
    income: "月1-5万円",
    timeRequired: "週3-10時間",
    difficulty: "初級",
    category: "lifestyle",
    url: "https://example.com/point-activity-info",
    hasLineGuide: true,
    lineKeyword: "ポイ活"
    }
};

// 診断ロジック
function recommendJobs(answers) {
    const jobs = [];
    
    // 各副業にスコアリングシステムを導入
    const jobScores = {
        fx: 0,
        dropshipping: 0,
        lifePlanning: 0,
        ai: 0,
        snsManagement: 0,
        beauty: 0,
        mnp: 0,
        programming: 0,
        pointActivity: 0
    };
    
    // 興味分野による基本スコア（+3点）
    switch(answers.interest) {
        case 'investment':
            jobScores.fx += 3;
            break;
        case 'tech':
            jobScores.programming += 3;
            jobScores.ai += 3;
            break;
        case 'business':
            jobScores.lifePlanning += 3;
            jobScores.mnp += 3;
            jobScores.dropshipping += 3;
            break;
        case 'lifestyle':
            jobScores.snsManagement += 3;
            jobScores.beauty += 3;
            jobScores.pointActivity += 3;
            break;
    }
    
    // スキルレベルによる調整（+2点）
    switch(answers.skillLevel) {
        case 'beginner':
            jobScores.pointActivity += 2;
            jobScores.snsManagement += 2;
            jobScores.beauty += 2;
            jobScores.mnp += 2;
            break;
        case 'intermediate':
            jobScores.ai += 2;
            jobScores.dropshipping += 2;
            jobScores.lifePlanning += 2;
            break;
        case 'advanced':
            jobScores.programming += 2;
            jobScores.fx += 2;
            jobScores.lifePlanning += 2;
            break;
    }
    
    // 時間による調整（+2点）
    switch(answers.timeAvailable) {
        case '1hour':
            jobScores.fx += 2;
            jobScores.pointActivity += 2;
            jobScores.beauty += 2;
            break;
        case '1-4hours':
            jobScores.snsManagement += 2;
            jobScores.mnp += 2;
            jobScores.ai += 2;
            break;
        case '6hours+':
            jobScores.programming += 2;
            jobScores.dropshipping += 2;
            jobScores.lifePlanning += 2;
            break;
    }
    
    // 収入目標による調整（+1点）
    switch(answers.income) {
        case 'very-low':
            jobScores.pointActivity += 1;
            jobScores.beauty += 1;
            break;
        case 'low':
            jobScores.snsManagement += 1;
            jobScores.mnp += 1;
            break;
        case 'medium':
            jobScores.ai += 1;
            jobScores.dropshipping += 1;
            break;
        case 'high':
        case 'very-high':
            jobScores.programming += 1;
            jobScores.fx += 1;
            jobScores.lifePlanning += 1;
            break;
    }
    
    // 働く場所による調整（+1点）
    if (answers.location === 'home') {
        jobScores.ai += 1;
        jobScores.programming += 1;
        jobScores.fx += 1;
        jobScores.pointActivity += 1;
    } else if (answers.location === 'outside') {
        jobScores.lifePlanning += 1;
        jobScores.mnp += 1;
    }
    
    // スコア順にソートして上位3つを返す
    return Object.entries(jobScores)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 3)
        .map(([job]) => job);
}

// UIコントロール
let currentQuestionIndex = 1;
const totalQuestions = 6;
const answers = {};

function updateProgress() {
    const progress = (currentQuestionIndex / totalQuestions) * 100;
    document.getElementById('progressBar').style.width = `${progress}%`;
    document.getElementById('currentQuestion').textContent = currentQuestionIndex;
}

function showQuestion(index) {
    // 全ての質問を非表示
    for (let i = 1; i <= totalQuestions; i++) {
        document.getElementById(`question${i}`).classList.add('hidden');
    }
    // 指定の質問を表示
    document.getElementById(`question${index}`).classList.remove('hidden');

    // モバイルでヘッダーを非表示にしてスクロールを上部に戻す
    if (window.innerWidth <= 768) {
        document.querySelector('header').style.display = 'none';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // ボタンの表示/非表示制御
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    prevBtn.classList.toggle('hidden', index === 1);
    
    if (index === totalQuestions) {
        nextBtn.classList.add('hidden');
        submitBtn.classList.remove('hidden');
    } else {
        nextBtn.classList.remove('hidden');
        submitBtn.classList.add('hidden');
    }
}

// 職業カテゴリごとに色を分けるためのクラス名取得関数
function getJobCardClass(category) {
    const categoryClasses = {
        'investment': 'job-card-investment',
        'tech': 'job-card-tech', 
        'business': 'job-card-business',
        'lifestyle': 'job-card-lifestyle'
    };
    return categoryClasses[category] || 'job-card-tech';
}

function displayResults() {
    // ヘッダーを再表示
    if (window.innerWidth <= 768) {
        document.querySelector('header').style.display = 'block';
    }
    const recommendedJobKeys = recommendJobs(answers);
    const resultsContainer = document.getElementById('recommendedJobs');
    
    resultsContainer.innerHTML = '';
    
    recommendedJobKeys.forEach((jobKey, index) => {
        const job = jobDatabase[jobKey];
        const cardClass = getJobCardClass(job.category);
        const jobElement = document.createElement('div');
        jobElement.className = `${cardClass} p-4 md:p-6 rounded-lg border-l-4`;
        
        // LINE案内の表示を出し分け
        let bottomSectionHtml = '';
        
        if (job.hasLineGuide) {
            // LINE案内がある場合：リンクボタンなし、LINE案内のみ
            bottomSectionHtml = `
                <div class="mt-4 pt-4 border-t border-gray-200">
                    <div class="space-y-3 md:text-center">
                        <p class="text-sm text-gray-700">
                        興味がある方は、公式LINEから<br class="sm:hidden">「${job.lineKeyword}」とキーワードを送ってください。
                        <div class="text-center">
                            <a href="https://line.me/ti/p/C4G55cRHdD" target="_blank" class="inline-block bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm hover:shadow-md">
                                公式LINEはこちら
                            </a>
                        </div>
                    </div>
                </div>
            `;
        } else if (job.hasSNSGuide) {
            // SNS案内がある場合：SNS案内のみ
            bottomSectionHtml = `
                <div class="mt-4 pt-4 border-t border-gray-200">
                    <div class="space-y-3">
                        <p class="text-sm text-gray-600 mobile-text-adjust">詳細な情報と始め方を下記のボタンから確認</p>
                        <div class="flex flex-col sm:flex-row gap-3 justify-center">
                            <a href="https://kaito-ss.com/882v/" target="_blank" class="inline-block bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm hover:shadow-md text-center">
                                Instagramはこちら
                            </a>
                            <a href="https://page.theapps.jp/rf/i0Qk4nzbrypyUkiUnrPx1A==" target="_blank" class="inline-block bg-black hover:bg-gray-800 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm hover:shadow-md text-center">
                                Xはこちら
                            </a>
                        </div>
                    </div>
                </div>
            `;
        } else {
            // LINE案内がない場合：リンクボタンのみ
            bottomSectionHtml = `
                <div class="mt-4 pt-4 border-t border-gray-200">
                    <div class="space-y-3 md:text-center">
                        <p class="text-sm text-gray-600">
                            詳細な情報と始め方を下記のボタンから確認
                        <div class="text-center">
                            <a href="${job.url}" target="_blank" class="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-normal transition-colors shadow-sm hover:shadow-md">
                                無料で情報を取得する
                            </a>
                        </div>
                    </div>
                </div>
            `;
        }
        
        jobElement.innerHTML = `
            <div class="flex items-start justify-between">
                <div class="flex-1 min-w-0">
                    <h3 class="text-lg md:text-xl font-semibold text-gray-800 mb-2 mobile-text-adjust break-words">${index + 1}. ${job.title}</h3>
                    <p class="text-gray-600 mb-4 text-sm md:text-base mobile-text-adjust break-words leading-relaxed">${job.description}</p>
                    <div class="space-y-2 text-sm">
                        <div class="mobile-text-adjust">
                            <span class="font-medium text-gray-700">収入目安:</span>
                            <span class="text-green-600">${job.income}</span>
                        </div>
                        <div class="mobile-text-adjust">
                            <span class="font-medium text-gray-700">時間:</span>
                            <span class="text-blue-600">${job.timeRequired}</span>
                        </div>
                        <div class="mobile-text-adjust">
                            <span class="font-medium text-gray-700">難易度:</span>
                            <span class="text-purple-600">${job.difficulty}</span>
                        </div>
                    </div>
                </div>
            </div>
            ${bottomSectionHtml}
        `;
        
        resultsContainer.appendChild(jobElement);
    });
    
    // フォームを非表示にして結果を表示
    document.getElementById('questionForm').classList.add('hidden');
    document.getElementById('resultSection').classList.remove('hidden');
}

// 選択肢のボタン選択スタイルを改善
function handleChoiceSelection(label, input) {
    // 同じname属性の他の選択肢からselectedクラスを削除
    const allChoices = document.querySelectorAll(`input[name="${input.name}"]`);
    allChoices.forEach(choice => {
        choice.closest('label').classList.remove('selected');
    });
    
    // 選択された選択肢にselectedクラスを追加
    label.classList.add('selected');
    input.checked = true;
}

// イベントリスナー
document.getElementById('nextBtn').addEventListener('click', () => {
    // 現在の質問の回答を保存
    const currentQuestion = document.getElementById(`question${currentQuestionIndex}`);
    const selectedOption = currentQuestion.querySelector('input[type="radio"]:checked');
    
    if (!selectedOption) {
        alert('選択肢を選んでください。');
        return;
    }
    
    answers[selectedOption.name] = selectedOption.value;
    
    if (currentQuestionIndex < totalQuestions) {
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
        updateProgress();
    }
});

document.getElementById('prevBtn').addEventListener('click', () => {
    if (currentQuestionIndex > 1) {
        currentQuestionIndex--;
        showQuestion(currentQuestionIndex);
        updateProgress();
    }
});

document.getElementById('submitBtn').addEventListener('click', () => {
    // 最後の質問の回答を保存
    const currentQuestion = document.getElementById(`question${currentQuestionIndex}`);
    const selectedOption = currentQuestion.querySelector('input[type="radio"]:checked');
    
    if (!selectedOption) {
        alert('選択肢を選んでください。');
        return;
    }
    
    answers[selectedOption.name] = selectedOption.value;
    displayResults();
});

document.getElementById('restartBtn').addEventListener('click', () => {
    // ヘッダーを再表示
    if (window.innerWidth <= 768) {
        document.querySelector('header').style.display = 'block';
    }
    // リセット
    currentQuestionIndex = 1;
    Object.keys(answers).forEach(key => delete answers[key]);
    
    // フォームをリセット
    document.querySelectorAll('input[type="radio"]').forEach(input => {
        input.checked = false;
    });
    
    // 選択スタイルをリセット
    document.querySelectorAll('.choice-button').forEach(button => {
        button.classList.remove('selected');
    });
    
    // 表示を初期状態に戻す
    document.getElementById('resultSection').classList.add('hidden');
    document.getElementById('questionForm').classList.remove('hidden');
    showQuestion(1);
    updateProgress();
});

// スタートボタンのイベントリスナー
document.getElementById('startDiagnosisBtn').addEventListener('click', () => {
    document.getElementById('startSection').classList.add('hidden');
    document.getElementById('questionForm').classList.remove('hidden');
    showQuestion(1);
    updateProgress();
});

// 選択肢クリック時のイベント処理を追加
document.addEventListener('DOMContentLoaded', () => {
    // 初期化（スタート画面を表示）
    document.getElementById('startSection').classList.remove('hidden');
    document.getElementById('questionForm').classList.add('hidden');
    document.getElementById('resultSection').classList.add('hidden');
    
    // 選択肢のクリックイベントを設定
    document.querySelectorAll('.choice-button').forEach(label => {
        label.addEventListener('click', (e) => {
            const input = label.querySelector('input[type="radio"]');
            handleChoiceSelection(label, input);
        });
    });
});