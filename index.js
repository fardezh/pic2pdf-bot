const { Telegraf, session } = require("telegraf");
const PDFDocument = require("pdfkit");
const axios = require("axios");

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.use(
  session({
    defaultSession: () => ({
      photos: [],
      photoCount: 0,
      lastReplyId: 0,
    }),
  })
);

bot.start(async (ctx) => {
  ctx.session.lastReplyId = 0;
  ctx.session.photos = [];
  ctx.session.photoCount = 0;
  ctx.sendMessage("برام عکس(ها)ت رو بفرس.", {
    reply_to_message_id: ctx.message.message_id,
  });
});

bot.on("photo", async (ctx) => {
  const tgPhoto = ctx.update.message.photo[ctx.update.message.photo.length - 1];
  const photo = (({ file_id, width, height }) => ({ file_id, width, height }))(
    tgPhoto
  );
  ctx.session.photos.push(photo);
  ctx.session.photoCount++;

  ctx
    .sendMessage(
      `عکست به فایل اضافه شد. بازم میتونی بفرستی.\nتعداد عکس‌ها: ${ctx.session.photoCount}`,
      {
        reply_to_message_id: ctx.message.message_id,
        reply_markup: {
          inline_keyboard: [
            [{ text: "اوکیه! پی‌دی‌افش کن.", callback_data: "done" }],
            [{ text: "بیخیال نمیخوام.", callback_data: "cancel" }],
          ],
        },
      }
    )
    .then((message) => {
      // delete last reply

      new Promise((resolve) => setTimeout(resolve, 1000));

      if (ctx.session.lastReplyId) {
        ctx.deleteMessage(ctx.session.lastReplyId);
      }
      ctx.session.lastReplyId = message.message_id;
    });
});

bot.action("cancel", async (ctx) => {
  ctx.session.lastReplyId = 0;
  ctx.session.photos = [];
  ctx.session.photoCount = 0;
  await ctx.editMessageText("حله، خواستی دوباره عکس بفرس برام.");
});

bot.action("done", async (ctx) => {
  await ctx.editMessageText("قبل اینکه فایلتو درست کنم، بگو اسمشو چی بذارم؟");
  bot.on("text", async (ctx) => {
    const fileName = ctx.message.text.trim().replace(/[\/|\\:*?"<>]/g, "");
    await ctx.reply("حله! دارم برات درستش میکنم...");

    const photos = ctx.session.photos;
    const filepath = await createPdf(photos, fileName);
    await ctx.replyWithDocument({
      source: filepath,
      filename: `${fileName}.pdf`,
    });
  });
});

const createPdf = async (photos, fileName) => {
  const doc = new PDFDocument({ autoFirstPage: false });
  let buffers = [];
  doc.on("data", buffers.push.bind(buffers));

  // doc.pipe(fs.createWriteStream(`./${fileName}.pdf`));
  for (photo of photos) {
    const fileLink = (await bot.telegram.getFileLink(photo.file_id)).href;
    const response = await axios({
      url: fileLink,
      responseType: "arraybuffer",
    });
    doc.addPage({ size: [photo.width, photo.height] });
    doc.image(response.data, 0, 0);
  }
  doc.end();
  const pdfData = Buffer.concat(buffers);
  return pdfData;
};

bot.launch();
