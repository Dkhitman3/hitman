import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'cara',
            description: 'Displays the info',
            category: 'bots',
            usage: `${client.config.prefix}void`,
            baseXp: 100
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        return void M.reply(
            `👾 *Void* 👾\n\n🍀 *Description:* A fully Object Oriented WhatsApp bot built with TypeScript\n\n🌐 *URL:* https://github.com/iamherok/Cara_public \n`
        ).catch((reason: Error) => M.reply(`an error occurred, Reason: ${reason}`))
    }
}