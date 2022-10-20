//Dependencies - axios (https://www.npmjs.com/package/axios)
//Installation - npm i axios

const { ChatInputCommandInteraction, EmbedBuilder } = require("discord.js")
const axios = require("axios")

module.exports = {
    name: "meme",
    description: "Get random memes.",
    category: "Fun",

    /**
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction) {

        const Embed = new EmbedBuilder()
            .setColor("DarkRed")

        try {
            const response = await axios.get(`https://meme-api.herokuapp.com/gimme/meme`);

            if (response.data.nsfw && !interaction.channel.nsfw) {
                Embed.setDescription("This meme cannot be posted as it contains NSFW content")
                return interaction.reply({ embeds: [Embed], ephemeral: true })
            }

            Embed.setColor("Blue")
                .setTitle(response.data.title)
                .setImage(response.data.url)
                .setURL(response.data.postLink)
                .setFooter({ text: "Memes" })
                .setTimestamp()

            await interaction.reply({ embeds: [Embed], fetchReply: true })
        } catch (error) {
            if (error.response?.data?.message) {
                Embed.setDescription("Unable to find meme. Try again later!")
                return interaction.reply({ embeds: [Embed], ephemeral: true })
            }

            Embed.setDescription(`Something went wrong. Try again later!`)
            interaction.reply({ embeds: [Embed], ephemeral: true })
        }
    }
}
