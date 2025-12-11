// 此为 clash verge 的全局脚本示例

function main(config, profileName) {
  // 过滤词
  const filterKeywords = [
    "群"， "邀请"， "返利"， "循环"， "官网"， "客服"， "网站"， "网址"， "获取"， "订阅",
    "流量"， "到期"， "续费"， "购买"， "机场"， "下次"， "版本"， "官址"， "备用"， "过期",
    "已用"， "联系"， "邮箱"， "工单"， "贩卖"， "通知"， "倒卖"， "防止"， "国内"， "建议",
    "地址"， "频道"， "无法"， "说明"， "使用"， "提示"， "特别"， "访问"， "支持"， "10x",
    "8x"， "6x"， "状态"， "欠费",
  ];
  // 代理列表
  const proxyNames = (config.proxies || []).map((p) => p.name);
  // 进行过滤
  const filtered = proxyNames.filter((name) =>
    filterKeywords.some((keyword) => name.includes(keyword))
  );
  const normal = proxyNames.filter(
    (name) => !filterKeywords.some((keyword) => name.includes(keyword))
  );

  // 代理分组
  const groupBaseOption = {
    interval: 300,
    timeout: 3000,
    lazy: true,
    "max-failed-times": 3,
    hidden: false,
  };
  config["proxy-groups"] = [
    {
      ...groupBaseOption,
      name: "节点选择",
      type: "select",
      proxies: [...normal, "DIRECT"],
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/adjust.svg",
      url: "https://www.google.com/generate_204",
    },
    {
      ...groupBaseOption,
      name: "全局直连",
      type: "select",
      proxies: ["DIRECT", "节点选择"],
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/link.svg",
      url: "http://connectivitycheck.gstatic.com/generate_204",
    },
    {
      ...groupBaseOption,
      name: "广告拦截",
      type: "select",
      proxies: ["REJECT", "全局直连"],
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/bug.svg",
      url: "https://cpro.baidustatic.com/cpro/ui/c.js",
    },
    {
      ...groupBaseOption,
      name: "其他",
      type: "select",
      proxies: filtered,
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/block.svg",
      url: "https://www.youtube.com/generate_204",
    },
  ];
  // 规则集
  config["rule-providers"] = {
    directRules: {
      url: "https://raw.githubusercontent.com/CloudSwordSage/clash-relu/main/directRules.list",
      path: "./ruleset/directRules.list",
      behavior: "classical",
      interval: 3600,
      format: "text",
      type: "http",
    },
    proxyRules: {
      url: "https://raw.githubusercontent.com/CloudSwordSage/clash-relu/main/proxyRules.list",
      path: "./ruleset/proxyRules.list",
      behavior: "classical",
      interval: 3600,
      format: "text",
      type: "http",
    },
    rejectRules: {
      url: "https://raw.githubusercontent.com/CloudSwordSage/clash-relu/main/rejectRules.list",
      path: "./ruleset/rejectRules.list",
      behavior: "classical",
      interval: 3600,
      format: "text",
      type: "http",
    },
  };
  // 代理规则
  config["rules"] = [
    "DOMAIN-KEYWORD,cswu,节点选择",
    "RULE-SET,directRules,全局直连",
    "RULE-SET,rejectRules,广告拦截",
    "RULE-SET,proxyRules,节点选择",
    "MATCH,全局直连",
  ];
  return config;
}
