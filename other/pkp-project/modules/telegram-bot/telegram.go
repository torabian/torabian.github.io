package telegrambot

import (
	"fmt"
	"log"

	tgbotapi "github.com/go-telegram-bot-api/telegram-bot-api/v5"
)

func Start() {
	bot, err := tgbotapi.NewBotAPI("8971272913:AAH2G1pukkENYHT183mGH-t5pLDrSgtB8Lw")
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Bot started:", bot.Self.UserName)

	u := tgbotapi.NewUpdate(0)
	u.Timeout = 60

	updates := bot.GetUpdatesChan(u)

	for update := range updates {

		if update.Message != nil {

			chatID := update.Message.Chat.ID

			// /start command
			if update.Message.Text == "/start" {

				msg := tgbotapi.NewMessage(
					chatID,
					"Welcome 👋\nChoose an action:",
				)

				// Reply keyboard
				keyboard := tgbotapi.NewReplyKeyboard(
					tgbotapi.NewKeyboardButtonRow(
						tgbotapi.NewKeyboardButton("🛒 Products"),
						tgbotapi.NewKeyboardButton("📦 Orders"),
					),
					tgbotapi.NewKeyboardButtonRow(
						tgbotapi.NewKeyboardButton("💬 Support"),
					),
				)

				msg.ReplyMarkup = keyboard

				bot.Send(msg)
			}

			// Button clicks from keyboard
			switch update.Message.Text {

			case "🛒 Products":

				msg := tgbotapi.NewMessage(
					chatID,
					"Choose product:",
				)

				// Inline buttons
				buttons := tgbotapi.NewInlineKeyboardMarkup(
					tgbotapi.NewInlineKeyboardRow(
						tgbotapi.NewInlineKeyboardButtonData(
							"📱 Phone",
							"product_phone",
						),
						tgbotapi.NewInlineKeyboardButtonData(
							"💻 Laptop",
							"product_laptop",
						),
					),
				)

				msg.ReplyMarkup = buttons
				bot.Send(msg)

			case "📦 Orders":

				bot.Send(
					tgbotapi.NewMessage(
						chatID,
						"Your orders:\n\n#1234 Delivered",
					),
				)

			case "💬 Support":

				bot.Send(
					tgbotapi.NewMessage(
						chatID,
						"Type your question and we will answer.",
					),
				)
			}
		}

		// Inline button clicks
		if update.CallbackQuery != nil {

			data := update.CallbackQuery.Data
			chatID := update.CallbackQuery.Message.Chat.ID

			var response string

			switch data {
			case "product_phone":
				response = "📱 Phone selected\nPrice: $499"

			case "product_laptop":
				response = "💻 Laptop selected\nPrice: $999"
			}

			msg := tgbotapi.NewMessage(
				chatID,
				response,
			)

			bot.Send(msg)

			// remove loading animation
			bot.Request(
				tgbotapi.NewCallback(
					update.CallbackQuery.ID,
					"",
				),
			)
		}
	}
}
