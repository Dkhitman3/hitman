import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ICommand, IParsedArgs, ISimplifiedMessage } from '../../typings'
import { MessageType, Mimetype } from "@adiwajshing/baileys";
export default class Command extends BaseCommand {
	constructor(client: WAClient, handler: MessageHandler) {
		super(client, handler, {
			command: "help",
			description:
				"Displays the help menu or shows the info of the command provided",
			category: "general",
			usage: `${client.config.prefix}help (command_name)`,
			aliases: ["h"],
			baseXp: 30,
		});
	}

	run = async (
		M: ISimplifiedMessage,
		parsedArgs: IParsedArgs
	): Promise<void> => {
		const user = M.sender.jid;
		const beckylynch =
			"assets/Untitled (1).mp4";
		if (!parsedArgs.joined) {
			const commands = this.handler.commands.keys();
			const categories: { [key: string]: ICommand[] } = {};
			for (const command of commands) {
				const info = this.handler.commands.get(command);
				if (!command) continue;
				if (!info?.config?.category || info.config.category === "dev") continue;
				if (
					!info?.config?.category ||
					(info.config.category === "nsfw" &&
						!(await this.client.getGroupData(M.from)).nsfw)
				)
					continue;
				if (Object.keys(categories).includes(info.config.category))
					categories[info.config.category].push(info);
				else {
					categories[info.config.category] = [];
					categories[info.config.category].push(info);
				}
			}
			let text = `❤𝐆𝐫𝐞𝐚𝐭 𝐃𝐚𝐲! *@${
				user.split("@")[0]
			}
                        *,*-----(•Note 📜 Side•)-----* \n\n *Read the Rules* \n My name is 𝐡𝐢𝐭𝐦𝐚𝐧47☣️ \n My prefix is "${this.client.config.prefix}" \n 1. *Don't Call* bots to avoid blocking \n 2. *Don't Spam* is the group & Pm to avoid blocking 
				\n\n*╚『•My Cmd List•』╝*.\n\n`;
			const keys = Object.keys(categories);
			for (const key of keys)
				text += `*╚━❰☣️${this.client.util.capitalize(
					key
				)} ❱━╝*\n❐ \`\`\`${categories[key]
					.map((command) => command.config?.command)
					.join(" , ")}\`\`\`\n\n`;
			return void this.client.sendMessage(
				M.from,
				{ url: beckylynch },
				MessageType.video,
				{
					quoted: M.WAMessage,
					mimetype: Mimetype.gif,
			caption: `${text}
─❅┈[ 𝐡𝐢𝐭𝐦𝐚𝐧47 𝑩𝒐𝒕 ]┈❅───
┌────────────┈❅
│   🧨 𝐡𝐢𝐭𝐦𝐚𝐧47
│   ©️ 🚀🥂😻:𝐁𝐢𝐭𝐜𝐡 𝐂𝐥𝐮𝐛😻🚀🥵
└────────────┈⁂
❅┈[𝐇𝐚𝐯𝐞 𝐆𝐫𝐞𝐚𝐭 𝐃𝐚𝐲]┈❅ 
❤ *Note: Use ${this.client.config.prefix}help <command_name> to view the command info*`,
					contextInfo: { mentionedJid: [user] },
				}
			);
		}
		const key = parsedArgs.joined.toLowerCase();
		const command =
			this.handler.commands.get(key) || this.handler.aliases.get(key);
		if (!command) return void M.reply(`No Command of Alias Found | "${key}"`);
		const state = await this.client.DB.disabledcommands.findOne({
			command: command.config.command,
		});
		M.reply(
			`🚀 *Command:* ${this.client.util.capitalize(
				command.config?.command
			)}\n📉 *Status:* ${
				state ? "Disabled" : "Available"
			}\n⛩ *Category:* ${this.client.util.capitalize(
				command.config?.category || ""
			)}${
				command.config.aliases
					? `\n♦️ *Aliases:* ${command.config.aliases
							.map(this.client.util.capitalize)
							.join(", ")}`
					: ""
			}\n🎐 *Group Only:* ${this.client.util.capitalize(
				JSON.stringify(!command.config.dm ?? true)
			)}\n💎 *Usage:* ${command.config?.usage || ""}\n\n💞 *Description:* ${
				command.config?.description || ""
			}`
		);
	};
}
