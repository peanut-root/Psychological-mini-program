Page({
  data: {
    diseaseIndex: 0,
    diseaseNames: ["双相情感障碍", "特定恐惧症", "性欲倒错", "强迫障碍", "PTSD", "精神分裂症", "物质成瘾", "抑郁症", "焦虑症", "注意缺陷与多动障碍"],
    guidelines: {
      "双相情感障碍": [
        {
          sectionTitle: "第一部分：核心诊疗诉求",
          questions: [
            { 
              title: "1. 本次就诊希望优先解决的核心问题是什么？", 
              isMulti: true,
              options: [
                { label: "躁狂/轻躁狂发作相关", hint: "如情绪异常高涨、冲动消费、话多到他人插不上话", selected: false },
                { label: "抑郁发作相关", hint: "如持续情绪低落、对以往爱好提不起兴趣、自杀念头", selected: false },
                { label: "发作频率/周期问题", hint: "如短期内频繁交替发作、发作间隔逐渐缩短", selected: false },
                { label: "症状控制不佳", hint: "如现有治疗方案下仍频繁发作", selected: false },
                { label: "药物相关困扰", hint: "如药物副作用明显、担心药物依赖", selected: false }
              ] 
            },
            { 
              title: "2. 首次出现躁狂/轻躁狂或抑郁相关症状至今多久？", 
              isMulti: false,
              options: [
                { label: "不足2周", selected: false },
                { label: "2周至1个月", selected: false },
                { label: "1-3个月", selected: false },
                { label: "3-6个月", selected: false },
                { label: "超过6个月", selected: false }
              ] 
            },
            {
              title: "3. 症状对日常生活的影响程度如何？",
              isMulti: false,
              options: [
                { label: "轻微影响", hint: "能正常工作/学习，仅少数场景出现效率下降", selected: false },
                { label: "中度影响", hint: "工作/学业效率明显降低，社交活动减少，部分事务需他人协助", selected: false },
                { label: "重度影响", hint: "难以坚持工作/学习，回避社交，多数日常事务无法独立完成", selected: false },
                { label: "极重度影响", hint: "完全无法工作/学习，生活不能自理，存在自伤/自杀风险", selected: false }
              ]
            }
          ]
        },
        {
          sectionTitle: "第二部分：症状细节描述",
          questions: [
            { 
              title: "4. 躁狂/轻躁狂发作时的表现？（可多选）", 
              isMulti: true,
              options: [
                { label: "情绪异常兴奋，持续感到\"上头\"", selected: false },
                { label: "话多语速快，思维跳跃，难以被打断", selected: false },
                { label: "精力异常充沛，熬夜不困仍无疲惫感", selected: false },
                { label: "盲目乐观，夸大自身能力（如计划不切实际的项目）", selected: false },
                { label: "冲动行为（如大额消费、飙车、滥交等）", selected: false },
                { label: "近期无明显躁狂/轻躁狂发作", selected: false }
              ] 
            },
            { 
              title: "5. 抑郁发作时的表现？（可多选）", 
              isMulti: true,
              options: [
                { label: "持续情绪低落，对任何事情提不起兴趣", selected: false },
                { label: "睡眠障碍（失眠、早醒或过度嗜睡）", selected: false },
                { label: "食欲显著变化（暴饮暴食或食欲减退）", selected: false },
                { label: "自我否定、自责，甚至出现自杀念头/行为", selected: false },
                { label: "注意力涣散，记忆力明显下降", selected: false },
                { label: "近期无明显抑郁发作", selected: false }
              ] 
            },
            { 
              title: "6. 症状发作的规律特征？", 
              isMulti: false,
              options: [
                { label: "无明显规律，突然发作", selected: false },
                { label: "与季节、压力等因素相关", selected: false },
                { label: "躁狂与抑郁交替发作，周期相对固定", selected: false },
                { label: "单次发作持续时间较长（超过1个月）", selected: false }
              ] 
            }
          ]
        },
        {
          sectionTitle: "第三部分：病史与相关信息",
          questions: [
            { 
              title: "7. 过往是否有精神心理相关诊疗经历？", 
              isMulti: false,
              options: [
                { label: "从未接受过任何相关诊疗", selected: false },
                { label: "曾做过心理咨询/心理治疗（未用药）", selected: false },
                { label: "曾就诊精神科，服用过心境稳定剂等药物（可告知药物名称及服用时长）", selected: false },
                { label: "曾因双相情感障碍或相关症状住院治疗", selected: false }
              ] 
            },
            { 
              title: "8. 目前是否患有其他躯体疾病？", 
              isMulti: false,
              options: [
                { label: "无", selected: false },
                { label: "有（如甲状腺疾病、糖尿病、高血压、心脏病、癫痫等）", selected: false }
              ] 
            },
            { 
              title: "9. 直系亲属（父母、兄弟姐妹、子女）中是否有精神心理疾病史？", 
              isMulti: false,
              options: [
                { label: "无", selected: false },
                { label: "有（如双相情感障碍、抑郁症、精神分裂症等，请具体说明）", selected: false }
              ] 
            },
            { 
              title: "10. 目前是否在服用其他药物或保健品？", 
              isMulti: false,
              options: [
                { label: "无", selected: false },
                { label: "有（请说明药物/保健品名称及服用目的）", selected: false }
              ] 
            }
          ]
        }
      ],
      "特定恐惧症": [
        {
          sectionTitle: "第一部分：核心诊疗诉求",
          questions: [
            { 
              title: "1. 本次就诊希望解决的核心问题是什么？", 
              isMulti: true,
              options: [
                { label: "对特定对象/场景的强烈恐惧（如动物、高处、密闭空间、血液、社交场合等）", selected: false },
                { label: "恐惧引发的躯体不适（如心慌、出汗、发抖、窒息感）", selected: false },
                { label: "因恐惧回避相关场景，影响日常生活/工作", selected: false },
                { label: "恐惧情绪持续无法缓解，自我调节无效", selected: false }
              ] 
            },
            { 
              title: "2. 这种恐惧症状首次出现至今多久？", 
              isMulti: false,
              options: [
                { label: "少于2周", selected: false },
                { label: "2周至1个月", selected: false },
                { label: "1-3个月", selected: false },
                { label: "3-6个月", selected: false },
                { label: "超过6个月", selected: false }
              ] 
            },
            {
              title: "3. 症状对社会功能的影响程度？",
              isMulti: false,
              options: [
                { label: "轻微影响：仅少数场景回避，不影响核心生活", selected: false },
                { label: "中度影响：部分日常活动受限，社交/工作效率下降", selected: false },
                { label: "重度影响：频繁回避相关场景，社交孤立，工作/学业受明显影响", selected: false },
                { label: "极重度影响：因恐惧无法正常出行，生活自理受影响", selected: false }
              ]
            }
          ]
        },
        {
          sectionTitle: "第二部分：症状细节描述",
          questions: [
            { 
              title: "4. 您恐惧的具体对象/场景是？（可多选）", 
              isMulti: true,
              options: [
                { label: "动物类（如蛇、蜘蛛、狗、昆虫等）", selected: false },
                { label: "环境类（如高处、密闭空间、黑暗、雷电等）", selected: false },
                { label: "情境类（如坐飞机、乘电梯、看医生、打针抽血等）", selected: false },
                { label: "其他特定对象（如尖锐物品、呕吐物等）", selected: false }
              ] 
            },
            { 
              title: "5. 接触恐惧对象/场景时的反应？（可多选）", 
              isMulti: true,
              options: [
                { label: "瞬间出现强烈恐惧感，无法控制", selected: false },
                { label: "躯体不适（心慌、胸闷、出汗、发抖、头晕、恶心）", selected: false },
                { label: "迫切想要逃离现场", selected: false },
                { label: "出现濒死感或失控感", selected: false },
                { label: "接触后长时间无法平复情绪", selected: false }
              ] 
            },
            { 
              title: "6. 为避免接触恐惧对象，您是否有以下行为？", 
              isMulti: false,
              options: [
                { label: "刻意绕开相关场景/地点", selected: false },
                { label: "需他人陪同才敢接近相关环境", selected: false },
                { label: "提前做大量准备（如查询路线避开恐惧对象）", selected: false },
                { label: "无明显回避行为", selected: false }
              ] 
            }
          ]
        },
        {
          sectionTitle: "第三部分：病史与相关信息",
          questions: [
            { 
              title: "7. 过往是否接受过心理健康相关服务？", 
              isMulti: false,
              options: [
                { label: "从未接受过", selected: false },
                { label: "曾接受心理咨询/治疗", selected: false },
                { label: "曾就诊精神科，服用过相关药物（可告知药物名称及疗程）", selected: false },
                { label: "曾因该问题住院治疗", selected: false }
              ] 
            },
            { 
              title: "8. 目前是否患有其他躯体疾病？", 
              isMulti: false,
              options: [
                { label: "无", selected: false },
                { label: "有（如心脏病、高血压、甲状腺疾病等，请具体说明）", selected: false }
              ] 
            },
            { 
              title: "9. 直系亲属（父母、兄弟姐妹、子女）中是否有精神心理疾病史？", 
              isMulti: false,
              options: [
                { label: "无", selected: false },
                { label: "有（如恐惧症、焦虑症、抑郁症等，请具体说明）", selected: false }
              ] 
            }
          ]
        }
      ],
      "性欲倒错": [
        {
          sectionTitle: "第一部分：核心诊疗诉求",
          questions: [
            { 
              title: "1. 本次就诊希望解决的核心问题是什么？", 
              isMulti: true,
              options: [
                { label: "对非典型性刺激产生强烈性兴趣（如恋物、露阴、窥阴、恋童等）", selected: false },
                { label: "相关性偏好影响正常亲密关系/性生活", selected: false },
                { label: "因性偏好产生自责、焦虑等负面情绪", selected: false },
                { label: "担心相关行为违反社会规范或法律", selected: false },
                { label: "试图改变性偏好但无法自控", selected: false }
              ] 
            },
            { 
              title: "2. 这种性偏好首次出现至今多久？", 
              isMulti: false,
              options: [
                { label: "少于2周", selected: false },
                { label: "2周至1个月", selected: false },
                { label: "1-3个月", selected: false },
                { label: "3-6个月", selected: false },
                { label: "超过6个月", selected: false }
              ] 
            },
            {
              title: "3. 该性偏好对生活的影响程度？",
              isMulti: false,
              options: [
                { label: "轻微影响：不影响正常社交/工作，仅个人性体验异常", selected: false },
                { label: "中度影响：亲密关系受影响，出现情绪困扰（如焦虑、自责）", selected: false },
                { label: "重度影响：无法建立稳定亲密关系，工作/社交受干扰", selected: false },
                { label: "极重度影响：因相关行为面临法律风险，生活秩序混乱", selected: false }
              ]
            }
          ]
        },
        {
          sectionTitle: "第二部分：症状细节描述",
          questions: [
            { 
              title: "4. 您的主要性偏好类型是？（可多选）", 
              isMulti: true,
              options: [
                { label: "恋物型（如对衣物、身体部位、特定物品产生性兴趣）", selected: false },
                { label: "露阴型（通过暴露生殖器获得性满足）", selected: false },
                { label: "窥阴型（通过窥视他人隐私获得性满足）", selected: false },
                { label: "恋童型（对儿童产生性兴趣）", selected: false },
                { label: "其他非典型性偏好（请具体说明）", selected: false }
              ] 
            },
            { 
              title: "5. 相关性偏好的表现特征？（可多选）", 
              isMulti: true,
              options: [
                { label: "需依赖该刺激才能获得性唤起/满足", selected: false },
                { label: "频繁出现相关性幻想，难以控制", selected: false },
                { label: "曾实施相关行为（如偷窃恋物、窥阴、露阴等）", selected: false },
                { label: "因该偏好产生强烈的羞耻、焦虑或自责情绪", selected: false }
              ] 
            },
            { 
              title: "6. 是否尝试过改变该性偏好？", 
              isMulti: false,
              options: [
                { label: "未尝试过", selected: false },
                { label: "尝试过自我调节（如转移注意力），但无效", selected: false },
                { label: "曾接受过相关咨询/治疗，效果不佳", selected: false }
              ] 
            }
          ]
        },
        {
          sectionTitle: "第三部分：病史与相关信息",
          questions: [
            { 
              title: "7. 过往是否接受过心理健康相关服务？", 
              isMulti: false,
              options: [
                { label: "从未接受过", selected: false },
                { label: "曾接受心理咨询/治疗（针对该问题或其他心理问题）", selected: false },
                { label: "曾就诊精神科，服用过相关药物（可告知药物名称及疗程）", selected: false },
                { label: "曾因该问题或相关行为住院/接受强制干预", selected: false }
              ] 
            },
            { 
              title: "8. 目前是否患有其他躯体疾病？", 
              isMulti: false,
              options: [
                { label: "无", selected: false },
                { label: "有（如神经系统疾病、内分泌疾病、性功能障碍等，请具体说明）", selected: false }
              ] 
            },
            { 
              title: "9. 直系亲属（父母、兄弟姐妹、子女）中是否有精神心理疾病史？", 
              isMulti: false,
              options: [
                { label: "无", selected: false },
                { label: "有（如精神分裂症、人格障碍、其他性心理障碍等，请具体说明）", selected: false }
              ] 
            },
            { 
              title: "10. 是否有酒精/药物依赖史？", 
              isMulti: false,
              options: [
                { label: "无", selected: false },
                { label: "有（请说明具体物质及依赖时长）", selected: false }
              ] 
            }
          ]
        }
      ],
      "强迫障碍": [
        {
          sectionTitle: "第一部分：核心诊疗诉求",
          questions: [
            { 
              title: "1. 本次就诊希望优先解决的核心问题是什么？", 
              isMulti: true,
              options: [
                { label: "强迫思维相关", hint: "如反复出现不想要的想法、画面或冲动", selected: false },
                { label: "强迫行为相关", hint: "如反复检查、清洗、整理等重复行为", selected: false },
                { label: "症状引发的焦虑情绪", hint: "如因强迫症状而产生的高度紧张、恐惧", selected: false },
                { label: "强迫症状影响日常生活", hint: "如无法正常工作、学习、社交", selected: false },
                { label: "药物相关困扰", hint: "如药物副作用明显、担心药物依赖", selected: false }
              ] 
            },
            { 
              title: "2. 强迫症状首次出现至今多久？", 
              isMulti: false,
              options: [
                { label: "不足2周", selected: false },
                { label: "2周至1个月", selected: false },
                { label: "1-3个月", selected: false },
                { label: "3-6个月", selected: false },
                { label: "超过6个月", selected: false }
              ] 
            },
            {
              title: "3. 强迫症状对日常生活的影响程度如何？",
              isMulti: false,
              options: [
                { label: "轻微影响", hint: "能正常工作/学习，仅少数场景出现效率下降", selected: false },
                { label: "中度影响", hint: "工作/学业效率明显降低，社交活动减少，部分事务需他人协助", selected: false },
                { label: "重度影响", hint: "难以坚持工作/学习，回避社交，多数日常事务无法独立完成", selected: false },
                { label: "极重度影响", hint: "完全无法工作/学习，生活不能自理，存在自伤/自杀风险", selected: false }
              ]
            }
          ]
        },
        {
          sectionTitle: "第二部分：症状细节描述",
          questions: [
            { 
              title: "4. 您的强迫思维主要表现为？（可多选）", 
              isMulti: true,
              options: [
                { label: "反复出现令人不安的想法", hint: "如伤害他人、不洁、对称性等想法", selected: false },
                { label: "持续担心不好的事情会发生", hint: "如担心忘记锁门导致被盗、电器漏电等", selected: false },
                { label: "对某些数字、颜色或概念有特殊执念", selected: false },
                { label: "反复回忆过去的事件或对话", selected: false },
                { label: "近期无明显强迫思维", selected: false }
              ] 
            },
            { 
              title: "5. 您的强迫行为主要表现为？（可多选）", 
              isMulti: true,
              options: [
                { label: "反复检查", hint: "如反复检查门窗、开关、文件等", selected: false },
                { label: "过度清洁", hint: "如反复洗手、消毒、擦拭物品等", selected: false },
                { label: "重复性仪式行为", hint: "如按照特定顺序重复某些动作", selected: false },
                { label: "整理和排列", hint: "如反复整理物品，要求特定的摆放方式", selected: false },
                { label: "计数或默念", hint: "如在心中重复计数或默念特定词语", selected: false },
                { label: "近期无明显强迫行为", selected: false }
              ] 
            },
            { 
              title: "6. 当无法执行强迫行为时的感受？", 
              isMulti: false,
              options: [
                { label: "极度焦虑不安，必须立即执行强迫行为", selected: false },
                { label: "明显焦虑，但可以短暂忍受", selected: false },
                { label: "轻度不适，但可以控制", selected: false },
                { label: "基本无不适感", selected: false }
              ] 
            }
          ]
        },
        {
          sectionTitle: "第三部分：病史与相关信息",
          questions: [
            { 
              title: "7. 过往是否有精神心理相关诊疗经历？", 
              isMulti: false,
              options: [
                { label: "从未接受过任何相关诊疗", selected: false },
                { label: "曾做过心理咨询/心理治疗（未用药）", selected: false },
                { label: "曾就诊精神科，服用过抗强迫药物（可告知药物名称及服用时长）", selected: false },
                { label: "曾因强迫障碍或相关症状住院治疗", selected: false }
              ] 
            },
            { 
              title: "8. 目前是否患有其他躯体疾病？", 
              isMulti: false,
              options: [
                { label: "无", selected: false },
                { label: "有（如甲状腺疾病、糖尿病、高血压、心脏病、神经系统疾病等）", selected: false }
              ] 
            },
            { 
              title: "9. 直系亲属（父母、兄弟姐妹、子女）中是否有精神心理疾病史？", 
              isMulti: false,
              options: [
                { label: "无", selected: false },
                { label: "有（如强迫障碍、抑郁症、焦虑症等，请具体说明）", selected: false }
              ] 
            },
            { 
              title: "10. 目前是否在服用其他药物或保健品？", 
              isMulti: false,
              options: [
                { label: "无", selected: false },
                { label: "有（请说明药物/保健品名称及服用目的）", selected: false }
              ] 
            }
          ]
        }
      ],
      "PTSD": [
        {
          sectionTitle: "第一部分：核心诊疗诉求",
          questions: [
            { 
              title: "1. 本次就诊希望优先解决的核心问题是什么？", 
              isMulti: true,
              options: [
                { label: "创伤闪回相关", hint: "如不由自主地回忆起创伤事件", selected: false },
                { label: "回避相关", hint: "如回避与创伤相关的人、地、话题等", selected: false },
                { label: "警觉性增高相关", hint: "如易惊吓、难以放松、高度警惕等", selected: false },
                { label: "情绪麻木相关", hint: "如对以往感兴趣的活动提不起兴趣", selected: false },
                { label: "药物相关困扰", hint: "如药物副作用明显、担心药物依赖", selected: false }
              ] 
            },
            { 
              title: "2. PTSD相关症状首次出现至今多久？", 
              isMulti: false,
              options: [
                { label: "不足2周", selected: false },
                { label: "2周至1个月", selected: false },
                { label: "1-3个月", selected: false },
                { label: "3-6个月", selected: false },
                { label: "超过6个月", selected: false }
              ] 
            },
            {
              title: "3. PTSD症状对日常生活的影响程度如何？",
              isMulti: false,
              options: [
                { label: "轻微影响", hint: "能正常工作/学习，仅少数场景出现效率下降", selected: false },
                { label: "中度影响", hint: "工作/学业效率明显降低，社交活动减少，部分事务需他人协助", selected: false },
                { label: "重度影响", hint: "难以坚持工作/学习，回避社交，多数日常事务无法独立完成", selected: false },
                { label: "极重度影响", hint: "完全无法工作/学习，生活不能自理，存在自伤/自杀风险", selected: false }
              ]
            }
          ]
        },
        {
          sectionTitle: "第二部分：症状细节描述",
          questions: [
            { 
              title: "4. 您是否经常不由自主地想起创伤事件？（可多选）", 
              isMulti: true,
              options: [
                { label: "出现创伤相关的侵入性记忆", selected: false },
                { label: "做与创伤有关的噩梦", selected: false },
                { label: "出现闪回现象", hint: "感觉创伤事件再次发生", selected: false },
                { label: "遇到类似场景时出现强烈生理反应", selected: false },
                { label: "近期无此类症状", selected: false }
              ] 
            },
            { 
              title: "5. 您是否主动回避与创伤事件相关的人、地、话题？", 
              isMulti: false,
              options: [
                { label: "频繁回避", hint: "几乎完全避开所有可能触发回忆的情境", selected: false },
                { label: "有时回避", hint: "会选择性避开某些特定情境", selected: false },
                { label: "偶尔回避", hint: "只有在症状严重时才会回避", selected: false },
                { label: "基本不回避", selected: false }
              ] 
            },
            { 
              title: "6. 您是否比以前更容易受到惊吓或感到紧张？", 
              isMulti: false,
              options: [
                { label: "极度警觉", hint: "时刻处于高度紧张状态", selected: false },
                { label: "经常惊吓", hint: "对轻微声响或意外情况反应过度", selected: false },
                { label: "偶尔紧张", hint: "在特定情况下感到格外警觉", selected: false },
                { label: "基本无此现象", selected: false }
              ] 
            },
            { 
              title: "7. 创伤事件后，您对以往感兴趣的活动态度如何？", 
              isMulti: false,
              options: [
                { label: "完全失去兴趣", selected: false },
                { label: "兴趣明显减少", selected: false },
                { label: "兴趣略有减少", selected: false },
                { label: "兴趣基本不变", selected: false }
              ] 
            }
          ]
        },
        {
          sectionTitle: "第三部分：病史与相关信息",
          questions: [
            { 
              title: "8. 过往是否有精神心理相关诊疗经历？", 
              isMulti: false,
              options: [
                { label: "从未接受过任何相关诊疗", selected: false },
                { label: "曾做过心理咨询/治疗（未用药）", selected: false },
                { label: "曾就诊精神科，服用过相关药物（可告知药物名称及服用时长）", selected: false },
                { label: "曾因PTSD或相关症状住院治疗", selected: false }
              ] 
            },
            { 
              title: "9. 目前是否患有其他躯体疾病？", 
              isMulti: false,
              options: [
                { label: "无", selected: false },
                { label: "有（如甲状腺疾病、糖尿病、高血压、心脏病、神经系统疾病等）", selected: false }
              ] 
            },
            { 
              title: "10. 直系亲属（父母、兄弟姐妹、子女）中是否有精神心理疾病史？", 
              isMulti: false,
              options: [
                { label: "无", selected: false },
                { label: "有（如PTSD、抑郁症、焦虑症等，请具体说明）", selected: false }
              ] 
            },
            { 
              title: "11. 目前是否在服用其他药物或保健品？", 
              isMulti: false,
              options: [
                { label: "无", selected: false },
                { label: "有（请说明药物/保健品名称及服用目的）", selected: false }
              ] 
            }
          ]
        }
      ],
      "精神分裂症": [
        {
          sectionTitle: "第一部分：核心症状",
          questions: [
            { 
              title: "问题1：此次就诊最想解决的问题是什么？", 
              isMulti: true,
              options: [
                { label: "对生活缺失兴趣，不愿意社交", selected: false },
                { label: "妄想症（例如被害妄想）", selected: false },
                { label: "经常出现幻觉（例如幻听）", selected: false },
                { label: "经常有\"自我被抽走\"的感觉", selected: false }
              ] 
            },
            { 
              title: "问题2：当前症状的持续时间有多久？", 
              isMulti: false,
              options: [
                { label: "一个月及以上的大部分时期", selected: false }
              ] 
            },
            {
              title: "问题3：症状对您社会功能的影响程度有多深？",
              isMulti: false,
              options: [
                { label: "轻微影响，虽然有幻觉但是能正常学习工作", selected: false },
                { label: "中度影响，消极的态度、频繁的幻觉影响了正常生存", selected: false },
                { label: "重度影响，魂不守舍，思维和感知与现实断连和混乱，严重干扰了正常的思维模式，生活秩序紊乱", selected: false }
              ]
            }
          ]
        },
        {
          sectionTitle: "第二部分：症状细节",
          questions: [
            { 
              title: "问题4：您有没有过一些特别的、别人似乎没有的感官体验？比如，在周围没人的时候，是否听到过声音（说话声、议论声、命令声）？或者看到过别人看不到的人、影子或东西？", 
              isMulti: true,
              options: [
                { label: "是的，我经常听到两个人在议论我，说我坏话，有时是在我脑子里，有时感觉是从隔壁传来的。", hint: "或 \"有一个声音在命令我必须做某些事情，我很难不听它的。\"", selected: false },
                { label: "幻听：听到说话声、议论声、命令声", selected: false },
                { label: "幻视：看到别人看不到的人、影子或东西", selected: false }
              ] 
            },
            { 
              title: "问题5：您是否有一些非常坚定、但其他人难以同意的想法或信念？比如，是否觉得有人要害您、跟踪您、在背后策划针对您的阴谋？或者是否觉得电视、广播里的内容是在专门向您传递特殊信息？", 
              isMulti: true,
              options: [
                { label: "我确信我的邻居在通过我家的墙壁向我投毒，他们在监视我的一举一动。", selected: false },
                { label: "被害妄想：觉得有人要害我、跟踪我、在背后策划针对我的阴谋", selected: false },
                { label: "特殊信息妄想：觉得电视、广播里的内容是在专门向我传递特殊信息", selected: false }
              ] 
            },
            { 
              title: "问题6：这些问题是从什么时候开始的？是突然出现还是慢慢加重的？您自己怎么看这些体验？觉得它们是需要处理的\"症状\"，还是真实发生的事情？", 
              isMulti: false,
              options: [
                { label: "这些声音和跟踪都是千真万确的，我来医院是因为家人非逼我来，他们不相信我。", selected: false },
                { label: "起初不确定，但现在确信这些都是真实的", selected: false },
                { label: "我意识到这些可能是症状，希望能得到帮助", selected: false }
              ] 
            }
          ]
        },
        {
          sectionTitle: "第三部分：个人史与家族史",
          questions: [
            { 
              title: "问题7：您过去是否接受过心理健康相关服务？", 
              isMulti: false,
              options: [
                { label: "从未接受过", selected: false },
                { label: "曾接受心理咨询/治疗", selected: false },
                { label: "曾就诊于精神科，并服用药物（若记得请记得告知医生药物名称和疗程）", selected: false },
                { label: "曾因心理问题住院治疗", selected: false }
              ] 
            },
            { 
              title: "问题8：您目前是否患有其他躯体疾病？", 
              isMulti: false,
              options: [
                { label: "自身免疫性疾病：系统性红斑狼疮、类风湿关节炎、干燥综合征、乳糜泻、1型糖尿病、桥本氏甲状腺炎等", selected: false },
                { label: "中枢神经系统感染：疱疹病毒、流感病毒、弓形虫、巨细胞病毒感染", selected: false },
                { label: "某些神经系统疾病：癫痫、脑损伤", selected: false },
                { label: "严重的代谢与内分泌紊乱", selected: false },
                { label: "无", selected: false }
              ] 
            },
            { 
              title: "问题9：您的直系亲属（父母、兄弟姐妹、子女）中，是否有人被诊断有情绪或精神心理问题？", 
              isMulti: false,
              options: [
                { label: "无", selected: false },
                { label: "有（请具体说明）", selected: false }
              ] 
            }
          ]
        }
      ],
      "物质成瘾": [
        {
          sectionTitle: "第一部分：核心症状",
          questions: [
            { 
              title: "问题1：此次就诊最想解决的问题是什么？", 
              isMulti: true,
              options: [
                { label: "总是无法控制地摄入某种物质（例：明知抽烟对身体不好却仍然一根接一根地抽）", selected: false },
                { label: "停止摄入物质时仍然强烈渴求，甚至出现紧张、焦虑、易怒和躯体疼痛等症状（例：戒酒过程中食欲减退、胃痛或腹泻）", selected: false },
                { label: "痴迷摄入某种物质，超过其他兴趣爱好（例：原本喜欢冲浪，却因为吸毒整日萎靡，只想着吸毒）", selected: false }
              ] 
            },
            { 
              title: "问题2：当前症状的持续时间有多久？", 
              isMulti: false,
              options: [
                { label: "在过去 12 个月中反复出现或者在既往 1 个月中持续出现", selected: false }
              ] 
            },
            {
              title: "问题3：症状对您社会功能的影响程度有多深？",
              isMulti: false,
              options: [
                { label: "目前影响不大，但是还是会在戒断时暴躁冲动", selected: false },
                { label: "已经影响到了正常生活，不仅会有心理上的问题，生理上也有了戒断疾病", selected: false },
                { label: "严重影响了正常生活，生理心理双重折磨，并且仍然在持续加重", selected: false }
              ]
            }
          ]
        },
        {
          sectionTitle: "第二部分：症状细节",
          questions: [
            { 
              title: "问题4：您具体是因为哪种物质产生的成瘾现象？（可多选）", 
              isMulti: true,
              options: [
                { label: "酒精", selected: false },
                { label: "毒品（有可能）", selected: false },
                { label: "药物", selected: false },
                { label: "烟（尼古丁）", selected: false }
              ] 
            },
            { 
              title: "问题5：请描述您在生理上具体都会有什么负向戒断症状？（可多选）", 
              isMulti: true,
              options: [
                { label: "恶心、呕吐、腹泻、腹痛", selected: false },
                { label: "心悸、血压波动、出汗", selected: false },
                { label: "全身肌肉酸痛、关节僵硬", selected: false }
              ] 
            },
            { 
              title: "问题6：请描述您在心理上具体都会有什么负向戒断症状？（可多选）", 
              isMulti: true,
              options: [
                { label: "情绪消极", selected: false },
                { label: "情绪暴躁，容易焦虑", selected: false },
                { label: "痛苦，想自残", selected: false },
                { label: "易惊厥", selected: false }
              ] 
            }
          ]
        },
        {
          sectionTitle: "第三部分：个人史与家族史",
          questions: [
            { 
              title: "问题7：您目前是否患有其他躯体疾病？", 
              isMulti: false,
              options: [
                { label: "无", selected: false },
                { label: "有（如背痛、关节炎、纤维肌痛、神经性疼痛等）", selected: false }
              ] 
            },
            { 
              title: "问题8：您的直系亲属（父母、兄弟姐妹、子女）中，是否有人被诊断有情绪或精神心理问题？", 
              isMulti: false,
              options: [
                { label: "无", selected: false },
                { label: "有（请具体说明）", selected: false }
              ] 
            }
          ]
        }
      ],
      "抑郁症": [
        {
          sectionTitle: "第一部分：核心症状",
          questions: [
            { 
              title: "问题1：此次就诊最想解决的核心症状是什么？", 
              isMulti: true,
              options: [
                { label: "持续情绪低落，对以往感兴趣的事物提不起劲", selected: false },
                { label: "莫名想哭，内心压抑、空虚，难以感到愉悦", selected: false },
                { label: "自我否定、自责，觉得自己毫无价值", selected: false },
                { label: "精力严重不足，稍微活动就疲惫不堪", selected: false },
                { label: "对未来感到绝望，缺乏生活动力", selected: false },
                { label: "思维迟缓，反应变慢，表达不流畅", selected: false },
                { label: "存在自杀或自伤的念头、计划或行为", selected: false },
                { label: "不愿与人交往，刻意回避社交场景", selected: false }
              ] 
            },
            { 
              title: "问题2：核心症状的持续时间有多久？", 
              isMulti: false,
              options: [
                { label: "少于2周", selected: false },
                { label: "2周至1个月", selected: false },
                { label: "1至3个月", selected: false },
                { label: "3至6个月", selected: false },
                { label: "超过6个月", selected: false }
              ] 
            },
            {
              title: "问题3：症状对您社会功能的影响程度？",
              isMulti: false,
              options: [
                { label: "轻微影响：能正常工作/学习、生活，仅偶尔情绪波动影响状态", selected: false },
                { label: "中度影响：工作/学习效率明显下降，社交意愿降低，部分日常事务需勉强完成", selected: false },
                { label: "重度影响：难以坚持工作/学习，社交几乎中断，多数日常活动感到吃力", selected: false },
                { label: "极重度影响：无法正常工作/学习，生活自理能力下降，需他人照料", selected: false }
              ]
            }
          ]
        },
        {
          sectionTitle: "第二部分：症状细节",
          questions: [
            { 
              title: "问题4：请描述您的睡眠情况（可多选）？", 
              isMulti: true,
              options: [
                { label: "入睡困难（躺下30分钟以上仍无法入睡）", selected: false },
                { label: "睡眠浅、易醒，夜间醒来多次且难以再次入睡", selected: false },
                { label: "早醒（比平时早醒1小时以上，醒后无法再睡）", selected: false },
                { label: "睡眠过多（每日睡眠超过10小时，仍觉疲惫）", selected: false },
                { label: "睡眠节律紊乱（昼夜颠倒，夜间清醒、白天嗜睡）", selected: false },
                { label: "近期睡眠无显著异常", selected: false }
              ] 
            },
            { 
              title: "问题5：请描述您的食欲与体重变化？", 
              isMulti: true,
              options: [
                { label: "食欲显著减退，进食量减少，体重明显下降（1个月内减重5%以上）", selected: false },
                { label: "食欲亢进，通过暴饮暴食缓解情绪，体重增加", selected: false },
                { label: "进食无规律，虽有食欲但进食后无满足感", selected: false },
                { label: "味觉减退，对食物缺乏兴趣，刻意减少进食", selected: false },
                { label: "近期食欲与体重无显著变化", selected: false }
              ] 
            },
            { 
              title: "问题6：请描述您的认知功能状态？", 
              isMulti: true,
              options: [
                { label: "注意力难以集中，容易走神，无法专注完成任务", selected: false },
                { label: "记忆力下降，频繁忘记重要事情", selected: false },
                { label: "决策能力降低，对小事也犹豫不决，难以做出选择", selected: false },
                { label: "思维僵化，难以发散思考，联想困难", selected: false },
                { label: "认知功能无明显异常", selected: false }
              ] 
            }
          ]
        },
        {
          sectionTitle: "第三部分：个人史与家族史",
          questions: [
            { 
              title: "问题7：您过去是否接受过抑郁症相关干预？", 
              isMulti: false,
              options: [
                { label: "从未接受过任何心理健康服务", selected: false },
                { label: "曾接受心理咨询（如认知行为治疗等心理治疗）", selected: false },
                { label: "曾就诊于精神科，服用过抗抑郁药物（若有，请告知药物名称、剂量及服用时长）", selected: false },
                { label: "曾因抑郁症住院治疗或接受急诊干预", selected: false }
              ] 
            },
            { 
              title: "问题8：您目前是否患有其他躯体疾病？", 
              isMulti: false,
              options: [
                { label: "无", selected: false },
                { label: "有（如甲状腺疾病、糖尿病、高血压、心脏病、神经系统疾病、慢性疼痛等）", selected: false }
              ] 
            },
            { 
              title: "问题9：您的直系亲属（父母、兄弟姐妹、子女）中，是否有人被诊断为抑郁症或其他情绪/精神心理疾病？", 
              isMulti: false,
              options: [
                { label: "无", selected: false },
                { label: "有（可注明具体疾病类型，如抑郁症、双相情感障碍等）", selected: false }
              ] 
            },
            { 
              title: "问题10：近期是否有重大生活事件发生？", 
              isMulti: true,
              options: [
                { label: "亲人离世", selected: false },
                { label: "失恋", selected: false },
                { label: "失业", selected: false },
                { label: "重大挫折", selected: false },
                { label: "生活环境改变", selected: false },
                { label: "无", selected: false }
              ] 
            }
          ]
        }
      ],
      "焦虑症": [
        {
          sectionTitle: "第一部分：核心焦虑症状",
          questions: [
            { 
              title: "问题1：此次就诊最想解决的核心焦虑相关问题是什么？", 
              isMulti: true,
              options: [
                { label: "持续过度担忧", selected: false },
                { label: "急性焦虑发作，如突发心慌、胸闷、濒死感，伴随强烈恐惧", selected: false },
                { label: "特定恐惧，如怕社交、怕密闭空间、怕高处等，回避相关场景", selected: false },
                { label: "广泛性紧张不安，如持续烦躁、坐立难安，无法放松", selected: false },
                { label: "预期性焦虑，对未来可能发生的事过度担忧，影响当下状态", selected: false },
                { label: "伴随焦虑的强迫行为，如反复检查、清洁、计数等，缓解焦虑", selected: false },
                { label: "焦虑引发的躯体不适，如头痛、头晕、肌肉紧张、胃肠不适", selected: false }
              ] 
            },
            { 
              title: "问题2：焦虑症状的持续时间有多久？", 
              isMulti: false,
              options: [
                { label: "少于2周", selected: false },
                { label: "2周至1个月", selected: false },
                { label: "1至3个月", selected: false },
                { label: "3至6个月", selected: false },
                { label: "超过6个月", selected: false }
              ] 
            },
            {
              title: "问题3：焦虑症状对您社会功能的影响程度有多深？",
              isMulti: false,
              options: [
                { label: "轻微影响，能正常工作/学习，仅偶尔因焦虑分心", selected: false },
                { label: "中度影响，工作/学习效率下降，回避部分引发焦虑的社交或场景", selected: false },
                { label: "重度影响，难以坚持工作/学业，多数社交活动回避，依赖他人支持", selected: false },
                { label: "极重度影响，无法正常工作/学习，生活自理受影响，频繁出现急性焦虑发作", selected: false }
              ]
            }
          ]
        },
        {
          sectionTitle: "第二部分：症状细节",
          questions: [
            { 
              title: "问题4：请描述您的焦虑发作特点（可多选）？", 
              isMulti: true,
              options: [
                { label: "无明确诱因突发，每次持续数分钟至数小时", selected: false },
                { label: "有特定触发场景", selected: false },
                { label: "每日频繁出现，呈持续性低强度焦虑", selected: false },
                { label: "夜间焦虑加重，影响睡眠", selected: false },
                { label: "焦虑发作时伴随呼吸急促、心跳加速、出汗、发抖等躯体症状", selected: false }
              ] 
            },
            { 
              title: "问题5：请描述您的睡眠情况（可多选）？", 
              isMulti: true,
              options: [
                { label: "因过度担忧难以入睡，躺下后大脑不停思考（超过1小时无法入眠）", selected: false },
                { label: "夜间易醒，醒后被焦虑思绪困扰，难以再次入睡", selected: false },
                { label: "早醒，醒后担忧当天事务，无法放松补眠", selected: false },
                { label: "睡眠浅、多梦，梦境多与焦虑场景相关", selected: false },
                { label: "虽睡眠时间充足，但因焦虑仍感疲惫、休息不佳", selected: false },
                { label: "近期睡眠无显著受焦虑影响", selected: false }
              ] 
            },
            { 
              title: "问题6：请描述焦虑对您饮食与食欲的影响？", 
              isMulti: false,
              options: [
                { label: "焦虑时食欲减退，进食量明显减少，体重下降", selected: false },
                { label: "焦虑时通过进食缓解情绪，食欲亢进，尤其偏爱高热量食物，体重增加", selected: false },
                { label: "因焦虑出现恶心、腹胀等胃肠不适，影响正常进食", selected: false },
                { label: "饮食规律无显著变化，未受焦虑影响", selected: false }
              ] 
            }
          ]
        },
        {
          sectionTitle: "第三部分：个人史与家族史",
          questions: [
            { 
              title: "问题7：您过去是否因焦虑相关问题接受过心理健康服务？", 
              isMulti: false,
              options: [
                { label: "从未接受过", selected: false },
                { label: "曾接受心理治疗（如认知行为治疗等心理治疗）", selected: false },
                { label: "曾就诊于精神科，服用过抗焦虑药物（若有，请告知医生药物名称和疗程）", selected: false },
                { label: "曾因严重焦虑发作或伴随自伤/自杀观念住院治疗", selected: false }
              ] 
            },
            { 
              title: "问题8：您目前是否患有其他可能加重焦虑的躯体疾病？", 
              isMulti: false,
              options: [
                { label: "无", selected: false },
                { label: "有（如甲状腺功能亢进、高血压、心脏病、神经系统疾病、内分泌紊乱等）", selected: false }
              ] 
            },
            { 
              title: "问题9：您的直系亲属（父母、兄弟姐妹、子女）中，是否有人被诊断为焦虑症或其他精神心理疾病？", 
              isMulti: false,
              options: [
                { label: "无", selected: false },
                { label: "有（请简要说明亲属关系并注明具体疾病类型）", selected: false }
              ] 
            }
          ]
        }
      ],
      "注意缺陷与多动障碍": [
        {
          sectionTitle: "第一部分：核心症状",
          questions: [
            { 
              title: "问题1：此次就诊最想解决的问题是什么？", 
              isMulti: true,
              options: [
                { label: "做事时难以保持专注", selected: false },
                { label: "正常生活中缺乏基本耐心", selected: false },
                { label: "行为过于冲动，攻击性强", selected: false },
                { label: "总觉得心神不宁", selected: false }
              ] 
            },
            { 
              title: "问题2：当前症状的持续时间有多久？", 
              isMulti: false,
              options: [
                { label: "从小就有但一直没重视", selected: false },
                { label: "近期才有（但已经持续6个月以上）", selected: false }
              ] 
            },
            {
              title: "问题3：症状对您社会功能的影响程度有多深？",
              isMulti: false,
              options: [
                { label: "这些症状干扰或降低了社交、学业或职业功能的质量（需要提供具体证据，例如能静下心学习的时间不超过三分钟，无法进行正常学习活动，因此被老师当众批评了）", selected: false }
              ]
            }
          ]
        },
        {
          sectionTitle: "第二部分：症状细节",
          questions: [
            { 
              title: "问题4：您的\"自制力差\"具体有哪些表现？（可多选）", 
              isMulti: true,
              options: [
                { label: "难以等待按顺序做事", selected: false },
                { label: "不能完成任务，容易分散注意力", selected: false },
                { label: "冲动行事，言语轻率", selected: false },
                { label: "无法静坐，总有小动作", selected: false }
              ] 
            },
            { 
              title: "问题5：请描述您最近的心理情况？（可多选）", 
              isMulti: true,
              options: [
                { label: "常感到心神不宁。无论做什么都觉得很难受，伴有恐慌感", selected: false },
                { label: "对生活抱消极偏激的态度和看法。甚至攻击他人", selected: false },
                { label: "觉得很烦躁。有时皮肤像有蚂蚁爬过，会坐立不安", selected: false }
              ] 
            }
          ]
        },
        {
          sectionTitle: "第三部分：个人史与家族史",
          questions: [
            { 
              title: "问题6：您过去是否接受过心理健康相关服务？", 
              isMulti: false,
              options: [
                { label: "从未接受过", selected: false },
                { label: "曾接受心理咨询/治疗", selected: false },
                { label: "曾就诊于精神科，并服用药物（若记得请记得告知医生药物名称和疗程）", selected: false },
                { label: "曾因心理问题住院治疗", selected: false }
              ] 
            },
            { 
              title: "问题7：您目前是否患有其他心理障碍？", 
              isMulti: true,
              options: [
                { label: "重性抑郁障碍", selected: false },
                { label: "双相情感障碍", selected: false },
                { label: "焦虑障碍", selected: false },
                { label: "无", selected: false }
              ] 
            },
            { 
              title: "问题8：您的直系亲属（父母、兄弟姐妹、子女）中，是否有人被诊断有情绪或精神心理问题？", 
              isMulti: false,
              options: [
                { label: "无", selected: false },
                { label: "有（请具体说明）", selected: false }
              ] 
            }
          ]
        }
      ]
    },
    currentGuideline: []
  },

  onLoad() {
    this.setData({
      diseaseIndex: 0
    });
    this.updateGuideline(0);
  },

  onDiseaseChange(e) {
    const index = e.detail.value;
    this.setData({ diseaseIndex: index });
    this.updateGuideline(index);
  },

  updateGuideline(index) {
    const name = this.data.diseaseNames[index];
    // 如果找不到该疾病的指南，默认显示第一个疾病（双相情感障碍）的指南
    const data = this.data.guidelines[name] || this.data.guidelines["双相情感障碍"] || [];
    try {
      // 使用 JSON parse/stringify 进行深拷贝，如果失败则使用原始数据
      const clonedData = JSON.parse(JSON.stringify(data));
      this.setData({
        currentGuideline: clonedData
      });
    } catch (error) {
      console.error("Error cloning guideline data:", error);
      this.setData({
        currentGuideline: data
      });
    }
  },

  toggleOption(e) {
    const { sidx, qidx, oidx } = e.currentTarget.dataset;
    const guideline = JSON.parse(JSON.stringify(this.data.currentGuideline)); // 深拷贝以确保响应式更新
    const question = guideline[sidx].questions[qidx];
    const option = question.options[oidx];

    if (question && option) {
      if (question.isMulti) {
        option.selected = !option.selected;
      } else {
        // 单选逻辑
        question.options.forEach((opt, idx) => {
          opt.selected = (idx === oidx);
        });
      }

      this.setData({
        currentGuideline: guideline
      });
    }
  },

  onSaveTip() {
    const sections = [];
    this.data.currentGuideline.forEach(section => {
      const selectedQuestions = [];
      section.questions.forEach(q => {
        const selectedOptions = q.options.filter(o => o.selected);
        if (selectedOptions.length > 0) {
          selectedQuestions.push({
            title: q.title,
            options: selectedOptions.map(o => ({ label: o.label, hint: o.hint }))
          });
        }
      });
      if (selectedQuestions.length > 0) {
        sections.push({
          title: section.sectionTitle,
          questions: selectedQuestions
        });
      }
    });

    if (sections.length === 0) {
      wx.showToast({
        title: '请先勾选您的症状',
        icon: 'none'
      });
      return;
    }

    const result = {
      disease: this.data.diseaseNames[this.data.diseaseIndex],
      date: new Date().toLocaleDateString(),
      sections: sections
    };

    wx.setStorageSync('lastEndorsement', result);

    wx.showModal({
      title: '已生成并保存',
      content: '您的就诊背书已保存至"个人中心"，可在问诊时直接向医生展示。',
      confirmText: '去查看',
      success: (res) => {
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/endorsement-result/endorsement-result'
          });
        }
      }
    });
  }
});