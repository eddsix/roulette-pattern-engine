
(()=>{
'use strict';
const VERSION='15.0', KEY='roulettePatternLab.v15.0', THEME_KEY='roulettePatternLab.theme';
const FAMILIES=['sequence','jump','joint','pair','transition'];
const LANG_KEY='roulettePatternLab.language';
const LANGS=['en','zh','hi','es','fr','ar','bn','pt'];
const I18N={
 en:{results_input:'Results input',latest_results:'Latest results',recent_jumps:'Recent jumps',recent_directions:'Recent directions',prediction_quality:'Prediction quality',internal_calibration:'internal calibration',learning_diagnosis:'Learning diagnostics',walk_forward:'walk-forward',learning:'learning',adaptive_weights:'Adaptive weights',active_patterns:'Active patterns',prediction_history:'Prediction history',performance_tolerance:'Performance ± tolerance',window:'Window',win_rate:'Win rate',baseline:'Baseline',edge:'Edge',evaluated:'Evaluated',last_20:'Last 20',realtime_prediction:'Real-time prediction',ensemble_relative_score:'ensemble relative score',direction:'Direction',jump:'Predicted jump',zone:'Zone',direction_empty:'Direction: —',jump_empty:'Predicted jump: —',zone_prefix:'Zone',confidence:'Confidence',active_models:'Active models',quality:'Quality',alternative_predictions:'Alternative predictions',top_3:'Top 3',spins:'spins',consensus:'Consensus',stability:'Stability',robust_edge:'Robust edge',sample:'Sample',recency:'Recency',no_data:'NO DATA',night_mode:'Night mode',day_mode:'Day mode',undo:'Undo',clear_history:'Clear history',confirm_clear:'Clear all history?',footer:'RouletteX v15.0 · walk-forward · out-of-sample predictions · local storage',waiting_data:'WAITING FOR DATA',no_signal:'NO SIGNAL',need_spins:'At least 12 spins are required',no_zone:'No zone with sufficient evidence',no_repeated:'No repeated pattern with sufficient evidence.',no_predictions:'There are not enough evaluated predictions yet.',no_history:'No results',no_sample:'No sample',families:{sequence:'Sequence',jump:'Jump',joint:'Joint',pair:'Pair',transition:'Transition'},strong_signal:'STRONG SIGNAL',weak_signal:'WEAK SIGNAL',no_edge:'NO EDGE',direction_fmt:'Direction: {d} · CW {cw}% / CCW {ccw}%',jump_fmt:'Predicted jump: {j} pockets',quality_summary:'Quality combines consensus, stability, robust edge, sample size and recent behavior. It is not a guaranteed probability of success.',weight_summary:'Weights are calculated only from results available before each evaluation. Historical predictions are not recalculated when new spins are added.',no_family_sample:'no sample',tests:'tests',matches:'matches',next:'next',support:'supports',loss:'LOSS',win:'WIN',pockets:'pockets',strong_family:'SEQUENCE',joint_family:'JUMP + DIRECTION',jump_family:'JUMP PATTERN',recently:'recent',historical:'historical',stability100:'/100 stability'},
 zh:{results_input:'结果输入',latest_results:'最近结果',recent_jumps:'近期跳跃',recent_directions:'近期方向',prediction_quality:'预测质量',internal_calibration:'内部校准',learning_diagnosis:'学习诊断',walk_forward:'滚动验证',learning:'学习',adaptive_weights:'自适应权重',active_patterns:'活跃模式',prediction_history:'预测历史',performance_tolerance:'± 容差表现',window:'窗口',win_rate:'命中率',baseline:'基线',edge:'优势',evaluated:'已评估',last_20:'最近20次',realtime_prediction:'实时预测',ensemble_relative_score:'集成相对评分',direction:'方向',jump:'预计跳跃',zone:'区域',direction_empty:'方向：—',jump_empty:'预计跳跃：—',zone_prefix:'区域',confidence:'置信度',active_models:'活跃模型',quality:'质量',alternative_predictions:'备选预测',top_3:'前3名',spins:'次',consensus:'共识',stability:'稳定性',robust_edge:'稳健优势',sample:'样本',recency:'近期表现',no_data:'无数据',night_mode:'夜间模式',day_mode:'日间模式',undo:'撤销',clear_history:'清除历史',confirm_clear:'清除所有历史？',footer:'RouletteX v15.0 · 滚动验证 · 样本外预测 · 本地存储',waiting_data:'等待数据',no_signal:'无信号',need_spins:'至少需要12次结果',no_zone:'没有足够证据的区域',no_repeated:'没有足够证据的重复模式。',no_predictions:'还没有足够的已评估预测。',no_history:'无结果',no_sample:'无样本',families:{sequence:'序列',jump:'跳跃',joint:'联合',pair:'配对',transition:'转换'},strong_signal:'强信号',weak_signal:'弱信号',no_edge:'无优势',direction_fmt:'方向：{d} · CW {cw}% / CCW {ccw}%',jump_fmt:'预计跳跃：{j} 个位置',quality_summary:'质量结合共识、稳定性、稳健优势、样本量和近期表现。不代表保证的成功概率。',weight_summary:'权重仅根据每次评估之前可用的结果计算。新增结果不会重新计算历史预测。',no_family_sample:'无样本',tests:'次测试',matches:'次匹配',next:'后续',support:'支持',loss:'失败',win:'命中',pockets:'位置',strong_family:'序列',joint_family:'跳跃 + 方向',jump_family:'跳跃模式',recently:'近期',historical:'历史',stability100:'稳定性/100'},
 hi:{results_input:'परिणाम दर्ज करें',latest_results:'हाल के परिणाम',recent_jumps:'हाल के जंप',recent_directions:'हाल की दिशाएँ',prediction_quality:'पूर्वानुमान गुणवत्ता',internal_calibration:'आंतरिक कैलिब्रेशन',learning_diagnosis:'लर्निंग डायग्नोस्टिक्स',walk_forward:'वॉक-फॉरवर्ड',learning:'लर्निंग',adaptive_weights:'अनुकूली भार',active_patterns:'सक्रिय पैटर्न',prediction_history:'पूर्वानुमान इतिहास',performance_tolerance:'± सहनशीलता प्रदर्शन',window:'विंडो',win_rate:'सफलता दर',baseline:'बेसलाइन',edge:'एज',evaluated:'मूल्यांकन',last_20:'पिछले 20',realtime_prediction:'रीयल-टाइम पूर्वानुमान',ensemble_relative_score:'एन्सेम्बल सापेक्ष स्कोर',direction:'दिशा',jump:'अनुमानित जंप',zone:'ज़ोन',direction_empty:'दिशा: —',jump_empty:'अनुमानित जंप: —',zone_prefix:'ज़ोन',confidence:'विश्वास',active_models:'सक्रिय मॉडल',quality:'गुणवत्ता',alternative_predictions:'वैकल्पिक पूर्वानुमान',top_3:'शीर्ष 3',spins:'स्पिन',consensus:'सहमति',stability:'स्थिरता',robust_edge:'मजबूत एज',sample:'नमूना',recency:'हालिया',no_data:'कोई डेटा नहीं',night_mode:'नाइट मोड',day_mode:'डे मोड',undo:'पूर्ववत',clear_history:'इतिहास मिटाएँ',confirm_clear:'पूरा इतिहास मिटाएँ?',footer:'RouletteX v15.0 · वॉक-फॉरवर्ड · आउट-ऑफ-सैंपल पूर्वानुमान · स्थानीय संग्रहण',waiting_data:'डेटा की प्रतीक्षा',no_signal:'कोई संकेत नहीं',need_spins:'कम से कम 12 स्पिन आवश्यक हैं',no_zone:'पर्याप्त प्रमाण वाला कोई ज़ोन नहीं',no_repeated:'पर्याप्त प्रमाण वाला कोई दोहराया पैटर्न नहीं।',no_predictions:'अभी पर्याप्त मूल्यांकित पूर्वानुमान नहीं हैं।',no_history:'कोई परिणाम नहीं',no_sample:'कोई नमूना नहीं',families:{sequence:'सीक्वेंस',jump:'जंप',joint:'जॉइंट',pair:'पेयर',transition:'ट्रांज़िशन'},strong_signal:'मजबूत संकेत',weak_signal:'कमज़ोर संकेत',no_edge:'कोई एज नहीं',direction_fmt:'दिशा: {d} · CW {cw}% / CCW {ccw}%',jump_fmt:'अनुमानित जंप: {j} पॉकेट',quality_summary:'गुणवत्ता सहमति, स्थिरता, मजबूत एज, नमूना आकार और हालिया व्यवहार को जोड़ती है। यह सफलता की गारंटी नहीं है।',weight_summary:'भार हर मूल्यांकन से पहले उपलब्ध परिणामों से ही गणना किए जाते हैं। नए स्पिन जुड़ने पर ऐतिहासिक पूर्वानुमान दोबारा नहीं गिने जाते।',no_family_sample:'कोई नमूना नहीं',tests:'टेस्ट',matches:'मिलान',next:'अगले',support:'समर्थन',loss:'हार',win:'जीत',pockets:'पॉकेट',strong_family:'सीक्वेंस',joint_family:'जंप + दिशा',jump_family:'जंप पैटर्न',recently:'हालिया',historical:'ऐतिहासिक',stability100:'स्थिरता/100'},
 es:{results_input:'Entrada de resultados',latest_results:'Últimos resultados',recent_jumps:'Saltos recientes',recent_directions:'Direcciones recientes',prediction_quality:'Calidad de predicción',internal_calibration:'calibración interna',learning_diagnosis:'Diagnóstico del aprendizaje',walk_forward:'walk-forward',learning:'aprendizaje',adaptive_weights:'Pesos adaptativos',active_patterns:'Patrones activos',prediction_history:'Historial de predicciones',performance_tolerance:'Rendimiento ± tolerancia',window:'Ventana',win_rate:'Win rate',baseline:'Baseline',edge:'Edge',evaluated:'Evaluadas',last_20:'Últimas 20',realtime_prediction:'Predicción en tiempo real',ensemble_relative_score:'score relativo del ensemble',direction:'Dirección',jump:'Salto previsto',zone:'Zona',direction_empty:'Dirección: —',jump_empty:'Salto previsto: —',zone_prefix:'Zona',confidence:'Confianza',active_models:'Modelos activos',quality:'Calidad',alternative_predictions:'Predicciones alternativas',top_3:'Top 3',spins:'spins',consensus:'Consenso',stability:'Estabilidad',robust_edge:'Edge robusto',sample:'Muestra',recency:'Recencia',no_data:'SIN DATOS',night_mode:'Modo noche',day_mode:'Modo día',undo:'Deshacer',clear_history:'Borrar historial',confirm_clear:'¿Borrar todo el histórico?',footer:'RouletteX v15.0 · walk-forward · predicciones fuera de muestra · almacenamiento local',waiting_data:'ESPERANDO DATOS',no_signal:'SIN SEÑAL',need_spins:'Se necesitan al menos 12 spins',no_zone:'No hay zona con evidencia suficiente',no_repeated:'No hay patrón repetido suficiente.',no_predictions:'Aún no hay suficientes predicciones evaluadas.',no_history:'Sin resultados',no_sample:'Sin muestra',families:{sequence:'secuencia',jump:'salto',joint:'joint',pair:'pair',transition:'transition'},strong_signal:'SEÑAL FUERTE',weak_signal:'SEÑAL DÉBIL',no_edge:'SIN EDGE',direction_fmt:'Dirección: {d} · CW {cw}% / CCW {ccw}%',jump_fmt:'Salto previsto: {j} pockets',quality_summary:'La calidad combina consenso, estabilidad, edge robusto, tamaño de muestra y comportamiento reciente. No equivale a una probabilidad garantizada de acierto.',weight_summary:'Los pesos se calculan únicamente con resultados disponibles antes de cada evaluación. Las predicciones históricas no se recalculan al añadir spins nuevos.',no_family_sample:'sin muestra',tests:'tests',matches:'coincidencias',next:'siguientes',support:'apoyos',loss:'LOSS',win:'WIN',pockets:'pockets',strong_family:'SECUENCIA',joint_family:'SALTO + DIRECCIÓN',jump_family:'PATRÓN DE SALTOS',recently:'reciente',historical:'histórico',stability100:'/100 estabilidad'},
 fr:{results_input:'Saisie des résultats',latest_results:'Derniers résultats',recent_jumps:'Sauts récents',recent_directions:'Directions récentes',prediction_quality:'Qualité de prédiction',internal_calibration:'calibration interne',learning_diagnosis:'Diagnostic de l’apprentissage',walk_forward:'walk-forward',learning:'apprentissage',adaptive_weights:'Poids adaptatifs',active_patterns:'Modèles actifs',prediction_history:'Historique des prédictions',performance_tolerance:'Performance ± tolérance',window:'Fenêtre',win_rate:'Taux de réussite',baseline:'Référence',edge:'Avantage',evaluated:'Évaluées',last_20:'20 dernières',realtime_prediction:'Prédiction en temps réel',ensemble_relative_score:'score relatif de l’ensemble',direction:'Direction',jump:'Saut prévu',zone:'Zone',direction_empty:'Direction : —',jump_empty:'Saut prévu : —',zone_prefix:'Zone',confidence:'Confiance',active_models:'Modèles actifs',quality:'Qualité',alternative_predictions:'Prédictions alternatives',top_3:'Top 3',spins:'spins',consensus:'Consensus',stability:'Stabilité',robust_edge:'Avantage robuste',sample:'Échantillon',recency:'Récence',no_data:'AUCUNE DONNÉE',night_mode:'Mode nuit',day_mode:'Mode jour',undo:'Annuler',clear_history:'Effacer l’historique',confirm_clear:'Effacer tout l’historique ?',footer:'RouletteX v15.0 · walk-forward · prédictions hors échantillon · stockage local',waiting_data:'EN ATTENTE DE DONNÉES',no_signal:'AUCUN SIGNAL',need_spins:'Au moins 12 spins sont nécessaires',no_zone:'Aucune zone avec suffisamment de preuves',no_repeated:'Aucun modèle répété avec suffisamment de preuves.',no_predictions:'Pas encore assez de prédictions évaluées.',no_history:'Aucun résultat',no_sample:'Aucun échantillon',families:{sequence:'séquence',jump:'saut',joint:'joint',pair:'paire',transition:'transition'},strong_signal:'SIGNAL FORT',weak_signal:'SIGNAL FAIBLE',no_edge:'SANS AVANTAGE',direction_fmt:'Direction : {d} · CW {cw}% / CCW {ccw}%',jump_fmt:'Saut prévu : {j} positions',quality_summary:'La qualité combine consensus, stabilité, avantage robuste, taille d’échantillon et comportement récent. Ce n’est pas une probabilité de réussite garantie.',weight_summary:'Les poids sont calculés uniquement avec les résultats disponibles avant chaque évaluation. Les prédictions historiques ne sont pas recalculées lorsque de nouveaux spins sont ajoutés.',no_family_sample:'aucun échantillon',tests:'tests',matches:'correspondances',next:'suivants',support:'soutiens',loss:'PERDU',win:'GAGNÉ',pockets:'positions',strong_family:'SÉQUENCE',joint_family:'SAUT + DIRECTION',jump_family:'MODÈLE DE SAUTS',recently:'récent',historical:'historique',stability100:'stabilité/100'},
 ar:{results_input:'إدخال النتائج',latest_results:'أحدث النتائج',recent_jumps:'القفزات الأخيرة',recent_directions:'الاتجاهات الأخيرة',prediction_quality:'جودة التنبؤ',internal_calibration:'معايرة داخلية',learning_diagnosis:'تشخيص التعلم',walk_forward:'اختبار متدرج',learning:'التعلم',adaptive_weights:'الأوزان التكيفية',active_patterns:'الأنماط النشطة',prediction_history:'سجل التنبؤات',performance_tolerance:'الأداء ± التسامح',window:'النافذة',win_rate:'نسبة النجاح',baseline:'خط الأساس',edge:'الأفضلية',evaluated:'تم تقييمها',last_20:'آخر 20',realtime_prediction:'التنبؤ في الوقت الحقيقي',ensemble_relative_score:'النتيجة النسبية للمجموعة',direction:'الاتجاه',jump:'القفزة المتوقعة',zone:'المنطقة',direction_empty:'الاتجاه: —',jump_empty:'القفزة المتوقعة: —',zone_prefix:'المنطقة',confidence:'الثقة',active_models:'النماذج النشطة',quality:'الجودة',alternative_predictions:'التنبؤات البديلة',top_3:'أفضل 3',consensus:'التوافق',stability:'الاستقرار',robust_edge:'الأفضلية القوية',sample:'العينة',recency:'الحداثة',no_data:'لا توجد بيانات',night_mode:'الوضع الليلي',day_mode:'الوضع النهاري',undo:'تراجع',clear_history:'مسح السجل',confirm_clear:'مسح كل السجل؟',footer:'RouletteX v15.0 · اختبار متدرج · تنبؤات خارج العينة · تخزين محلي',waiting_data:'بانتظار البيانات',no_signal:'لا توجد إشارة',need_spins:'يلزم إدخال 12 نتيجة على الأقل',no_zone:'لا توجد منطقة بأدلة كافية',no_repeated:'لا يوجد نمط متكرر بأدلة كافية.',no_predictions:'لا توجد تنبؤات مقيمة كافية بعد.',no_history:'لا توجد نتائج',no_sample:'لا توجد عينة',families:{sequence:'تسلسل',jump:'قفزة',joint:'مشترك',pair:'زوج',transition:'انتقال'},strong_signal:'إشارة قوية',weak_signal:'إشارة ضعيفة',no_edge:'لا أفضلية',direction_fmt:'الاتجاه: {d} · CW {cw}% / CCW {ccw}%',jump_fmt:'القفزة المتوقعة: {j} مواضع',quality_summary:'تجمع الجودة بين التوافق والاستقرار والأفضلية القوية وحجم العينة والسلوك الحديث. لا تمثل احتمال نجاح مضمون.',weight_summary:'تُحسب الأوزان فقط من النتائج المتاحة قبل كل تقييم. لا يعاد حساب التنبؤات التاريخية عند إضافة نتائج جديدة.',no_family_sample:'لا توجد عينة',tests:'اختبارات',matches:'تطابقات',next:'التالية',support:'دعم',loss:'خسارة',win:'فوز',pockets:'مواضع',strong_family:'تسلسل',joint_family:'قفزة + اتجاه',jump_family:'نمط القفزات',recently:'حديث',historical:'تاريخي',stability100:'الاستقرار/100'},
 bn:{results_input:'ফলাফল ইনপুট',latest_results:'সাম্প্রতিক ফলাফল',recent_jumps:'সাম্প্রতিক জাম্প',recent_directions:'সাম্প্রতিক দিক',prediction_quality:'পূর্বাভাসের মান',internal_calibration:'অভ্যন্তরীণ ক্যালিব্রেশন',learning_diagnosis:'লার্নিং ডায়াগনস্টিক',walk_forward:'ওয়াক-ফরওয়ার্ড',learning:'শেখা',adaptive_weights:'অভিযোজিত ওজন',active_patterns:'সক্রিয় প্যাটার্ন',prediction_history:'পূর্বাভাস ইতিহাস',performance_tolerance:'± সহনশীলতা পারফরম্যান্স',window:'উইন্ডো',win_rate:'সাফল্যের হার',baseline:'বেসলাইন',edge:'এজ',evaluated:'মূল্যায়িত',last_20:'শেষ ২০',realtime_prediction:'রিয়েল-টাইম পূর্বাভাস',ensemble_relative_score:'এনসেম্বল আপেক্ষিক স্কোর',direction:'দিক',jump:'প্রত্যাশিত জাম্প',zone:'জোন',direction_empty:'দিক: —',jump_empty:'প্রত্যাশিত জাম্প: —',zone_prefix:'জোন',confidence:'আস্থা',active_models:'সক্রিয় মডেল',quality:'মান',alternative_predictions:'বিকল্প পূর্বাভাস',top_3:'শীর্ষ ৩',consensus:'ঐকমত্য',stability:'স্থিতিশীলতা',robust_edge:'শক্তিশালী এজ',sample:'নমুনা',recency:'সাম্প্রতিকতা',no_data:'কোনো ডেটা নেই',night_mode:'নাইট মোড',day_mode:'ডে মোড',undo:'পূর্বাবস্থা',clear_history:'ইতিহাস মুছুন',confirm_clear:'সব ইতিহাস মুছবেন?',footer:'RouletteX v15.0 · ওয়াক-ফরওয়ার্ড · আউট-অফ-স্যাম্পল পূর্বাভাস · স্থানীয় স্টোরেজ',waiting_data:'ডেটার অপেক্ষায়',no_signal:'কোনো সংকেত নেই',need_spins:'কমপক্ষে ১২টি স্পিন প্রয়োজন',no_zone:'পর্যাপ্ত প্রমাণসহ কোনো জোন নেই',no_repeated:'পর্যাপ্ত প্রমাণসহ কোনো পুনরাবৃত্ত প্যাটার্ন নেই।',no_predictions:'এখনও পর্যাপ্ত মূল্যায়িত পূর্বাভাস নেই।',no_history:'কোনো ফলাফল নেই',no_sample:'কোনো নমুনা নেই',families:{sequence:'সিকোয়েন্স',jump:'জাম্প',joint:'জয়েন্ট',pair:'পেয়ার',transition:'ট্রানজিশন'},strong_signal:'শক্তিশালী সংকেত',weak_signal:'দুর্বল সংকেত',no_edge:'কোনো এজ নেই',direction_fmt:'দিক: {d} · CW {cw}% / CCW {ccw}%',jump_fmt:'প্রত্যাশিত জাম্প: {j} পকেট',quality_summary:'মান ঐকমত্য, স্থিতিশীলতা, শক্তিশালী এজ, নমুনার আকার ও সাম্প্রতিক আচরণ একত্র করে। এটি সাফল্যের নিশ্চয়তা নয়।',weight_summary:'প্রতিটি মূল্যায়নের আগে উপলব্ধ ফলাফল থেকেই ওজন গণনা করা হয়। নতুন স্পিন যোগ হলে ঐতিহাসিক পূর্বাভাস পুনরায় গণনা করা হয় না।',no_family_sample:'কোনো নমুনা নেই',tests:'পরীক্ষা',matches:'মিল',next:'পরবর্তী',support:'সমর্থন',loss:'হার',win:'জয়',pockets:'পকেট',strong_family:'সিকোয়েন্স',joint_family:'জাম্প + দিক',jump_family:'জাম্প প্যাটার্ন',recently:'সাম্প্রতিক',historical:'ঐতিহাসিক',stability100:'স্থিতিশীলতা/100'},
 pt:{results_input:'Entrada de resultados',latest_results:'Últimos resultados',recent_jumps:'Saltos recentes',recent_directions:'Direções recentes',prediction_quality:'Qualidade da previsão',internal_calibration:'calibração interna',learning_diagnosis:'Diagnóstico da aprendizagem',walk_forward:'walk-forward',learning:'aprendizagem',adaptive_weights:'Pesos adaptativos',active_patterns:'Padrões ativos',prediction_history:'Histórico de previsões',performance_tolerance:'Desempenho ± tolerância',window:'Janela',win_rate:'Taxa de acerto',baseline:'Base',edge:'Vantagem',evaluated:'Avaliadas',last_20:'Últimas 20',realtime_prediction:'Previsão em tempo real',ensemble_relative_score:'pontuação relativa do ensemble',direction:'Direção',jump:'Salto previsto',zone:'Zona',direction_empty:'Direção: —',jump_empty:'Salto previsto: —',zone_prefix:'Zona',confidence:'Confiança',active_models:'Modelos ativos',quality:'Qualidade',alternative_predictions:'Previsões alternativas',top_3:'Top 3',spins:'spins',consensus:'Consenso',stability:'Estabilidade',robust_edge:'Vantagem robusta',sample:'Amostra',recency:'Recência',no_data:'SEM DADOS',night_mode:'Modo noturno',day_mode:'Modo diurno',undo:'Desfazer',clear_history:'Apagar histórico',confirm_clear:'Apagar todo o histórico?',footer:'RouletteX v15.0 · walk-forward · previsões fora da amostra · armazenamento local',waiting_data:'AGUARDANDO DADOS',no_signal:'SEM SINAL',need_spins:'São necessários pelo menos 12 spins',no_zone:'Não há zona com evidência suficiente',no_repeated:'Não há padrão repetido suficiente.',no_predictions:'Ainda não há previsões avaliadas suficientes.',no_history:'Sem resultados',no_sample:'Sem amostra',families:{sequence:'sequência',jump:'salto',joint:'joint',pair:'par',transition:'transição'},strong_signal:'SINAL FORTE',weak_signal:'SINAL FRACO',no_edge:'SEM VANTAGEM',direction_fmt:'Direção: {d} · CW {cw}% / CCW {ccw}%',jump_fmt:'Salto previsto: {j} pockets',quality_summary:'A qualidade combina consenso, estabilidade, vantagem robusta, tamanho da amostra e comportamento recente. Não equivale a uma probabilidade garantida de acerto.',weight_summary:'Os pesos são calculados apenas com resultados disponíveis antes de cada avaliação. As previsões históricas não são recalculadas ao adicionar spins.',no_family_sample:'sem amostra',tests:'testes',matches:'coincidências',next:'seguintes',support:'apoios',loss:'PERDEU',win:'ACERTO',pockets:'pockets',strong_family:'SEQUÊNCIA',joint_family:'SALTO + DIREÇÃO',jump_family:'PADRÃO DE SALTOS',recently:'recente',historical:'histórico',stability100:'/100 estabilidade'}
};
function detectLanguage(){const saved=localStorage.getItem(LANG_KEY);if(LANGS.includes(saved))return saved;const n=(navigator.language||'en').toLowerCase();if(n.startsWith('zh'))return'zh';if(n.startsWith('hi'))return'hi';if(n.startsWith('es'))return'es';if(n.startsWith('fr'))return'fr';if(n.startsWith('ar'))return'ar';if(n.startsWith('bn'))return'bn';if(n.startsWith('pt'))return'pt';return'en'}
let LANG=detectLanguage();
function t(k){const parts=k.split('.');let v=I18N[LANG];for(const p of parts)v=v?.[p];return v??I18N.en[k]??k}
function tf(k,vars={}){return t(k).replace(/\{(\w+)\}/g,(_,x)=>vars[x]??'')}
function applyLanguage(){document.documentElement.lang=LANG;document.documentElement.dir=LANG==='ar'?'rtl':'ltr';document.title='RouletteX';document.querySelectorAll('[data-i18n]').forEach(e=>e.textContent=t(e.dataset.i18n));const sel=$('language');if(sel)sel.value=LANG;const n=document.body.classList.contains('night');$('theme').textContent=t(n?'day_mode':'night_mode');render();}

const CACHE_LIMIT=80;
const $=id=>document.getElementById(id);
const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
const wheel=[0,32,15,19,4,21,2,25,17,34,6,27,13,36,11,30,8,23,10,5,24,16,33,1,20,14,31,9,22,18,29,7,28,12,35,3,26];
const pos=new Map(wheel.map((n,i)=>[n,i]));
const red=new Set([1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36]);
const cache={candidates:new Map(),familyTarget:new Map(),familyBacktest:new Map(),meta:new Map(),model:new Map(),memory:new Map(),trans:new Map()};
const emptyPerf=()=>({n:0,hit:0,exact:0,edge:0,recentEdge:0,robustEdge:0,stability:0,stability20:0,windowEdge:0});
let S=loadState();
function fresh(){return {version:VERSION,spins:[],predictions:[],settings:{tol:3,chartWindow:60}}}
function normalize(x){
  const s=fresh();
  if(!x||typeof x!=='object')return s;
  s.spins=Array.isArray(x.spins)?x.spins.map((v,i)=>({id:Number(v.id)||i+1,result:Number(v.result),createdAt:v.createdAt||new Date().toISOString()})).filter(v=>Number.isInteger(v.result)&&v.result>=0&&v.result<=36):[];
  s.settings={tol:clamp(Number(x.settings?.tol)||3,1,9),chartWindow:[30,60,120].includes(Number(x.settings?.chartWindow))?Number(x.settings.chartWindow):60};
  s.predictions=Array.isArray(x.predictions)?x.predictions:[];
  s.version=VERSION;
  return s;
}
function loadState(){try{const x=JSON.parse(localStorage.getItem(KEY)||'null');if(x?.spins)return normalize(x)}catch{} for(const k of ['roulettePatternLab.v14.8','roulettePatternLab.v13.6','roulettePatternLab.v13.5','roulettePatternLab.v13.4','roulettePatternLab.v12','roulettePatternLab.v10']){try{const x=JSON.parse(localStorage.getItem(k)||'null');if(x?.spins){const s=normalize(x);localStorage.setItem(KEY,JSON.stringify(s));return s}}catch{}} return fresh()}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch{}}
function invalidateAll(){Object.values(cache).forEach(m=>m.clear())}
function hashHistory(h,tol){let x=2166136261;for(let i=0;i<h.length;i++){x^=h[i]+i*31;x=Math.imul(x,16777619)}return (x>>>0)+'|'+tol+'|'+h.length+(h.length?h[h.length-1]:'')}
function keyArr(a){return a.join(',')}
function idx(n){return pos.get(n) ?? 0}
function col(n){return n===0?'green':red.has(n)?'red':'black'}
function jmp(a,b){if(a==null||b==null)return 0;let d=idx(b)-idx(a);if(d>18)d-=37;if(d<-18)d+=37;return d}
function dist(a,b){return Math.min(Math.abs(idx(a)-idx(b)),37-Math.abs(idx(a)-idx(b)))}
function dir(a,b){const j=jmp(a,b);return j>0?'CW':j<0?'CCW':'SAME'}
function neigh(n,t){return Array.from({length:2*t+1},(_,k)=>wheel[(idx(n)-t+k+37*4)%37])}
function baseline(t){return (2*t+1)/37}
function pct(a,b){return b?(100*a/b).toFixed(1)+'%':'—'}
function robustEdgeWilson(hit,n,tol){
  if(!n)return 0;
  const z=1.96,p=hit/n,den=1+z*z/n,center=(p+z*z/(2*n))/den,half=z*Math.sqrt(p*(1-p)/n+z*z/(4*n*n))/den;
  return center-half-baseline(tol);
}
function getTrans(h){const k=keyArr(h);if(cache.trans.has(k))return cache.trans.get(k);const a=[];for(let i=1;i<h.length;i++)a.push({from:h[i-1],to:h[i],j:jmp(h[i-1],h[i]),d:dir(h[i-1],h[i])});cache.trans.set(k,a);return a}
function candidates(h,f,minOcc=2){
  const key=hashHistory(h,0)+'|'+f+'|'+minOcc;if(cache.candidates.has(key))return cache.candidates.get(key);
  if(h.length<12){cache.candidates.set(key,[]);return []}
  const out=[];
  if(f==='sequence'){
    for(let l=2;l<=Math.min(8,h.length-1);l++){const sig=h.slice(-l).join(',');const next=[];for(let i=0;i+l<h.length;i++){if(h.slice(i,i+l).join(',')===sig)next.push(h[i+l])}if(next.length>=minOcc)out.push({type:f,len:l,key:sig,occ:next.length,next})}
  }else if(f==='jump'){
    const a=getTrans(h).map(x=>x.j);for(let l=2;l<=Math.min(6,a.length-1);l++){const sig=a.slice(-l).join(',');const next=[];for(let i=0;i+l<a.length;i++){if(a.slice(i,i+l).join(',')===sig)next.push(a[i+l])}if(next.length>=minOcc)out.push({type:f,len:l,key:sig,occ:next.length,next})}
  }else if(f==='joint'){
    const a=getTrans(h).map(x=>x.j+':'+x.d);for(let l=2;l<=Math.min(6,a.length-1);l++){const sig=a.slice(-l).join('|');const next=[];for(let i=0;i+l<a.length;i++){if(a.slice(i,i+l).join('|')===sig)next.push(h[i+l])}if(next.length>=minOcc)out.push({type:f,len:l,key:sig,occ:next.length,next})}
  }else if(f==='pair'){
    const sig=h.slice(-2).join(','),next=[];for(let i=0;i+2<h.length;i++)if(h[i]+','+h[i+1]===sig)next.push(h[i+2]);if(next.length>=minOcc)out.push({type:f,len:2,key:sig,occ:next.length,next});
  }else{
    const sig=String(h.at(-1)),next=[];for(let i=0;i<h.length-1;i++)if(h[i]===h.at(-1))next.push(h[i+1]);if(next.length>=minOcc)out.push({type:f,len:1,key:sig,occ:next.length,next});
  }
  const r=out.sort((a,b)=>b.len-a.len||b.occ-a.occ);cache.candidates.set(key,r);return r;
}
function weightedFamilyTarget(h,f,minOcc=2){
  const key=hashHistory(h,0)+'|'+f+'|'+minOcc;if(cache.familyTarget.has(key))return cache.familyTarget.get(key);
  const cs=candidates(h,f,minOcc);if(!cs.length){cache.familyTarget.set(key,null);return null}
  const q=Array(37).fill(0);
  cs.slice(0,5).forEach(p=>{const reliability=clamp(0.58+0.05*Math.min(p.occ,10)+0.045*Math.min(p.len,8),0.58,1.25);const uniq=new Set(p.next);uniq.forEach(n=>q[idx(n)]+=reliability/Math.max(1,uniq.size))});
  let best=0;for(let n=1;n<37;n++)if(q[n]>q[best])best=n;const ans=q[best]?best:null;cache.familyTarget.set(key,ans);return ans;
}
function learningTarget(h,f){
  // Walk-forward learning may use a shorter pattern when the longest/current
  // pattern has no historical repetition. This affects learning evaluation
  // only; prediction candidates keep their existing evidence requirements.
  const max=f==='pair'?2:(f==='transition'?1:(f==='sequence'?8:6));
  const min=f==='pair'?1:1;
  for(let l=max;l>=min;l--){
    const t=weightedFamilyTarget(h,f,l);
    if(t!=null)return t;
  }
  return null;
}
function familyBacktest(h,f,tol){
  const key=hashHistory(h,tol)+'|'+f;if(cache.familyBacktest.has(key))return cache.familyBacktest.get(key);
  if(h.length<14){const z=emptyPerf();cache.familyBacktest.set(key,z);return z}
  const start=Math.max(12,h.length-160),rows=[];
  for(let i=start;i<h.length;i++){const t=learningTarget(h.slice(0,i),f);if(t==null)continue;rows.push({hit:dist(t,h[i])<=tol,exact:dist(t,h[i])===0})}
  if(!rows.length){const z=emptyPerf();cache.familyBacktest.set(key,z);return z}
  const n=rows.length,hit=rows.filter(x=>x.hit).length,exact=rows.filter(x=>x.exact).length,recent=rows.slice(-Math.min(20,n)),rh=recent.filter(x=>x.hit).length;
  const edge=hit/n-baseline(tol),recentEdge=rh/recent.length-baseline(tol),robust=robustEdgeWilson(hit,n,tol),mid=Math.max(10,Math.floor(n/2)),a=rows.slice(0,mid),b=rows.slice(mid),ra=a.length?a.filter(x=>x.hit).length/a.length:0,rb=b.length?b.filter(x=>x.hit).length/b.length:0;
  const stability20=clamp(1-Math.abs(edge-recentEdge)/Math.max(0.05,Math.abs(edge)+0.02),0,1),stabilityHalf=clamp(1-Math.abs(ra-rb)/Math.max(0.10,Math.abs(ra)+Math.abs(rb)+0.10),0,1);
  const result={n,hit,exact,edge,recentEdge,robustEdge:robust,stability:0.55*stability20+0.45*stabilityHalf,stability20,windowEdge:edge};cache.familyBacktest.set(key,result);return result;
}
function metaBacktest(h,tol){
  const key=hashHistory(h,tol)+'|meta';if(cache.meta.has(key))return cache.meta.get(key);const combos={};
  for(let i=Math.max(14,h.length-140);i<h.length;i++){
    const hh=h.slice(0,i),targets={};FAMILIES.forEach(f=>targets[f]=weightedFamilyTarget(hh,f));const active=FAMILIES.filter(f=>targets[f]!=null);
    for(let a=0;a<active.length;a++)for(let b=a+1;b<active.length;b++){const fa=active[a],fb=active[b],same=targets[fa]===targets[fb];if(!same)continue;const k=fa+'+'+fb;(combos[k]??={n:0,hit:0}).n++;if(dist(targets[fa],h[i])<=tol)combos[k].hit++}
  }
  const out={};Object.entries(combos).forEach(([k,v])=>out[k]={...v,edge:v.hit/v.n-baseline(tol),robustEdge:robustEdgeWilson(v.hit,v.n,tol)});cache.meta.set(key,out);return out;
}
function adaptive(h,tol){
  const perf={},weights={};
  FAMILIES.forEach(f=>perf[f]=familyBacktest(h,f,tol));

  // Adaptive weight = current performance quality + evidence strength,
  // smoothed through the family's own previous walk-forward states. This
  // prevents a family from jumping from a strong weight straight to the
  // 0.55 floor because of a short-term change in the latest backtest.
  const rawWeight=(p)=>{
    if(!p||!p.n)return 0.55;
    const n=p.n;
    const sample=clamp(Math.sqrt(n/(n+12)),0,1);
    const quality=p.robustEdge*0.55+p.recentEdge*0.20+p.edge*0.15+(p.stability-0.5)*0.10;
    const score=quality*sample;
    const delta=clamp(score*7,-0.18,0.85);
    return clamp(0.55+delta,0.55,1.40);
  };

  // Reconstruct the weight trajectory walk-forward, so the current weight
  // retains controlled continuity without using any future observations.
  const start=Math.max(14,h.length-160), alpha=0.22;
  FAMILIES.forEach(f=>{
    let w=0.55,seen=false;
    for(let i=start;i<h.length;i++){
      const p=familyBacktest(h.slice(0,i),f,tol);
      if(!p.n)continue;
      const target=rawWeight(p);
      w=seen?(w*(1-alpha)+target*alpha):target;
      seen=true;
    }
    weights[f]=clamp(seen?w:0.55,0.55,1.40);
  });
  return {perf,weights,meta:metaBacktest(h,tol)};
}
function calibrateRelative(scores){
  const floor=0.015,temps=scores.map(v=>Math.sqrt(Math.max(v,0)));const sum=temps.reduce((a,b)=>a+b,0)||1;return temps.map(v=>Math.max(floor,v/sum));
}
function model(h,tol){
  const key=hashHistory(h,tol);if(cache.model.has(key))return cache.model.get(key);if(h.length<12)return null;
  const a=adaptive(h,tol),familyScores={},familyTargets={};
  for(const f of FAMILIES){
    const cs=candidates(h,f),scores=Array(37).fill(0);
    let evidence=cs;
    // Prediction fallback only: if the strict pattern has no evidence, use
    // relaxed historical matches without flattening their support uniformly.
    // This preserves relative evidence between candidates while keeping the
    // fallback weaker than a fully repeated pattern. Learning/backtest logic
    // is intentionally untouched.
    if(!evidence.length) evidence=candidates(h,f,1);
    evidence.slice(0,5).forEach(q=>{
      const relaxed=!cs.length;
      const lenBoost=q.len>=6?1.25:q.len>=4?1.12:1,occBoost=clamp(Math.log2(q.occ+1)/2,0.5,1.35),sampleConfidence=clamp(q.occ/7,0.35,1);
      const localW=lenBoost*occBoost*sampleConfidence*(relaxed?0.42:1);
      const counts=new Map();q.next.forEach(n=>counts.set(n,(counts.get(n)||0)+1));
      const total=q.next.length||1;
      counts.forEach((count,n)=>{scores[idx(n)]+=localW*(count/total)});
    });
    const total=scores.reduce((x,y)=>x+y,0);
    familyScores[f]=total?scores.map(x=>x/total):Array(37).fill(0);
    familyTargets[f]=total?familyScores[f].reduce((bi,v,i)=>v>familyScores[f][bi]?i:bi,0):null;
  }
  const score=Array(37).fill(0.0001),support=Array(37).fill(0);
  for(const f of FAMILIES){const w=a.weights[f],distF=familyScores[f],has=distF.some(x=>x>0);if(!has)continue;for(let n=0;n<37;n++){score[n]+=w*distF[n];if(distF[n]>0)support[n]+=w}}
  Object.entries(a.meta).forEach(([k,m])=>{if(m.n<6||m.robustEdge<=0)return;const [fa,fb]=k.split('+'),t=familyTargets[fa];if(t!=null&&familyTargets[fb]===t){score[idx(t)]+=clamp(m.robustEdge*16,0.03,0.55);support[idx(t)]+=0.5}});
  const recent=h.slice(-10),cnt=new Map();recent.forEach(n=>cnt.set(n,(cnt.get(n)||0)+1));for(let n=0;n<37;n++){const c=cnt.get(n)||0;if(c>=3)score[n]*=(c===3?0.90:c===4?0.82:0.72)}
  const probs=calibrateRelative(score),ranked=score.map((v,n)=>({n,v,p:probs[n],support:support[n]})).sort((a,b)=>b.p-a.p||b.support-a.support),top=ranked[0],second=ranked[1],lead=top.p-second.p;
  let cw=0,ccw=0;const last=h.at(-1);for(const x of ranked){const j=jmp(last,x.n);if(j>0)cw+=x.p;else if(j<0)ccw+=x.p}const active=FAMILIES.filter(f=>a.perf[f].n>0).length;
  const familyRobust=FAMILIES.map(f=>a.perf[f].n?a.perf[f].robustEdge:0).filter(x=>Number.isFinite(x)),avgRobust=familyRobust.length?familyRobust.reduce((s,x)=>s+x,0)/familyRobust.length:0;
  const familyRecent=FAMILIES.map(f=>a.perf[f].n?a.perf[f].recentEdge:0).filter(x=>Number.isFinite(x)),avgRecent=familyRecent.length?familyRecent.reduce((s,x)=>s+x,0)/familyRecent.length:0;
  const edge=top.p-baseline(tol),robustEdge=avgRobust,consensusCount=FAMILIES.filter(f=>a.perf[f].n&&familyTargets[f]===top.n).length,consensus=active?consensusCount/active:0;
  const stability=clamp(0.55*clamp(1-Math.abs(avgRobust-avgRecent)/Math.max(0.05,Math.abs(avgRobust)+0.02),0,1)+0.45*(FAMILIES.reduce((s,f)=>s+(a.perf[f].n?a.perf[f].stability:0),0)/Math.max(1,active)),0,1);
  const recentQuality=clamp((avgRecent+baseline(tol))/(Math.max(0.001,1-baseline(tol))),0,1),sampleQuality=clamp((a.perf[topSupportFamily(ranked,a,familyTargets,top.n)]?.n||0)/100,0,1);
  const confidence=Math.round(clamp(28+lead*1000+clamp(top.support/Math.max(1,active),0,1)*22+consensus*25+stability*12+clamp(avgRobust*400,-8,20),5,99));
  const quality=Math.round(clamp(consensus*28+stability*22+clamp((robustEdge+0.03)/0.08,0,1)*25+clamp((Math.log1p(Math.max(0,top.support))/3),0,1)*10+recentQuality*15,0,100));
  const signal=!ranked.length||active<2||confidence<45||edge<0.003||robustEdge<=0?'NONE':confidence>=72&&robustEdge>=0.008&&quality>=70?'HIGH':'LOW';
  const target=ranked.length?top.n:null,jump=target==null?null:jmp(last,target);
  const result={target,prob:target==null?0:top.p,ranking:ranked.slice(0,12),predDir:cw>=ccw?'CW':'CCW',cw,ccw,adaptive:a,seq:candidates(h,'sequence').slice(0,4),joint:candidates(h,'joint').slice(0,3),jumps:candidates(h,'jump').slice(0,3),edge,robustEdge,confidence,signal,lead,avgEdge:avgRobust,avgRecent,stability,consensusCount,activeModels:active,jump,quality,familyTargets};
  cache.model.set(key,result);if(cache.model.size>CACHE_LIMIT)cache.model.delete(cache.model.keys().next().value);return result;
}

function topSupportFamily(ranked,a,targets,n){let best=FAMILIES[0],bn=-1;for(const f of FAMILIES){const q=a.perf[f];if(targets[f]===n&&(q.n>bn)){best=f;bn=q.n}}return best}
function rebuildPredictions(){
  const h=S.spins.map(x=>x.result),out=[];for(let i=0;i<h.length;i++){const prior=h.slice(0,i);if(prior.length<12)continue;const p=model(prior,S.settings.tol);if(p)out.push({id:out.length+1,spinIndex:i+1,previous:prior.at(-1)??null,prediction:p,actual:h[i],createdAt:S.spins[i].createdAt||new Date().toISOString()})}S.predictions=out;
}
function ensurePredictions(){
  const expected=Math.max(0,S.spins.length-12),last=S.predictions.at(-1)?.spinIndex||0,valid=S.predictions.length===expected&&last===S.spins.length&&S.predictions.every(x=>Number.isFinite(x?.prediction?.prob)&&x?.prediction?.target!=null);if(!valid){rebuildPredictions();save()}
}
function backtest(tol){ensurePredictions();const rows=S.predictions.filter(x=>x?.prediction?.target!=null&&x.spinIndex<=S.spins.length),n=rows.length,hit=rows.filter(x=>dist(x.prediction.target,x.actual)<=tol).length,exact=rows.filter(x=>dist(x.prediction.target,x.actual)===0).length,dirHit=rows.filter(x=>x.prediction.predDir&&x.previous!=null&&x.prediction.predDir===dir(x.previous,x.actual)).length;return {n,hit,exact,dir:dirHit,rows}}
function patternMemory(h){const key=hashHistory(h,0);if(cache.memory.has(key))return cache.memory.get(key);const mem={};FAMILIES.forEach(f=>candidates(h,f).forEach(q=>{const k=q.type+'|'+q.key;if(!mem[k])mem[k]={type:q.type,key:q.key,occ:q.occ,next:{}};mem[k].occ=Math.max(mem[k].occ,q.occ);q.next.forEach(n=>mem[k].next[n]=(mem[k].next[n]||0)+1)}));const out=Object.values(mem);cache.memory.set(key,out);return out}
function add(n){
  const value=Number(n),h=S.spins.map(x=>x.result),now=new Date().toISOString();
  const p=h.length>=12?model(h,S.settings.tol):null;
  S.spins.push({id:S.spins.length?Math.max(...S.spins.map(x=>x.id))+1:1,result:value,createdAt:now});
  if(p)S.predictions.push({id:S.predictions.length?Math.max(...S.predictions.map(x=>x.id))+1:1,spinIndex:S.spins.length,previous:h.at(-1)??null,prediction:p,actual:value,createdAt:now});
  invalidateAll();save();render();
}
function undo(){if(!S.spins.length)return;S.spins.pop();S.predictions=(S.predictions||[]).filter(x=>x.spinIndex<=S.spins.length);invalidateAll();save();render()}
function clearAll(){if(confirm(t('confirm_clear'))){S=fresh();invalidateAll();save();render()}}
function render(){
  const h=S.spins.map(x=>x.result),transitions=getTrans(h),p=model(h,S.settings.tol),bt=backtest(S.settings.tol),tol=S.settings.tol;
  document.querySelectorAll('.tolText').forEach(e=>e.textContent=tol);$('counter').textContent=h.length+' '+t('spins');$('evals').textContent=bt.n;$('tolLabel').textContent=tol;
  $('history').innerHTML=h.slice(-80).reverse().map(n=>`<span class="result ${col(n)}">${n}</span>`).join('')||`<span class="muted">${t('no_history')}</span>`;
  $('jumps').innerHTML=transitions.slice(-80).reverse().map(x=>`<span class="chip">${x.j>=0?'+':''}${x.j}</span>`).join('')||'<span class="muted">—</span>';
  $('dirs').innerHTML=transitions.slice(-80).reverse().map(x=>`<span class="chip">${x.d}</span>`).join('')||'<span class="muted">—</span>';
  $('tol').value=String(tol);
  if(!p){renderEmpty(h);drawChart();return}
  const tg=$('target');tg.textContent=p.target==null?'—':p.target;tg.className='target '+(p.target==null?'black':col(p.target));$('prob').textContent=p.target==null?'—':(p.prob*100).toFixed(2)+'%';
  const sm=p.signal==='HIGH'?t('strong_signal'):p.signal==='LOW'?t('weak_signal'):t('no_edge');$('signal').textContent=sm;$('signal').className='signal '+(p.signal==='HIGH'?'high':p.signal==='LOW'?'low':'none');
  $('predDir').textContent=p.target==null?t('direction_empty'):tf('direction_fmt',{d:p.predDir,cw:(p.cw*100).toFixed(1),ccw:(p.ccw*100).toFixed(1)});$('predJump').textContent=p.target==null?t('jump_empty'):tf('jump_fmt',{j:(p.jump>=0?'+':'')+p.jump});$('zone').textContent=p.target==null?t('no_zone'):neigh(p.target,tol).join(' · ');
  $('confidence').textContent=p.confidence+'/100';$('edge').textContent=fmtPP(p.edge);$('support').textContent=p.activeModels+'/'+FAMILIES.length;$('qualityMini').textContent=p.quality+'/100';$('quality').textContent=p.quality;$('qualityFill').style.width=p.quality+'%';$('qualitySummary').textContent=t('quality_summary');
  $('qConsensus').textContent=Math.round((p.activeModels?p.consensusCount/p.activeModels:0)*100)+'/100';$('qStability').textContent=Math.round(p.stability*100)+'/100';$('qRobust').textContent=fmtPP(p.robustEdge);$('qSample').textContent=Math.round(clamp((p.adaptive.perf[topSupportFamily(p.ranking,p.adaptive,p.familyTargets,p.target)]?.n||0)/100,0,1)*100)+'/100';$('qRecent').textContent=Math.round(clamp((p.avgRecent+baseline(tol))/(Math.max(0.001,1-baseline(tol))),0,1)*100)+'/100';
  $('robustEdge').textContent=fmtPP(p.robustEdge);$('consensus').textContent=p.consensusCount+'/'+p.activeModels;$('stability').textContent=Math.round(p.stability*100)+'/100';
  $('ranking').innerHTML=p.ranking.slice(0,3).map((x,i)=>`<div class="rank"><div class="ranktop"><span>#${i+1} · ${x.n}${x.support?` · ${x.support} ${t('support')}`:''}</span><b>${(x.p*100).toFixed(2)}%</b></div><div class="bar"><i style="width:${Math.max(2,100*x.p/p.ranking[0].p)}%"></i></div></div>`).join('');
  $('alerts').innerHTML=[...p.seq,...p.joint,...p.jumps].slice(0,7).map(q=>`<div class="alert"><b>${q.type==='sequence'?t('strong_family'):q.type==='joint'?t('joint_family'):t('jump_family')}</b><br>${esc(q.key).replaceAll(',',' → ')} · ${q.occ} ${t('matches')} · ${t('next')}: ${q.next.join(', ')}</div>`).join('')||`<span class="muted">${t('no_repeated')}</span>`;
  $('weights').innerHTML=FAMILIES.map(k=>{const v=p.adaptive.weights[k],q=p.adaptive.perf[k];return `<div class="weight"><span class="muted">${t('families.'+k)}</span><br><b>${v.toFixed(2)}×</b><div class="muted">${q.n} ${t('tests')} · ±${tol}: ${pct(q.hit,q.n)} · ${t('edge')} ${q.n?fmtPP(q.edge):'—'} · ${t('recently')} ${q.n?fmtPP(q.recentEdge):'—'} · ${t('robust_edge').toLowerCase()} ${q.n?fmtPP(q.robustEdge):'—'}</div></div>`}).join('');
  $('weightSummary').textContent=t('weight_summary');
  $('learningSummary').textContent=FAMILIES.map(f=>{const q=p.adaptive.perf[f];return q.n?`${t('families.'+f)}: ${q.n} ${t('tests')}, ${fmtPP(q.edge)} ${t('historical')}, ${fmtPP(q.recentEdge)} ${t('recently')}, ${Math.round(q.stability*100)}${t('stability100')}`:`${t('families.'+f)}: ${t('no_sample')}`}).join(' · ');
  $('predHistory').innerHTML=bt.rows.slice(-60).reverse().map(x=>{const pr=x.prediction,win=dist(pr.target,x.actual)<=tol,j=pr.jump==null?'—':`${pr.jump>=0?'+':''}${pr.jump}`;return `<div class="prow"><b>#${x.spinIndex}</b><span>${pr.target} → ${x.actual}</span><span>${j} ${t('pockets')}</span><span>${(pr.prob*100).toFixed(2)}%</span><span>${pr.confidence}/100</span><b class="${win?'win':'loss'}">${win?t('win'):t('loss')}</b></div>`}).join('')||'—';
  const base=100*baseline(tol), recentRows=bt.rows.slice(-20),recentRate=recentRows.length?100*recentRows.filter(x=>dist(x.prediction.target,x.actual)<=tol).length/recentRows.length:null,chartRows=bt.rows.slice(-Number(S.settings.chartWindow)),chartRate=chartRows.length?100*chartRows.filter(x=>dist(x.prediction.target,x.actual)<=tol).length/chartRows.length:null;
  $('chartRate').textContent=chartRate==null?'—':chartRate.toFixed(1)+'%';$('chartBase').textContent=base.toFixed(1)+'%';$('chartEdge').textContent=chartRate==null?'—':((chartRate-base>=0?'+':'')+(chartRate-base).toFixed(1)+' pp');$('chartEval').textContent=chartRows.length;$('chartRecent').textContent=recentRate==null?'—':recentRate.toFixed(1)+'%';
  drawChart();
}
function renderEmpty(h){$('target').textContent='—';$('target').className='target black';$('prob').textContent='—';$('signal').textContent=h.length<12?t('waiting_data'):t('no_signal');$('signal').className='signal';$('predDir').textContent=t('direction_empty');$('predJump').textContent=t('jump_empty');$('zone').textContent=h.length<12?t('need_spins'):'—';$('confidence').textContent='—';$('edge').textContent='—';$('support').textContent='—';$('qualityMini').textContent='—';$('robustEdge').textContent='—';$('consensus').textContent='—';$('stability').textContent='—';$('quality').textContent='—';$('qualityFill').style.width='0%';$('qualitySummary').textContent='';['qConsensus','qStability','qRobust','qSample','qRecent'].forEach(id=>$(id).textContent='—');$('ranking').innerHTML='';$('alerts').innerHTML=h.length<12?t('need_spins')+'.':'—';$('weights').innerHTML=FAMILIES.map(k=>`<div class="weight"><span class="muted">${t('families.'+k)}</span><br><b>—</b><div class="muted">${t('no_sample')}</div></div>`).join('');$('learningSummary').textContent='';$('predHistory').innerHTML='—';}
function drawChart(){
  const c=$('chart'),d=devicePixelRatio||1,w=c.clientWidth||500,hh=c.clientHeight||240;c.width=w*d;c.height=hh*d;const x=c.getContext('2d');x.setTransform(d,0,0,d,0,0);x.clearRect(0,0,w,hh);const rows=S.predictions.filter(r=>r?.prediction?.target!=null),tol=S.settings.tol,win=Number(S.settings.chartWindow),slice=rows.slice(-win);if(!slice.length){x.fillStyle=getComputedStyle(document.body).getPropertyValue('--muted');x.font='12px system-ui';x.fillText(t('no_predictions'),12,25);return}
  const vals=[];let hits=0;const base=100*baseline(tol);slice.forEach(r=>{if(dist(r.prediction.target,r.actual)<=tol)hits++;vals.push(100*hits/(vals.length+1))});const color=getComputedStyle(document.body).getPropertyValue('--accent');x.strokeStyle=color;x.lineWidth=2;x.beginPath();vals.forEach((y,i,a)=>{const xx=8+i*(w-16)/Math.max(1,a.length-1),yy=hh-16-y*(hh-30)/100;i?x.lineTo(xx,yy):x.moveTo(xx,yy)});x.stroke();x.strokeStyle=getComputedStyle(document.body).getPropertyValue('--muted');x.lineWidth=1;x.setLineDash([4,4]);const by=hh-16-base*(hh-30)/100;x.beginPath();x.moveTo(8,by);x.lineTo(w-8,by);x.stroke();x.setLineDash([]);
}
function fmtPP(v){return (v*100>=0?'+':'')+(v*100).toFixed(1)+' pp'}
function esc(x){return String(x).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
const LANGUAGE_NAMES={en:'English',zh:'中文 (Mandarin)',hi:'हिन्दी',es:'Español',fr:'Français',ar:'العربية',bn:'বাংলা',pt:'Português'};
const languageSelect=$('language');LANGS.forEach(k=>{const o=document.createElement('option');o.value=k;o.textContent=LANGUAGE_NAMES[k];languageSelect.appendChild(o)});
$('language').onchange=()=>{LANG=$('language').value;localStorage.setItem(LANG_KEY,LANG);applyLanguage()};
$('theme').onclick=()=>{document.body.classList.toggle('night');const n=document.body.classList.contains('night');localStorage.setItem(THEME_KEY,n?'night':'day');$('theme').textContent=t(n?'day_mode':'night_mode');drawChart()};
$('undo').onclick=undo;$('clear').onclick=clearAll;
$('tol').onchange=()=>{S.settings.tol=Number($('tol').value);invalidateAll();rebuildPredictions();save();render()};
$('chartWindow').value=String(S.settings.chartWindow);$('chartWindow').onchange=()=>{S.settings.chartWindow=Number($('chartWindow').value);save();drawChart()};
for(let n=0;n<=36;n++){const b=document.createElement('button');b.className='num '+col(n);b.textContent=n;b.onpointerdown=()=>{b.classList.add('pressed');setTimeout(()=>b.classList.remove('pressed'),120)};b.onclick=()=>add(n);$('numbers').appendChild(b)}
if(localStorage.getItem(THEME_KEY)==='night'){document.body.classList.add('night');$('theme').textContent=t('day_mode')}
ensurePredictions();applyLanguage();
})();
