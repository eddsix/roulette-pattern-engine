
(()=>{
'use strict';
const VERSION='15.7.0', KEY='roulettePatternLab.v15.2', THEME_KEY='roulettePatternLab.theme';
const FAMILIES=['sequence','jump','joint','pair','transition'];
const LANG_KEY='roulettePatternLab.language';
const LANGS=['en','zh','hi','es','fr','ar','bn','pt'];
const I18N={
 en:{results_input:'Results input',latest_results:'Latest results',recent_jumps:'Recent jumps',recent_directions:'Recent directions',prediction_quality:'Prediction quality',internal_calibration:'internal calibration',learning_diagnosis:'Learning diagnostics',walk_forward:'walk-forward',learning:'learning',adaptive_weights:'Adaptive weights',active_patterns:'Active patterns',prediction_history:'Prediction history',performance_tolerance:'Performance ± tolerance',performance_summary:'Performance summary',window:'Window',win_rate:'Win rate',baseline:'Baseline',edge:'Edge',evaluated:'Evaluated',last_20:'Last 20',realtime_prediction:'Real-time prediction',ensemble_relative_score:'ensemble relative score',direction:'Direction',jump:'Predicted jump',zone:'Zone',direction_empty:'Direction: —',jump_empty:'Predicted jump: —',zone_prefix:'Zone',confidence:'Confidence',active_models:'Active models',quality:'Quality',alternative_predictions:'Alternative predictions',top_3:'Top 3',spins:'spins',consensus:'Consensus',stability:'Stability',robust_edge:'Robust edge',sample:'Sample',recency:'Recency',no_data:'NO DATA',night_mode:'Night mode',day_mode:'Day mode',undo:'Undo',clear_history:'Clear history',confirm_clear:'Clear all history?',waiting_data:'WAITING FOR DATA',no_signal:'NO SIGNAL',need_spins:'At least 12 spins are required',no_zone:'No zone with sufficient evidence',no_repeated:'No repeated pattern with sufficient evidence.',no_predictions:'There are not enough evaluated predictions yet.',no_history:'No results',no_sample:'No sample',families:{sequence:'Sequence',jump:'Jump',joint:'Joint',pair:'Pair',transition:'Transition'},strong_signal:'STRONG SIGNAL',weak_signal:'WEAK SIGNAL',no_edge:'NO EDGE',direction_fmt:'Direction: {d} · CW {cw}% / CCW {ccw}%',jump_fmt:'Predicted jump: {j} pockets',quality_summary:'Quality combines consensus, stability, robust edge, sample size and recent behavior. It is not a guaranteed probability of success.',weight_summary:'Weights are calculated only from results available before each evaluation. Historical predictions are not recalculated when new spins are added.',no_family_sample:'no sample',tests:'tests',matches:'matches',next:'next',support:'supports',loss:'LOSS',win:'WIN',pockets:'pockets',strong_family:'SEQUENCE',joint_family:'JUMP + DIRECTION',jump_family:'JUMP PATTERN',recently:'recent',historical:'historical',stability100:'/100 stability',chart_baseline_label:'Baseline {v}%',chart_no_signal:'No signal',chart_edge_label:'Edge {v} pp',chart_hit:'HIT',chart_miss:'MISS',chart_prediction:'Prediction: {v}',chart_result:'Result: {v}',chart_distance:'Distance: {v} · ±{tol}',chart_performance:'Performance: {v}%',chart_no_signal_reason:'No signal (score < 5%)',chart_not_evaluated:'Not counted as an evaluation'},
 zh:{results_input:'结果输入',latest_results:'最近结果',recent_jumps:'近期跳跃',recent_directions:'近期方向',prediction_quality:'预测质量',internal_calibration:'内部校准',learning_diagnosis:'学习诊断',walk_forward:'滚动验证',learning:'学习',adaptive_weights:'自适应权重',active_patterns:'活跃模式',prediction_history:'预测历史',performance_tolerance:'± 容差表现',performance_summary:'表现概览',window:'窗口',win_rate:'命中率',baseline:'基线',edge:'优势',evaluated:'已评估',last_20:'最近20次',realtime_prediction:'实时预测',ensemble_relative_score:'集成相对评分',direction:'方向',jump:'预计跳跃',zone:'区域',direction_empty:'方向：—',jump_empty:'预计跳跃：—',zone_prefix:'区域',confidence:'置信度',active_models:'活跃模型',quality:'质量',alternative_predictions:'备选预测',top_3:'前3名',spins:'次',consensus:'共识',stability:'稳定性',robust_edge:'稳健优势',sample:'样本',recency:'近期表现',no_data:'无数据',night_mode:'夜间模式',day_mode:'日间模式',undo:'撤销',clear_history:'清除历史',confirm_clear:'清除所有历史？',waiting_data:'等待数据',no_signal:'无信号',need_spins:'至少需要12次结果',no_zone:'没有足够证据的区域',no_repeated:'没有足够证据的重复模式。',no_predictions:'还没有足够的已评估预测。',no_history:'无结果',no_sample:'无样本',families:{sequence:'序列',jump:'跳跃',joint:'联合',pair:'配对',transition:'转换'},strong_signal:'强信号',weak_signal:'弱信号',no_edge:'无优势',direction_fmt:'方向：{d} · CW {cw}% / CCW {ccw}%',jump_fmt:'预计跳跃：{j} 个位置',quality_summary:'质量结合共识、稳定性、稳健优势、样本量和近期表现。不代表保证的成功概率。',weight_summary:'权重仅根据每次评估之前可用的结果计算。新增结果不会重新计算历史预测。',no_family_sample:'无样本',tests:'次测试',matches:'次匹配',next:'后续',support:'支持',loss:'失败',win:'命中',pockets:'位置',strong_family:'序列',joint_family:'跳跃 + 方向',jump_family:'跳跃模式',recently:'近期',historical:'历史',stability100:'稳定性/100',chart_baseline_label:'基线 {v}%',chart_no_signal:'无信号',chart_edge_label:'优势 {v} 个百分点',chart_hit:'命中',chart_miss:'未命中',chart_prediction:'预测：{v}',chart_result:'结果：{v}',chart_distance:'距离：{v} · ±{tol}',chart_performance:'表现：{v}%',chart_no_signal_reason:'无信号（评分 < 5%）',chart_not_evaluated:'不计入评估'},
 hi:{results_input:'परिणाम दर्ज करें',latest_results:'हाल के परिणाम',recent_jumps:'हाल के जंप',recent_directions:'हाल की दिशाएँ',prediction_quality:'पूर्वानुमान गुणवत्ता',internal_calibration:'आंतरिक कैलिब्रेशन',learning_diagnosis:'लर्निंग डायग्नोस्टिक्स',walk_forward:'वॉक-फॉरवर्ड',learning:'लर्निंग',adaptive_weights:'अनुकूली भार',active_patterns:'सक्रिय पैटर्न',prediction_history:'पूर्वानुमान इतिहास',performance_tolerance:'± सहनशीलता प्रदर्शन',performance_summary:'प्रदर्शन सारांश',window:'विंडो',win_rate:'सफलता दर',baseline:'बेसलाइन',edge:'एज',evaluated:'मूल्यांकन',last_20:'पिछले 20',realtime_prediction:'रीयल-टाइम पूर्वानुमान',ensemble_relative_score:'एन्सेम्बल सापेक्ष स्कोर',direction:'दिशा',jump:'अनुमानित जंप',zone:'ज़ोन',direction_empty:'दिशा: —',jump_empty:'अनुमानित जंप: —',zone_prefix:'ज़ोन',confidence:'विश्वास',active_models:'सक्रिय मॉडल',quality:'गुणवत्ता',alternative_predictions:'वैकल्पिक पूर्वानुमान',top_3:'शीर्ष 3',spins:'स्पिन',consensus:'सहमति',stability:'स्थिरता',robust_edge:'मजबूत एज',sample:'नमूना',recency:'हालिया',no_data:'कोई डेटा नहीं',night_mode:'नाइट मोड',day_mode:'डे मोड',undo:'पूर्ववत',clear_history:'इतिहास मिटाएँ',confirm_clear:'पूरा इतिहास मिटाएँ?',waiting_data:'डेटा की प्रतीक्षा',no_signal:'कोई संकेत नहीं',need_spins:'कम से कम 12 स्पिन आवश्यक हैं',no_zone:'पर्याप्त प्रमाण वाला कोई ज़ोन नहीं',no_repeated:'पर्याप्त प्रमाण वाला कोई दोहराया पैटर्न नहीं।',no_predictions:'अभी पर्याप्त मूल्यांकित पूर्वानुमान नहीं हैं।',no_history:'कोई परिणाम नहीं',no_sample:'कोई नमूना नहीं',families:{sequence:'सीक्वेंस',jump:'जंप',joint:'जॉइंट',pair:'पेयर',transition:'ट्रांज़िशन'},strong_signal:'मजबूत संकेत',weak_signal:'कमज़ोर संकेत',no_edge:'कोई एज नहीं',direction_fmt:'दिशा: {d} · CW {cw}% / CCW {ccw}%',jump_fmt:'अनुमानित जंप: {j} पॉकेट',quality_summary:'गुणवत्ता सहमति, स्थिरता, मजबूत एज, नमूना आकार और हालिया व्यवहार को जोड़ती है। यह सफलता की गारंटी नहीं है।',weight_summary:'भार हर मूल्यांकन से पहले उपलब्ध परिणामों से ही गणना किए जाते हैं। नए स्पिन जुड़ने पर ऐतिहासिक पूर्वानुमान दोबारा नहीं गिने जाते।',no_family_sample:'कोई नमूना नहीं',tests:'टेस्ट',matches:'मिलान',next:'अगले',support:'समर्थन',loss:'हार',win:'जीत',pockets:'पॉकेट',strong_family:'सीक्वेंस',joint_family:'जंप + दिशा',jump_family:'जंप पैटर्न',recently:'हालिया',historical:'ऐतिहासिक',stability100:'स्थिरता/100',chart_baseline_label:'बेसलाइन {v}%',chart_no_signal:'कोई संकेत नहीं',chart_edge_label:'एज {v} pp',chart_hit:'सफल',chart_miss:'असफल',chart_prediction:'पूर्वानुमान: {v}',chart_result:'परिणाम: {v}',chart_distance:'दूरी: {v} · ±{tol}',chart_performance:'प्रदर्शन: {v}%',chart_no_signal_reason:'कोई संकेत नहीं (स्कोर < 5%)',chart_not_evaluated:'मूल्यांकन में शामिल नहीं'},
 es:{results_input:'Entrada de resultados',latest_results:'Últimos resultados',recent_jumps:'Saltos recientes',recent_directions:'Direcciones recientes',prediction_quality:'Calidad de predicción',internal_calibration:'calibración interna',learning_diagnosis:'Diagnóstico del aprendizaje',walk_forward:'walk-forward',learning:'aprendizaje',adaptive_weights:'Pesos adaptativos',active_patterns:'Patrones activos',prediction_history:'Historial de predicciones',performance_summary:'Resumen de rendimiento',performance_tolerance:'Rendimiento ± tolerancia',window:'Ventana',win_rate:'Win rate',baseline:'Baseline',edge:'Edge',evaluated:'Evaluadas',last_20:'Últimas 20',realtime_prediction:'Predicción en tiempo real',ensemble_relative_score:'score relativo del ensemble',direction:'Dirección',jump:'Salto previsto',zone:'Zona',direction_empty:'Dirección: —',jump_empty:'Salto previsto: —',zone_prefix:'Zona',confidence:'Confianza',active_models:'Modelos activos',quality:'Calidad',alternative_predictions:'Predicciones alternativas',top_3:'Top 3',spins:'spins',consensus:'Consenso',stability:'Estabilidad',robust_edge:'Edge robusto',sample:'Muestra',recency:'Recencia',no_data:'SIN DATOS',night_mode:'Modo noche',day_mode:'Modo día',undo:'Deshacer',clear_history:'Borrar historial',confirm_clear:'¿Borrar todo el histórico?',waiting_data:'ESPERANDO DATOS',no_signal:'SIN SEÑAL',need_spins:'Se necesitan al menos 12 spins',no_zone:'No hay zona con evidencia suficiente',no_repeated:'No hay patrón repetido suficiente.',no_predictions:'Aún no hay suficientes predicciones evaluadas.',no_history:'Sin resultados',no_sample:'Sin muestra',families:{sequence:'secuencia',jump:'salto',joint:'joint',pair:'pair',transition:'transition'},strong_signal:'SEÑAL FUERTE',weak_signal:'SEÑAL DÉBIL',no_edge:'SIN EDGE',direction_fmt:'Dirección: {d} · CW {cw}% / CCW {ccw}%',jump_fmt:'Salto previsto: {j} pockets',quality_summary:'La calidad combina consenso, estabilidad, edge robusto, tamaño de muestra y comportamiento reciente. No equivale a una probabilidad garantizada de acierto.',weight_summary:'Los pesos se calculan únicamente con resultados disponibles antes de cada evaluación. Las predicciones históricas no se recalculan al añadir spins nuevos.',no_family_sample:'sin muestra',tests:'tests',matches:'coincidencias',next:'siguientes',support:'apoyos',loss:'LOSS',win:'WIN',pockets:'pockets',strong_family:'SECUENCIA',joint_family:'SALTO + DIRECCIÓN',jump_family:'PATRÓN DE SALTOS',recently:'reciente',historical:'histórico',stability100:'/100 estabilidad',chart_baseline_label:'Baseline {v}%',chart_no_signal:'Sin señal',chart_edge_label:'Edge {v} pp',chart_hit:'ACIERTO',chart_miss:'FALLO',chart_prediction:'Predicción: {v}',chart_result:'Resultado: {v}',chart_distance:'Distancia: {v} · ±{tol}',chart_performance:'Rendimiento: {v}%',chart_no_signal_reason:'No había señal (score < 5%)',chart_not_evaluated:'No contabilizado como evaluación'},
 fr:{results_input:'Saisie des résultats',latest_results:'Derniers résultats',recent_jumps:'Sauts récents',recent_directions:'Directions récentes',prediction_quality:'Qualité de prédiction',internal_calibration:'calibration interne',learning_diagnosis:'Diagnostic de l’apprentissage',walk_forward:'walk-forward',learning:'apprentissage',adaptive_weights:'Poids adaptatifs',active_patterns:'Modèles actifs',prediction_history:'Historique des prédictions',performance_tolerance:'Performance ± tolérance',performance_summary:'Résumé des performances',window:'Fenêtre',win_rate:'Taux de réussite',baseline:'Référence',edge:'Avantage',evaluated:'Évaluées',last_20:'20 dernières',realtime_prediction:'Prédiction en temps réel',ensemble_relative_score:'score relatif de l’ensemble',direction:'Direction',jump:'Saut prévu',zone:'Zone',direction_empty:'Direction : —',jump_empty:'Saut prévu : —',zone_prefix:'Zone',confidence:'Confiance',active_models:'Modèles actifs',quality:'Qualité',alternative_predictions:'Prédictions alternatives',top_3:'Top 3',spins:'spins',consensus:'Consensus',stability:'Stabilité',robust_edge:'Avantage robuste',sample:'Échantillon',recency:'Récence',no_data:'AUCUNE DONNÉE',night_mode:'Mode nuit',day_mode:'Mode jour',undo:'Annuler',clear_history:'Effacer l’historique',confirm_clear:'Effacer tout l’historique ?',waiting_data:'EN ATTENTE DE DONNÉES',no_signal:'AUCUN SIGNAL',need_spins:'Au moins 12 spins sont nécessaires',no_zone:'Aucune zone avec suffisamment de preuves',no_repeated:'Aucun modèle répété avec suffisamment de preuves.',no_predictions:'Pas encore assez de prédictions évaluées.',no_history:'Aucun résultat',no_sample:'Aucun échantillon',families:{sequence:'séquence',jump:'saut',joint:'joint',pair:'paire',transition:'transition'},strong_signal:'SIGNAL FORT',weak_signal:'SIGNAL FAIBLE',no_edge:'SANS AVANTAGE',direction_fmt:'Direction : {d} · CW {cw}% / CCW {ccw}%',jump_fmt:'Saut prévu : {j} positions',quality_summary:'La qualité combine consensus, stabilité, avantage robuste, taille d’échantillon et comportement récent. Ce n’est pas une probabilité de réussite garantie.',weight_summary:'Les poids sont calculés uniquement avec les résultats disponibles avant chaque évaluation. Les prédictions historiques ne sont pas recalculées lorsque de nouveaux spins sont ajoutés.',no_family_sample:'aucun échantillon',tests:'tests',matches:'correspondances',next:'suivants',support:'soutiens',loss:'PERDU',win:'GAGNÉ',pockets:'positions',strong_family:'SÉQUENCE',joint_family:'SAUT + DIRECTION',jump_family:'MODÈLE DE SAUTS',recently:'récent',historical:'historique',stability100:'stabilité/100',chart_baseline_label:'Référence {v} %',chart_no_signal:'Aucun signal',chart_edge_label:'Avantage {v} pp',chart_hit:'RÉUSSI',chart_miss:'ÉCHEC',chart_prediction:'Prédiction : {v}',chart_result:'Résultat : {v}',chart_distance:'Distance : {v} · ±{tol}',chart_performance:'Performance : {v} %',chart_no_signal_reason:'Aucun signal (score < 5 %)',chart_not_evaluated:'Non compté comme évaluation'},
 ar:{results_input:'إدخال النتائج',latest_results:'أحدث النتائج',recent_jumps:'القفزات الأخيرة',recent_directions:'الاتجاهات الأخيرة',prediction_quality:'جودة التنبؤ',internal_calibration:'معايرة داخلية',learning_diagnosis:'تشخيص التعلم',walk_forward:'اختبار متدرج',learning:'التعلم',adaptive_weights:'الأوزان التكيفية',active_patterns:'الأنماط النشطة',prediction_history:'سجل التنبؤات',performance_tolerance:'الأداء ± التسامح',performance_summary:'ملخص الأداء',window:'النافذة',win_rate:'نسبة النجاح',baseline:'خط الأساس',edge:'الأفضلية',evaluated:'تم تقييمها',last_20:'آخر 20',realtime_prediction:'التنبؤ في الوقت الحقيقي',ensemble_relative_score:'النتيجة النسبية للمجموعة',direction:'الاتجاه',jump:'القفزة المتوقعة',zone:'المنطقة',direction_empty:'الاتجاه: —',jump_empty:'القفزة المتوقعة: —',zone_prefix:'المنطقة',confidence:'الثقة',active_models:'النماذج النشطة',quality:'الجودة',alternative_predictions:'التنبؤات البديلة',top_3:'أفضل 3',consensus:'التوافق',stability:'الاستقرار',robust_edge:'الأفضلية القوية',sample:'العينة',recency:'الحداثة',no_data:'لا توجد بيانات',night_mode:'الوضع الليلي',day_mode:'الوضع النهاري',undo:'تراجع',clear_history:'مسح السجل',confirm_clear:'مسح كل السجل؟',waiting_data:'بانتظار البيانات',no_signal:'لا توجد إشارة',need_spins:'يلزم إدخال 12 نتيجة على الأقل',no_zone:'لا توجد منطقة بأدلة كافية',no_repeated:'لا يوجد نمط متكرر بأدلة كافية.',no_predictions:'لا توجد تنبؤات مقيمة كافية بعد.',no_history:'لا توجد نتائج',no_sample:'لا توجد عينة',families:{sequence:'تسلسل',jump:'قفزة',joint:'مشترك',pair:'زوج',transition:'انتقال'},strong_signal:'إشارة قوية',weak_signal:'إشارة ضعيفة',no_edge:'لا أفضلية',direction_fmt:'الاتجاه: {d} · CW {cw}% / CCW {ccw}%',jump_fmt:'القفزة المتوقعة: {j} مواضع',quality_summary:'تجمع الجودة بين التوافق والاستقرار والأفضلية القوية وحجم العينة والسلوك الحديث. لا تمثل احتمال نجاح مضمون.',weight_summary:'تُحسب الأوزان فقط من النتائج المتاحة قبل كل تقييم. لا يعاد حساب التنبؤات التاريخية عند إضافة نتائج جديدة.',no_family_sample:'لا توجد عينة',tests:'اختبارات',matches:'تطابقات',next:'التالية',support:'دعم',loss:'خسارة',win:'فوز',pockets:'مواضع',strong_family:'تسلسل',joint_family:'قفزة + اتجاه',jump_family:'نمط القفزات',recently:'حديث',historical:'تاريخي',stability100:'الاستقرار/100',chart_baseline_label:'الخط الأساسي {v}%',chart_no_signal:'لا توجد إشارة',chart_edge_label:'الميزة {v} نقطة مئوية',chart_hit:'إصابة',chart_miss:'خطأ',chart_prediction:'التوقع: {v}',chart_result:'النتيجة: {v}',chart_distance:'المسافة: {v} · ±{tol}',chart_performance:'الأداء: {v}%',chart_no_signal_reason:'لا توجد إشارة (النتيجة < 5%)',chart_not_evaluated:'لا تُحتسب كتقييم'},
 bn:{results_input:'ফলাফল ইনপুট',latest_results:'সাম্প্রতিক ফলাফল',recent_jumps:'সাম্প্রতিক জাম্প',recent_directions:'সাম্প্রতিক দিক',prediction_quality:'পূর্বাভাসের মান',internal_calibration:'অভ্যন্তরীণ ক্যালিব্রেশন',learning_diagnosis:'লার্নিং ডায়াগনস্টিক',walk_forward:'ওয়াক-ফরওয়ার্ড',learning:'শেখা',adaptive_weights:'অভিযোজিত ওজন',active_patterns:'সক্রিয় প্যাটার্ন',prediction_history:'পূর্বাভাস ইতিহাস',performance_tolerance:'± সহনশীলতা পারফরম্যান্স',performance_summary:'পারফরম্যান্স সারাংশ',window:'উইন্ডো',win_rate:'সাফল্যের হার',baseline:'বেসলাইন',edge:'এজ',evaluated:'মূল্যায়িত',last_20:'শেষ ২০',realtime_prediction:'রিয়েল-টাইম পূর্বাভাস',ensemble_relative_score:'এনসেম্বল আপেক্ষিক স্কোর',direction:'দিক',jump:'প্রত্যাশিত জাম্প',zone:'জোন',direction_empty:'দিক: —',jump_empty:'প্রত্যাশিত জাম্প: —',zone_prefix:'জোন',confidence:'আস্থা',active_models:'সক্রিয় মডেল',quality:'মান',alternative_predictions:'বিকল্প পূর্বাভাস',top_3:'শীর্ষ ৩',consensus:'ঐকমত্য',stability:'স্থিতিশীলতা',robust_edge:'শক্তিশালী এজ',sample:'নমুনা',recency:'সাম্প্রতিকতা',no_data:'কোনো ডেটা নেই',night_mode:'নাইট মোড',day_mode:'ডে মোড',undo:'পূর্বাবস্থা',clear_history:'ইতিহাস মুছুন',confirm_clear:'সব ইতিহাস মুছবেন?',waiting_data:'ডেটার অপেক্ষায়',no_signal:'কোনো সংকেত নেই',need_spins:'কমপক্ষে ১২টি স্পিন প্রয়োজন',no_zone:'পর্যাপ্ত প্রমাণসহ কোনো জোন নেই',no_repeated:'পর্যাপ্ত প্রমাণসহ কোনো পুনরাবৃত্ত প্যাটার্ন নেই।',no_predictions:'এখনও পর্যাপ্ত মূল্যায়িত পূর্বাভাস নেই।',no_history:'কোনো ফলাফল নেই',no_sample:'কোনো নমুনা নেই',families:{sequence:'সিকোয়েন্স',jump:'জাম্প',joint:'জয়েন্ট',pair:'পেয়ার',transition:'ট্রানজিশন'},strong_signal:'শক্তিশালী সংকেত',weak_signal:'দুর্বল সংকেত',no_edge:'কোনো এজ নেই',direction_fmt:'দিক: {d} · CW {cw}% / CCW {ccw}%',jump_fmt:'প্রত্যাশিত জাম্প: {j} পকেট',quality_summary:'মান ঐকমত্য, স্থিতিশীলতা, শক্তিশালী এজ, নমুনার আকার ও সাম্প্রতিক আচরণ একত্র করে। এটি সাফল্যের নিশ্চয়তা নয়।',weight_summary:'প্রতিটি মূল্যায়নের আগে উপলব্ধ ফলাফল থেকেই ওজন গণনা করা হয়। নতুন স্পিন যোগ হলে ঐতিহাসিক পূর্বাভাস পুনরায় গণনা করা হয় না।',no_family_sample:'কোনো নমুনা নেই',tests:'পরীক্ষা',matches:'মিল',next:'পরবর্তী',support:'সমর্থন',loss:'হার',win:'জয়',pockets:'পকেট',strong_family:'সিকোয়েন্স',joint_family:'জাম্প + দিক',jump_family:'জাম্প প্যাটার্ন',recently:'সাম্প্রতিক',historical:'ঐতিহাসিক',stability100:'স্থিতিশীলতা/100',chart_baseline_label:'বেসলাইন {v}%',chart_no_signal:'কোনো সংকেত নেই',chart_edge_label:'এজ {v} pp',chart_hit:'সফল',chart_miss:'ব্যর্থ',chart_prediction:'পূর্বাভাস: {v}',chart_result:'ফলাফল: {v}',chart_distance:'দূরত্ব: {v} · ±{tol}',chart_performance:'পারফরম্যান্স: {v}%',chart_no_signal_reason:'কোনো সংকেত নেই (স্কোর < 5%)',chart_not_evaluated:'মূল্যায়নে গণনা করা হয়নি'},
 pt:{results_input:'Entrada de resultados',latest_results:'Últimos resultados',recent_jumps:'Saltos recentes',recent_directions:'Direções recentes',prediction_quality:'Qualidade da previsão',internal_calibration:'calibração interna',learning_diagnosis:'Diagnóstico da aprendizagem',walk_forward:'walk-forward',learning:'aprendizagem',adaptive_weights:'Pesos adaptativos',active_patterns:'Padrões ativos',prediction_history:'Histórico de previsões',performance_tolerance:'Desempenho ± tolerância',performance_summary:'Resumo do desempenho',window:'Janela',win_rate:'Taxa de acerto',baseline:'Base',edge:'Vantagem',evaluated:'Avaliadas',last_20:'Últimas 20',realtime_prediction:'Previsão em tempo real',ensemble_relative_score:'pontuação relativa do ensemble',direction:'Direção',jump:'Salto previsto',zone:'Zona',direction_empty:'Direção: —',jump_empty:'Salto previsto: —',zone_prefix:'Zona',confidence:'Confiança',active_models:'Modelos ativos',quality:'Qualidade',alternative_predictions:'Previsões alternativas',top_3:'Top 3',spins:'spins',consensus:'Consenso',stability:'Estabilidade',robust_edge:'Vantagem robusta',sample:'Amostra',recency:'Recência',no_data:'SEM DADOS',night_mode:'Modo noturno',day_mode:'Modo diurno',undo:'Desfazer',clear_history:'Apagar histórico',confirm_clear:'Apagar todo o histórico?',waiting_data:'AGUARDANDO DADOS',no_signal:'SEM SINAL',need_spins:'São necessários pelo menos 12 spins',no_zone:'Não há zona com evidência suficiente',no_repeated:'Não há padrão repetido suficiente.',no_predictions:'Ainda não há previsões avaliadas suficientes.',no_history:'Sem resultados',no_sample:'Sem amostra',families:{sequence:'sequência',jump:'salto',joint:'joint',pair:'par',transition:'transição'},strong_signal:'SINAL FORTE',weak_signal:'SINAL FRACO',no_edge:'SEM VANTAGEM',direction_fmt:'Direção: {d} · CW {cw}% / CCW {ccw}%',jump_fmt:'Salto previsto: {j} pockets',quality_summary:'A qualidade combina consenso, estabilidade, vantagem robusta, tamanho da amostra e comportamento recente. Não equivale a uma probabilidade garantida de acerto.',weight_summary:'Os pesos são calculados apenas com resultados disponíveis antes de cada avaliação. As previsões históricas não são recalculadas ao adicionar spins.',no_family_sample:'sem amostra',tests:'testes',matches:'coincidências',next:'seguintes',support:'apoios',loss:'PERDEU',win:'ACERTO',pockets:'pockets',strong_family:'SEQUÊNCIA',joint_family:'SALTO + DIREÇÃO',jump_family:'PADRÃO DE SALTOS',recently:'recente',historical:'histórico',stability100:'/100 estabilidade'}
};
const HELP_TITLE={en:'What does this mean?',zh:'这是什么意思？',hi:'इसका क्या मतलब है?',es:'¿Qué significa?',fr:'Que signifie ceci ?',ar:'ماذا يعني هذا؟',bn:'এর মানে কী?',pt:'O que significa?'};
const HELP={
en:{results_input:'Enter each roulette result by tapping its number. The order matters because the models learn from the sequence.',realtime_prediction:'The main prediction combines the active models. The score is relative inside the model, not a guaranteed chance of winning. Direction shows the preferred wheel direction, jump is the expected pocket movement, and the zone shows the numbers within the selected ± tolerance.',alternative_predictions:'These are the next three candidates after the main prediction. Higher percentage means a higher relative score inside the current ensemble.',latest_results:'This is the recent result history. The ± tolerance controls how many wheel pockets around a predicted number count as a hit when performance is evaluated.',recent_jumps:'Shows the recent movement in wheel pockets between consecutive results. Positive and negative values represent opposite directions.',recent_directions:'Shows the recent wheel direction inferred from consecutive results: CW, CCW or SAME.',prediction_quality:'This is an internal quality score from 0 to 100. It combines consensus, stability, robust edge, sample size and recent behavior. It is not a guaranteed probability of success.',learning_diagnosis:'Shows how the model has performed in walk-forward evaluations: robust edge, agreement between models, stability and number of evaluated predictions.',adaptive_weights:'Each model receives a weight based on its demonstrated performance. Higher weight means its current evidence has more influence on the ensemble. Small samples are treated cautiously.',active_patterns:'Shows repeated patterns currently found in the historical data. They are evidence available to the model, not guaranteed future outcomes.',prediction_history:'Shows previous predictions and the actual result that followed. A hit is counted using the selected ± tolerance.',performance_tolerance:'Shows historical hit rate compared with the theoretical baseline for the selected ± tolerance. The window controls how many evaluated predictions are shown in the chart.',chart_baseline_label:'Referência {v}%',chart_no_signal:'Sem sinal',chart_edge_label:'Vantagem {v} pp',chart_hit:'ACERTO',chart_miss:'ERRO',chart_prediction:'Previsão: {v}',chart_result:'Resultado: {v}',chart_distance:'Distância: {v} · ±{tol}',chart_performance:'Desempenho: {v}%',chart_no_signal_reason:'Sem sinal (pontuação < 5%)',chart_not_evaluated:'Não contabilizado como avaliação'},
zh:{results_input:'点击轮盘数字输入每个结果。顺序很重要，因为模型会根据结果序列学习。',realtime_prediction:'主预测由当前活跃模型共同计算。分数是模型内部的相对分数，不是保证获胜的概率。方向表示偏好的轮盘方向，跳跃表示预计移动的位置，区域表示所选 ± 容差范围内的数字。',alternative_predictions:'这是主预测之后的三个候选。百分比越高，表示该候选在当前集成模型中的相对分数越高。',latest_results:'这里显示最近的结果记录。± 容差决定评估表现时，预测数字周围多少个轮盘位置算作命中。',recent_jumps:'显示连续结果之间最近的轮盘位置移动。正负值表示相反方向。',recent_directions:'显示根据连续结果推断出的轮盘方向：CW、CCW 或 SAME。',prediction_quality:'这是 0 到 100 的内部质量分数，综合共识、稳定性、稳健优势、样本量和近期表现。它不是保证成功的概率。',learning_diagnosis:'显示滚动验证中的模型表现：稳健优势、模型一致性、稳定性以及已评估预测数量。',adaptive_weights:'每个模型都会根据已证明的表现获得权重。权重越高，该模型当前证据对集成结果的影响越大。样本较少时会更加谨慎。',active_patterns:'显示历史数据中当前发现的重复模式。这些是模型可用的证据，不代表未来一定发生。',prediction_history:'显示过去的预测以及随后出现的实际结果。命中根据所选 ± 容差计算。',performance_tolerance:'显示在所选 ± 容差下的历史命中率，并与理论基线比较。窗口决定图表显示多少次已评估预测。'},
hi:{results_input:'हर रूलेट परिणाम दर्ज करने के लिए उसके नंबर पर टैप करें। क्रम महत्वपूर्ण है क्योंकि मॉडल परिणामों के क्रम से सीखते हैं।',realtime_prediction:'मुख्य पूर्वानुमान सक्रिय मॉडलों को मिलाकर बनता है। स्कोर मॉडल के भीतर सापेक्ष है, जीत की गारंटी नहीं। दिशा पसंदीदा व्हील दिशा, जंप अपेक्षित पॉकेट गति और ज़ोन चुनी गई ± सहनशीलता के भीतर नंबर दिखाता है।',alternative_predictions:'मुख्य पूर्वानुमान के बाद ये तीन उम्मीदवार हैं। अधिक प्रतिशत का अर्थ वर्तमान एन्सेम्बल में अधिक सापेक्ष स्कोर है।',latest_results:'यह हाल के परिणाम दिखाता है। ± सहनशीलता तय करती है कि प्रदर्शन मापते समय अनुमानित नंबर के आसपास कितने पॉकेट को हिट माना जाए।',recent_jumps:'लगातार परिणामों के बीच हाल की व्हील-पॉकेट गति दिखाता है। धनात्मक और ऋणात्मक मान विपरीत दिशाएँ बताते हैं।',recent_directions:'लगातार परिणामों से अनुमानित दिशा दिखाता है: CW, CCW या SAME।',prediction_quality:'यह 0 से 100 का आंतरिक गुणवत्ता स्कोर है। इसमें सहमति, स्थिरता, मजबूत एज, नमूना आकार और हालिया व्यवहार शामिल हैं। यह सफलता की गारंटी वाली संभावना नहीं है।',learning_diagnosis:'वॉक-फॉरवर्ड मूल्यांकन में मॉडल के प्रदर्शन को दिखाता है: मजबूत एज, मॉडल सहमति, स्थिरता और मूल्यांकित पूर्वानुमानों की संख्या।',adaptive_weights:'हर मॉडल को उसके सिद्ध प्रदर्शन के आधार पर वजन मिलता है। अधिक वजन का मतलब है कि वर्तमान एन्सेम्बल में उसका प्रमाण अधिक प्रभाव डालता है। छोटे नमूनों को सावधानी से लिया जाता है।',active_patterns:'ऐतिहासिक डेटा में वर्तमान में पाए गए दोहराए गए पैटर्न दिखाता है। ये मॉडल के लिए प्रमाण हैं, भविष्य की गारंटी नहीं।',prediction_history:'पिछले पूर्वानुमानों और उनके बाद आए वास्तविक परिणामों को दिखाता है। हिट चुनी गई ± सहनशीलता से तय होता है।',performance_tolerance:'चुनी गई ± सहनशीलता के साथ ऐतिहासिक हिट दर को सैद्धांतिक बेसलाइन से तुलना करता है। विंडो चार्ट में दिखाए जाने वाले मूल्यांकित पूर्वानुमानों की संख्या तय करती है।'},
es:{results_input:'Pulsa cada número para introducir el resultado de la ruleta. El orden importa porque los modelos aprenden de la secuencia.',realtime_prediction:'La predicción principal combina los modelos activos. El score es relativo dentro del modelo, no una probabilidad garantizada de acierto. Dirección indica el sentido preferido de la rueda, salto el movimiento esperado y zona los números dentro de la tolerancia ± seleccionada.',alternative_predictions:'Son los tres candidatos siguientes a la predicción principal. Un porcentaje mayor significa un score relativo mayor dentro del ensemble actual.',latest_results:'Muestra el historial reciente. La tolerancia ± determina cuántos pockets alrededor del número predicho cuentan como acierto al evaluar el rendimiento.',recent_jumps:'Muestra el movimiento reciente en pockets entre resultados consecutivos. Los valores positivos y negativos representan sentidos opuestos.',recent_directions:'Muestra la dirección de la rueda inferida entre resultados consecutivos: CW, CCW o SAME.',prediction_quality:'Es una puntuación interna de calidad de 0 a 100. Combina consenso, estabilidad, edge robusto, tamaño de muestra y comportamiento reciente. No es una probabilidad garantizada de acierto.',learning_diagnosis:'Muestra cómo ha rendido el modelo en evaluaciones walk-forward: edge robusto, acuerdo entre modelos, estabilidad y número de predicciones evaluadas.',adaptive_weights:'Cada modelo recibe un peso según su rendimiento demostrado. Un peso mayor significa que su evidencia actual influye más en el ensemble. Las muestras pequeñas se tratan con cautela.',active_patterns:'Muestra los patrones repetidos que se encuentran actualmente en el histórico. Son evidencia disponible para el modelo, no resultados futuros garantizados.',prediction_history:'Muestra las predicciones anteriores y el resultado real que apareció después. Un acierto se cuenta usando la tolerancia ± seleccionada.',performance_tolerance:'Compara el porcentaje histórico de aciertos con la línea base teórica para la tolerancia ± seleccionada. La ventana indica cuántas predicciones evaluadas aparecen en el gráfico.'},
fr:{results_input:'Touchez chaque numéro pour saisir le résultat de la roulette. L’ordre compte car les modèles apprennent la séquence.',realtime_prediction:'La prédiction principale combine les modèles actifs. Le score est relatif au modèle, ce n’est pas une probabilité garantie de réussite. La direction indique le sens privilégié, le saut le déplacement attendu et la zone les numéros dans la tolérance ± sélectionnée.',alternative_predictions:'Ce sont les trois candidats suivants après la prédiction principale. Un pourcentage plus élevé signifie un score relatif plus élevé dans l’ensemble actuel.',latest_results:'Affiche l’historique récent. La tolérance ± détermine combien de positions autour du numéro prédit comptent comme réussite lors de l’évaluation.',recent_jumps:'Affiche les déplacements récents en positions entre deux résultats consécutifs. Les valeurs positives et négatives représentent des sens opposés.',recent_directions:'Affiche la direction déduite entre deux résultats consécutifs : CW, CCW ou SAME.',prediction_quality:'Score interne de qualité de 0 à 100. Il combine consensus, stabilité, avantage robuste, taille de l’échantillon et comportement récent. Ce n’est pas une probabilité garantie de réussite.',learning_diagnosis:'Montre les performances du modèle lors des évaluations walk-forward : avantage robuste, accord entre modèles, stabilité et nombre de prédictions évaluées.',adaptive_weights:'Chaque modèle reçoit un poids selon ses performances observées. Un poids plus élevé signifie que ses preuves actuelles influencent davantage l’ensemble. Les petits échantillons sont traités avec prudence.',active_patterns:'Affiche les motifs répétés actuellement trouvés dans l’historique. Ils constituent des preuves pour le modèle, pas des résultats futurs garantis.',prediction_history:'Affiche les prédictions précédentes et le résultat réel qui a suivi. Une réussite est comptée selon la tolérance ± sélectionnée.',performance_tolerance:'Compare le taux de réussite historique à la référence théorique pour la tolérance ± sélectionnée. La fenêtre indique combien de prédictions évaluées apparaissent dans le graphique.'},
ar:{results_input:'اضغط على كل رقم لإدخال نتيجة الروليت. الترتيب مهم لأن النماذج تتعلم من تسلسل النتائج.',realtime_prediction:'التنبؤ الرئيسي يجمع النماذج النشطة. النتيجة نسبية داخل النموذج وليست احتمالًا مضمونًا للفوز. الاتجاه يوضح اتجاه العجلة المفضل، والقفزة الحركة المتوقعة، والمنطقة الأرقام ضمن هامش ± المحدد.',alternative_predictions:'هذه هي أفضل ثلاثة مرشحين بعد التنبؤ الرئيسي. النسبة الأعلى تعني نتيجة نسبية أعلى داخل المجموعة الحالية.',latest_results:'يعرض النتائج الأخيرة. يحدد هامش ± عدد المواضع حول الرقم المتوقع التي تُحسب كإصابة عند تقييم الأداء.',recent_jumps:'يعرض الحركة الأخيرة بعدد مواضع العجلة بين النتائج المتتالية. القيم الموجبة والسالبة تمثل اتجاهين متعاكسين.',recent_directions:'يعرض اتجاه العجلة المستنتج من النتائج المتتالية: CW أو CCW أو SAME.',prediction_quality:'درجة جودة داخلية من 0 إلى 100. تجمع التوافق والاستقرار والأفضلية القوية وحجم العينة والسلوك الحديث. لا تمثل احتمال نجاح مضمون.',learning_diagnosis:'يعرض أداء النموذج في تقييمات الاختبار المتدرج: الأفضلية القوية وتوافق النماذج والاستقرار وعدد التنبؤات المقيمة.',adaptive_weights:'يحصل كل نموذج على وزن حسب أدائه المثبت. الوزن الأعلى يعني تأثيرًا أكبر لأدلته الحالية في المجموعة. يتم التعامل مع العينات الصغيرة بحذر.',active_patterns:'يعرض الأنماط المتكررة الموجودة حاليًا في البيانات التاريخية. هي أدلة للنموذج وليست نتائج مستقبلية مضمونة.',prediction_history:'يعرض التنبؤات السابقة والنتيجة الفعلية التي تلتها. تُحسب الإصابة وفق هامش ± المحدد.',performance_tolerance:'يقارن معدل الإصابة التاريخي بخط الأساس النظري لهامش ± المحدد. تحدد النافذة عدد التنبؤات المقيمة الظاهرة في الرسم.'},
bn:{results_input:'রুলেটের প্রতিটি ফলাফল দিতে তার নম্বরে ট্যাপ করুন। ক্রম গুরুত্বপূর্ণ, কারণ মডেল ফলাফলের ধারাবাহিকতা থেকে শেখে।',realtime_prediction:'মূল পূর্বাভাস সক্রিয় মডেলগুলোকে একত্র করে। স্কোরটি মডেলের ভেতরের আপেক্ষিক স্কোর, নিশ্চিত জয়ের সম্ভাবনা নয়। দিক পছন্দের চাকার দিক, জাম্প প্রত্যাশিত পকেট সরণ এবং জোন নির্বাচিত ± সহনশীলতার মধ্যে সংখ্যাগুলো দেখায়।',alternative_predictions:'মূল পূর্বাভাসের পরের তিনটি প্রার্থী। শতাংশ বেশি মানে বর্তমান এনসেম্বলে আপেক্ষিক স্কোর বেশি।',latest_results:'সাম্প্রতিক ফলাফল দেখায়। ± সহনশীলতা নির্ধারণ করে পূর্বাভাসিত সংখ্যার চারপাশে কত পকেটকে পারফরম্যান্স মূল্যায়নে হিট ধরা হবে।',recent_jumps:'পরপর ফলাফলের মধ্যে সাম্প্রতিক পকেট চলাচল দেখায়। ধনাত্মক ও ঋণাত্মক মান বিপরীত দিক বোঝায়।',recent_directions:'পরপর ফলাফল থেকে অনুমান করা চাকার দিক দেখায়: CW, CCW বা SAME।',prediction_quality:'০ থেকে ১০০-এর অভ্যন্তরীণ মান স্কোর। এতে ঐকমত্য, স্থিতিশীলতা, শক্তিশালী এজ, নমুনার আকার ও সাম্প্রতিক আচরণ রয়েছে। এটি নিশ্চিত সাফল্যের সম্ভাবনা নয়।',learning_diagnosis:'ওয়াক-ফরওয়ার্ড মূল্যায়নে মডেলের পারফরম্যান্স দেখায়: শক্তিশালী এজ, মডেল ঐকমত্য, স্থিতিশীলতা এবং মূল্যায়িত পূর্বাভাসের সংখ্যা।',adaptive_weights:'প্রতিটি মডেল তার প্রমাণিত পারফরম্যান্স অনুযায়ী ওজন পায়। ওজন বেশি হলে বর্তমান এনসেম্বলে তার প্রমাণের প্রভাব বেশি। ছোট নমুনা সতর্কভাবে বিবেচনা করা হয়।',active_patterns:'ঐতিহাসিক ডেটায় বর্তমানে পাওয়া পুনরাবৃত্ত প্যাটার্ন দেখায়। এগুলো মডেলের প্রমাণ, ভবিষ্যতের নিশ্চিত ফল নয়।',prediction_history:'আগের পূর্বাভাস ও তার পরের বাস্তব ফলাফল দেখায়। নির্বাচিত ± সহনশীলতা অনুযায়ী হিট গণনা হয়।',performance_tolerance:'নির্বাচিত ± সহনশীলতার ঐতিহাসিক হিট রেটকে তাত্ত্বিক বেসলাইনের সঙ্গে তুলনা করে। উইন্ডো চার্টে কত মূল্যায়িত পূর্বাভাস দেখাবে তা নির্ধারণ করে।'},
pt:{results_input:'Toque em cada número para inserir o resultado da roleta. A ordem importa porque os modelos aprendem com a sequência.',realtime_prediction:'A previsão principal combina os modelos ativos. A pontuação é relativa dentro do modelo, não uma probabilidade garantida de acerto. Direção mostra o sentido preferido da roda, salto mostra o movimento esperado e zona mostra os números dentro da tolerância ± selecionada.',alternative_predictions:'São os três candidatos seguintes à previsão principal. Uma percentagem maior significa uma pontuação relativa maior no ensemble atual.',latest_results:'Mostra o histórico recente. A tolerância ± define quantas posições ao redor do número previsto contam como acerto na avaliação do desempenho.',recent_jumps:'Mostra o movimento recente em posições entre resultados consecutivos. Valores positivos e negativos representam sentidos opostos.',recent_directions:'Mostra a direção da roda inferida entre resultados consecutivos: CW, CCW ou SAME.',prediction_quality:'É uma pontuação interna de qualidade de 0 a 100. Combina consenso, estabilidade, vantagem robusta, tamanho da amostra e comportamento recente. Não é uma probabilidade garantida de acerto.',learning_diagnosis:'Mostra o desempenho do modelo nas avaliações walk-forward: vantagem robusta, concordância entre modelos, estabilidade e número de previsões avaliadas.',adaptive_weights:'Cada modelo recebe um peso com base no seu desempenho demonstrado. Um peso maior significa que a sua evidência atual influencia mais o ensemble. Amostras pequenas são tratadas com cautela.',active_patterns:'Mostra os padrões repetidos encontrados atualmente no histórico. São evidências disponíveis para o modelo, não resultados futuros garantidos.',prediction_history:'Mostra previsões anteriores e o resultado real que veio depois. Um acerto é contado usando a tolerância ± selecionada.',performance_tolerance:'Compara a taxa histórica de acerto com a linha de base teórica para a tolerância ± selecionada. A janela define quantas previsões avaliadas aparecem no gráfico.'}
};
function detectLanguage(){const saved=localStorage.getItem(LANG_KEY);if(LANGS.includes(saved))return saved;const n=(navigator.language||'en').toLowerCase();if(n.startsWith('zh'))return'zh';if(n.startsWith('hi'))return'hi';if(n.startsWith('es'))return'es';if(n.startsWith('fr'))return'fr';if(n.startsWith('ar'))return'ar';if(n.startsWith('bn'))return'bn';if(n.startsWith('pt'))return'pt';return'en'}
let LANG=detectLanguage();
function t(k){const parts=k.split('.');let v=I18N[LANG];for(const p of parts)v=v?.[p];return v??I18N.en[k]??k}
function tf(k,vars={}){return t(k).replace(/\{(\w+)\}/g,(_,x)=>vars[x]??'')}
function applyLanguage(){document.documentElement.lang=LANG;document.documentElement.dir=LANG==='ar'?'rtl':'ltr';document.title='RouletteX';document.querySelectorAll('[data-i18n]').forEach(e=>e.textContent=t(e.dataset.i18n));document.querySelectorAll('.helpBtn').forEach(e=>e.setAttribute('aria-label',HELP_TITLE[LANG]||HELP_TITLE.en));const sel=$('language');if(sel)sel.value=LANG;const n=document.body.classList.contains('night');$('theme').textContent=t(n?'day_mode':'night_mode');render();}

const CACHE_LIMIT=80;
const $=id=>document.getElementById(id);
const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
const wheel=[0,32,15,19,4,21,2,25,17,34,6,27,13,36,11,30,8,23,10,5,24,16,33,1,20,14,31,9,22,18,29,7,28,12,35,3,26];
const pos=new Map(wheel.map((n,i)=>[n,i]));
const red=new Set([1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36]);
const cache={candidates:new Map(),familyTarget:new Map(),familyBacktest:new Map(),meta:new Map(),model:new Map(),trans:new Map()};
const emptyPerf=()=>({n:0,hit:0,exact:0,edge:0,recentEdge:0,robustEdge:0,stability:0,stability20:0,windowEdge:0});
let S=loadState();
function fresh(){return {version:VERSION,spins:[],predictions:[],settings:{tol:3,chartWindow:50}}}
function normalize(x){
  const s=fresh();
  if(!x||typeof x!=='object')return s;
  s.spins=Array.isArray(x.spins)?x.spins.map((v,i)=>({id:Number(v.id)||i+1,result:Number(v.result),createdAt:v.createdAt||new Date().toISOString()})).filter(v=>Number.isInteger(v.result)&&v.result>=0&&v.result<=36):[];
  s.settings={tol:clamp(Number(x.settings?.tol)||3,1,9),chartWindow:[15,25,50,100].includes(Number(x.settings?.chartWindow))?Number(x.settings.chartWindow):50};
  s.predictions=x.version===VERSION&&Array.isArray(x.predictions)?x.predictions:[];
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
function candidates(h,f,minOcc=1){
  const key=hashHistory(h,0)+'|'+f+'|'+minOcc;
  if(cache.candidates.has(key))return cache.candidates.get(key);
  if(h.length<12){cache.candidates.set(key,[]);return []}
  const out=[];
  const addGroup=(sig,len,next,lastIndex)=>{if(next.length>=minOcc)out.push({type:f,len,key:sig,occ:next.length,next,lastIndex})};
  const suffixCandidates=(arr,minLen,maxLen,mapper)=>{
    const limit=Math.min(maxLen,arr.length-1);
    for(let l=minLen;l<=limit;l++){
      const sig=mapper(arr.slice(-l)),groups=new Map();
      for(let i=0;i+l<arr.length;i++){
        const k=mapper(arr.slice(i,i+l));
        let g=groups.get(k);if(!g){g=[];groups.set(k,g)}
        g.push({value:arr[i+l],index:i+l});
      }
      const g=groups.get(sig)||[];
      addGroup(sig,l,g.map(x=>x.value),g.length?g.at(-1).index:-1);
    }
  };
  if(f==='sequence')suffixCandidates(h,2,8,a=>a.join(','));
  else if(f==='jump')suffixCandidates(getTrans(h).map(x=>x.j),2,6,a=>a.join(','));
  else if(f==='joint')suffixCandidates(getTrans(h).map(x=>x.j+':'+x.d),2,6,a=>a.join('|'));
  else if(f==='pair'){
    const sig=h.slice(-2).join(','),next=[];
    for(let i=0;i+2<h.length;i++)if(h[i]===h.at(-2)&&h[i+1]===h.at(-1))next.push({value:h[i+2],index:i+2});
    addGroup(sig,2,next.map(x=>x.value),next.length?next.at(-1).index:-1);
  }else{
    const last=h.at(-1),sig=String(last),next=[];
    for(let i=0;i<h.length-1;i++)if(h[i]===last)next.push({value:h[i+1],index:i+1});
    addGroup(sig,1,next.map(x=>x.value),next.length?next.at(-1).index:-1);
  }
  const r=out.sort((a,b)=>b.len-a.len||b.occ-a.occ||b.lastIndex-a.lastIndex);
  cache.candidates.set(key,r);return r;
}

function jumpDestination(from,j){return wheel[(idx(from)+j+37*4)%37]}
function kernelDistribution(target, sigma=2.2){
  const out=Array(37).fill(0);
  if(target==null)return out;
  for(let n=0;n<37;n++){
    const d=dist(target,n);
    out[n]=Math.exp(-(d*d)/(2*sigma*sigma));
  }
  const total=out.reduce((a,b)=>a+b,0)||1;
  return out.map(v=>v/total);
}
function addKernel(scores,target,weight,sigma=2.2){
  if(target==null||!Number.isFinite(weight)||weight<=0)return;
  const k=kernelDistribution(target,sigma);
  for(let n=0;n<37;n++)scores[n]+=weight*k[n];
}
function familyDistribution(h,f){
  const key=hashHistory(h,0)+'|familydist|'+f;
  if(cache.familyDistribution?.has(key))return cache.familyDistribution.get(key);
  const scores=Array(37).fill(0),last=h.at(-1),N=h.length;
  if(h.length<12||last==null){cache.familyDistribution??=new Map();cache.familyDistribution.set(key,scores);return scores}
  const evidence=candidates(h,f,1);
  evidence.slice(0,8).forEach(q=>{
    const lenBoost=q.len>=6?1.30:q.len>=4?1.16:q.len>=3?1.08:1;
    const occBoost=Math.min(1.5,Math.sqrt(q.occ));
    const recency=q.lastIndex>=0?0.70+0.50*(q.lastIndex/Math.max(1,N-1)):0.70;
    // A historical match is evidence, not a command to repeat its exact successor.
    // Its destination is spread over nearby wheel pockets, with tighter kernels for
    // longer/repeated patterns. This prevents one old transition from dominating.
    const sigma=f==='jump'||f==='joint' ? (q.len>=5?1.65:2.25) : (q.len>=6?2.0:2.7);
    const localW=lenBoost*occBoost*recency;
    const counts=new Map();
    q.next.forEach(raw=>{
      const n=f==='jump'||f==='joint'?jumpDestination(last,raw):raw;
      counts.set(n,(counts.get(n)||0)+1);
    });
    const total=q.next.length||1;
    counts.forEach((count,n)=>addKernel(scores,n,localW*(count/total),sigma));
  });
  // Add a recency-aware structural jump component for every family. This captures
  // current wheel movement even when an exact sequence has never repeated.
  const tr=getTrans(h), recent=tr.slice(-Math.min(18,tr.length));
  if(recent.length){
    const jumpScores=Array(37).fill(0);
    recent.forEach((x,k)=>{
      const rec=0.65+0.35*((k+1)/recent.length);
      addKernel(jumpScores,jumpDestination(last,x.j),rec,2.6);
    });
    const jt=jumpScores.reduce((a,b)=>a+b,0)||1;
    for(let n=0;n<37;n++)scores[n]+=0.22*(jumpScores[n]/jt);
  }
  const total=scores.reduce((x,y)=>x+y,0);
  const result=total?scores.map(x=>x/total):Array(37).fill(0);
  cache.familyDistribution??=new Map();cache.familyDistribution.set(key,result);
  if(cache.familyDistribution.size>CACHE_LIMIT)cache.familyDistribution.delete(cache.familyDistribution.keys().next().value);
  return result;
}
function directionDistribution(h){
  const out=Array(37).fill(0),last=h.at(-1);if(last==null)return out;
  let cw=0,ccw=0,same=0;
  for(let i=0;i<h.length-1;i++)if(h[i]===last){const d=dir(h[i],h[i+1]);if(d==='CW')cw++;else if(d==='CCW')ccw++;else same++;}
  const tr=getTrans(h).slice(-Math.min(24,h.length-1));
  tr.forEach(x=>{if(x.d==='CW')cw+=0.35;else if(x.d==='CCW')ccw+=0.35;else same+=0.10});
  const total=cw+ccw+same;if(!total)return out;
  const pcw=(cw+1)/(total+3),pccw=(ccw+1)/(total+3),psame=(same+0.5)/(total+3);
  for(let n=0;n<37;n++){
    const j=jmp(last,n);out[n]=j===0?psame/37:(j>0?pcw/18.0:pccw/18.0);
  }
  const z=out.reduce((a,b)=>a+b,0)||1;return out.map(v=>v/z);
}
function directionPatternDistribution(h){
  const scores=Array(37).fill(0),tr=getTrans(h),dirs=tr.map(x=>x.d),last=h.at(-1);
  if(dirs.length<2||last==null)return scores;
  const limit=Math.min(6,dirs.length-1);
  for(let l=2;l<=limit;l++){
    const sig=dirs.slice(-l).join('|');
    const groups=[];
    for(let i=0;i+l<dirs.length;i++)if(dirs.slice(i,i+l).join('|')===sig)groups.push({d:dirs[i+l],index:i+l});
    groups.forEach((g,k)=>{
      const j=tr[g.index]?.j;if(j==null)return;
      const target=jumpDestination(last,j),rec=0.70+0.30*((g.index+1)/dirs.length);
      addKernel(scores,target,rec/(1+k*0.08),2.4);
    });
  }
  const z=scores.reduce((a,b)=>a+b,0)||1;return scores.map(v=>v/z);
}
function directionContext(h){
  const d=directionDistribution(h),p=directionPatternDistribution(h),mean=d.reduce((a,b)=>a+b,0)/37||1;
  const out=d.map((v,n)=>0.65*(v/mean)+0.35*(p[n]*37));
  const m=out.reduce((a,b)=>a+b,0)/37||1;return out.map(v=>v/m);
}
function familyTarget(h,f){
  const key=hashHistory(h,0)+'|'+f;
  if(cache.familyTarget.has(key))return cache.familyTarget.get(key);
  const d=familyDistribution(h,f);let best=0;
  for(let n=1;n<37;n++)if(d[n]>d[best])best=n;
  const result=d.some(x=>x>0)?best:null;cache.familyTarget.set(key,result);return result;
}

function walkForwardRows(h,f,tol,start=Math.max(12,h.length-160),end=h.length){
  const key=hashHistory(h,tol)+'|wf|'+f+'|'+start+'|'+end;if(cache.walkForward?.has(key))return cache.walkForward.get(key);
  const rows=[];const s=Math.max(12,start),e=Math.min(end,h.length);
  for(let i=s;i<e;i++){const prior=h.slice(0,i),t=familyTarget(prior,f);if(t!=null)rows.push({i,target:t,hit:dist(t,h[i])<=tol,exact:dist(t,h[i])===0});}
  cache.walkForward??=new Map();cache.walkForward.set(key,rows);return rows;
}
function perfFromRows(rows,tol){
  if(!rows.length)return emptyPerf();
  const n=rows.length,hit=rows.filter(x=>x.hit).length,exact=rows.filter(x=>x.exact).length,recent=rows.slice(-Math.min(20,n)),rh=recent.filter(x=>x.hit).length;
  const edge=hit/n-baseline(tol),recentEdge=rh/recent.length-baseline(tol),robust=robustEdgeWilson(hit,n,tol),mid=Math.max(10,Math.floor(n/2)),a=rows.slice(0,mid),b=rows.slice(mid),ra=a.length?a.filter(x=>x.hit).length/a.length:0,rb=b.length?b.filter(x=>x.hit).length/b.length:0;
  const stability20=clamp(1-Math.abs(edge-recentEdge)/Math.max(0.05,Math.abs(edge)+0.02),0,1),stabilityHalf=clamp(1-Math.abs(ra-rb)/Math.max(0.10,Math.abs(ra)+Math.abs(rb)+0.10),0,1);
  return {n,hit,exact,edge,recentEdge,robustEdge:robust,stability:0.55*stability20+0.45*stabilityHalf,stability20,windowEdge:edge};
}
function familyBacktest(h,f,tol){
  const key=hashHistory(h,tol)+'|'+f;if(cache.familyBacktest.has(key))return cache.familyBacktest.get(key);
  if(h.length<14){const z=emptyPerf();cache.familyBacktest.set(key,z);return z}
  const rows=walkForwardRows(h,f,tol,Math.max(12,h.length-160),h.length),result=perfFromRows(rows,tol);cache.familyBacktest.set(key,result);return result;
}
function metaBacktest(h,tol){
  const key=hashHistory(h,tol)+'|meta';if(cache.meta.has(key))return cache.meta.get(key);const combos={};
  const start=Math.max(14,h.length-140);
  for(let i=start;i<h.length;i++){
    const hh=h.slice(0,i),targets={};FAMILIES.forEach(f=>targets[f]=familyTarget(hh,f));const active=FAMILIES.filter(f=>targets[f]!=null);
    for(let a=0;a<active.length;a++)for(let b=a+1;b<active.length;b++){const fa=active[a],fb=active[b];if(targets[fa]!==targets[fb])continue;const k=fa+'+'+fb;(combos[k]??={n:0,hit:0}).n++;if(dist(targets[fa],h[i])<=tol)combos[k].hit++;}
  }
  const out={};Object.entries(combos).forEach(([k,v])=>out[k]={...v,edge:v.hit/v.n-baseline(tol),robustEdge:robustEdgeWilson(v.hit,v.n,tol)});cache.meta.set(key,out);return out;
}
function adaptive(h,tol){
  const perf={},weights={};FAMILIES.forEach(f=>perf[f]=familyBacktest(h,f,tol));
  const rawWeight=p=>{if(!p||!p.n)return 0.55;const sample=clamp(Math.sqrt(p.n/(p.n+12)),0,1),quality=p.robustEdge*0.55+p.recentEdge*0.20+p.edge*0.15+(p.stability-0.5)*0.10,score=quality*sample,delta=clamp(score*7,-0.18,0.85);return clamp(0.55+delta,0.55,1.40)};
  const alpha=0.22;
  FAMILIES.forEach(f=>{
    let w=0.55,seen=false;
    const rows=walkForwardRows(h,f,tol,12,h.length);
    for(let k=0;k<rows.length;k++){
      const windowRows=rows.slice(Math.max(0,k-159),k+1),n=windowRows.length,hit=windowRows.filter(x=>x.hit).length,exact=windowRows.filter(x=>x.exact).length,recentN=Math.min(20,n),recentRows=windowRows.slice(-recentN),recentHit=recentRows.filter(x=>x.hit).length,mid=Math.max(10,Math.floor(n/2)),first=windowRows.slice(0,mid),second=windowRows.slice(mid),firstHit=first.filter(x=>x.hit).length,secondHit=second.filter(x=>x.hit).length;
      const edge=hit/n-baseline(tol),recentEdge=recentHit/recentN-baseline(tol),robust=robustEdgeWilson(hit,n,tol),ra=firstHit/mid,rb=second.length?secondHit/second.length:0;
      const stability20=clamp(1-Math.abs(edge-recentEdge)/Math.max(0.05,Math.abs(edge)+0.02),0,1),stabilityHalf=clamp(1-Math.abs(ra-rb)/Math.max(0.10,Math.abs(ra)+Math.abs(rb)+0.10),0,1);
      const p={n,hit,exact,edge,recentEdge,robustEdge:robust,stability:0.55*stability20+0.45*stabilityHalf};
      const target=rawWeight(p);w=seen?(w*(1-alpha)+target*alpha):target;seen=true;
    }
    weights[f]=clamp(seen?w:0.55,0.55,1.40);
  });
  return {perf,weights,meta:metaBacktest(h,tol)};
}

function calibrateRelative(scores){
  const floor=0.015,temps=scores.map(v=>Math.sqrt(Math.max(v,0))),sum=temps.reduce((a,b)=>a+b,0)||1;
  const base=temps.map(v=>v/sum),floored=base.map(v=>Math.max(floor,v));
  const total=floored.reduce((a,b)=>a+b,0)||1;
  return floored.map(v=>v/total);
}
function model(h,tol){
  const key=hashHistory(h,tol);if(cache.model.has(key))return cache.model.get(key);if(h.length<12)return null;
  const a=adaptive(h,tol),familyScores={},familyTargets={};
  for(const f of FAMILIES){familyScores[f]=familyDistribution(h,f);familyTargets[f]=familyTarget(h,f)}
  const score=Array(37).fill(0.000001),support=Array(37).fill(0);
  let active=0;
  for(const f of FAMILIES){
    const w=a.weights[f]||0.55,distF=familyScores[f],has=distF.some(x=>x>0);
    if(!has)continue;
    active++;
    const perf=a.perf[f],sampleFactor=perf.n?clamp(Math.sqrt(perf.n/(perf.n+18)),0.25,1):0.25;
    const qualityFactor=clamp(0.72+perf.robustEdge*5+perf.recentEdge*2,0.55,1.35);
    const familyW=w*sampleFactor*qualityFactor;
    for(let n=0;n<37;n++){score[n]+=familyW*distF[n];support[n]+=familyW*distF[n]}
  }
  // Direction is a genuine feature of the current state, but it is not allowed to
  // create a prediction by itself. Blend it gently with the ensemble.
  const dctx=directionDistribution(h),dirPattern=directionPatternDistribution(h),dirBlend=0.14;
  const baseTotal=score.reduce((a,b)=>a+b,0)||1;
  for(let n=0;n<37;n++){
    const normalized=score[n]/baseTotal;
    score[n]=(1-dirBlend)*normalized+dirBlend*(0.68*dctx[n]+0.32*(dirPattern[n]||0));
  }
  // Recent movement gets a small state-dependent contribution. This is different
  // from copying a historical successor: it models the current jump geometry.
  const tr=getTrans(h),recent=tr.slice(-Math.min(12,tr.length));
  if(recent.length){
    const recentJump=Array(37).fill(0),last=h.at(-1);
    recent.forEach((x,k)=>addKernel(recentJump,jumpDestination(last,x.j),0.55+0.45*((k+1)/recent.length),2.8));
    const z=recentJump.reduce((a,b)=>a+b,0)||1;
    for(let n=0;n<37;n++)score[n]=0.86*score[n]+0.14*(recentJump[n]/z);
  }
  Object.entries(a.meta).forEach(([k,m])=>{
    if(m.n<8||m.robustEdge<=0)return;
    const [fa,fb]=k.split('+'),t=familyTargets[fa];
    if(t!=null&&familyTargets[fb]===t)addKernel(score,t,clamp(m.robustEdge*4,0.006,0.08),2.0);
  });
  // Repeated very recent exact numbers are mildly penalized only when they have
  // occurred unusually often, preventing the ensemble from simply echoing the last cluster.
  const recentNums=h.slice(-8),cnt=new Map();recentNums.forEach(n=>cnt.set(n,(cnt.get(n)||0)+1));
  for(let n=0;n<37;n++){const c=cnt.get(n)||0;if(c>=3)score[n]*=(c===3?0.94:c===4?0.88:0.82)}
  const total=score.reduce((a,b)=>a+b,0)||1;for(let n=0;n<37;n++)score[n]/=total;
  const maxScore=Math.max(...score),meanScore=score.reduce((s,v)=>s+v,0)/37;
  const topLift=meanScore>0?maxScore/meanScore:1;
  const usefulEvidence=active>=2 && topLift>1.12;
  if(!usefulEvidence){cache.model.set(key,null);return null}
  const probs=calibrateRelative(score),ranked=score.map((v,n)=>({n,v,p:probs[n],support:support[n]})).sort((x,y)=>y.p-x.p||y.support-x.support),top=ranked[0],second=ranked[1],lead=top.p-second.p;
  if(!top||top.p<0.05){cache.model.set(key,null);return null}
  let cw=0,ccw=0;const last=h.at(-1);for(const x of ranked){const j=jmp(last,x.n);if(j>0)cw+=x.p;else if(j<0)ccw+=x.p}
  const familyRobust=FAMILIES.map(f=>a.perf[f].n?a.perf[f].robustEdge:0).filter(Number.isFinite),avgRobust=familyRobust.length?familyRobust.reduce((s,x)=>s+x,0)/familyRobust.length:0;
  const familyRecent=FAMILIES.map(f=>a.perf[f].n?a.perf[f].recentEdge:0).filter(Number.isFinite),avgRecent=familyRecent.length?familyRecent.reduce((s,x)=>s+x,0)/familyRecent.length:0;
  const zoneProbability=ranked.filter(x=>dist(x.n,top.n)<=tol).reduce((sum,x)=>sum+x.p,0),edge=zoneProbability-baseline(tol),robustEdge=avgRobust;
  const consensusCount=FAMILIES.filter(f=>a.perf[f].n&&familyTargets[f]===top.n).length,consensus=active?consensusCount/active:0;
  const stability=clamp(0.55*clamp(1-Math.abs(avgRobust-avgRecent)/Math.max(0.05,Math.abs(avgRobust)+0.02),0,1)+0.45*(FAMILIES.reduce((s,f)=>s+(a.perf[f].n?a.perf[f].stability:0),0)/Math.max(1,FAMILIES.filter(f=>a.perf[f].n).length)),0,1);
  const recentQuality=clamp((avgRecent+baseline(tol))/(Math.max(0.001,1-baseline(tol))),0,1);
  const confidence=Math.round(clamp(30+lead*1000+clamp(top.support/Math.max(1,active),0,1)*20+consensus*22+stability*14+clamp(avgRobust*350,-6,18),5,99));
  const quality=Math.round(clamp(consensus*25+stability*22+clamp((robustEdge+0.03)/0.08,0,1)*23+clamp(Math.log1p(Math.max(0,top.support))/3,0,1)*12+recentQuality*18,0,100));
  const signal=confidence>=72&&robustEdge>=0.008&&quality>=70?'HIGH':'LOW';
  const target=top.n,jump=jmp(last,target);
  const result={target,prob:top.p,zoneProbability,ranking:ranked.slice(0,12),predDir:cw>=ccw?'CW':'CCW',cw,ccw,adaptive:a,seq:candidates(h,'sequence').slice(0,4),joint:candidates(h,'joint').slice(0,3),jumps:candidates(h,'jump').slice(0,3),edge,robustEdge,confidence,signal,lead,avgEdge:avgRobust,avgRecent,stability,consensusCount,activeModels:active,jump,quality,familyTargets,directionContext:directionContext(h),directionPattern:dirPattern};
  cache.model.set(key,result);if(cache.model.size>CACHE_LIMIT)cache.model.delete(cache.model.keys().next().value);return result;
}

function topSupportFamily(ranked,a,targets,n){let best=FAMILIES[0],bn=-1;for(const f of FAMILIES){const q=a.perf[f];if(targets[f]===n&&(q.n>bn)){best=f;bn=q.n}}return best}
function rebuildPredictions(){
  const h=S.spins.map(x=>x.result),out=[];for(let i=0;i<h.length;i++){const prior=h.slice(0,i);if(prior.length<12)continue;const p=model(prior,S.settings.tol);out.push({id:out.length+1,spinIndex:i+1,previous:prior.at(-1)??null,prediction:p,actual:h[i],createdAt:S.spins[i].createdAt||new Date().toISOString()})}S.predictions=out;
}
function ensurePredictions(){
  const expected=Math.max(0,S.spins.length-12),last=S.predictions.at(-1)?.spinIndex||0,valid=S.predictions.length===expected&&last===S.spins.length&&S.predictions.every(x=>x?.prediction==null||(Number.isFinite(x.prediction.prob)&&x.prediction.target!=null));if(!valid){rebuildPredictions();save()}
}
function backtest(tol){ensurePredictions();const rows=S.predictions.filter(x=>x?.prediction?.target!=null&&x.spinIndex<=S.spins.length),n=rows.length,hit=rows.filter(x=>dist(x.prediction.target,x.actual)<=tol).length,exact=rows.filter(x=>dist(x.prediction.target,x.actual)===0).length,dirHit=rows.filter(x=>x.prediction.predDir&&x.previous!=null&&x.prediction.predDir===dir(x.previous,x.actual)).length;return {n,hit,exact,dir:dirHit,rows}}
function add(n){
  const value=Number(n),h=S.spins.map(x=>x.result),now=new Date().toISOString();
  const p=h.length>=12?model(h,S.settings.tol):null;
  S.spins.push({id:S.spins.length?Math.max(...S.spins.map(x=>x.id))+1:1,result:value,createdAt:now});
  S.predictions.push({id:S.predictions.length?Math.max(...S.predictions.map(x=>x.id))+1:1,spinIndex:S.spins.length,previous:h.at(-1)??null,prediction:p,actual:value,createdAt:now});
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
  const aView=p?.adaptive||adaptive(h,tol);
  if(!p){renderEmpty(h);}
  else {
  const tg=$('target');tg.textContent=p.target==null?'—':p.target;tg.className='target '+(p.target==null?'black':col(p.target));$('prob').textContent=p.target==null?'—':(p.prob*100).toFixed(2)+'%';
  const sm=p.signal==='HIGH'?t('strong_signal'):p.signal==='LOW'?t('weak_signal'):t('no_edge');$('signal').textContent=sm;$('signal').className='signal '+(p.signal==='HIGH'?'high':p.signal==='LOW'?'low':'none');
  $('predDir').textContent=p.target==null?t('direction_empty'):tf('direction_fmt',{d:p.predDir,cw:(p.cw*100).toFixed(1),ccw:(p.ccw*100).toFixed(1)});$('predJump').textContent=p.target==null?t('jump_empty'):tf('jump_fmt',{j:(p.jump>=0?'+':'')+p.jump});$('zone').textContent=p.target==null?t('no_zone'):neigh(p.target,tol).join(' · ');
  $('confidence').textContent=p.confidence+'/100';$('edge').textContent=fmtPP(p.edge);$('support').textContent=p.activeModels+'/'+FAMILIES.length;$('qualityMini').textContent=p.quality+'/100';$('quality').textContent=p.quality;$('qualityFill').style.width=p.quality+'%';$('qualitySummary').textContent=t('quality_summary');
  $('qConsensus').textContent=Math.round((p.activeModels?p.consensusCount/p.activeModels:0)*100)+'/100';$('qStability').textContent=Math.round(p.stability*100)+'/100';$('qRobust').textContent=fmtPP(p.robustEdge);$('qSample').textContent=Math.round(clamp((p.adaptive.perf[topSupportFamily(p.ranking,p.adaptive,p.familyTargets,p.target)]?.n||0)/100,0,1)*100)+'/100';$('qRecent').textContent=Math.round(clamp((p.avgRecent+baseline(tol))/(Math.max(0.001,1-baseline(tol))),0,1)*100)+'/100';
  $('robustEdge').textContent=fmtPP(p.robustEdge);$('consensus').textContent=p.consensusCount+'/'+p.activeModels;$('stability').textContent=Math.round(p.stability*100)+'/100';
  $('ranking').innerHTML=p.ranking.slice(0,3).map((x,i)=>`<div class="rank"><div class="ranktop"><span>#${i+1} · ${x.n}${x.support?` · ${x.support} ${t('support')}`:''}</span><b>${(x.p*100).toFixed(2)}%</b></div><div class="bar"><i style="width:${Math.max(2,100*x.p/p.ranking[0].p)}%"></i></div></div>`).join('');
  $('alerts').innerHTML=[...p.seq,...p.joint,...p.jumps].slice(0,7).map(q=>`<div class="alert"><b>${q.type==='sequence'?t('strong_family'):q.type==='joint'?t('joint_family'):t('jump_family')}</b><br>${esc(q.key).replaceAll(',',' → ')} · ${q.occ} ${t('matches')} · ${t('next')}: ${q.next.join(', ')}</div>`).join('')||`<span class="muted">${t('no_repeated')}</span>`;
  $('weights').innerHTML=FAMILIES.map(k=>{const v=aView.weights[k],q=aView.perf[k];return `<div class="weight"><span class="muted">${t('families.'+k)}</span><br><b>${v.toFixed(2)}×</b><div class="muted">${q.n} ${t('tests')} · ±${tol}: ${pct(q.hit,q.n)} · ${t('edge')} ${q.n?fmtPP(q.edge):'—'} · ${t('recently')} ${q.n?fmtPP(q.recentEdge):'—'} · ${t('robust_edge').toLowerCase()} ${q.n?fmtPP(q.robustEdge):'—'}</div></div>`}).join('');
  $('weightSummary').textContent=t('weight_summary');
  $('learningSummary').textContent=FAMILIES.map(f=>{const q=aView.perf[f];return q.n?`${t('families.'+f)}: ${q.n} ${t('tests')}, ${fmtPP(q.edge)} ${t('historical')}, ${fmtPP(q.recentEdge)} ${t('recently')}, ${Math.round(q.stability*100)}${t('stability100')}`:`${t('families.'+f)}: ${t('no_sample')}`}).join(' · ');
  }
  // Session statistics must remain visible even when there is no current prediction.
  // They are derived from the available history/backtest state, not from the current prediction object.
  $('evals').textContent=bt.n;
  $('predHistory').innerHTML=bt.rows.slice(-60).reverse().map(x=>{const pr=x.prediction,win=dist(pr.target,x.actual)<=tol,j=pr.jump==null?'—':`${pr.jump>=0?'+':''}${pr.jump}`;return `<div class="prow"><b>#${x.spinIndex}</b><span>${pr.target} → ${x.actual}</span><span>${j} ${t('pockets')}</span><span>${(pr.prob*100).toFixed(2)}%</span><span>${pr.confidence}/100</span><b class="${win?'win':'loss'}">${win?t('win'):t('loss')}</b></div>`}).join('')||'—';
  const base=100*baseline(tol), recentRows=bt.rows.slice(-20),recentRate=recentRows.length?100*recentRows.filter(x=>dist(x.prediction.target,x.actual)<=tol).length/recentRows.length:null,chartRows=bt.rows.slice(-Number(S.settings.chartWindow)),chartRate=chartRows.length?100*chartRows.filter(x=>dist(x.prediction.target,x.actual)<=tol).length/chartRows.length:null;
  $('chartRate').textContent=chartRate==null?'—':chartRate.toFixed(1)+'%';$('chartBase').textContent=base.toFixed(1)+'%';$('chartEdge').textContent=chartRate==null?'—':((chartRate-base>=0?'+':'')+(chartRate-base).toFixed(1)+' pp');$('chartEval').textContent=chartRows.length;$('chartRecent').textContent=recentRate==null?'—':recentRate.toFixed(1)+'%';
  drawChart();
}
function renderEmpty(h){
  // No prediction is a state of the prediction panel only.
  // Historical statistics, learning diagnostics, adaptive weights, prediction history and chart remain visible.
  $('target').textContent='—';$('target').className='target black';$('prob').textContent='—';
  $('signal').textContent=h.length<12?t('waiting_data'):t('no_signal');$('signal').className='signal none';
  $('predDir').textContent=t('direction_empty');$('predJump').textContent=t('jump_empty');
  $('zone').textContent=h.length<12?t('need_spins'):'—';$('confidence').textContent='—';
  $('edge').textContent='—';$('support').textContent='—';$('qualityMini').textContent='—';
  $('robustEdge').textContent='—';$('consensus').textContent='—';$('stability').textContent='—';
  $('quality').textContent='—';$('qualityFill').style.width='0%';$('qualitySummary').textContent=t('quality_summary');
  ['qConsensus','qStability','qRobust','qSample','qRecent'].forEach(id=>$(id).textContent='—');
  $('ranking').innerHTML='';$('alerts').innerHTML=h.length<12?t('need_spins')+'.':'—';
}
function drawChart(){
  const c=$('chart'),d=window.devicePixelRatio||1,w=c.clientWidth||600,hh=c.clientHeight||280;
  c.width=Math.max(1,Math.round(w*d));c.height=Math.max(1,Math.round(hh*d));
  const x=c.getContext('2d');x.setTransform(d,0,0,d,0,0);x.clearRect(0,0,w,hh);
  const styles=getComputedStyle(document.body),accent=styles.getPropertyValue('--accent').trim()||'#3b82f6',muted=styles.getPropertyValue('--muted').trim()||'#888',line=styles.getPropertyValue('--line').trim()||'#ddd',soft=styles.getPropertyValue('--soft').trim()||'#f4f4f4',text=styles.getPropertyValue('--text').trim()||'#111';
  const all=S.predictions.filter(r=>r&&r.spinIndex>S.spins.length-Number(S.settings.chartWindow)-12),tol=S.settings.tol,win=Number(S.settings.chartWindow),slice=all.slice(-win);
  if(!slice.length){x.fillStyle=muted;x.font='13px system-ui';x.textAlign='center';x.fillText(t('no_predictions'),w/2,hh/2);return}
  const pad={l:46,r:16,t:28,b:34},pw=Math.max(1,w-pad.l-pad.r),ph=Math.max(1,hh-pad.t-pad.b),base=100*baseline(tol);
  const evaluated=slice.filter(r=>r.prediction?.target!=null);
  const vals=[];let hits=0,evalCount=0;
  slice.forEach(r=>{if(r.prediction?.target!=null){evalCount++;if(dist(r.prediction.target,r.actual)<=tol)hits++;vals.push({v:100*hits/evalCount,eval:true,row:r});}else vals.push({v:evalCount?100*hits/evalCount:null,eval:false,row:r});});
  const y=v=>pad.t+ph-(Math.max(0,Math.min(100,v))/100)*ph;
  x.font='10px system-ui';x.textAlign='right';x.lineWidth=1;
  [0,25,50,75,100].forEach(v=>{const yy=y(v);x.strokeStyle=line;x.beginPath();x.moveTo(pad.l,yy);x.lineTo(w-pad.r,yy);x.stroke();x.fillStyle=muted;x.fillText(v+'%',pad.l-8,yy+3)});
  const by=y(base);x.save();x.strokeStyle=muted;x.lineWidth=1.2;x.setLineDash([6,5]);x.beginPath();x.moveTo(pad.l,by);x.lineTo(w-pad.r,by);x.stroke();x.restore();
  x.font='600 10px system-ui';x.textAlign='left';x.fillStyle=muted;x.fillText(tf('chart_baseline_label',{v:base.toFixed(1)}),pad.l+7,Math.max(12,by-8));
  const pts=vals.map((q,i)=>({x:pad.l+(slice.length===1?pw/2:i*pw/(slice.length-1)),y:q.v==null?null:y(q.v),v:q.v,i,row:q.row,eval:q.eval}));
  const linePts=pts.filter(p=>p.eval&&p.y!=null);
  if(linePts.length){
    const grad=x.createLinearGradient(0,pad.t,0,hh-pad.b);grad.addColorStop(0,accent);grad.addColorStop(1,'rgba(0,0,0,0)');x.globalAlpha=.15;x.fillStyle=grad;x.beginPath();x.moveTo(linePts[0].x,hh-pad.b);linePts.forEach((p,i)=>i?x.lineTo(p.x,p.y):x.lineTo(p.x,p.y));x.lineTo(linePts.at(-1).x,hh-pad.b);x.closePath();x.fill();x.globalAlpha=1;
    x.save();x.strokeStyle=accent;x.lineWidth=3;x.lineJoin='round';x.lineCap='round';x.shadowColor=accent;x.shadowBlur=7;x.beginPath();linePts.forEach((p,i)=>i?x.lineTo(p.x,p.y):x.moveTo(p.x,p.y));x.stroke();x.restore();
  }
  pts.forEach(p=>{if(p.eval&&p.y!=null){x.fillStyle=soft;x.beginPath();x.arc(p.x,p.y,4.8,0,Math.PI*2);x.fill();x.fillStyle=accent;x.beginPath();x.arc(p.x,p.y,2.5,0,Math.PI*2);x.fill();}else{x.save();x.strokeStyle=muted;x.lineWidth=1.5;x.setLineDash([3,3]);x.beginPath();x.arc(p.x,y(base),4.5,0,Math.PI*2);x.stroke();x.restore();}});
  x.fillStyle=muted;x.font='10px system-ui';x.textAlign='center';const labels=Math.min(6,slice.length);for(let j=0;j<labels;j++){const i=labels===1?0:Math.round(j*(slice.length-1)/(labels-1));x.fillText('#'+slice[i].spinIndex,pts[i].x,hh-11)}
  x.font='600 10px system-ui';x.textAlign='left';x.fillStyle=muted;x.fillText(t('chart_no_signal'),w-pad.r-55,18);
  const edge=(evaluated.length?100*hits/evalCount:base)-base;x.fillStyle=edge>=0?accent:muted;x.textAlign='right';x.fillText(tf('chart_edge_label',{v:(edge>=0?'+':'')+edge.toFixed(1)}),w-pad.r,18);
  if(!c._chartBound){c._chartBound=true;c.addEventListener('mousemove',ev=>{c._chartHover=ev;drawChart()});c.addEventListener('mouseleave',()=>{c._chartHover=null;drawChart()});c.addEventListener('touchmove',ev=>{const t0=ev.touches[0];if(t0){c._chartHover={clientX:t0.clientX,clientY:t0.clientY};drawChart()}});c.addEventListener('touchend',()=>{c._chartHover=null;drawChart()});}
  const ev=c._chartHover;
  if(ev&&pts.length){const rect=c.getBoundingClientRect(),mx=ev.clientX-rect.left;let nearest=pts[0];pts.forEach(p=>{if(Math.abs(p.x-mx)<Math.abs(nearest.x-mx))nearest=p});if(Math.abs(nearest.x-mx)<20){
    const r=nearest.row,tipW=205,tipH=nearest.eval?105:82,tx=Math.min(Math.max(8,nearest.x-tipW/2),w-tipW-8),ty=Math.max(8,(nearest.y||y(base))-tipH-14);x.fillStyle=styles.getPropertyValue('--card').trim()||'#fff';x.strokeStyle=line;x.lineWidth=1;x.beginPath();x.roundRect(tx,ty,tipW,tipH,10);x.fill();x.stroke();x.fillStyle=text;x.textAlign='left';x.font='600 11px system-ui';x.fillText('#'+r.spinIndex+(nearest.eval?'  '+(dist(r.prediction.target,r.actual)<=tol?t('chart_hit'):t('chart_miss')):'  '+t('chart_no_signal')),tx+10,ty+18);x.font='10px system-ui';x.fillStyle=muted;if(nearest.eval){x.fillText(tf('chart_prediction',{v:r.prediction.target}),tx+10,ty+38);x.fillText(tf('chart_result',{v:r.actual}),tx+10,ty+54);x.fillText(tf('chart_distance',{v:dist(r.prediction.target,r.actual),tol}),tx+10,ty+70);x.fillText(tf('chart_performance',{v:nearest.v.toFixed(1)}),tx+10,ty+88);}else{x.fillText(tf('chart_result',{v:r.actual}),tx+10,ty+40);x.fillText(t('chart_no_signal_reason'),tx+10,ty+58);x.fillText(t('chart_not_evaluated'),tx+10,ty+74);}
  }}
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
const helpModal=$('helpModal'),helpTitle=$('helpTitle'),helpBody=$('helpBody');
function openHelp(key){const text=HELP[LANG]?.[key]||HELP.en[key]||'';helpTitle.textContent=HELP_TITLE[LANG]||HELP_TITLE.en;helpBody.innerHTML='<p>'+esc(text)+'</p>';helpModal.hidden=false;helpModal.setAttribute('aria-hidden','false')}
function closeHelp(){helpModal.hidden=true;helpModal.setAttribute('aria-hidden','true')}
document.querySelectorAll('.helpBtn').forEach(b=>b.addEventListener('click',()=>openHelp(b.dataset.help)));
document.querySelectorAll('[data-help-close]').forEach(b=>b.addEventListener('click',closeHelp));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!helpModal.hidden)closeHelp()});

for(let n=0;n<=36;n++){const b=document.createElement('button');b.className='num '+col(n);b.textContent=n;b.onpointerdown=()=>{b.classList.add('pressed');setTimeout(()=>b.classList.remove('pressed'),120)};b.onclick=()=>add(n);$('numbers').appendChild(b)}
if(localStorage.getItem(THEME_KEY)==='night'){document.body.classList.add('night');$('theme').textContent=t('day_mode')}
ensurePredictions();applyLanguage();
})();
