// 新しい副業データベース
const jobDatabase = {
    fx: {
        title: "FX・暗号通貨投資",
        description: "為替や暗号通貨の取引で利益を目指す投資。相場分析力とリスク管理が重要。",
        income: "月1-100万円",
        timeRequired: "週5-15時間",
        difficulty: "中級～上級",
        category: "investment",
        url: "https://docs.google.com/forms/d/1_FyifOwLfQ3n-PHzRACPnAD-2jcszC3WIzEADsNJuGQ/edit",
        hasLineGuide: false
    },
    dropshipping: {
        title: "無在庫物販",
        description: "在庫を持たずに商品を販売。注文が入ってから仕入れて発送するビジネスモデル。",
        income: "月5-50万円",
        timeRequired: "週10-25時間",
        difficulty: "初級～中級",
        category: "ecommerce",
        url: "https://docs.google.com/forms/d/1Zc521Sz-o2xQ-Vy7jGXFWb9N_E5VB4BGo4A3PF4YSl0/edit",
        hasLineGuide: false
    },
    lifePlanning: {
        title: "ライフプランニング",
        description: "個人や家族の将来設計をサポート。保険や資産運用のアドバイスを提供。",
        income: "月10-80万円",
        timeRequired: "週8-20時間",
        difficulty: "中級～上級",
        category: "consulting",
        url: "https://example.com/life-planning-info",
        hasLineGuide: true,
        lineKeyword: "ライフプラン"
    },
    ai: {
        title: "AI活用サービス",
        description: "AI技術を活用したコンテンツ制作や業務効率化サービス。",
        income: "月8-60万円",
        timeRequired: "週10-30時間",
        difficulty: "中級～上級",
        category: "tech",
        url: "https://example.com/ai-service-info",
        hasLineGuide: true,
        lineKeyword: "AI"
    },
    snsManagement: {
        title: "SNS運用代行",
        description: "企業や個人のSNSアカウント運用を代行。コンテンツ企画から投稿まで一貫してサポート。",
        income: "月5-40万円",
        timeRequired: "週8-25時間",
        difficulty: "初級～中級",
        category: "marketing",
        url: "https://example.com/sns-management-info",
        hasLineGuide: true,
        lineKeyword: "SNS運用"
    },
    beauty: {
        title: "美容関連サービス",
        description: "美容コンサルティングやスキンケアアドバイス。オンラインでの美容相談や商品紹介。",
        income: "月3-30万円",
        timeRequired: "週5-20時間",
        difficulty: "初級～中級",
        category: "marketing",
        url: "https://example.com/beauty-service-info",
        hasLineGuide: true,
        lineKeyword: "美容"
    },
    mnp: {
        title: "MNP代行サービス",
        description: "携帯電話の乗り換え手続きを代行。キャリア間の料金比較や最適プラン提案も含む。",
        income: "月5-25万円",
        timeRequired: "週10-20時間",
        difficulty: "初級",
        category: "service",
        url: "https://example.com/mnp-service-info",
        hasLineGuide: true,
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
    }
};

// 診断ロジック
function recommendJobs(answers) {
    const recommendations = [];
    
    // 興味分野に基づく基本推奨
    switch(answers.interest) {
        case 'investment':
            recommendations.push('fx');
            break;
        case 'ecommerce':
            recommendations.push('dropshipping');
            break;
        case 'consulting':
            recommendations.push('lifePlanning');
            break;
        case 'tech':
            if (answers.skillLevel === 'advanced') {
                recommendations.push('programming', 'ai');
            } else {
                recommendations.push('ai', 'programming');
            }
            break;
        case 'marketing':
            recommendations.push('snsManagement', 'beauty');
            break;
        case 'service':
            recommendations.push('mnp');
            break;
    }

    // スキルレベルによる調整
    if (answers.skillLevel === 'beginner') {
        recommendations.push('snsManagement', 'beauty', 'mnp');
    } else if (answers.skillLevel === 'intermediate') {
        recommendations.push('ai', 'dropshipping', 'lifePlanning');
    } else if (answers.skillLevel === 'advanced') {
        recommendations.push('programming', 'lifePlanning', 'fx');
    }

    // 時間による調整
    if (answers.timeAvailable === '1hour') {
        recommendations.push('fx', 'beauty', 'mnp');
    } else if (answers.timeAvailable === '6hours+') {
        recommendations.push('programming', 'ai', 'dropshipping');
    }

    // 収入目標による調整
    if (answers.income === 'very-high' || answers.income === 'high') {
        recommendations.push('programming', 'fx', 'lifePlanning');
    } else if (answers.income === 'very-low') {
        recommendations.push('beauty', 'mnp', 'snsManagement');
    }

    // 勤務場所による調整
    if (answers.location === 'home') {
        recommendations.push('ai', 'programming', 'fx', 'snsManagement');
    } else if (answers.location === 'outside') {
        recommendations.push('lifePlanning', 'mnp');
    }

    // 重複を削除し、最大3つまでに制限
    return [...new Set(recommendations)].slice(0, 3);
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
        'ecommerce': 'job-card-ecommerce', 
        'consulting': 'job-card-consulting',
        'tech': 'job-card-tech',
        'marketing': 'job-card-marketing',
        'service': 'job-card-service'
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
                    <div class="space-y-3">
                        <p class="text-xs md:text-sm text-gray-700">公式LINEで「${job.lineKeyword}」と入力してください</p>
                        <div class="text-center">
                            <a href="https://line.me/R/ti/p/@example" target="_blank" class="inline-block bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm hover:shadow-md">
                                公式LINEはこちら
                            </a>
                        </div>
                    </div>
                </div>
            `;
        } else {
            // LINE案内がない場合：リンクボタンのみ
            bottomSectionHtml = `
                <div class="mt-4 pt-4 border-t border-gray-200">
                    <div class="flex flex-col md:flex-row md:items-center gap-3">
                        <span class="text-xs md:text-sm text-gray-600 mobile-text-adjust">
                            <span class="md:hidden">詳細な情報と始め方を下記のボタンから確認</span>
                            <span class="hidden md:inline">詳細な情報と始め方を右のボタンから確認:</span>
                        </span>
                        <a href="${job.url}" target="_blank" class="bg-blue-500 hover:bg-blue-600 text-white px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm transition-colors text-center md:text-left md:ml-auto">
                            無料で情報を取得する
                        </a>
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