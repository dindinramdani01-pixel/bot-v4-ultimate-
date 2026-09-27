const { default: makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys')

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('session')
    const sock = makeWASocket({ auth: state })
    sock.ev.on('creds.update', saveCreds)

    sock.ev.on('messages.upsert', async m => {
        const msg = m.messages[0]
        if(!msg.message) return
        const from = msg.key.remoteJid
        const text = msg.message.conversation || msg.message.extendedTextMessage?.text || ""
        const reply = (txt) => sock.sendMessage(from, { text: txt })

        if(text == '.menu'){
            return reply(`*BOT V4 ULTIMATE - 35 FITUR*

.menu - menu
.bv - buka foto 1x liat
.sticker - jadi sticker
.tiktok - download tiktok
.ig - download ig
.play - download lagu
.tohd - hd kan foto
.ai - tanya ai
Dan 28 fitur lainnya!`)
        }

        // FITUR BUKA VIEW ONCE VIRAL
        if(msg.message.viewOnceMessageV2){
            await sock.sendMessage(from, { text: "🔓 ViewOnce kedeteksi, membuka..." })
            let v = msg.message.viewOnceMessageV2.message
            await sock.sendMessage(from, { forward: { key: msg.key, message: v } })
        }

        if(text == '.bv'){
            reply('Reply foto 1x liat nya min!')
        }
    })
}
startBot()
