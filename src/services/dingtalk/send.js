const axios = require("axios");
const { getTime } = require("../../utils/date");
const log = require("../../utils/log");

module.exports = async ({
  token,
  title = "",
  content = "",
  isAtAll = false,
  showTime = true,
  showTail = true,
}) => {
  log.start("开始钉钉群发", `title: ${title}`, `content: \n\n${content}`);

  const time = showTime ? `\n###### 更新时间：${getTime()}` : "";
  const tail = showTail
    ? "\n---\n###### 爬虫服务由 [蚂蚁链前端团队](https://www.yuque.com/antchain-fe/blog/joinus) 提供"
    : "";

  const res = await axios({
    method: "POST",
    url: `https://oapi.dingtalk.com/robot/send?access_token=${token}`,
    data: {
      msgtype: "markdown",
      markdown: {
        title: title,
        text: `# ${title}${time}\n---\n${content}${tail}`,
      },
      at: {
        isAtAll,
      },
    },
  });

  log.print("钉钉返回 config", JSON.stringify(res.config));
  log.print("钉钉返回 data", JSON.stringify(res.data));
};