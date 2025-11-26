import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "NCU Notes Sharing Wiki",
  description: "By auberginewly",
  head: [
    ['link', { rel: 'icon', href: '/i.png' }]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/i.png',
    nav: [
      { text: '主页', link: '/' },
      { 
        text: '学习资源', 
        items: [
          { text: '应试资源', link: '/learning-resources/test' },
          { text: 'CS资源', link: '/learning-resources/cs' }
        ]
      },
      { text: '经验分享', link: '/experience-sharing' },
      { text: '其他', link: '/other' },
      { text: '贡献指南', link: '/contribution-guide/为什么我要做这个项目' }
    ],

    sidebar: {
      '/learning-resources/cs/': [
        {
          text: '简介',
          items: [
            { text: '说明', link: '/learning-resources/cs/' },
            // ... 其他 CS 相关的页面
          ]
        }
      ],
      '/learning-resources/test/': [
        {
          text: '简介',
          collapsed: false,
          items: [
            { text: '应试资源简介', link: '/learning-resources/test/' },
            // ... 其他应试相关的页面
          ]
        },
        {
          text: '好用的小工具',
          collapsed: true,
          items: [
            { text: '刷课脚本', link: '/learning-resources/test/tools/刷课脚本' },
            { text: '学习通签到', link: '/learning-resources/test/tools/学习通签到' },   
            { text: '快捷指令豆包搜题', link: '/learning-resources/test/tools/快捷指令豆包搜题' },  
            { text: '虚拟定位', link: '/learning-resources/test/tools/虚拟定位' }, 
            // ... 其他应试相关的页面
          ]
        },
        {
          text: '大一',
          collapsed: true,
          items: [
            { text: '高等数学（上）', link: '/learning-resources/test/1/高等数学（上）' },
            { text: '高等数学（下）', link: '/learning-resources/test/1/高等数学（下）' },
            { text: '线性代数', link: '/learning-resources/test/1/线性代数' },
            { text: '大学物理（上）', link: '/learning-resources/test/1/大学物理（上）' },
            { text: '大学物理实验', link: '/learning-resources/test/1/大学物理实验' },
            { text: 'C语言程序设计', link: '/learning-resources/test/1/C语言程序设计' },
            { text: '大学英语', link: '/learning-resources/test/1/大学英语' },
            { text: '大学生心理健康指导', link: '/learning-resources/test/1/大学生心理健康指导' },
            { text: '思想道德与法治', link: '/learning-resources/test/1/思想道德与法治' },
            { text: '中国近现代史纲要', link: '/learning-resources/test/1/中国近现代史纲要' },
            { text: '军事理论', link: '/learning-resources/test/1/军事理论' },
            // ... 其他应试相关的页面
          ]
        },
        {
          text: '大二',
          collapsed: true,
          items: [
            { text: '离散数学', link: '/learning-resources/test/2/离散数学' },
            { text: '概率论与数理统计', link: '/learning-resources/test/2/概率论与数理统计' },
            { text: '计算机组成原理', link: '/learning-resources/test/2/计算机组成原理' },
            { text: '操作系统', link: '/learning-resources/test/2/操作系统' },
            { text: '数据结构', link: '/learning-resources/test/2/数据结构' },
            { text: '面向对象程序设计', link: '/learning-resources/test/2/面向对象程序设计' },
            { text: '密码学与应用', link: '/learning-resources/test/2/密码学与应用' },
            { text: '信息安全数学基础', link: '/learning-resources/test/2/信息安全数学基础' },
            { text: '毛泽东思想和中国特色社会主义理论体系概论', link: '/learning-resources/test/2/毛泽东思想和中国特色社会主义理论体系概论' },
            // ... 其他应试相关的页面
          ]
        },
        {
          text: '大三',
          collapsed: true,
          items: [
            { text: 'TODO', link: '/learning-resources/test/3/' },
            // ... 其他应试相关的页面
          ]
        },
        {
          text: '大四',
          collapsed: true,
          items: [
            { text: 'TODO', link: '/learning-resources/test/4/' },
            // ... 其他应试相关的页面
          ]
        },
        {
          text: '其他注意事项',
          collapsed: true,
          items: [
            { text: '通识课', link: '/learning-resources/test/others/通识课' },
            { text: '综素', link: '/learning-resources/test/others/综素' },
            // ... 其他应试相关的页面
          ]
        },
      ],
      '/experience-sharing/': [
        {
          text: '简介',
          items: [
            { text: '说明', link: '/experience-sharing/' },
            // ... 其他经验分享的页面
          ]
        }
      ],
      '/other/': [
        {
          text: '简介',
          items: [
            { text: '说明', link: '/other/' },
            // ... 其他页面
          ]
        }
      ],
      '/contribution-guide/': [
        {
          text: '贡献指南',
          items: [
            { text: '为什么我要做这个项目', link: '/contribution-guide/为什么我要做这个项目' },
            { text: '贡献指南', link: '/contribution-guide/贡献指南' },
            { text: 'AI润色提示词', link: '/contribution-guide/AI润色提示词' },
            { text: '获取帮助', link: '/contribution-guide/获取帮助' },
            // ... 其他页面
          ]
        }
      ]
    },

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        }
      }
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/auberginewly/NCU-Notes-Sharing-Wiki' }
    ]
  }
})
