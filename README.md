# Telegram PDF Maker Bot

A Telegram bot built with Nestjs-Telegraf that allows users to convert multiple images into a single PDF file.

## Description

This bot allows users to send multiple images to the bot and have them converted into a single PDF file, which can be easily downloaded and shared. This is particularly useful for combining multiple images into a single document, such as receipts, invoices, or documents.

## Features

- Convert multiple images into a single PDF file
- Send PDF file directly to the user
- Supports multiple image formats, such as JPEG, PNG, and GIF

## Installation

To install and run the bot, follow these steps:

1. Clone the repository
2. Install dependencies using `npm install`
3. Set the Telegram Bot API Token as an environment variable `BOT_TOKEN` in a `.env` file
4. Run the bot using `npm run start`

## Usage

To use the bot, follow these steps:

1. Start a chat with the bot on Telegram
2. Send multiple images to the bot
3. Set a file name for your PDF file.
4. Wait for the bot to process the images and generate a single PDF file
5. Download the PDF file by clicking on the download button

You can find a running instance of the bot at [Pic2PdfBot](https://t.me/Pics2PdfBot)

## Contributing

We welcome contributions from anyone! If you want to contribute to the project, please follow these steps:

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## Credits

This project was built using the Nestjs-Telegraf library, which is a wrapper for the Telegram Bot API. We would also like to thank the contributors to the [Nestjs-Telegraf library](https://github.com/hypeertech/nestjs-telegraf) for their hard work.

## License

This project is licensed under the [MIT license](LICENSE).
